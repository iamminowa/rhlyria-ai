// Copyright (c) 2026 CERETOSPHERE (under COSVerses). Used with special permission from MiNoWa Industry.
// SPDX-License-Identifier: MIT
import { LIMITS, uk } from "./config.js";
import { HttpError, SEC, enc, rid, count, clip } from "./util.js";
import { chat as llm } from "./providers/llm.js";
import { synthesize, ttsConfigured } from "./providers/tts.js";
import { kvGet, kvPut, makeLogger, pairsOf, putAudio } from "./store.js";
const unit = s => s.persona.countMode === "bytes" ? "bytes" : "characters";
const personaPrompt = s => s.persona.prompt.replaceAll("{max}", String(s.persona.maxLen)).replaceAll("{user}", s.user.name || "senpai");
const cleanReply = t => String(t || "").replace(/\*[^*\n]*\*/g, "").replace(/^\s*"([\s\S]*)"\s*$/, "$1").replace(/\n{3,}/g, "\n\n").trim();
const LANG_NAMES = { ja: "Japanese", en: "English", zh: "Simplified Chinese", th: "Thai", ko: "Korean" };
async function fit(env, s, text, origin, log, label) {
  const lim = s.persona.maxLen, mode = s.persona.countMode;
  if (count(text, mode) <= lim) return text;
  log("warn", `${label} ${count(text, mode)} > ${lim}, asking the model to shorten it`);
  try {
    const r = cleanReply(await llm(env, s, [{ role: "system", content: `Shorten the following text to at most ${lim} ${mode === "bytes" ? "UTF-8 bytes" : "characters"}. Keep the same language, tone and meaning. Output only the shortened text.` }, { role: "user", content: text }], origin, { temp: 0.3, maxTokens: 400 }));
    if (r && count(r, mode) <= lim) return r;
    if (r) text = r;
  } catch (e) { log("warn", `${label} shorten failed: ${e.message}`); }
  log("warn", `${label} cut at a sentence end`);
  return clip(text, lim, mode);
}
async function translate(env, s, text, origin) {
  const lang = LANG_NAMES[s.tr.target];
  const un = s.user.name;
  let rule = "";
  if (un) {
    if (s.tr.target === "ja" && s.user.translate) rule = s.user.ja ? `The user is named "${un}". Write the name as "${s.user.ja}" in Japanese.` : `The user is named "${un}". Write the name in natural Japanese script (katakana or kanji), never in Latin letters.`;
    else rule = `The user is named "${un}". Keep the name exactly as written.`;
  }
  const sys = `Translate the character's message into natural ${lang}, keeping the same tone and personality. ${rule} Output only the translation, without quotes or notes. Use at most ${s.persona.maxLen} ${s.persona.countMode === "bytes" ? "UTF-8 bytes" : "characters"}.`;
  return cleanReply(await llm(env, s, [{ role: "system", content: sys }, { role: "user", content: text }], origin, { temp: 0.3, maxTokens: 500 }));
}
export async function summarize(env, uid, s, origin, log) {
  if (!s.mem.auto) return;
  const hist = await kvGet(env, uk(uid, "hist"), []);
  const mem = await kvGet(env, uk(uid, "memory"), { summary: "", done: 0 });
  const pairs = pairsOf(hist);
  let n = 0, changed = false;
  while (pairs.length - mem.done > s.mem.turns && n < 3) {
    const [a, b] = pairs[mem.done];
    try {
      const out = await llm(env, s, [{ role: "system", content: "You maintain a compact long-term memory of a conversation between a user and a character. Merge the new exchange into the existing summary. Keep only important facts, preferences, names, promises and ongoing topics. Write at most 800 characters as plain short lines, in the language the user mostly uses. Output only the updated summary." }, { role: "user", content: `Existing summary:\n${mem.summary || "(none)"}\n\nNew exchange:\nUser: ${a.text}\nCharacter: ${b.text}` }], origin, { temp: 0.3, maxTokens: 600 });
      mem.summary = out.trim().slice(0, 2000);
      log("info", "memory: merged 1 older turn into the summary");
    } catch (e) {
      const line = `• User: "${[...a.text].slice(0, 40).join("")}" → ${[...b.text].slice(0, 40).join("")}`;
      mem.summary = ((mem.summary ? mem.summary + "\n" : "") + line).slice(-2000);
      log("warn", "memory summary fallback: " + e.message);
    }
    mem.done++; n++; changed = true;
  }
  if (changed) await kvPut(env, uk(uid, "memory"), mem);
}
export function handleChat(env, ctx, uid, s, origin, body) {
  const text = typeof body.text === "string" ? body.text.trim() : "";
  if (!text) throw new HttpError(400, "The message is empty.");
  if (text.length > LIMITS.chatText) throw new HttpError(413, "The message is too long.");
  const from = body.from === "live" ? "live" : "chat";
  const speak = (from === "live" || s.tts.on) && ttsConfigured(env);
  const { log, flush } = makeLogger(env, uid, s, "chat");
  const { readable, writable } = new TransformStream();
  const w = writable.getWriter();
  const send = o => w.write(enc.encode(JSON.stringify(o) + "\n"));
  ctx.waitUntil((async () => {
    try {
      log("info", `user(${from}) chars=${[...text].length}`);
      const hist = await kvGet(env, uk(uid, "hist"), []);
      const mem = await kvGet(env, uk(uid, "memory"), { summary: "", done: 0 });
      const recent = pairsOf(hist).slice(-s.mem.turns);
      const rules = `\n\nReply with plain conversational text, at most ${s.persona.maxLen} ${unit(s)}. Reply in the same language the user writes in.`;
      const sys = personaPrompt(s) + rules + (mem.summary ? `\n\nMemory of the earlier conversation:\n${mem.summary}` : "");
      const messages = [{ role: "system", content: sys }];
      for (const [a, b] of recent) messages.push({ role: "user", content: a.text }, { role: "assistant", content: b.text });
      messages.push({ role: "user", content: text });
      await send({ stage: "think" });
      let reply = cleanReply(await llm(env, s, messages, origin));
      if (!reply) throw new HttpError(502, "The model returned an empty reply.");
      reply = await fit(env, s, reply, origin, log, "reply");
      let ja = null;
      if (s.tr.on) {
        await send({ stage: "trans" });
        ja = await fit(env, s, await translate(env, s, reply, origin), origin, log, "translation");
      }
      let audio = null, ttsError = null;
      if (speak) {
        await send({ stage: "voice" });
        try {
          const a = await synthesize(env, s, ja || reply);
          audio = rid();
          await putAudio(env, uid, audio, a);
          log("info", `tts ok model=${s.tts.model} bytes=${a.buf.byteLength}`);
        } catch (e) { ttsError = e.message; log("error", "tts failed: " + e.message); }
      }
      const ts = Date.now();
      const um = { id: rid(), role: "user", text, ts };
      const am = { id: rid(), role: "ai", text: reply, ja, audio, ts };
      hist.push(um, am);
      let keep = hist;
      if (hist.length > LIMITS.hist) {
        const before = pairsOf(hist).length;
        keep = hist.slice(-LIMITS.hist);
        while (keep.length && keep[0].role !== "user") keep.shift();
        const removed = before - pairsOf(keep).length;
        if (removed > 0) {
          const m2 = await kvGet(env, uk(uid, "memory"), { summary: "", done: 0 });
          m2.done = Math.max(0, m2.done - removed);
          await kvPut(env, uk(uid, "memory"), m2);
        }
      }
      await kvPut(env, uk(uid, "hist"), keep);
      log("info", `reply ok chars=${[...(ja || reply)].length}`);
      await send({ done: true, message: am, userId: um.id, ttsError });
      ctx.waitUntil((async () => { try { await summarize(env, uid, s, origin, log); } catch (e) { log("error", "summarize failed: " + e.message); } await flush(); })());
    } catch (e) {
      log("error", "chat failed: " + (e && e.message));
      try { await send({ error: e instanceof HttpError ? e.message : "Internal error." }); } catch (x) {}
      await flush();
    } finally {
      try { await w.close(); } catch (e) {}
    }
  })());
  return new Response(readable, { headers: { "Content-Type": "application/x-ndjson; charset=utf-8", "X-Accel-Buffering": "no", ...SEC } });
}
