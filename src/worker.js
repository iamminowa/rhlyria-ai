// Copyright (c) 2026 CERETOSPHERE (under COSVerses). Used with special permission from MiNoWa Industry.
// SPDX-License-Identifier: MIT
import { API, ASSET_PREFIX, BASE, BUILD, LIMITS, RANK, assetIds, normalize, uk } from "./config.js";
import { HttpError, SEC, json, readJSON } from "./util.js";
import { authenticate } from "./auth.js";
import { KINDS, deleteAsset, importImage, kvGet, kvPut, loadSettings, makeLogger, pairsOf, serveAsset, storeAsset, vrmLimit, wipeAudio } from "./store.js";
import { handleChat } from "./chat.js";
import { llmKey, llmModelFallback } from "./providers/llm.js";
import { sttKey, transcribe } from "./providers/stt.js";
import { synthesize, ttsConfigured } from "./providers/tts.js";
import { page, staticAsset } from "./ui.js";
const secrets = (env, s) => ({ llm: !!llmKey(env), tts: ttsConfigured(env), stt: !!sttKey(env), model: !!(s.llm.model || llmModelFallback(env)) });
async function route(req, env, ctx) {
  const url = new URL(req.url);
  const p = url.pathname.replace(/\/+$/, "") || "/";
  if (!env.AI_KV) throw new HttpError(500, "The AI_KV Workers KV binding is missing.");
  const user = await authenticate(req, env);
  const method = req.method;
  if (method !== "GET" && method !== "HEAD") {
    const o = req.headers.get("Origin");
    if (o && o !== url.origin) throw new HttpError(403, "Cross-origin writes are not allowed.");
  }
  if (p === "/" || p === BASE || p === "/index.html") {
    if (method !== "GET" && method !== "HEAD") throw new HttpError(405, "Method not allowed.");
    return page();
  }
  if (method === "GET" || method === "HEAD") {
    const asset = staticAsset(p, url);
    if (asset) return asset;
  }
  if (p !== API && !p.startsWith(API + "/")) throw new HttpError(404, "Not found.");
  const r = p.slice(API.length) || "/";
  const uid = "owner";
  const origin = url.origin;
  const s = await loadSettings(env, uid);
  const { log, flush } = makeLogger(env, uid, s, "api");
  const done = res => { ctx.waitUntil(flush()); return res; };
  if (r === "/health" && method === "GET") return json({ ok: true, version: BUILD.version, build: BUILD.id });
  if (r === "/bootstrap" && method === "GET") {
    const [memory, messages, logs] = await Promise.all([kvGet(env, uk(uid, "memory"), { summary: "", done: 0 }), kvGet(env, uk(uid, "hist"), []), kvGet(env, uk(uid, "logs"), [])]);
    return json({ settings: s, memory, messages: messages.slice(-200), secrets: secrets(env, s), logs: { count: logs.length, max: LIMITS.logs }, storage: env.AI_R2 ? "r2" : "kv", access: user.verified, build: BUILD });
  }
  if (r === "/settings") {
    if (method === "GET") return json({ settings: s });
    if (method === "PUT" || method === "DELETE") {
      const next = method === "PUT" ? normalize(await readJSON(req)) : normalize({});
      const keep = new Set(assetIds(next));
      const gone = assetIds(s).filter(id => !keep.has(id));
      await kvPut(env, uk(uid, "settings"), next);
      await Promise.all(gone.map(id => deleteAsset(env, uid, id)));
      log("info", method === "PUT" ? "settings saved" : "settings reset");
      return done(json({ settings: next }));
    }
  }
  if (r === "/memory") {
    if (method === "GET") {
      const [memory, hist] = await Promise.all([kvGet(env, uk(uid, "memory"), { summary: "", done: 0 }), kvGet(env, uk(uid, "hist"), [])]);
      return json({ ...memory, turns: pairsOf(hist).length });
    }
    if (method === "PUT") {
      const b = await readJSON(req);
      const memory = await kvGet(env, uk(uid, "memory"), { summary: "", done: 0 });
      memory.summary = typeof b.summary === "string" ? b.summary.slice(0, 4000) : "";
      await kvPut(env, uk(uid, "memory"), memory);
      log("info", "memory summary edited");
      return done(json(memory));
    }
    if (method === "DELETE") {
      const scope = url.searchParams.get("scope");
      if (scope === "summary") {
        const memory = await kvGet(env, uk(uid, "memory"), { summary: "", done: 0 });
        memory.summary = "";
        await kvPut(env, uk(uid, "memory"), memory);
        log("info", "memory summary cleared");
        return done(json(memory));
      }
      if (scope === "all") {
        await Promise.all([kvPut(env, uk(uid, "hist"), []), kvPut(env, uk(uid, "memory"), { summary: "", done: 0 })]);
        ctx.waitUntil(wipeAudio(env, uid));
        log("info", "chat and memory cleared");
        return done(json({ summary: "", done: 0 }));
      }
      throw new HttpError(400, "Use scope=summary or scope=all.");
    }
  }
  if (r === "/chat" && method === "POST") return handleChat(env, ctx, uid, s, origin, await readJSON(req));
  if (r === "/tts" && method === "POST") {
    const b = await readJSON(req);
    const text = typeof b.text === "string" ? b.text.trim() : "";
    if (!text) throw new HttpError(400, "The text is empty.");
    if (text.length > LIMITS.ttsText) throw new HttpError(413, "The text is too long.");
    const a = await synthesize(env, s, text);
    log("info", `tts direct chars=${[...text].length} bytes=${a.buf.byteLength}`);
    return done(new Response(a.buf, { headers: { "Content-Type": a.ct, ...SEC } }));
  }
  if (r === "/stt" && method === "POST") {
    const len = Number(req.headers.get("content-length") || 0);
    if (!len) throw new HttpError(411, "Content-Length is required.");
    if (len > LIMITS.stt) throw new HttpError(413, "The recording is too long.");
    const buf = await req.arrayBuffer();
    if (buf.byteLength > LIMITS.stt) throw new HttpError(413, "The recording is too long.");
    const hd = new Uint8Array(buf, 0, Math.min(12, buf.byteLength));
    const tag = (o, t) => [...t].every((c, i) => hd[o + i] === c.charCodeAt(0));
    if (hd.length < 12 || !tag(0, "RIFF") || !tag(8, "WAVE")) throw new HttpError(415, "Only WAV audio is supported.");
    const text = await transcribe(env, s, buf, origin);
    log("info", `stt ok model=${s.stt.model} bytes=${buf.byteLength} chars=${[...text].length}`);
    return done(json({ text }));
  }
  let m = r.match(/^\/audio\/([0-9a-f]{32})$/);
  if (m && method === "GET") {
    const v = await env.AI_KV.getWithMetadata(`audio:${uid}:${m[1]}`, "arrayBuffer");
    if (!v.value) throw new HttpError(404, "Audio not found.");
    return new Response(v.value, { headers: { "Content-Type": (v.metadata && v.metadata.ct) || "audio/mpeg", ...SEC, "Cache-Control": "private, max-age=86400" } });
  }
  if (r === "/assets" && method === "POST") {
    const kind = url.searchParams.get("kind");
    if (!KINDS.includes(kind)) throw new HttpError(400, "Invalid kind.");
    const len = Number(req.headers.get("content-length") || 0);
    if (!len) throw new HttpError(411, "Content-Length is required.");
    const name = decodeURIComponent(req.headers.get("x-file-name") || "").slice(0, 80);
    const max = kind === "vrm" ? vrmLimit(env) : LIMITS.img;
    if (len > max) throw new HttpError(413, "The file is too large.");
    const a = await storeAsset(env, uid, kind, kind === "vrm" && env.AI_R2 ? req.body : await req.arrayBuffer(), len, name);
    log("info", `asset uploaded kind=${kind} type=${a.type} bytes=${a.size}`);
    return done(json({ id: a.id, url: ASSET_PREFIX + a.id, type: a.type, size: a.size }));
  }
  if (r === "/assets/import" && method === "POST") {
    const b = await readJSON(req);
    if (!KINDS.includes(b.kind) || b.kind === "vrm") throw new HttpError(400, "Invalid kind.");
    const a = await importImage(env, uid, b.kind, String(b.url || ""));
    log("info", `asset imported kind=${b.kind} type=${a.type} bytes=${a.size}`);
    return done(json({ id: a.id, url: ASSET_PREFIX + a.id, type: a.type, size: a.size }));
  }
  m = r.match(/^\/assets\/([0-9a-f]{32})$/);
  if (m) {
    if (method === "GET" || method === "HEAD") return serveAsset(env, uid, m[1], req);
    if (method === "DELETE") { await deleteAsset(env, uid, m[1]); return done(json({ ok: true })); }
  }
  if (r === "/logs") {
    const k = uk(uid, "logs");
    if (method === "GET") {
      const cur = await kvGet(env, k, []);
      if (url.searchParams.get("download")) {
        const d = new Date(), z = x => String(x).padStart(2, "0");
        const name = `rhlyria-ai-${d.getUTCFullYear()}${z(d.getUTCMonth() + 1)}${z(d.getUTCDate())}-${z(d.getUTCHours())}${z(d.getUTCMinutes())}${z(d.getUTCSeconds())}.log`;
        return new Response(cur.join("\n") + (cur.length ? "\n" : ""), { headers: { "Content-Type": "text/plain; charset=utf-8", "Content-Disposition": `attachment; filename="${name}"`, ...SEC } });
      }
      return json({ count: cur.length, max: LIMITS.logs });
    }
    if (method === "POST") {
      const b = await readJSON(req);
      const list = Array.isArray(b.entries) ? b.entries.slice(0, 50) : [];
      const c = makeLogger(env, uid, s, "web");
      for (const e of list) if (e && typeof e.msg === "string") c.log(RANK[e.level] !== undefined ? e.level : "info", e.msg.slice(0, 200), Number(e.ts));
      await c.flush();
      const cur = await kvGet(env, k, []);
      return json({ count: cur.length, max: LIMITS.logs });
    }
    if (method === "DELETE") { await kvPut(env, k, []); return json({ count: 0, max: LIMITS.logs }); }
  }
  if (r === "/secrets" && method === "GET") return json(secrets(env, s));
  throw new HttpError(404, "Not found.");
}
export default {
  async fetch(req, env, ctx) {
    try {
      return await route(req, env, ctx);
    } catch (e) {
      if (e instanceof HttpError) return json({ error: e.message }, e.status);
      console.error(e && e.stack || e);
      return json({ error: "Internal error." }, 500);
    }
  }
};
