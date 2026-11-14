// Rhlyria AI 2.0.0 (26H2) - build 20261114.0948 - id 2fe8398c
// Copyright (c) 2026 CERETOSPHERE (under COSVerses). Used with special permission from MiNoWa Industry.
// SPDX-License-Identifier: MIT. Third-party notices: see NOTICE.md (React, Liquid Glass SDK).


// src/generated/build.js
var BUILD = {
  "version": "2.0.0",
  "release": "26H2",
  "number": "20261114.0948",
  "id": "2fe8398c",
  "built": "2026-11-14T09:48:29Z",
  "notes": [
    "Open-source release: modular source tree, single-file Worker build",
    "Configurable language model, speech-to-text and text-to-speech providers",
    "Interface languages: English (default), Thai, Chinese",
    "Self-hosted Liquid Glass SDK, no third-party CDN",
    "Server-side speech-to-text, hold-to-talk Live mode"
  ]
};

// src/config.js
var BASE = "/horizon";
var API = BASE + "/api";
var ASSET_PREFIX = API + "/assets/";
var ASSET_RE = /^\/horizon\/api\/assets\/[0-9a-f]{32}$/;
var LIMITS = { chatText: 2e3, ttsText: 1e3, jsonBody: 65536, img: 10 * 1024 * 1024, vrm: 80 * 1024 * 1024, kv: 20 * 1024 * 1024, stt: 4 * 1024 * 1024, hist: 300, logs: 500, audioTtl: 604800 };
var RANK = { debug: 0, info: 1, warn: 2, error: 3 };
var LANGS = ["en", "th", "zh"];
var DEFAULTS = {
  ui: { theme: "light", glass: true, lang: "en" },
  persona: { name: "Rhlyria", prompt: "You are Rhlyria, a friendly, slightly teasing anime-style companion. Call the user {user}.\nReply with short plain text, like a person chatting. Do not narrate scenes or actions and do not use asterisks.\nAnswer in the same language the user writes in, and keep every reply under {max} characters.", maxLen: 300, countMode: "chars" },
  user: { name: "", translate: true, ja: "" },
  llm: { model: "google/gemma-4-26b-a4b-it:free", temp: 8, maxTokens: 1e3 },
  tr: { on: false, target: "ja", showOriginal: true },
  tts: { on: true, voice: "", model: "s2.1-pro", format: "mp3", latency: "balanced", speed: 10, volume: 100 },
  stt: { model: "openai/whisper-large-v3", lang: "auto", autosend: true },
  mem: { turns: 3, auto: true },
  live: { mode: "vrm", micMode: "tap", vrm: "", pngTalk: "", pngIdle: "", flap: true, bg: "", mouth: 10, captions: true },
  log: { level: "info" }
};
var str = (v, d, max) => typeof v === "string" ? v.slice(0, max) : d;
var num = (v, d, min, max) => {
  const n = Number(v);
  return Number.isFinite(n) ? Math.round(Math.min(max, Math.max(min, n))) : d;
};
var bool = (v, d) => typeof v === "boolean" ? v : d;
var oneOf = (v, d, list) => list.includes(v) ? v : d;
var link = (v, d) => typeof v === "string" && (v === "" || ASSET_RE.test(v) || /^https:\/\/[^\s]{1,2000}$/.test(v)) ? v : d;
var slug = (v, d) => typeof v === "string" && /^[A-Za-z0-9._:/@-]{1,120}$/.test(v.trim()) ? v.trim() : d;
function normalize(input) {
  const i = input && typeof input === "object" ? input : {};
  const g = (k) => i[k] && typeof i[k] === "object" ? i[k] : {};
  const D = DEFAULTS;
  const ui = g("ui"), pe = g("persona"), us = g("user"), ll = g("llm"), tr = g("tr"), tt = g("tts"), st = g("stt"), me = g("mem"), li = g("live"), lo = g("log");
  return {
    ui: { theme: oneOf(ui.theme, D.ui.theme, ["light", "dark"]), glass: bool(ui.glass, D.ui.glass), lang: oneOf(ui.lang, D.ui.lang, LANGS) },
    persona: { name: str(pe.name, D.persona.name, 40).trim() || D.persona.name, prompt: str(pe.prompt, D.persona.prompt, 4e3), maxLen: num(pe.maxLen, D.persona.maxLen, 50, 300), countMode: oneOf(pe.countMode, D.persona.countMode, ["chars", "bytes"]) },
    user: { name: str(us.name, "", 40).trim(), translate: bool(us.translate, D.user.translate), ja: str(us.ja, "", 40).trim() },
    llm: { model: slug(ll.model, D.llm.model), temp: num(ll.temp, D.llm.temp, 0, 20), maxTokens: num(ll.maxTokens, D.llm.maxTokens, 50, 4e3) },
    tr: { on: bool(tr.on, D.tr.on), target: oneOf(tr.target, D.tr.target, ["ja", "en", "zh", "th", "ko"]), showOriginal: bool(tr.showOriginal, D.tr.showOriginal) },
    tts: { on: bool(tt.on, D.tts.on), voice: typeof tt.voice === "string" && (tt.voice.trim() === "" || /^[A-Za-z0-9._-]{1,64}$/.test(tt.voice.trim())) ? tt.voice.trim() : D.tts.voice, model: slug(tt.model, D.tts.model), format: oneOf(tt.format, D.tts.format, ["mp3", "opus"]), latency: oneOf(tt.latency, D.tts.latency, ["low", "normal", "balanced"]), speed: num(tt.speed, D.tts.speed, 5, 20), volume: num(tt.volume, D.tts.volume, 0, 100) },
    stt: { model: slug(st.model, D.stt.model), lang: oneOf(st.lang, D.stt.lang, ["auto", "en", "th", "zh", "ja", "ko"]), autosend: bool(st.autosend, D.stt.autosend) },
    mem: { turns: num(me.turns, D.mem.turns, 1, 6), auto: bool(me.auto, D.mem.auto) },
    live: { mode: oneOf(li.mode, D.live.mode, ["vrm", "png"]), micMode: oneOf(li.micMode, D.live.micMode, ["tap", "hold"]), vrm: link(li.vrm, ""), pngTalk: link(li.pngTalk, ""), pngIdle: link(li.pngIdle, ""), flap: bool(li.flap, D.live.flap), bg: link(li.bg, ""), mouth: num(li.mouth, D.live.mouth, 3, 20), captions: bool(li.captions, D.live.captions) },
    log: { level: oneOf(lo.level, D.log.level, ["debug", "info", "warn", "error"]) }
  };
}
var assetIds = (s) => [s.live.vrm, s.live.pngTalk, s.live.pngIdle, s.live.bg].filter((v) => ASSET_RE.test(v)).map((v) => v.slice(ASSET_PREFIX.length));
var uk = (uid, name) => `u:${uid}:${name}`;

// src/util.js
var enc = new TextEncoder();
var dec = new TextDecoder();
var HttpError = class extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
};
var SEC = { "X-Content-Type-Options": "nosniff", "Referrer-Policy": "no-referrer", "Cache-Control": "no-store" };
var json = (data, status = 200, extra = {}) => new Response(JSON.stringify(data), { status, headers: { "Content-Type": "application/json; charset=utf-8", ...SEC, ...extra } });
var rid = () => [...crypto.getRandomValues(new Uint8Array(16))].map((b) => b.toString(16).padStart(2, "0")).join("");
var count = (t, m) => m === "bytes" ? enc.encode(t).length : [...t].length;
var clip = (t, n, m) => {
  if (count(t, m) <= n) return t;
  let o = "";
  for (const c of t) {
    if (count(o + c, m) > n) break;
    o += c;
  }
  const k = Math.max(o.lastIndexOf("\u3002"), o.lastIndexOf("."), o.lastIndexOf("!"), o.lastIndexOf("?"), o.lastIndexOf("\uFF01"), o.lastIndexOf("\uFF1F"), o.lastIndexOf(" "));
  return (k > o.length * 0.5 ? o.slice(0, k + 1) : o).trim();
};
var b64u = (s) => {
  s = s.replace(/-/g, "+").replace(/_/g, "/");
  while (s.length % 4) s += "=";
  const bin = atob(s), a = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) a[i] = bin.charCodeAt(i);
  return a;
};
var toB64 = (u8) => {
  let t = "";
  for (let i = 0; i < u8.length; i += 32768) t += String.fromCharCode.apply(null, u8.subarray(i, i + 32768));
  return btoa(t);
};
async function readJSON(req, max = LIMITS.jsonBody) {
  const len = Number(req.headers.get("content-length") || 0);
  if (len > max) throw new HttpError(413, "Request body is too large.");
  const text = await req.text();
  if (text.length > max) throw new HttpError(413, "Request body is too large.");
  try {
    return JSON.parse(text || "{}");
  } catch (e) {
    throw new HttpError(400, "Invalid JSON.");
  }
}

// src/auth.js
var jwks = null;
var jwksAt = 0;
async function accessKeys(team, force) {
  if (!force && jwks && Date.now() - jwksAt < 36e5) return jwks;
  const r = await fetch(`https://${team}/cdn-cgi/access/certs`);
  if (!r.ok) throw new HttpError(503, "Could not fetch the Cloudflare Access signing keys.");
  jwks = (await r.json()).keys || [];
  jwksAt = Date.now();
  return jwks;
}
async function authenticate(req, env) {
  const team = String(env.ACCESS_TEAM_DOMAIN || "").replace(/^https?:\/\//, "").replace(/\/+$/, "");
  const aud = String(env.ACCESS_AUD || "");
  if (!team && !aud) return { verified: false };
  if (!team || !aud) throw new HttpError(503, "Cloudflare Access is only half configured: set both ACCESS_TEAM_DOMAIN and ACCESS_AUD, or remove both.");
  const token = req.headers.get("Cf-Access-Jwt-Assertion") || ((req.headers.get("Cookie") || "").match(/(?:^|;\s*)CF_Authorization=([^;]+)/) || [])[1];
  const deny = () => new HttpError(401, "Not authenticated. Reload the page to sign in again.");
  if (!token) throw deny();
  const parts = token.split(".");
  if (parts.length !== 3) throw deny();
  let header, payload;
  try {
    header = JSON.parse(dec.decode(b64u(parts[0])));
    payload = JSON.parse(dec.decode(b64u(parts[1])));
  } catch (e) {
    throw deny();
  }
  if (header.alg !== "RS256") throw deny();
  let jwk = (await accessKeys(team, false)).find((k) => k.kid === header.kid);
  if (!jwk) jwk = (await accessKeys(team, true)).find((k) => k.kid === header.kid);
  if (!jwk) throw deny();
  const key = await crypto.subtle.importKey("jwk", jwk, { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" }, false, ["verify"]);
  let ok = false;
  try {
    ok = await crypto.subtle.verify("RSASSA-PKCS1-v1_5", key, b64u(parts[2]), enc.encode(parts[0] + "." + parts[1]));
  } catch (e) {
    ok = false;
  }
  if (!ok) throw deny();
  const now = Date.now() / 1e3;
  if (!payload.exp || payload.exp < now) throw deny();
  if (payload.nbf && payload.nbf > now + 30) throw deny();
  if (payload.iss !== `https://${team}`) throw deny();
  if (![].concat(payload.aud || []).includes(aud)) throw deny();
  const email = String(payload.email || payload.common_name || payload.sub || "").toLowerCase();
  if (!email) throw deny();
  const allow = String(env.ALLOWED_EMAILS || "").split(",").map((x) => x.trim().toLowerCase()).filter(Boolean);
  if (allow.length && !allow.includes(email)) throw new HttpError(403, "This account is not allowed.");
  return { verified: true, email };
}

// src/store.js
var kvGet = async (env, k, d) => {
  const v = await env.AI_KV.get(k, "json");
  return v ?? d;
};
var kvPut = (env, k, v, o) => env.AI_KV.put(k, JSON.stringify(v), o);
var loadSettings = async (env, uid) => normalize(await kvGet(env, uk(uid, "settings"), {}));
function makeLogger(env, uid, s, src) {
  const min = RANK[s.log.level] ?? 1;
  const buf = [];
  const log = (lv, msg, ts) => {
    if ((RANK[lv] ?? 1) < min) return;
    const at = Number.isFinite(ts) && ts > Date.now() - 864e5 && ts <= Date.now() + 5e3 ? ts : Date.now();
    buf.push(`${new Date(at).toISOString()} [${lv.toUpperCase()}] [${src}] ${String(msg).replace(/\s+/g, " ").slice(0, 300)}`);
  };
  const flush = async () => {
    if (!buf.length) return;
    const k = uk(uid, "logs");
    const cur = await kvGet(env, k, []);
    if (cur.length < LIMITS.logs) await kvPut(env, k, cur.concat(buf).slice(0, LIMITS.logs));
    buf.length = 0;
  };
  return { log, flush };
}
var pairsOf = (hist) => {
  const out = [];
  let u = null;
  for (const m of hist) {
    if (m.role === "user") u = m;
    else if (u) {
      out.push([u, m]);
      u = null;
    }
  }
  return out;
};
var putAudio = (env, uid, id, a) => env.AI_KV.put(`audio:${uid}:${id}`, a.buf, { expirationTtl: LIMITS.audioTtl, metadata: { ct: a.ct } });
async function wipeAudio(env, uid) {
  let cursor;
  do {
    const l = await env.AI_KV.list({ prefix: `audio:${uid}:`, cursor });
    await Promise.all(l.keys.map((k) => env.AI_KV.delete(k.name)));
    cursor = l.list_complete ? void 0 : l.cursor;
  } while (cursor);
}
var sniff = (b) => {
  if (b.length >= 8 && b[0] === 137 && b[1] === 80 && b[2] === 78 && b[3] === 71) return "image/png";
  if (b.length >= 3 && b[0] === 255 && b[1] === 216 && b[2] === 255) return "image/jpeg";
  if (b.length >= 4 && b[0] === 71 && b[1] === 73 && b[2] === 70 && b[3] === 56) return "image/gif";
  if (b.length >= 12 && b[0] === 82 && b[1] === 73 && b[2] === 70 && b[3] === 70 && b[8] === 87 && b[9] === 69 && b[10] === 66 && b[11] === 80) return "image/webp";
  if (b.length >= 4 && b[0] === 103 && b[1] === 108 && b[2] === 84 && b[3] === 70) return "model/gltf-binary";
  return null;
};
var KINDS = ["pngTalk", "pngIdle", "bg", "vrm"];
var assetKey = (uid, id) => `${uid}/${id}`;
var vrmLimit = (env) => env.AI_R2 ? LIMITS.vrm : LIMITS.kv;
async function storeAsset(env, uid, kind, bytesOrStream, size, name) {
  const id = rid();
  if (kind === "vrm") {
    if (size > vrmLimit(env)) throw new HttpError(413, `The VRM file is larger than ${vrmLimit(env) / 1048576} MB.`);
    if (env.AI_R2) {
      await env.AI_R2.put(assetKey(uid, id), bytesOrStream, { httpMetadata: { contentType: "model/gltf-binary" }, customMetadata: { kind, name } });
      const head = await env.AI_R2.get(assetKey(uid, id), { range: { offset: 0, length: 12 } });
      const b = head ? new Uint8Array(await head.arrayBuffer()) : new Uint8Array();
      if (sniff(b) !== "model/gltf-binary") {
        await env.AI_R2.delete(assetKey(uid, id));
        throw new HttpError(415, "This file is not a VRM/GLB model.");
      }
    } else {
      const buf2 = bytesOrStream instanceof ArrayBuffer ? bytesOrStream : await new Response(bytesOrStream).arrayBuffer();
      if (sniff(new Uint8Array(buf2, 0, Math.min(12, buf2.byteLength))) !== "model/gltf-binary") throw new HttpError(415, "This file is not a VRM/GLB model.");
      await env.AI_KV.put(`asset:${uid}:${id}`, buf2, { metadata: { ct: "model/gltf-binary", kind, name } });
    }
    return { id, type: "model/gltf-binary", size };
  }
  const buf = bytesOrStream;
  if (buf.byteLength > LIMITS.img) throw new HttpError(413, "Images must be 10 MB or smaller.");
  const type = sniff(new Uint8Array(buf, 0, Math.min(12, buf.byteLength)));
  if (!type || !type.startsWith("image/")) throw new HttpError(415, "Only PNG, JPEG, WebP and GIF images are supported.");
  if (env.AI_R2) await env.AI_R2.put(assetKey(uid, id), buf, { httpMetadata: { contentType: type }, customMetadata: { kind, name } });
  else await env.AI_KV.put(`asset:${uid}:${id}`, buf, { metadata: { ct: type, kind, name } });
  return { id, type, size: buf.byteLength };
}
async function deleteAsset(env, uid, id) {
  if (env.AI_R2) await env.AI_R2.delete(assetKey(uid, id));
  await env.AI_KV.delete(`asset:${uid}:${id}`);
}
async function serveAsset(env, uid, id, req) {
  const base = { ...SEC, "Cache-Control": "private, max-age=31536000, immutable" };
  if (env.AI_R2) {
    const o = await env.AI_R2.get(assetKey(uid, id), { range: req.headers });
    if (!o) throw new HttpError(404, "File not found.");
    const h = new Headers({ ...base, "Accept-Ranges": "bytes" });
    o.writeHttpMetadata(h);
    h.set("etag", o.httpEtag);
    let status = 200;
    if (o.range && req.headers.get("range")) {
      status = 206;
      const r2 = o.range;
      const off = r2.offset ?? Math.max(0, o.size - (r2.suffix || 0));
      const len = r2.length ?? (r2.suffix ? Math.min(r2.suffix, o.size) : o.size - off);
      h.set("Content-Range", `bytes ${off}-${off + len - 1}/${o.size}`);
      h.set("Content-Length", String(len));
    } else h.set("Content-Length", String(o.size));
    return new Response(o.body, { status, headers: h });
  }
  const r = await env.AI_KV.getWithMetadata(`asset:${uid}:${id}`, "arrayBuffer");
  if (!r.value) throw new HttpError(404, "File not found.");
  return new Response(r.value, { headers: { ...base, "Content-Type": r.metadata && r.metadata.ct || "application/octet-stream" } });
}
async function importImage(env, uid, kind, raw) {
  let u;
  try {
    u = new URL(raw);
  } catch (e) {
    throw new HttpError(400, "Invalid link.");
  }
  const h = u.hostname;
  if (u.protocol !== "https:" || u.username || u.password || h === "localhost" || /^[\d.]+$/.test(h) || h.includes(":") || h.endsWith(".local") || h.endsWith(".internal")) throw new HttpError(400, "This link is not allowed. Use an https link to a public website.");
  const res = await fetch(u.toString(), { headers: { Accept: "image/*" }, signal: AbortSignal.timeout(2e4) });
  if (!res.ok) throw new HttpError(502, `Could not download the image (${res.status}).`);
  if (Number(res.headers.get("content-length") || 0) > LIMITS.img) throw new HttpError(413, "Images must be 10 MB or smaller.");
  const reader = res.body.getReader();
  const chunks = [];
  let total = 0;
  for (; ; ) {
    const { value, done } = await reader.read();
    if (done) break;
    total += value.length;
    if (total > LIMITS.img) {
      await reader.cancel();
      throw new HttpError(413, "Images must be 10 MB or smaller.");
    }
    chunks.push(value);
  }
  const all = new Uint8Array(total);
  let o = 0;
  for (const c of chunks) {
    all.set(c, o);
    o += c.length;
  }
  return storeAsset(env, uid, kind, all.buffer, total, decodeURIComponent(u.pathname.split("/").pop() || "").slice(0, 80));
}

// src/providers/llm.js
var DEFAULT_BASE = "https://openrouter.ai/api/v1";
var llmBase = (env) => String(env.LLM_BASE_URL || DEFAULT_BASE).replace(/\/+$/, "");
var llmKey = (env) => String(env.LLM_API_KEY || env.OPENROUTER_API_KEY || "");
var llmModelFallback = (env) => String(env.LLM_MODEL || env.OPENROUTER_MODEL || "");
var isOpenRouter = (url) => {
  try {
    return new URL(url).hostname.endsWith("openrouter.ai");
  } catch (e) {
    return false;
  }
};
var authHeaders = (env, url, key, origin) => {
  const h = { Authorization: `Bearer ${key}` };
  if (isOpenRouter(url)) {
    h["HTTP-Referer"] = origin;
    h["X-Title"] = "Rhlyria AI";
  }
  return h;
};
var errorDetail = (res, data) => {
  const e = data && data.error;
  const raw = e && e.metadata && e.metadata.raw;
  const rawText = typeof raw === "string" ? raw : raw ? JSON.stringify(raw) : "";
  const provider = e && e.metadata && e.metadata.provider_name;
  const message = e && (typeof e === "string" ? e : e.message) || String(res.status);
  return [message, provider ? `(${provider})` : "", rawText].filter(Boolean).join(" ").replace(/\s+/g, " ").slice(0, 400);
};
var providerError = (res, data, label, model) => {
  const hint = { 401: "the API key was rejected", 402: "not enough credit", 404: `model "${model}" was not found, check the model name in Settings`, 408: "the model timed out", 429: "rate limit reached, try again later or pick another model in Settings" }[res.status];
  return new HttpError(502, `${label} ${res.status}${hint ? ": " + hint : ""} [${errorDetail(res, data)}]`);
};
var SYSTEM_REJECTED = /developer instruction|system (prompt|message|instruction|role)|instruction.{0,30}not (enabled|supported)|not supported.{0,30}system/i;
var foldSystem = (msgs) => {
  const sys = msgs.filter((m) => m.role === "system").map((m) => m.content).join("\n\n");
  const rest = msgs.filter((m) => m.role !== "system");
  if (!sys) return rest;
  const i = rest.findIndex((m) => m.role === "user");
  if (i < 0) return [{ role: "user", content: sys }, ...rest];
  const out = [...rest];
  out[i] = { ...out[i], content: `${sys}

---

${out[i].content}` };
  return out;
};
async function chat(env, s, messages, origin, o = {}) {
  const base = llmBase(env);
  const url = base + "/chat/completions";
  const key = llmKey(env);
  const model = (s.llm.model || llmModelFallback(env)).trim();
  if (!key) throw new HttpError(503, "No language model API key is set. Add the LLM_API_KEY secret.");
  if (!model) throw new HttpError(400, "No language model is set. Choose one in Settings.");
  const maxTokens = o.maxTokens ?? s.llm.maxTokens;
  const call = async (msgs2, extra = {}) => {
    const res = await fetch(url, {
      method: "POST",
      headers: { ...authHeaders(env, url, key, origin), "Content-Type": "application/json" },
      body: JSON.stringify({ model, messages: msgs2, temperature: o.temp ?? s.llm.temp / 10, max_tokens: maxTokens, ...extra }),
      signal: AbortSignal.timeout(6e4)
    });
    return { res, data: await res.json().catch(() => null) };
  };
  const textOf = (d) => {
    const c = d && d.choices && d.choices[0] && d.choices[0].message && d.choices[0].message.content;
    return typeof c === "string" ? c : Array.isArray(c) ? c.map((p) => p.text || "").join("") : "";
  };
  let msgs = messages;
  let r = await call(msgs);
  if (!r.res.ok && SYSTEM_REJECTED.test(errorDetail(r.res, r.data))) {
    msgs = foldSystem(messages);
    r = await call(msgs);
  }
  if (!r.res.ok) throw providerError(r.res, r.data, "Language model", model);
  let text = textOf(r.data);
  if (!text.trim()) {
    for (const extra of [{ reasoning: { effort: "none" } }, { max_tokens: Math.max(2500, maxTokens * 3) }]) {
      const r2 = await call(msgs, extra);
      if (r2.res.ok && textOf(r2.data).trim()) {
        text = textOf(r2.data);
        break;
      }
    }
  }
  if (!text.trim()) throw new HttpError(502, `Model "${model}" returned no text (it may have spent its token budget on reasoning). Try another model or raise Max tokens in Settings.`);
  return text;
}

// src/providers/tts.js
var DEFAULT_URL = "https://api.fish.audio/v1/tts";
var ttsUrl = (env) => String(env.TTS_URL || DEFAULT_URL);
var ttsKey = (env) => String(env.TTS_API_KEY || env.FISH_API_KEY || "");
var ttsFormat = (env) => String(env.TTS_FORMAT || "fish");
var ttsConfigured = (env) => !!ttsKey(env);
var volDb = (p) => p <= 0 ? -40 : Math.max(-40, Math.min(0, Math.round(200 * Math.log10(p / 100)) / 10));
async function synthesize(env, s, text) {
  const key = ttsKey(env);
  if (!key) throw new HttpError(503, "No text-to-speech API key is set. Add the TTS_API_KEY secret.");
  const t = s.tts, format = ttsFormat(env);
  let headers, body;
  if (format === "openai") {
    headers = { Authorization: `Bearer ${key}`, "Content-Type": "application/json" };
    body = { model: t.model, input: text, voice: t.voice || "alloy", response_format: t.format, speed: t.speed / 10 };
  } else {
    headers = { Authorization: `Bearer ${key}`, "Content-Type": "application/json", model: t.model };
    body = { text, format: t.format, latency: t.latency, normalize: true, prosody: { speed: t.speed / 10, volume: volDb(t.volume), normalize_loudness: true } };
    if (t.voice) body.reference_id = t.voice;
    if (t.format === "mp3") body.mp3_bitrate = 64;
    else body.opus_bitrate = 32e3;
    if (/[\u3040-\u30ff]/.test(text)) body.language = "ja";
  }
  const res = await fetch(ttsUrl(env), { method: "POST", headers, body: JSON.stringify(body), signal: AbortSignal.timeout(6e4) });
  if (!res.ok) {
    let m = "";
    try {
      const j = await res.json();
      m = j.message || j.reason || j.error && (j.error.message || j.error) || "";
    } catch (e) {
    }
    throw new HttpError(502, `Text-to-speech ${res.status}${m ? ": " + String(m).slice(0, 300) : ""}`);
  }
  const buf = await res.arrayBuffer();
  if (!buf.byteLength) throw new HttpError(502, "The voice provider returned no audio.");
  return { buf, ct: t.format === "mp3" ? "audio/mpeg" : "audio/ogg" };
}

// src/chat.js
var unit = (s) => s.persona.countMode === "bytes" ? "bytes" : "characters";
var personaPrompt = (s) => s.persona.prompt.replaceAll("{max}", String(s.persona.maxLen)).replaceAll("{user}", s.user.name || "senpai");
var cleanReply = (t) => String(t || "").replace(/\*[^*\n]*\*/g, "").replace(/^\s*"([\s\S]*)"\s*$/, "$1").replace(/\n{3,}/g, "\n\n").trim();
var LANG_NAMES = { ja: "Japanese", en: "English", zh: "Simplified Chinese", th: "Thai", ko: "Korean" };
async function fit(env, s, text, origin, log, label) {
  const lim = s.persona.maxLen, mode = s.persona.countMode;
  if (count(text, mode) <= lim) return text;
  log("warn", `${label} ${count(text, mode)} > ${lim}, asking the model to shorten it`);
  try {
    const r = cleanReply(await chat(env, s, [{ role: "system", content: `Shorten the following text to at most ${lim} ${mode === "bytes" ? "UTF-8 bytes" : "characters"}. Keep the same language, tone and meaning. Output only the shortened text.` }, { role: "user", content: text }], origin, { temp: 0.3, maxTokens: 400 }));
    if (r && count(r, mode) <= lim) return r;
    if (r) text = r;
  } catch (e) {
    log("warn", `${label} shorten failed: ${e.message}`);
  }
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
  return cleanReply(await chat(env, s, [{ role: "system", content: sys }, { role: "user", content: text }], origin, { temp: 0.3, maxTokens: 500 }));
}
async function summarize(env, uid, s, origin, log) {
  if (!s.mem.auto) return;
  const hist = await kvGet(env, uk(uid, "hist"), []);
  const mem = await kvGet(env, uk(uid, "memory"), { summary: "", done: 0 });
  const pairs = pairsOf(hist);
  let n = 0, changed = false;
  while (pairs.length - mem.done > s.mem.turns && n < 3) {
    const [a, b] = pairs[mem.done];
    try {
      const out = await chat(env, s, [{ role: "system", content: "You maintain a compact long-term memory of a conversation between a user and a character. Merge the new exchange into the existing summary. Keep only important facts, preferences, names, promises and ongoing topics. Write at most 800 characters as plain short lines, in the language the user mostly uses. Output only the updated summary." }, { role: "user", content: `Existing summary:
${mem.summary || "(none)"}

New exchange:
User: ${a.text}
Character: ${b.text}` }], origin, { temp: 0.3, maxTokens: 600 });
      mem.summary = out.trim().slice(0, 2e3);
      log("info", "memory: merged 1 older turn into the summary");
    } catch (e) {
      const line = `\u2022 User: "${[...a.text].slice(0, 40).join("")}" \u2192 ${[...b.text].slice(0, 40).join("")}`;
      mem.summary = ((mem.summary ? mem.summary + "\n" : "") + line).slice(-2e3);
      log("warn", "memory summary fallback: " + e.message);
    }
    mem.done++;
    n++;
    changed = true;
  }
  if (changed) await kvPut(env, uk(uid, "memory"), mem);
}
function handleChat(env, ctx, uid, s, origin, body) {
  const text = typeof body.text === "string" ? body.text.trim() : "";
  if (!text) throw new HttpError(400, "The message is empty.");
  if (text.length > LIMITS.chatText) throw new HttpError(413, "The message is too long.");
  const from = body.from === "live" ? "live" : "chat";
  const speak = (from === "live" || s.tts.on) && ttsConfigured(env);
  const { log, flush } = makeLogger(env, uid, s, "chat");
  const { readable, writable } = new TransformStream();
  const w = writable.getWriter();
  const send = (o) => w.write(enc.encode(JSON.stringify(o) + "\n"));
  ctx.waitUntil((async () => {
    try {
      log("info", `user(${from}) chars=${[...text].length}`);
      const hist = await kvGet(env, uk(uid, "hist"), []);
      const mem = await kvGet(env, uk(uid, "memory"), { summary: "", done: 0 });
      const recent = pairsOf(hist).slice(-s.mem.turns);
      const rules = `

Reply with plain conversational text, at most ${s.persona.maxLen} ${unit(s)}. Reply in the same language the user writes in.`;
      const sys = personaPrompt(s) + rules + (mem.summary ? `

Memory of the earlier conversation:
${mem.summary}` : "");
      const messages = [{ role: "system", content: sys }];
      for (const [a, b] of recent) messages.push({ role: "user", content: a.text }, { role: "assistant", content: b.text });
      messages.push({ role: "user", content: text });
      await send({ stage: "think" });
      let reply = cleanReply(await chat(env, s, messages, origin));
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
        } catch (e) {
          ttsError = e.message;
          log("error", "tts failed: " + e.message);
        }
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
      log("info", `reply ok chars=${[...ja || reply].length}`);
      await send({ done: true, message: am, userId: um.id, ttsError });
      ctx.waitUntil((async () => {
        try {
          await summarize(env, uid, s, origin, log);
        } catch (e) {
          log("error", "summarize failed: " + e.message);
        }
        await flush();
      })());
    } catch (e) {
      log("error", "chat failed: " + (e && e.message));
      try {
        await send({ error: e instanceof HttpError ? e.message : "Internal error." });
      } catch (x) {
      }
      await flush();
    } finally {
      try {
        await w.close();
      } catch (e) {
      }
    }
  })());
  return new Response(readable, { headers: { "Content-Type": "application/x-ndjson; charset=utf-8", "X-Accel-Buffering": "no", ...SEC } });
}

// src/providers/stt.js
var sttUrl = (env) => String(env.STT_URL || llmBase(env) + "/audio/transcriptions");
var sttKey = (env) => String(env.STT_API_KEY || llmKey(env));
var sttFormat = (env) => String(env.STT_FORMAT || (isOpenRouter(sttUrl(env)) ? "openrouter" : "openai"));
async function transcribe(env, s, buf, origin) {
  const url = sttUrl(env), key = sttKey(env), format = sttFormat(env);
  if (!key) throw new HttpError(503, "No speech-to-text API key is set. Add the STT_API_KEY or LLM_API_KEY secret.");
  const headers = authHeaders(env, url, key, origin);
  let body;
  if (format === "openai") {
    body = new FormData();
    body.append("file", new Blob([buf], { type: "audio/wav" }), "audio.wav");
    body.append("model", s.stt.model);
    if (s.stt.lang !== "auto") body.append("language", s.stt.lang);
    body.append("response_format", "json");
    body.append("temperature", "0");
  } else {
    const o = { model: s.stt.model, input_audio: { data: toB64(new Uint8Array(buf)), format: "wav" }, temperature: 0 };
    if (s.stt.lang !== "auto") o.language = s.stt.lang;
    headers["Content-Type"] = "application/json";
    body = JSON.stringify(o);
  }
  const res = await fetch(url, { method: "POST", headers, body, signal: AbortSignal.timeout(6e4) });
  const data = await res.json().catch(() => null);
  if (!res.ok) throw providerError(res, data, "Speech-to-text", s.stt.model);
  return String(data && data.text || "").trim();
}

// src/generated/assets.js
var ASSETS = { "html": '<!doctype html>\n<html lang="en" data-theme="light">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n<meta name="theme-color" content="#f5f5f5">\n<title>Rhlyria AI</title>\n<link rel="stylesheet" href="/horizon/vendor/liquid.css?v={{V}}">\n<link rel="stylesheet" href="/horizon/app.css?v={{V}}">\n<script src="/horizon/perf.js?v={{V}}"></script>\n<script src="/horizon/vendor/react.js?v={{V}}"></script>\n<script src="/horizon/vendor/react-dom.js?v={{V}}"></script>\n</head>\n<body>\n<div id="root"></div>\n<script type="module" src="/horizon/app.js?v={{V}}"></script>\n</body>\n</html>\n', "files": { "/app.js": { "type": "text/javascript; charset=utf-8", "body": `// src/ui/core/react.js
var { useState, useRef, useEffect, useCallback } = React;
var h = React.createElement;
var { createRoot } = ReactDOM;

// src/ui/core/icons.js
var svg = (...d) => h("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true" }, d.map((p, i) => h("path", { key: i, d: p })));
var I = {
  chat: svg("M5 4h14a1 1 0 011 1v10a1 1 0 01-1 1h-8l-4 4v-4H5a1 1 0 01-1-1V5a1 1 0 011-1z"),
  live: svg("M4 10v4", "M8 7v10", "M12 4v16", "M16 8v8", "M20 10.5v3"),
  gear: svg("M4 8h9", "M17 8h3", "M4 16h3", "M11 16h9", "M15 8a2 2 0 10-4 0 2 2 0 004 0z", "M9 16a2 2 0 10-4 0 2 2 0 004 0z"),
  mic: svg("M12 3a3 3 0 013 3v6a3 3 0 01-6 0V6a3 3 0 013-3z", "M6 11a6 6 0 0012 0", "M12 17v4"),
  send: svg("M4 12l16-8-6 16-3-7z"),
  play: svg("M8 5l11 7-11 7z"),
  stop: svg("M7 7h10v10H7z"),
  x: svg("M6 6l12 12", "M18 6L6 18"),
  check: svg("M5 12.5l4.5 4.5L19 7"),
  eye: svg("M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z", "M15 12a3 3 0 10-6 0 3 3 0 006 0z"),
  eyeOff: svg("M3 3l18 18", "M10.6 6.1A9.6 9.6 0 0112 6c6 0 10 6 10 6a17 17 0 01-3.3 3.9", "M6.3 7.6C3.6 9.3 2 12 2 12s4 7 10 7a9.6 9.6 0 004-.9"),
  spin: h("svg", { className: "spin", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", "aria-hidden": "true" }, h("path", { d: "M12 3a9 9 0 019 9" }))
};
var dots = h("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 3, strokeLinecap: "round", "aria-hidden": "true" }, h("path", { d: "M5 12h.01M12 12h.01M19 12h.01" }));

// src/ui/core/glass.js
var UI = {};
var version = new URL(import.meta.url).search;
var mod = null;
try {
  mod = await import("/horizon/vendor/liquid.js" + version);
} catch (e) {
  mod = null;
}
var glassOk = !!mod;
var Lib = mod ? { Button: mod.Button, Glass: mod.Glass, Input: mod.Input, Menu: mod.Menu, SegmentedControl: mod.SegmentedControl, Slider: mod.Slider, Switch: mod.Switch, TabBar: mod.TabBar } : null;

// src/ui/core/plain.js
function PMenu({ items, ...p }) {
  const [o, setO] = useState(false);
  const ref = useRef();
  useEffect(() => {
    if (!o) return;
    const f = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setO(false);
    };
    const k = (e) => {
      if (e.key === "Escape") setO(false);
    };
    document.addEventListener("pointerdown", f);
    document.addEventListener("keydown", k);
    return () => {
      document.removeEventListener("pointerdown", f);
      document.removeEventListener("keydown", k);
    };
  }, [o]);
  return h(
    "div",
    { className: "pl-menu", ref },
    h("button", { type: "button", className: "pl-btn", "data-icon": "only", "aria-label": p["aria-label"], "aria-expanded": o, onClick: () => setO(!o) }, dots),
    o && h("div", { className: "pl-pop", role: "menu" }, items.map((it, i) => it === "separator" ? h("hr", { key: i }) : h("button", { key: i, type: "button", role: "menuitem", "data-destructive": it.destructive ? "" : void 0, onClick: () => {
      setO(false);
      if (it.onSelect) it.onSelect();
    } }, it.label)))
  );
}
var Plain = {
  Button: ({ icon, variant, destructive, tint, className, children, ...p }) => h("button", { type: "button", className: "pl-btn" + (className ? " " + className : ""), "data-variant": variant, "data-destructive": destructive ? "" : void 0, "data-icon": icon ? children ? "lead" : "only" : void 0, ...p }, icon, children),
  Glass: ({ className, children, ...p }) => h("div", { className: "pl-glass" + (className ? " " + className : ""), ...p }, children),
  Input: ({ value, onValueChange, style, ...p }) => h("div", { className: "pl-input", style }, h("input", { value, onChange: (e) => onValueChange && onValueChange(e.target.value), ...p })),
  Menu: PMenu,
  SegmentedControl: ({ items, value, onValueChange, style, ...p }) => h("div", { className: "pl-seg", role: "radiogroup", style, "aria-label": p["aria-label"] }, items.map((it) => h("button", { key: it.value, type: "button", role: "radio", "aria-checked": it.value === value, onClick: () => onValueChange(it.value) }, it.label))),
  Slider: ({ min, max, step, value, onValueChange, style, ...p }) => h("input", { type: "range", className: "pl-range", min, max, step, value, style, "aria-label": p["aria-label"], onChange: (e) => onValueChange(Number(e.target.value)) }),
  Switch: ({ checked, onCheckedChange, ...p }) => h("button", { type: "button", role: "switch", className: "pl-switch", "aria-checked": !!checked, "aria-label": p["aria-label"], onClick: () => onCheckedChange(!checked) }, h("i")),
  TabBar: ({ items, value, onValueChange, style, ...p }) => h("nav", { className: "pl-tabs", style, "aria-label": p["aria-label"] }, items.map((it) => h("button", { key: it.value, type: "button", role: "tab", "aria-selected": it.value === value, onClick: () => onValueChange(it.value) }, it.icon, it.label)))
};

// src/ui/core/defaults.js
var readGlass = () => {
  try {
    return localStorage.getItem("rhlyria.glass") !== "0";
  } catch (e) {
    return true;
  }
};
var readLang = () => {
  try {
    const v = localStorage.getItem("rhlyria.lang");
    return v === "th" || v === "zh" ? v : "en";
  } catch (e) {
    return "en";
  }
};
var DEFAULTS = {
  ui: { theme: "light", glass: readGlass(), lang: readLang() },
  persona: { name: "Rhlyria", prompt: "", maxLen: 300, countMode: "chars" },
  user: { name: "", translate: true, ja: "" },
  llm: { model: "", temp: 8, maxTokens: 1e3 },
  tr: { on: false, target: "ja", showOriginal: true },
  tts: { on: true, voice: "", model: "s2.1-pro", format: "mp3", latency: "balanced", speed: 10, volume: 100 },
  stt: { model: "openai/whisper-large-v3", lang: "auto", autosend: true },
  mem: { turns: 3, auto: true },
  live: { mode: "vrm", micMode: "tap", vrm: "", pngTalk: "", pngIdle: "", flap: true, bg: "", mouth: 10, captions: true },
  log: { level: "info" }
};

// src/ui/core/util.js
var _id = 10;
var nid = () => ++_id;
var count = (t2, m) => m === "bytes" ? new TextEncoder().encode(t2).length : [...t2].length;
var fmt = (s) => Math.floor(s / 60) + ":" + String(s % 60).padStart(2, "0");
var dl = (name, text, type) => {
  const u = URL.createObjectURL(new Blob([text], { type }));
  const a = document.createElement("a");
  a.href = u;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(u), 1500);
};

// src/ui/i18n/en.js
var en_default = {};

// src/ui/i18n/th.js
var th_default = {
  "Thinking\\u2026": "\\u0E01\\u0E33\\u0E25\\u0E31\\u0E07\\u0E04\\u0E34\\u0E14\\u0E04\\u0E33\\u0E15\\u0E2D\\u0E1A\\u2026",
  "Translating\\u2026": "\\u0E01\\u0E33\\u0E25\\u0E31\\u0E07\\u0E41\\u0E1B\\u0E25\\u0E40\\u0E1B\\u0E47\\u0E19\\u0E20\\u0E32\\u0E29\\u0E32\\u0E0D\\u0E35\\u0E48\\u0E1B\\u0E38\\u0E48\\u0E19\\u2026",
  "Generating voice\\u2026": "\\u0E01\\u0E33\\u0E25\\u0E31\\u0E07\\u0E2A\\u0E23\\u0E49\\u0E32\\u0E07\\u0E40\\u0E2A\\u0E35\\u0E22\\u0E07\\u2026",
  "Can't reach the server. If you use Cloudflare Access, reload the page to sign in again.": "\\u0E40\\u0E0A\\u0E37\\u0E48\\u0E2D\\u0E21\\u0E15\\u0E48\\u0E2D\\u0E40\\u0E0B\\u0E34\\u0E23\\u0E4C\\u0E1F\\u0E40\\u0E27\\u0E2D\\u0E23\\u0E4C\\u0E44\\u0E21\\u0E48\\u0E44\\u0E14\\u0E49 \\u0E16\\u0E49\\u0E32\\u0E43\\u0E0A\\u0E49 Cloudflare Access \\u0E43\\u0E2B\\u0E49\\u0E23\\u0E35\\u0E40\\u0E1F\\u0E23\\u0E0A\\u0E2B\\u0E19\\u0E49\\u0E32\\u0E40\\u0E1E\\u0E37\\u0E48\\u0E2D\\u0E40\\u0E02\\u0E49\\u0E32\\u0E2A\\u0E39\\u0E48\\u0E23\\u0E30\\u0E1A\\u0E1A\\u0E43\\u0E2B\\u0E21\\u0E48",
  "Error ": "\\u0E02\\u0E49\\u0E2D\\u0E1C\\u0E34\\u0E14\\u0E1E\\u0E25\\u0E32\\u0E14 ",
  "Stop audio": "\\u0E2B\\u0E22\\u0E38\\u0E14\\u0E40\\u0E2A\\u0E35\\u0E22\\u0E07",
  "Play audio": "\\u0E40\\u0E25\\u0E48\\u0E19\\u0E40\\u0E2A\\u0E35\\u0E22\\u0E07",
  "Sample character": "\\u0E15\\u0E31\\u0E27\\u0E25\\u0E30\\u0E04\\u0E23\\u0E15\\u0E31\\u0E27\\u0E2D\\u0E22\\u0E48\\u0E32\\u0E07",
  "Stored on the server": "\\u0E40\\u0E01\\u0E47\\u0E1A\\u0E1A\\u0E19\\u0E40\\u0E0B\\u0E34\\u0E23\\u0E4C\\u0E1F\\u0E40\\u0E27\\u0E2D\\u0E23\\u0E4C\\u0E41\\u0E25\\u0E49\\u0E27",
  "Using an external link": "\\u0E43\\u0E0A\\u0E49\\u0E25\\u0E34\\u0E07\\u0E01\\u0E4C\\u0E20\\u0E32\\u0E22\\u0E19\\u0E2D\\u0E01",
  "Will be imported on save": "\\u0E08\\u0E30\\u0E19\\u0E33\\u0E40\\u0E02\\u0E49\\u0E32\\u0E40\\u0E21\\u0E37\\u0E48\\u0E2D\\u0E01\\u0E14\\u0E1A\\u0E31\\u0E19\\u0E17\\u0E36\\u0E01",
  "Will be uploaded on save": "\\u0E08\\u0E30\\u0E2D\\u0E31\\u0E1B\\u0E42\\u0E2B\\u0E25\\u0E14\\u0E40\\u0E21\\u0E37\\u0E48\\u0E2D\\u0E01\\u0E14\\u0E1A\\u0E31\\u0E19\\u0E17\\u0E36\\u0E01",
  "https://\\u2026/avatar.vrm or choose a file": "https://\\u2026/avatar.vrm \\u0E2B\\u0E23\\u0E37\\u0E2D\\u0E40\\u0E25\\u0E37\\u0E2D\\u0E01\\u0E44\\u0E1F\\u0E25\\u0E4C",
  "Paste an image link https://\\u2026": "\\u0E27\\u0E32\\u0E07\\u0E25\\u0E34\\u0E07\\u0E01\\u0E4C\\u0E23\\u0E39\\u0E1B\\u0E20\\u0E32\\u0E1E https://\\u2026",
  "Choose file": "\\u0E40\\u0E25\\u0E37\\u0E2D\\u0E01\\u0E44\\u0E1F\\u0E25\\u0E4C",
  "Clear": "\\u0E25\\u0E49\\u0E32\\u0E07",
  "Preview": "\\u0E15\\u0E31\\u0E27\\u0E2D\\u0E22\\u0E48\\u0E32\\u0E07",
  "Key found": "\\u0E1E\\u0E1A\\u0E04\\u0E35\\u0E22\\u0E4C\\u0E41\\u0E25\\u0E49\\u0E27",
  "Missing": "\\u0E44\\u0E21\\u0E48\\u0E1E\\u0E1A",
  "Not checked": "\\u0E22\\u0E31\\u0E07\\u0E44\\u0E21\\u0E48\\u0E15\\u0E23\\u0E27\\u0E08",
  "Appearance": "\\u0E23\\u0E39\\u0E1B\\u0E25\\u0E31\\u0E01\\u0E29\\u0E13\\u0E4C",
  "Theme": "\\u0E18\\u0E35\\u0E21",
  "Light": "\\u0E2A\\u0E27\\u0E48\\u0E32\\u0E07",
  "Dark": "\\u0E21\\u0E37\\u0E14",
  "Liquid Glass effect": "\\u0E40\\u0E2D\\u0E1F\\u0E40\\u0E1F\\u0E01\\u0E15\\u0E4C Liquid Glass",
  "On: translucent glass with animations. Off: a solid, flat UI with no glass animation or transparency. Stored on this device (localStorage) when you save.": "\\u0E40\\u0E1B\\u0E34\\u0E14: \\u0E41\\u0E01\\u0E49\\u0E27\\u0E43\\u0E2A \\u0E42\\u0E1B\\u0E23\\u0E48\\u0E07 \\u0E41\\u0E25\\u0E30\\u0E21\\u0E35\\u0E2D\\u0E19\\u0E34\\u0E40\\u0E21\\u0E0A\\u0E31\\u0E19 \\u0E1B\\u0E34\\u0E14: UI \\u0E17\\u0E36\\u0E1A\\u0E40\\u0E23\\u0E35\\u0E22\\u0E1A \\u0E44\\u0E21\\u0E48\\u0E21\\u0E35\\u0E2D\\u0E19\\u0E34\\u0E40\\u0E21\\u0E0A\\u0E31\\u0E19\\u0E41\\u0E01\\u0E49\\u0E27\\u0E41\\u0E25\\u0E30\\u0E04\\u0E27\\u0E32\\u0E21\\u0E42\\u0E1B\\u0E23\\u0E48\\u0E07\\u0E43\\u0E2A \\u0E40\\u0E01\\u0E47\\u0E1A\\u0E44\\u0E27\\u0E49\\u0E43\\u0E19\\u0E40\\u0E04\\u0E23\\u0E37\\u0E48\\u0E2D\\u0E07\\u0E19\\u0E35\\u0E49 (localStorage) \\u0E40\\u0E21\\u0E37\\u0E48\\u0E2D\\u0E01\\u0E14\\u0E1A\\u0E31\\u0E19\\u0E17\\u0E36\\u0E01",
  "The Liquid Glass files could not be loaded, so the flat UI is used automatically.": "\\u0E42\\u0E14\\u0E40\\u0E21\\u0E19\\u0E19\\u0E35\\u0E49\\u0E22\\u0E31\\u0E07\\u0E44\\u0E21\\u0E48\\u0E2D\\u0E22\\u0E39\\u0E48\\u0E43\\u0E19\\u0E23\\u0E32\\u0E22\\u0E01\\u0E32\\u0E23\\u0E17\\u0E35\\u0E48\\u0E2D\\u0E19\\u0E38\\u0E0D\\u0E32\\u0E15\\u0E43\\u0E2B\\u0E49\\u0E42\\u0E2B\\u0E25\\u0E14\\u0E40\\u0E2D\\u0E1F\\u0E40\\u0E1F\\u0E01\\u0E15\\u0E4C Liquid Glass \\u0E08\\u0E32\\u0E01 CDN \\u0E08\\u0E36\\u0E07\\u0E43\\u0E0A\\u0E49\\u0E42\\u0E2B\\u0E21\\u0E14\\u0E40\\u0E23\\u0E35\\u0E22\\u0E1A\\u0E2D\\u0E31\\u0E15\\u0E42\\u0E19\\u0E21\\u0E31\\u0E15\\u0E34",
  "User name": "\\u0E0A\\u0E37\\u0E48\\u0E2D\\u0E1C\\u0E39\\u0E49\\u0E43\\u0E0A\\u0E49",
  "Display name": "\\u0E0A\\u0E37\\u0E48\\u0E2D\\u0E17\\u0E35\\u0E48\\u0E41\\u0E2A\\u0E14\\u0E07",
  "Used to address you in chat and captions. Leave empty to use \\u201Csenpai\\u201D.": "\\u0E43\\u0E0A\\u0E49\\u0E40\\u0E23\\u0E35\\u0E22\\u0E01\\u0E04\\u0E38\\u0E13\\u0E43\\u0E19\\u0E1A\\u0E17\\u0E2A\\u0E19\\u0E17\\u0E19\\u0E32\\u0E41\\u0E25\\u0E30\\u0E04\\u0E33\\u0E1A\\u0E23\\u0E23\\u0E22\\u0E32\\u0E22 \\u0E16\\u0E49\\u0E32\\u0E40\\u0E27\\u0E49\\u0E19\\u0E27\\u0E48\\u0E32\\u0E07\\u0E08\\u0E30\\u0E43\\u0E0A\\u0E49 senpai",
  "e.g. Alex": "\\u0E40\\u0E0A\\u0E48\\u0E19 Alex",
  "Translate your name into Japanese too": "\\u0E41\\u0E1B\\u0E25\\u0E0A\\u0E37\\u0E48\\u0E2D\\u0E40\\u0E1B\\u0E47\\u0E19\\u0E20\\u0E32\\u0E29\\u0E32\\u0E0D\\u0E35\\u0E48\\u0E1B\\u0E38\\u0E48\\u0E19\\u0E14\\u0E49\\u0E27\\u0E22",
  "When replies are translated into Japanese, your name is written in Japanese too.": "\\u0E15\\u0E2D\\u0E19\\u0E41\\u0E1B\\u0E25\\u0E04\\u0E33\\u0E15\\u0E2D\\u0E1A\\u0E40\\u0E1B\\u0E47\\u0E19\\u0E0D\\u0E35\\u0E48\\u0E1B\\u0E38\\u0E48\\u0E19 \\u0E0A\\u0E37\\u0E48\\u0E2D\\u0E02\\u0E2D\\u0E07\\u0E04\\u0E38\\u0E13\\u0E08\\u0E30\\u0E16\\u0E39\\u0E01\\u0E40\\u0E02\\u0E35\\u0E22\\u0E19\\u0E40\\u0E1B\\u0E47\\u0E19\\u0E20\\u0E32\\u0E29\\u0E32\\u0E0D\\u0E35\\u0E48\\u0E1B\\u0E38\\u0E48\\u0E19\\u0E14\\u0E49\\u0E27\\u0E22",
  "Translate name": "\\u0E41\\u0E1B\\u0E25\\u0E0A\\u0E37\\u0E48\\u0E2D",
  "Japanese name (optional)": "\\u0E0A\\u0E37\\u0E48\\u0E2D\\u0E20\\u0E32\\u0E29\\u0E32\\u0E0D\\u0E35\\u0E48\\u0E1B\\u0E38\\u0E48\\u0E19 (\\u0E44\\u0E21\\u0E48\\u0E1A\\u0E31\\u0E07\\u0E04\\u0E31\\u0E1A)",
  "Leave empty to let the model translate it.": "\\u0E40\\u0E27\\u0E49\\u0E19\\u0E27\\u0E48\\u0E32\\u0E07\\u0E43\\u0E2B\\u0E49\\u0E23\\u0E30\\u0E1A\\u0E1A\\u0E41\\u0E1B\\u0E25\\u0E40\\u0E2D\\u0E07",
  "Japanese name": "\\u0E0A\\u0E37\\u0E48\\u0E2D\\u0E20\\u0E32\\u0E29\\u0E32\\u0E0D\\u0E35\\u0E48\\u0E1B\\u0E38\\u0E48\\u0E19",
  "e.g. \\u30CE\\u30EF": "\\u0E40\\u0E0A\\u0E48\\u0E19 \\u30CE\\u30EF",
  "Character & message rules": "\\u0E1A\\u0E38\\u0E04\\u0E25\\u0E34\\u0E01\\u0E41\\u0E25\\u0E30\\u0E01\\u0E15\\u0E34\\u0E01\\u0E32\\u0E02\\u0E49\\u0E2D\\u0E04\\u0E27\\u0E32\\u0E21",
  "Character name": "\\u0E0A\\u0E37\\u0E48\\u0E2D\\u0E15\\u0E31\\u0E27\\u0E25\\u0E30\\u0E04\\u0E23",
  "{max} is the maximum length set below and {user} is the user name set above.": "{max} \\u0E04\\u0E37\\u0E2D\\u0E04\\u0E27\\u0E32\\u0E21\\u0E22\\u0E32\\u0E27\\u0E2A\\u0E39\\u0E07\\u0E2A\\u0E38\\u0E14\\u0E17\\u0E35\\u0E48\\u0E15\\u0E31\\u0E49\\u0E07\\u0E44\\u0E27\\u0E49\\u0E14\\u0E49\\u0E32\\u0E19\\u0E25\\u0E48\\u0E32\\u0E07 \\u0E41\\u0E25\\u0E30 {user} \\u0E04\\u0E37\\u0E2D\\u0E0A\\u0E37\\u0E48\\u0E2D\\u0E1C\\u0E39\\u0E49\\u0E43\\u0E0A\\u0E49\\u0E17\\u0E35\\u0E48\\u0E15\\u0E31\\u0E49\\u0E07\\u0E44\\u0E27\\u0E49\\u0E14\\u0E49\\u0E32\\u0E19\\u0E1A\\u0E19",
  "Maximum reply length": "\\u0E04\\u0E27\\u0E32\\u0E21\\u0E22\\u0E32\\u0E27\\u0E04\\u0E33\\u0E15\\u0E2D\\u0E1A\\u0E2A\\u0E39\\u0E07\\u0E2A\\u0E38\\u0E14",
  " characters": " \\u0E15\\u0E31\\u0E27\\u0E2D\\u0E31\\u0E01\\u0E29\\u0E23",
  "Applies to both the original reply and its translation. If exceeded, the model is asked once to shorten it, then it is cut at a sentence end.": "\\u0E43\\u0E0A\\u0E49\\u0E01\\u0E31\\u0E1A\\u0E17\\u0E31\\u0E49\\u0E07\\u0E04\\u0E33\\u0E15\\u0E2D\\u0E1A\\u0E15\\u0E49\\u0E19\\u0E09\\u0E1A\\u0E31\\u0E1A\\u0E41\\u0E25\\u0E30\\u0E04\\u0E33\\u0E41\\u0E1B\\u0E25 \\u0E16\\u0E49\\u0E32\\u0E40\\u0E01\\u0E34\\u0E19\\u0E08\\u0E30\\u0E43\\u0E2B\\u0E49\\u0E42\\u0E21\\u0E40\\u0E14\\u0E25\\u0E22\\u0E48\\u0E2D\\u0E43\\u0E2B\\u0E21\\u0E48\\u0E2B\\u0E19\\u0E36\\u0E48\\u0E07\\u0E04\\u0E23\\u0E31\\u0E49\\u0E07 \\u0E41\\u0E25\\u0E49\\u0E27\\u0E15\\u0E31\\u0E14\\u0E17\\u0E35\\u0E48\\u0E08\\u0E1A\\u0E1B\\u0E23\\u0E30\\u0E42\\u0E22\\u0E04",
  "Maximum length": "\\u0E04\\u0E27\\u0E32\\u0E21\\u0E22\\u0E32\\u0E27\\u0E2A\\u0E39\\u0E07\\u0E2A\\u0E38\\u0E14",
  "How length is counted": "\\u0E27\\u0E34\\u0E18\\u0E35\\u0E19\\u0E31\\u0E1A\\u0E04\\u0E27\\u0E32\\u0E21\\u0E22\\u0E32\\u0E27",
  "Some voice providers bill per UTF-8 byte (Thai, Japanese and Chinese use 3 bytes per character). Choose how the limit is counted.": "Fish Audio \\u0E04\\u0E34\\u0E14\\u0E04\\u0E48\\u0E32\\u0E1A\\u0E23\\u0E34\\u0E01\\u0E32\\u0E23\\u0E40\\u0E1B\\u0E47\\u0E19 UTF-8 bytes (\\u0E44\\u0E17\\u0E22\\u0E41\\u0E25\\u0E30\\u0E0D\\u0E35\\u0E48\\u0E1B\\u0E38\\u0E48\\u0E19 3 bytes \\u0E15\\u0E48\\u0E2D\\u0E15\\u0E31\\u0E27) \\u0E2A\\u0E48\\u0E27\\u0E19\\u0E40\\u0E2D\\u0E01\\u0E2A\\u0E32\\u0E23\\u0E02\\u0E2D\\u0E07 Drama 3 \\u0E22\\u0E31\\u0E07\\u0E44\\u0E21\\u0E48\\u0E15\\u0E23\\u0E07\\u0E01\\u0E31\\u0E19 \\u0E08\\u0E36\\u0E07\\u0E43\\u0E2B\\u0E49\\u0E40\\u0E25\\u0E37\\u0E2D\\u0E01\\u0E40\\u0E2D\\u0E07",
  "Counting": "\\u0E27\\u0E34\\u0E18\\u0E35\\u0E19\\u0E31\\u0E1A",
  "Characters": "\\u0E15\\u0E31\\u0E27\\u0E2D\\u0E31\\u0E01\\u0E29\\u0E23",
  "Length counter test": "\\u0E17\\u0E14\\u0E2A\\u0E2D\\u0E1A\\u0E15\\u0E31\\u0E27\\u0E19\\u0E31\\u0E1A",
  "Test text": "\\u0E02\\u0E49\\u0E2D\\u0E04\\u0E27\\u0E32\\u0E21\\u0E17\\u0E14\\u0E2A\\u0E2D\\u0E1A",
  "Type or paste text to count": "\\u0E1E\\u0E34\\u0E21\\u0E1E\\u0E4C\\u0E2B\\u0E23\\u0E37\\u0E2D\\u0E27\\u0E32\\u0E07\\u0E02\\u0E49\\u0E2D\\u0E04\\u0E27\\u0E32\\u0E21\\u0E40\\u0E1E\\u0E37\\u0E48\\u0E2D\\u0E19\\u0E31\\u0E1A",
  "Language model": "\\u0E42\\u0E21\\u0E40\\u0E14\\u0E25\\u0E20\\u0E32\\u0E29\\u0E32 (OpenRouter)",
  "One model is used for both replies and translation. The default is a free model with a limited quota. Use any model your provider supports.": "\\u0E42\\u0E21\\u0E40\\u0E14\\u0E25\\u0E40\\u0E14\\u0E35\\u0E22\\u0E27\\u0E43\\u0E0A\\u0E49\\u0E17\\u0E31\\u0E49\\u0E07\\u0E15\\u0E2D\\u0E1A\\u0E41\\u0E25\\u0E30\\u0E41\\u0E1B\\u0E25 \\u0E04\\u0E48\\u0E32\\u0E40\\u0E23\\u0E34\\u0E48\\u0E21\\u0E15\\u0E49\\u0E19\\u0E40\\u0E1B\\u0E47\\u0E19\\u0E42\\u0E21\\u0E40\\u0E14\\u0E25\\u0E1F\\u0E23\\u0E35\\u0E02\\u0E2D\\u0E07 Google (\\u0E21\\u0E35\\u0E42\\u0E04\\u0E27\\u0E15\\u0E32\\u0E08\\u0E33\\u0E01\\u0E31\\u0E14) \\u0E40\\u0E1B\\u0E25\\u0E35\\u0E48\\u0E22\\u0E19\\u0E40\\u0E1B\\u0E47\\u0E19\\u0E42\\u0E21\\u0E40\\u0E14\\u0E25\\u0E2D\\u0E37\\u0E48\\u0E19\\u0E02\\u0E2D\\u0E07 OpenRouter \\u0E44\\u0E14\\u0E49",
  "e.g. anthropic/claude-\\u2026": "\\u0E40\\u0E0A\\u0E48\\u0E19 anthropic/claude-\\u2026",
  "Translation": "\\u0E01\\u0E32\\u0E23\\u0E41\\u0E1B\\u0E25",
  "Translate replies before speaking": "\\u0E41\\u0E1B\\u0E25\\u0E04\\u0E33\\u0E15\\u0E2D\\u0E1A\\u0E01\\u0E48\\u0E2D\\u0E19\\u0E1E\\u0E39\\u0E14",
  "The translation is shown on top, the original below, and the voice speaks the translation.": "\\u0E0D\\u0E35\\u0E48\\u0E1B\\u0E38\\u0E48\\u0E19\\u0E2D\\u0E22\\u0E39\\u0E48\\u0E1A\\u0E19 \\u0E15\\u0E49\\u0E19\\u0E09\\u0E1A\\u0E31\\u0E1A\\u0E2D\\u0E22\\u0E39\\u0E48\\u0E25\\u0E48\\u0E32\\u0E07 \\u0E41\\u0E25\\u0E30\\u0E40\\u0E2A\\u0E35\\u0E22\\u0E07\\u0E43\\u0E0A\\u0E49\\u0E02\\u0E49\\u0E2D\\u0E04\\u0E27\\u0E32\\u0E21\\u0E17\\u0E35\\u0E48\\u0E41\\u0E1B\\u0E25\\u0E41\\u0E25\\u0E49\\u0E27",
  "Translate replies": "\\u0E41\\u0E1B\\u0E25\\u0E04\\u0E33\\u0E15\\u0E2D\\u0E1A",
  "Target language": "\\u0E20\\u0E32\\u0E29\\u0E32\\u0E1B\\u0E25\\u0E32\\u0E22\\u0E17\\u0E32\\u0E07",
  "Show the original under the translation": "\\u0E41\\u0E2A\\u0E14\\u0E07\\u0E02\\u0E49\\u0E2D\\u0E04\\u0E27\\u0E32\\u0E21\\u0E15\\u0E49\\u0E19\\u0E09\\u0E1A\\u0E31\\u0E1A\\u0E43\\u0E15\\u0E49\\u0E04\\u0E33\\u0E41\\u0E1B\\u0E25",
  "Show original": "\\u0E41\\u0E2A\\u0E14\\u0E07\\u0E15\\u0E49\\u0E19\\u0E09\\u0E1A\\u0E31\\u0E1A",
  "Voice (text-to-speech)": "\\u0E40\\u0E2A\\u0E35\\u0E22\\u0E07 (Fish Audio)",
  "Voice in chat": "\\u0E40\\u0E1B\\u0E34\\u0E14\\u0E40\\u0E2A\\u0E35\\u0E22\\u0E07\\u0E43\\u0E19\\u0E41\\u0E0A\\u0E17",
  "Live mode always speaks.": "\\u0E42\\u0E2B\\u0E21\\u0E14 Live \\u0E1E\\u0E39\\u0E14\\u0E40\\u0E2A\\u0E21\\u0E2D",
  "File format": "\\u0E23\\u0E39\\u0E1B\\u0E41\\u0E1A\\u0E1A\\u0E44\\u0E1F\\u0E25\\u0E4C",
  "mp3 is small and plays in every browser.": "mp3 \\u0E40\\u0E25\\u0E47\\u0E01\\u0E41\\u0E25\\u0E30\\u0E40\\u0E25\\u0E48\\u0E19\\u0E44\\u0E14\\u0E49\\u0E17\\u0E38\\u0E01\\u0E40\\u0E1A\\u0E23\\u0E32\\u0E27\\u0E4C\\u0E40\\u0E0B\\u0E2D\\u0E23\\u0E4C",
  "Only sent if your voice provider supports it. Test it with your provider.": "\\u0E08\\u0E30\\u0E2A\\u0E48\\u0E07\\u0E44\\u0E1B\\u0E40\\u0E21\\u0E37\\u0E48\\u0E2D Drama 3 \\u0E23\\u0E2D\\u0E07\\u0E23\\u0E31\\u0E1A \\u0E15\\u0E49\\u0E2D\\u0E07\\u0E17\\u0E14\\u0E2A\\u0E2D\\u0E1A\\u0E08\\u0E23\\u0E34\\u0E07",
  "Speaking speed": "\\u0E04\\u0E27\\u0E32\\u0E21\\u0E40\\u0E23\\u0E47\\u0E27\\u0E1E\\u0E39\\u0E14",
  "Volume": "\\u0E23\\u0E30\\u0E14\\u0E31\\u0E1A\\u0E40\\u0E2A\\u0E35\\u0E22\\u0E07",
  "Try the voice": "\\u0E25\\u0E2D\\u0E07\\u0E40\\u0E2A\\u0E35\\u0E22\\u0E07\\u0E15\\u0E31\\u0E27\\u0E2D\\u0E22\\u0E48\\u0E32\\u0E07",
  "Uses the saved voice settings and counts against your voice provider quota.": "\\u0E43\\u0E0A\\u0E49\\u0E04\\u0E48\\u0E32\\u0E40\\u0E2A\\u0E35\\u0E22\\u0E07\\u0E17\\u0E35\\u0E48\\u0E1A\\u0E31\\u0E19\\u0E17\\u0E36\\u0E01\\u0E44\\u0E27\\u0E49\\u0E41\\u0E25\\u0E49\\u0E27 \\u0E41\\u0E25\\u0E30\\u0E43\\u0E0A\\u0E49\\u0E42\\u0E04\\u0E27\\u0E15\\u0E32\\u0E02\\u0E2D\\u0E07 Fish Audio",
  "Test": "\\u0E17\\u0E14\\u0E2A\\u0E2D\\u0E1A",
  "Listening (speech-to-text on the server)": "\\u0E01\\u0E32\\u0E23\\u0E1F\\u0E31\\u0E07 (\\u0E16\\u0E2D\\u0E14\\u0E40\\u0E2A\\u0E35\\u0E22\\u0E07\\u0E17\\u0E35\\u0E48\\u0E40\\u0E0B\\u0E34\\u0E23\\u0E4C\\u0E1F\\u0E40\\u0E27\\u0E2D\\u0E23\\u0E4C\\u0E1C\\u0E48\\u0E32\\u0E19 OpenRouter)",
  "Transcription model": "\\u0E42\\u0E21\\u0E40\\u0E14\\u0E25\\u0E16\\u0E2D\\u0E14\\u0E40\\u0E2A\\u0E35\\u0E22\\u0E07",
  "Audio is sent to the server and transcribed there, so no model is downloaded to the device. The default is Whisper Large V3 on OpenRouter.": "\\u0E40\\u0E2A\\u0E35\\u0E22\\u0E07\\u0E16\\u0E39\\u0E01\\u0E2A\\u0E48\\u0E07\\u0E44\\u0E1B\\u0E16\\u0E2D\\u0E14\\u0E40\\u0E1B\\u0E47\\u0E19\\u0E02\\u0E49\\u0E2D\\u0E04\\u0E27\\u0E32\\u0E21\\u0E17\\u0E35\\u0E48\\u0E40\\u0E0B\\u0E34\\u0E23\\u0E4C\\u0E1F\\u0E40\\u0E27\\u0E2D\\u0E23\\u0E4C \\u0E44\\u0E21\\u0E48\\u0E15\\u0E49\\u0E2D\\u0E07\\u0E42\\u0E2B\\u0E25\\u0E14\\u0E42\\u0E21\\u0E40\\u0E14\\u0E25\\u0E43\\u0E19\\u0E40\\u0E04\\u0E23\\u0E37\\u0E48\\u0E2D\\u0E07 \\u0E04\\u0E48\\u0E32\\u0E40\\u0E23\\u0E34\\u0E48\\u0E21\\u0E15\\u0E49\\u0E19\\u0E04\\u0E37\\u0E2D Whisper Large V3 \\u0E14\\u0E39\\u0E42\\u0E21\\u0E40\\u0E14\\u0E25\\u0E2D\\u0E37\\u0E48\\u0E19\\u0E44\\u0E14\\u0E49\\u0E17\\u0E35\\u0E48 openrouter.ai/collections/speech-to-text-models",
  "Spoken language": "\\u0E20\\u0E32\\u0E29\\u0E32\\u0E17\\u0E35\\u0E48\\u0E1F\\u0E31\\u0E07",
  "Pick a language for the best accuracy, or Auto if you mix languages.": "\\u0E40\\u0E25\\u0E37\\u0E2D\\u0E01\\u0E44\\u0E17\\u0E22\\u0E08\\u0E30\\u0E41\\u0E21\\u0E48\\u0E19\\u0E17\\u0E35\\u0E48\\u0E2A\\u0E38\\u0E14\\u0E2A\\u0E33\\u0E2B\\u0E23\\u0E31\\u0E1A\\u0E20\\u0E32\\u0E29\\u0E32\\u0E44\\u0E17\\u0E22 \\u0E16\\u0E49\\u0E32\\u0E1E\\u0E39\\u0E14\\u0E2D\\u0E31\\u0E07\\u0E01\\u0E24\\u0E29\\u0E1A\\u0E48\\u0E2D\\u0E22\\u0E43\\u0E2B\\u0E49\\u0E40\\u0E25\\u0E37\\u0E2D\\u0E01\\u0E2D\\u0E31\\u0E15\\u0E42\\u0E19\\u0E21\\u0E31\\u0E15\\u0E34",
  "Auto": "\\u0E2D\\u0E31\\u0E15\\u0E42\\u0E19\\u0E21\\u0E31\\u0E15\\u0E34",
  "Send automatically after transcribing": "\\u0E2A\\u0E48\\u0E07\\u0E02\\u0E49\\u0E2D\\u0E04\\u0E27\\u0E32\\u0E21\\u0E2D\\u0E31\\u0E15\\u0E42\\u0E19\\u0E21\\u0E31\\u0E15\\u0E34\\u0E2B\\u0E25\\u0E31\\u0E07\\u0E16\\u0E2D\\u0E14\\u0E40\\u0E2A\\u0E35\\u0E22\\u0E07",
  "When off, the transcript is placed in the chat box so you can edit it first.": "\\u0E1B\\u0E34\\u0E14\\u0E44\\u0E27\\u0E49\\u0E08\\u0E30\\u0E19\\u0E33\\u0E02\\u0E49\\u0E2D\\u0E04\\u0E27\\u0E32\\u0E21\\u0E44\\u0E1B\\u0E43\\u0E2A\\u0E48\\u0E0A\\u0E48\\u0E2D\\u0E07\\u0E1E\\u0E34\\u0E21\\u0E1E\\u0E4C\\u0E43\\u0E19\\u0E41\\u0E0A\\u0E17\\u0E43\\u0E2B\\u0E49\\u0E41\\u0E01\\u0E49\\u0E01\\u0E48\\u0E2D\\u0E19",
  "Auto-send": "\\u0E2A\\u0E48\\u0E07\\u0E2D\\u0E31\\u0E15\\u0E42\\u0E19\\u0E21\\u0E31\\u0E15\\u0E34",
  "Memory": "\\u0E04\\u0E27\\u0E32\\u0E21\\u0E08\\u0E33",
  "Recent turns kept in full": "\\u0E08\\u0E33\\u0E19\\u0E27\\u0E19\\u0E23\\u0E2D\\u0E1A\\u0E25\\u0E48\\u0E32\\u0E2A\\u0E38\\u0E14\\u0E17\\u0E35\\u0E48\\u0E40\\u0E01\\u0E47\\u0E1A\\u0E40\\u0E15\\u0E47\\u0E21",
  " turns": " \\u0E23\\u0E2D\\u0E1A",
  "Number of turns": "\\u0E08\\u0E33\\u0E19\\u0E27\\u0E19\\u0E23\\u0E2D\\u0E1A",
  "Summarize older turns automatically": "\\u0E22\\u0E48\\u0E2D\\u0E23\\u0E2D\\u0E1A\\u0E40\\u0E01\\u0E48\\u0E32\\u0E40\\u0E1B\\u0E47\\u0E19\\u0E2A\\u0E23\\u0E38\\u0E1B\\u0E2D\\u0E31\\u0E15\\u0E42\\u0E19\\u0E21\\u0E31\\u0E15\\u0E34",
  "The server summarizes turns that fall outside the window above.": "\\u0E40\\u0E0B\\u0E34\\u0E23\\u0E4C\\u0E1F\\u0E40\\u0E27\\u0E2D\\u0E23\\u0E4C\\u0E2A\\u0E23\\u0E38\\u0E1B\\u0E43\\u0E2B\\u0E49\\u0E40\\u0E2D\\u0E07\\u0E40\\u0E21\\u0E37\\u0E48\\u0E2D\\u0E23\\u0E2D\\u0E1A\\u0E40\\u0E01\\u0E48\\u0E32\\u0E40\\u0E01\\u0E34\\u0E19\\u0E08\\u0E33\\u0E19\\u0E27\\u0E19\\u0E17\\u0E35\\u0E48\\u0E15\\u0E31\\u0E49\\u0E07\\u0E44\\u0E27\\u0E49",
  "Auto-summarize": "\\u0E2A\\u0E23\\u0E38\\u0E1B\\u0E2D\\u0E31\\u0E15\\u0E42\\u0E19\\u0E21\\u0E31\\u0E15\\u0E34",
  "Summary memory": "\\u0E04\\u0E27\\u0E32\\u0E21\\u0E08\\u0E33\\u0E2A\\u0E23\\u0E38\\u0E1B",
  "No summary yet": "\\u0E22\\u0E31\\u0E07\\u0E44\\u0E21\\u0E48\\u0E21\\u0E35\\u0E2A\\u0E23\\u0E38\\u0E1B",
  "Clear data": "\\u0E25\\u0E49\\u0E32\\u0E07\\u0E02\\u0E49\\u0E2D\\u0E21\\u0E39\\u0E25",
  "Clearing takes effect immediately; no need to save.": "\\u0E01\\u0E32\\u0E23\\u0E25\\u0E49\\u0E32\\u0E07\\u0E21\\u0E35\\u0E1C\\u0E25\\u0E17\\u0E31\\u0E19\\u0E17\\u0E35 \\u0E44\\u0E21\\u0E48\\u0E15\\u0E49\\u0E2D\\u0E07\\u0E01\\u0E14\\u0E1A\\u0E31\\u0E19\\u0E17\\u0E36\\u0E01",
  "Clear summary only": "\\u0E25\\u0E49\\u0E32\\u0E07\\u0E40\\u0E09\\u0E1E\\u0E32\\u0E30\\u0E2A\\u0E23\\u0E38\\u0E1B",
  "Press again to confirm": "\\u0E01\\u0E14\\u0E2D\\u0E35\\u0E01\\u0E04\\u0E23\\u0E31\\u0E49\\u0E07\\u0E40\\u0E1E\\u0E37\\u0E48\\u0E2D\\u0E22\\u0E37\\u0E19\\u0E22\\u0E31\\u0E19",
  "Clear chat & memory": "\\u0E25\\u0E49\\u0E32\\u0E07\\u0E41\\u0E0A\\u0E17\\u0E41\\u0E25\\u0E30\\u0E04\\u0E27\\u0E32\\u0E21\\u0E08\\u0E33",
  "Live mode": "\\u0E42\\u0E2B\\u0E21\\u0E14 Live",
  "Character type": "\\u0E23\\u0E39\\u0E1B\\u0E41\\u0E1A\\u0E1A\\u0E15\\u0E31\\u0E27\\u0E25\\u0E30\\u0E04\\u0E23",
  "VRM uses a 3D model file. PNG uses two images that swap between speaking and idle.": "VRM \\u0E43\\u0E0A\\u0E49\\u0E44\\u0E1F\\u0E25\\u0E4C\\u0E42\\u0E21\\u0E40\\u0E14\\u0E25 3D \\u0E2A\\u0E48\\u0E27\\u0E19 PNG \\u0E43\\u0E0A\\u0E49\\u0E23\\u0E39\\u0E1B\\u0E2A\\u0E2D\\u0E07\\u0E23\\u0E39\\u0E1B\\u0E2A\\u0E25\\u0E31\\u0E1A\\u0E15\\u0E2D\\u0E19\\u0E1E\\u0E39\\u0E14\\u0E41\\u0E25\\u0E30\\u0E15\\u0E2D\\u0E19\\u0E2B\\u0E22\\u0E38\\u0E14\\u0E1E\\u0E39\\u0E14",
  "How to talk in Live mode": "\\u0E27\\u0E34\\u0E18\\u0E35\\u0E1E\\u0E39\\u0E14\\u0E43\\u0E19\\u0E42\\u0E2B\\u0E21\\u0E14 Live",
  "Tap to start and tap to stop, or hold the mic while you talk and release to send.": "\\u0E41\\u0E15\\u0E30\\u0E40\\u0E23\\u0E34\\u0E48\\u0E21/\\u0E41\\u0E15\\u0E30\\u0E2B\\u0E22\\u0E38\\u0E14 \\u0E2B\\u0E23\\u0E37\\u0E2D\\u0E01\\u0E14\\u0E04\\u0E49\\u0E32\\u0E07\\u0E17\\u0E35\\u0E48\\u0E44\\u0E21\\u0E04\\u0E4C\\u0E02\\u0E13\\u0E30\\u0E1E\\u0E39\\u0E14\\u0E41\\u0E25\\u0E49\\u0E27\\u0E1B\\u0E25\\u0E48\\u0E2D\\u0E22\\u0E40\\u0E1E\\u0E37\\u0E48\\u0E2D\\u0E2A\\u0E48\\u0E07",
  "Talk method": "\\u0E27\\u0E34\\u0E18\\u0E35\\u0E1E\\u0E39\\u0E14",
  "Tap to start / stop": "\\u0E41\\u0E15\\u0E30\\u0E40\\u0E23\\u0E34\\u0E48\\u0E21/\\u0E41\\u0E15\\u0E30\\u0E2B\\u0E22\\u0E38\\u0E14",
  "Hold to talk": "\\u0E01\\u0E14\\u0E04\\u0E49\\u0E32\\u0E07\\u0E40\\u0E1E\\u0E37\\u0E48\\u0E2D\\u0E1E\\u0E39\\u0E14",
  "VRM file": "\\u0E44\\u0E1F\\u0E25\\u0E4C VRM",
  "Upload a .vrm file to store it on the server. For now the screen still shows a sample figure instead of the 3D model.": "\\u0E2D\\u0E31\\u0E1B\\u0E42\\u0E2B\\u0E25\\u0E14\\u0E44\\u0E1F\\u0E25\\u0E4C .vrm \\u0E40\\u0E01\\u0E47\\u0E1A\\u0E1A\\u0E19\\u0E40\\u0E0B\\u0E34\\u0E23\\u0E4C\\u0E1F\\u0E40\\u0E27\\u0E2D\\u0E23\\u0E4C (\\u0E15\\u0E2D\\u0E19\\u0E19\\u0E35\\u0E49\\u0E2B\\u0E19\\u0E49\\u0E32\\u0E08\\u0E2D\\u0E22\\u0E31\\u0E07\\u0E41\\u0E2A\\u0E14\\u0E07\\u0E20\\u0E32\\u0E1E\\u0E15\\u0E31\\u0E27\\u0E2D\\u0E22\\u0E48\\u0E32\\u0E07\\u0E41\\u0E17\\u0E19\\u0E42\\u0E21\\u0E40\\u0E14\\u0E25 3 \\u0E21\\u0E34\\u0E15\\u0E34)",
  "Speaking image": "\\u0E23\\u0E39\\u0E1B\\u0E15\\u0E2D\\u0E19\\u0E1E\\u0E39\\u0E14",
  "9:16 portrait image": "\\u0E23\\u0E39\\u0E1B\\u0E2A\\u0E31\\u0E14\\u0E2A\\u0E48\\u0E27\\u0E19 9:16",
  "Idle image": "\\u0E23\\u0E39\\u0E1B\\u0E15\\u0E2D\\u0E19\\u0E2B\\u0E22\\u0E38\\u0E14\\u0E1E\\u0E39\\u0E14",
  "Swap images with the voice": "\\u0E2A\\u0E25\\u0E31\\u0E1A\\u0E23\\u0E39\\u0E1B\\u0E15\\u0E32\\u0E21\\u0E08\\u0E31\\u0E07\\u0E2B\\u0E27\\u0E30\\u0E40\\u0E2A\\u0E35\\u0E22\\u0E07",
  "When off, the speaking image stays until speech ends.": "\\u0E1B\\u0E34\\u0E14\\u0E44\\u0E27\\u0E49\\u0E08\\u0E30\\u0E41\\u0E2A\\u0E14\\u0E07\\u0E23\\u0E39\\u0E1B\\u0E15\\u0E2D\\u0E19\\u0E1E\\u0E39\\u0E14\\u0E04\\u0E49\\u0E32\\u0E07\\u0E44\\u0E27\\u0E49\\u0E08\\u0E19\\u0E1E\\u0E39\\u0E14\\u0E08\\u0E1A",
  "Swap images": "\\u0E2A\\u0E25\\u0E31\\u0E1A\\u0E23\\u0E39\\u0E1B\\u0E15\\u0E32\\u0E21\\u0E08\\u0E31\\u0E07\\u0E2B\\u0E27\\u0E30",
  "Mouth sensitivity": "\\u0E04\\u0E27\\u0E32\\u0E21\\u0E44\\u0E27\\u0E02\\u0E2D\\u0E07\\u0E1B\\u0E32\\u0E01",
  "Live background image": "\\u0E23\\u0E39\\u0E1B\\u0E1E\\u0E37\\u0E49\\u0E19\\u0E2B\\u0E25\\u0E31\\u0E07\\u0E2B\\u0E19\\u0E49\\u0E32 Live",
  "Paste an image link or choose a file. Leave empty for a plain background.": "\\u0E27\\u0E32\\u0E07\\u0E25\\u0E34\\u0E07\\u0E01\\u0E4C\\u0E23\\u0E39\\u0E1B\\u0E20\\u0E32\\u0E1E \\u0E2B\\u0E23\\u0E37\\u0E2D\\u0E40\\u0E25\\u0E37\\u0E2D\\u0E01\\u0E44\\u0E1F\\u0E25\\u0E4C \\u0E16\\u0E49\\u0E32\\u0E27\\u0E48\\u0E32\\u0E07\\u0E08\\u0E30\\u0E43\\u0E0A\\u0E49\\u0E2A\\u0E35\\u0E1E\\u0E37\\u0E49\\u0E19\\u0E40\\u0E23\\u0E35\\u0E22\\u0E1A",
  "Show captions": "\\u0E41\\u0E2A\\u0E14\\u0E07\\u0E04\\u0E33\\u0E1A\\u0E23\\u0E23\\u0E22\\u0E32\\u0E22",
  "API keys (stored as Worker secrets)": "\\u0E04\\u0E35\\u0E22\\u0E4C API (\\u0E40\\u0E01\\u0E47\\u0E1A\\u0E40\\u0E1B\\u0E47\\u0E19 Worker secrets \\u0E1A\\u0E19\\u0E40\\u0E0B\\u0E34\\u0E23\\u0E4C\\u0E1F\\u0E40\\u0E27\\u0E2D\\u0E23\\u0E4C)",
  "Works fine with Cloudflare Access alone. Set ACCESS_TEAM_DOMAIN and ACCESS_AUD if you also want the Worker to verify the token.": "\\u0E16\\u0E49\\u0E32\\u0E43\\u0E0A\\u0E49 Access \\u0E17\\u0E35\\u0E48\\u0E02\\u0E2D\\u0E1A\\u0E40\\u0E04\\u0E23\\u0E37\\u0E2D\\u0E02\\u0E48\\u0E32\\u0E22\\u0E2D\\u0E22\\u0E48\\u0E32\\u0E07\\u0E40\\u0E14\\u0E35\\u0E22\\u0E27\\u0E01\\u0E47\\u0E43\\u0E0A\\u0E49\\u0E07\\u0E32\\u0E19\\u0E44\\u0E14\\u0E49\\u0E1B\\u0E01\\u0E15\\u0E34 \\u0E15\\u0E31\\u0E49\\u0E07 ACCESS_TEAM_DOMAIN \\u0E41\\u0E25\\u0E30 ACCESS_AUD \\u0E16\\u0E49\\u0E32\\u0E15\\u0E49\\u0E2D\\u0E07\\u0E01\\u0E32\\u0E23\\u0E43\\u0E2B\\u0E49 Worker \\u0E15\\u0E23\\u0E27\\u0E08\\u0E0B\\u0E49\\u0E33\\u0E2D\\u0E35\\u0E01\\u0E0A\\u0E31\\u0E49\\u0E19",
  "Worker verifies the token": "Worker \\u0E15\\u0E23\\u0E27\\u0E08 JWT \\u0E2D\\u0E22\\u0E39\\u0E48",
  "Not verified in the app": "\\u0E44\\u0E21\\u0E48\\u0E44\\u0E14\\u0E49\\u0E15\\u0E23\\u0E27\\u0E08\\u0E43\\u0E19\\u0E41\\u0E2D\\u0E1B",
  "Check status": "\\u0E15\\u0E23\\u0E27\\u0E08\\u0E2A\\u0E16\\u0E32\\u0E19\\u0E30",
  "Only reports whether a key exists. Key values are never sent to the browser.": "\\u0E41\\u0E2A\\u0E14\\u0E07\\u0E40\\u0E09\\u0E1E\\u0E32\\u0E30\\u0E27\\u0E48\\u0E32\\u0E21\\u0E35\\u0E04\\u0E35\\u0E22\\u0E4C\\u0E2B\\u0E23\\u0E37\\u0E2D\\u0E44\\u0E21\\u0E48 \\u0E44\\u0E21\\u0E48\\u0E40\\u0E04\\u0E22\\u0E2A\\u0E48\\u0E07\\u0E04\\u0E48\\u0E32\\u0E04\\u0E35\\u0E22\\u0E4C\\u0E21\\u0E32\\u0E17\\u0E35\\u0E48\\u0E40\\u0E1A\\u0E23\\u0E32\\u0E27\\u0E4C\\u0E40\\u0E0B\\u0E2D\\u0E23\\u0E4C",
  "Checking\\u2026": "\\u0E01\\u0E33\\u0E25\\u0E31\\u0E07\\u0E15\\u0E23\\u0E27\\u0E08\\u2026",
  "Check": "\\u0E15\\u0E23\\u0E27\\u0E08",
  "Log level": "\\u0E23\\u0E30\\u0E14\\u0E31\\u0E1A log",
  "Stored entries": "\\u0E23\\u0E32\\u0E22\\u0E01\\u0E32\\u0E23\\u0E17\\u0E35\\u0E48\\u0E40\\u0E01\\u0E47\\u0E1A\\u0E44\\u0E27\\u0E49",
  "The first 500 entries are kept on the server. Keys and chat content are never logged.": "\\u0E40\\u0E01\\u0E47\\u0E1A\\u0E1A\\u0E19\\u0E40\\u0E0B\\u0E34\\u0E23\\u0E4C\\u0E1F\\u0E40\\u0E27\\u0E2D\\u0E23\\u0E4C 500 \\u0E23\\u0E32\\u0E22\\u0E01\\u0E32\\u0E23\\u0E41\\u0E23\\u0E01 \\u0E44\\u0E21\\u0E48\\u0E1A\\u0E31\\u0E19\\u0E17\\u0E36\\u0E01\\u0E04\\u0E35\\u0E22\\u0E4C\\u0E41\\u0E25\\u0E30\\u0E40\\u0E19\\u0E37\\u0E49\\u0E2D\\u0E2B\\u0E32\\u0E41\\u0E0A\\u0E17",
  "Download .log": "\\u0E14\\u0E32\\u0E27\\u0E19\\u0E4C\\u0E42\\u0E2B\\u0E25\\u0E14 .log",
  "Clear log": "\\u0E25\\u0E49\\u0E32\\u0E07 log",
  "Save failed: ": "\\u0E1A\\u0E31\\u0E19\\u0E17\\u0E36\\u0E01\\u0E44\\u0E21\\u0E48\\u0E2A\\u0E33\\u0E40\\u0E23\\u0E47\\u0E08: ",
  "Can't reach the server": "\\u0E40\\u0E0A\\u0E37\\u0E48\\u0E2D\\u0E21\\u0E15\\u0E48\\u0E2D\\u0E40\\u0E0B\\u0E34\\u0E23\\u0E4C\\u0E1F\\u0E40\\u0E27\\u0E2D\\u0E23\\u0E4C\\u0E44\\u0E21\\u0E48\\u0E44\\u0E14\\u0E49",
  "Couldn't play audio. Tap the play button on the message.": "\\u0E40\\u0E25\\u0E48\\u0E19\\u0E40\\u0E2A\\u0E35\\u0E22\\u0E07\\u0E44\\u0E21\\u0E48\\u0E44\\u0E14\\u0E49 \\u0E01\\u0E14\\u0E1B\\u0E38\\u0E48\\u0E21\\u0E40\\u0E25\\u0E48\\u0E19\\u0E17\\u0E35\\u0E48\\u0E02\\u0E49\\u0E2D\\u0E04\\u0E27\\u0E32\\u0E21\\u0E2D\\u0E35\\u0E01\\u0E04\\u0E23\\u0E31\\u0E49\\u0E07",
  "Couldn't generate voice: ": "\\u0E2A\\u0E23\\u0E49\\u0E32\\u0E07\\u0E40\\u0E2A\\u0E35\\u0E22\\u0E07\\u0E44\\u0E21\\u0E48\\u0E2A\\u0E33\\u0E40\\u0E23\\u0E47\\u0E08: ",
  "The reply was cut off.": "\\u0E01\\u0E32\\u0E23\\u0E15\\u0E2D\\u0E1A\\u0E01\\u0E25\\u0E31\\u0E1A\\u0E16\\u0E39\\u0E01\\u0E15\\u0E31\\u0E14\\u0E01\\u0E25\\u0E32\\u0E07\\u0E04\\u0E31\\u0E19",
  "Couldn't load the audio": "\\u0E42\\u0E2B\\u0E25\\u0E14\\u0E40\\u0E2A\\u0E35\\u0E22\\u0E07\\u0E44\\u0E21\\u0E48\\u0E2A\\u0E33\\u0E40\\u0E23\\u0E47\\u0E08",
  "Couldn't send: ": "\\u0E2A\\u0E48\\u0E07\\u0E44\\u0E21\\u0E48\\u0E2A\\u0E33\\u0E40\\u0E23\\u0E47\\u0E08: ",
  "Couldn't open the microphone: ": "\\u0E40\\u0E1B\\u0E34\\u0E14\\u0E44\\u0E21\\u0E42\\u0E04\\u0E23\\u0E42\\u0E1F\\u0E19\\u0E44\\u0E21\\u0E48\\u0E44\\u0E14\\u0E49: ",
  "Microphone permission was not granted": "\\u0E22\\u0E31\\u0E07\\u0E44\\u0E21\\u0E48\\u0E44\\u0E14\\u0E49\\u0E2D\\u0E19\\u0E38\\u0E0D\\u0E32\\u0E15\\u0E43\\u0E2B\\u0E49\\u0E43\\u0E0A\\u0E49\\u0E44\\u0E21\\u0E04\\u0E4C",
  "Too short \\u2014 try again.": "\\u0E2A\\u0E31\\u0E49\\u0E19\\u0E40\\u0E01\\u0E34\\u0E19\\u0E44\\u0E1B \\u0E25\\u0E2D\\u0E07\\u0E1E\\u0E39\\u0E14\\u0E43\\u0E2B\\u0E21\\u0E48",
  "No speech detected \\u2014 try again.": "\\u0E44\\u0E21\\u0E48\\u0E44\\u0E14\\u0E49\\u0E22\\u0E34\\u0E19\\u0E40\\u0E2A\\u0E35\\u0E22\\u0E07\\u0E1E\\u0E39\\u0E14 \\u0E25\\u0E2D\\u0E07\\u0E43\\u0E2B\\u0E21\\u0E48\\u0E2D\\u0E35\\u0E01\\u0E04\\u0E23\\u0E31\\u0E49\\u0E07",
  "Couldn't transcribe \\u2014 try again.": "\\u0E16\\u0E2D\\u0E14\\u0E40\\u0E2A\\u0E35\\u0E22\\u0E07\\u0E44\\u0E21\\u0E48\\u0E44\\u0E14\\u0E49 \\u0E25\\u0E2D\\u0E07\\u0E43\\u0E2B\\u0E21\\u0E48\\u0E2D\\u0E35\\u0E01\\u0E04\\u0E23\\u0E31\\u0E49\\u0E07",
  "Transcription failed: ": "\\u0E16\\u0E2D\\u0E14\\u0E40\\u0E2A\\u0E35\\u0E22\\u0E07\\u0E44\\u0E21\\u0E48\\u0E2A\\u0E33\\u0E40\\u0E23\\u0E47\\u0E08: ",
  "Chat and memory cleared": "\\u0E25\\u0E49\\u0E32\\u0E07\\u0E41\\u0E0A\\u0E17\\u0E41\\u0E25\\u0E30\\u0E04\\u0E27\\u0E32\\u0E21\\u0E08\\u0E33\\u0E41\\u0E25\\u0E49\\u0E27",
  "Couldn't clear: ": "\\u0E25\\u0E49\\u0E32\\u0E07\\u0E44\\u0E21\\u0E48\\u0E2A\\u0E33\\u0E40\\u0E23\\u0E47\\u0E08: ",
  "All keys found": "\\u0E1E\\u0E1A\\u0E04\\u0E35\\u0E22\\u0E4C\\u0E04\\u0E23\\u0E1A\\u0E41\\u0E25\\u0E49\\u0E27",
  "Some keys are missing": "\\u0E22\\u0E31\\u0E07\\u0E44\\u0E21\\u0E48\\u0E1E\\u0E1A\\u0E04\\u0E35\\u0E22\\u0E4C\\u0E1A\\u0E32\\u0E07\\u0E15\\u0E31\\u0E27",
  "Check failed: ": "\\u0E15\\u0E23\\u0E27\\u0E08\\u0E44\\u0E21\\u0E48\\u0E2A\\u0E33\\u0E40\\u0E23\\u0E47\\u0E08: ",
  "No log entries yet": "\\u0E22\\u0E31\\u0E07\\u0E44\\u0E21\\u0E48\\u0E21\\u0E35 log",
  "Log cleared": "\\u0E25\\u0E49\\u0E32\\u0E07 log \\u0E41\\u0E25\\u0E49\\u0E27",
  "Couldn't save memory: ": "\\u0E1A\\u0E31\\u0E19\\u0E17\\u0E36\\u0E01\\u0E04\\u0E27\\u0E32\\u0E21\\u0E08\\u0E33\\u0E44\\u0E21\\u0E48\\u0E2A\\u0E33\\u0E40\\u0E23\\u0E47\\u0E08: ",
  "Summary cleared": "\\u0E25\\u0E49\\u0E32\\u0E07\\u0E04\\u0E27\\u0E32\\u0E21\\u0E08\\u0E33\\u0E2A\\u0E23\\u0E38\\u0E1B\\u0E41\\u0E25\\u0E49\\u0E27",
  "Generating a test voice\\u2026": "\\u0E01\\u0E33\\u0E25\\u0E31\\u0E07\\u0E2A\\u0E23\\u0E49\\u0E32\\u0E07\\u0E40\\u0E2A\\u0E35\\u0E22\\u0E07\\u0E17\\u0E14\\u0E2A\\u0E2D\\u0E1A\\u2026",
  "Voice test failed: ": "\\u0E17\\u0E14\\u0E2A\\u0E2D\\u0E1A\\u0E40\\u0E2A\\u0E35\\u0E22\\u0E07\\u0E44\\u0E21\\u0E48\\u0E2A\\u0E33\\u0E40\\u0E23\\u0E47\\u0E08: ",
  "No messages yet": "\\u0E22\\u0E31\\u0E07\\u0E44\\u0E21\\u0E48\\u0E21\\u0E35\\u0E02\\u0E49\\u0E2D\\u0E04\\u0E27\\u0E32\\u0E21",
  "You": "\\u0E04\\u0E38\\u0E13",
  "Chat saved to a file": "\\u0E1A\\u0E31\\u0E19\\u0E17\\u0E36\\u0E01\\u0E02\\u0E49\\u0E2D\\u0E04\\u0E27\\u0E32\\u0E21\\u0E41\\u0E25\\u0E49\\u0E27",
  "No changes": "\\u0E44\\u0E21\\u0E48\\u0E21\\u0E35\\u0E01\\u0E32\\u0E23\\u0E40\\u0E1B\\u0E25\\u0E35\\u0E48\\u0E22\\u0E19\\u0E41\\u0E1B\\u0E25\\u0E07",
  "Settings saved": "\\u0E1A\\u0E31\\u0E19\\u0E17\\u0E36\\u0E01\\u0E01\\u0E32\\u0E23\\u0E15\\u0E31\\u0E49\\u0E07\\u0E04\\u0E48\\u0E32\\u0E41\\u0E25\\u0E49\\u0E27",
  "Reverted to the saved settings": "\\u0E22\\u0E49\\u0E2D\\u0E19\\u0E01\\u0E25\\u0E31\\u0E1A\\u0E40\\u0E1B\\u0E47\\u0E19\\u0E04\\u0E48\\u0E32\\u0E17\\u0E35\\u0E48\\u0E1A\\u0E31\\u0E19\\u0E17\\u0E36\\u0E01\\u0E44\\u0E27\\u0E49",
  "Settings reset": "\\u0E23\\u0E35\\u0E40\\u0E0B\\u0E47\\u0E15\\u0E01\\u0E32\\u0E23\\u0E15\\u0E31\\u0E49\\u0E07\\u0E04\\u0E48\\u0E32\\u0E41\\u0E25\\u0E49\\u0E27",
  "Couldn't reset: ": "\\u0E23\\u0E35\\u0E40\\u0E0B\\u0E47\\u0E15\\u0E44\\u0E21\\u0E48\\u0E2A\\u0E33\\u0E40\\u0E23\\u0E47\\u0E08: ",
  "Transcribing\\u2026": "\\u0E01\\u0E33\\u0E25\\u0E31\\u0E07\\u0E16\\u0E2D\\u0E14\\u0E40\\u0E2A\\u0E35\\u0E22\\u0E07\\u2026",
  "Hold while you talk, release when you're done.": "\\u0E01\\u0E14\\u0E04\\u0E49\\u0E32\\u0E07\\u0E44\\u0E27\\u0E49\\u0E02\\u0E13\\u0E30\\u0E1E\\u0E39\\u0E14 \\u0E41\\u0E25\\u0E49\\u0E27\\u0E1B\\u0E25\\u0E48\\u0E2D\\u0E22\\u0E40\\u0E21\\u0E37\\u0E48\\u0E2D\\u0E1E\\u0E39\\u0E14\\u0E08\\u0E1A",
  "Can't reach the server: ": "\\u0E40\\u0E0A\\u0E37\\u0E48\\u0E2D\\u0E21\\u0E15\\u0E48\\u0E2D\\u0E40\\u0E0B\\u0E34\\u0E23\\u0E4C\\u0E1F\\u0E40\\u0E27\\u0E2D\\u0E23\\u0E4C\\u0E44\\u0E21\\u0E48\\u0E44\\u0E14\\u0E49: ",
  "Retry": "\\u0E25\\u0E2D\\u0E07\\u0E43\\u0E2B\\u0E21\\u0E48",
  "Loading\\u2026": "\\u0E01\\u0E33\\u0E25\\u0E31\\u0E07\\u0E42\\u0E2B\\u0E25\\u0E14\\u2026",
  "Mute voice": "\\u0E1B\\u0E34\\u0E14\\u0E40\\u0E2A\\u0E35\\u0E22\\u0E07",
  "Enable voice": "\\u0E40\\u0E1B\\u0E34\\u0E14\\u0E40\\u0E2A\\u0E35\\u0E22\\u0E07",
  "Voice in chat is off": "\\u0E1B\\u0E34\\u0E14\\u0E40\\u0E2A\\u0E35\\u0E22\\u0E07\\u0E43\\u0E19\\u0E41\\u0E0A\\u0E17\\u0E41\\u0E25\\u0E49\\u0E27",
  "Voice in chat is on": "\\u0E40\\u0E1B\\u0E34\\u0E14\\u0E40\\u0E2A\\u0E35\\u0E22\\u0E07\\u0E43\\u0E19\\u0E41\\u0E0A\\u0E17\\u0E41\\u0E25\\u0E49\\u0E27",
  "Save chat as a file": "\\u0E1A\\u0E31\\u0E19\\u0E17\\u0E36\\u0E01\\u0E02\\u0E49\\u0E2D\\u0E04\\u0E27\\u0E32\\u0E21\\u0E40\\u0E1B\\u0E47\\u0E19\\u0E44\\u0E1F\\u0E25\\u0E4C",
  "Go to settings": "\\u0E44\\u0E1B\\u0E2B\\u0E19\\u0E49\\u0E32\\u0E15\\u0E31\\u0E49\\u0E07\\u0E04\\u0E48\\u0E32",
  "Couldn't send": "\\u0E2A\\u0E48\\u0E07\\u0E44\\u0E21\\u0E48\\u0E2A\\u0E33\\u0E40\\u0E23\\u0E47\\u0E08",
  "Dismiss": "\\u0E1B\\u0E34\\u0E14",
  "Listening ": "\\u0E01\\u0E33\\u0E25\\u0E31\\u0E07\\u0E1F\\u0E31\\u0E07 ",
  "Type a message": "\\u0E1E\\u0E34\\u0E21\\u0E1E\\u0E4C\\u0E02\\u0E49\\u0E2D\\u0E04\\u0E27\\u0E32\\u0E21",
  "Cancel recording": "\\u0E22\\u0E01\\u0E40\\u0E25\\u0E34\\u0E01\\u0E01\\u0E32\\u0E23\\u0E2D\\u0E31\\u0E14",
  "Finish and send": "\\u0E08\\u0E1A\\u0E41\\u0E25\\u0E30\\u0E2A\\u0E48\\u0E07",
  "Talk": "\\u0E1E\\u0E39\\u0E14",
  "Cancel": "\\u0E22\\u0E01\\u0E40\\u0E25\\u0E34\\u0E01",
  "Send": "\\u0E2A\\u0E48\\u0E07",
  "Hide captions": "\\u0E0B\\u0E48\\u0E2D\\u0E19\\u0E04\\u0E33\\u0E1A\\u0E23\\u0E23\\u0E22\\u0E32\\u0E22",
  " \\xB7 release to send": " \\xB7 \\u0E1B\\u0E25\\u0E48\\u0E2D\\u0E22\\u0E40\\u0E1E\\u0E37\\u0E48\\u0E2D\\u0E2A\\u0E48\\u0E07",
  "Hold the mic to talk": "\\u0E01\\u0E14\\u0E04\\u0E49\\u0E32\\u0E07\\u0E17\\u0E35\\u0E48\\u0E44\\u0E21\\u0E04\\u0E4C\\u0E40\\u0E1E\\u0E37\\u0E48\\u0E2D\\u0E1E\\u0E39\\u0E14",
  "Tap the mic to start talking": "\\u0E41\\u0E15\\u0E30\\u0E44\\u0E21\\u0E04\\u0E4C\\u0E40\\u0E1E\\u0E37\\u0E48\\u0E2D\\u0E40\\u0E23\\u0E34\\u0E48\\u0E21\\u0E1E\\u0E39\\u0E14",
  "Stop": "\\u0E2B\\u0E22\\u0E38\\u0E14",
  "Finish talking": "\\u0E08\\u0E1A\\u0E01\\u0E32\\u0E23\\u0E1E\\u0E39\\u0E14",
  "Start talking": "\\u0E40\\u0E23\\u0E34\\u0E48\\u0E21\\u0E1E\\u0E39\\u0E14",
  "Export settings (.json)": "\\u0E2A\\u0E48\\u0E07\\u0E2D\\u0E2D\\u0E01\\u0E01\\u0E32\\u0E23\\u0E15\\u0E31\\u0E49\\u0E07\\u0E04\\u0E48\\u0E32 (.json)",
  "Settings exported": "\\u0E2A\\u0E48\\u0E07\\u0E2D\\u0E2D\\u0E01\\u0E01\\u0E32\\u0E23\\u0E15\\u0E31\\u0E49\\u0E07\\u0E04\\u0E48\\u0E32\\u0E41\\u0E25\\u0E49\\u0E27",
  "Reset to defaults": "\\u0E23\\u0E35\\u0E40\\u0E0B\\u0E47\\u0E15\\u0E40\\u0E1B\\u0E47\\u0E19\\u0E04\\u0E48\\u0E32\\u0E40\\u0E23\\u0E34\\u0E48\\u0E21\\u0E15\\u0E49\\u0E19",
  "You have unsaved changes": "\\u0E21\\u0E35\\u0E01\\u0E32\\u0E23\\u0E40\\u0E1B\\u0E25\\u0E35\\u0E48\\u0E22\\u0E19\\u0E41\\u0E1B\\u0E25\\u0E07\\u0E17\\u0E35\\u0E48\\u0E22\\u0E31\\u0E07\\u0E44\\u0E21\\u0E48\\u0E1A\\u0E31\\u0E19\\u0E17\\u0E36\\u0E01",
  "Everything is saved": "\\u0E04\\u0E48\\u0E32\\u0E17\\u0E35\\u0E48\\u0E43\\u0E0A\\u0E49\\u0E2D\\u0E22\\u0E39\\u0E48\\u0E15\\u0E23\\u0E07\\u0E01\\u0E31\\u0E1A\\u0E17\\u0E35\\u0E48\\u0E1A\\u0E31\\u0E19\\u0E17\\u0E36\\u0E01\\u0E44\\u0E27\\u0E49",
  "Revert": "\\u0E22\\u0E49\\u0E2D\\u0E19\\u0E01\\u0E25\\u0E31\\u0E1A",
  "Saving\\u2026": "\\u0E01\\u0E33\\u0E25\\u0E31\\u0E07\\u0E1A\\u0E31\\u0E19\\u0E17\\u0E36\\u0E01\\u2026",
  "Save": "\\u0E1A\\u0E31\\u0E19\\u0E17\\u0E36\\u0E01",
  "Options": "\\u0E15\\u0E31\\u0E27\\u0E40\\u0E25\\u0E37\\u0E2D\\u0E01",
  "Main menu": "\\u0E40\\u0E21\\u0E19\\u0E39\\u0E2B\\u0E25\\u0E31\\u0E01",
  "Chat": "\\u0E41\\u0E0A\\u0E17",
  "Settings": "\\u0E15\\u0E31\\u0E49\\u0E07\\u0E04\\u0E48\\u0E32",
  "Language": "\\u0E20\\u0E32\\u0E29\\u0E32",
  "Language of the app interface. Replies follow the language you write in.": "\\u0E20\\u0E32\\u0E29\\u0E32\\u0E02\\u0E2D\\u0E07\\u0E2B\\u0E19\\u0E49\\u0E32\\u0E08\\u0E2D\\u0E41\\u0E2D\\u0E1B \\u0E2A\\u0E48\\u0E27\\u0E19\\u0E04\\u0E33\\u0E15\\u0E2D\\u0E1A\\u0E08\\u0E30\\u0E15\\u0E32\\u0E21\\u0E20\\u0E32\\u0E29\\u0E32\\u0E17\\u0E35\\u0E48\\u0E04\\u0E38\\u0E13\\u0E1E\\u0E34\\u0E21\\u0E1E\\u0E4C",
  "System prompt": "System prompt",
  "Model slug": "Model slug",
  "Temperature": "Temperature",
  "Max tokens": "Max tokens",
  "Voice model": "\\u0E42\\u0E21\\u0E40\\u0E14\\u0E25\\u0E40\\u0E2A\\u0E35\\u0E22\\u0E07",
  "Model name sent to your voice provider.": "\\u0E0A\\u0E37\\u0E48\\u0E2D\\u0E42\\u0E21\\u0E40\\u0E14\\u0E25\\u0E17\\u0E35\\u0E48\\u0E2A\\u0E48\\u0E07\\u0E44\\u0E1B\\u0E22\\u0E31\\u0E07\\u0E1C\\u0E39\\u0E49\\u0E43\\u0E2B\\u0E49\\u0E1A\\u0E23\\u0E34\\u0E01\\u0E32\\u0E23\\u0E40\\u0E2A\\u0E35\\u0E22\\u0E07",
  "Voice ID": "Voice ID",
  "Leave empty to use the provider's default voice.": "\\u0E40\\u0E27\\u0E49\\u0E19\\u0E27\\u0E48\\u0E32\\u0E07\\u0E40\\u0E1E\\u0E37\\u0E48\\u0E2D\\u0E43\\u0E0A\\u0E49\\u0E40\\u0E2A\\u0E35\\u0E22\\u0E07\\u0E40\\u0E23\\u0E34\\u0E48\\u0E21\\u0E15\\u0E49\\u0E19\\u0E02\\u0E2D\\u0E07\\u0E1C\\u0E39\\u0E49\\u0E43\\u0E2B\\u0E49\\u0E1A\\u0E23\\u0E34\\u0E01\\u0E32\\u0E23",
  "Latency": "Latency",
  "Language model key": "\\u0E04\\u0E35\\u0E22\\u0E4C\\u0E42\\u0E21\\u0E40\\u0E14\\u0E25\\u0E20\\u0E32\\u0E29\\u0E32",
  "Voice key": "\\u0E04\\u0E35\\u0E22\\u0E4C\\u0E40\\u0E2A\\u0E35\\u0E22\\u0E07",
  "Live": "Live",
  "Log": "Log",
  "build": "build",
  "id": "\\u0E23\\u0E2B\\u0E31\\u0E2A",
  "1 turn = 1 user message + 1 reply from {name}": "1 \\u0E23\\u0E2D\\u0E1A = \\u0E1C\\u0E39\\u0E49\\u0E43\\u0E0A\\u0E49 1 \\u0E02\\u0E49\\u0E2D\\u0E04\\u0E27\\u0E32\\u0E21 + {name} 1 \\u0E02\\u0E49\\u0E2D\\u0E04\\u0E27\\u0E32\\u0E21",
  "{n} turns summarized": "\\u0E2A\\u0E23\\u0E38\\u0E1B\\u0E41\\u0E25\\u0E49\\u0E27 {n} \\u0E23\\u0E2D\\u0E1A",
  "Downloading {n} log entries": "\\u0E14\\u0E32\\u0E27\\u0E19\\u0E4C\\u0E42\\u0E2B\\u0E25\\u0E14 log {n} \\u0E23\\u0E32\\u0E22\\u0E01\\u0E32\\u0E23",
  "Say hello to {name}": "\\u0E17\\u0E31\\u0E01\\u0E17\\u0E32\\u0E22 {name} \\u0E44\\u0E14\\u0E49\\u0E40\\u0E25\\u0E22",
  "Message {name}": "\\u0E1E\\u0E34\\u0E21\\u0E1E\\u0E4C\\u0E02\\u0E49\\u0E2D\\u0E04\\u0E27\\u0E32\\u0E21\\u0E16\\u0E36\\u0E07 {name}"
};

// src/ui/i18n/zh.js
var zh_default = {
  "Thinking\\u2026": "\\u6B63\\u5728\\u601D\\u8003\\u2026",
  "Translating\\u2026": "\\u6B63\\u5728\\u7FFB\\u8BD1\\u2026",
  "Generating voice\\u2026": "\\u6B63\\u5728\\u751F\\u6210\\u8BED\\u97F3\\u2026",
  "Can't reach the server. If you use Cloudflare Access, reload the page to sign in again.": "\\u65E0\\u6CD5\\u8FDE\\u63A5\\u670D\\u52A1\\u5668\\u3002\\u5982\\u679C\\u4F7F\\u7528 Cloudflare Access\\uFF0C\\u8BF7\\u5237\\u65B0\\u9875\\u9762\\u91CD\\u65B0\\u767B\\u5F55\\u3002",
  "Error ": "\\u9519\\u8BEF ",
  "Stop audio": "\\u505C\\u6B62\\u64AD\\u653E",
  "Play audio": "\\u64AD\\u653E\\u8BED\\u97F3",
  "Sample character": "\\u793A\\u4F8B\\u89D2\\u8272",
  "Stored on the server": "\\u5DF2\\u5B58\\u50A8\\u5728\\u670D\\u52A1\\u5668",
  "Using an external link": "\\u4F7F\\u7528\\u5916\\u90E8\\u94FE\\u63A5",
  "Will be imported on save": "\\u4FDD\\u5B58\\u65F6\\u5BFC\\u5165",
  "Will be uploaded on save": "\\u4FDD\\u5B58\\u65F6\\u4E0A\\u4F20",
  "https://\\u2026/avatar.vrm or choose a file": "https://\\u2026/avatar.vrm \\u6216\\u9009\\u62E9\\u6587\\u4EF6",
  "Paste an image link https://\\u2026": "\\u7C98\\u8D34\\u56FE\\u7247\\u94FE\\u63A5 https://\\u2026",
  "Choose file": "\\u9009\\u62E9\\u6587\\u4EF6",
  "Clear": "\\u6E05\\u9664",
  "Preview": "\\u9884\\u89C8",
  "Key found": "\\u5DF2\\u627E\\u5230\\u5BC6\\u94A5",
  "Missing": "\\u672A\\u627E\\u5230",
  "Not checked": "\\u672A\\u68C0\\u67E5",
  "Appearance": "\\u5916\\u89C2",
  "Theme": "\\u4E3B\\u9898",
  "Light": "\\u6D45\\u8272",
  "Dark": "\\u6DF1\\u8272",
  "Liquid Glass effect": "\\u6DB2\\u6001\\u73BB\\u7483\\u6548\\u679C",
  "On: translucent glass with animations. Off: a solid, flat UI with no glass animation or transparency. Stored on this device (localStorage) when you save.": "\\u5F00\\u542F\\uFF1A\\u534A\\u900F\\u660E\\u73BB\\u7483\\u4E0E\\u52A8\\u753B\\u3002\\u5173\\u95ED\\uFF1A\\u7EAF\\u8272\\u6241\\u5E73\\u754C\\u9762\\uFF0C\\u65E0\\u73BB\\u7483\\u52A8\\u753B\\u548C\\u900F\\u660E\\u6548\\u679C\\u3002\\u4FDD\\u5B58\\u65F6\\u5B58\\u50A8\\u5728\\u6B64\\u8BBE\\u5907\\uFF08localStorage\\uFF09\\u3002",
  "The Liquid Glass files could not be loaded, so the flat UI is used automatically.": "\\u65E0\\u6CD5\\u52A0\\u8F7D\\u6DB2\\u6001\\u73BB\\u7483\\u6587\\u4EF6\\uFF0C\\u5DF2\\u81EA\\u52A8\\u4F7F\\u7528\\u6241\\u5E73\\u754C\\u9762\\u3002",
  "User name": "\\u7528\\u6237\\u540D",
  "Display name": "\\u663E\\u793A\\u540D\\u79F0",
  "Used to address you in chat and captions. Leave empty to use \\u201Csenpai\\u201D.": "\\u7528\\u4E8E\\u5728\\u804A\\u5929\\u548C\\u5B57\\u5E55\\u4E2D\\u79F0\\u547C\\u4F60\\u3002\\u7559\\u7A7A\\u5219\\u4F7F\\u7528\\u201Csenpai\\u201D\\u3002",
  "e.g. Alex": "\\u4F8B\\u5982 Alex",
  "Translate your name into Japanese too": "\\u540C\\u65F6\\u5C06\\u4F60\\u7684\\u540D\\u5B57\\u7FFB\\u8BD1\\u6210\\u65E5\\u8BED",
  "When replies are translated into Japanese, your name is written in Japanese too.": "\\u56DE\\u590D\\u7FFB\\u8BD1\\u6210\\u65E5\\u8BED\\u65F6\\uFF0C\\u4F60\\u7684\\u540D\\u5B57\\u4E5F\\u4F1A\\u5199\\u6210\\u65E5\\u8BED\\u3002",
  "Translate name": "\\u7FFB\\u8BD1\\u540D\\u5B57",
  "Japanese name (optional)": "\\u65E5\\u8BED\\u540D\\u5B57\\uFF08\\u53EF\\u9009\\uFF09",
  "Leave empty to let the model translate it.": "\\u7559\\u7A7A\\u5219\\u7531\\u6A21\\u578B\\u81EA\\u52A8\\u7FFB\\u8BD1\\u3002",
  "Japanese name": "\\u65E5\\u8BED\\u540D\\u5B57",
  "e.g. \\u30CE\\u30EF": "\\u4F8B\\u5982 \\u30CE\\u30EF",
  "Character & message rules": "\\u89D2\\u8272\\u4E0E\\u6D88\\u606F\\u89C4\\u5219",
  "Character name": "\\u89D2\\u8272\\u540D\\u79F0",
  "{max} is the maximum length set below and {user} is the user name set above.": "{max} \\u4E3A\\u4E0B\\u65B9\\u8BBE\\u7F6E\\u7684\\u6700\\u5927\\u957F\\u5EA6\\uFF0C{user} \\u4E3A\\u4E0A\\u65B9\\u8BBE\\u7F6E\\u7684\\u7528\\u6237\\u540D\\u3002",
  "Maximum reply length": "\\u56DE\\u590D\\u6700\\u5927\\u957F\\u5EA6",
  " characters": " \\u4E2A\\u5B57\\u7B26",
  "Applies to both the original reply and its translation. If exceeded, the model is asked once to shorten it, then it is cut at a sentence end.": "\\u540C\\u65F6\\u9002\\u7528\\u4E8E\\u539F\\u59CB\\u56DE\\u590D\\u548C\\u8BD1\\u6587\\u3002\\u8D85\\u51FA\\u65F6\\u4F1A\\u5148\\u8BA9\\u6A21\\u578B\\u7F29\\u77ED\\u4E00\\u6B21\\uFF0C\\u7136\\u540E\\u5728\\u53E5\\u672B\\u622A\\u65AD\\u3002",
  "Maximum length": "\\u6700\\u5927\\u957F\\u5EA6",
  "How length is counted": "\\u957F\\u5EA6\\u8BA1\\u7B97\\u65B9\\u5F0F",
  "Some voice providers bill per UTF-8 byte (Thai, Japanese and Chinese use 3 bytes per character). Choose how the limit is counted.": "\\u90E8\\u5206\\u8BED\\u97F3\\u670D\\u52A1\\u6309 UTF-8 \\u5B57\\u8282\\u8BA1\\u8D39\\uFF08\\u6CF0\\u8BED\\u3001\\u65E5\\u8BED\\u3001\\u4E2D\\u6587\\u6BCF\\u4E2A\\u5B57\\u7B26\\u5360 3 \\u5B57\\u8282\\uFF09\\u3002\\u8BF7\\u9009\\u62E9\\u957F\\u5EA6\\u9650\\u5236\\u7684\\u8BA1\\u7B97\\u65B9\\u5F0F\\u3002",
  "Counting": "\\u8BA1\\u6570\\u65B9\\u5F0F",
  "Characters": "\\u5B57\\u7B26",
  "Length counter test": "\\u957F\\u5EA6\\u8BA1\\u6570\\u6D4B\\u8BD5",
  "Test text": "\\u6D4B\\u8BD5\\u6587\\u672C",
  "Type or paste text to count": "\\u8F93\\u5165\\u6216\\u7C98\\u8D34\\u6587\\u672C\\u8FDB\\u884C\\u8BA1\\u6570",
  "Language model": "\\u8BED\\u8A00\\u6A21\\u578B",
  "One model is used for both replies and translation. The default is a free model with a limited quota. Use any model your provider supports.": "\\u540C\\u4E00\\u4E2A\\u6A21\\u578B\\u7528\\u4E8E\\u56DE\\u590D\\u548C\\u7FFB\\u8BD1\\u3002\\u9ED8\\u8BA4\\u662F\\u914D\\u989D\\u6709\\u9650\\u7684\\u514D\\u8D39\\u6A21\\u578B\\uFF0C\\u53EF\\u6539\\u7528\\u670D\\u52A1\\u5546\\u652F\\u6301\\u7684\\u4EFB\\u610F\\u6A21\\u578B\\u3002",
  "e.g. anthropic/claude-\\u2026": "\\u4F8B\\u5982 anthropic/claude-\\u2026",
  "Translation": "\\u7FFB\\u8BD1",
  "Translate replies before speaking": "\\u6717\\u8BFB\\u524D\\u7FFB\\u8BD1\\u56DE\\u590D",
  "The translation is shown on top, the original below, and the voice speaks the translation.": "\\u8BD1\\u6587\\u663E\\u793A\\u5728\\u4E0A\\u65B9\\uFF0C\\u539F\\u6587\\u5728\\u4E0B\\u65B9\\uFF0C\\u8BED\\u97F3\\u6717\\u8BFB\\u8BD1\\u6587\\u3002",
  "Translate replies": "\\u7FFB\\u8BD1\\u56DE\\u590D",
  "Target language": "\\u76EE\\u6807\\u8BED\\u8A00",
  "Show the original under the translation": "\\u5728\\u8BD1\\u6587\\u4E0B\\u65B9\\u663E\\u793A\\u539F\\u6587",
  "Show original": "\\u663E\\u793A\\u539F\\u6587",
  "Voice (text-to-speech)": "\\u8BED\\u97F3\\uFF08\\u6587\\u5B57\\u8F6C\\u8BED\\u97F3\\uFF09",
  "Voice in chat": "\\u804A\\u5929\\u4E2D\\u542F\\u7528\\u8BED\\u97F3",
  "Live mode always speaks.": "\\u5B9E\\u65F6\\u6A21\\u5F0F\\u59CB\\u7EC8\\u6717\\u8BFB\\u3002",
  "File format": "\\u6587\\u4EF6\\u683C\\u5F0F",
  "mp3 is small and plays in every browser.": "mp3 \\u4F53\\u79EF\\u5C0F\\uFF0C\\u6240\\u6709\\u6D4F\\u89C8\\u5668\\u5747\\u53EF\\u64AD\\u653E\\u3002",
  "Only sent if your voice provider supports it. Test it with your provider.": "\\u4EC5\\u5728\\u8BED\\u97F3\\u670D\\u52A1\\u5546\\u652F\\u6301\\u65F6\\u53D1\\u9001\\uFF0C\\u8BF7\\u81EA\\u884C\\u6D4B\\u8BD5\\u3002",
  "Speaking speed": "\\u8BED\\u901F",
  "Volume": "\\u97F3\\u91CF",
  "Try the voice": "\\u8BD5\\u542C\\u8BED\\u97F3",
  "Uses the saved voice settings and counts against your voice provider quota.": "\\u4F7F\\u7528\\u5DF2\\u4FDD\\u5B58\\u7684\\u8BED\\u97F3\\u8BBE\\u7F6E\\uFF0C\\u5E76\\u6D88\\u8017\\u8BED\\u97F3\\u670D\\u52A1\\u989D\\u5EA6\\u3002",
  "Test": "\\u6D4B\\u8BD5",
  "Listening (speech-to-text on the server)": "\\u542C\\u5199\\uFF08\\u670D\\u52A1\\u5668\\u7AEF\\u8BED\\u97F3\\u8F6C\\u6587\\u5B57\\uFF09",
  "Transcription model": "\\u8F6C\\u5199\\u6A21\\u578B",
  "Audio is sent to the server and transcribed there, so no model is downloaded to the device. The default is Whisper Large V3 on OpenRouter.": "\\u97F3\\u9891\\u4F1A\\u53D1\\u9001\\u5230\\u670D\\u52A1\\u5668\\u5E76\\u5728\\u670D\\u52A1\\u5668\\u4E0A\\u8F6C\\u5199\\uFF0C\\u8BBE\\u5907\\u4E0D\\u4F1A\\u4E0B\\u8F7D\\u4EFB\\u4F55\\u6A21\\u578B\\u3002\\u9ED8\\u8BA4\\u4F7F\\u7528 OpenRouter \\u4E0A\\u7684 Whisper Large V3\\u3002",
  "Spoken language": "\\u8BF4\\u8BDD\\u8BED\\u8A00",
  "Pick a language for the best accuracy, or Auto if you mix languages.": "\\u6307\\u5B9A\\u8BED\\u8A00\\u53EF\\u83B7\\u5F97\\u6700\\u4F73\\u51C6\\u786E\\u5EA6\\uFF1B\\u5982\\u679C\\u6DF7\\u7528\\u591A\\u79CD\\u8BED\\u8A00\\uFF0C\\u8BF7\\u9009\\u62E9\\u81EA\\u52A8\\u3002",
  "Auto": "\\u81EA\\u52A8",
  "Send automatically after transcribing": "\\u8F6C\\u5199\\u540E\\u81EA\\u52A8\\u53D1\\u9001",
  "When off, the transcript is placed in the chat box so you can edit it first.": "\\u5173\\u95ED\\u540E\\uFF0C\\u8F6C\\u5199\\u6587\\u672C\\u4F1A\\u653E\\u5165\\u8F93\\u5165\\u6846\\uFF0C\\u65B9\\u4FBF\\u5148\\u4FEE\\u6539\\u3002",
  "Auto-send": "\\u81EA\\u52A8\\u53D1\\u9001",
  "Memory": "\\u8BB0\\u5FC6",
  "Recent turns kept in full": "\\u5B8C\\u6574\\u4FDD\\u7559\\u7684\\u6700\\u8FD1\\u8F6E\\u6570",
  " turns": " \\u8F6E",
  "Number of turns": "\\u8F6E\\u6570",
  "Summarize older turns automatically": "\\u81EA\\u52A8\\u603B\\u7ED3\\u8F83\\u65E9\\u7684\\u8F6E\\u6B21",
  "The server summarizes turns that fall outside the window above.": "\\u670D\\u52A1\\u5668\\u4F1A\\u603B\\u7ED3\\u8D85\\u51FA\\u4E0A\\u8FF0\\u8303\\u56F4\\u7684\\u8F83\\u65E9\\u8F6E\\u6B21\\u3002",
  "Auto-summarize": "\\u81EA\\u52A8\\u603B\\u7ED3",
  "Summary memory": "\\u6458\\u8981\\u8BB0\\u5FC6",
  "No summary yet": "\\u6682\\u65E0\\u6458\\u8981",
  "Clear data": "\\u6E05\\u9664\\u6570\\u636E",
  "Clearing takes effect immediately; no need to save.": "\\u6E05\\u9664\\u7ACB\\u5373\\u751F\\u6548\\uFF0C\\u65E0\\u9700\\u4FDD\\u5B58\\u3002",
  "Clear summary only": "\\u4EC5\\u6E05\\u9664\\u6458\\u8981",
  "Press again to confirm": "\\u518D\\u6309\\u4E00\\u6B21\\u786E\\u8BA4",
  "Clear chat & memory": "\\u6E05\\u9664\\u804A\\u5929\\u548C\\u8BB0\\u5FC6",
  "Live mode": "\\u5B9E\\u65F6\\u6A21\\u5F0F",
  "Character type": "\\u89D2\\u8272\\u7C7B\\u578B",
  "VRM uses a 3D model file. PNG uses two images that swap between speaking and idle.": "VRM \\u4F7F\\u7528 3D \\u6A21\\u578B\\u6587\\u4EF6\\uFF1BPNG \\u4F7F\\u7528\\u4E24\\u5F20\\u56FE\\u7247\\uFF0C\\u5728\\u8BF4\\u8BDD\\u548C\\u9759\\u6B62\\u65F6\\u5207\\u6362\\u3002",
  "How to talk in Live mode": "\\u5B9E\\u65F6\\u6A21\\u5F0F\\u7684\\u8BF4\\u8BDD\\u65B9\\u5F0F",
  "Tap to start and tap to stop, or hold the mic while you talk and release to send.": "\\u70B9\\u6309\\u5F00\\u59CB\\u3001\\u70B9\\u6309\\u505C\\u6B62\\uFF1B\\u6216\\u5728\\u8BF4\\u8BDD\\u65F6\\u6309\\u4F4F\\u9EA6\\u514B\\u98CE\\uFF0C\\u677E\\u5F00\\u540E\\u53D1\\u9001\\u3002",
  "Talk method": "\\u8BF4\\u8BDD\\u65B9\\u5F0F",
  "Tap to start / stop": "\\u70B9\\u6309\\u5F00\\u59CB/\\u505C\\u6B62",
  "Hold to talk": "\\u6309\\u4F4F\\u8BF4\\u8BDD",
  "VRM file": "VRM \\u6587\\u4EF6",
  "Upload a .vrm file to store it on the server. For now the screen still shows a sample figure instead of the 3D model.": "\\u4E0A\\u4F20 .vrm \\u6587\\u4EF6\\u5B58\\u50A8\\u5230\\u670D\\u52A1\\u5668\\u3002\\u76EE\\u524D\\u754C\\u9762\\u4ECD\\u663E\\u793A\\u793A\\u4F8B\\u89D2\\u8272\\uFF0C\\u800C\\u4E0D\\u662F 3D \\u6A21\\u578B\\u3002",
  "Speaking image": "\\u8BF4\\u8BDD\\u56FE\\u7247",
  "9:16 portrait image": "9:16 \\u7AD6\\u7248\\u56FE\\u7247",
  "Idle image": "\\u9759\\u6B62\\u56FE\\u7247",
  "Swap images with the voice": "\\u968F\\u8BED\\u97F3\\u5207\\u6362\\u56FE\\u7247",
  "When off, the speaking image stays until speech ends.": "\\u5173\\u95ED\\u540E\\uFF0C\\u8BF4\\u8BDD\\u671F\\u95F4\\u4E00\\u76F4\\u663E\\u793A\\u8BF4\\u8BDD\\u56FE\\u7247\\uFF0C\\u76F4\\u5230\\u8BF4\\u5B8C\\u3002",
  "Swap images": "\\u5207\\u6362\\u56FE\\u7247",
  "Mouth sensitivity": "\\u5634\\u578B\\u7075\\u654F\\u5EA6",
  "Live background image": "\\u5B9E\\u65F6\\u6A21\\u5F0F\\u80CC\\u666F\\u56FE",
  "Paste an image link or choose a file. Leave empty for a plain background.": "\\u7C98\\u8D34\\u56FE\\u7247\\u94FE\\u63A5\\u6216\\u9009\\u62E9\\u6587\\u4EF6\\u3002\\u7559\\u7A7A\\u5219\\u4F7F\\u7528\\u7EAF\\u8272\\u80CC\\u666F\\u3002",
  "Show captions": "\\u663E\\u793A\\u5B57\\u5E55",
  "API keys (stored as Worker secrets)": "API \\u5BC6\\u94A5\\uFF08\\u5B58\\u50A8\\u4E3A Worker secrets\\uFF09",
  "Works fine with Cloudflare Access alone. Set ACCESS_TEAM_DOMAIN and ACCESS_AUD if you also want the Worker to verify the token.": "\\u4EC5\\u4F7F\\u7528 Cloudflare Access \\u4E5F\\u53EF\\u6B63\\u5E38\\u5DE5\\u4F5C\\u3002\\u5982\\u9700\\u8BA9 Worker \\u518D\\u9A8C\\u8BC1\\u4E00\\u6B21\\u4EE4\\u724C\\uFF0C\\u8BF7\\u8BBE\\u7F6E ACCESS_TEAM_DOMAIN \\u548C ACCESS_AUD\\u3002",
  "Worker verifies the token": "Worker \\u6B63\\u5728\\u9A8C\\u8BC1\\u4EE4\\u724C",
  "Not verified in the app": "\\u5E94\\u7528\\u5185\\u672A\\u9A8C\\u8BC1",
  "Check status": "\\u68C0\\u67E5\\u72B6\\u6001",
  "Only reports whether a key exists. Key values are never sent to the browser.": "\\u53EA\\u62A5\\u544A\\u5BC6\\u94A5\\u662F\\u5426\\u5B58\\u5728\\uFF0C\\u5BC6\\u94A5\\u5185\\u5BB9\\u4E0D\\u4F1A\\u53D1\\u9001\\u5230\\u6D4F\\u89C8\\u5668\\u3002",
  "Checking\\u2026": "\\u68C0\\u67E5\\u4E2D\\u2026",
  "Check": "\\u68C0\\u67E5",
  "Log level": "\\u65E5\\u5FD7\\u7EA7\\u522B",
  "Stored entries": "\\u5DF2\\u5B58\\u50A8\\u6761\\u76EE",
  "The first 500 entries are kept on the server. Keys and chat content are never logged.": "\\u670D\\u52A1\\u5668\\u4FDD\\u7559\\u524D 500 \\u6761\\u8BB0\\u5F55\\u3002\\u4E0D\\u4F1A\\u8BB0\\u5F55\\u5BC6\\u94A5\\u548C\\u804A\\u5929\\u5185\\u5BB9\\u3002",
  "Download .log": "\\u4E0B\\u8F7D .log",
  "Clear log": "\\u6E05\\u9664\\u65E5\\u5FD7",
  "Save failed: ": "\\u4FDD\\u5B58\\u5931\\u8D25\\uFF1A",
  "Can't reach the server": "\\u65E0\\u6CD5\\u8FDE\\u63A5\\u670D\\u52A1\\u5668",
  "Couldn't play audio. Tap the play button on the message.": "\\u65E0\\u6CD5\\u64AD\\u653E\\u8BED\\u97F3\\uFF0C\\u8BF7\\u70B9\\u6309\\u6D88\\u606F\\u4E0A\\u7684\\u64AD\\u653E\\u6309\\u94AE\\u3002",
  "Couldn't generate voice: ": "\\u751F\\u6210\\u8BED\\u97F3\\u5931\\u8D25\\uFF1A",
  "The reply was cut off.": "\\u56DE\\u590D\\u88AB\\u4E2D\\u65AD\\u3002",
  "Couldn't load the audio": "\\u65E0\\u6CD5\\u52A0\\u8F7D\\u8BED\\u97F3",
  "Couldn't send: ": "\\u53D1\\u9001\\u5931\\u8D25\\uFF1A",
  "Couldn't open the microphone: ": "\\u65E0\\u6CD5\\u6253\\u5F00\\u9EA6\\u514B\\u98CE\\uFF1A",
  "Microphone permission was not granted": "\\u672A\\u6388\\u4E88\\u9EA6\\u514B\\u98CE\\u6743\\u9650",
  "Too short \\u2014 try again.": "\\u65F6\\u95F4\\u592A\\u77ED\\uFF0C\\u8BF7\\u91CD\\u8BD5\\u3002",
  "No speech detected \\u2014 try again.": "\\u672A\\u68C0\\u6D4B\\u5230\\u8BED\\u97F3\\uFF0C\\u8BF7\\u91CD\\u8BD5\\u3002",
  "Couldn't transcribe \\u2014 try again.": "\\u65E0\\u6CD5\\u8F6C\\u5199\\uFF0C\\u8BF7\\u91CD\\u8BD5\\u3002",
  "Transcription failed: ": "\\u8F6C\\u5199\\u5931\\u8D25\\uFF1A",
  "Chat and memory cleared": "\\u5DF2\\u6E05\\u9664\\u804A\\u5929\\u548C\\u8BB0\\u5FC6",
  "Couldn't clear: ": "\\u6E05\\u9664\\u5931\\u8D25\\uFF1A",
  "All keys found": "\\u5DF2\\u627E\\u5230\\u5168\\u90E8\\u5BC6\\u94A5",
  "Some keys are missing": "\\u90E8\\u5206\\u5BC6\\u94A5\\u7F3A\\u5931",
  "Check failed: ": "\\u68C0\\u67E5\\u5931\\u8D25\\uFF1A",
  "No log entries yet": "\\u6682\\u65E0\\u65E5\\u5FD7",
  "Log cleared": "\\u65E5\\u5FD7\\u5DF2\\u6E05\\u9664",
  "Couldn't save memory: ": "\\u4FDD\\u5B58\\u8BB0\\u5FC6\\u5931\\u8D25\\uFF1A",
  "Summary cleared": "\\u6458\\u8981\\u5DF2\\u6E05\\u9664",
  "Generating a test voice\\u2026": "\\u6B63\\u5728\\u751F\\u6210\\u6D4B\\u8BD5\\u8BED\\u97F3\\u2026",
  "Voice test failed: ": "\\u8BED\\u97F3\\u6D4B\\u8BD5\\u5931\\u8D25\\uFF1A",
  "No messages yet": "\\u6682\\u65E0\\u6D88\\u606F",
  "You": "\\u4F60",
  "Chat saved to a file": "\\u804A\\u5929\\u8BB0\\u5F55\\u5DF2\\u4FDD\\u5B58",
  "No changes": "\\u6CA1\\u6709\\u66F4\\u6539",
  "Settings saved": "\\u8BBE\\u7F6E\\u5DF2\\u4FDD\\u5B58",
  "Reverted to the saved settings": "\\u5DF2\\u8FD8\\u539F\\u4E3A\\u5DF2\\u4FDD\\u5B58\\u7684\\u8BBE\\u7F6E",
  "Settings reset": "\\u8BBE\\u7F6E\\u5DF2\\u91CD\\u7F6E",
  "Couldn't reset: ": "\\u91CD\\u7F6E\\u5931\\u8D25\\uFF1A",
  "Transcribing\\u2026": "\\u6B63\\u5728\\u8F6C\\u5199\\u2026",
  "Hold while you talk, release when you're done.": "\\u8BF4\\u8BDD\\u65F6\\u8BF7\\u6309\\u4F4F\\uFF0C\\u8BF4\\u5B8C\\u540E\\u677E\\u5F00\\u3002",
  "Can't reach the server: ": "\\u65E0\\u6CD5\\u8FDE\\u63A5\\u670D\\u52A1\\u5668\\uFF1A",
  "Retry": "\\u91CD\\u8BD5",
  "Loading\\u2026": "\\u52A0\\u8F7D\\u4E2D\\u2026",
  "Mute voice": "\\u5173\\u95ED\\u8BED\\u97F3",
  "Enable voice": "\\u5F00\\u542F\\u8BED\\u97F3",
  "Voice in chat is off": "\\u804A\\u5929\\u8BED\\u97F3\\u5DF2\\u5173\\u95ED",
  "Voice in chat is on": "\\u804A\\u5929\\u8BED\\u97F3\\u5DF2\\u5F00\\u542F",
  "Save chat as a file": "\\u5C06\\u804A\\u5929\\u4FDD\\u5B58\\u4E3A\\u6587\\u4EF6",
  "Go to settings": "\\u524D\\u5F80\\u8BBE\\u7F6E",
  "Couldn't send": "\\u53D1\\u9001\\u5931\\u8D25",
  "Dismiss": "\\u5173\\u95ED",
  "Listening ": "\\u6B63\\u5728\\u8046\\u542C ",
  "Type a message": "\\u8F93\\u5165\\u6D88\\u606F",
  "Cancel recording": "\\u53D6\\u6D88\\u5F55\\u97F3",
  "Finish and send": "\\u7ED3\\u675F\\u5E76\\u53D1\\u9001",
  "Talk": "\\u8BF4\\u8BDD",
  "Cancel": "\\u53D6\\u6D88",
  "Send": "\\u53D1\\u9001",
  "Hide captions": "\\u9690\\u85CF\\u5B57\\u5E55",
  " \\xB7 release to send": " \\xB7 \\u677E\\u5F00\\u53D1\\u9001",
  "Hold the mic to talk": "\\u6309\\u4F4F\\u9EA6\\u514B\\u98CE\\u8BF4\\u8BDD",
  "Tap the mic to start talking": "\\u70B9\\u6309\\u9EA6\\u514B\\u98CE\\u5F00\\u59CB\\u8BF4\\u8BDD",
  "Stop": "\\u505C\\u6B62",
  "Finish talking": "\\u7ED3\\u675F\\u8BF4\\u8BDD",
  "Start talking": "\\u5F00\\u59CB\\u8BF4\\u8BDD",
  "Export settings (.json)": "\\u5BFC\\u51FA\\u8BBE\\u7F6E (.json)",
  "Settings exported": "\\u8BBE\\u7F6E\\u5DF2\\u5BFC\\u51FA",
  "Reset to defaults": "\\u6062\\u590D\\u9ED8\\u8BA4\\u8BBE\\u7F6E",
  "You have unsaved changes": "\\u6709\\u672A\\u4FDD\\u5B58\\u7684\\u66F4\\u6539",
  "Everything is saved": "\\u6240\\u6709\\u66F4\\u6539\\u5DF2\\u4FDD\\u5B58",
  "Revert": "\\u8FD8\\u539F",
  "Saving\\u2026": "\\u4FDD\\u5B58\\u4E2D\\u2026",
  "Save": "\\u4FDD\\u5B58",
  "Options": "\\u9009\\u9879",
  "Main menu": "\\u4E3B\\u83DC\\u5355",
  "Chat": "\\u804A\\u5929",
  "Settings": "\\u8BBE\\u7F6E",
  "Language": "\\u8BED\\u8A00",
  "Language of the app interface. Replies follow the language you write in.": "\\u5E94\\u7528\\u754C\\u9762\\u8BED\\u8A00\\u3002\\u56DE\\u590D\\u8BED\\u8A00\\u8DDF\\u968F\\u4F60\\u8F93\\u5165\\u7684\\u8BED\\u8A00\\u3002",
  "System prompt": "\\u7CFB\\u7EDF\\u63D0\\u793A\\u8BCD",
  "Model slug": "\\u6A21\\u578B slug",
  "Temperature": "\\u6E29\\u5EA6",
  "Max tokens": "\\u6700\\u5927 Token \\u6570",
  "Voice model": "\\u8BED\\u97F3\\u6A21\\u578B",
  "Model name sent to your voice provider.": "\\u53D1\\u9001\\u7ED9\\u8BED\\u97F3\\u670D\\u52A1\\u5546\\u7684\\u6A21\\u578B\\u540D\\u79F0\\u3002",
  "Voice ID": "\\u8BED\\u97F3 ID",
  "Leave empty to use the provider's default voice.": "\\u7559\\u7A7A\\u5219\\u4F7F\\u7528\\u670D\\u52A1\\u5546\\u7684\\u9ED8\\u8BA4\\u8BED\\u97F3\\u3002",
  "Latency": "\\u5EF6\\u8FDF",
  "Language model key": "\\u8BED\\u8A00\\u6A21\\u578B\\u5BC6\\u94A5",
  "Voice key": "\\u8BED\\u97F3\\u5BC6\\u94A5",
  "Live": "\\u5B9E\\u65F6",
  "Log": "\\u65E5\\u5FD7",
  "build": "\\u6784\\u5EFA",
  "id": "\\u6807\\u8BC6",
  "1 turn = 1 user message + 1 reply from {name}": "1 \\u8F6E = 1 \\u6761\\u7528\\u6237\\u6D88\\u606F + {name} \\u7684 1 \\u6761\\u56DE\\u590D",
  "{n} turns summarized": "\\u5DF2\\u603B\\u7ED3 {n} \\u8F6E",
  "Downloading {n} log entries": "\\u6B63\\u5728\\u4E0B\\u8F7D {n} \\u6761\\u65E5\\u5FD7",
  "Say hello to {name}": "\\u5411 {name} \\u6253\\u4E2A\\u62DB\\u547C\\u5427",
  "Message {name}": "\\u7ED9 {name} \\u53D1\\u6D88\\u606F"
};

// src/ui/i18n/index.js
var LOCALES = { en: en_default, th: th_default, zh: zh_default };
var TAGS = { en: "en-US", th: "th-TH", zh: "zh-CN" };
var current = "en";
var setLocale = (lang) => {
  current = LOCALES[lang] ? lang : "en";
};
var localeTag = () => TAGS[current];
var t = (key, vars) => {
  let m = LOCALES[current] && LOCALES[current][key] || key;
  if (vars) for (const k of Object.keys(vars)) m = m.split("{" + k + "}").join(String(vars[k]));
  return m;
};

// src/ui/core/api.js
var API = "/horizon/api";
var api = async (path, { method = "GET", json, body, headers = {}, signal } = {}) => {
  let res;
  try {
    res = await fetch(API + path, { method, credentials: "same-origin", signal, headers: { ...json !== void 0 ? { "Content-Type": "application/json" } : {}, ...headers }, body: json !== void 0 ? JSON.stringify(json) : body });
  } catch (e) {
    if (e.name === "AbortError") throw e;
    throw new Error(t("Can't reach the server. If you use Cloudflare Access, reload the page to sign in again."));
  }
  if (!res.ok) {
    let m = res.statusText || t("Error ") + res.status;
    try {
      const j = await res.json();
      if (j.error) m = j.error;
    } catch (e) {
    }
    const err = new Error(m);
    err.status = res.status;
    throw err;
  }
  return res;
};
var getJSON = async (path, opt) => (await api(path, opt)).json();

// src/ui/core/audio.js
var audio = new Audio();
audio.preload = "auto";
var SILENT = "data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA=";
var unlocked = false;
addEventListener("pointerdown", () => {
  if (unlocked) return;
  unlocked = true;
  audio.src = SILENT;
  audio.play().catch(() => {
  });
}, { once: true, capture: true });

// src/ui/core/capture.js
var wavBlob = (pcm) => {
  const n = pcm.length, buf = new ArrayBuffer(44 + n * 2), v = new DataView(buf);
  const w = (o, t2) => {
    for (let i = 0; i < t2.length; i++) v.setUint8(o + i, t2.charCodeAt(i));
  };
  w(0, "RIFF");
  v.setUint32(4, 36 + n * 2, true);
  w(8, "WAVE");
  w(12, "fmt ");
  v.setUint32(16, 16, true);
  v.setUint16(20, 1, true);
  v.setUint16(22, 1, true);
  v.setUint32(24, 16e3, true);
  v.setUint32(28, 32e3, true);
  v.setUint16(32, 2, true);
  v.setUint16(34, 16, true);
  w(36, "data");
  v.setUint32(40, n * 2, true);
  for (let i = 0; i < n; i++) {
    const x = Math.max(-1, Math.min(1, pcm[i]));
    v.setInt16(44 + i * 2, x < 0 ? x * 32768 : x * 32767, true);
  }
  return new Blob([buf], { type: "audio/wav" });
};
var resample = (x, from, to) => {
  if (from === to) return x;
  const r = from / to, n = Math.floor(x.length / r), y = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const p = i * r, i0 = Math.floor(p), i1 = Math.min(i0 + 1, x.length - 1), f = p - i0;
    y[i] = x[i0] * (1 - f) + x[i1] * f;
  }
  return y;
};
var startCapture = async () => {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: { channelCount: 1, echoCancellation: true, noiseSuppression: true } });
  const AC = window.AudioContext || window.webkitAudioContext;
  const ctx = new AC();
  if (ctx.state === "suspended") await ctx.resume();
  const src = ctx.createMediaStreamSource(stream);
  const proc = ctx.createScriptProcessor(4096, 1, 1);
  const mute = ctx.createGain();
  mute.gain.value = 0;
  const chunks = [];
  proc.onaudioprocess = (e) => chunks.push(new Float32Array(e.inputBuffer.getChannelData(0)));
  src.connect(proc);
  proc.connect(mute);
  mute.connect(ctx.destination);
  const close = async () => {
    proc.onaudioprocess = null;
    try {
      proc.disconnect();
      src.disconnect();
    } catch (e) {
    }
    stream.getTracks().forEach((t2) => t2.stop());
    const rate = ctx.sampleRate;
    await ctx.close().catch(() => {
    });
    return rate;
  };
  return {
    async stop() {
      const rate = await close();
      let n = 0;
      for (const c of chunks) n += c.length;
      const all = new Float32Array(n);
      let o = 0;
      for (const c of chunks) {
        all.set(c, o);
        o += c.length;
      }
      return resample(all, rate, 16e3);
    },
    cancel() {
      close();
    }
  };
};

// src/ui/views/components.js
var Row = ({ label, desc, value, stack, children }) => h("div", { className: "row" + (stack ? " stack" : "") }, h("div", { className: "rl" }, h("div", { className: "rt" }, h("span", null, label), value != null && h("span", { className: "rv" }, value)), desc && h("div", { className: "rd" }, desc)), h("div", { className: "rc" }, children));
var Seg = (label, items, value, onValueChange, w) => h(UI.SegmentedControl, { "aria-label": label, items: items.map(([v, l]) => ({ value: v, label: l })), value, onValueChange, style: { "--lg-tab-width": (w || 76) + "px" } });
var Msg = ({ m, s, play, onPlay }) => {
  if (m.role === "user") return h("div", { className: "m u" }, h("div", { className: "bub" }, m.text));
  const p = play && play.id === m.id ? play.st : null;
  return h(
    "div",
    { className: "m a" },
    h("div", { className: "bub" }, m.ja && h("div", { className: "ja", lang: "ja" }, m.ja), (!m.ja || s.tr.showOriginal) && h("div", { className: "orig" + (m.ja ? "" : " solo") }, m.text)),
    h(UI.Button, { className: "mini", icon: p === "loading" ? I.spin : p === "playing" ? I.stop : I.play, "aria-label": p === "playing" ? t("Stop audio") : t("Play audio"), onClick: () => onPlay(m) })
  );
};
var Wait = ({ label }) => h("div", { className: "wait", "aria-live": "polite" }, h("span", { className: "dots" }, h("i"), h("i"), h("i")), h("span", { className: "wl" }, label));
var Placeholder = () => h(
  "svg",
  { viewBox: "0 0 300 533", preserveAspectRatio: "xMidYMax meet", role: "img", "aria-label": t("Sample character") },
  h(
    "g",
    { transform: "translate(0 60)" },
    h("path", { d: "M34 473C34 320 80 275 150 275S266 320 266 473Z", fill: "#1f6f78" }),
    h("path", { d: "M70 395C120 412 180 412 230 395", stroke: "#17565d", strokeWidth: 8, fill: "none", strokeLinecap: "round" }),
    h("path", { d: "M118 278L150 322 182 278Z", fill: "#f6efe6" }),
    h("rect", { x: 132, y: 232, width: 36, height: 54, rx: 14, fill: "#f0c9ae" }),
    h("path", { d: "M70 150C70 62 230 62 230 150L240 272C200 256 100 256 60 272Z", fill: "#3a211b" }),
    h("path", { d: "M82 100L68 26 134 72Z", fill: "#e8742f" }),
    h("path", { d: "M90 88L82 50 114 72Z", fill: "#fbe3cd" }),
    h("path", { d: "M218 100L232 26 166 72Z", fill: "#e8742f" }),
    h("path", { d: "M210 88L218 50 186 72Z", fill: "#fbe3cd" }),
    h("ellipse", { cx: 150, cy: 152, rx: 70, ry: 78, fill: "#f6d7c0" }),
    h("path", { d: "M80 138C84 78 216 78 220 138 200 120 186 114 170 100 160 122 130 126 104 112 96 122 88 130 80 138Z", fill: "#3a211b" }),
    h("g", { className: "eyes" }, h("ellipse", { cx: 120, cy: 160, rx: 8, ry: 11, fill: "#2a1a16" }), h("ellipse", { cx: 180, cy: 160, rx: 8, ry: 11, fill: "#2a1a16" }), h("circle", { cx: 123, cy: 156, r: 3, fill: "#fff" }), h("circle", { cx: 183, cy: 156, r: 3, fill: "#fff" })),
    h("ellipse", { cx: 104, cy: 184, rx: 12, ry: 6, fill: "#f08a70", opacity: 0.45 }),
    h("ellipse", { cx: 196, cy: 184, rx: 12, ry: 6, fill: "#f08a70", opacity: 0.45 }),
    h("ellipse", { className: "mouth", cx: 150, cy: 194, rx: 9, ry: 8, fill: "#8c2f2a" })
  )
);
var Figure = ({ live }) => {
  if (live.mode === "png" && (live.pngTalk || live.pngIdle)) {
    const idle = live.pngIdle || live.pngTalk, talk = live.pngTalk || live.pngIdle;
    return h("div", { className: "png" }, h("img", { className: "idle", src: idle, alt: "", draggable: false, decoding: "async" }), h("img", { className: "talk", src: talk, alt: "", draggable: false, decoding: "async" }));
  }
  return h(Placeholder);
};
function ImgField({ label, desc, value, onChange, tall, accept, vrm }) {
  const ref = useRef();
  const stored = value.startsWith("/horizon/api/assets/");
  const note = stored ? t("Stored on the server") : /^https:/.test(value) ? vrm ? t("Using an external link") : t("Will be imported on save") : t("Will be uploaded on save");
  return h(
    Row,
    { label, desc, stack: true },
    h(UI.Input, { "aria-label": label, placeholder: vrm ? t("https://\\u2026/avatar.vrm or choose a file") : t("Paste an image link https://\\u2026"), value, onValueChange: onChange, style: { maxWidth: "none" } }),
    h(
      "div",
      { className: "btns imgbtns" },
      h(UI.Button, { onClick: () => ref.current.click() }, t("Choose file")),
      h(UI.Button, { destructive: true, disabled: !value, onClick: () => onChange("") }, t("Clear")),
      value && h("span", { className: "chip " + (stored ? "ok" : "") }, note),
      !vrm && value && h("img", { className: "thumb", style: tall ? { height: 64 } : null, src: value, alt: t("Preview"), onError: (e) => {
        e.currentTarget.style.visibility = "hidden";
      }, onLoad: (e) => {
        e.currentTarget.style.visibility = "";
      } })
    ),
    h("input", { ref, type: "file", accept: accept || "image/png,image/jpeg,image/webp,image/gif", hidden: true, onChange: (e) => {
      const f = e.target.files[0];
      if (f) onChange(URL.createObjectURL(f));
      e.target.value = "";
    } })
  );
}
var stLabel = (k) => ({ think: t("Thinking\\u2026"), trans: t("Translating\\u2026"), voice: t("Generating voice\\u2026") })[k];

// src/ui/core/text.js
var KANA = { a: "\\u30A2", i: "\\u30A4", u: "\\u30A6", e: "\\u30A8", o: "\\u30AA", ka: "\\u30AB", ki: "\\u30AD", ku: "\\u30AF", ke: "\\u30B1", ko: "\\u30B3", sa: "\\u30B5", shi: "\\u30B7", si: "\\u30B7", su: "\\u30B9", se: "\\u30BB", so: "\\u30BD", ta: "\\u30BF", chi: "\\u30C1", ti: "\\u30C1", tsu: "\\u30C4", tu: "\\u30C4", te: "\\u30C6", to: "\\u30C8", na: "\\u30CA", ni: "\\u30CB", nu: "\\u30CC", ne: "\\u30CD", no: "\\u30CE", ha: "\\u30CF", hi: "\\u30D2", fu: "\\u30D5", hu: "\\u30D5", he: "\\u30D8", ho: "\\u30DB", ma: "\\u30DE", mi: "\\u30DF", mu: "\\u30E0", me: "\\u30E1", mo: "\\u30E2", ya: "\\u30E4", yu: "\\u30E6", yo: "\\u30E8", ra: "\\u30E9", ri: "\\u30EA", ru: "\\u30EB", re: "\\u30EC", ro: "\\u30ED", la: "\\u30E9", li: "\\u30EA", lu: "\\u30EB", le: "\\u30EC", lo: "\\u30ED", wa: "\\u30EF", wo: "\\u30F2", ga: "\\u30AC", gi: "\\u30AE", gu: "\\u30B0", ge: "\\u30B2", go: "\\u30B4", za: "\\u30B6", ji: "\\u30B8", zu: "\\u30BA", ze: "\\u30BC", zo: "\\u30BE", da: "\\u30C0", de: "\\u30C7", do: "\\u30C9", ba: "\\u30D0", bi: "\\u30D3", bu: "\\u30D6", be: "\\u30D9", bo: "\\u30DC", pa: "\\u30D1", pi: "\\u30D4", pu: "\\u30D7", pe: "\\u30DA", po: "\\u30DD", n: "\\u30F3" };
var LONE = { k: "\\u30AF", s: "\\u30B9", t: "\\u30C8", d: "\\u30C9", g: "\\u30B0", b: "\\u30D6", p: "\\u30D7", m: "\\u30E0", r: "\\u30EB", l: "\\u30EB", h: "\\u30CF", j: "\\u30B8", z: "\\u30BA", f: "\\u30D5", v: "\\u30F4", c: "\\u30AF", x: "\\u30AF\\u30B9", y: "\\u30A4", w: "\\u30A6", q: "\\u30AF" };
var kana = (t2) => {
  const s = t2.toLowerCase().replace(/[^a-z]/g, "");
  let o = "", i = 0;
  while (i < s.length) {
    let hit = null;
    for (const L of [3, 2, 1]) {
      const k = s.slice(i, i + L);
      if (KANA[k]) {
        hit = [k, L];
        break;
      }
    }
    if (hit) {
      o += KANA[hit[0]];
      i += hit[1];
    } else if (s[i] === s[i + 1] && !"aiueon".includes(s[i])) {
      o += "\\u30C3";
      i++;
    } else {
      o += LONE[s[i]] || "";
      i++;
    }
  }
  return o;
};
var jaName = (u) => {
  const n = u.name.trim();
  if (!n) return "senpai";
  if (!u.translate) return n;
  return u.ja.trim() || kana(n) || n;
};
var APP_NAME = "Rhlyria AI";

// src/ui/views/settings.js
function SettingsBody({ c }) {
  const { s, set, mem, setMem, logN } = c;
  const [probe, setProbe] = useState("");
  const [conf, setConf] = useState(false);
  const n = count(probe, s.persona.countMode), lim = s.persona.maxLen;
  const sec = (t2, ...k) => h("section", { className: "sec" }, h("h2", { className: "sh" }, t2), ...k);
  const sw = (g, k, a) => h(UI.Switch, { "aria-label": a, checked: s[g][k], onCheckedChange: (v) => set(g, { [k]: v }) });
  const sl = (g, k, a, min, max, step) => h(UI.Slider, { "aria-label": a, min, max, step: step || 1, value: s[g][k], onValueChange: (v) => set(g, { [k]: v }), style: { width: "100%" } });
  const inp = (g, k, a, ph) => h(UI.Input, { "aria-label": a, placeholder: ph, value: s[g][k], onValueChange: (v) => set(g, { [k]: v }), style: { maxWidth: "none" } });
  const keyChip = (v) => h("span", { className: "chip " + (v === true ? "ok" : v === false ? "no" : "") }, v === true ? t("Key found") : v === false ? t("Missing") : t("Not checked"));
  return h(
    "div",
    { className: "sheet" },
    sec(
      t("Appearance"),
      h(Row, { label: t("Language"), desc: t("Language of the app interface. Replies follow the language you write in."), stack: true }, Seg(t("Language"), [["en", "English"], ["th", "\\u0E44\\u0E17\\u0E22"], ["zh", "\\u4E2D\\u6587"]], s.ui.lang, (v) => set("ui", { lang: v }), 96)),
      h(Row, { label: t("Theme"), stack: true }, Seg(t("Theme"), [["light", t("Light")], ["dark", t("Dark")]], s.ui.theme, (v) => set("ui", { theme: v }), 100)),
      h(Row, { label: t("Liquid Glass effect"), desc: glassOk ? t("On: translucent glass with animations. Off: a solid, flat UI with no glass animation or transparency. Stored on this device (localStorage) when you save.") : t("The Liquid Glass files could not be loaded, so the flat UI is used automatically.") }, sw("ui", "glass", t("Liquid Glass effect")))
    ),
    sec(
      t("User name"),
      h(Row, { label: t("Display name"), desc: t("Used to address you in chat and captions. Leave empty to use \\u201Csenpai\\u201D."), stack: true }, inp("user", "name", t("Display name"), t("e.g. Alex"))),
      h(Row, { label: t("Translate your name into Japanese too"), desc: t("When replies are translated into Japanese, your name is written in Japanese too.") }, sw("user", "translate", t("Translate name"))),
      s.user.translate && h(Row, { key: "ja", label: t("Japanese name (optional)"), desc: t("Leave empty to let the model translate it."), stack: true }, inp("user", "ja", t("Japanese name"), t("e.g. \\u30CE\\u30EF"))),
      s.user.translate && s.user.name.trim() && h(Row, { key: "pv", label: t("Preview"), value: \`\${s.user.name.trim()} \\u2192 \${jaName(s.user)}\` })
    ),
    sec(
      t("Character & message rules"),
      h(Row, { label: t("Character name"), stack: true }, inp("persona", "name", t("Character name"), "Rhlyria")),
      h(Row, { label: t("System prompt"), desc: t("{max} is the maximum length set below and {user} is the user name set above."), stack: true }, h("textarea", { className: "field", "aria-label": t("System prompt"), value: s.persona.prompt, onChange: (e) => set("persona", { prompt: e.target.value }) })),
      h(Row, { label: t("Maximum reply length"), value: lim + (s.persona.countMode === "bytes" ? " bytes" : t(" characters")), desc: t("Applies to both the original reply and its translation. If exceeded, the model is asked once to shorten it, then it is cut at a sentence end."), stack: true }, sl("persona", "maxLen", t("Maximum length"), 50, 300, 10)),
      h(Row, { label: t("How length is counted"), desc: t("Some voice providers bill per UTF-8 byte (Thai, Japanese and Chinese use 3 bytes per character). Choose how the limit is counted."), stack: true }, Seg(t("Counting"), [["chars", t("Characters")], ["bytes", "UTF-8 bytes"]], s.persona.countMode, (v) => set("persona", { countMode: v }), 110)),
      h(Row, { label: t("Length counter test"), value: h("span", { className: n > lim ? "over" : "" }, \`\${n} / \${lim}\`), stack: true }, h(UI.Input, { "aria-label": t("Test text"), placeholder: t("Type or paste text to count"), value: probe, onValueChange: setProbe, style: { maxWidth: "none" } }))
    ),
    sec(
      t("Language model"),
      h(Row, { label: t("Model slug"), desc: t("One model is used for both replies and translation. The default is a free model with a limited quota. Use any model your provider supports."), stack: true }, inp("llm", "model", t("Model slug"), t("e.g. anthropic/claude-\\u2026"))),
      h(Row, { label: t("Temperature"), value: (s.llm.temp / 10).toFixed(1), stack: true }, sl("llm", "temp", t("Temperature"), 0, 20)),
      h(Row, { label: t("Max tokens"), stack: true }, h(UI.Input, { "aria-label": t("Max tokens"), type: "number", value: String(s.llm.maxTokens), onValueChange: (v) => set("llm", { maxTokens: v === "" ? "" : Number(v) }), style: { maxWidth: "none" } }))
    ),
    sec(
      t("Translation"),
      h(Row, { label: t("Translate replies before speaking"), desc: t("The translation is shown on top, the original below, and the voice speaks the translation.") }, sw("tr", "on", t("Translate replies"))),
      h(Row, { label: t("Target language"), stack: true }, Seg(t("Target language"), [["ja", "\\u65E5\\u672C\\u8A9E"], ["en", "English"], ["zh", "\\u4E2D\\u6587"], ["th", "\\u0E44\\u0E17\\u0E22"], ["ko", "\\uD55C\\uAD6D\\uC5B4"]], s.tr.target, (v) => set("tr", { target: v }), 72)),
      h(Row, { label: t("Show the original under the translation") }, sw("tr", "showOriginal", t("Show original")))
    ),
    sec(
      t("Voice (text-to-speech)"),
      h(Row, { label: t("Voice in chat"), desc: t("Live mode always speaks.") }, sw("tts", "on", t("Voice in chat"))),
      h(Row, { label: t("Voice ID"), desc: t("Leave empty to use the provider's default voice."), stack: true }, inp("tts", "voice", t("Voice ID"), "reference_id")),
      h(Row, { label: t("Voice model"), desc: t("Model name sent to your voice provider."), stack: true }, inp("tts", "model", t("Voice model"), "s2.1-pro")),
      h(Row, { label: t("File format"), desc: t("mp3 is small and plays in every browser."), stack: true }, Seg(t("File format"), [["mp3", "mp3"], ["opus", "opus"]], s.tts.format, (v) => set("tts", { format: v }), 88)),
      h(Row, { label: t("Latency"), desc: t("Only sent if your voice provider supports it. Test it with your provider."), stack: true }, Seg(t("Latency"), [["low", "low"], ["balanced", "balanced"], ["normal", "normal"]], s.tts.latency, (v) => set("tts", { latency: v }), 92)),
      h(Row, { label: t("Speaking speed"), value: (s.tts.speed / 10).toFixed(1) + "x", stack: true }, sl("tts", "speed", t("Speaking speed"), 5, 20)),
      h(Row, { label: t("Volume"), value: s.tts.volume + "%", stack: true }, sl("tts", "volume", t("Volume"), 0, 100)),
      h(Row, { label: t("Try the voice"), desc: t("Uses the saved voice settings and counts against your voice provider quota.") }, h(UI.Button, { onClick: c.testVoice }, t("Test")))
    ),
    sec(
      t("Listening (speech-to-text on the server)"),
      h(Row, { label: t("Transcription model"), desc: t("Audio is sent to the server and transcribed there, so no model is downloaded to the device. The default is Whisper Large V3 on OpenRouter."), stack: true }, inp("stt", "model", t("Transcription model"), "openai/whisper-large-v3")),
      h(Row, { label: t("Spoken language"), desc: t("Pick a language for the best accuracy, or Auto if you mix languages."), stack: true }, Seg(t("Spoken language"), [["auto", t("Auto")], ["en", "English"], ["th", "\\u0E44\\u0E17\\u0E22"], ["zh", "\\u4E2D\\u6587"], ["ja", "\\u65E5\\u672C\\u8A9E"]], s.stt.lang, (v) => set("stt", { lang: v }), 88)),
      h(Row, { label: t("Send automatically after transcribing"), desc: t("When off, the transcript is placed in the chat box so you can edit it first.") }, sw("stt", "autosend", t("Auto-send")))
    ),
    sec(
      t("Memory"),
      h(Row, { label: t("Recent turns kept in full"), value: s.mem.turns + t(" turns"), desc: t("1 turn = 1 user message + 1 reply from {name}", { name: s.persona.name }), stack: true }, sl("mem", "turns", t("Number of turns"), 1, 6)),
      h(Row, { label: t("Summarize older turns automatically"), desc: t("The server summarizes turns that fall outside the window above.") }, sw("mem", "auto", t("Auto-summarize"))),
      h(Row, { label: t("Summary memory"), value: t("{n} turns summarized", { n: mem.done }), stack: true }, h("textarea", { className: "field sm", "aria-label": t("Summary memory"), placeholder: t("No summary yet"), value: mem.summary, onChange: (e) => setMem((p) => ({ ...p, summary: e.target.value })), onBlur: (e) => c.saveSummary(e.target.value) })),
      h(Row, { label: t("Clear data"), desc: t("Clearing takes effect immediately; no need to save."), stack: true }, h(
        "div",
        { className: "btns" },
        h(UI.Button, { onClick: c.clearSummary }, t("Clear summary only")),
        h(UI.Button, { variant: "filled", destructive: true, onClick: () => {
          if (!conf) {
            setConf(true);
            setTimeout(() => setConf(false), 3e3);
            return;
          }
          setConf(false);
          c.clearAll();
        } }, conf ? t("Press again to confirm") : t("Clear chat & memory"))
      ))
    ),
    sec(
      t("Live mode"),
      h(Row, { label: t("Character type"), desc: t("VRM uses a 3D model file. PNG uses two images that swap between speaking and idle."), stack: true }, Seg(t("Character type"), [["vrm", "VRM"], ["png", "PNG"]], s.live.mode, (v) => set("live", { mode: v }), 100)),
      h(Row, { label: t("How to talk in Live mode"), desc: t("Tap to start and tap to stop, or hold the mic while you talk and release to send."), stack: true }, Seg(t("Talk method"), [["tap", t("Tap to start / stop")], ["hold", t("Hold to talk")]], s.live.micMode, (v) => set("live", { micMode: v }), 140)),
      s.live.mode === "vrm" ? h(ImgField, { label: t("VRM file"), desc: t("Upload a .vrm file to store it on the server. For now the screen still shows a sample figure instead of the 3D model."), accept: ".vrm,.glb", vrm: true, value: s.live.vrm, onChange: (v) => set("live", { vrm: v }) }) : [
        h(ImgField, { key: "t", tall: true, label: t("Speaking image"), desc: t("9:16 portrait image"), value: s.live.pngTalk, onChange: (v) => set("live", { pngTalk: v }) }),
        h(ImgField, { key: "i", tall: true, label: t("Idle image"), desc: t("9:16 portrait image"), value: s.live.pngIdle, onChange: (v) => set("live", { pngIdle: v }) }),
        h(Row, { key: "f", label: t("Swap images with the voice"), desc: t("When off, the speaking image stays until speech ends.") }, sw("live", "flap", t("Swap images")))
      ],
      s.live.mode === "vrm" && h(Row, { label: t("Mouth sensitivity"), value: (s.live.mouth / 10).toFixed(1) + "x", stack: true }, sl("live", "mouth", t("Mouth sensitivity"), 3, 20)),
      h(ImgField, { label: t("Live background image"), desc: t("Paste an image link or choose a file. Leave empty for a plain background."), value: s.live.bg, onChange: (v) => set("live", { bg: v }) }),
      h(Row, { label: t("Show captions") }, sw("live", "captions", t("Show captions")))
    ),
    sec(
      t("API keys (stored as Worker secrets)"),
      h(Row, { label: t("Language model key"), desc: "LLM_API_KEY" }, keyChip(c.keys.llm)),
      h(Row, { label: t("Voice key"), desc: "TTS_API_KEY" }, keyChip(c.keys.tts)),
      h(Row, { label: "Cloudflare Access", desc: t("Works fine with Cloudflare Access alone. Set ACCESS_TEAM_DOMAIN and ACCESS_AUD if you also want the Worker to verify the token.") }, h("span", { className: "chip " + (c.access ? "ok" : "") }, c.access ? t("Worker verifies the token") : t("Not verified in the app"))),
      h(Row, { label: t("Check status"), desc: t("Only reports whether a key exists. Key values are never sent to the browser.") }, h(UI.Button, { disabled: c.keys.busy, onClick: c.checkKeys }, c.keys.busy ? t("Checking\\u2026") : t("Check")))
    ),
    sec(
      t("Log"),
      h(Row, { label: t("Log level"), stack: true }, Seg(t("Log level"), [["debug", "debug"], ["info", "info"], ["warn", "warn"], ["error", "error"]], s.log.level, (v) => set("log", { level: v }), 72)),
      h(Row, { label: t("Stored entries"), value: \`\${logN} / 500\`, desc: t("The first 500 entries are kept on the server. Keys and chat content are never logged."), stack: true }, h(
        "div",
        { className: "btns" },
        h(UI.Button, { variant: "filled", onClick: c.dlLog }, t("Download .log")),
        h(UI.Button, { destructive: true, disabled: !logN, onClick: c.clearLog }, t("Clear log"))
      ))
    ),
    h("div", { className: "foot" }, c.build && h("div", { className: "ver" }, h("b", null, \`\${APP_NAME} \${c.build.version} (\${c.build.release})\`), \` \\xB7 \${t("build")} \${c.build.number} \\xB7 \${t("id")} \${c.build.id} \\xB7 \${new Date(c.build.built).toLocaleString(localeTag(), { dateStyle: "medium", timeStyle: "short" })}\`, h("ul", null, c.build.notes.map((n2, i) => h("li", { key: i }, n2)))), "Liquid Glass: glisse by Kelvin Zhang (MIT) \\xB7 inspired by Riko Project by rayenfeng (MIT)")
  );
}

// src/ui/app.js
function App() {
  const [tab, setTab] = useState("chat");
  const [s, setS] = useState(DEFAULTS);
  const [d, setD] = useState(DEFAULTS);
  setLocale(s.ui.lang);
  Object.assign(UI, s.ui.glass && Lib ? Lib : Plain);
  const sRef = useRef(s);
  sRef.current = s;
  const [ready, setReady] = useState(false);
  const [bootErr, setBootErr] = useState(null);
  const [msgs, setMsgs] = useState([]);
  const [mem, setMem] = useState({ summary: "", done: 0 });
  const [busy, setBusy] = useState(null);
  const [play, setPlay] = useState(null);
  const [rec, setRec] = useState(null);
  const [tx, setTx] = useState(false);
  const [draft, setDraft] = useState("");
  const [toast, setToast] = useState(null);
  const [keys, setKeys] = useState({ llm: null, tts: null, stt: null, busy: false });
  const [logN, setLogN] = useState(0);
  const [saving, setSaving] = useState(false);
  const [access, setAccess] = useState(false);
  const [build, setBuild] = useState(null);
  const [fail, setFail] = useState(null);
  const tt = useRef(), recIv = useRef(), run = useRef(0), pageRef = useRef(), appRef = useRef(), botRef = useRef(), logq = useRef([]), abortRef = useRef(null), capRef = useRef(null), recRef = useRef(null), holdRef = useRef(false), aurls = useRef(/* @__PURE__ */ new Map());
  const dirty = JSON.stringify(d) !== JSON.stringify(s);
  const log = useCallback((lv, m) => {
    logq.current.push({ level: lv, msg: String(m).slice(0, 200), ts: Date.now() });
  }, []);
  const flushLogs = useCallback(async () => {
    if (!logq.current.length) return;
    const entries = logq.current.splice(0, 50);
    try {
      await api("/logs", { method: "POST", json: { entries } });
    } catch (e) {
    }
  }, []);
  const notify = useCallback((t2, ms = 2600) => {
    setToast(t2);
    clearTimeout(tt.current);
    tt.current = setTimeout(() => setToast(null), ms);
  }, []);
  const set = useCallback((g, v) => setD((p) => ({ ...p, [g]: { ...p[g], ...v } })), []);
  const quick = useCallback((g, v) => {
    const next = { ...sRef.current, [g]: { ...sRef.current[g], ...v } };
    setS(next);
    sRef.current = next;
    setD((p) => ({ ...p, [g]: { ...p[g], ...v } }));
    getJSON("/settings", { method: "PUT", json: next }).catch((e) => notify(t("Save failed: ") + e.message));
  }, [notify]);
  const boot = useCallback(async () => {
    setBootErr(null);
    try {
      const j = await getJSON("/bootstrap");
      let st = j.settings;
      try {
        const ls = localStorage.getItem("rhlyria.glass");
        if (ls !== null) st = { ...st, ui: { ...st.ui, glass: ls !== "0" } };
      } catch (e) {
      }
      setS(st);
      setD(st);
      sRef.current = st;
      setMsgs(j.messages);
      setMem(j.memory);
      setKeys({ ...j.secrets, busy: false });
      setLogN(j.logs.count);
      setAccess(!!j.access);
      setBuild(j.build || null);
      setReady(true);
    } catch (e) {
      setBootErr(e.message || t("Can't reach the server"));
    }
  }, []);
  useEffect(() => {
    boot();
  }, [boot]);
  useEffect(() => {
    if (ready) log("info", "session start");
  }, [ready, log]);
  useEffect(() => {
    const iv = setInterval(flushLogs, 8e3);
    return () => clearInterval(iv);
  }, [flushLogs]);
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", s.ui.theme);
  }, [s.ui.theme]);
  useEffect(() => {
    document.documentElement.lang = s.ui.lang;
    try {
      localStorage.setItem("rhlyria.lang", s.ui.lang);
    } catch (e) {
    }
  }, [s.ui.lang]);
  useEffect(() => {
    document.documentElement.dataset.glass = s.ui.glass && glassOk ? "on" : "off";
    try {
      localStorage.setItem("rhlyria.glass", s.ui.glass ? "1" : "0");
    } catch (e) {
    }
  }, [s.ui.glass]);
  useEffect(() => {
    const el = botRef.current, app = appRef.current;
    if (!el || !app) return;
    const ro = new ResizeObserver(() => app.style.setProperty("--dock-h", Math.ceil(el.getBoundingClientRect().height) + "px"));
    ro.observe(el);
    return () => ro.disconnect();
  }, [ready]);
  useEffect(() => {
    if (tab !== "settings" || !ready) return;
    getJSON("/memory").then((j) => setMem({ summary: j.summary, done: j.done })).catch(() => {
    });
    getJSON("/logs").then((j) => setLogN(j.count)).catch(() => {
    });
  }, [tab, ready]);
  const audioUrl = async (key, fetcher) => {
    if (aurls.current.has(key)) return aurls.current.get(key);
    const blob = await (await fetcher()).blob();
    const u = URL.createObjectURL(blob);
    aurls.current.set(key, u);
    return u;
  };
  const loadInto = (url) => new Promise((res) => {
    const fin = () => {
      audio.oncanplaythrough = null;
      audio.onerror = null;
      res();
    };
    audio.oncanplaythrough = fin;
    audio.onerror = fin;
    audio.src = url;
    audio.load();
    setTimeout(fin, 8e3);
  });
  const stopPlay = useCallback(() => {
    audio.pause();
    setPlay(null);
  }, []);
  const playAudio = useCallback(async (id, url) => {
    audio.onplaying = () => setPlay({ id, st: "playing" });
    audio.onended = audio.onerror = audio.onpause = () => setPlay((p) => p && p.id === id ? null : p);
    if (audio.src !== url) audio.src = url;
    try {
      audio.currentTime = 0;
      await audio.play();
    } catch (e) {
      setPlay(null);
      notify(t("Couldn't play audio. Tap the play button on the message."));
    }
  }, [notify]);
  const onPlay = useCallback(async (m) => {
    if (play && play.id === m.id) {
      stopPlay();
      log("info", "tts stop");
      return;
    }
    setPlay({ id: m.id, st: "loading" });
    try {
      let u = null;
      if (m.audio) {
        try {
          u = await audioUrl("a" + m.audio, () => api("/audio/" + m.audio));
        } catch (e) {
          u = null;
        }
      }
      if (!u) {
        log("info", "tts replay request");
        u = await audioUrl("m" + m.id, () => api("/tts", { method: "POST", json: { text: m.ja || m.text } }));
      }
      await loadInto(u);
      await playAudio(m.id, u);
    } catch (e) {
      setPlay(null);
      notify(t("Couldn't generate voice: ") + e.message);
    }
  }, [play, stopPlay, playAudio, log, notify]);
  const abortRec = useCallback(() => {
    clearInterval(recIv.current);
    if (capRef.current) {
      capRef.current.cancel();
      capRef.current = null;
    }
    recRef.current = null;
    setRec(null);
  }, []);
  const cancelAll = useCallback(() => {
    run.current++;
    if (abortRef.current) abortRef.current.abort();
    holdRef.current = false;
    abortRec();
    setBusy(null);
    setTx(false);
    stopPlay();
    log("info", "cancelled by user");
  }, [abortRec, stopPlay, log]);
  const turn = useCallback(async (text, from, retry) => {
    const t2 = text.trim();
    if (!t2) return;
    const id = ++run.current;
    const ac = new AbortController();
    abortRef.current = ac;
    setFail(null);
    if (!retry) setMsgs((m) => [...m, { id: "u" + nid(), role: "user", text: t2 }]);
    log("info", \`user(\${from}) chars=\${[...t2].length}\`);
    try {
      setBusy("think");
      const res = await api("/chat", { method: "POST", json: { text: t2, from }, signal: ac.signal });
      const reader = res.body.getReader(), dc = new TextDecoder();
      let buf = "", fin = null;
      for (; ; ) {
        const { value, done } = await reader.read();
        if (done) break;
        buf += dc.decode(value, { stream: true });
        let i;
        while ((i = buf.indexOf("\\n")) >= 0) {
          const line = buf.slice(0, i).trim();
          buf = buf.slice(i + 1);
          if (!line) continue;
          const ev = JSON.parse(line);
          if (ev.stage) {
            if (run.current === id) setBusy(ev.stage);
          } else if (ev.error) throw new Error(ev.error);
          else if (ev.done) fin = ev;
        }
      }
      if (run.current !== id) return;
      if (!fin) throw new Error(t2("The reply was cut off."));
      const m = fin.message;
      let url = null;
      if (m.audio) {
        try {
          url = await audioUrl("a" + m.audio, () => api("/audio/" + m.audio));
          await loadInto(url);
        } catch (e) {
          url = null;
          notify(t2("Couldn't load the audio"));
        }
      } else if (fin.ttsError) notify(t2("Couldn't generate voice: ") + fin.ttsError);
      if (run.current !== id) return;
      setMsgs((x) => [...x, m]);
      setBusy(null);
      if (url) playAudio(m.id, url);
    } catch (e) {
      if (run.current === id) {
        setBusy(null);
        if (e.name !== "AbortError") {
          setFail({ text: t2, from, error: e.message });
          notify(t2("Couldn't send: ") + e.message, 7e3);
          log("error", "chat failed: " + e.message);
        }
      }
    }
  }, [log, notify, playAudio]);
  const startRec = useCallback(async (from) => {
    if (recRef.current || tx || busy) return false;
    stopPlay();
    let cap2;
    try {
      cap2 = await startCapture();
    } catch (e) {
      notify(t("Couldn't open the microphone: ") + (e.name === "NotAllowedError" ? t("Microphone permission was not granted") : e.message));
      log("error", "mic: " + e.message);
      return false;
    }
    if (recRef.current) {
      cap2.cancel();
      return false;
    }
    capRef.current = cap2;
    recRef.current = { from, start: Date.now() };
    setRec({ from, t: 0 });
    log("info", \`mic start lang=\${sRef.current.stt.lang} mode=\${sRef.current.live.micMode}\`);
    clearInterval(recIv.current);
    recIv.current = setInterval(() => setRec((r) => r ? { ...r, t: r.t + 1 } : r), 1e3);
    return true;
  }, [tx, busy, stopPlay, log, notify]);
  const stopRec = useCallback(async () => {
    const cur = recRef.current, cap2 = capRef.current;
    if (!cur || !cap2) return;
    capRef.current = null;
    recRef.current = null;
    clearInterval(recIv.current);
    setRec(null);
    setTx(true);
    const id = ++run.current;
    const ac = new AbortController();
    abortRef.current = ac;
    try {
      const pcm = await cap2.stop();
      if (pcm.length < 6400) {
        setTx(false);
        notify(t2("Too short \\u2014 try again."));
        return;
      }
      let e2 = 0, n = 0;
      for (let i = 0; i < pcm.length; i += 16) {
        e2 += pcm[i] * pcm[i];
        n++;
      }
      if (Math.sqrt(e2 / n) < 4e-3) {
        setTx(false);
        notify(t2("No speech detected \\u2014 try again."));
        return;
      }
      log("info", \`mic stop \${(pcm.length / 16e3).toFixed(1)}s, sending to server stt\`);
      const j = await getJSON("/stt", { method: "POST", body: wavBlob(pcm), headers: { "Content-Type": "audio/wav" }, signal: ac.signal });
      if (run.current !== id) return;
      const t2 = String(j.text || "").trim();
      setTx(false);
      if (!t2) {
        notify(t2("Couldn't transcribe \\u2014 try again."));
        return;
      }
      log("info", \`transcript chars=\${[...t2].length}\`);
      if (cur.from === "live" || sRef.current.stt.autosend) turn(t2, cur.from);
      else setDraft(t2);
    } catch (e) {
      if (run.current === id) {
        setTx(false);
        if (e.name !== "AbortError") {
          notify(t("Transcription failed: ") + e.message, 7e3);
          log("error", "stt failed: " + e.message);
        }
      }
    }
  }, [turn, log, notify]);
  useEffect(() => {
    if (rec && rec.t >= 60) stopRec();
  }, [rec, stopRec]);
  const send = () => {
    if (!draft.trim()) return;
    const t2 = draft;
    setDraft("");
    turn(t2, "chat");
  };
  const clearAll = useCallback(async () => {
    cancelAll();
    setFail(null);
    try {
      await api("/memory?scope=all", { method: "DELETE" });
      setMsgs([]);
      setMem({ summary: "", done: 0 });
      aurls.current.clear();
      notify(t("Chat and memory cleared"));
    } catch (e) {
      notify(t("Couldn't clear: ") + e.message);
    }
  }, [cancelAll, notify]);
  useEffect(() => {
    const el = pageRef.current;
    if (!el || tab !== "chat") return;
    const f = requestAnimationFrame(() => {
      el.scrollTop = el.scrollHeight;
    });
    return () => cancelAnimationFrame(f);
  }, [msgs.length, busy, tab, rec, tx, ready]);
  const checkKeys = async () => {
    setKeys((k) => ({ ...k, busy: true }));
    try {
      const j = await getJSON("/secrets");
      setKeys({ llm: j.llm, tts: j.tts, stt: j.stt, busy: false });
      notify(j.llm && j.tts ? t("All keys found") : t("Some keys are missing"));
    } catch (e) {
      setKeys((k) => ({ ...k, busy: false }));
      notify(t("Check failed: ") + e.message);
    }
  };
  const dlLog = async () => {
    await flushLogs();
    const j = await getJSON("/logs").catch(() => null);
    if (!j || !j.count) {
      notify(t("No log entries yet"));
      return;
    }
    setLogN(j.count);
    const a = document.createElement("a");
    a.href = API + "/logs?download=1";
    a.download = "";
    document.body.appendChild(a);
    a.click();
    a.remove();
    notify(t("Downloading {n} log entries", { n: j.count }));
  };
  const clearLog = async () => {
    try {
      await api("/logs", { method: "DELETE" });
      setLogN(0);
      notify(t("Log cleared"));
    } catch (e) {
      notify(t("Couldn't clear: ") + e.message);
    }
  };
  const saveSummary = async (v) => {
    try {
      await api("/memory", { method: "PUT", json: { summary: v } });
    } catch (e) {
      notify(t("Couldn't save memory: ") + e.message);
    }
  };
  const clearSummary = async () => {
    try {
      await api("/memory?scope=summary", { method: "DELETE" });
      setMem((p) => ({ ...p, summary: "" }));
      notify(t("Summary cleared"));
    } catch (e) {
      notify(t("Couldn't clear: ") + e.message);
    }
  };
  const testVoice = async () => {
    try {
      notify(t("Generating a test voice\\u2026"));
      const u = await audioUrl("test" + Date.now(), () => api("/tts", { method: "POST", json: { text: "\\u3053\\u3093\\u306B\\u3061\\u306F\\u3001\\u30C6\\u30B9\\u30C8\\u97F3\\u58F0\\u3067\\u3059\\u3002" } }));
      await loadInto(u);
      await playAudio("test", u);
    } catch (e) {
      notify(t("Voice test failed: ") + e.message);
    }
  };
  const dlChat = () => {
    if (!msgs.length) {
      notify(t("No messages yet"));
      return;
    }
    dl("rhlyria-chat.txt", msgs.map((m) => (m.role === "user" ? s.user.name.trim() || t("You") : s.persona.name) + ": " + (m.ja ? m.ja + "\\n  " : "") + m.text).join("\\n\\n") + "\\n", "text/plain;charset=utf-8");
    notify(t("Chat saved to a file"));
  };
  const save = async () => {
    if (saving) return;
    if (!dirty) {
      notify(t("No changes"));
      return;
    }
    setSaving(true);
    try {
      const next = JSON.parse(JSON.stringify(d));
      for (const kind of ["pngTalk", "pngIdle", "bg", "vrm"]) {
        const v = next.live[kind];
        if (!v) continue;
        if (v.startsWith("blob:") || v.startsWith("data:")) {
          const blob = await (await fetch(v)).blob();
          const r = await getJSON("/assets?kind=" + kind, { method: "POST", body: blob, headers: { "Content-Type": blob.type || "application/octet-stream", "X-File-Name": encodeURIComponent(blob.name || "") } });
          if (v.startsWith("blob:")) URL.revokeObjectURL(v);
          next.live[kind] = r.url;
        } else if (kind !== "vrm" && /^https:\\/\\//.test(v)) {
          const r = await getJSON("/assets/import", { method: "POST", json: { kind, url: v } });
          next.live[kind] = r.url;
        }
      }
      const out = await getJSON("/settings", { method: "PUT", json: next });
      setS(out.settings);
      setD(out.settings);
      sRef.current = out.settings;
      log("info", "settings saved");
      notify(t("Settings saved"));
    } catch (e) {
      notify(t("Save failed: ") + e.message);
      log("error", "save failed: " + e.message);
    } finally {
      setSaving(false);
    }
  };
  const revert = () => {
    setD(s);
    notify(t("Reverted to the saved settings"));
  };
  const resetAll = async () => {
    try {
      const out = await getJSON("/settings", { method: "DELETE" });
      setS(out.settings);
      setD(out.settings);
      sRef.current = out.settings;
      notify(t("Settings reset"));
    } catch (e) {
      notify(t("Couldn't reset: ") + e.message);
    }
  };
  const ctx = { s: d, saved: s, access, build, set, mem, setMem, logN, log, notify, keys, checkKeys, dlLog, clearLog, clearAll, testVoice, saveSummary, clearSummary };
  const lastAi = [...msgs].reverse().find((m) => m.role === "ai"), lastU = [...msgs].reverse().find((m) => m.role === "user");
  const speaking = !!(play && play.st === "playing" && lastAi && play.id === lastAi.id);
  const uname = s.user.name.trim() || t("You");
  const txLabel = t("Transcribing\\u2026");
  const hold = s.live.micMode === "hold";
  const micUp = () => {
    holdRef.current = false;
    const cur = recRef.current;
    if (!cur) return;
    if (Date.now() - cur.start < 400) {
      abortRec();
      notify(t("Hold while you talk, release when you're done."));
      return;
    }
    stopRec();
  };
  const micDown = async (e) => {
    if (!hold || recRef.current || tx || busy) return;
    if (e && e.preventDefault && e.type !== "keydown") e.preventDefault();
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch (x) {
    }
    holdRef.current = true;
    const ok = await startRec("live");
    if (ok && !holdRef.current) micUp();
  };
  let menu, page, cap = null, dock = null;
  if (!ready) {
    return h(
      "div",
      { className: "stage" },
      h("div", { className: "wallpaper" }),
      h("div", { className: "boot" }, bootErr ? [h("div", { key: "m" }, t("Can't reach the server: ") + bootErr), h(UI.Button, { key: "b", variant: "filled", onClick: boot }, t("Retry"))] : h(Wait, { label: t("Loading\\u2026") }))
    );
  }
  if (tab === "chat") {
    const recChat = rec && rec.from === "chat";
    menu = [
      { label: s.tts.on ? t("Mute voice") : t("Enable voice"), onSelect: () => {
        quick("tts", { on: !s.tts.on });
        notify(s.tts.on ? t("Voice in chat is off") : t("Voice in chat is on"));
      } },
      { label: t("Save chat as a file"), onSelect: dlChat },
      { label: t("Go to settings"), onSelect: () => setTab("settings") },
      "separator",
      { label: t("Clear chat & memory"), destructive: true, onSelect: clearAll }
    ];
    page = h(
      "div",
      { className: "page", ref: pageRef },
      h(
        "div",
        { className: "msgs" },
        !msgs.length && !busy && h("div", { className: "empty" }, t("Say hello to {name}", { name: s.persona.name })),
        msgs.map((m) => h(Msg, { key: m.id, m, s, play, onPlay })),
        busy && h("div", { className: "m a" }, h("div", { className: "bub" }, h(Wait, { label: stLabel(busy) }))),
        fail && h("div", { className: "m a" }, h("div", { className: "bub err", role: "alert" }, h("div", { className: "errt" }, t("Couldn't send")), h("div", { className: "errm" }, fail.error), h("div", { className: "btns" }, h(UI.Button, { onClick: () => turn(fail.text, fail.from, true) }, t("Retry")), h(UI.Button, { onClick: () => setFail(null) }, t("Dismiss"))))),
        tx && h("div", { className: "m a" }, h("div", { className: "bub" }, h(Wait, { label: txLabel })))
      )
    );
    const mid = recChat ? h(UI.Glass, { className: "strip" }, h("span", { className: "meter" }, [0, 1, 2, 3, 4].map((i) => h("i", { key: i }))), h("span", null, t("Listening ") + fmt(rec.t))) : h(UI.Input, { "aria-label": t("Type a message"), placeholder: tx ? t("Transcribing\\u2026") : t("Message {name}", { name: s.persona.name }), value: draft, disabled: tx, onValueChange: setDraft, enterKeyHint: "send", style: { maxWidth: "none", flex: 1 }, onKeyDown: (e) => {
      if (e.key === "Enter" && !e.nativeEvent.isComposing) send();
    } });
    dock = h(
      "div",
      { className: "comp" },
      mid,
      recChat ? [h(UI.Button, { key: "c", icon: I.x, "aria-label": t("Cancel recording"), onClick: cancelAll }), h(UI.Button, { key: "o", variant: "filled", icon: I.check, "aria-label": t("Finish and send"), onClick: stopRec })] : [h(UI.Button, { key: "m", icon: I.mic, "aria-label": t("Talk"), disabled: !!(busy || tx), onClick: () => startRec("chat") }), h(UI.Button, { key: "s", variant: "filled", icon: busy ? I.stop : I.send, "aria-label": busy ? t("Cancel") : t("Send"), disabled: !busy && !draft.trim(), onClick: busy ? cancelAll : send })]
    );
  } else if (tab === "live") {
    menu = [
      { label: s.live.captions ? t("Hide captions") : t("Show captions"), onSelect: () => quick("live", { captions: !s.live.captions }) },
      { label: t("Go to settings"), onSelect: () => setTab("settings") },
      "separator",
      { label: t("Clear chat & memory"), destructive: true, onSelect: clearAll }
    ];
    const working = busy || tx;
    page = h(
      "div",
      { className: "live" },
      h("div", { className: "figure" + (speaking ? " speaking" : "") + (s.live.flap ? " flap" : ""), style: { "--mouth": s.live.mouth / 10 } }, h(Figure, { live: s.live }))
    );
    if (s.live.captions) cap = h(
      "div",
      { className: "cap", "aria-live": "polite" },
      rec ? h("div", { className: "wait" }, h("span", { className: "meter" }, [0, 1, 2, 3, 4].map((i) => h("i", { key: i }))), h("span", { className: "wl" }, t("Listening ") + fmt(rec.t) + (hold ? t(" \\xB7 release to send") : ""))) : working ? h(Wait, { label: busy ? stLabel(busy) : txLabel }) : fail ? h("div", { className: "orig solo" }, t("Couldn't send: ") + fail.error) : [
        lastU && h("div", { key: "u", className: "you" }, uname + ": " + lastU.text),
        lastAi ? [lastAi.ja && h("div", { key: "j", className: "ja", lang: "ja" }, lastAi.ja), (!lastAi.ja || s.tr.showOriginal) && h("div", { key: "o", className: "orig" + (lastAi.ja ? "" : " solo") }, lastAi.text)] : h("div", { key: "e", className: "orig solo" }, hold ? t("Hold the mic to talk") : t("Tap the mic to start talking"))
      ]
    );
    dock = h(
      UI.Glass,
      { className: "dock" },
      h(UI.Button, { icon: I.stop, "aria-label": t("Stop"), disabled: !(rec || tx || busy || speaking), onClick: cancelAll }),
      h(
        "span",
        { className: "micwrap" + (rec ? " on" : "") + (hold ? " hold" : ""), onPointerDown: hold ? micDown : void 0, onPointerUp: hold ? micUp : void 0, onPointerCancel: hold ? micUp : void 0, onContextMenu: hold ? (e) => e.preventDefault() : void 0, onKeyDown: hold ? (e) => {
          if ((e.key === " " || e.key === "Enter") && !e.repeat) {
            e.preventDefault();
            micDown(e);
          }
        } : void 0, onKeyUp: hold ? (e) => {
          if (e.key === " " || e.key === "Enter") micUp();
        } : void 0 },
        h(UI.Button, { className: "big", variant: "filled", icon: rec && !hold ? I.check : I.mic, "aria-label": hold ? t("Hold to talk") : rec ? t("Finish talking") : t("Start talking"), disabled: !rec && !!(tx || busy), onClick: hold ? void 0 : () => rec ? stopRec() : startRec("live") })
      ),
      h(UI.Button, { icon: s.live.captions ? I.eye : I.eyeOff, "aria-label": s.live.captions ? t("Hide captions") : t("Show captions"), onClick: () => quick("live", { captions: !s.live.captions }) })
    );
  } else {
    menu = [
      { label: t("Export settings (.json)"), onSelect: () => {
        dl("rhlyria-settings.json", JSON.stringify(s, null, 2), "application/json");
        notify(t("Settings exported"));
      } },
      { label: t("Reset to defaults"), destructive: true, onSelect: resetAll }
    ];
    page = h("div", { className: "page" }, h(SettingsBody, { c: ctx }));
    dock = h(
      UI.Glass,
      { className: "sdock" },
      h("span", { className: "hint" + (dirty ? " dirty" : "") }, dirty ? t("You have unsaved changes") : t("Everything is saved")),
      h(
        "span",
        { className: "btns" },
        h(UI.Button, { disabled: !dirty || saving, onClick: revert }, t("Revert")),
        h(UI.Button, { variant: "filled", disabled: saving, onClick: save }, saving ? t("Saving\\u2026") : t("Save"))
      )
    );
  }
  const bgOn = tab === "live" && !!s.live.bg;
  return h(
    "div",
    { className: "stage" + (tab === "live" ? " on-live" : "") },
    h("div", { className: "wallpaper", style: bgOn ? { backgroundImage: \`url(\${JSON.stringify(s.live.bg)})\` } : null, ...bgOn ? { "data-glisse-backdrop": "" } : null }),
    tab === "chat" && h("div", { className: "haze" }),
    h(
      "div",
      { className: "app", ref: appRef },
      page,
      h("div", { className: "corner" }, h(UI.Menu, { "aria-label": t("Options"), items: menu })),
      h(
        "div",
        { className: "bottom", ref: botRef },
        cap,
        dock,
        h("div", { className: "tabs" }, h(UI.TabBar, { "aria-label": t("Main menu"), items: [{ value: "chat", label: t("Chat"), icon: I.chat }, { value: "live", label: t("Live"), icon: I.live }, { value: "settings", label: t("Settings"), icon: I.gear }], value: tab, onValueChange: setTab, style: { "--lg-tab-width": "58px", "--lg-tab-height": "38px" } }))
      ),
      toast && h(UI.Glass, { className: "toast", role: "status" }, toast)
    )
  );
}

// src/ui/main.js
createRoot(document.getElementById("root")).render(h(App));
` }, "/app.css": { "type": "text/css; charset=utf-8", "body": '/* Copyright (c) 2026 CERETOSPHERE (under COSVerses). Used with special permission from MiNoWa Industry. - SPDX-License-Identifier: MIT */\n:root{box-sizing:border-box;--bg:#f5f5f5;--accent:#6f4ee6;--lg-fill:#6f4ee6;--lg-on:#6f4ee6;--lg-drop:rgb(0 0 0/.12);--lg-edge:rgb(0 0 0/.09);--ink:#1c1c1e;--ink2:rgb(28 28 30/.62);--bubble:#fff;--bubble-edge:rgb(0 0 0/.08);--sheet:#fff;--sep:rgb(60 60 67/.16);--haze:rgb(186 176 255/.2)}\n:root[data-theme=dark]{--bg:#141416;--ink:#f2f2f4;--ink2:rgb(242 242 244/.66);--bubble:#26262a;--bubble-edge:rgb(255 255 255/.1);--sheet:#1e1e22;--sep:rgb(255 255 255/.14);--haze:rgb(150 140 235/.14);--lg-drop:rgb(0 0 0/.4);--accent:#8d70f2;--lg-fill:#8d70f2;--lg-on:#8d70f2}\n:root[data-perf=lite]{--lg-glass-dispersion:0;--lg-tab-dispersion:0;--lg-blur:2px;--lg-glass-bend:.22;--lg-tab-bend:.12;--lg-segment-bend:.15;--lg-slider-bend:.4;--lg-switch-bend:.25}\n:root[data-perf=mobile]{--lg-glass-dispersion:.15;--lg-tab-dispersion:1;--lg-blur:2px}\n:root[data-hidden] *{animation-play-state:paused!important}\n*,*::before,*::after{box-sizing:inherit}\nhtml,body{height:100%;margin:0}\nbody{font:16px/1.55 system-ui,-apple-system,"Segoe UI",Roboto,"Noto Sans","Noto Sans Thai","Noto Sans SC","Noto Sans JP",sans-serif;color:var(--ink);background:var(--bg);overflow:hidden;-webkit-font-smoothing:antialiased;-webkit-text-size-adjust:100%}\nbutton,input,textarea{font:inherit;color:inherit}\n.stage{position:relative;height:100vh;height:100dvh;overflow:hidden;background:var(--bg)}\n.wallpaper{position:absolute;inset:0;background:var(--bg) center/cover no-repeat}\n.haze{position:absolute;left:0;right:0;top:0;height:170px;pointer-events:none;background:linear-gradient(to bottom,var(--haze),transparent)}\n.app{position:absolute;inset:0;max-width:560px;margin:0 auto;--dock-h:150px}\n.corner{position:absolute;z-index:20;top:calc(env(safe-area-inset-top,0px) + 8px);right:10px}\n.corner :is(.lg-button,.pl-btn){width:36px;height:36px}\n.page{position:absolute;inset:0;overflow-y:auto;overflow-x:hidden;overscroll-behavior:contain;-webkit-overflow-scrolling:touch;padding:calc(env(safe-area-inset-top,0px) + 56px) 14px calc(var(--dock-h) + 14px)}\n.bottom{position:absolute;left:0;right:0;bottom:0;z-index:10;padding:0 14px calc(env(safe-area-inset-bottom,0px) + 10px);display:flex;flex-direction:column;gap:8px;pointer-events:none}\n.bottom::before{content:"";position:absolute;left:0;right:0;bottom:0;top:-18px;z-index:-1;background:linear-gradient(to top,var(--bg) 45%,transparent)}\n.bottom>*{pointer-events:auto}\n.bottom>.cap{pointer-events:none}\n.on-live .bottom::before{display:none}\n.tabs{display:flex;justify-content:center}\n.tabs .lg-tab-icon>svg{width:20px;height:20px}\n.tabs .lg-tab-bar[data-icons] :is(.lg-tab,.lg-tab-copy){font-size:9.5px;gap:0}\n.msgs{display:flex;flex-direction:column;gap:12px}\n.m{display:flex;align-items:flex-end;gap:8px}\n.m.u{justify-content:flex-end}\n.bub{max-width:min(82%,430px);padding:9px 14px;border-radius:20px;overflow-wrap:anywhere}\n.u .bub{background:var(--accent);color:#fff;border-bottom-right-radius:6px}\n.a .bub{background:var(--bubble);color:var(--ink);border:1px solid var(--bubble-edge);border-bottom-left-radius:6px}\n.ja{font-family:"Hiragino Sans","Yu Gothic","Noto Sans JP","Noto Sans CJK JP",system-ui,sans-serif;font-size:16px;font-weight:500;line-height:1.55}\n.orig{font-size:13.5px;color:var(--ink2);margin-top:5px;padding-top:5px;border-top:1px solid var(--bubble-edge)}\n.orig.solo{font-size:15.5px;color:var(--ink);border:0;margin:0;padding:0}\n:is(.lg-button,.pl-btn).mini{width:32px;height:32px;min-width:0;padding:0;flex:none}\n.mini svg{width:15px;height:15px}\n.spin{animation:spin .8s linear infinite}\n@keyframes spin{to{transform:rotate(360deg)}}\n.wait{display:flex;align-items:center;gap:10px}\n.wl{font-size:13px;color:var(--ink2)}\n.dots{display:inline-flex;gap:5px}\n.dots i{width:7px;height:7px;border-radius:50%;background:var(--accent);animation:bounce 1s infinite ease-in-out}\n.dots i:nth-child(2){animation-delay:.15s}\n.dots i:nth-child(3){animation-delay:.3s}\n@keyframes bounce{0%,80%,100%{transform:translateY(0);opacity:.45}40%{transform:translateY(-4px);opacity:1}}\n.comp{display:flex;align-items:center;gap:8px}\n.strip:is(.lg-glass,.pl-glass){flex:1;display:flex;align-items:center;gap:10px;min-height:40px;padding:0 16px;border-radius:20px;font-size:14px;color:var(--lg-foreground)}\n.pb{flex:1;height:6px;border-radius:3px;background:rgb(128 128 128/.3);overflow:hidden}\n.pb i{display:block;height:100%;background:var(--accent);transition:width .2s}\n.pct{font-variant-numeric:tabular-nums;color:var(--lg-muted)}\n.meter{display:inline-flex;gap:3px;align-items:center;height:16px}\n.meter i{width:3px;height:100%;border-radius:2px;background:var(--accent);animation:lvl .9s infinite ease-in-out}\n.meter i:nth-child(2){animation-delay:.12s}\n.meter i:nth-child(3){animation-delay:.24s}\n.meter i:nth-child(4){animation-delay:.36s}\n.meter i:nth-child(5){animation-delay:.48s}\n@keyframes lvl{0%,100%{transform:scaleY(.25)}50%{transform:scaleY(1)}}\n.live{position:absolute;inset:0;overflow:hidden}\n.figure{position:absolute;left:0;right:0;bottom:0;height:90%;display:flex;justify-content:center;align-items:flex-end;pointer-events:none}\n.figure>svg{height:100%;width:auto;max-width:100%;animation:float 6s ease-in-out infinite;will-change:transform}\n@keyframes float{50%{transform:translateY(-5px)}}\n.png{position:relative;height:100%;width:100%}\n.png img{position:absolute;inset:0;width:100%;height:100%;object-fit:contain;object-position:50% 100%;-webkit-user-drag:none;user-select:none}\n.png .talk{opacity:0}\n.speaking .png .idle{opacity:0}\n.speaking .png .talk{opacity:1}\n.speaking.flap .png .talk{animation:talkon .42s steps(1,end) infinite}\n.speaking.flap .png .idle{animation:talkoff .42s steps(1,end) infinite}\n@keyframes talkon{0%{opacity:1}50%{opacity:0}}\n@keyframes talkoff{0%{opacity:0}50%{opacity:1}}\n.mouth{transform-box:fill-box;transform-origin:50% 30%;transform:scaleY(.22)}\n.speaking .mouth{animation:talk .38s infinite}\n@keyframes talk{0%{transform:scaleY(.25)}20%{transform:scaleY(calc(.9*var(--mouth,1)))}45%{transform:scaleY(.4)}70%{transform:scaleY(calc(1.15*var(--mouth,1)))}100%{transform:scaleY(.3)}}\n.eyes{transform-box:fill-box;transform-origin:50% 50%;animation:blink 5s infinite}\n@keyframes blink{0%,94%,100%{transform:scaleY(1)}97%{transform:scaleY(.1)}}\n.cap{align-self:center;max-width:min(76%,300px);text-align:center;background:rgb(255 255 255/.86);color:#1c1c1e;border:1px solid rgb(0 0 0/.07);border-radius:16px;padding:6px 12px;overflow-wrap:anywhere}\n:root[data-theme=dark] .cap{background:rgb(38 38 42/.88);color:#f2f2f4;border-color:rgb(255 255 255/.1)}\n.cap .ja{font-size:12.5px;line-height:1.5}\n.cap .orig{font-size:11px;margin-top:3px;padding-top:3px;color:inherit;opacity:.7;border-top-color:rgb(128 128 128/.25)}\n.cap .orig.solo{font-size:12px;opacity:1}\n.cap .wl{font-size:11.5px;color:inherit;opacity:.75}\n.cap .wait{justify-content:center;gap:8px}\n.cap .dots i{width:6px;height:6px}\n.you{font-size:10.5px;opacity:.6;margin-bottom:3px}\n.dock:is(.lg-glass,.pl-glass){align-self:center;display:flex;align-items:center;justify-content:center;gap:12px;padding:5px 10px;border-radius:30px}\n.dock :is(.lg-button,.pl-btn){width:32px;height:32px;min-width:0;padding:0}\n.dock :is(.lg-button,.pl-btn)>svg{width:16px;height:16px}\n.dock :is(.lg-button,.pl-btn).big{width:44px;height:44px;border-radius:50%}\n.dock :is(.lg-button,.pl-btn).big>svg{width:20px;height:20px}\n.micwrap{position:relative;display:inline-grid;place-items:center}\n.micwrap.on::before{content:"";position:absolute;inset:-6px;border-radius:50%;border:2px solid var(--accent);animation:ring 1.4s infinite;pointer-events:none}\n@keyframes ring{0%{transform:scale(.9);opacity:.9}100%{transform:scale(1.25);opacity:0}}\n.sdock:is(.lg-glass,.pl-glass){align-self:stretch;display:flex;align-items:center;justify-content:space-between;gap:10px;padding:6px 6px 6px 16px;border-radius:26px}\n.sdock .hint{font-size:12.5px;color:var(--lg-muted);min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}\n.sdock .hint.dirty{color:var(--accent);font-weight:500}\n.sdock .btns{flex:none;flex-wrap:nowrap}\n.sheet{border-radius:24px;padding:2px 18px 12px;background:var(--sheet);border:1px solid var(--bubble-edge);color:var(--ink);--lg-foreground:var(--ink);--lg-muted:var(--ink2)}\n.sec{padding:14px 0 4px}\n.sec+.sec{border-top:1px solid var(--sep)}\n.sh{margin:0 0 2px;font-size:13px;font-weight:600;color:var(--ink2)}\n.row{display:flex;align-items:center;justify-content:space-between;gap:14px;padding:11px 0}\n.row+.row{border-top:1px solid var(--sep)}\n.row.stack{flex-direction:column;align-items:stretch;gap:10px}\n.rl{min-width:0;flex:1}\n.rt{display:flex;justify-content:space-between;gap:10px;font-weight:500}\n.rv{color:var(--ink2);font-weight:400;font-variant-numeric:tabular-nums}\n.rd{font-size:13px;color:var(--ink2);margin-top:2px}\n.rc{display:flex;align-items:center;gap:8px;flex-wrap:wrap}\n.stack .rc{display:block}\n.field{width:100%;border:1px solid rgb(128 128 128/.32);border-radius:16px;background:rgb(128 128 128/.07);padding:10px 14px;min-height:88px;resize:vertical;line-height:1.55;outline:none}\n.field:focus-visible{box-shadow:0 0 0 2px var(--accent)}\n.field.sm{min-height:64px}\n.over{color:#e5333a;font-weight:600}\n.chip{display:inline-flex;align-items:center;padding:3px 12px;border-radius:999px;font-size:13px;font-weight:500;background:rgb(128 128 128/.16)}\n.chip.ok{background:rgb(111 78 230/.16)}\n.chip.no{background:rgb(229 51 58/.16)}\n.btns{display:flex;flex-wrap:wrap;gap:8px;align-items:center}\n.imgbtns{margin-top:10px}\n.thumb{height:48px;border-radius:8px;object-fit:cover;margin-left:auto;background:rgb(128 128 128/.15)}\n.micwrap.hold{touch-action:none;-webkit-touch-callout:none;-webkit-user-select:none;user-select:none}\n.boot{position:absolute;inset:0;z-index:5;display:flex;flex-direction:column;gap:14px;align-items:center;justify-content:center;padding:24px;text-align:center;color:var(--ink2)}\n.empty{text-align:center;color:var(--ink2);padding:40vh 0 0;font-size:14px}\n.bub.err{border-color:#e5333a;background:var(--bubble)}\n.errt{font-weight:600;color:#e5333a}\n.errm{font-size:13px;color:var(--ink2);margin:4px 0 8px;overflow-wrap:anywhere}\n.foot ul{margin:6px 0 8px;padding-left:18px}\n.foot .ver{margin-bottom:8px}\n.foot{font-size:12px;color:var(--ink2);padding:10px 0 2px}\n.toast:is(.lg-glass,.pl-glass){position:absolute;left:50%;bottom:calc(var(--dock-h) + 10px);transform:translateX(-50%);padding:9px 18px;border-radius:22px;z-index:30;white-space:nowrap;font-size:13.5px;color:var(--lg-foreground);animation:rise .2s ease-out}\n@keyframes rise{from{opacity:0;transform:translate(-50%,8px)}}\n.pl-btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;height:40px;padding:0 16px;border:1px solid var(--bubble-edge);border-radius:20px;background:var(--bubble);color:var(--ink);font-size:14px;cursor:pointer;touch-action:manipulation;-webkit-tap-highlight-color:transparent}\n:where(.pl-btn[data-icon=only]){width:40px;padding:0}\n:where(.pl-btn>svg){width:20px;height:20px;flex:none}\n.pl-btn:active{background:var(--sep)}\n.pl-btn:disabled{opacity:.4;cursor:default}\n.pl-btn[data-variant=filled]{background:var(--accent);border-color:var(--accent);color:#fff}\n.pl-btn[data-destructive]:not([data-variant=filled]){color:#e5333a}\n.pl-btn[data-variant=filled][data-destructive]{background:#e5333a;border-color:#e5333a}\n.pl-glass{background:var(--bubble);border:1px solid var(--bubble-edge);color:var(--ink)}\n.pl-input{display:flex;align-items:center;width:100%;max-width:360px;height:40px;border:1px solid var(--bubble-edge);border-radius:20px;background:var(--bubble);padding:0 14px}\n.pl-input input{flex:1;min-width:0;height:100%;border:0;outline:0;background:none;font-size:14px}\n.pl-input input::placeholder{color:var(--ink2)}\n.pl-input:focus-within{border-color:var(--accent);box-shadow:0 0 0 2px rgb(111 78 230/.25)}\n.pl-input:has(input:disabled){opacity:.4}\n.pl-seg{display:inline-flex;padding:2px;border-radius:18px;background:var(--sep)}\n.pl-seg button{width:var(--lg-tab-width,76px);height:32px;border:0;border-radius:16px;background:none;font-size:13px;color:var(--ink);cursor:pointer}\n.pl-seg button[aria-checked=true]{background:var(--bubble);font-weight:500;box-shadow:0 1px 2px rgb(0 0 0/.18)}\n.pl-range{width:100%;height:40px;margin:0;accent-color:var(--accent)}\n.pl-switch{position:relative;flex:none;width:51px;height:31px;padding:0;border:0;border-radius:16px;background:rgb(120 120 128/.32);cursor:pointer}\n.pl-switch i{position:absolute;top:2px;left:2px;width:27px;height:27px;border-radius:50%;background:#fff;box-shadow:0 1px 3px rgb(0 0 0/.3);transition:transform .15s}\n.pl-switch[aria-checked=true]{background:var(--accent)}\n.pl-switch[aria-checked=true] i{transform:translateX(20px)}\n.pl-tabs{display:inline-flex;padding:4px;border-radius:26px;background:var(--bubble);border:1px solid var(--bubble-edge)}\n.pl-tabs button{display:flex;flex-direction:column;align-items:center;justify-content:center;width:var(--lg-tab-width,58px);height:var(--lg-tab-height,38px);border:0;border-radius:22px;background:none;color:var(--ink);font-size:9.5px;font-weight:500;cursor:pointer}\n.pl-tabs button svg{width:20px;height:20px}\n.pl-tabs button[aria-selected=true]{color:var(--accent);background:var(--sep)}\n.pl-menu{position:relative;display:inline-flex}\n.pl-pop{position:absolute;top:44px;right:0;z-index:40;display:flex;flex-direction:column;min-width:200px;padding:6px;border-radius:16px;background:var(--bubble);border:1px solid var(--bubble-edge);box-shadow:0 8px 24px rgb(0 0 0/.18)}\n.pl-pop button{min-height:34px;padding:6px 12px;border:0;border-radius:10px;background:none;text-align:left;font-size:14px;color:var(--ink);cursor:pointer}\n.pl-pop button:active{background:var(--sep)}\n.pl-pop button[data-destructive]{color:#e5333a}\n.pl-pop hr{margin:6px 8px;border:0;border-top:1px solid var(--sep)}\n:root[data-glass=off] .haze{display:none}\n:root[data-glass=off] .bottom{background:var(--bg);border-top:1px solid var(--sep);padding-top:8px}\n:root[data-glass=off] .bottom::before{display:none}\n:root[data-glass=off] .on-live .bottom{background:none;border:0}\n:root[data-glass=off] .cap{background:var(--bubble);border-color:var(--bubble-edge);color:var(--ink)}\n:root[data-glass=off] .toast{box-shadow:0 4px 16px rgb(0 0 0/.18)}\n@media (prefers-reduced-motion:reduce){*{animation-duration:.01ms!important;animation-iteration-count:1!important}}\n' }, "/perf.js": { "type": "text/javascript; charset=utf-8", "body": '// Copyright (c) 2026 CERETOSPHERE (under COSVerses). Used with special permission from MiNoWa Industry.\n// SPDX-License-Identifier: MIT\n(() => {\n  const r = document.documentElement, nav = navigator, mq = q => matchMedia(q).matches;\n  const lite = (nav.deviceMemory && nav.deviceMemory <= 4) || (nav.hardwareConcurrency && nav.hardwareConcurrency <= 4) || (nav.connection && nav.connection.saveData) || mq("(prefers-reduced-motion: reduce)");\n  try { r.dataset.glass = localStorage.getItem("rhlyria.glass") === "0" ? "off" : "on"; } catch (e) { r.dataset.glass = "on"; }\n  r.dataset.perf = lite ? "lite" : mq("(pointer: coarse)") ? "mobile" : "full";\n  document.addEventListener("visibilitychange", () => r.toggleAttribute("data-hidden", document.hidden));\n  const active = new Set();\n  let last = 0, seen = 0, timer = 0;\n  const note = e => {\n    seen = performance.now();\n    last = e.pointerId;\n    if (e.type === "pointerdown") active.add(e.pointerId);\n    else if (e.type !== "pointermove") active.delete(e.pointerId);\n    if (e.type === "pointerup" || e.type === "pointercancel") { clearTimeout(timer); timer = setTimeout(sweep, 450); }\n  };\n  const sweep = () => {\n    if (performance.now() - seen > 6000) active.clear();\n    if (active.size) return;\n    if (document.querySelector(".lg-tab-bar[data-lifted], .lg-segmented[data-lifted], [data-pressed]"))\n      window.dispatchEvent(new PointerEvent("pointercancel", { pointerId: last, isPrimary: true, bubbles: true }));\n  };\n  for (const t of ["pointerdown", "pointermove", "pointerup", "pointercancel"]) addEventListener(t, note, { capture: true, passive: true });\n  setInterval(sweep, 1500);\n})();\n' }, "/vendor/liquid.js": { "type": "text/javascript; charset=utf-8", "body": '/*!\n * main.liquid.js - Liquid Glass SDK (React components) for COSVerses / CERETOSPHERE\n *\n * Based on "glisse" v0.5.0 - Liquid Glass for the web\n * Copyright (c) Kelvin Zhang - MIT License - https://github.com/0kzh/glisse\n * Modifications Copyright (c) 2026 COSVerses, released under the same MIT License:\n * React is read from the page (window.React / window.ReactDOM); if missing it is loaded\n * from this application\'s own /horizon/vendor/ path (patched for rhlyria-ai; no third-party CDN).\n *\n * CDN USAGE POLICY (fastcdn.cosverses.com)\n * This code is open source under the MIT License. You may copy it and use it on your own\n * website, served from your own server or CDN, provided you keep the notices in this header.\n * Copying the code does NOT grant the right to load it from the COSVerses CDN. Loading any\n * file from fastcdn.cosverses.com on a website we have not authorized is prohibited; we may\n * block such use and pursue legal remedies. If you copy this file, replace any\n * fastcdn.cosverses.com URLs inside it with your own.\n *\n * Permission is hereby granted, free of charge, to any person obtaining a copy of this\n * software and associated documentation files (the "Software"), to deal in the Software\n * without restriction, including without limitation the rights to use, copy, modify, merge,\n * publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons\n * to whom the Software is furnished to do so, subject to the following conditions:\n *\n * The above copyright notice and this permission notice shall be included in all copies or\n * substantial portions of the Software.\n *\n * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,\n * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR\n * PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE\n * FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR\n * OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER\n * DEALINGS IN THE SOFTWARE.\n */\n"use client";\nconst loadScript = (src) => new Promise((resolve) => { const s = document.createElement("script"); s.src = src; s.onload = () => resolve(true); s.onerror = () => resolve(false); document.head.appendChild(s); });\nconst ensure = async (name, urls) => { for (const url of urls) { if (globalThis[name]) return; await loadScript(url); } if (!globalThis[name]) throw new Error("Failed to load " + name); };\nawait ensure("React", ["/horizon/vendor/react.js"]);\nawait ensure("ReactDOM", ["/horizon/vendor/react-dom.js"]);\nconst { forwardRef, useCallback, useEffect, useImperativeHandle, useLayoutEffect, useRef, useState, Fragment, createElement } = globalThis.React;\nconst jsx = (type, props, key) => createElement(type, key === undefined ? props : { ...props, key });\nconst jsxs = (type, props, key) => { const { children, ...rest } = props; if (key !== undefined) rest.key = key; return createElement(type, rest, ...children); };\n// src/internal/styles.ts\nconst id = "glisse-styles";\n/**\n* Adds the stylesheet to the document once. It goes first in <head>, so the\n* app\'s own CSS comes after it and wins ties, as it would if imported after.\n*/\nfunction insertStyles(css) {\n	if (typeof document === "undefined" || document.getElementById(id)) return;\n	const style = document.createElement("style");\n	style.id = id;\n	style.textContent = css;\n	document.head.prepend(style);\n}\n// src/styles.css?inline\nvar styles_default = ":where(:root,[data-theme=light]){--lg-foreground:#000000e0;--lg-muted:#3c3c4399;--lg-glass:#fff9;--lg-glass-active:#ececf0d9;--lg-edge:#00000014;--lg-drop:#0000000f;--lg-selection:#0000001a;--lg-lens:#00000008;--lg-lens-drop:#0000001c;--lg-segment-track:#7676801f;--lg-segment-thumb:#fff;--lg-segment-label:#000;--lg-segment-lens:#00000008;--lg-surface:#fafafcdb;--lg-surface-edge:#00000014;--lg-shadow:#1919231f;--lg-highlight:#3c3c4317;--lg-separator:#3c3c4326;--lg-destructive:#ff383c;--lg-track:#3b3b424d;--lg-rail:#0000001a;--lg-on:#34c759;--lg-fill:#08f;--lg-ring:#0006;--lg-lens-shine:-1.5;--lg-rim-shine:.3;--lg-ease:cubic-bezier(.25, .1, .25, 1)}:where([data-theme=dark]){--lg-foreground:#fff;--lg-muted:#ebebf599;--lg-glass:#2828289e;--lg-glass-active:#4646469e;--lg-edge:#ffffff14;--lg-drop:transparent;--lg-selection:#ffffff25;--lg-lens:#ffffff0e;--lg-lens-drop:transparent;--lg-segment-track:transparent;--lg-segment-thumb:#ebebf54d;--lg-segment-label:#fff;--lg-segment-lens:transparent;--lg-surface:#1c1c1fdb;--lg-surface-edge:#ffffff21;--lg-shadow:#00000061;--lg-highlight:#ebebf521;--lg-separator:#ebebf529;--lg-destructive:#ff4245;--lg-track:#ebebf54d;--lg-rail:#ffffff1a;--lg-on:#30d158;--lg-fill:#0091ff;--lg-ring:#ffffff80;--lg-lens-shine:1;--lg-rim-shine:.13}@media (prefers-color-scheme:dark){:where(:root:not([data-theme=light])){--lg-foreground:#fff;--lg-muted:#ebebf599;--lg-glass:#2828289e;--lg-glass-active:#4646469e;--lg-edge:#ffffff14;--lg-drop:transparent;--lg-selection:#ffffff25;--lg-lens:#ffffff0e;--lg-lens-drop:transparent;--lg-segment-track:transparent;--lg-segment-thumb:#ebebf54d;--lg-segment-label:#fff;--lg-segment-lens:transparent;--lg-surface:#1c1c1fdb;--lg-surface-edge:#ffffff21;--lg-shadow:#00000061;--lg-highlight:#ebebf521;--lg-separator:#ebebf529;--lg-destructive:#ff4245;--lg-track:#ebebf54d;--lg-rail:#ffffff1a;--lg-on:#30d158;--lg-fill:#0091ff;--lg-ring:#ffffff80;--lg-lens-shine:1;--lg-rim-shine:.13}}.lg-glass{background-color:var(--lg-glass);background-image:var(--lg-rim,none);-webkit-backdrop-filter:blur(var(--lg-blur,3px)) var(--lg-filter,saturate(1.5));backdrop-filter:blur(var(--lg-blur,3px)) var(--lg-filter,saturate(1.5));box-shadow:inset 0 0 0 .5px var(--lg-edge), 0 1px 3px var(--lg-drop);background-size:100% 100%;position:relative}.lg-glass[data-rim]{box-shadow:0 1px 3px var(--lg-drop)}.lg-glass:after{content:\\"\\";border-radius:inherit;pointer-events:none;background:radial-gradient(circle 240px at var(--lg-x,50%) var(--lg-y,50%), #ffffff09, #ffffff06 50%, transparent);opacity:0;transition:opacity .22s ease-in-out;position:absolute;inset:0}.lg-glass[data-pressed]:after{opacity:1;transition-duration:0s}.lg-button{height:40px;color:var(--lg-foreground);font:inherit;cursor:pointer;touch-action:manipulation;-webkit-tap-highlight-color:transparent;-webkit-touch-callout:none;-webkit-user-select:none;user-select:none;border:0;border-radius:20px;justify-content:center;align-items:center;gap:8px;padding:0 16px;font-size:14px;transition:background-color .2s;display:inline-flex}.lg-button[data-icon]{padding-left:12px}.lg-button[data-icon=only]{width:40px;padding:0}.lg-button>svg{flex:none;width:20px;height:20px}.lg-button:is(:active,[data-pressed]){background-color:var(--lg-glass-active);transition-duration:0s}@media (hover:hover) and (pointer:fine){.lg-button:hover{background-color:var(--lg-glass-active)}}.lg-button:disabled{background-color:var(--lg-glass);opacity:.35;cursor:default}.lg-button[data-destructive]:not([data-tint]){--lg-tint:var(--lg-destructive)}.lg-button:is([data-tint],[data-destructive]){color:var(--lg-tint)}.lg-button[data-variant=filled]{--lg-button-fill:var(--lg-tint,var(--lg-fill));color:#fff}.lg-button[data-variant=filled],.lg-button[data-variant=filled]:disabled{background-color:var(--lg-button-fill)}.lg-button[data-variant=filled]:is(:active,[data-pressed]){background-color:color-mix(in srgb, var(--lg-button-fill) 85%, #000)}@media (hover:hover) and (pointer:fine){.lg-button[data-variant=filled]:hover{background-color:color-mix(in srgb, var(--lg-button-fill) 88%, #fff)}.lg-button[data-variant=filled]:hover:is(:active,[data-pressed]){background-color:color-mix(in srgb, var(--lg-button-fill) 85%, #000)}}.lg-button:focus-visible,.lg-tab:focus-visible,.lg-switch:focus-visible,.lg-menu-item:focus-visible{outline:2px solid var(--lg-ring);outline-offset:2px}.lg-tab-bar{--lg-tab-width:84px;--lg-tab-height:32px;--lg-tab-inset:4px;--lg-thumb-inset:0px;--lg-lens-grow-x:27px;--lg-lens-grow-y:20px;padding:var(--lg-tab-inset);border-radius:calc(var(--lg-tab-height) / 2 + var(--lg-tab-inset));touch-action:pan-y;-webkit-tap-highlight-color:transparent;-webkit-user-select:none;user-select:none;display:inline-flex;position:relative}.lg-tab-bar-glass{border-radius:inherit;pointer-events:none;position:absolute;inset:0}.lg-tab-bar-glass:before{content:\\"\\";border-radius:inherit;background:radial-gradient(circle 260px at var(--lg-x,20%) 50%, #ffffff17, #ffffff0b 60%, transparent);opacity:0;transition:opacity .16s;position:absolute;inset:0}:is(.lg-tab-bar,.lg-segmented)[data-lifted] .lg-tab-bar-glass:before{opacity:1;transition-duration:.12s}.lg-tab-labels{--lg-room-x:calc(var(--lg-lens-grow-x) / 2 + 4px);--lg-room-y:calc(var(--lg-lens-grow-y) / 2 + 4px);z-index:1;margin:calc(var(--lg-room-y) * -1) calc(var(--lg-room-x) * -1);padding:var(--lg-room-y) var(--lg-room-x);pointer-events:none;display:flex;position:relative}.lg-tab-lensed{top:var(--lg-tab-inset);left:var(--lg-tab-inset);color:var(--lg-tab-selected,var(--lg-foreground));visibility:hidden;position:absolute}:is(.lg-tab-bar,.lg-segmented)[data-lensing] .lg-tab-tint{visibility:hidden}.lg-tab,.lg-tab-copy{width:var(--lg-tab-width);height:var(--lg-tab-height);font:inherit;flex:none;justify-content:center;align-items:center;font-size:14px;display:flex}.lg-tab{z-index:1;border-radius:calc(var(--lg-tab-height) / 2);color:var(--lg-muted);cursor:pointer;pointer-events:auto;-webkit-touch-callout:none;background:0 0;border:0;padding:0;text-decoration:none;transition:color .2s;position:relative}.lg-tab:focus-visible{outline-offset:-2px}.lg-tab-face{display:contents}.lg-tab-bar:not([data-away]) .lg-tab[data-selected]>.lg-tab-face{color:#0000}.lg-tab-text{text-box:trim-both cap alphabetic;display:block}.lg-tab-bar[data-icons]{--lg-tab-width:72px;--lg-tab-height:52px;--lg-lens-grow-x:24px;--lg-lens-grow-y:16px;--lg-tab-selected:var(--lg-fill)}.lg-tab-bar[data-icons] :is(.lg-tab,.lg-tab-copy){flex-direction:column;gap:1px;font-size:10px;font-weight:500}.lg-tab-bar[data-icons] .lg-tab{color:var(--lg-foreground)}.lg-tab-icon{display:flex}.lg-tab-icon>svg{width:26px;height:26px}@media (hover:hover) and (pointer:fine){.lg-tab:hover{color:var(--lg-foreground)}}.lg-tab-lens,.lg-tab-tint,.lg-segmented-thumb{top:calc(var(--lg-tab-inset) + var(--lg-thumb-inset));left:calc(var(--lg-tab-inset) + var(--lg-thumb-inset));width:calc(var(--lg-tab-width) - 2 * var(--lg-thumb-inset));height:calc(var(--lg-tab-height) - 2 * var(--lg-thumb-inset));border-radius:calc(var(--lg-tab-height) / 2 - var(--lg-thumb-inset));pointer-events:none;transform:translateX(calc(var(--lg-tab-width) * var(--lg-index,0)));will-change:transform;transition:opacity .14s;position:absolute}.lg-tab-tint{z-index:1;color:var(--lg-tab-selected,var(--lg-foreground));overflow:hidden}.lg-tab-row{height:var(--lg-tab-height);margin:calc(var(--lg-thumb-inset) * -1) 0 0 calc(var(--lg-thumb-inset) * -1);transform:translateX(calc(var(--lg-tab-width) * var(--lg-index,0) * -1));transform-origin:0 0;will-change:transform;display:flex}.lg-tab-lens.lg-glass{z-index:2;-webkit-backdrop-filter:none;backdrop-filter:none;box-shadow:0 calc(7px / var(--lg-lift-y,1)) calc(11px / var(--lg-lift-y,1)) color-mix(in srgb, var(--lg-lens-drop) calc(var(--lg-lift,0) * 100%), transparent);background-color:#0000;background-image:none;transition:opacity .14s,background-color .14s}.lg-tab-bar[data-lifted] .lg-tab-lens.lg-glass{background-color:var(--lg-lens);transition-duration:.1s}.lg-tab-lens:before{content:\\"\\";border-radius:inherit;background:var(--lg-selection);transition:opacity .14s;position:absolute;inset:0}.lg-tab-lens[data-pressed]:after{opacity:.2}.lg-tab-bar[data-lifted] .lg-tab-lens:before{opacity:0;transition-duration:.1s}:is(.lg-tab-bar,.lg-segmented)[data-refracting] .lg-tab-lens.lg-glass{background-image:var(--lg-rim,none)}:is(.lg-tab-bar,.lg-segmented)[data-refracting][data-light] .lg-tab-lens.lg-glass{background-image:var(--lg-rim-bright,var(--lg-rim,none))}.lg-segmented[data-refracting][data-light] .lg-tab-lens.lg-glass,.lg-tab-bar[data-under][data-light] .lg-tab-lens.lg-glass{z-index:0;-webkit-backdrop-filter:var(--lg-filter,none);backdrop-filter:var(--lg-filter,none)}.lg-tab-bar[data-light] .lg-tab-lens:before{opacity:var(--lg-rest,1);transition:none}.lg-tab-bar[data-light] .lg-tab-lens.lg-glass{background-color:color-mix(in srgb, var(--lg-lens) calc(var(--lg-under,0) * 100%), transparent);transition:opacity .14s}:is(:is(.lg-tab-bar,.lg-segmented)[data-hidden] :is(.lg-tab-lens,.lg-tab-tint,.lg-segmented-thumb),:is(.lg-tab-bar,.lg-segmented):not([data-ready]):not(:has([data-selected])) :is(.lg-tab-lens,.lg-tab-tint,.lg-segmented-thumb)){opacity:0}.lg-segmented{--lg-tab-width:84px;--lg-tab-height:32px;--lg-tab-inset:0px;--lg-thumb-inset:2px;--lg-lens-grow-x:24px;--lg-lens-grow-y:16px;--lg-tab-selected:var(--lg-segment-label);border-radius:calc(var(--lg-tab-height) / 2);touch-action:pan-y;-webkit-tap-highlight-color:transparent;-webkit-user-select:none;user-select:none;display:inline-flex;position:relative}.lg-segmented>.lg-tab-bar-glass{background-image:var(--lg-rim,none), linear-gradient(var(--lg-segment-track) 0 0)}.lg-segmented :is(.lg-tab,.lg-tab-copy){font-size:13px}.lg-segmented .lg-tab,.lg-segmented .lg-tab:hover{color:var(--lg-segment-label)}.lg-segmented :is(.lg-tab,.lg-tab-copy)[data-selected]{font-weight:500}.lg-segmented .lg-tab-tint{display:none}.lg-segmented-thumb{background:var(--lg-segment-thumb)}.lg-segmented[data-lifted] .lg-segmented-thumb{opacity:0;transition-duration:.1s}.lg-segmented .lg-tab-lens:before{content:none}.lg-segmented[data-lifted] .lg-tab-lens.lg-glass{background-color:var(--lg-segment-lens);transition-duration:.1s}.lg-input{box-sizing:border-box;width:100%;max-width:360px;height:40px;color:var(--lg-foreground);border-radius:20px;align-items:center;gap:10px;padding:0 14px;transition:background-color .2s;display:flex}.lg-input:focus-within{background-color:var(--lg-glass-active)}.lg-input input{min-width:0;height:100%;color:inherit;font:inherit;background:0 0;border:0;outline:0;flex:1;padding:0;font-size:14px}.lg-input input::placeholder{color:var(--lg-muted)}.lg-input input::-webkit-search-cancel-button{display:none}.lg-input-icon{width:16px;height:16px;color:var(--lg-muted);flex:none;place-items:center;display:grid}.lg-input-icon>svg{width:100%;height:100%}.lg-input-clear{width:32px;height:32px;color:var(--lg-muted);cursor:pointer;background:0 0;border:0;border-radius:50%;flex:none;place-items:center;margin-right:-8px;padding:0;display:grid}.lg-input-clear svg{width:14px;height:14px}.lg-input:has(input:disabled){opacity:.35}.lg-switch-thumb,.lg-slider-thumb{--lg-settled:calc(1 - var(--lg-lift,0));--lg-thumb-blur:calc(2px * var(--lg-settled) + var(--lg-thumb-frost,.5px) * var(--lg-lift,0));pointer-events:none;-webkit-backdrop-filter:blur(var(--lg-thumb-blur)) brightness(calc(1 + .15 * var(--lg-settled))) saturate(1.5);backdrop-filter:blur(var(--lg-thumb-blur)) brightness(calc(1 + .15 * var(--lg-settled))) saturate(1.5);border-radius:999px;position:absolute;box-shadow:0 6px 24px #0003,inset 0 0 0 1.5px #ffffff80,inset 0 2px 1px #ffffff73,inset 2px 7px 24px #00000017,inset -2px -7px 24px #ffffff29}.lg-thumb-face{border-radius:inherit;background:#fff;position:absolute;inset:0}.lg-switch{--lg-scale:.375;width:calc(160px * var(--lg-scale));height:calc(67px * var(--lg-scale));cursor:pointer;touch-action:pan-y;-webkit-tap-highlight-color:transparent;background:0 0;border:0;border-radius:999px;flex:none;padding:0;position:relative}.lg-switch:before{content:\\"\\";inset:min(0px, calc((67px * var(--lg-scale) - 44px) / 2)) -8px;position:absolute}.lg-switch-bed{pointer-events:none;position:absolute;inset:-6px -12px}.lg-switch-track,.lg-switch-fill{border-radius:999px;position:absolute}.lg-switch-track{background:var(--lg-track);inset:6px 12px}.lg-switch-fill{background:var(--lg-on);opacity:0;inset:0}.lg-switch-inset{visibility:hidden}.lg-switch-inset .lg-switch-track{width:calc((100% - 24px) * (.85 + .1 * var(--lg-lift,0)));height:calc((100% - 12px) * .75 * (.525 + .45 * var(--lg-lift,0)));margin:auto;inset:0}.lg-switch-thumb{top:50%;left:calc(-21.95px * var(--lg-scale));width:calc(146px * var(--lg-scale));height:calc(92px * var(--lg-scale));transform:translateY(-50%)scale(.65)}.lg-switch[aria-checked=true] .lg-switch-fill{opacity:1}.lg-switch[aria-checked=true] .lg-switch-thumb{transform:translate(calc(57.9px * var(--lg-scale)), -50%) scale(.65)}.lg-switch:disabled{opacity:.35;cursor:default}.lg-slider{width:100%;height:40px;position:relative}.lg-slider-bed{pointer-events:none;position:absolute;inset:-4px -16px}.lg-slider-track{background:var(--lg-rail);border-radius:3px;height:6px;position:absolute;inset:21px 16px auto}.lg-slider-fill{width:calc((100% - 36px) * var(--lg-progress) + 18px);border-radius:inherit;background:var(--lg-fill);height:100%;display:block}.lg-slider-magnified{visibility:hidden}.lg-slider-magnified .lg-slider-track{height:calc(var(--lg-slider-line,8px) * (.6 + .4 * var(--lg-lift,0)));border-radius:999px;margin:auto 0;inset:0 16px}.lg-slider-magnified .lg-slider-fill{--lg-travel:calc((100% - 36px) * var(--lg-progress));width:calc(var(--lg-travel) + min(18px, var(--lg-travel) * 4) + max(0px, 18px - (100% - 36px - var(--lg-travel)) * 4))}.lg-slider-thumb{top:0;left:calc((100% - 36px) * var(--lg-progress) - 12px);width:60px;height:40px;scale:.6}.lg-slider input{z-index:1;cursor:pointer;appearance:none;touch-action:pan-y;-webkit-tap-highlight-color:transparent;background:0 0;outline:none;width:100%;height:40px;margin:0;display:block;position:relative}.lg-slider input::-webkit-slider-runnable-track{background:0 0;height:6px}.lg-slider input::-webkit-slider-thumb{width:36px;height:40px;box-shadow:none;opacity:0;touch-action:none;appearance:none;background:0 0;border:0;margin-top:-17px}.lg-slider input::-moz-range-track{background:0 0;height:6px}.lg-slider input::-moz-range-thumb{width:36px;height:40px;box-shadow:none;opacity:0;background:0 0;border:0}.lg-slider:has(input:focus-visible) .lg-slider-thumb{outline:2px solid var(--lg-ring);outline-offset:3px}.lg-slider:has(input:disabled){opacity:.35}.lg-slider input:disabled{cursor:default}.lg-menu{display:inline-flex;position:relative}.lg-menu-card{z-index:10;box-sizing:border-box;width:200px;color:var(--lg-foreground);transform-origin:calc(100% - 20px) 20px;touch-action:none;-webkit-user-select:none;user-select:none;border-radius:20px;font-size:14px;position:absolute;top:0;right:0}.lg-menu-card[data-align=start]{transform-origin:20px 20px;left:0;right:auto}.lg-menu-card[data-phase=leaving]{pointer-events:none}.lg-menu-surface{border-radius:inherit;background:var(--lg-surface);-webkit-backdrop-filter:blur(22px)saturate(1.9);backdrop-filter:blur(22px)saturate(1.9);width:100%;height:100%;box-shadow:inset 0 0 0 .5px var(--lg-surface-edge), 0 12px 40px var(--lg-shadow);pointer-events:none;position:absolute;top:0;right:0}.lg-menu-card[data-align=start] .lg-menu-surface{left:0;right:auto}.lg-menu-glyph{pointer-events:none;place-items:center;width:40px;height:40px;display:grid;position:absolute;top:0;right:0}.lg-menu-card[data-align=start] .lg-menu-glyph{left:0;right:auto}.lg-menu-glyph>svg{width:20px;height:20px}.lg-menu-content{flex-direction:column;padding:6px;display:flex;position:relative}.lg-menu-card:after{content:\\"\\";border-radius:inherit;pointer-events:none;opacity:0;background:linear-gradient(135deg,#ffffff1c,#ffffff06);transition:opacity .12s ease-out;position:absolute;inset:0}.lg-menu-card[data-pressed]:after{opacity:1}.lg-menu-plate{background:var(--lg-highlight);opacity:0;pointer-events:none;border-radius:14px;transition:transform .1s cubic-bezier(.2,.8,.2,1),opacity 80ms ease-out;position:absolute;top:0;left:0}.lg-menu-item{z-index:1;min-height:32px;color:inherit;font:inherit;text-align:left;cursor:pointer;background:0 0;border:0;border-radius:14px;align-items:center;gap:10px;padding:6px 12px;display:flex;position:relative}.lg-menu-item>svg{flex:none;width:16px;height:16px}.lg-menu-item:focus-visible{outline-offset:-2px;background:var(--lg-highlight)}@media (hover:hover) and (pointer:fine){.lg-menu-item:hover:not(:disabled){background:var(--lg-highlight)}}.lg-menu-card[data-scrubbing] .lg-menu-item{background:0 0;outline:none}.lg-menu-item[data-destructive]{color:var(--lg-destructive)}.lg-menu-item:disabled{opacity:.38;cursor:default}.lg-menu-separator{border-top:.5px solid var(--lg-separator);flex:none;margin:7px 11px}@media (prefers-reduced-motion:reduce){.lg-menu-plate{transition:opacity 80ms ease-out}.lg-menu-card{animation:.1s ease-out lg-menu-fade}}@keyframes lg-menu-fade{0%{opacity:0}}";\n// src/internal/cx.ts\nfunction cx(...names) {\n	return names.filter(Boolean).join(" ");\n}\n// src/internal/spring.ts\nconst moving = /* @__PURE__ */ new Set();\nlet frame = 0;\nlet last = 0;\nfunction advance(s, dt) {\n	const x = s.value - s.target;\n	const v = s.velocity;\n	const half = s.damping / 2;\n	const discriminant = half * half - s.stiffness;\n	if (Math.abs(discriminant) < 1e-4) {\n		const decay = Math.exp(-half * dt);\n		const b = v + half * x;\n		s.value = s.target + decay * (x + b * dt);\n		s.velocity = decay * (v - half * b * dt);\n	} else if (discriminant > 0) {\n		const root = Math.sqrt(discriminant);\n		const r1 = -half + root;\n		const r2 = -half - root;\n		const a = (v - r2 * x) / (r1 - r2);\n		const b = x - a;\n		s.value = s.target + a * Math.exp(r1 * dt) + b * Math.exp(r2 * dt);\n		s.velocity = a * r1 * Math.exp(r1 * dt) + b * r2 * Math.exp(r2 * dt);\n	} else {\n		const omega = Math.sqrt(-discriminant);\n		const decay = Math.exp(-half * dt);\n		const cos = Math.cos(omega * dt);\n		const sin = Math.sin(omega * dt);\n		s.value = s.target + decay * (x * cos + (v + half * x) / omega * sin);\n		s.velocity = decay * (v * cos - (half * v + s.stiffness * x) / omega * sin);\n	}\n}\nfunction tick(time) {\n	frame = 0;\n	const dt = Math.min(.1, Math.max(0, (time - last) / 1e3));\n	last = time;\n	for (const s of moving) {\n		advance(s, dt);\n		if (Math.abs(s.value - s.target) < 1e-4 && Math.abs(s.velocity) < .001) {\n			s.value = s.target;\n			s.velocity = 0;\n			moving.delete(s);\n		}\n		s.paint(s.value);\n	}\n	if (moving.size) frame = requestAnimationFrame(tick);\n}\nfunction prefersReducedMotion() {\n	return matchMedia("(prefers-reduced-motion: reduce)").matches;\n}\nfunction createSpring(value, stiffness, damping, paint) {\n	const s = {\n		value,\n		target: value,\n		velocity: 0,\n		stiffness,\n		damping,\n		paint\n	};\n	return {\n		paint: () => paint(s.value),\n		set(target, instant = false) {\n			s.target = target;\n			if (instant || document.hidden || prefersReducedMotion()) {\n				s.value = target;\n				s.velocity = 0;\n				moving.delete(s);\n				paint(target);\n				return;\n			}\n			moving.add(s);\n			if (!frame) {\n				last = Number(document.timeline?.currentTime ?? performance.now());\n				frame = requestAnimationFrame(tick);\n			}\n		},\n		tune(nextStiffness, nextDamping) {\n			s.stiffness = nextStiffness;\n			s.damping = nextDamping;\n		},\n		stop: () => {\n			moving.delete(s);\n		}\n	};\n}\n// src/internal/press.ts\nconst POINTER = {\n	grow: 6,\n	press: [417.6, 29.2],\n	release: [230, 23.7]\n};\nconst TOUCH = {\n	grow: 15,\n	press: [515, 27.3],\n	release: [250, 11.8]\n};\nfunction usePress(ref) {\n	useEffect(() => {\n		const el = ref.current;\n		if (!el) return;\n		const value = [\n			1,\n			1,\n			0,\n			0\n		];\n		const paint = () => {\n			el.style.scale = `${value[0]} ${value[1]}`;\n			el.style.translate = `${value[2]}px ${value[3]}px`;\n		};\n		const springs = value.map((initial, i) => createSpring(initial, ...POINTER.release, (next) => {\n			value[i] = next;\n			paint();\n		}));\n		let pointer = null;\n		const target = (next, [stiffness, damping]) => {\n			springs.forEach((spring, i) => {\n				spring.tune(stiffness, damping);\n				spring.set(next[i] ?? 0);\n			});\n		};\n		const track = (event) => {\n			if (!pointer) return;\n			const { box, feel } = pointer;\n			el.style.setProperty("--lg-x", `${(event.clientX - box.left) / box.width * 100}%`);\n			el.style.setProperty("--lg-y", `${(event.clientY - box.top) / box.height * 100}%`);\n			const { width, height } = box;\n			const base = 1 + feel.grow / Math.max(width, height);\n			const aspect = width / height;\n			const dx = (event.clientX - pointer.x) / aspect;\n			const dy = event.clientY - pointer.y;\n			const length = Math.hypot(dx, dy);\n			if (!length) return target([\n				base,\n				base,\n				0,\n				0\n			], feel.press);\n			const nx = dx / length;\n			const ny = dy / length;\n			const rubber = 1 - 1 / (1 + length / height / (5 * aspect));\n			const stretch = 1 + 6 / height * rubber * Math.abs(Math.abs(nx) - Math.abs(ny));\n			const horizontal = Math.abs(nx) > Math.abs(ny);\n			target([\n				base * (horizontal ? stretch : 1 / stretch),\n				base * (horizontal ? 1 / stretch : stretch),\n				nx * 8 * rubber,\n				ny * 8 * rubber\n			], feel.press);\n		};\n		const move = (event) => {\n			if (event.pointerId === pointer?.id) track(event);\n		};\n		const end = (event) => {\n			if (event && event.pointerId !== pointer?.id) return;\n			const feel = pointer?.feel ?? POINTER;\n			pointer = null;\n			delete el.dataset.pressed;\n			window.removeEventListener("pointermove", move);\n			window.removeEventListener("pointerup", end);\n			window.removeEventListener("pointercancel", end);\n			target([\n				1,\n				1,\n				0,\n				0\n			], feel.release);\n		};\n		const down = (event) => {\n			if (!event.isPrimary || event.button !== 0 || pointer || el.matches(":disabled")) return;\n			pointer = {\n				id: event.pointerId,\n				x: event.clientX,\n				y: event.clientY,\n				box: el.getBoundingClientRect(),\n				feel: event.pointerType === "mouse" ? POINTER : TOUCH\n			};\n			el.dataset.pressed = "";\n			window.addEventListener("pointermove", move);\n			window.addEventListener("pointerup", end);\n			window.addEventListener("pointercancel", end);\n			track(event);\n		};\n		const reset = () => end();\n		el.addEventListener("pointerdown", down);\n		window.addEventListener("blur", reset);\n		return () => {\n			end();\n			springs.forEach((spring) => spring.stop());\n			el.removeEventListener("pointerdown", down);\n			window.removeEventListener("blur", reset);\n			el.style.removeProperty("scale");\n			el.style.removeProperty("translate");\n		};\n	}, [ref]);\n}\n// src/internal/svg.ts\nconst SVG = "http://www.w3.org/2000/svg";\nlet defs;\nfunction svg(name, attributes) {\n	const element = document.createElementNS(SVG, name);\n	for (const [key, value] of Object.entries(attributes)) element.setAttribute(key, String(value));\n	return element;\n}\n/** The page\'s one hidden `<defs>`, where every filter lives. */\nfunction container() {\n	if (defs?.isConnected) return defs;\n	const root = svg("svg", {\n		width: 0,\n		height: 0,\n		"aria-hidden": "true"\n	});\n	root.style.cssText = "position:absolute;pointer-events:none";\n	defs = svg("defs", {});\n	root.append(defs);\n	document.body.append(root);\n	return defs;\n}\n// src/internal/lens.ts\nconst DARK = {\n	angle: 45,\n	glow: .4,\n	spread: .5,\n	glowPower: 1.5,\n	edge: .5,\n	edgeWidth: 2,\n	edgePower: 1.5\n};\nconst LIGHT = {\n	angle: 30,\n	glow: .4,\n	spread: .5,\n	glowPower: 2,\n	edge: .5,\n	edgeWidth: 1.5,\n	edgePower: 1\n};\nconst clamp$3 = (value, min, max) => Math.min(max, Math.max(min, value));\nconst erf = (x) => Math.tanh(1.7724538509 * x);\nfunction distance(x, y, halfWidth, halfHeight, radius) {\n	const qx = Math.abs(x) - halfWidth + radius;\n	const qy = Math.abs(y) - halfHeight + radius;\n	return Math.hypot(Math.max(qx, 0), Math.max(qy, 0)) + Math.min(Math.max(qx, qy), 0) - radius;\n}\nfunction arc(sag, half) {\n	const radius = (half * half + sag * sag) / (2 * sag);\n	let sum = 0;\n	for (let i = 0; i <= 200; i++) {\n		const x = i / 200 * half;\n		const slope = x / Math.sqrt(radius * radius - x * x);\n		sum += i === 0 || i === 200 ? slope / 2 : slope;\n	}\n	const mean = sum / 200;\n	return {\n		radius,\n		scale: mean > 0 ? .5 / mean : 1\n	};\n}\nconst slope = (x, { radius, scale }) => {\n	const inside = Math.min(x, .999 * radius);\n	return inside / Math.sqrt(radius * radius - inside * inside) * scale;\n};\n/**\n* Draws a lens\'s map, after Aave\'s: within a band about `depth` wide around\n* the rim, each point shows content from further in, by the slope of a\n* shallow dome there, and the rest is left as it is. The light is a glow\n* along the light\'s axis and a thin lit edge. Its alpha fades out where the\n* bend does, so the middle shows the content exactly: a displacement map\n* can\'t hold "none" exactly in a byte, and WebKit, which stretches the map\n* across a long box, would otherwise shift the middle by a pixel.\n*/\nfunction lensMap(shape, options, light, density) {\n	const { width, height } = shape;\n	const halfWidth = width / 2;\n	const halfHeight = height / 2;\n	const radius = clamp$3(shape.radius, 0, Math.min(halfWidth, halfHeight));\n	const columns = Math.max(1, Math.round(width * density));\n	const rows = Math.max(1, Math.round(height * density));\n	const pullAcross = new Uint8ClampedArray(columns * rows * 4);\n	const pullDown = new Uint8ClampedArray(columns * rows * 4);\n	const caught = new Uint8ClampedArray(columns * rows * 4);\n	const shapeMask = new Uint8ClampedArray(columns * rows * 4);\n	const grey = (data, i, value, alpha = 255) => {\n		data[i] = data[i + 1] = data[i + 2] = value;\n		data[i + 3] = alpha;\n	};\n	const share = options.relative ? Math.min(width, height) : 1;\n	const depth = options.depth * share;\n	const dome = options.dome * share;\n	const { splay } = options;\n	const innerWidth = Math.max(0, halfWidth - depth);\n	const innerHeight = Math.max(0, halfHeight - depth);\n	const innerRadius = clamp$3(radius, 0, Math.min(innerWidth, innerHeight));\n	const ramp = depth > 0 ? 1 / (depth * Math.SQRT2) : 1e6;\n	const sag = Math.max(.01, Math.min(dome, Math.min(halfWidth, halfHeight) - 1));\n	const across = dome > 0 ? arc(sag, halfWidth) : null;\n	const down = dome > 0 ? arc(sag, halfHeight) : null;\n	const reach = .5 * Math.min(halfWidth, halfHeight);\n	const cos = Math.cos(light.angle * Math.PI / 180);\n	const sin = Math.sin(light.angle * Math.PI / 180);\n	const glowStart = (1 - light.spread) * Math.SQRT2;\n	const glowRange = light.spread * Math.SQRT2;\n	for (let row = 0; row < rows; row++) for (let column = 0; column < columns; column++) {\n		const i = (row * columns + column) * 4;\n		const x = (column + .5) / columns * width - halfWidth;\n		const y = (row + .5) / rows * height - halfHeight;\n		const edge = distance(x, y, halfWidth, halfHeight, radius);\n		const inside = Math.round(255 * clamp$3(-edge, 0, 1));\n		grey(shapeMask, i, 0, inside);\n		if (edge >= 0) {\n			grey(pullAcross, i, 128);\n			grey(pullDown, i, 128);\n			grey(caught, i, 128, 0);\n			continue;\n		}\n		const ax = Math.abs(x);\n		const ay = Math.abs(y);\n		let dx = across ? Math.sign(x) * slope(ax, across) : clamp$3(x / halfWidth, -1, 1);\n		let dy = down ? Math.sign(y) * slope(ay, down) : clamp$3(y / halfHeight, -1, 1);\n		if (splay < 1 && reach > 0) {\n			const keepX = Math.max(0, 1 - (halfHeight - ay) / reach) * (1 - splay);\n			const keepY = Math.max(0, 1 - (halfWidth - ax) / reach) * (1 - splay);\n			if (keepX > .001 || keepY > .001) {\n				const before = Math.hypot(dx, dy);\n				dx *= 1 - keepX;\n				dy *= 1 - keepY;\n				const after = Math.hypot(dx, dy);\n				if (after > .001) {\n					dx *= before / after;\n					dy *= before / after;\n				}\n			}\n		}\n		const falloff = .5 * (1 + erf(distance(x, y, innerWidth, innerHeight, innerRadius) * ramp));\n		grey(shapeMask, i, Math.round(255 * falloff), inside);\n		grey(pullAcross, i, Math.round((.5 - .5 * dx * falloff) * 255));\n		grey(pullDown, i, Math.round((.5 - .5 * dy * falloff) * 255));\n		const facing = Math.abs(clamp$3(x / halfWidth, -1, 1) * cos + clamp$3(y / halfHeight, -1, 1) * sin);\n		const glow = glowRange > .001 ? light.glow * clamp$3((facing - glowStart) / glowRange, 0, 1) ** light.glowPower * falloff : 0;\n		const rim = light.edge * Math.max(0, 1 + edge / light.edgeWidth) * facing ** light.edgePower;\n		const amount = Math.min(1, glow + rim);\n		const bends = Math.min(1, falloff * 20, -edge);\n		grey(caught, i, Math.round(127 * amount + 128), Math.round(255 * bends));\n	}\n	return {\n		columns,\n		rows,\n		across: pullAcross,\n		down: pullDown,\n		light: caught,\n		shape: shapeMask\n	};\n}\nconst encoded = /* @__PURE__ */ new Map();\nfunction encode(key, draw) {\n	const cached = encoded.get(key);\n	if (cached) return cached;\n	const map = draw();\n	const canvas = document.createElement("canvas");\n	canvas.width = map.columns;\n	canvas.height = map.rows;\n	const context = canvas.getContext("2d");\n	if (!context) return null;\n	const image = context.createImageData(map.columns, map.rows);\n	const png = (data) => {\n		image.data.set(data);\n		context.putImageData(image, 0, 0);\n		return canvas.toDataURL();\n	};\n	const result = {\n		across: png(map.across),\n		down: png(map.down),\n		light: png(map.light),\n		shape: png(map.shape)\n	};\n	encoded.set(key, result);\n	return result;\n}\n/** WebKit needs filters in bounding-box units. */\nconst boxUnits = () => /AppleWebKit\\//.test(navigator.userAgent) && !/Chrom(?:e|ium)\\//.test(navigator.userAgent);\nconst CHANNELS = [\n	"1 0 0 0 0  0 0 0 0 0  0 0 0 0 0",\n	"0 0 0 0 0  0 1 0 0 0  0 0 0 0 0",\n	"0 0 0 0 0  0 0 0 0 0  0 0 1 0 0"\n];\nconst matrix = (input, values, result) => svg("feColorMatrix", {\n	in: input,\n	type: "matrix",\n	values,\n	result\n});\nconst sum = (a, b, k2, k3, result) => svg("feComposite", {\n	in: a,\n	in2: b,\n	operator: "arithmetic",\n	k2,\n	k3,\n	result\n});\nfunction spread(k) {\n	return [\n		...CHANNELS.map((channel, i) => matrix(`ray-${k}-${i}`, `${channel}  0 0 0 0.3333 0`, `light-${k}-${i}`)),\n		sum(`light-${k}-0`, `light-${k}-1`, 1, 1, `light-${k}-01`),\n		sum(`light-${k}-01`, `light-${k}-2`, 1, 1, `spread-${k}`),\n		matrix(`spread-${k}`, "3 0 0 0 0  0 3 0 0 0  0 0 3 0 0  0 0 0 1 0", `bent-${k}`)\n	];\n}\nfunction inked(k, page) {\n	const white = page === "light" ? 1 : 0;\n	const steps = [];\n	const own = (i) => [\n		0,\n		1,\n		2\n	].map((r) => r === i ? `${[\n		0,\n		1,\n		2\n	].map((c) => c === i ? white ? -1 : 1 : 0).join(" ")} 0 ${white}` : "0 0 0 0 0").join("  ") + "  0 0 0 1 0";\n	CHANNELS.forEach((_, i) => {\n		const ray = `ray-${k}-${i}`;\n		steps.push(matrix(ray, "0 0 0 1 0  0 0 0 1 0  0 0 0 1 0  0 0 0 0 1", `cover-${k}-${i}`), matrix(ray, "0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0", `covers-${k}-${i}`), matrix(ray, own(i), `inks-${k}-${i}`));\n	});\n	steps.push(svg("feBlend", {\n		in: `cover-${k}-0`,\n		in2: `cover-${k}-1`,\n		mode: "lighten",\n		result: `most-${k}-01`\n	}), svg("feBlend", {\n		in: `most-${k}-01`,\n		in2: `cover-${k}-2`,\n		mode: "lighten",\n		result: `most-${k}`\n	}), matrix(`most-${k}`, `0 0 0 0 ${white}  0 0 0 0 ${white}  0 0 0 0 ${white}  1 0 0 0 0`, `inked-${k}`));\n	let at = `inked-${k}`;\n	CHANNELS.forEach((_, i) => {\n		const [gain, loss] = white ? [`covers-${k}-${i}`, `inks-${k}-${i}`] : [`inks-${k}-${i}`, `covers-${k}-${i}`];\n		steps.push(sum(at, gain, i === 0 ? .5 : 1, .5, `inked-${k}-${i}a`), sum(`inked-${k}-${i}a`, loss, 1, -.5, `inked-${k}-${i}b`));\n		at = `inked-${k}-${i}b`;\n	});\n	const double = svg("feComponentTransfer", {\n		in: at,\n		result: `bent-${k}`\n	});\n	double.append(svg("feFuncA", {\n		type: "linear",\n		slope: 2,\n		intercept: 0\n	}));\n	steps.push(double);\n	return steps;\n}\nfunction graph(lenses, box, standIn) {\n	const unit = box ? "objectBoundingBox" : "userSpaceOnUse";\n	const filter = svg("filter", {\n		filterUnits: unit,\n		primitiveUnits: unit,\n		"color-interpolation-filters": "sRGB"\n	});\n	if (box) for (const [key, value] of Object.entries({\n		x: 0,\n		y: 0,\n		width: 1,\n		height: 1\n	})) filter.setAttribute(key, String(value));\n	const single = lenses.length === 1;\n	const parts = lenses.map(({ maps, shine, blur, ink }, k) => {\n		const merged = (name) => single ? name : `${name}-${k}`;\n		const image = (href, result) => svg("feImage", {\n			href,\n			preserveAspectRatio: "none",\n			result\n		});\n		const boxed = [\n			image(maps.across, `across-${k}`),\n			image(maps.down, `down-${k}`),\n			image(maps.light, merged("raw")),\n			svg("feFlood", {\n				"flood-color": "rgb(128, 128, 128)",\n				result: `neutral-${k}`\n			})\n		];\n		if (standIn) boxed.push(image(maps.shape, merged("shape")));\n		filter.append(...boxed);\n		for (const pull of ["across", "down"]) {\n			const half = svg("feComponentTransfer", {\n				in: `${pull}-grey-${k}`,\n				result: `${pull}-pull-${k}`\n			});\n			half.append(svg("feFuncA", {\n				type: "linear",\n				slope: 0,\n				intercept: .5\n			}));\n			filter.append(svg("feComposite", {\n				in: `${pull}-${k}`,\n				in2: `neutral-${k}`,\n				operator: "over",\n				result: `${pull}-grey-${k}`\n			}), half);\n		}\n		const rays = CHANNELS.map((_, i) => {\n			const across = svg("feDisplacementMap", {\n				in: "SourceGraphic",\n				in2: `across-pull-${k}`,\n				xChannelSelector: "R",\n				yChannelSelector: "A",\n				result: `across-${k}-${i}`\n			});\n			const down = svg("feDisplacementMap", {\n				in: `across-${k}-${i}`,\n				in2: `down-pull-${k}`,\n				xChannelSelector: "A",\n				yChannelSelector: "R",\n				result: `ray-${k}-${i}`\n			});\n			boxed.push(across);\n			filter.append(across, down);\n			return [across, down];\n		});\n		filter.append(...ink ? inked(k, ink) : spread(k));\n		let soften;\n		if (blur) {\n			soften = svg("feGaussianBlur", {\n				in: `bent-${k}`,\n				result: `soft-${k}`\n			});\n			const weight = image(maps.shape, `weight-${k}`);\n			boxed.push(weight);\n			filter.append(weight, svg("feColorMatrix", {\n				in: `weight-${k}`,\n				type: "matrix",\n				values: "0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  1 0 0 0 0",\n				result: `bends-${k}`\n			}), soften, svg("feComposite", {\n				in: `soft-${k}`,\n				in2: `bends-${k}`,\n				operator: "in",\n				result: `soft-in-${k}`\n			}), svg("feComposite", {\n				in: `bent-${k}`,\n				in2: `bends-${k}`,\n				operator: "out",\n				result: `sharp-${k}`\n			}), svg("feComposite", {\n				in: `soft-in-${k}`,\n				in2: `sharp-${k}`,\n				operator: "arithmetic",\n				k2: 1,\n				k3: 1,\n				result: `softened-${k}`\n			}));\n		}\n		const bent = blur ? `softened-${k}` : `bent-${k}`;\n		let lit = bent;\n		if (shine > 0) {\n			const white = `0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 1 0 ${-128 / 255}`;\n			filter.append(svg("feColorMatrix", {\n				in: merged("raw"),\n				type: "matrix",\n				values: white,\n				result: `glint-${k}`\n			}), svg("feComposite", {\n				in: `glint-${k}`,\n				in2: bent,\n				operator: "arithmetic",\n				k2: shine,\n				k3: 1,\n				result: `lit-${k}`\n			}));\n			lit = `lit-${k}`;\n		} else if (shine < 0) {\n			const row = `0 0 ${shine} 0 ${1 - 128 * shine / 255}`;\n			filter.append(svg("feColorMatrix", {\n				in: merged("raw"),\n				type: "matrix",\n				values: `${row}  ${row}  ${row}  0 0 0 0 1`,\n				result: `shade-${k}`\n			}), svg("feComposite", {\n				in: `shade-${k}`,\n				in2: bent,\n				operator: "arithmetic",\n				k1: 1,\n				result: `lit-${k}`\n			}));\n			lit = `lit-${k}`;\n		}\n		filter.append(svg("feComposite", {\n			in: lit,\n			in2: merged("raw"),\n			operator: "in",\n			result: merged("inside")\n		}));\n		return {\n			boxed,\n			rays,\n			soften\n		};\n	});\n	if (!single) for (const name of [\n		"raw",\n		"inside",\n		...standIn ? ["shape"] : []\n	]) {\n		const merge = svg("feMerge", { result: name });\n		lenses.forEach((_, k) => merge.append(svg("feMergeNode", { in: `${name}-${k}` })));\n		filter.append(merge);\n	}\n	filter.append(svg("feComposite", {\n		in: "SourceGraphic",\n		in2: "raw",\n		operator: "out",\n		result: "outside"\n	}), svg("feComposite", {\n		in: "inside",\n		in2: "outside",\n		operator: "arithmetic",\n		k2: 1,\n		k3: 1,\n		result: "seen"\n	}));\n	if (standIn) filter.append(svg("feComposite", {\n		in: "seen",\n		in2: "shape",\n		operator: "in"\n	}));\n	return {\n		filter,\n		parts\n	};\n}\nfunction place(graph, placed, across, down, box) {\n	if (!box) for (const [key, value] of Object.entries({\n		x: 0,\n		y: 0,\n		width: across,\n		height: down\n	})) graph.filter.setAttribute(key, String(value));\n	placed.forEach((lens, k) => {\n		const part = graph.parts[k];\n		const spectrum = [\n			1 + .2 * lens.dispersion,\n			1 + .1 * lens.dispersion,\n			1\n		];\n		part.rays.forEach(([pullAcross, pullDown], i) => {\n			pullAcross.setAttribute("scale", String((box ? lens.reach / across : lens.reach) * spectrum[i]));\n			pullDown.setAttribute("scale", String((box ? lens.reach / down : lens.reach) * spectrum[i]));\n		});\n		const blur = Math.max(lens.blur, .01);\n		part.soften?.setAttribute("stdDeviation", box ? `${blur / across} ${blur / down}` : String(blur));\n		const rect = box ? {\n			x: lens.x / across,\n			y: lens.y / down,\n			width: lens.width / across,\n			height: lens.height / down\n		} : {\n			x: lens.x,\n			y: lens.y,\n			width: lens.width,\n			height: lens.height\n		};\n		for (const element of part.boxed) for (const [key, value] of Object.entries(rect)) element.setAttribute(key, String(value));\n	});\n}\n/** The glass\'s size and corner radius, in px, or null while it has no size. */\nfunction shapeOf(glass, style = getComputedStyle(glass)) {\n	const width = glass.offsetWidth;\n	const height = glass.offsetHeight;\n	if (!width || !height) return null;\n	const corner = style.borderTopLeftRadius;\n	return {\n		width,\n		height,\n		radius: Math.min(width / 2, height / 2, corner.endsWith("%") ? Math.min(width, height) * parseFloat(corner) / 100 : parseFloat(corner) || 0)\n	};\n}\nfunction fit(glass, options) {\n	const style = getComputedStyle(glass);\n	const shape = shapeOf(glass, style);\n	if (!shape) return null;\n	const { width, height, radius } = shape;\n	const page = parseFloat(style.getPropertyValue("--lg-lens-shine")) || 0;\n	const shine = options.paintsLight ? 0 : options.shine === void 0 ? page : Math.sign(page) * options.shine;\n	const tuned = options.strengthProperty ? parseFloat(style.getPropertyValue(options.strengthProperty)) : NaN;\n	const own = page > 0 ? options.darkStrength ?? options.strength : options.strength;\n	const strength = Number.isFinite(tuned) ? tuned : own;\n	const split = options.dispersionProperty ? parseFloat(style.getPropertyValue(options.dispersionProperty)) : NaN;\n	const dispersion = Number.isFinite(split) ? Math.max(0, split) : options.dispersion;\n	const density = Math.min(devicePixelRatio || 1, 2);\n	const theme = page < 0 && !options.paintsLight ? LIGHT : DARK;\n	const light = options.edgeWidth === void 0 ? theme : {\n		...theme,\n		edgeWidth: options.edgeWidth\n	};\n	const key = [\n		width,\n		height,\n		radius,\n		density,\n		JSON.stringify(light),\n		JSON.stringify(options)\n	].join("|");\n	const maps = encode(key, () => lensMap(shape, options, light, density));\n	const blur = options.blur ?? 0;\n	const ink = options.ink ? page < 0 ? "light" : "dark" : void 0;\n	return maps ? {\n		maps,\n		key: `${key}|${shine}|${ink}`,\n		shine,\n		ink,\n		blur,\n		strength,\n		dispersion,\n		width,\n		height\n	} : null;\n}\nconst surfaces = /* @__PURE__ */ new Map();\nlet made = 0;\nfunction render(surface) {\n	const { content } = surface;\n	const across = content.offsetWidth;\n	const down = content.offsetHeight;\n	const from = content.getBoundingClientRect();\n	const shown = [];\n	if (across && down) {\n		const unit = from.width / across || 1;\n		for (const member of surface.members) {\n			const at = member.glass.getBoundingClientRect();\n			if (!member.fit || !at.width || !at.height) continue;\n			const width = at.width / unit;\n			const height = at.height / unit;\n			const reach = member.fit.strength * Math.min(width, height) * member.amount;\n			const { dispersion } = member.fit;\n			const blur = member.fit.blur * member.amount;\n			member.placed = {\n				x: (at.left - from.left) / unit,\n				y: (at.top - from.top) / unit,\n				width,\n				height,\n				reach,\n				dispersion,\n				blur\n			};\n			shown.push(member);\n		}\n	}\n	if (!shown.length) {\n		surface.placed = "";\n		content.style.removeProperty("filter");\n		if (surface.standIn) content.style.removeProperty("visibility");\n		surface.standIn = false;\n		return;\n	}\n	const box = boxUnits();\n	const standIn = shown.some((member) => member.replaces);\n	surface.standIn = standIn;\n	const structure = shown.map((member) => member.fit.key).join("\\n") + (standIn ? "\\nstand-in" : "");\n	if (structure !== surface.built || !surface.graph) {\n		surface.graph?.filter.remove();\n		surface.graph = graph(shown.map((member) => member.fit), box, standIn);\n		container().append(surface.graph.filter);\n		surface.built = structure;\n		surface.placed = "";\n	}\n	const placed = shown.map((member) => member.placed);\n	const next = [\n		across,\n		down,\n		...placed.flatMap(({ x, y, width, height, reach, dispersion, blur }) => [\n			x,\n			y,\n			width,\n			height,\n			reach,\n			dispersion,\n			blur\n		])\n	].map((value) => value.toFixed(2)).join(" ");\n	if (next === surface.placed) return;\n	surface.placed = next;\n	place(surface.graph, placed, across, down, box);\n	surface.graph.filter.id = `${surface.name}-${++surface.version}`;\n	content.style.filter = `url("#${surface.graph.filter.id}")`;\n	for (const member of shown) {\n		if (!member.replaces) continue;\n		content.style.visibility = "visible";\n		const { x, y, width, height } = member.placed;\n		const behind = member.replaces.getBoundingClientRect();\n		const unit = from.width / across || 1;\n		mask(member.replaces, {\n			image: `url("${member.fit.maps.shape}"), linear-gradient(#000, #000)`,\n			position: `${x + (from.left - behind.left) / unit}px ${y + (from.top - behind.top) / unit}px, 0 0`,\n			size: `${width}px ${height}px, 100% 100%`\n		});\n	}\n}\nconst MASKING = [\n	"image",\n	"position",\n	"size",\n	"repeat",\n	"composite"\n];\nfunction mask(element, layers) {\n	for (const part of MASKING) {\n		element.style.removeProperty(`-webkit-mask-${part}`);\n		element.style.removeProperty(`mask-${part}`);\n	}\n	if (!layers) return;\n	const values = {\n		...layers,\n		repeat: "no-repeat",\n		composite: "exclude"\n	};\n	for (const part of MASKING) {\n		element.style.setProperty(`-webkit-mask-${part}`, part === "composite" ? "xor" : values[part]);\n		element.style.setProperty(`mask-${part}`, values[part]);\n	}\n}\n/**\n* Makes `glass` a lens over `content`, which must have room for the whole\n* lens. Given `replaces`, the content is a stand-in for it under the glass:\n* the content is shown only within the lens (keep it hidden otherwise), and\n* `replaces` is hidden there. Unless the glass paints its own light, the\n* glass\'s `--lg-lens-shine` sets the light on its rim: above 0 it brightens,\n* below 0 it darkens, as on a light page. Both it and the strength property\n* are read each time the lens becomes active or is refitted.\n*/\nfunction createLens(glass, content, options, replaces) {\n	let surface = surfaces.get(content);\n	if (!surface) {\n		surface = {\n			content,\n			lenses: 0,\n			members: [],\n			name: `glisse-lens-${made++}`,\n			standIn: false,\n			built: "",\n			placed: "",\n			version: 0\n		};\n		surfaces.set(content, surface);\n	}\n	const shared = surface;\n	shared.lenses++;\n	const member = {\n		glass,\n		options,\n		replaces,\n		amount: 1\n	};\n	let active = false;\n	const prepare = () => {\n		member.fit = fit(glass, options) ?? void 0;\n	};\n	const lens = {\n		setActive(next) {\n			if (next === active) return;\n			active = next;\n			if (active) {\n				shared.members.push(member);\n				prepare();\n			} else {\n				shared.members.splice(shared.members.indexOf(member), 1);\n				if (replaces) mask(replaces);\n			}\n			render(shared);\n		},\n		update(amount) {\n			if (amount !== void 0) member.amount = clamp$3(amount, 0, 1);\n			if (active) render(shared);\n		},\n		refit() {\n			if (!active) return;\n			prepare();\n			render(shared);\n		},\n		destroy() {\n			lens.setActive(false);\n			if (--shared.lenses > 0) return;\n			shared.graph?.filter.remove();\n			surfaces.delete(content);\n		}\n	};\n	return lens;\n}\n/**\n* Bends the glass\'s backdrop with the same lens, unlit, as the glass bends\n* content of its own: a filter of its own, set as `--lg-filter` for its\n* `backdrop-filter`, rescaled as its bend grows. Its maps are those of the\n* glass\'s other lenses with the same options, so cost nothing more.\n*/\nfunction createBackdropLens(glass, options) {\n	const name = `glisse-bend-${made++}`;\n	let fitted = null;\n	let built = null;\n	let key = "";\n	let amount = 0;\n	let version = 0;\n	const draw = () => {\n		if (!fitted || !built) return;\n		const { width, height, strength, dispersion, blur } = fitted;\n		const reach = strength * Math.min(width, height) * amount;\n		place(built, [{\n			x: 0,\n			y: 0,\n			width,\n			height,\n			reach,\n			dispersion,\n			blur: blur * amount\n		}], width, height, false);\n		built.filter.id = `${name}-${++version}`;\n		glass.style.setProperty("--lg-filter", `url("#${built.filter.id}")`);\n	};\n	return {\n		update(next) {\n			next = Math.round(clamp$3(next, 0, 1) * 20) / 20;\n			if (next === amount) return;\n			amount = next;\n			draw();\n		},\n		refit() {\n			fitted = fit(glass, options);\n			if (!fitted) return;\n			if (fitted.key !== key) {\n				built?.filter.remove();\n				built = graph([{\n					maps: fitted.maps,\n					shine: 0,\n					blur: fitted.blur\n				}], false, false);\n				container().append(built.filter);\n				key = fitted.key;\n			}\n			draw();\n		},\n		destroy() {\n			built?.filter.remove();\n			built = null;\n			glass.style.removeProperty("--lg-filter");\n		}\n	};\n}\nconst backdrops = /* @__PURE__ */ new Map();\n/**\n* Fits glass that bends its own backdrop, as only Chromium can: a lens\'s\n* filter drawn for the glass\'s box, set as `--lg-filter` for its\n* `backdrop-filter`.\n*/\nfunction fitBackdropLens(glass, options) {\n	const fitted = fit(glass, options);\n	if (!fitted) return;\n	const { maps, key, shine, strength, dispersion, width, height } = fitted;\n	const reach = strength * Math.min(width, height);\n	const id = `${key}|${reach}|${dispersion}`;\n	let name = backdrops.get(id);\n	if (!name) {\n		const built = graph([{\n			maps,\n			shine\n		}], false, false);\n		place(built, [{\n			x: 0,\n			y: 0,\n			width,\n			height,\n			reach,\n			dispersion,\n			blur: 0\n		}], width, height, false);\n		name = `glisse-backdrop-${backdrops.size}`;\n		built.filter.id = name;\n		container().append(built.filter);\n		backdrops.set(id, name);\n	}\n	glass.style.setProperty("--lg-filter", `url("#${name}") saturate(1.5)`);\n}\n// src/internal/refraction.ts\nconst GLASS = {\n	strength: .45,\n	strengthProperty: "--lg-glass-bend",\n	dispersion: .4,\n	dispersionProperty: "--lg-glass-dispersion",\n	depth: .25,\n	dome: .5,\n	splay: 1,\n	relative: true,\n	paintsLight: true\n};\nconst clamp$2 = (value, min, max) => Math.min(max, Math.max(min, value));\nconst RIM_WIDTH = 1.22;\nconst EDGE_WIDTH = .5;\n/** The rim\'s light, white, over its edge line, at `density` pixels to the px. */\nfunction rimMap({ width, height, radius }, shine, density, edge = [\n	0,\n	0,\n	0,\n	0\n]) {\n	const columns = Math.max(1, Math.round(width * density));\n	const rows = Math.max(1, Math.round(height * density));\n	const data = new Uint8ClampedArray(columns * rows * 4);\n	const halfWidth = width / 2;\n	const halfHeight = height / 2;\n	const corner = clamp$2(radius, 0, Math.min(halfWidth, halfHeight));\n	const half = .5 / density;\n	for (let row = 0; row < rows; row++) for (let column = 0; column < columns; column++) {\n		const x = (column + .5) / columns * width - halfWidth;\n		const y = (row + .5) / rows * height - halfHeight;\n		const depth = -distance(x, y, halfWidth, halfHeight, corner);\n		if (depth < -half || depth > 2 * RIM_WIDTH) continue;\n		const qx = Math.abs(x) - halfWidth + corner;\n		const qy = Math.abs(y) - halfHeight + corner;\n		let nx = 0;\n		let ny = 0;\n		if (qx > 0 && qy > 0) {\n			const length = Math.hypot(qx, qy);\n			nx = Math.sign(x) * qx / length;\n			ny = Math.sign(y) * qy / length;\n		} else if (qx > qy) nx = Math.sign(x);\n		else ny = Math.sign(y);\n		const facing = Math.abs(nx + ny);\n		const along = Math.max(0, depth) / (RIM_WIDTH * Math.sqrt(Math.max(1, facing)));\n		const cover = clamp$2((depth + half) * density, 0, 1);\n		const lined = clamp$2((Math.min(EDGE_WIDTH, depth + half) - Math.max(0, depth - half)) * density, 0, 1);\n		const light = along < 1 ? shine * Math.min(1, facing) ** 1.5 * (1 - along ** 1.5) * cover : 0;\n		const line = edge[3] * lined * (1 - light);\n		const alpha = light + line;\n		if (alpha <= 0) continue;\n		const i = (row * columns + column) * 4;\n		for (let channel = 0; channel < 3; channel++) data[i + channel] = Math.round((255 * light + edge[channel] * line) / alpha);\n		data[i + 3] = Math.round(255 * alpha);\n	}\n	return {\n		columns,\n		rows,\n		data\n	};\n}\nfunction parseColour(context, colour) {\n	context.fillStyle = "#0000";\n	context.fillStyle = colour;\n	const value = String(context.fillStyle);\n	if (value.startsWith("#")) {\n		const [r, g, b] = [\n			1,\n			3,\n			5\n		].map((at) => parseInt(value.slice(at, at + 2), 16));\n		return [\n			r,\n			g,\n			b,\n			1\n		];\n	}\n	const [r = 0, g = 0, b = 0, a = 1] = (value.match(/[\\d.]+/g) ?? []).map(Number);\n	return [\n		r,\n		g,\n		b,\n		a\n	];\n}\nconst rims = /* @__PURE__ */ new Map();\nlet palette;\nfunction paintRim(element) {\n	const style = getComputedStyle(element);\n	const shape = shapeOf(element, style);\n	palette ??= document.createElement("canvas").getContext("2d");\n	if (!shape || !palette) return;\n	const tuned = parseFloat(style.getPropertyValue("--lg-rim-shine"));\n	const shine = Number.isFinite(tuned) ? clamp$2(tuned, 0, 1) : .13;\n	const edge = parseColour(palette, style.getPropertyValue("--lg-edge").trim() || "transparent");\n	const density = Math.min(devicePixelRatio || 1, 3);\n	const key = [\n		shape.width,\n		shape.height,\n		shape.radius,\n		shine,\n		edge,\n		density\n	].join("|");\n	let url = rims.get(key);\n	if (!url) {\n		const { columns, rows, data } = rimMap(shape, shine, density, edge);\n		const canvas = document.createElement("canvas");\n		canvas.width = columns;\n		canvas.height = rows;\n		const context = canvas.getContext("2d");\n		if (!context) return;\n		const image = context.createImageData(columns, rows);\n		image.data.set(data);\n		context.putImageData(image, 0, 0);\n		url = `url("${canvas.toDataURL()}")`;\n		rims.set(key, url);\n	}\n	element.style.setProperty("--lg-rim", url);\n	element.setAttribute("data-rim", "");\n}\nconst repaints = /* @__PURE__ */ new Set();\nlet unwatch;\nfunction onThemeChange(repaint) {\n	repaints.add(repaint);\n	if (!unwatch) {\n		const run = () => repaints.forEach((each) => each());\n		const observer = new MutationObserver(run);\n		observer.observe(document.documentElement, {\n			attributes: true,\n			attributeFilter: ["data-theme"],\n			subtree: true\n		});\n		const scheme = matchMedia("(prefers-color-scheme: dark)");\n		scheme.addEventListener?.("change", run);\n		unwatch = () => {\n			observer.disconnect();\n			scheme.removeEventListener?.("change", run);\n		};\n	}\n	return () => {\n		repaints.delete(repaint);\n		if (repaints.size) return;\n		unwatch?.();\n		unwatch = void 0;\n	};\n}\nfunction whenIdle(callback) {\n	if ("requestIdleCallback" in window) {\n		const handle = requestIdleCallback(callback, { timeout: 500 });\n		return () => cancelIdleCallback(handle);\n	}\n	const handle = setTimeout(callback, 50);\n	return () => clearTimeout(handle);\n}\nfunction refitting(element, fit, properties) {\n	let cancel;\n	let fitted = false;\n	const observer = new ResizeObserver(() => {\n		cancel?.();\n		cancel = whenIdle(() => {\n			fitted = true;\n			fit();\n		});\n	});\n	observer.observe(element);\n	return {\n		refit: () => {\n			if (fitted) fit();\n		},\n		stop: () => {\n			cancel?.();\n			observer.disconnect();\n			for (const name of properties) element.style.removeProperty(name);\n		}\n	};\n}\n/** Only Chromium applies SVG filters to the live backdrop. */\nconst refractsBackdrop = () => /Chrom(?:e|ium)\\//.test(navigator.userAgent);\nconst MARK = "data-glisse-backdrop";\nfunction visibleBox(element) {\n	let { left, top, right, bottom } = element.getBoundingClientRect();\n	for (let node = element.parentElement; node && node !== document.body; node = node.parentElement) {\n		const style = getComputedStyle(node);\n		if (!/hidden|clip|auto|scroll/.test(`${style.overflow} ${style.overflowX} ${style.overflowY}`)) continue;\n		const clip = node.getBoundingClientRect();\n		left = Math.max(left, clip.left);\n		top = Math.max(top, clip.top);\n		right = Math.min(right, clip.right);\n		bottom = Math.min(bottom, clip.bottom);\n	}\n	return new DOMRect(left, top, Math.max(0, right - left), Math.max(0, bottom - top));\n}\n/** The marked content behind the glass: the closest one whose visible part it overlaps. */\nfunction findBackdrop(element) {\n	const box = element.getBoundingClientRect();\n	const behind = (candidate) => {\n		if (candidate.contains(element) || element.contains(candidate)) return false;\n		const other = visibleBox(candidate);\n		return other.left < box.right && other.right > box.left && other.top < box.bottom && other.bottom > box.top;\n	};\n	for (let node = element.parentElement; node && node !== document.body; node = node.parentElement) {\n		const found = [...node.querySelectorAll(`[${MARK}]`)].find(behind);\n		if (found) return found;\n	}\n	return null;\n}\nconst followed = /* @__PURE__ */ new Map();\nlet following = 0;\nfunction follow() {\n	for (const lenses of followed.values()) lenses.values().next().value?.update();\n	following = followed.size ? requestAnimationFrame(follow) : 0;\n}\nfunction bend(element, source) {\n	const lens = createLens(element, source, GLASS);\n	let started = false;\n	const fitting = refitting(element, () => {\n		paintRim(element);\n		if (started) return lens.refit();\n		started = true;\n		lens.setActive(true);\n		let lenses = followed.get(source);\n		if (!lenses) followed.set(source, lenses = /* @__PURE__ */ new Set());\n		lenses.add(lens);\n		following ||= requestAnimationFrame(follow);\n	}, ["--lg-rim"]);\n	return {\n		refit: fitting.refit,\n		stop: () => {\n			fitting.stop();\n			const lenses = followed.get(source);\n			lenses?.delete(lens);\n			if (lenses && !lenses.size) followed.delete(source);\n			lens.destroy();\n		}\n	};\n}\n/**\n* Bends what\'s behind the element. Content marked `data-glisse-backdrop`\n* behind it is filtered, in every browser, with the glass\'s lens placed\n* where the glass stands. Over anything else, Chromium filters the live\n* backdrop with the same lens, and other browsers keep the frost and the lit\n* rim. `selection` is the tab bar\'s lifted lens, whose own bend is below;\n* with `bendsBackdrop` false it only takes its rims, and bends its backdrop\n* itself.\n*\n* The glass reads its settings (--lg-glass-bend, --lg-glass-dispersion,\n* --lg-rim-shine) when it fits, and again each time it renders, so settings\n* set from React, on it or above it, take effect at once.\n*/\nfunction useRefraction(ref, selection = false, bendsBackdrop = true) {\n	const refit = useRef(null);\n	useEffect(() => {\n		const element = ref.current;\n		if (!element) return;\n		if (selection) return refitting(element, () => fitSelection(element, bendsBackdrop && refractsBackdrop()), bendsBackdrop ? SELECTION_PROPERTIES : SELECTION_PROPERTIES.filter((name) => name !== "--lg-filter")).stop;\n		const source = findBackdrop(element);\n		const fitting = source ? bend(element, source) : refitting(element, () => {\n			paintRim(element);\n			if (refractsBackdrop()) fitBackdropLens(element, GLASS);\n		}, ["--lg-filter", "--lg-rim"]);\n		refit.current = fitting.refit;\n		const stopWatching = onThemeChange(() => paintRim(element));\n		return () => {\n			refit.current = null;\n			stopWatching();\n			fitting.stop();\n			element.removeAttribute("data-rim");\n		};\n	}, [\n		ref,\n		selection,\n		bendsBackdrop\n	]);\n	useEffect(() => refit.current?.());\n}\nconst SELECTION_PROPERTIES = [\n	"--lg-filter",\n	"--lg-rim",\n	"--lg-rim-bright"\n];\nconst selections = /* @__PURE__ */ new Map();\nfunction profile(bezel, thickness) {\n	const samples = /* @__PURE__ */ new Float32Array(128);\n	let maximum = 0;\n	for (let i = 0; i < samples.length; i++) {\n		const t = Math.max(.001, i / (samples.length - 1));\n		const surface = (1 - (1 - t) ** 4) ** .25;\n		const incident = Math.atan((1 - t) ** 3 / surface ** 3);\n		const refracted = Math.asin(Math.sin(incident) / 1.5);\n		samples[i] = Math.tan(incident - refracted) * (thickness + surface * bezel);\n		maximum = Math.max(maximum, samples[i]);\n	}\n	return {\n		samples,\n		maximum\n	};\n}\nfunction selectionMaps(width, height, radius) {\n	const density = Math.min(devicePixelRatio || 1, 2);\n	const bezel = clamp$2(Math.min(width, height) * .12, 4, 10);\n	const { samples, maximum } = profile(bezel, clamp$2(Math.min(width, height) * .2, 8, 24));\n	const canvas = document.createElement("canvas");\n	canvas.width = Math.ceil(width * density);\n	canvas.height = Math.ceil(height * density);\n	const context = canvas.getContext("2d");\n	const field = context.createImageData(canvas.width, canvas.height);\n	const shine = context.createImageData(canvas.width, canvas.height);\n	const bright = context.createImageData(canvas.width, canvas.height);\n	for (let y = 0; y < canvas.height; y++) for (let x = 0; x < canvas.width; x++) {\n		const px = (x + .5) * width / canvas.width - width / 2;\n		const py = (y + .5) * height / canvas.height - height / 2;\n		const qx = Math.abs(px) - (width / 2 - radius);\n		const qy = Math.abs(py) - (height / 2 - radius);\n		const ox = Math.max(qx, 0);\n		const oy = Math.max(qy, 0);\n		const length = Math.hypot(ox, oy);\n		const distance = radius - (length + Math.min(Math.max(qx, qy), 0));\n		const nx = length > 0 ? ox / length * Math.sign(px) : qx > qy ? Math.sign(px) : 0;\n		const ny = length > 0 ? oy / length * Math.sign(py) : qx > qy ? 0 : Math.sign(py);\n		let shift = 0;\n		if (distance >= 0 && distance < bezel) {\n			const sample = distance / bezel * (samples.length - 1);\n			const lower = Math.floor(sample);\n			const a = samples[lower];\n			shift = a + (samples[Math.min(lower + 1, samples.length - 1)] - a) * (sample - lower);\n		}\n		const i = (y * canvas.width + x) * 4;\n		field.data[i] = Math.round(127.5 + nx * shift / maximum * 127.5);\n		field.data[i + 1] = Math.round(127.5 + ny * shift / maximum * 127.5);\n		field.data[i + 2] = 128;\n		field.data[i + 3] = 255;\n		const light = -(nx + ny) * Math.SQRT1_2;\n		const glint = Math.max(light, 0) ** 3;\n		const reflected = Math.max(-light, 0) ** 3;\n		shine.data[i] = shine.data[i + 1] = shine.data[i + 2] = 255;\n		let alpha = 0;\n		if (distance >= 0) {\n			const bands = [\n				.18,\n				.42,\n				.66\n			].map((centre) => Math.exp(-(((distance - centre) / .22) ** 2)));\n			const peak = Math.max(...bands);\n			alpha = peak * (.06 + .8 * glint + .35 * reflected) * .85;\n			for (let channel = 0; channel < 3; channel++) shine.data[i + channel] = Math.round(255 * (.65 + .35 * (peak ? bands[channel] / peak : 0)));\n			const wide = [\n				.4,\n				.5,\n				.6\n			].map((centre) => Math.exp(-(((distance - centre) / .4) ** 2)));\n			const top = Math.max(...wide);\n			for (let channel = 0; channel < 3; channel++) bright.data[i + channel] = Math.round(255 * (.85 + .15 * (top ? wide[channel] / top : 0)));\n			bright.data[i + 3] = Math.round(clamp$2(top * (.55 + .3 * glint + .15 * reflected), 0, 1) * 255);\n		}\n		shine.data[i + 3] = Math.round(clamp$2(alpha, 0, 1) * 255);\n	}\n	context.putImageData(field, 0, 0);\n	const displacement = canvas.toDataURL();\n	context.putImageData(shine, 0, 0);\n	const highlight = canvas.toDataURL();\n	context.putImageData(bright, 0, 0);\n	return {\n		displacement,\n		highlight,\n		brightHighlight: canvas.toDataURL(),\n		scale: maximum * 2\n	};\n}\nfunction selectionLens(width, height, radius) {\n	const key = [\n		width,\n		height,\n		radius\n	].join("-");\n	const cached = selections.get(key);\n	if (cached) return cached;\n	const { displacement, highlight, brightHighlight, scale } = selectionMaps(width, height, radius);\n	const id = `glisse-selection-${selections.size}`;\n	const box = {\n		x: 0,\n		y: 0,\n		width,\n		height\n	};\n	const filter = svg("filter", {\n		id,\n		...box,\n		filterUnits: "userSpaceOnUse",\n		primitiveUnits: "userSpaceOnUse",\n		"color-interpolation-filters": "sRGB"\n	});\n	filter.append(svg("feImage", {\n		href: displacement,\n		...box,\n		preserveAspectRatio: "none",\n		result: "field"\n	}));\n	for (const [name, factor, values] of [\n		[\n			"r",\n			1.035,\n			"1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"\n		],\n		[\n			"g",\n			1,\n			"0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 1 0"\n		],\n		[\n			"b",\n			.965,\n			"0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 1 0"\n		]\n	]) filter.append(svg("feDisplacementMap", {\n		in: "SourceGraphic",\n		in2: "field",\n		scale: scale * factor,\n		xChannelSelector: "R",\n		yChannelSelector: "G",\n		result: `${name}-ray`\n	}), svg("feColorMatrix", {\n		in: `${name}-ray`,\n		type: "matrix",\n		values,\n		result: name\n	}));\n	filter.append(svg("feComposite", {\n		in: "r",\n		in2: "g",\n		operator: "arithmetic",\n		k2: 1,\n		k3: 1,\n		result: "rg"\n	}), svg("feComposite", {\n		in: "rg",\n		in2: "b",\n		operator: "arithmetic",\n		k2: 1,\n		k3: 1\n	}));\n	container().append(filter);\n	const result = {\n		filter: `url("#${id}")`,\n		rim: `url("${highlight}")`,\n		brightRim: `url("${brightHighlight}")`\n	};\n	selections.set(key, result);\n	return result;\n}\nfunction fitSelection(element, filtered) {\n	const width = element.offsetWidth;\n	const height = element.offsetHeight;\n	if (!width || !height) return;\n	const corner = getComputedStyle(element).borderTopLeftRadius;\n	const { filter, rim, brightRim } = selectionLens(width, height, Math.min(width / 2, height / 2, corner.endsWith("%") ? Math.min(width, height) * parseFloat(corner) / 100 : parseFloat(corner)));\n	if (filtered) element.style.setProperty("--lg-filter", filter);\n	element.style.setProperty("--lg-rim", rim);\n	element.style.setProperty("--lg-rim-bright", brightRim);\n}\n// src/button.tsx\nconst Button = /* @__PURE__ */ forwardRef(function Button({ icon, variant = "glass", destructive, tint, children, className, style, type = "button", ...props }, forwardedRef) {\n	const ref = useRef(null);\n	useImperativeHandle(forwardedRef, () => ref.current);\n	usePress(ref);\n	useRefraction(ref);\n	return /* @__PURE__ */ jsxs("button", {\n		ref,\n		type,\n		className: cx("lg-glass lg-button", className),\n		"data-icon": icon == null ? void 0 : children == null ? "only" : "",\n		"data-variant": variant === "glass" ? void 0 : variant,\n		"data-destructive": destructive ? "" : void 0,\n		"data-tint": tint ? "" : void 0,\n		style: tint ? {\n			...style,\n			"--lg-tint": tint\n		} : style,\n		...props,\n		children: [icon, children]\n	});\n});\n// src/glass.tsx\nconst Glass = /* @__PURE__ */ forwardRef(function Glass({ className, ...props }, forwardedRef) {\n	const ref = useRef(null);\n	useImperativeHandle(forwardedRef, () => ref.current);\n	useRefraction(ref);\n	return /* @__PURE__ */ jsx("div", {\n		ref,\n		className: cx("lg-glass", className),\n		...props\n	});\n});\n// src/internal/controllable.ts\nfunction useControllable(value, defaultValue, onChange) {\n	const [uncontrolled, setUncontrolled] = useState(defaultValue);\n	const controlled = value !== void 0;\n	const handler = useRef(onChange);\n	useEffect(() => {\n		handler.current = onChange;\n	});\n	const set = useCallback((next) => {\n		if (!controlled) setUncontrolled(next);\n		handler.current?.(next);\n	}, [controlled]);\n	return [controlled ? value : uncontrolled, set];\n}\n// src/input.tsx\nconst Input = /* @__PURE__ */ forwardRef(function Input({ value: valueProp, defaultValue = "", onValueChange, icon, className, style, ...props }, forwardedRef) {\n	const rootRef = useRef(null);\n	const inputRef = useRef(null);\n	const [value, setValue] = useControllable(valueProp, defaultValue, onValueChange);\n	useImperativeHandle(forwardedRef, () => inputRef.current);\n	useRefraction(rootRef);\n	return /* @__PURE__ */ jsxs("div", {\n		ref: rootRef,\n		className: cx("lg-glass lg-input", className),\n		style,\n		onPointerDown: (event) => {\n			if (event.target !== inputRef.current) inputRef.current?.focus();\n		},\n		children: [\n			icon == null ? null : /* @__PURE__ */ jsx("span", {\n				className: "lg-input-icon",\n				children: icon\n			}),\n			/* @__PURE__ */ jsx("input", {\n				ref: inputRef,\n				value,\n				onChange: (event) => setValue(event.currentTarget.value),\n				...props\n			}),\n			props.type === "search" && value && !props.disabled ? /* @__PURE__ */ jsx("button", {\n				type: "button",\n				className: "lg-input-clear",\n				"aria-label": "Clear",\n				onPointerDown: (event) => event.preventDefault(),\n				onClick: () => {\n					setValue("");\n					inputRef.current?.focus();\n				},\n				children: /* @__PURE__ */ jsx("svg", {\n					viewBox: "0 0 16 16",\n					fill: "none",\n					stroke: "currentColor",\n					strokeWidth: 1.5,\n					strokeLinecap: "round",\n					"aria-hidden": true,\n					children: /* @__PURE__ */ jsx("path", { d: "m4.5 4.5 7 7m0-7-7 7" })\n				})\n			}) : null\n		]\n	});\n});\n// src/menu.tsx\nconst clamp$1 = (value) => Math.min(1, Math.max(0, value));\nconst resistance = (value) => Math.sign(value) * 7 * (1 - Math.exp(-Math.abs(value) * .12 / 7));\nconst ellipsis = /* @__PURE__ */ jsxs("svg", {\n	viewBox: "0 0 16 16",\n	fill: "currentColor",\n	"aria-hidden": true,\n	children: [\n		/* @__PURE__ */ jsx("circle", {\n			cx: "3",\n			cy: "8",\n			r: "1.4"\n		}),\n		/* @__PURE__ */ jsx("circle", {\n			cx: "8",\n			cy: "8",\n			r: "1.4"\n		}),\n		/* @__PURE__ */ jsx("circle", {\n			cx: "13",\n			cy: "8",\n			r: "1.4"\n		})\n	]\n});\nfunction Menu({ items, "aria-label": label, icon = ellipsis, align = "end", className, style }) {\n	const [phase, setPhase] = useState("closed");\n	const triggerRef = useRef(null);\n	const cardRef = useRef(null);\n	const surfaceRef = useRef(null);\n	const glyphRef = useRef(null);\n	const contentRef = useRef(null);\n	const plateRef = useRef(null);\n	const morphRef = useRef(null);\n	const latest = useRef(items);\n	const mounted = phase !== "closed";\n	useEffect(() => {\n		latest.current = items;\n	});\n	useEffect(() => {\n		if (phase === "open") morphRef.current?.set(1);\n		if (phase === "leaving") morphRef.current?.set(0);\n	}, [phase]);\n	useEffect(() => {\n		if (!mounted) return;\n		const trigger = triggerRef.current;\n		const card = cardRef.current;\n		const surface = surfaceRef.current;\n		const glyph = glyphRef.current;\n		const content = contentRef.current;\n		const plate = plateRef.current;\n		const from = {\n			width: trigger.offsetWidth,\n			height: trigger.offsetHeight\n		};\n		const to = {\n			width: card.offsetWidth,\n			height: card.offsetHeight\n		};\n		const radius = parseFloat(getComputedStyle(surface).borderTopLeftRadius);\n		const trailing = card.dataset.align !== "start";\n		const origin = {\n			x: trailing ? to.width - from.width / 2 : from.width / 2,\n			y: from.height / 2\n		};\n		content.style.transformOrigin = `${origin.x}px ${origin.y}px`;\n		glyph.style.width = `${from.width}px`;\n		glyph.style.height = `${from.height}px`;\n		let leaving = false;\n		const shape = createSpring(0, 600, 46, (value) => {\n			const t = clamp$1(value);\n			const settled = t === 1;\n			const width = from.width + (to.width - from.width) * t;\n			const height = from.height + (to.height - from.height) * t;\n			const scale = .5 + .5 * t;\n			const local = (edge, centre) => centre + (edge - centre) / scale;\n			const left = local(trailing ? to.width - width : 0, origin.x);\n			const right = local(trailing ? to.width : width, origin.x);\n			const bottom = local(height, origin.y);\n			const top = local(0, origin.y);\n			surface.style.width = settled ? "" : `${width}px`;\n			surface.style.height = settled ? "" : `${height}px`;\n			surface.style.opacity = String(clamp$1(t / .2));\n			trigger.style.opacity = t === 0 ? "" : String(1 - clamp$1(t / .2));\n			const drift = .3 * t;\n			const dx = ((trailing ? to.width - width / 2 : width / 2) - origin.x) * drift;\n			const dy = (height / 2 - origin.y) * drift;\n			glyph.style.opacity = String(1 - clamp$1(t / .45));\n			glyph.style.transform = `translate(${dx}px, ${dy}px) scale(${1 + .6 * t})`;\n			glyph.style.filter = `blur(${8 * t}px)`;\n			content.style.opacity = String(leaving ? clamp$1((t - .55) / .45) : clamp$1((t - .15) / .6));\n			content.style.transform = settled ? "" : `scale(${scale})`;\n			content.style.filter = settled ? "" : `blur(${6 * (1 - t)}px)`;\n			content.style.clipPath = settled ? "" : `inset(${top}px ${to.width - right}px ${to.height - bottom}px ${left}px round ${radius / scale}px)`;\n			if (leaving && value === 0) setPhase("closed");\n		});\n		const morph = {\n			...shape,\n			set(target, instant) {\n				leaving = target === 0;\n				if (leaving) shape.tune(900, 57);\n				else shape.tune(600, 46);\n				shape.set(target, instant);\n			}\n		};\n		morphRef.current = morph;\n		shape.paint();\n		morph.set(1);\n		const rows = () => [...card.querySelectorAll(".lg-menu-item:not(:disabled)")];\n		rows()[0]?.focus({ preventScroll: true });\n		const offset = {\n			scale: 1,\n			x: 0,\n			y: 0\n		};\n		const paint = () => {\n			card.style.scale = String(offset.scale);\n			card.style.translate = `${offset.x}px ${offset.y}px`;\n		};\n		const scale = createSpring(1, 650, 36, (value) => {\n			offset.scale = value;\n			paint();\n		});\n		const x = createSpring(0, 600, 30, (value) => {\n			offset.x = value;\n			paint();\n		});\n		const y = createSpring(0, 600, 30, (value) => {\n			offset.y = value;\n			paint();\n		});\n		let gesture = null;\n		let current = null;\n		let suppressClickUntil = 0;\n		const close = (restoreFocus = true) => {\n			setPhase("leaving");\n			if (restoreFocus) triggerRef.current?.focus({ preventScroll: true });\n		};\n		const highlight = (row) => {\n			if (current === row) return;\n			const first = !current;\n			current = row;\n			if (!row) {\n				delete card.dataset.scrubbing;\n				plate.style.opacity = "0";\n				return;\n			}\n			card.dataset.scrubbing = "";\n			plate.style.width = `${row.offsetWidth}px`;\n			plate.style.height = `${row.offsetHeight}px`;\n			if (first) plate.style.transition = "none";\n			plate.style.transform = `translate(${row.offsetLeft}px, ${row.offsetTop}px)`;\n			plate.style.opacity = "1";\n			if (first) {\n				plate.offsetWidth;\n				plate.style.transition = "";\n			}\n		};\n		const rowAt = (clientX, clientY) => {\n			const row = document.elementFromPoint(clientX, clientY)?.closest(".lg-menu-item");\n			return row && !row.disabled && card.contains(row) ? row : null;\n		};\n		const down = (event) => {\n			if (!event.isPrimary || event.button !== 0) return;\n			gesture = {\n				id: event.pointerId,\n				x: event.clientX,\n				y: event.clientY\n			};\n			card.setPointerCapture(event.pointerId);\n			card.dataset.pressed = "";\n			scale.set(1 + 5 / Math.max(card.offsetWidth, card.offsetHeight, 200));\n			highlight(rowAt(event.clientX, event.clientY));\n		};\n		const move = (event) => {\n			if (!gesture) {\n				const row = event.pointerType === "mouse" ? rowAt(event.clientX, event.clientY) : null;\n				if (row) highlight(row);\n				return;\n			}\n			if (event.pointerId !== gesture.id) return;\n			highlight(rowAt(event.clientX, event.clientY));\n			x.set(resistance(event.clientX - gesture.x), true);\n			y.set(resistance(event.clientY - gesture.y), true);\n		};\n		const end = (event) => {\n			if (event.pointerId !== gesture?.id) return;\n			const chosen = event.type === "pointerup" ? rowAt(event.clientX, event.clientY) : null;\n			highlight(null);\n			gesture = null;\n			delete card.dataset.pressed;\n			scale.set(1);\n			x.set(0);\n			y.set(0);\n			suppressClickUntil = performance.now() + 500;\n			chosen?.click();\n		};\n		const leave = (event) => {\n			if (!gesture && event.pointerType === "mouse") highlight(null);\n		};\n		const click = (event) => {\n			const row = event.target.closest(".lg-menu-item");\n			if (!row || event.detail !== 0 && performance.now() < suppressClickUntil) return;\n			const item = latest.current[Number(row.dataset.index)];\n			if (!item || item === "separator") return;\n			close();\n			item.onSelect?.();\n		};\n		const key = (event) => {\n			if (event.key === "Escape") {\n				event.preventDefault();\n				close();\n			} else if (event.key === "Tab") close(false);\n			else if ([\n				"ArrowDown",\n				"ArrowUp",\n				"Home",\n				"End"\n			].includes(event.key)) {\n				event.preventDefault();\n				if (!gesture) highlight(null);\n				const list = rows();\n				const index = list.indexOf(document.activeElement);\n				list[event.key === "Home" ? 0 : event.key === "End" ? list.length - 1 : (index + (event.key === "ArrowDown" ? 1 : -1) + list.length) % list.length]?.focus();\n			}\n		};\n		const outside = (event) => {\n			const target = event.target;\n			if (!card.contains(target) && !triggerRef.current?.contains(target)) close(false);\n		};\n		card.addEventListener("pointerdown", down);\n		card.addEventListener("pointermove", move);\n		card.addEventListener("pointerleave", leave);\n		card.addEventListener("pointerup", end);\n		card.addEventListener("pointercancel", end);\n		card.addEventListener("lostpointercapture", end);\n		card.addEventListener("click", click);\n		card.addEventListener("keydown", key);\n		document.addEventListener("pointerdown", outside, true);\n		return () => {\n			[\n				shape,\n				scale,\n				x,\n				y\n			].forEach((spring) => spring.stop());\n			morphRef.current = null;\n			trigger.style.opacity = "";\n			card.removeEventListener("pointerdown", down);\n			card.removeEventListener("pointermove", move);\n			card.removeEventListener("pointerleave", leave);\n			card.removeEventListener("pointerup", end);\n			card.removeEventListener("pointercancel", end);\n			card.removeEventListener("lostpointercapture", end);\n			card.removeEventListener("click", click);\n			card.removeEventListener("keydown", key);\n			document.removeEventListener("pointerdown", outside, true);\n		};\n	}, [mounted]);\n	const open = phase === "open";\n	return /* @__PURE__ */ jsxs("div", {\n		className: cx("lg-menu", className),\n		style,\n		children: [/* @__PURE__ */ jsx(Button, {\n			ref: triggerRef,\n			icon,\n			"aria-label": label,\n			"aria-haspopup": "menu",\n			"aria-expanded": open,\n			onClick: () => setPhase(open ? "leaving" : "open")\n		}), mounted ? /* @__PURE__ */ jsxs("div", {\n			ref: cardRef,\n			role: "menu",\n			"aria-label": label,\n			className: "lg-menu-card",\n			"data-phase": phase,\n			"data-align": align,\n			children: [\n				/* @__PURE__ */ jsx("span", {\n					ref: surfaceRef,\n					className: "lg-menu-surface",\n					"aria-hidden": true\n				}),\n				/* @__PURE__ */ jsx("span", {\n					ref: glyphRef,\n					className: "lg-menu-glyph",\n					"aria-hidden": true,\n					children: icon\n				}),\n				/* @__PURE__ */ jsxs("div", {\n					ref: contentRef,\n					role: "none",\n					className: "lg-menu-content",\n					children: [/* @__PURE__ */ jsx("span", {\n						ref: plateRef,\n						className: "lg-menu-plate",\n						"aria-hidden": true\n					}), items.map((item, index) => item === "separator" ? /* @__PURE__ */ jsx("div", {\n						role: "separator",\n						className: "lg-menu-separator"\n					}, index) : /* @__PURE__ */ jsxs("button", {\n						type: "button",\n						role: "menuitem",\n						className: "lg-menu-item",\n						"data-index": index,\n						"data-destructive": item.destructive ? "" : void 0,\n						disabled: item.disabled,\n						children: [item.icon, item.label]\n					}, index))]\n				})\n			]\n		}) : null]\n	});\n}\n// src/search-field.tsx\nconst magnifier = /* @__PURE__ */ jsxs("svg", {\n	viewBox: "0 0 16 16",\n	fill: "none",\n	stroke: "currentColor",\n	strokeWidth: 1.5,\n	strokeLinecap: "round",\n	"aria-hidden": true,\n	children: [/* @__PURE__ */ jsx("circle", {\n		cx: "7",\n		cy: "7",\n		r: "4.75"\n	}), /* @__PURE__ */ jsx("path", { d: "m10.5 10.5 3.25 3.25" })]\n});\n/** An `Input` for searching: a magnifier icon, a "Search" placeholder and a clear button. */\nconst SearchField = /* @__PURE__ */ forwardRef(function SearchField({ icon = magnifier, placeholder = "Search", ...props }, ref) {\n	return /* @__PURE__ */ jsx(Input, {\n		ref,\n		type: "search",\n		icon,\n		placeholder,\n		...props\n	});\n});\nconst held = (at, moved) => moved || performance.now() - at >= 150;\n// src/internal/segments.tsx\nconst clamp = (value, min, max) => Math.min(max, Math.max(min, value));\nconst keys = [\n	"ArrowLeft",\n	"ArrowRight",\n	"Home",\n	"End"\n];\nconst REST = [\n	1024,\n	58.9,\n	676,\n	47.8\n];\nconst UNDER = .5;\nconst DRAG = [\n	2500,\n	94,\n	576,\n	44.2\n];\nconst LENS$2 = {\n	strength: .2,\n	strengthProperty: "--lg-tab-bend",\n	dispersion: 2,\n	dispersionProperty: "--lg-tab-dispersion",\n	depth: 4,\n	dome: 0,\n	splay: 1,\n	ink: true,\n	blur: 2\n};\nconst SEGMENT_LENS = {\n	strength: .3,\n	strengthProperty: "--lg-segment-bend",\n	dispersion: .1,\n	depth: 2.5,\n	dome: 0,\n	splay: 1\n};\nfunction attach({ bar, glass, thumb, labels, lensed, lens, tint, row }, options, bendsBackdrop, select) {\n	const tabs = [...bar.querySelectorAll(".lg-tab")];\n	let slot = 0;\n	let width = 0;\n	let height = 0;\n	let inset = 0;\n	let padding = 0;\n	let growX = 16;\n	let growY = 12;\n	let active = -1;\n	let shown = false;\n	let settleFrame = 0;\n	let gesture = null;\n	const state = {\n		x: 0,\n		lift: 0\n	};\n	const refraction = createLens(lens, lensed, options, labels);\n	const backdrop = bendsBackdrop && refractsBackdrop() ? createBackdropLens(lens, options) : null;\n	let lensing = false;\n	const mark = () => bar.toggleAttribute("data-away", active < 0 || Math.abs(state.x - active * slot) > .5);\n	const measure = () => {\n		const style = getComputedStyle(bar);\n		padding = parseFloat(style.paddingLeft) || 0;\n		slot = (bar.clientWidth - padding - (parseFloat(style.paddingRight) || 0)) / tabs.length;\n		inset = parseFloat(style.getPropertyValue("--lg-thumb-inset")) || 0;\n		width = slot - 2 * inset;\n		height = lens.offsetHeight;\n		growX = parseFloat(style.getPropertyValue("--lg-lens-grow-x")) || 0;\n		growY = parseFloat(style.getPropertyValue("--lg-lens-grow-y")) || 0;\n	};\n	const paint = () => {\n		const { x, lift } = state;\n		const sx = 1 + growX / width * lift;\n		const sy = 1 + growY / height * lift;\n		const transform = `translateX(${x}px) scale(${sx}, ${sy})`;\n		lens.style.transform = tint.style.transform = transform;\n		if (thumb) thumb.style.transform = transform;\n		lens.style.setProperty("--lg-lift", String(clamp(lift, 0, 1)));\n		lens.style.setProperty("--lg-lift-y", String(sy));\n		row.style.transform = `scale(${1 / sx}, ${1 / sy}) translate(${-x + (sx - 1) * (inset + width / 2)}px, ${(sy - 1) * (inset + height / 2)}px)`;\n		if (!gesture && lift < .01) delete bar.dataset.refracting;\n		mark();\n		if (lift > .01 !== lensing) {\n			lensing = lift > .01;\n			bar.toggleAttribute("data-lensing", lensing);\n			refraction.setActive(lensing);\n		}\n		const amount = clamp(lift, 0, 1);\n		const under = clamp((lift - UNDER) / .5, 0, 1);\n		lens.style.setProperty("--lg-rest", String(clamp(1 - lift / UNDER, 0, 1)));\n		lens.style.setProperty("--lg-under", String(under));\n		bar.toggleAttribute("data-under", lift > UNDER);\n		refraction.update(amount);\n		backdrop?.update(under);\n	};\n	const x = createSpring(0, REST[0], REST[1], (value) => {\n		state.x = value;\n		paint();\n	});\n	const lift = createSpring(0, REST[2], REST[3], (value) => {\n		state.lift = value;\n		paint();\n	});\n	const move = (target, lifted, instant = false) => {\n		const [slideStiffness, slideDamping, liftStiffness, liftDamping] = gesture ? DRAG : REST;\n		x.tune(slideStiffness, slideDamping);\n		lift.tune(liftStiffness, liftDamping);\n		x.set(target, instant);\n		lift.set(lifted ? 1 : 0, instant);\n	};\n	const settle = (instant = false) => {\n		mark();\n		if (gesture) return;\n		const show = active >= 0;\n		if (show) delete bar.dataset.hidden;\n		else bar.dataset.hidden = "";\n		if (show) move(active * slot, false, instant || !shown);\n		shown = show;\n	};\n	const position = (event) => clamp(gesture.anchor + event.clientX - gesture.x, 0, slot * (tabs.length - 1));\n	const light = (event, box) => {\n		glass.style.setProperty("--lg-x", `${clamp((event.clientX - box.left) / box.width * 100, 0, 100)}%`);\n		lens.style.setProperty("--lg-x", `${clamp((event.clientX - box.left - padding - inset - state.x) / width * 100, 0, 100)}%`);\n	};\n	const release = () => {\n		const old = gesture;\n		gesture = null;\n		delete bar.dataset.lifted;\n		delete lens.dataset.pressed;\n		if (old && bar.hasPointerCapture(old.id)) bar.releasePointerCapture(old.id);\n		return old;\n	};\n	let suppressClick = false;\n	const onPointerDown = (event) => {\n		const tab = event.target.closest(".lg-tab");\n		if (!event.isPrimary || event.button !== 0 || gesture || !tab) return;\n		if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;\n		cancelAnimationFrame(settleFrame);\n		settleFrame = 0;\n		measure();\n		bar.toggleAttribute("data-light", parseFloat(getComputedStyle(lens).getPropertyValue("--lg-lens-shine")) < 0);\n		backdrop?.refit();\n		const box = bar.getBoundingClientRect();\n		gesture = {\n			id: event.pointerId,\n			x: event.clientX,\n			anchor: tabs.indexOf(tab) * slot,\n			moved: false,\n			box,\n			at: performance.now()\n		};\n		suppressClick = false;\n		bar.dataset.lifted = "";\n		bar.dataset.refracting = "";\n		delete bar.dataset.hidden;\n		lens.dataset.pressed = "";\n		light(event, box);\n		move(gesture.anchor, true, !shown);\n		shown = true;\n	};\n	const onPointerMove = (event) => {\n		if (event.pointerId !== gesture?.id) return;\n		if (!gesture.moved && Math.abs(event.clientX - gesture.x) > 6) {\n			gesture.moved = true;\n			bar.setPointerCapture(event.pointerId);\n		}\n		if (gesture.moved) move(position(event), true);\n		light(event, gesture.box);\n	};\n	const onPointerEnd = (event) => {\n		if (event.pointerId !== gesture?.id) return;\n		if (event.type === "lostpointercapture" && event.target !== bar) return;\n		const index = Math.round(position(event) / slot);\n		const { moved, box } = release();\n		const near = event.clientY >= box.top - 24 && event.clientY <= box.bottom + 24;\n		if (event.type === "pointerup" && (moved || near)) {\n			suppressClick = true;\n			settleFrame = requestAnimationFrame(() => {\n				settleFrame = 0;\n				settle();\n			});\n			tabs[index]?.click();\n		} else {\n			suppressClick = moved;\n			settle();\n		}\n	};\n	const onTouchMove = (event) => {\n		if (gesture && event.cancelable && held(gesture.at, gesture.moved)) event.preventDefault();\n	};\n	const onClick = (event) => {\n		if (event.isTrusted && suppressClick && event.detail !== 0) {\n			suppressClick = false;\n			event.preventDefault();\n			return;\n		}\n		const tab = event.target.closest(".lg-tab");\n		if (!tab || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;\n		const index = tabs.indexOf(tab);\n		if (tab instanceof HTMLAnchorElement) {\n			active = index;\n			settle();\n		}\n		select(index);\n	};\n	const onKeyDown = (event) => {\n		const tab = event.target.closest(".lg-tab");\n		if (!tab || tab instanceof HTMLAnchorElement || !keys.includes(event.key)) return;\n		event.preventDefault();\n		const current = tabs.indexOf(tab);\n		const index = event.key === "Home" ? 0 : event.key === "End" ? tabs.length - 1 : (current + (event.key === "ArrowRight" ? 1 : tabs.length - 1)) % tabs.length;\n		select(index);\n		tabs[index]?.focus();\n	};\n	const reset = () => {\n		cancelAnimationFrame(settleFrame);\n		settleFrame = 0;\n		release();\n		settle(true);\n	};\n	const onVisibilityChange = () => {\n		if (document.hidden) reset();\n	};\n	const observer = new ResizeObserver(() => {\n		measure();\n		if (!gesture) settle(true);\n	});\n	measure();\n	bar.dataset.ready = "";\n	bar.addEventListener("pointerdown", onPointerDown);\n	window.addEventListener("pointermove", onPointerMove);\n	window.addEventListener("pointerup", onPointerEnd);\n	window.addEventListener("pointercancel", onPointerEnd);\n	bar.addEventListener("lostpointercapture", onPointerEnd);\n	bar.addEventListener("touchmove", onTouchMove, { passive: false });\n	bar.addEventListener("click", onClick, true);\n	bar.addEventListener("keydown", onKeyDown);\n	document.addEventListener("visibilitychange", onVisibilityChange);\n	window.addEventListener("blur", reset);\n	observer.observe(bar);\n	return {\n		setActive(index) {\n			cancelAnimationFrame(settleFrame);\n			settleFrame = 0;\n			active = index;\n			settle();\n		},\n		destroy() {\n			cancelAnimationFrame(settleFrame);\n			x.stop();\n			lift.stop();\n			refraction.destroy();\n			backdrop?.destroy();\n			observer.disconnect();\n			for (const key of [\n				"ready",\n				"hidden",\n				"lifted",\n				"refracting",\n				"lensing",\n				"away",\n				"light",\n				"under"\n			]) delete bar.dataset[key];\n			bar.removeEventListener("pointerdown", onPointerDown);\n			window.removeEventListener("pointermove", onPointerMove);\n			window.removeEventListener("pointerup", onPointerEnd);\n			window.removeEventListener("pointercancel", onPointerEnd);\n			bar.removeEventListener("lostpointercapture", onPointerEnd);\n			bar.removeEventListener("touchmove", onTouchMove);\n			bar.removeEventListener("click", onClick, true);\n			bar.removeEventListener("keydown", onKeyDown);\n			document.removeEventListener("visibilitychange", onVisibilityChange);\n			window.removeEventListener("blur", reset);\n		}\n	};\n}\nfunction content(item) {\n	if (item.icon === void 0) return /* @__PURE__ */ jsx("span", {\n		className: "lg-tab-text",\n		children: item.label\n	});\n	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("span", {\n		className: "lg-tab-icon",\n		"aria-hidden": true,\n		children: item.icon\n	}), /* @__PURE__ */ jsx("span", {\n		className: "lg-tab-label",\n		children: item.label\n	})] });\n}\n/**\n* A row of choices with one selected, under a selection that lifts into a\n* lens while held: a tab bar\'s, over glass, or a segmented control\'s, a thumb\n* on a track. Only TabBar and SegmentedControl use it.\n*/\nfunction Segments({ kind, items, value: valueProp, defaultValue = null, onValueChange, link: Link = "a", className, style, ...props }) {\n	const segmented = kind === "segmented";\n	const barRef = useRef(null);\n	const glassRef = useRef(null);\n	const thumbRef = useRef(null);\n	const labelsRef = useRef(null);\n	const lensedRef = useRef(null);\n	const lensRef = useRef(null);\n	const tintRef = useRef(null);\n	const rowRef = useRef(null);\n	const controller = useRef(null);\n	const [value, setValue] = useControllable(valueProp, defaultValue, onValueChange);\n	const selected = items.findIndex((item) => item.value === value);\n	const latest = useRef({\n		items,\n		selected,\n		setValue\n	});\n	const signature = items.map((item) => item.value).join("\\n");\n	const navigation = !segmented && items.every((item) => item.href !== void 0);\n	const icons = !segmented && items.some((item) => item.icon !== void 0);\n	useRefraction(glassRef);\n	useRefraction(lensRef, true, segmented);\n	useEffect(() => {\n		latest.current = {\n			items,\n			selected,\n			setValue\n		};\n	});\n	useEffect(() => {\n		const instance = attach({\n			bar: barRef.current,\n			glass: glassRef.current,\n			thumb: thumbRef.current,\n			labels: labelsRef.current,\n			lensed: lensedRef.current,\n			lens: lensRef.current,\n			tint: tintRef.current,\n			row: rowRef.current\n		}, segmented ? SEGMENT_LENS : LENS$2, !segmented, (index) => {\n			const item = latest.current.items[index];\n			if (item) latest.current.setValue(item.value);\n		});\n		instance.setActive(latest.current.selected);\n		controller.current = instance;\n		return () => {\n			instance.destroy();\n			controller.current = null;\n		};\n	}, [signature, segmented]);\n	useLayoutEffect(() => {\n		controller.current?.setActive(selected);\n	}, [selected]);\n	return /* @__PURE__ */ jsxs("div", {\n		ref: barRef,\n		role: segmented ? "radiogroup" : navigation ? "navigation" : "tablist",\n		"data-icons": icons ? "" : void 0,\n		className: cx(segmented ? "lg-segmented" : "lg-tab-bar", className),\n		style: {\n			...style,\n			"--lg-index": Math.max(selected, 0),\n			"--lg-tabs": items.length\n		},\n		...props,\n		children: [\n			/* @__PURE__ */ jsx("span", {\n				ref: glassRef,\n				className: "lg-glass lg-tab-bar-glass",\n				"aria-hidden": true\n			}),\n			segmented && /* @__PURE__ */ jsx("span", {\n				ref: thumbRef,\n				className: "lg-segmented-thumb",\n				"aria-hidden": true\n			}),\n			/* @__PURE__ */ jsx("span", {\n				ref: labelsRef,\n				className: "lg-tab-labels",\n				role: "none",\n				children: items.map((item, index) => item.href !== void 0 ? /* @__PURE__ */ jsx(Link, {\n					href: item.href,\n					className: "lg-tab",\n					"data-selected": index === selected ? "" : void 0,\n					"aria-current": index === selected ? "page" : void 0,\n					draggable: false,\n					children: /* @__PURE__ */ jsx("span", {\n						className: "lg-tab-face",\n						children: content(item)\n					})\n				}, item.value) : /* @__PURE__ */ jsx("button", {\n					type: "button",\n					role: segmented ? "radio" : "tab",\n					className: "lg-tab",\n					"data-selected": index === selected ? "" : void 0,\n					"aria-selected": segmented ? void 0 : index === selected,\n					"aria-checked": segmented ? index === selected : void 0,\n					tabIndex: index === selected || selected < 0 && index === 0 ? 0 : -1,\n					children: /* @__PURE__ */ jsx("span", {\n						className: "lg-tab-face",\n						children: content(item)\n					})\n				}, item.value))\n			}),\n			/* @__PURE__ */ jsx("span", {\n				ref: lensedRef,\n				className: "lg-tab-labels lg-tab-lensed",\n				"aria-hidden": true,\n				children: items.map((item, index) => /* @__PURE__ */ jsx("span", {\n					className: "lg-tab-copy",\n					"data-selected": index === selected ? "" : void 0,\n					children: content(item)\n				}, item.value))\n			}),\n			/* @__PURE__ */ jsx("span", {\n				ref: tintRef,\n				className: "lg-tab-tint",\n				"aria-hidden": true,\n				children: /* @__PURE__ */ jsx("span", {\n					ref: rowRef,\n					className: "lg-tab-row",\n					children: items.map((item) => /* @__PURE__ */ jsx("span", {\n						className: "lg-tab-copy",\n						children: content(item)\n					}, item.value))\n				})\n			}),\n			/* @__PURE__ */ jsx("span", {\n				ref: lensRef,\n				className: "lg-glass lg-tab-lens",\n				"aria-hidden": true\n			})\n		]\n	});\n}\n// src/segmented-control.tsx\n/**\n* A choice between a few options, as iOS 26\'s segmented control: a thumb on a\n* track that, held or dragged, lifts into a lens over the labels.\n*/\nfunction SegmentedControl(props) {\n	return /* @__PURE__ */ jsx(Segments, {\n		kind: "segmented",\n		...props\n	});\n}\n// src/slider.tsx\nconst LENS$1 = {\n	strength: .75,\n	strengthProperty: "--lg-slider-bend",\n	dispersion: .65,\n	depth: 2,\n	dome: 5,\n	splay: .5\n};\nconst Slider = /* @__PURE__ */ forwardRef(function Slider({ value: valueProp, defaultValue, onValueChange, min = 0, max = 100, step = 1, className, style, ...props }, forwardedRef) {\n	const rootRef = useRef(null);\n	const inputRef = useRef(null);\n	const bedRef = useRef(null);\n	const magnifiedRef = useRef(null);\n	const thumbRef = useRef(null);\n	const lensRef = useRef(null);\n	const faceRef = useRef(null);\n	const [value, setValue] = useControllable(valueProp, defaultValue ?? min, onValueChange);\n	const progress = max > min ? Math.min(1, Math.max(0, (value - min) / (max - min))) : 0;\n	useImperativeHandle(forwardedRef, () => inputRef.current);\n	useEffect(() => {\n		const input = inputRef.current;\n		const thumb = thumbRef.current;\n		const face = faceRef.current;\n		const root = rootRef.current;\n		const lens = createLens(thumb, magnifiedRef.current, LENS$1, bedRef.current);\n		lensRef.current = lens;\n		const lift = createSpring(0, 2e3, 80, (amount) => {\n			const lifted = Math.min(1, Math.max(0, amount));\n			thumb.style.scale = String(.6 + .4 * amount);\n			root.style.setProperty("--lg-lift", String(lifted));\n			face.style.opacity = String(1 - .85 * lifted);\n			lens.setActive(amount > .01);\n			lens.update();\n		});\n		const hold = () => {\n			if (!input.disabled) lift.set(1);\n		};\n		const release = () => lift.set(0);\n		const ends = [\n			"pointerup",\n			"pointercancel",\n			"lostpointercapture",\n			"blur"\n		];\n		input.addEventListener("pointerdown", hold);\n		ends.forEach((type) => input.addEventListener(type, release));\n		window.addEventListener("pointerup", release);\n		return () => {\n			lift.stop();\n			lens.destroy();\n			lensRef.current = null;\n			input.removeEventListener("pointerdown", hold);\n			ends.forEach((type) => input.removeEventListener(type, release));\n			window.removeEventListener("pointerup", release);\n		};\n	}, []);\n	useLayoutEffect(() => {\n		lensRef.current?.update();\n	}, [progress]);\n	return /* @__PURE__ */ jsxs("div", {\n		ref: rootRef,\n		className: cx("lg-slider", className),\n		style: {\n			...style,\n			"--lg-progress": progress\n		},\n		children: [\n			/* @__PURE__ */ jsx("span", {\n				ref: bedRef,\n				className: "lg-slider-bed",\n				"aria-hidden": true,\n				children: /* @__PURE__ */ jsx("span", {\n					className: "lg-slider-track",\n					children: /* @__PURE__ */ jsx("span", { className: "lg-slider-fill" })\n				})\n			}),\n			/* @__PURE__ */ jsx("span", {\n				ref: magnifiedRef,\n				className: "lg-slider-bed lg-slider-magnified",\n				"aria-hidden": true,\n				children: /* @__PURE__ */ jsx("span", {\n					className: "lg-slider-track",\n					children: /* @__PURE__ */ jsx("span", { className: "lg-slider-fill" })\n				})\n			}),\n			/* @__PURE__ */ jsx("span", {\n				ref: thumbRef,\n				className: "lg-slider-thumb",\n				"aria-hidden": true,\n				children: /* @__PURE__ */ jsx("span", {\n					ref: faceRef,\n					className: "lg-thumb-face"\n				})\n			}),\n			/* @__PURE__ */ jsx("input", {\n				ref: inputRef,\n				type: "range",\n				min,\n				max,\n				step,\n				value,\n				onChange: (event) => setValue(event.currentTarget.valueAsNumber),\n				...props\n			})\n		]\n	});\n});\n// src/switch.tsx\nconst TRAVEL = 21.7125;\nconst unit = (value) => Math.min(1, Math.max(0, value));\nconst LENS = {\n	strength: .45,\n	strengthProperty: "--lg-switch-bend",\n	dispersion: 1,\n	depth: 2,\n	dome: 6,\n	splay: .4\n};\nconst Switch = /* @__PURE__ */ forwardRef(function Switch({ checked: checkedProp, defaultChecked = false, onCheckedChange, className, ...props }, forwardedRef) {\n	const ref = useRef(null);\n	const bedRef = useRef(null);\n	const insetRef = useRef(null);\n	const fillRef = useRef(null);\n	const insetFillRef = useRef(null);\n	const thumbRef = useRef(null);\n	const faceRef = useRef(null);\n	const [checked, setChecked] = useControllable(checkedProp, defaultChecked, onCheckedChange);\n	const travel = TRAVEL;\n	const latest = useRef({\n		checked,\n		setChecked,\n		travel\n	});\n	const springs = useRef(null);\n	useImperativeHandle(forwardedRef, () => ref.current);\n	useEffect(() => {\n		latest.current = {\n			checked,\n			setChecked,\n			travel\n		};\n		springs.current?.position.set(checked ? 1 : 0);\n		springs.current?.color.set(checked ? 1 : 0);\n	}, [\n		checked,\n		setChecked,\n		travel\n	]);\n	useEffect(() => {\n		springs.current?.position.paint();\n	}, [travel]);\n	useEffect(() => {\n		const el = ref.current;\n		const fills = [fillRef.current, insetFillRef.current];\n		const thumb = thumbRef.current;\n		const face = faceRef.current;\n		const lens = createLens(thumb, insetRef.current, LENS, bedRef.current);\n		let x = 0;\n		let scale = .65;\n		const paint = () => {\n			thumb.style.transform = `translate(${x}px, -50%) scale(${scale})`;\n			lens.update();\n		};\n		const initial = latest.current.checked ? 1 : 0;\n		const position = createSpring(initial, 1e3, 80, (value) => {\n			x = value * latest.current.travel;\n			paint();\n		});\n		const color = createSpring(initial, 1e3, 80, (value) => {\n			for (const fill of fills) fill.style.opacity = String(unit(value));\n		});\n		const lift = createSpring(0, 2e3, 80, (value) => {\n			scale = .65 + .25 * value;\n			face.style.opacity = String(1 - .85 * unit(value));\n			el.style.setProperty("--lg-lift", String(unit(value)));\n			lens.setActive(value > .01);\n			paint();\n		});\n		springs.current = {\n			position,\n			color\n		};\n		position.paint();\n		color.paint();\n		lift.paint();\n		let gesture = null;\n		let ignoreClick = false;\n		const sync = () => {\n			position.set(latest.current.checked ? 1 : 0);\n			color.set(latest.current.checked ? 1 : 0);\n		};\n		const settle = (next) => {\n			const old = gesture;\n			gesture = null;\n			lift.set(0);\n			if (old && el.hasPointerCapture(old.id)) el.releasePointerCapture(old.id);\n			if (next === void 0 || next === latest.current.checked) return sync();\n			latest.current.setChecked(next);\n			requestAnimationFrame(sync);\n		};\n		const down = (event) => {\n			if (!event.isPrimary || event.button !== 0 || el.disabled) return;\n			event.preventDefault();\n			ignoreClick = false;\n			gesture = {\n				id: event.pointerId,\n				x: event.clientX,\n				y: event.clientY,\n				from: latest.current.checked ? 1 : 0,\n				moved: false,\n				at: performance.now(),\n				box: el.getBoundingClientRect()\n			};\n			el.setPointerCapture(event.pointerId);\n			lift.set(1);\n		};\n		const move = (event) => {\n			if (event.pointerId !== gesture?.id) return;\n			const dx = event.clientX - gesture.x;\n			const dy = Math.abs(event.clientY - gesture.y);\n			if (!held(gesture.at, gesture.moved) && dy > 10 && dy > Math.abs(dx) + 4) {\n				ignoreClick = true;\n				return settle();\n			}\n			if (!gesture.moved && Math.abs(dx) < 4) return;\n			gesture.moved = true;\n			const value = gesture.from + dx / latest.current.travel;\n			const overshoot = value < 0 ? value : value > 1 ? value - 1 : 0;\n			position.set(unit(value) + overshoot / 22);\n			color.set(value > .5 ? 1 : 0);\n		};\n		const up = (event) => {\n			if (event.pointerId !== gesture?.id) return;\n			ignoreClick = true;\n			const { from, x, moved, box } = gesture;\n			const value = from + (event.clientX - x) / latest.current.travel;\n			const near = event.clientY >= box.top - 24 && event.clientY <= box.bottom + 24;\n			settle(moved ? value > .5 : near ? !latest.current.checked : void 0);\n		};\n		const keep = (event) => {\n			if (gesture && event.cancelable && held(gesture.at, gesture.moved)) event.preventDefault();\n		};\n		const cancel = () => {\n			if (!gesture) return;\n			ignoreClick = true;\n			settle();\n		};\n		const click = () => {\n			if (ignoreClick) ignoreClick = false;\n			else if (!el.disabled) latest.current.setChecked(!latest.current.checked);\n		};\n		el.addEventListener("pointerdown", down);\n		el.addEventListener("pointermove", move);\n		el.addEventListener("pointerup", up);\n		el.addEventListener("pointercancel", cancel);\n		el.addEventListener("lostpointercapture", cancel);\n		el.addEventListener("touchmove", keep, { passive: false });\n		el.addEventListener("click", click);\n		return () => {\n			springs.current = null;\n			[\n				position,\n				color,\n				lift\n			].forEach((spring) => spring.stop());\n			lens.destroy();\n			el.removeEventListener("pointerdown", down);\n			el.removeEventListener("pointermove", move);\n			el.removeEventListener("pointerup", up);\n			el.removeEventListener("pointercancel", cancel);\n			el.removeEventListener("lostpointercapture", cancel);\n			el.removeEventListener("touchmove", keep);\n			el.removeEventListener("click", click);\n		};\n	}, []);\n	return /* @__PURE__ */ jsxs("button", {\n		ref,\n		type: "button",\n		role: "switch",\n		"aria-checked": checked,\n		className: cx("lg-switch", className),\n		...props,\n		children: [\n			/* @__PURE__ */ jsx("span", {\n				ref: bedRef,\n				className: "lg-switch-bed",\n				"aria-hidden": true,\n				children: /* @__PURE__ */ jsx("span", {\n					className: "lg-switch-track",\n					children: /* @__PURE__ */ jsx("span", {\n						ref: fillRef,\n						className: "lg-switch-fill"\n					})\n				})\n			}),\n			/* @__PURE__ */ jsx("span", {\n				ref: insetRef,\n				className: "lg-switch-bed lg-switch-inset",\n				"aria-hidden": true,\n				children: /* @__PURE__ */ jsx("span", {\n					className: "lg-switch-track",\n					children: /* @__PURE__ */ jsx("span", {\n						ref: insetFillRef,\n						className: "lg-switch-fill"\n					})\n				})\n			}),\n			/* @__PURE__ */ jsx("span", {\n				ref: thumbRef,\n				className: "lg-switch-thumb",\n				"aria-hidden": true,\n				children: /* @__PURE__ */ jsx("span", {\n					ref: faceRef,\n					className: "lg-thumb-face"\n				})\n			})\n		]\n	});\n});\n// src/tab-bar.tsx\n/**\n* A row of tabs on glass, as iOS 26\'s tab bar: the selection springs between\n* them, follows a drag, and lifts into a lens while held. Tabs with an `href`\n* are links, and the bar is then navigation.\n*/\nfunction TabBar(props) {\n	return /* @__PURE__ */ jsx(Segments, {\n		kind: "tab-bar",\n		...props\n	});\n}\n// src/index.ts\ninsertStyles(styles_default);\nexport { Button, Glass, Input, Menu, SearchField, SegmentedControl, Slider, Switch, TabBar };' }, "/vendor/liquid.css": { "type": "text/css; charset=utf-8", "body": `/*!
 * main.liquid.css - Liquid Glass SDK stylesheet for COSVerses / CERETOSPHERE
 *
 * Based on "glisse" v0.5.0 - Liquid Glass for the web
 * Copyright (c) Kelvin Zhang - MIT License - https://github.com/0kzh/glisse
 * Redistributed by COSVerses (2026) under the same MIT License. Stylesheet content unchanged.
 *
 * CDN USAGE POLICY (fastcdn.cosverses.com)
 * This code is open source under the MIT License. You may copy it and use it on your own
 * website, served from your own server or CDN, provided you keep the notices in this header.
 * Copying the code does NOT grant the right to load it from the COSVerses CDN. Loading any
 * file from fastcdn.cosverses.com on a website we have not authorized is prohibited; we may
 * block such use and pursue legal remedies. If you copy this file, replace any
 * fastcdn.cosverses.com URLs inside it with your own.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this
 * software and associated documentation files (the "Software"), to deal in the Software
 * without restriction, including without limitation the rights to use, copy, modify, merge,
 * publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons
 * to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or
 * substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
 * PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE
 * FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
 * OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */
:where(:root, [data-theme="light"]) {
  --lg-foreground: rgb(0 0 0 / 0.88);
  --lg-muted: rgb(60 60 67 / 0.6);
  --lg-glass: rgb(255 255 255 / 0.6);
  --lg-glass-active: rgb(236 236 240 / 0.85);
  --lg-edge: rgb(0 0 0 / 0.08);
  --lg-drop: rgb(0 0 0 / 0.06);
  --lg-selection: rgb(0 0 0 / 0.1);
  --lg-lens: rgb(0 0 0 / 0.03);
  --lg-lens-drop: rgb(0 0 0 / 0.11);
  --lg-segment-track: rgb(118 118 128 / 0.12);
  --lg-segment-thumb: rgb(255 255 255);
  --lg-segment-label: rgb(0 0 0);
  --lg-segment-lens: rgb(0 0 0 / 0.03);
  --lg-surface: rgb(250 250 252 / 0.86);
  --lg-surface-edge: rgb(0 0 0 / 0.08);
  --lg-shadow: rgb(25 25 35 / 0.12);
  --lg-highlight: rgb(60 60 67 / 0.09);
  --lg-separator: rgb(60 60 67 / 0.15);
  --lg-destructive: #ff383c;
  --lg-track: rgb(59 59 66 / 0.3);
  --lg-rail: rgb(0 0 0 / 0.1);
  --lg-on: #34c759;
  --lg-fill: #0088ff;
  --lg-ring: rgb(0 0 0 / 0.4);
  --lg-lens-shine: -1.5;
  --lg-rim-shine: 0.3;
  --lg-ease: cubic-bezier(0.25, 0.1, 0.25, 1);
}

:where([data-theme="dark"]) {
  --lg-foreground: rgb(255 255 255);
  --lg-muted: rgb(235 235 245 / 0.6);
  --lg-glass: rgb(40 40 40 / 0.62);
  --lg-glass-active: rgb(70 70 70 / 0.62);
  --lg-edge: rgb(255 255 255 / 0.08);
  --lg-drop: transparent;
  --lg-selection: rgb(255 255 255 / 0.145);
  --lg-lens: rgb(255 255 255 / 0.055);
  --lg-lens-drop: transparent;
  --lg-segment-track: transparent;
  --lg-segment-thumb: rgb(235 235 245 / 0.3);
  --lg-segment-label: rgb(255 255 255);
  --lg-segment-lens: transparent;
  --lg-surface: rgb(28 28 31 / 0.86);
  --lg-surface-edge: rgb(255 255 255 / 0.13);
  --lg-shadow: rgb(0 0 0 / 0.38);
  --lg-highlight: rgb(235 235 245 / 0.13);
  --lg-separator: rgb(235 235 245 / 0.16);
  --lg-destructive: #ff4245;
  --lg-track: rgb(235 235 245 / 0.3);
  --lg-rail: rgb(255 255 255 / 0.1);
  --lg-on: #30d158;
  --lg-fill: #0091ff;
  --lg-ring: rgb(255 255 255 / 0.5);
  --lg-lens-shine: 1;
  --lg-rim-shine: 0.13;
}

@media (prefers-color-scheme: dark) {
  :where(:root:not([data-theme="light"])) {
    --lg-foreground: rgb(255 255 255);
    --lg-muted: rgb(235 235 245 / 0.6);
    --lg-glass: rgb(40 40 40 / 0.62);
    --lg-glass-active: rgb(70 70 70 / 0.62);
    --lg-edge: rgb(255 255 255 / 0.08);
    --lg-drop: transparent;
    --lg-selection: rgb(255 255 255 / 0.145);
    --lg-lens: rgb(255 255 255 / 0.055);
    --lg-lens-drop: transparent;
    --lg-segment-track: transparent;
    --lg-segment-thumb: rgb(235 235 245 / 0.3);
    --lg-segment-label: rgb(255 255 255);
    --lg-segment-lens: transparent;
    --lg-surface: rgb(28 28 31 / 0.86);
    --lg-surface-edge: rgb(255 255 255 / 0.13);
    --lg-shadow: rgb(0 0 0 / 0.38);
    --lg-highlight: rgb(235 235 245 / 0.13);
    --lg-separator: rgb(235 235 245 / 0.16);
    --lg-destructive: #ff4245;
    --lg-track: rgb(235 235 245 / 0.3);
    --lg-rail: rgb(255 255 255 / 0.1);
    --lg-on: #30d158;
    --lg-fill: #0091ff;
    --lg-ring: rgb(255 255 255 / 0.5);
  --lg-lens-shine: 1;
    --lg-rim-shine: 0.13;
  }
}

/* Glass */

.lg-glass {
  position: relative;
  background-color: var(--lg-glass);
  background-image: var(--lg-rim, none);
  background-size: 100% 100%;
  -webkit-backdrop-filter: blur(var(--lg-blur, 3px)) var(--lg-filter, saturate(1.5));
  backdrop-filter: blur(var(--lg-blur, 3px)) var(--lg-filter, saturate(1.5));
  box-shadow:
    inset 0 0 0 0.5px var(--lg-edge),
    0 1px 3px var(--lg-drop);
}

/* Glass that paints its rim (see refraction.ts) draws its edge line there,
   under the light, which an inset shadow would cover. */
.lg-glass[data-rim] {
  box-shadow: 0 1px 3px var(--lg-drop);
}

.lg-glass::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
  background: radial-gradient(
    circle 240px at var(--lg-x, 50%) var(--lg-y, 50%),
    rgb(255 255 255 / 0.035),
    rgb(255 255 255 / 0.025) 50%,
    transparent
  );
  opacity: 0;
  transition: opacity 220ms ease-in-out;
}

.lg-glass[data-pressed]::after {
  opacity: 1;
  transition-duration: 0s;
}

/* Button */

.lg-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 40px;
  padding: 0 16px;
  border: 0;
  border-radius: 20px;
  color: var(--lg-foreground);
  font: inherit;
  font-size: 14px;
  cursor: pointer;
  /* A long press keeps pressing, as on iOS, rather than selecting the label. */
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  -webkit-touch-callout: none;
  user-select: none;
  -webkit-user-select: none;
  transition: background-color 200ms ease;
}

.lg-button[data-icon] {
  padding-left: 12px;
}

.lg-button[data-icon="only"] {
  width: 40px;
  padding: 0;
}

.lg-button > svg {
  flex: none;
  width: 20px;
  height: 20px;
}

/* Lights up at once when pressed, as on iOS, and fades on release. */
.lg-button:is(:active, [data-pressed]) {
  background-color: var(--lg-glass-active);
  transition-duration: 0s;
}

@media (hover: hover) and (pointer: fine) {
  .lg-button:hover {
    background-color: var(--lg-glass-active);
  }
}

.lg-button:disabled {
  background-color: var(--lg-glass);
  opacity: 0.35;
  cursor: default;
}

.lg-button[data-destructive]:not([data-tint]) {
  --lg-tint: var(--lg-destructive);
}

.lg-button:is([data-tint], [data-destructive]) {
  color: var(--lg-tint);
}

.lg-button[data-variant="filled"] {
  --lg-button-fill: var(--lg-tint, var(--lg-fill));
  color: #fff;
}

.lg-button[data-variant="filled"],
.lg-button[data-variant="filled"]:disabled {
  background-color: var(--lg-button-fill);
}

.lg-button[data-variant="filled"]:is(:active, [data-pressed]) {
  background-color: color-mix(in srgb, var(--lg-button-fill) 85%, #000);
}

@media (hover: hover) and (pointer: fine) {
  .lg-button[data-variant="filled"]:hover {
    background-color: color-mix(in srgb, var(--lg-button-fill) 88%, #fff);
  }

  .lg-button[data-variant="filled"]:hover:is(:active, [data-pressed]) {
    background-color: color-mix(in srgb, var(--lg-button-fill) 85%, #000);
  }
}

.lg-button:focus-visible,
.lg-tab:focus-visible,
.lg-switch:focus-visible,
.lg-menu-item:focus-visible {
  outline: 2px solid var(--lg-ring);
  outline-offset: 2px;
}

/* Tab bar */

/* The bar's padding is --lg-tab-inset. The selection fills its slot, less
   --lg-thumb-inset on every side: none here, 2px on a segmented control. */
.lg-tab-bar {
  --lg-tab-width: 84px;
  --lg-tab-height: 32px;
  --lg-tab-inset: 4px;
  --lg-thumb-inset: 0px;
  --lg-lens-grow-x: 27px;
  --lg-lens-grow-y: 20px;
  position: relative;
  display: inline-flex;
  padding: var(--lg-tab-inset);
  border-radius: calc(var(--lg-tab-height) / 2 + var(--lg-tab-inset));
  touch-action: pan-y;
  -webkit-tap-highlight-color: transparent;
  user-select: none;
  -webkit-user-select: none;
}

.lg-tab-bar-glass {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
}

.lg-tab-bar-glass::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: radial-gradient(
    circle 260px at var(--lg-x, 20%) 50%,
    rgb(255 255 255 / 0.09),
    rgb(255 255 255 / 0.045) 60%,
    transparent
  );
  opacity: 0;
  transition: opacity 160ms ease;
}

:is(.lg-tab-bar, .lg-segmented)[data-lifted] .lg-tab-bar-glass::before {
  opacity: 1;
  transition-duration: 120ms;
}

/* The labels, with room around them for the whole lifted lens, which
   refracts them (see lens.ts): Safari paints none of a filter outside its
   element. The room hangs outside the bar and takes no clicks. */
.lg-tab-labels {
  --lg-room-x: calc(var(--lg-lens-grow-x) / 2 + 4px);
  --lg-room-y: calc(var(--lg-lens-grow-y) / 2 + 4px);
  position: relative;
  z-index: 1;
  display: flex;
  margin: calc(var(--lg-room-y) * -1) calc(var(--lg-room-x) * -1);
  padding: var(--lg-room-y) var(--lg-room-x);
  pointer-events: none;
}

/* What the lifted lens shows in place of the labels: the same labels in full
   colour, laid exactly over them and seen only through the lens. */
.lg-tab-lensed {
  position: absolute;
  top: var(--lg-tab-inset);
  left: var(--lg-tab-inset);
  color: var(--lg-tab-selected, var(--lg-foreground));
  visibility: hidden;
}

:is(.lg-tab-bar, .lg-segmented)[data-lensing] .lg-tab-tint {
  visibility: hidden;
}

.lg-tab,
.lg-tab-copy {
  display: flex;
  flex: none;
  align-items: center;
  justify-content: center;
  width: var(--lg-tab-width);
  height: var(--lg-tab-height);
  font: inherit;
  font-size: 14px;
}

.lg-tab {
  position: relative;
  z-index: 1;
  padding: 0;
  border: 0;
  border-radius: calc(var(--lg-tab-height) / 2);
  color: var(--lg-muted);
  background: none;
  text-decoration: none;
  cursor: pointer;
  pointer-events: auto;
  -webkit-touch-callout: none;
  transition: color 200ms ease;
}

.lg-tab:focus-visible {
  outline-offset: -2px;
}

/* A tab's own label, wrapped so its colour can change at once, without the
   tab's colour transition. While the selection is over the selected tab (no
   data-away), it draws that tab's label alone: drawn twice, the copy on its
   own layer lands a fraction of a pixel off and the label beneath fringes it.
   Transparent, not hidden, so the tab keeps its name. */
.lg-tab-face {
  display: contents;
}

.lg-tab-bar:not([data-away]) .lg-tab[data-selected] > .lg-tab-face {
  color: transparent;
}

/* A label alone, centred by its letters: its box is trimmed to the height of
   the capitals above the baseline, so neither the font's ascent and descent
   nor the page's line height moves it off centre. Browsers without text-box
   centre its line box instead. */
.lg-tab-text {
  display: block;
  text-box: trim-both cap alphabetic;
}

/* Tabs with icons, as in an iOS tab bar: each icon over a small label, the
   others in full colour and the selected one in --lg-tab-selected. */
.lg-tab-bar[data-icons] {
  --lg-tab-width: 72px;
  --lg-tab-height: 52px;
  --lg-lens-grow-x: 24px;
  --lg-lens-grow-y: 16px;
  --lg-tab-selected: var(--lg-fill);
}

.lg-tab-bar[data-icons] :is(.lg-tab, .lg-tab-copy) {
  flex-direction: column;
  gap: 1px;
  font-size: 10px;
  font-weight: 500;
}

.lg-tab-bar[data-icons] .lg-tab {
  color: var(--lg-foreground);
}

.lg-tab-icon {
  display: flex;
}

.lg-tab-icon > svg {
  width: 26px;
  height: 26px;
}

@media (hover: hover) and (pointer: fine) {
  .lg-tab:hover {
    color: var(--lg-foreground);
  }
}

.lg-tab-lens,
.lg-tab-tint,
.lg-segmented-thumb {
  position: absolute;
  top: calc(var(--lg-tab-inset) + var(--lg-thumb-inset));
  left: calc(var(--lg-tab-inset) + var(--lg-thumb-inset));
  width: calc(var(--lg-tab-width) - 2 * var(--lg-thumb-inset));
  height: calc(var(--lg-tab-height) - 2 * var(--lg-thumb-inset));
  border-radius: calc(var(--lg-tab-height) / 2 - var(--lg-thumb-inset));
  pointer-events: none;
  transform: translateX(calc(var(--lg-tab-width) * var(--lg-index, 0)));
  transition: opacity 140ms ease;
  will-change: transform;
}

.lg-tab-tint {
  z-index: 1;
  overflow: hidden;
  color: var(--lg-tab-selected, var(--lg-foreground));
}

/* The labels again, set back by the tint's inset so they line up. */
.lg-tab-row {
  display: flex;
  height: var(--lg-tab-height);
  margin: calc(var(--lg-thumb-inset) * -1) 0 0 calc(var(--lg-thumb-inset) * -1);
  transform: translateX(calc(var(--lg-tab-width) * var(--lg-index, 0) * -1));
  transform-origin: 0 0;
  will-change: transform;
}

/* Lifted, the lens casts iOS's shadow (fitted to iOS 26.1), faded in with its
   lift (--lg-lift) and kept to iOS's size against its own stretch
   (--lg-lift-y). The page's --lg-lens-drop colours it: none on a dark page. */
.lg-tab-lens.lg-glass {
  z-index: 2;
  background-color: transparent;
  background-image: none;
  -webkit-backdrop-filter: none;
  backdrop-filter: none;
  box-shadow: 0 calc(7px / var(--lg-lift-y, 1)) calc(11px / var(--lg-lift-y, 1))
    color-mix(in srgb, var(--lg-lens-drop) calc(var(--lg-lift, 0) * 100%), transparent);
  transition:
    opacity 140ms ease,
    background-color 140ms ease;
}

.lg-tab-bar[data-lifted] .lg-tab-lens.lg-glass {
  background-color: var(--lg-lens);
  transition-duration: 100ms;
}

.lg-tab-lens::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: var(--lg-selection);
  transition: opacity 140ms ease;
}

.lg-tab-lens[data-pressed]::after {
  opacity: 0.2;
}

.lg-tab-bar[data-lifted] .lg-tab-lens::before {
  opacity: 0;
  transition-duration: 100ms;
}

:is(.lg-tab-bar, .lg-segmented)[data-refracting] .lg-tab-lens.lg-glass {
  background-image: var(--lg-rim, none);
}

/* On a light page (data-light), where a faint lens is lost against light
   glass, the lifted lens stands out as iOS 26.1's does: it drops under the
   labels and bends the bar's glass and the page behind it, where the browser
   can (--lg-filter), and takes iOS's brighter rim. The labels it bends on its
   own, so they bend once. At rest it lies over the labels, as before. */
:is(.lg-tab-bar, .lg-segmented)[data-refracting][data-light] .lg-tab-lens.lg-glass {
  background-image: var(--lg-rim-bright, var(--lg-rim, none));
}

.lg-segmented[data-refracting][data-light] .lg-tab-lens.lg-glass,
.lg-tab-bar[data-under][data-light] .lg-tab-lens.lg-glass {
  z-index: 0;
  -webkit-backdrop-filter: var(--lg-filter, none);
  backdrop-filter: var(--lg-filter, none);
}

/* A tab bar's lens on a light page changes over with its lift, so the
   selected label never changes colour at once: the grey of the selection,
   which lies over the label at rest, fades as the lens lifts (--lg-rest),
   the lens drops under the labels once it's gone (data-under), and only then
   does its fill come in (--lg-under), as its bend does. Settling, the same
   in reverse. */
.lg-tab-bar[data-light] .lg-tab-lens::before {
  opacity: var(--lg-rest, 1);
  transition: none;
}

.lg-tab-bar[data-light] .lg-tab-lens.lg-glass {
  background-color: color-mix(in srgb, var(--lg-lens) calc(var(--lg-under, 0) * 100%), transparent);
  transition: opacity 140ms ease;
}

:is(.lg-tab-bar, .lg-segmented)[data-hidden] :is(.lg-tab-lens, .lg-tab-tint, .lg-segmented-thumb),
:is(.lg-tab-bar, .lg-segmented):not([data-ready]):not(:has([data-selected])) :is(.lg-tab-lens, .lg-tab-tint, .lg-segmented-thumb) {
  opacity: 0;
}

/* Segmented control, sized as iOS 26.1's, measured from UIKit: a 32px
   capsule, segments of 13px labels, and under the selected one a thumb inset
   2px on every side. Held, the thumb fades and the lens lifts in its place,
   24px wider and 16px taller. Its track is the tab bar's glass. On a light
   page it's tinted with iOS's track fill (--lg-segment-track), or the white
   thumb would vanish against a white page; on a dark one it's the glass
   alone, exactly as the tab bar's. */
.lg-segmented {
  --lg-tab-width: 84px;
  --lg-tab-height: 32px;
  --lg-tab-inset: 0px;
  --lg-thumb-inset: 2px;
  --lg-lens-grow-x: 24px;
  --lg-lens-grow-y: 16px;
  --lg-tab-selected: var(--lg-segment-label);
  position: relative;
  display: inline-flex;
  border-radius: calc(var(--lg-tab-height) / 2);
  touch-action: pan-y;
  -webkit-tap-highlight-color: transparent;
  user-select: none;
  -webkit-user-select: none;
}

.lg-segmented > .lg-tab-bar-glass {
  background-image: var(--lg-rim, none), linear-gradient(var(--lg-segment-track) 0 0);
}

.lg-segmented :is(.lg-tab, .lg-tab-copy) {
  font-size: 13px;
}

/* Every label in full colour, the selected one in medium, as UIKit sets it.
   With no colour to change under the thumb, there's no tint: a second copy
   of a label drawn over it would thicken it. */
.lg-segmented .lg-tab,
.lg-segmented .lg-tab:hover {
  color: var(--lg-segment-label);
}

.lg-segmented :is(.lg-tab, .lg-tab-copy)[data-selected] {
  font-weight: 500;
}

.lg-segmented .lg-tab-tint {
  display: none;
}

.lg-segmented-thumb {
  background: var(--lg-segment-thumb);
}

.lg-segmented[data-lifted] .lg-segmented-thumb {
  opacity: 0;
  transition-duration: 100ms;
}

.lg-segmented .lg-tab-lens::before {
  content: none;
}

.lg-segmented[data-lifted] .lg-tab-lens.lg-glass {
  background-color: var(--lg-segment-lens);
  transition-duration: 100ms;
}

/* Input */

.lg-input {
  display: flex;
  align-items: center;
  gap: 10px;
  box-sizing: border-box;
  width: 100%;
  max-width: 360px;
  height: 40px;
  padding: 0 14px;
  border-radius: 20px;
  color: var(--lg-foreground);
  transition: background-color 200ms ease;
}

.lg-input:focus-within {
  background-color: var(--lg-glass-active);
}

.lg-input input {
  flex: 1;
  min-width: 0;
  height: 100%;
  padding: 0;
  border: 0;
  outline: 0;
  color: inherit;
  background: none;
  font: inherit;
  font-size: 14px;
}

.lg-input input::placeholder {
  color: var(--lg-muted);
}

.lg-input input::-webkit-search-cancel-button {
  display: none;
}

.lg-input-icon {
  flex: none;
  width: 16px;
  height: 16px;
  color: var(--lg-muted);
}

.lg-input-icon {
  display: grid;
  place-items: center;
}

.lg-input-icon > svg {
  width: 100%;
  height: 100%;
}

.lg-input-clear {
  display: grid;
  flex: none;
  place-items: center;
  width: 32px;
  height: 32px;
  margin-right: -8px;
  padding: 0;
  border: 0;
  border-radius: 50%;
  color: var(--lg-muted);
  background: none;
  cursor: pointer;
}

.lg-input-clear svg {
  width: 14px;
  height: 14px;
}

.lg-input:has(input:disabled) {
  opacity: 0.35;
}

/* Switch and slider thumbs */

/* At rest, a white knob. Held, it lifts into clear glass, a lens that bends the
   track under its rim (see lens.ts), so the blur and brightening clear as it
   lifts and the track shows through true, all but a little frost:
   --lg-thumb-frost, the blur kept on the lifted glass. */
.lg-switch-thumb,
.lg-slider-thumb {
  --lg-settled: calc(1 - var(--lg-lift, 0));
  --lg-thumb-blur: calc(2px * var(--lg-settled) + var(--lg-thumb-frost, 0.5px) * var(--lg-lift, 0));
  position: absolute;
  border-radius: 999px;
  pointer-events: none;
  -webkit-backdrop-filter: blur(var(--lg-thumb-blur)) brightness(calc(1 + 0.15 * var(--lg-settled))) saturate(1.5);
  backdrop-filter: blur(var(--lg-thumb-blur)) brightness(calc(1 + 0.15 * var(--lg-settled))) saturate(1.5);
  box-shadow:
    0 6px 24px rgb(0 0 0 / 0.2),
    inset 0 0 0 1.5px rgb(255 255 255 / 0.5),
    inset 0 2px 1px rgb(255 255 255 / 0.45),
    inset 2px 7px 24px rgb(0 0 0 / 0.09),
    inset -2px -7px 24px rgb(255 255 255 / 0.16);
}

.lg-thumb-face {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: #fff;
}

/* Switch */

.lg-switch {
  --lg-scale: 0.375;
  position: relative;
  flex: none;
  width: calc(160px * var(--lg-scale));
  height: calc(67px * var(--lg-scale));
  padding: 0;
  border: 0;
  border-radius: 999px;
  background: none;
  cursor: pointer;
  touch-action: pan-y;
  -webkit-tap-highlight-color: transparent;
}


.lg-switch::before {
  content: "";
  position: absolute;
  inset: min(0px, calc((67px * var(--lg-scale) - 44px) / 2)) -8px;
}

/* What the lifted thumb refracts: the track, with room around it for the
   whole lens, since Safari paints none of a filter outside its element. */
.lg-switch-bed {
  position: absolute;
  inset: -6px -12px;
  pointer-events: none;
}

.lg-switch-track,
.lg-switch-fill {
  position: absolute;
  border-radius: 999px;
}

.lg-switch-track {
  inset: 6px 12px;
  background: var(--lg-track);
}

.lg-switch-fill {
  inset: 0;
  background: var(--lg-on);
  opacity: 0;
}

/* What the lifted thumb shows in place of the track: the track as Aave's
   switch draws it, a little smaller so the glass rings it, growing as the
   thumb does. It's seen only through the thumb (see lens.ts). */
.lg-switch-inset {
  visibility: hidden;
}

/* Centred by margins rather than a transform: WebKit sizes a filter's box by
   its content's untransformed layout, so nothing may sit past it even before
   a transform moves it back. */
.lg-switch-inset .lg-switch-track {
  inset: 0;
  width: calc((100% - 24px) * (0.85 + 0.1 * var(--lg-lift, 0)));
  height: calc((100% - 12px) * 0.75 * (0.525 + 0.45 * var(--lg-lift, 0)));
  margin: auto;
}

.lg-switch-thumb {
  top: 50%;
  left: calc(-21.95px * var(--lg-scale));
  width: calc(146px * var(--lg-scale));
  height: calc(92px * var(--lg-scale));
  transform: translate(0, -50%) scale(0.65);
}

.lg-switch[aria-checked="true"] .lg-switch-fill {
  opacity: 1;
}

.lg-switch[aria-checked="true"] .lg-switch-thumb {
  transform: translate(calc(57.9px * var(--lg-scale)), -50%) scale(0.65);
}

.lg-switch:disabled {
  opacity: 0.35;
  cursor: default;
}

/* Slider */

.lg-slider {
  position: relative;
  width: 100%;
  height: 40px;
}

/* What the lifted thumb refracts, with room around the track for the whole lens. */
.lg-slider-bed {
  position: absolute;
  inset: -4px -16px;
  pointer-events: none;
}

.lg-slider-track {
  position: absolute;
  inset: 21px 16px auto;
  height: 6px;
  border-radius: 3px;
  background: var(--lg-rail);
}

/* Ends under the middle of the thumb, where a lifted thumb shows it. It's
   rounded rather than clipped by the track, since Safari can't refract
   content clipped round its corners. */
.lg-slider-fill {
  display: block;
  width: calc((100% - 36px) * var(--lg-progress) + 18px);
  height: 100%;
  border-radius: inherit;
  background: var(--lg-fill);
}

/* What the lifted thumb shows in place of the track: the track as Aave's
   slider draws it, a little thicker as if magnified, growing as the thumb
   does. It's
   seen only through the thumb (see lens.ts). --lg-slider-line sets how thick
   it is once the thumb is fully lifted, and --lg-slider-bend how far the
   thumb's rim bends it. */
.lg-slider-magnified {
  visibility: hidden;
}

.lg-slider-magnified .lg-slider-track {
  inset: 0 16px;
  height: calc(var(--lg-slider-line, 8px) * (0.6 + 0.4 * var(--lg-lift, 0)));
  margin: auto 0;
  border-radius: 999px;
}

/* Within a few pixels of either end, the fill gives way from the middle of
   the thumb to the end of the track, so through the thumb an empty slider
   shows no fill and a full one no bare track. */
.lg-slider-magnified .lg-slider-fill {
  --lg-travel: calc((100% - 36px) * var(--lg-progress));
  width: calc(
    var(--lg-travel) + min(18px, var(--lg-travel) * 4) + max(0px, 18px - (100% - 36px - var(--lg-travel)) * 4)
  );
}

.lg-slider-thumb {
  top: 0;
  left: calc((100% - 36px) * var(--lg-progress) - 12px);
  width: 60px;
  height: 40px;
  scale: 0.6;
}

.lg-slider input {
  position: relative;
  z-index: 1;
  display: block;
  width: 100%;
  height: 40px;
  margin: 0;
  background: transparent;
  outline: none;
  cursor: pointer;
  appearance: none;
  -webkit-appearance: none;
  touch-action: pan-y;
  -webkit-tap-highlight-color: transparent;
}

.lg-slider input::-webkit-slider-runnable-track {
  height: 6px;
  background: transparent;
}

/* The native thumb only takes the touch; the glass thumb is drawn beneath.
   iOS shades the native one even without its appearance, so hide it. */
.lg-slider input::-webkit-slider-thumb {
  width: 36px;
  height: 40px;
  margin-top: -17px;
  border: 0;
  background: transparent;
  box-shadow: none;
  opacity: 0;
  /* A touch on the thumb drags it rather than scrolling the page; the rest of
     the track still scrolls. Blocking touchmove instead would stop Safari's
     own drag. */
  touch-action: none;
  appearance: none;
  -webkit-appearance: none;
}

.lg-slider input::-moz-range-track {
  height: 6px;
  background: transparent;
}

.lg-slider input::-moz-range-thumb {
  width: 36px;
  height: 40px;
  border: 0;
  background: transparent;
  box-shadow: none;
  opacity: 0;
}

.lg-slider:has(input:focus-visible) .lg-slider-thumb {
  outline: 2px solid var(--lg-ring);
  outline-offset: 3px;
}

.lg-slider:has(input:disabled) {
  opacity: 0.35;
}

.lg-slider input:disabled {
  cursor: default;
}

/* Menu */

.lg-menu {
  position: relative;
  display: inline-flex;
}

.lg-menu-card {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 10;
  box-sizing: border-box;
  width: 200px;
  border-radius: 20px;
  color: var(--lg-foreground);
  font-size: 14px;
  transform-origin: calc(100% - 20px) 20px;
  touch-action: none;
  user-select: none;
  -webkit-user-select: none;
}

.lg-menu-card[data-align="start"] {
  right: auto;
  left: 0;
  transform-origin: 20px 20px;
}

.lg-menu-card[data-phase="leaving"] {
  pointer-events: none;
}

.lg-menu-surface {
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  border-radius: inherit;
  background: var(--lg-surface);
  -webkit-backdrop-filter: blur(22px) saturate(1.9);
  backdrop-filter: blur(22px) saturate(1.9);
  box-shadow:
    inset 0 0 0 0.5px var(--lg-surface-edge),
    0 12px 40px var(--lg-shadow);
  pointer-events: none;
}

.lg-menu-card[data-align="start"] .lg-menu-surface {
  right: auto;
  left: 0;
}

.lg-menu-glyph {
  position: absolute;
  top: 0;
  right: 0;
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  pointer-events: none;
}

.lg-menu-card[data-align="start"] .lg-menu-glyph {
  right: auto;
  left: 0;
}

.lg-menu-glyph > svg {
  width: 20px;
  height: 20px;
}

.lg-menu-content {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 6px;
}

.lg-menu-card::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
  background: linear-gradient(135deg, rgb(255 255 255 / 0.11), rgb(255 255 255 / 0.025));
  opacity: 0;
  transition: opacity 120ms ease-out;
}

.lg-menu-card[data-pressed]::after {
  opacity: 1;
}

.lg-menu-plate {
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 14px;
  background: var(--lg-highlight);
  opacity: 0;
  pointer-events: none;
  transition:
    transform 100ms cubic-bezier(0.2, 0.8, 0.2, 1),
    opacity 80ms ease-out;
}

.lg-menu-item {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 10px;
  min-height: 32px;
  padding: 6px 12px;
  border: 0;
  border-radius: 14px;
  color: inherit;
  background: transparent;
  font: inherit;
  text-align: left;
  cursor: pointer;
}

.lg-menu-item > svg {
  flex: none;
  width: 16px;
  height: 16px;
}

.lg-menu-item:focus-visible {
  outline-offset: -2px;
  background: var(--lg-highlight);
}

@media (hover: hover) and (pointer: fine) {
  .lg-menu-item:hover:not(:disabled) {
    background: var(--lg-highlight);
  }
}

.lg-menu-card[data-scrubbing] .lg-menu-item {
  background: transparent;
  outline: none;
}

.lg-menu-item[data-destructive] {
  color: var(--lg-destructive);
}

.lg-menu-item:disabled {
  opacity: 0.38;
  cursor: default;
}

.lg-menu-separator {
  flex: none;
  margin: 7px 11px;
  border-top: 0.5px solid var(--lg-separator);
}

@media (prefers-reduced-motion: reduce) {
  .lg-menu-plate {
    transition: opacity 80ms ease-out;
  }

  .lg-menu-card {
    animation: lg-menu-fade 100ms ease-out;
  }
}

@keyframes lg-menu-fade {
  from {
    opacity: 0;
  }
}` }, "/vendor/react.js": { "type": "text/javascript; charset=utf-8", "body": `/*!
 * main.react.js - React 18.3.1 (UMD, production build), unmodified copy
 *
 * Copyright (c) Facebook, Inc. and its affiliates (Meta Platforms, Inc.)
 * Original project: https://github.com/facebook/react (MIT License)
 *
 * CDN USAGE POLICY (fastcdn.cosverses.com)
 * This code is open source under the MIT License. You may copy it and use it on your own
 * website, served from your own server or CDN, provided you keep the notices in this header.
 * Copying the code does NOT grant the right to load it from the COSVerses CDN. Loading any
 * file from fastcdn.cosverses.com on a website we have not authorized is prohibited; we may
 * block such use and pursue legal remedies. If you copy this file, replace any
 * fastcdn.cosverses.com URLs inside it with your own.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this
 * software and associated documentation files (the "Software"), to deal in the Software
 * without restriction, including without limitation the rights to use, copy, modify, merge,
 * publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons
 * to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or
 * substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
 * PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE
 * FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
 * OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
(function(){'use strict';(function(c,x){"object"===typeof exports&&"undefined"!==typeof module?x(exports):"function"===typeof define&&define.amd?define(["exports"],x):(c=c||self,x(c.React={}))})(this,function(c){function x(a){if(null===a||"object"!==typeof a)return null;a=V&&a[V]||a["@@iterator"];return"function"===typeof a?a:null}function w(a,b,e){this.props=a;this.context=b;this.refs=W;this.updater=e||X}function Y(){}function K(a,b,e){this.props=a;this.context=b;this.refs=W;this.updater=e||X}function Z(a,b,
e){var m,d={},c=null,h=null;if(null!=b)for(m in void 0!==b.ref&&(h=b.ref),void 0!==b.key&&(c=""+b.key),b)aa.call(b,m)&&!ba.hasOwnProperty(m)&&(d[m]=b[m]);var l=arguments.length-2;if(1===l)d.children=e;else if(1<l){for(var f=Array(l),k=0;k<l;k++)f[k]=arguments[k+2];d.children=f}if(a&&a.defaultProps)for(m in l=a.defaultProps,l)void 0===d[m]&&(d[m]=l[m]);return{$$typeof:y,type:a,key:c,ref:h,props:d,_owner:L.current}}function oa(a,b){return{$$typeof:y,type:a.type,key:b,ref:a.ref,props:a.props,_owner:a._owner}}
function M(a){return"object"===typeof a&&null!==a&&a.$$typeof===y}function pa(a){var b={"=":"=0",":":"=2"};return"$"+a.replace(/[=:]/g,function(a){return b[a]})}function N(a,b){return"object"===typeof a&&null!==a&&null!=a.key?pa(""+a.key):b.toString(36)}function B(a,b,e,m,d){var c=typeof a;if("undefined"===c||"boolean"===c)a=null;var h=!1;if(null===a)h=!0;else switch(c){case "string":case "number":h=!0;break;case "object":switch(a.$$typeof){case y:case qa:h=!0}}if(h)return h=a,d=d(h),a=""===m?"."+
N(h,0):m,ca(d)?(e="",null!=a&&(e=a.replace(da,"$&/")+"/"),B(d,b,e,"",function(a){return a})):null!=d&&(M(d)&&(d=oa(d,e+(!d.key||h&&h.key===d.key?"":(""+d.key).replace(da,"$&/")+"/")+a)),b.push(d)),1;h=0;m=""===m?".":m+":";if(ca(a))for(var l=0;l<a.length;l++){c=a[l];var f=m+N(c,l);h+=B(c,b,e,f,d)}else if(f=x(a),"function"===typeof f)for(a=f.call(a),l=0;!(c=a.next()).done;)c=c.value,f=m+N(c,l++),h+=B(c,b,e,f,d);else if("object"===c)throw b=String(a),Error("Objects are not valid as a React child (found: "+
("[object Object]"===b?"object with keys {"+Object.keys(a).join(", ")+"}":b)+"). If you meant to render a collection of children, use an array instead.");return h}function C(a,b,e){if(null==a)return a;var c=[],d=0;B(a,c,"","",function(a){return b.call(e,a,d++)});return c}function ra(a){if(-1===a._status){var b=a._result;b=b();b.then(function(b){if(0===a._status||-1===a._status)a._status=1,a._result=b},function(b){if(0===a._status||-1===a._status)a._status=2,a._result=b});-1===a._status&&(a._status=
0,a._result=b)}if(1===a._status)return a._result.default;throw a._result;}function O(a,b){var e=a.length;a.push(b);a:for(;0<e;){var c=e-1>>>1,d=a[c];if(0<D(d,b))a[c]=b,a[e]=d,e=c;else break a}}function p(a){return 0===a.length?null:a[0]}function E(a){if(0===a.length)return null;var b=a[0],e=a.pop();if(e!==b){a[0]=e;a:for(var c=0,d=a.length,k=d>>>1;c<k;){var h=2*(c+1)-1,l=a[h],f=h+1,g=a[f];if(0>D(l,e))f<d&&0>D(g,l)?(a[c]=g,a[f]=e,c=f):(a[c]=l,a[h]=e,c=h);else if(f<d&&0>D(g,e))a[c]=g,a[f]=e,c=f;else break a}}return b}
function D(a,b){var c=a.sortIndex-b.sortIndex;return 0!==c?c:a.id-b.id}function P(a){for(var b=p(r);null!==b;){if(null===b.callback)E(r);else if(b.startTime<=a)E(r),b.sortIndex=b.expirationTime,O(q,b);else break;b=p(r)}}function Q(a){z=!1;P(a);if(!u)if(null!==p(q))u=!0,R(S);else{var b=p(r);null!==b&&T(Q,b.startTime-a)}}function S(a,b){u=!1;z&&(z=!1,ea(A),A=-1);F=!0;var c=k;try{P(b);for(n=p(q);null!==n&&(!(n.expirationTime>b)||a&&!fa());){var m=n.callback;if("function"===typeof m){n.callback=null;
k=n.priorityLevel;var d=m(n.expirationTime<=b);b=v();"function"===typeof d?n.callback=d:n===p(q)&&E(q);P(b)}else E(q);n=p(q)}if(null!==n)var g=!0;else{var h=p(r);null!==h&&T(Q,h.startTime-b);g=!1}return g}finally{n=null,k=c,F=!1}}function fa(){return v()-ha<ia?!1:!0}function R(a){G=a;H||(H=!0,I())}function T(a,b){A=ja(function(){a(v())},b)}function ka(a){throw Error("act(...) is not supported in production builds of React.");}var y=Symbol.for("react.element"),qa=Symbol.for("react.portal"),sa=Symbol.for("react.fragment"),
ta=Symbol.for("react.strict_mode"),ua=Symbol.for("react.profiler"),va=Symbol.for("react.provider"),wa=Symbol.for("react.context"),xa=Symbol.for("react.forward_ref"),ya=Symbol.for("react.suspense"),za=Symbol.for("react.memo"),Aa=Symbol.for("react.lazy"),V=Symbol.iterator,X={isMounted:function(a){return!1},enqueueForceUpdate:function(a,b,c){},enqueueReplaceState:function(a,b,c,m){},enqueueSetState:function(a,b,c,m){}},la=Object.assign,W={};w.prototype.isReactComponent={};w.prototype.setState=function(a,
b){if("object"!==typeof a&&"function"!==typeof a&&null!=a)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,a,b,"setState")};w.prototype.forceUpdate=function(a){this.updater.enqueueForceUpdate(this,a,"forceUpdate")};Y.prototype=w.prototype;var t=K.prototype=new Y;t.constructor=K;la(t,w.prototype);t.isPureReactComponent=!0;var ca=Array.isArray,aa=Object.prototype.hasOwnProperty,L={current:null},
ba={key:!0,ref:!0,__self:!0,__source:!0},da=/\\/+/g,g={current:null},J={transition:null};if("object"===typeof performance&&"function"===typeof performance.now){var Ba=performance;var v=function(){return Ba.now()}}else{var ma=Date,Ca=ma.now();v=function(){return ma.now()-Ca}}var q=[],r=[],Da=1,n=null,k=3,F=!1,u=!1,z=!1,ja="function"===typeof setTimeout?setTimeout:null,ea="function"===typeof clearTimeout?clearTimeout:null,na="undefined"!==typeof setImmediate?setImmediate:null;"undefined"!==typeof navigator&&
void 0!==navigator.scheduling&&void 0!==navigator.scheduling.isInputPending&&navigator.scheduling.isInputPending.bind(navigator.scheduling);var H=!1,G=null,A=-1,ia=5,ha=-1,U=function(){if(null!==G){var a=v();ha=a;var b=!0;try{b=G(!0,a)}finally{b?I():(H=!1,G=null)}}else H=!1};if("function"===typeof na)var I=function(){na(U)};else if("undefined"!==typeof MessageChannel){t=new MessageChannel;var Ea=t.port2;t.port1.onmessage=U;I=function(){Ea.postMessage(null)}}else I=function(){ja(U,0)};t={ReactCurrentDispatcher:g,
ReactCurrentOwner:L,ReactCurrentBatchConfig:J,Scheduler:{__proto__:null,unstable_ImmediatePriority:1,unstable_UserBlockingPriority:2,unstable_NormalPriority:3,unstable_IdlePriority:5,unstable_LowPriority:4,unstable_runWithPriority:function(a,b){switch(a){case 1:case 2:case 3:case 4:case 5:break;default:a=3}var c=k;k=a;try{return b()}finally{k=c}},unstable_next:function(a){switch(k){case 1:case 2:case 3:var b=3;break;default:b=k}var c=k;k=b;try{return a()}finally{k=c}},unstable_scheduleCallback:function(a,
b,c){var e=v();"object"===typeof c&&null!==c?(c=c.delay,c="number"===typeof c&&0<c?e+c:e):c=e;switch(a){case 1:var d=-1;break;case 2:d=250;break;case 5:d=1073741823;break;case 4:d=1E4;break;default:d=5E3}d=c+d;a={id:Da++,callback:b,priorityLevel:a,startTime:c,expirationTime:d,sortIndex:-1};c>e?(a.sortIndex=c,O(r,a),null===p(q)&&a===p(r)&&(z?(ea(A),A=-1):z=!0,T(Q,c-e))):(a.sortIndex=d,O(q,a),u||F||(u=!0,R(S)));return a},unstable_cancelCallback:function(a){a.callback=null},unstable_wrapCallback:function(a){var b=
k;return function(){var c=k;k=b;try{return a.apply(this,arguments)}finally{k=c}}},unstable_getCurrentPriorityLevel:function(){return k},unstable_shouldYield:fa,unstable_requestPaint:function(){},unstable_continueExecution:function(){u||F||(u=!0,R(S))},unstable_pauseExecution:function(){},unstable_getFirstCallbackNode:function(){return p(q)},get unstable_now(){return v},unstable_forceFrameRate:function(a){0>a||125<a?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):
ia=0<a?Math.floor(1E3/a):5},unstable_Profiling:null}};c.Children={map:C,forEach:function(a,b,c){C(a,function(){b.apply(this,arguments)},c)},count:function(a){var b=0;C(a,function(){b++});return b},toArray:function(a){return C(a,function(a){return a})||[]},only:function(a){if(!M(a))throw Error("React.Children.only expected to receive a single React element child.");return a}};c.Component=w;c.Fragment=sa;c.Profiler=ua;c.PureComponent=K;c.StrictMode=ta;c.Suspense=ya;c.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=
t;c.act=ka;c.cloneElement=function(a,b,c){if(null===a||void 0===a)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+a+".");var e=la({},a.props),d=a.key,k=a.ref,h=a._owner;if(null!=b){void 0!==b.ref&&(k=b.ref,h=L.current);void 0!==b.key&&(d=""+b.key);if(a.type&&a.type.defaultProps)var l=a.type.defaultProps;for(f in b)aa.call(b,f)&&!ba.hasOwnProperty(f)&&(e[f]=void 0===b[f]&&void 0!==l?l[f]:b[f])}var f=arguments.length-2;if(1===f)e.children=c;else if(1<f){l=
Array(f);for(var g=0;g<f;g++)l[g]=arguments[g+2];e.children=l}return{$$typeof:y,type:a.type,key:d,ref:k,props:e,_owner:h}};c.createContext=function(a){a={$$typeof:wa,_currentValue:a,_currentValue2:a,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null};a.Provider={$$typeof:va,_context:a};return a.Consumer=a};c.createElement=Z;c.createFactory=function(a){var b=Z.bind(null,a);b.type=a;return b};c.createRef=function(){return{current:null}};c.forwardRef=function(a){return{$$typeof:xa,
render:a}};c.isValidElement=M;c.lazy=function(a){return{$$typeof:Aa,_payload:{_status:-1,_result:a},_init:ra}};c.memo=function(a,b){return{$$typeof:za,type:a,compare:void 0===b?null:b}};c.startTransition=function(a,b){b=J.transition;J.transition={};try{a()}finally{J.transition=b}};c.unstable_act=ka;c.useCallback=function(a,b){return g.current.useCallback(a,b)};c.useContext=function(a){return g.current.useContext(a)};c.useDebugValue=function(a,b){};c.useDeferredValue=function(a){return g.current.useDeferredValue(a)};
c.useEffect=function(a,b){return g.current.useEffect(a,b)};c.useId=function(){return g.current.useId()};c.useImperativeHandle=function(a,b,c){return g.current.useImperativeHandle(a,b,c)};c.useInsertionEffect=function(a,b){return g.current.useInsertionEffect(a,b)};c.useLayoutEffect=function(a,b){return g.current.useLayoutEffect(a,b)};c.useMemo=function(a,b){return g.current.useMemo(a,b)};c.useReducer=function(a,b,c){return g.current.useReducer(a,b,c)};c.useRef=function(a){return g.current.useRef(a)};
c.useState=function(a){return g.current.useState(a)};c.useSyncExternalStore=function(a,b,c){return g.current.useSyncExternalStore(a,b,c)};c.useTransition=function(){return g.current.useTransition()};c.version="18.3.1"});
})();
` }, "/vendor/react-dom.js": { "type": "text/javascript; charset=utf-8", "body": `/*!
 * main.react-dom.js - ReactDOM 18.3.1 (UMD, production build), unmodified copy
 *
 * Copyright (c) Facebook, Inc. and its affiliates (Meta Platforms, Inc.)
 * Original project: https://github.com/facebook/react (MIT License)
 *
 * CDN USAGE POLICY (fastcdn.cosverses.com)
 * This code is open source under the MIT License. You may copy it and use it on your own
 * website, served from your own server or CDN, provided you keep the notices in this header.
 * Copying the code does NOT grant the right to load it from the COSVerses CDN. Loading any
 * file from fastcdn.cosverses.com on a website we have not authorized is prohibited; we may
 * block such use and pursue legal remedies. If you copy this file, replace any
 * fastcdn.cosverses.com URLs inside it with your own.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this
 * software and associated documentation files (the "Software"), to deal in the Software
 * without restriction, including without limitation the rights to use, copy, modify, merge,
 * publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons
 * to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or
 * substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
 * PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE
 * FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
 * OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
(function(){/*
 Modernizr 3.0.0pre (Custom Build) | MIT
*/
'use strict';(function(Q,zb){"object"===typeof exports&&"undefined"!==typeof module?zb(exports,require("react")):"function"===typeof define&&define.amd?define(["exports","react"],zb):(Q=Q||self,zb(Q.ReactDOM={},Q.React))})(this,function(Q,zb){function m(a){for(var b="https://reactjs.org/docs/error-decoder.html?invariant="+a,c=1;c<arguments.length;c++)b+="&args[]="+encodeURIComponent(arguments[c]);return"Minified React error #"+a+"; visit "+b+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}
function mb(a,b){Ab(a,b);Ab(a+"Capture",b)}function Ab(a,b){$b[a]=b;for(a=0;a<b.length;a++)cg.add(b[a])}function bj(a){if(Zd.call(dg,a))return!0;if(Zd.call(eg,a))return!1;if(cj.test(a))return dg[a]=!0;eg[a]=!0;return!1}function dj(a,b,c,d){if(null!==c&&0===c.type)return!1;switch(typeof b){case "function":case "symbol":return!0;case "boolean":if(d)return!1;if(null!==c)return!c.acceptsBooleans;a=a.toLowerCase().slice(0,5);return"data-"!==a&&"aria-"!==a;default:return!1}}function ej(a,b,c,d){if(null===
b||"undefined"===typeof b||dj(a,b,c,d))return!0;if(d)return!1;if(null!==c)switch(c.type){case 3:return!b;case 4:return!1===b;case 5:return isNaN(b);case 6:return isNaN(b)||1>b}return!1}function Y(a,b,c,d,e,f,g){this.acceptsBooleans=2===b||3===b||4===b;this.attributeName=d;this.attributeNamespace=e;this.mustUseProperty=c;this.propertyName=a;this.type=b;this.sanitizeURL=f;this.removeEmptyString=g}function $d(a,b,c,d){var e=R.hasOwnProperty(b)?R[b]:null;if(null!==e?0!==e.type:d||!(2<b.length)||"o"!==
b[0]&&"O"!==b[0]||"n"!==b[1]&&"N"!==b[1])ej(b,c,e,d)&&(c=null),d||null===e?bj(b)&&(null===c?a.removeAttribute(b):a.setAttribute(b,""+c)):e.mustUseProperty?a[e.propertyName]=null===c?3===e.type?!1:"":c:(b=e.attributeName,d=e.attributeNamespace,null===c?a.removeAttribute(b):(e=e.type,c=3===e||4===e&&!0===c?"":""+c,d?a.setAttributeNS(d,b,c):a.setAttribute(b,c)))}function ac(a){if(null===a||"object"!==typeof a)return null;a=fg&&a[fg]||a["@@iterator"];return"function"===typeof a?a:null}function bc(a,b,
c){if(void 0===ae)try{throw Error();}catch(d){ae=(b=d.stack.trim().match(/\\n( *(at )?)/))&&b[1]||""}return"\\n"+ae+a}function be(a,b){if(!a||ce)return"";ce=!0;var c=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(b)if(b=function(){throw Error();},Object.defineProperty(b.prototype,"props",{set:function(){throw Error();}}),"object"===typeof Reflect&&Reflect.construct){try{Reflect.construct(b,[])}catch(n){var d=n}Reflect.construct(a,[],b)}else{try{b.call()}catch(n){d=n}a.call(b.prototype)}else{try{throw Error();
}catch(n){d=n}a()}}catch(n){if(n&&d&&"string"===typeof n.stack){for(var e=n.stack.split("\\n"),f=d.stack.split("\\n"),g=e.length-1,h=f.length-1;1<=g&&0<=h&&e[g]!==f[h];)h--;for(;1<=g&&0<=h;g--,h--)if(e[g]!==f[h]){if(1!==g||1!==h){do if(g--,h--,0>h||e[g]!==f[h]){var k="\\n"+e[g].replace(" at new "," at ");a.displayName&&k.includes("<anonymous>")&&(k=k.replace("<anonymous>",a.displayName));return k}while(1<=g&&0<=h)}break}}}finally{ce=!1,Error.prepareStackTrace=c}return(a=a?a.displayName||a.name:"")?bc(a):
""}function fj(a){switch(a.tag){case 5:return bc(a.type);case 16:return bc("Lazy");case 13:return bc("Suspense");case 19:return bc("SuspenseList");case 0:case 2:case 15:return a=be(a.type,!1),a;case 11:return a=be(a.type.render,!1),a;case 1:return a=be(a.type,!0),a;default:return""}}function de(a){if(null==a)return null;if("function"===typeof a)return a.displayName||a.name||null;if("string"===typeof a)return a;switch(a){case Bb:return"Fragment";case Cb:return"Portal";case ee:return"Profiler";case fe:return"StrictMode";
case ge:return"Suspense";case he:return"SuspenseList"}if("object"===typeof a)switch(a.$$typeof){case gg:return(a.displayName||"Context")+".Consumer";case hg:return(a._context.displayName||"Context")+".Provider";case ie:var b=a.render;a=a.displayName;a||(a=b.displayName||b.name||"",a=""!==a?"ForwardRef("+a+")":"ForwardRef");return a;case je:return b=a.displayName||null,null!==b?b:de(a.type)||"Memo";case Ta:b=a._payload;a=a._init;try{return de(a(b))}catch(c){}}return null}function gj(a){var b=a.type;
switch(a.tag){case 24:return"Cache";case 9:return(b.displayName||"Context")+".Consumer";case 10:return(b._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return a=b.render,a=a.displayName||a.name||"",b.displayName||(""!==a?"ForwardRef("+a+")":"ForwardRef");case 7:return"Fragment";case 5:return b;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return de(b);case 8:return b===fe?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";
case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if("function"===typeof b)return b.displayName||b.name||null;if("string"===typeof b)return b}return null}function Ua(a){switch(typeof a){case "boolean":case "number":case "string":case "undefined":return a;case "object":return a;default:return""}}function ig(a){var b=a.type;return(a=a.nodeName)&&"input"===a.toLowerCase()&&("checkbox"===b||"radio"===
b)}function hj(a){var b=ig(a)?"checked":"value",c=Object.getOwnPropertyDescriptor(a.constructor.prototype,b),d=""+a[b];if(!a.hasOwnProperty(b)&&"undefined"!==typeof c&&"function"===typeof c.get&&"function"===typeof c.set){var e=c.get,f=c.set;Object.defineProperty(a,b,{configurable:!0,get:function(){return e.call(this)},set:function(a){d=""+a;f.call(this,a)}});Object.defineProperty(a,b,{enumerable:c.enumerable});return{getValue:function(){return d},setValue:function(a){d=""+a},stopTracking:function(){a._valueTracker=
null;delete a[b]}}}}function Pc(a){a._valueTracker||(a._valueTracker=hj(a))}function jg(a){if(!a)return!1;var b=a._valueTracker;if(!b)return!0;var c=b.getValue();var d="";a&&(d=ig(a)?a.checked?"true":"false":a.value);a=d;return a!==c?(b.setValue(a),!0):!1}function Qc(a){a=a||("undefined"!==typeof document?document:void 0);if("undefined"===typeof a)return null;try{return a.activeElement||a.body}catch(b){return a.body}}function ke(a,b){var c=b.checked;return E({},b,{defaultChecked:void 0,defaultValue:void 0,
value:void 0,checked:null!=c?c:a._wrapperState.initialChecked})}function kg(a,b){var c=null==b.defaultValue?"":b.defaultValue,d=null!=b.checked?b.checked:b.defaultChecked;c=Ua(null!=b.value?b.value:c);a._wrapperState={initialChecked:d,initialValue:c,controlled:"checkbox"===b.type||"radio"===b.type?null!=b.checked:null!=b.value}}function lg(a,b){b=b.checked;null!=b&&$d(a,"checked",b,!1)}function le(a,b){lg(a,b);var c=Ua(b.value),d=b.type;if(null!=c)if("number"===d){if(0===c&&""===a.value||a.value!=
c)a.value=""+c}else a.value!==""+c&&(a.value=""+c);else if("submit"===d||"reset"===d){a.removeAttribute("value");return}b.hasOwnProperty("value")?me(a,b.type,c):b.hasOwnProperty("defaultValue")&&me(a,b.type,Ua(b.defaultValue));null==b.checked&&null!=b.defaultChecked&&(a.defaultChecked=!!b.defaultChecked)}function mg(a,b,c){if(b.hasOwnProperty("value")||b.hasOwnProperty("defaultValue")){var d=b.type;if(!("submit"!==d&&"reset"!==d||void 0!==b.value&&null!==b.value))return;b=""+a._wrapperState.initialValue;
c||b===a.value||(a.value=b);a.defaultValue=b}c=a.name;""!==c&&(a.name="");a.defaultChecked=!!a._wrapperState.initialChecked;""!==c&&(a.name=c)}function me(a,b,c){if("number"!==b||Qc(a.ownerDocument)!==a)null==c?a.defaultValue=""+a._wrapperState.initialValue:a.defaultValue!==""+c&&(a.defaultValue=""+c)}function Db(a,b,c,d){a=a.options;if(b){b={};for(var e=0;e<c.length;e++)b["$"+c[e]]=!0;for(c=0;c<a.length;c++)e=b.hasOwnProperty("$"+a[c].value),a[c].selected!==e&&(a[c].selected=e),e&&d&&(a[c].defaultSelected=
!0)}else{c=""+Ua(c);b=null;for(e=0;e<a.length;e++){if(a[e].value===c){a[e].selected=!0;d&&(a[e].defaultSelected=!0);return}null!==b||a[e].disabled||(b=a[e])}null!==b&&(b.selected=!0)}}function ne(a,b){if(null!=b.dangerouslySetInnerHTML)throw Error(m(91));return E({},b,{value:void 0,defaultValue:void 0,children:""+a._wrapperState.initialValue})}function ng(a,b){var c=b.value;if(null==c){c=b.children;b=b.defaultValue;if(null!=c){if(null!=b)throw Error(m(92));if(cc(c)){if(1<c.length)throw Error(m(93));
c=c[0]}b=c}null==b&&(b="");c=b}a._wrapperState={initialValue:Ua(c)}}function og(a,b){var c=Ua(b.value),d=Ua(b.defaultValue);null!=c&&(c=""+c,c!==a.value&&(a.value=c),null==b.defaultValue&&a.defaultValue!==c&&(a.defaultValue=c));null!=d&&(a.defaultValue=""+d)}function pg(a,b){b=a.textContent;b===a._wrapperState.initialValue&&""!==b&&null!==b&&(a.value=b)}function qg(a){switch(a){case "svg":return"http://www.w3.org/2000/svg";case "math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}
function oe(a,b){return null==a||"http://www.w3.org/1999/xhtml"===a?qg(b):"http://www.w3.org/2000/svg"===a&&"foreignObject"===b?"http://www.w3.org/1999/xhtml":a}function rg(a,b,c){return null==b||"boolean"===typeof b||""===b?"":c||"number"!==typeof b||0===b||dc.hasOwnProperty(a)&&dc[a]?(""+b).trim():b+"px"}function sg(a,b){a=a.style;for(var c in b)if(b.hasOwnProperty(c)){var d=0===c.indexOf("--"),e=rg(c,b[c],d);"float"===c&&(c="cssFloat");d?a.setProperty(c,e):a[c]=e}}function pe(a,b){if(b){if(ij[a]&&
(null!=b.children||null!=b.dangerouslySetInnerHTML))throw Error(m(137,a));if(null!=b.dangerouslySetInnerHTML){if(null!=b.children)throw Error(m(60));if("object"!==typeof b.dangerouslySetInnerHTML||!("__html"in b.dangerouslySetInnerHTML))throw Error(m(61));}if(null!=b.style&&"object"!==typeof b.style)throw Error(m(62));}}function qe(a,b){if(-1===a.indexOf("-"))return"string"===typeof b.is;switch(a){case "annotation-xml":case "color-profile":case "font-face":case "font-face-src":case "font-face-uri":case "font-face-format":case "font-face-name":case "missing-glyph":return!1;
default:return!0}}function re(a){a=a.target||a.srcElement||window;a.correspondingUseElement&&(a=a.correspondingUseElement);return 3===a.nodeType?a.parentNode:a}function tg(a){if(a=ec(a)){if("function"!==typeof se)throw Error(m(280));var b=a.stateNode;b&&(b=Rc(b),se(a.stateNode,a.type,b))}}function ug(a){Eb?Fb?Fb.push(a):Fb=[a]:Eb=a}function vg(){if(Eb){var a=Eb,b=Fb;Fb=Eb=null;tg(a);if(b)for(a=0;a<b.length;a++)tg(b[a])}}function wg(a,b,c){if(te)return a(b,c);te=!0;try{return xg(a,b,c)}finally{if(te=
!1,null!==Eb||null!==Fb)yg(),vg()}}function fc(a,b){var c=a.stateNode;if(null===c)return null;var d=Rc(c);if(null===d)return null;c=d[b];a:switch(b){case "onClick":case "onClickCapture":case "onDoubleClick":case "onDoubleClickCapture":case "onMouseDown":case "onMouseDownCapture":case "onMouseMove":case "onMouseMoveCapture":case "onMouseUp":case "onMouseUpCapture":case "onMouseEnter":(d=!d.disabled)||(a=a.type,d=!("button"===a||"input"===a||"select"===a||"textarea"===a));a=!d;break a;default:a=!1}if(a)return null;
if(c&&"function"!==typeof c)throw Error(m(231,b,typeof c));return c}function jj(a,b,c,d,e,f,g,h,k){gc=!1;Sc=null;kj.apply(lj,arguments)}function mj(a,b,c,d,e,f,g,h,k){jj.apply(this,arguments);if(gc){if(gc){var n=Sc;gc=!1;Sc=null}else throw Error(m(198));Tc||(Tc=!0,ue=n)}}function nb(a){var b=a,c=a;if(a.alternate)for(;b.return;)b=b.return;else{a=b;do b=a,0!==(b.flags&4098)&&(c=b.return),a=b.return;while(a)}return 3===b.tag?c:null}function zg(a){if(13===a.tag){var b=a.memoizedState;null===b&&(a=a.alternate,
null!==a&&(b=a.memoizedState));if(null!==b)return b.dehydrated}return null}function Ag(a){if(nb(a)!==a)throw Error(m(188));}function nj(a){var b=a.alternate;if(!b){b=nb(a);if(null===b)throw Error(m(188));return b!==a?null:a}for(var c=a,d=b;;){var e=c.return;if(null===e)break;var f=e.alternate;if(null===f){d=e.return;if(null!==d){c=d;continue}break}if(e.child===f.child){for(f=e.child;f;){if(f===c)return Ag(e),a;if(f===d)return Ag(e),b;f=f.sibling}throw Error(m(188));}if(c.return!==d.return)c=e,d=f;
else{for(var g=!1,h=e.child;h;){if(h===c){g=!0;c=e;d=f;break}if(h===d){g=!0;d=e;c=f;break}h=h.sibling}if(!g){for(h=f.child;h;){if(h===c){g=!0;c=f;d=e;break}if(h===d){g=!0;d=f;c=e;break}h=h.sibling}if(!g)throw Error(m(189));}}if(c.alternate!==d)throw Error(m(190));}if(3!==c.tag)throw Error(m(188));return c.stateNode.current===c?a:b}function Bg(a){a=nj(a);return null!==a?Cg(a):null}function Cg(a){if(5===a.tag||6===a.tag)return a;for(a=a.child;null!==a;){var b=Cg(a);if(null!==b)return b;a=a.sibling}return null}
function oj(a,b){if(Ca&&"function"===typeof Ca.onCommitFiberRoot)try{Ca.onCommitFiberRoot(Uc,a,void 0,128===(a.current.flags&128))}catch(c){}}function pj(a){a>>>=0;return 0===a?32:31-(qj(a)/rj|0)|0}function hc(a){switch(a&-a){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return a&
4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return a&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return a}}function Vc(a,b){var c=a.pendingLanes;if(0===c)return 0;var d=0,e=a.suspendedLanes,f=a.pingedLanes,g=c&268435455;if(0!==g){var h=g&~e;0!==h?d=hc(h):(f&=g,0!==f&&(d=hc(f)))}else g=c&~e,0!==g?d=hc(g):0!==f&&(d=hc(f));if(0===d)return 0;if(0!==b&&b!==d&&0===(b&e)&&
(e=d&-d,f=b&-b,e>=f||16===e&&0!==(f&4194240)))return b;0!==(d&4)&&(d|=c&16);b=a.entangledLanes;if(0!==b)for(a=a.entanglements,b&=d;0<b;)c=31-ta(b),e=1<<c,d|=a[c],b&=~e;return d}function sj(a,b){switch(a){case 1:case 2:case 4:return b+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return b+5E3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;
case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function tj(a,b){for(var c=a.suspendedLanes,d=a.pingedLanes,e=a.expirationTimes,f=a.pendingLanes;0<f;){var g=31-ta(f),h=1<<g,k=e[g];if(-1===k){if(0===(h&c)||0!==(h&d))e[g]=sj(h,b)}else k<=b&&(a.expiredLanes|=h);f&=~h}}function ve(a){a=a.pendingLanes&-1073741825;return 0!==a?a:a&1073741824?1073741824:0}function Dg(){var a=Wc;Wc<<=1;0===(Wc&4194240)&&(Wc=64);return a}function we(a){for(var b=[],c=0;31>c;c++)b.push(a);
return b}function ic(a,b,c){a.pendingLanes|=b;536870912!==b&&(a.suspendedLanes=0,a.pingedLanes=0);a=a.eventTimes;b=31-ta(b);a[b]=c}function uj(a,b){var c=a.pendingLanes&~b;a.pendingLanes=b;a.suspendedLanes=0;a.pingedLanes=0;a.expiredLanes&=b;a.mutableReadLanes&=b;a.entangledLanes&=b;b=a.entanglements;var d=a.eventTimes;for(a=a.expirationTimes;0<c;){var e=31-ta(c),f=1<<e;b[e]=0;d[e]=-1;a[e]=-1;c&=~f}}function xe(a,b){var c=a.entangledLanes|=b;for(a=a.entanglements;c;){var d=31-ta(c),e=1<<d;e&b|a[d]&
b&&(a[d]|=b);c&=~e}}function Eg(a){a&=-a;return 1<a?4<a?0!==(a&268435455)?16:536870912:4:1}function Fg(a,b){switch(a){case "focusin":case "focusout":Va=null;break;case "dragenter":case "dragleave":Wa=null;break;case "mouseover":case "mouseout":Xa=null;break;case "pointerover":case "pointerout":jc.delete(b.pointerId);break;case "gotpointercapture":case "lostpointercapture":kc.delete(b.pointerId)}}function lc(a,b,c,d,e,f){if(null===a||a.nativeEvent!==f)return a={blockedOn:b,domEventName:c,eventSystemFlags:d,
nativeEvent:f,targetContainers:[e]},null!==b&&(b=ec(b),null!==b&&Gg(b)),a;a.eventSystemFlags|=d;b=a.targetContainers;null!==e&&-1===b.indexOf(e)&&b.push(e);return a}function vj(a,b,c,d,e){switch(b){case "focusin":return Va=lc(Va,a,b,c,d,e),!0;case "dragenter":return Wa=lc(Wa,a,b,c,d,e),!0;case "mouseover":return Xa=lc(Xa,a,b,c,d,e),!0;case "pointerover":var f=e.pointerId;jc.set(f,lc(jc.get(f)||null,a,b,c,d,e));return!0;case "gotpointercapture":return f=e.pointerId,kc.set(f,lc(kc.get(f)||null,a,b,
c,d,e)),!0}return!1}function Hg(a){var b=ob(a.target);if(null!==b){var c=nb(b);if(null!==c)if(b=c.tag,13===b){if(b=zg(c),null!==b){a.blockedOn=b;wj(a.priority,function(){xj(c)});return}}else if(3===b&&c.stateNode.current.memoizedState.isDehydrated){a.blockedOn=3===c.tag?c.stateNode.containerInfo:null;return}}a.blockedOn=null}function Xc(a){if(null!==a.blockedOn)return!1;for(var b=a.targetContainers;0<b.length;){var c=ye(a.domEventName,a.eventSystemFlags,b[0],a.nativeEvent);if(null===c){c=a.nativeEvent;
var d=new c.constructor(c.type,c);ze=d;c.target.dispatchEvent(d);ze=null}else return b=ec(c),null!==b&&Gg(b),a.blockedOn=c,!1;b.shift()}return!0}function Ig(a,b,c){Xc(a)&&c.delete(b)}function yj(){Ae=!1;null!==Va&&Xc(Va)&&(Va=null);null!==Wa&&Xc(Wa)&&(Wa=null);null!==Xa&&Xc(Xa)&&(Xa=null);jc.forEach(Ig);kc.forEach(Ig)}function mc(a,b){a.blockedOn===b&&(a.blockedOn=null,Ae||(Ae=!0,Jg(Kg,yj)))}function nc(a){if(0<Yc.length){mc(Yc[0],a);for(var b=1;b<Yc.length;b++){var c=Yc[b];c.blockedOn===a&&(c.blockedOn=
null)}}null!==Va&&mc(Va,a);null!==Wa&&mc(Wa,a);null!==Xa&&mc(Xa,a);b=function(b){return mc(b,a)};jc.forEach(b);kc.forEach(b);for(b=0;b<Ya.length;b++)c=Ya[b],c.blockedOn===a&&(c.blockedOn=null);for(;0<Ya.length&&(b=Ya[0],null===b.blockedOn);)Hg(b),null===b.blockedOn&&Ya.shift()}function zj(a,b,c,d){var e=z,f=Gb.transition;Gb.transition=null;try{z=1,Be(a,b,c,d)}finally{z=e,Gb.transition=f}}function Aj(a,b,c,d){var e=z,f=Gb.transition;Gb.transition=null;try{z=4,Be(a,b,c,d)}finally{z=e,Gb.transition=
f}}function Be(a,b,c,d){if(Zc){var e=ye(a,b,c,d);if(null===e)Ce(a,b,d,$c,c),Fg(a,d);else if(vj(e,a,b,c,d))d.stopPropagation();else if(Fg(a,d),b&4&&-1<Bj.indexOf(a)){for(;null!==e;){var f=ec(e);null!==f&&Cj(f);f=ye(a,b,c,d);null===f&&Ce(a,b,d,$c,c);if(f===e)break;e=f}null!==e&&d.stopPropagation()}else Ce(a,b,d,null,c)}}function ye(a,b,c,d){$c=null;a=re(d);a=ob(a);if(null!==a)if(b=nb(a),null===b)a=null;else if(c=b.tag,13===c){a=zg(b);if(null!==a)return a;a=null}else if(3===c){if(b.stateNode.current.memoizedState.isDehydrated)return 3===
b.tag?b.stateNode.containerInfo:null;a=null}else b!==a&&(a=null);$c=a;return null}function Lg(a){switch(a){case "cancel":case "click":case "close":case "contextmenu":case "copy":case "cut":case "auxclick":case "dblclick":case "dragend":case "dragstart":case "drop":case "focusin":case "focusout":case "input":case "invalid":case "keydown":case "keypress":case "keyup":case "mousedown":case "mouseup":case "paste":case "pause":case "play":case "pointercancel":case "pointerdown":case "pointerup":case "ratechange":case "reset":case "resize":case "seeked":case "submit":case "touchcancel":case "touchend":case "touchstart":case "volumechange":case "change":case "selectionchange":case "textInput":case "compositionstart":case "compositionend":case "compositionupdate":case "beforeblur":case "afterblur":case "beforeinput":case "blur":case "fullscreenchange":case "focus":case "hashchange":case "popstate":case "select":case "selectstart":return 1;
case "drag":case "dragenter":case "dragexit":case "dragleave":case "dragover":case "mousemove":case "mouseout":case "mouseover":case "pointermove":case "pointerout":case "pointerover":case "scroll":case "toggle":case "touchmove":case "wheel":case "mouseenter":case "mouseleave":case "pointerenter":case "pointerleave":return 4;case "message":switch(Dj()){case De:return 1;case Mg:return 4;case ad:case Ej:return 16;case Ng:return 536870912;default:return 16}default:return 16}}function Og(){if(bd)return bd;
var a,b=Ee,c=b.length,d,e="value"in Za?Za.value:Za.textContent,f=e.length;for(a=0;a<c&&b[a]===e[a];a++);var g=c-a;for(d=1;d<=g&&b[c-d]===e[f-d];d++);return bd=e.slice(a,1<d?1-d:void 0)}function cd(a){var b=a.keyCode;"charCode"in a?(a=a.charCode,0===a&&13===b&&(a=13)):a=b;10===a&&(a=13);return 32<=a||13===a?a:0}function dd(){return!0}function Pg(){return!1}function ka(a){function b(b,d,e,f,g){this._reactName=b;this._targetInst=e;this.type=d;this.nativeEvent=f;this.target=g;this.currentTarget=null;
for(var c in a)a.hasOwnProperty(c)&&(b=a[c],this[c]=b?b(f):f[c]);this.isDefaultPrevented=(null!=f.defaultPrevented?f.defaultPrevented:!1===f.returnValue)?dd:Pg;this.isPropagationStopped=Pg;return this}E(b.prototype,{preventDefault:function(){this.defaultPrevented=!0;var a=this.nativeEvent;a&&(a.preventDefault?a.preventDefault():"unknown"!==typeof a.returnValue&&(a.returnValue=!1),this.isDefaultPrevented=dd)},stopPropagation:function(){var a=this.nativeEvent;a&&(a.stopPropagation?a.stopPropagation():
"unknown"!==typeof a.cancelBubble&&(a.cancelBubble=!0),this.isPropagationStopped=dd)},persist:function(){},isPersistent:dd});return b}function Fj(a){var b=this.nativeEvent;return b.getModifierState?b.getModifierState(a):(a=Gj[a])?!!b[a]:!1}function Fe(a){return Fj}function Qg(a,b){switch(a){case "keyup":return-1!==Hj.indexOf(b.keyCode);case "keydown":return 229!==b.keyCode;case "keypress":case "mousedown":case "focusout":return!0;default:return!1}}function Rg(a){a=a.detail;return"object"===typeof a&&
"data"in a?a.data:null}function Ij(a,b){switch(a){case "compositionend":return Rg(b);case "keypress":if(32!==b.which)return null;Sg=!0;return Tg;case "textInput":return a=b.data,a===Tg&&Sg?null:a;default:return null}}function Jj(a,b){if(Hb)return"compositionend"===a||!Ge&&Qg(a,b)?(a=Og(),bd=Ee=Za=null,Hb=!1,a):null;switch(a){case "paste":return null;case "keypress":if(!(b.ctrlKey||b.altKey||b.metaKey)||b.ctrlKey&&b.altKey){if(b.char&&1<b.char.length)return b.char;if(b.which)return String.fromCharCode(b.which)}return null;
case "compositionend":return Ug&&"ko"!==b.locale?null:b.data;default:return null}}function Vg(a){var b=a&&a.nodeName&&a.nodeName.toLowerCase();return"input"===b?!!Kj[a.type]:"textarea"===b?!0:!1}function Lj(a){if(!Ia)return!1;a="on"+a;var b=a in document;b||(b=document.createElement("div"),b.setAttribute(a,"return;"),b="function"===typeof b[a]);return b}function Wg(a,b,c,d){ug(d);b=ed(b,"onChange");0<b.length&&(c=new He("onChange","change",null,c,d),a.push({event:c,listeners:b}))}function Mj(a){Xg(a,
0)}function fd(a){var b=Ib(a);if(jg(b))return a}function Nj(a,b){if("change"===a)return b}function Yg(){oc&&(oc.detachEvent("onpropertychange",Zg),pc=oc=null)}function Zg(a){if("value"===a.propertyName&&fd(pc)){var b=[];Wg(b,pc,a,re(a));wg(Mj,b)}}function Oj(a,b,c){"focusin"===a?(Yg(),oc=b,pc=c,oc.attachEvent("onpropertychange",Zg)):"focusout"===a&&Yg()}function Pj(a,b){if("selectionchange"===a||"keyup"===a||"keydown"===a)return fd(pc)}function Qj(a,b){if("click"===a)return fd(b)}function Rj(a,b){if("input"===
a||"change"===a)return fd(b)}function Sj(a,b){return a===b&&(0!==a||1/a===1/b)||a!==a&&b!==b}function qc(a,b){if(ua(a,b))return!0;if("object"!==typeof a||null===a||"object"!==typeof b||null===b)return!1;var c=Object.keys(a),d=Object.keys(b);if(c.length!==d.length)return!1;for(d=0;d<c.length;d++){var e=c[d];if(!Zd.call(b,e)||!ua(a[e],b[e]))return!1}return!0}function $g(a){for(;a&&a.firstChild;)a=a.firstChild;return a}function ah(a,b){var c=$g(a);a=0;for(var d;c;){if(3===c.nodeType){d=a+c.textContent.length;
if(a<=b&&d>=b)return{node:c,offset:b-a};a=d}a:{for(;c;){if(c.nextSibling){c=c.nextSibling;break a}c=c.parentNode}c=void 0}c=$g(c)}}function bh(a,b){return a&&b?a===b?!0:a&&3===a.nodeType?!1:b&&3===b.nodeType?bh(a,b.parentNode):"contains"in a?a.contains(b):a.compareDocumentPosition?!!(a.compareDocumentPosition(b)&16):!1:!1}function ch(){for(var a=window,b=Qc();b instanceof a.HTMLIFrameElement;){try{var c="string"===typeof b.contentWindow.location.href}catch(d){c=!1}if(c)a=b.contentWindow;else break;
b=Qc(a.document)}return b}function Ie(a){var b=a&&a.nodeName&&a.nodeName.toLowerCase();return b&&("input"===b&&("text"===a.type||"search"===a.type||"tel"===a.type||"url"===a.type||"password"===a.type)||"textarea"===b||"true"===a.contentEditable)}function Tj(a){var b=ch(),c=a.focusedElem,d=a.selectionRange;if(b!==c&&c&&c.ownerDocument&&bh(c.ownerDocument.documentElement,c)){if(null!==d&&Ie(c))if(b=d.start,a=d.end,void 0===a&&(a=b),"selectionStart"in c)c.selectionStart=b,c.selectionEnd=Math.min(a,c.value.length);
else if(a=(b=c.ownerDocument||document)&&b.defaultView||window,a.getSelection){a=a.getSelection();var e=c.textContent.length,f=Math.min(d.start,e);d=void 0===d.end?f:Math.min(d.end,e);!a.extend&&f>d&&(e=d,d=f,f=e);e=ah(c,f);var g=ah(c,d);e&&g&&(1!==a.rangeCount||a.anchorNode!==e.node||a.anchorOffset!==e.offset||a.focusNode!==g.node||a.focusOffset!==g.offset)&&(b=b.createRange(),b.setStart(e.node,e.offset),a.removeAllRanges(),f>d?(a.addRange(b),a.extend(g.node,g.offset)):(b.setEnd(g.node,g.offset),
a.addRange(b)))}b=[];for(a=c;a=a.parentNode;)1===a.nodeType&&b.push({element:a,left:a.scrollLeft,top:a.scrollTop});"function"===typeof c.focus&&c.focus();for(c=0;c<b.length;c++)a=b[c],a.element.scrollLeft=a.left,a.element.scrollTop=a.top}}function dh(a,b,c){var d=c.window===c?c.document:9===c.nodeType?c:c.ownerDocument;Je||null==Jb||Jb!==Qc(d)||(d=Jb,"selectionStart"in d&&Ie(d)?d={start:d.selectionStart,end:d.selectionEnd}:(d=(d.ownerDocument&&d.ownerDocument.defaultView||window).getSelection(),d=
{anchorNode:d.anchorNode,anchorOffset:d.anchorOffset,focusNode:d.focusNode,focusOffset:d.focusOffset}),rc&&qc(rc,d)||(rc=d,d=ed(Ke,"onSelect"),0<d.length&&(b=new He("onSelect","select",null,b,c),a.push({event:b,listeners:d}),b.target=Jb)))}function gd(a,b){var c={};c[a.toLowerCase()]=b.toLowerCase();c["Webkit"+a]="webkit"+b;c["Moz"+a]="moz"+b;return c}function hd(a){if(Le[a])return Le[a];if(!Kb[a])return a;var b=Kb[a],c;for(c in b)if(b.hasOwnProperty(c)&&c in eh)return Le[a]=b[c];return a}function $a(a,
b){fh.set(a,b);mb(b,[a])}function gh(a,b,c){var d=a.type||"unknown-event";a.currentTarget=c;mj(d,b,void 0,a);a.currentTarget=null}function Xg(a,b){b=0!==(b&4);for(var c=0;c<a.length;c++){var d=a[c],e=d.event;d=d.listeners;a:{var f=void 0;if(b)for(var g=d.length-1;0<=g;g--){var h=d[g],k=h.instance,n=h.currentTarget;h=h.listener;if(k!==f&&e.isPropagationStopped())break a;gh(e,h,n);f=k}else for(g=0;g<d.length;g++){h=d[g];k=h.instance;n=h.currentTarget;h=h.listener;if(k!==f&&e.isPropagationStopped())break a;
gh(e,h,n);f=k}}}if(Tc)throw a=ue,Tc=!1,ue=null,a;}function B(a,b){var c=b[Me];void 0===c&&(c=b[Me]=new Set);var d=a+"__bubble";c.has(d)||(hh(b,a,2,!1),c.add(d))}function Ne(a,b,c){var d=0;b&&(d|=4);hh(c,a,d,b)}function sc(a){if(!a[id]){a[id]=!0;cg.forEach(function(b){"selectionchange"!==b&&(Uj.has(b)||Ne(b,!1,a),Ne(b,!0,a))});var b=9===a.nodeType?a:a.ownerDocument;null===b||b[id]||(b[id]=!0,Ne("selectionchange",!1,b))}}function hh(a,b,c,d,e){switch(Lg(b)){case 1:e=zj;break;case 4:e=Aj;break;default:e=
Be}c=e.bind(null,b,c,a);e=void 0;!Oe||"touchstart"!==b&&"touchmove"!==b&&"wheel"!==b||(e=!0);d?void 0!==e?a.addEventListener(b,c,{capture:!0,passive:e}):a.addEventListener(b,c,!0):void 0!==e?a.addEventListener(b,c,{passive:e}):a.addEventListener(b,c,!1)}function Ce(a,b,c,d,e){var f=d;if(0===(b&1)&&0===(b&2)&&null!==d)a:for(;;){if(null===d)return;var g=d.tag;if(3===g||4===g){var h=d.stateNode.containerInfo;if(h===e||8===h.nodeType&&h.parentNode===e)break;if(4===g)for(g=d.return;null!==g;){var k=g.tag;
if(3===k||4===k)if(k=g.stateNode.containerInfo,k===e||8===k.nodeType&&k.parentNode===e)return;g=g.return}for(;null!==h;){g=ob(h);if(null===g)return;k=g.tag;if(5===k||6===k){d=f=g;continue a}h=h.parentNode}}d=d.return}wg(function(){var d=f,e=re(c),g=[];a:{var h=fh.get(a);if(void 0!==h){var k=He,m=a;switch(a){case "keypress":if(0===cd(c))break a;case "keydown":case "keyup":k=Vj;break;case "focusin":m="focus";k=Pe;break;case "focusout":m="blur";k=Pe;break;case "beforeblur":case "afterblur":k=Pe;break;
case "click":if(2===c.button)break a;case "auxclick":case "dblclick":case "mousedown":case "mousemove":case "mouseup":case "mouseout":case "mouseover":case "contextmenu":k=ih;break;case "drag":case "dragend":case "dragenter":case "dragexit":case "dragleave":case "dragover":case "dragstart":case "drop":k=Wj;break;case "touchcancel":case "touchend":case "touchmove":case "touchstart":k=Xj;break;case jh:case kh:case lh:k=Yj;break;case mh:k=Zj;break;case "scroll":k=ak;break;case "wheel":k=bk;break;case "copy":case "cut":case "paste":k=
ck;break;case "gotpointercapture":case "lostpointercapture":case "pointercancel":case "pointerdown":case "pointermove":case "pointerout":case "pointerover":case "pointerup":k=nh}var l=0!==(b&4),p=!l&&"scroll"===a,w=l?null!==h?h+"Capture":null:h;l=[];for(var A=d,t;null!==A;){t=A;var M=t.stateNode;5===t.tag&&null!==M&&(t=M,null!==w&&(M=fc(A,w),null!=M&&l.push(tc(A,M,t))));if(p)break;A=A.return}0<l.length&&(h=new k(h,m,null,c,e),g.push({event:h,listeners:l}))}}if(0===(b&7)){a:{h="mouseover"===a||"pointerover"===
a;k="mouseout"===a||"pointerout"===a;if(h&&c!==ze&&(m=c.relatedTarget||c.fromElement)&&(ob(m)||m[Ja]))break a;if(k||h){h=e.window===e?e:(h=e.ownerDocument)?h.defaultView||h.parentWindow:window;if(k){if(m=c.relatedTarget||c.toElement,k=d,m=m?ob(m):null,null!==m&&(p=nb(m),m!==p||5!==m.tag&&6!==m.tag))m=null}else k=null,m=d;if(k!==m){l=ih;M="onMouseLeave";w="onMouseEnter";A="mouse";if("pointerout"===a||"pointerover"===a)l=nh,M="onPointerLeave",w="onPointerEnter",A="pointer";p=null==k?h:Ib(k);t=null==
m?h:Ib(m);h=new l(M,A+"leave",k,c,e);h.target=p;h.relatedTarget=t;M=null;ob(e)===d&&(l=new l(w,A+"enter",m,c,e),l.target=t,l.relatedTarget=p,M=l);p=M;if(k&&m)b:{l=k;w=m;A=0;for(t=l;t;t=Lb(t))A++;t=0;for(M=w;M;M=Lb(M))t++;for(;0<A-t;)l=Lb(l),A--;for(;0<t-A;)w=Lb(w),t--;for(;A--;){if(l===w||null!==w&&l===w.alternate)break b;l=Lb(l);w=Lb(w)}l=null}else l=null;null!==k&&oh(g,h,k,l,!1);null!==m&&null!==p&&oh(g,p,m,l,!0)}}}a:{h=d?Ib(d):window;k=h.nodeName&&h.nodeName.toLowerCase();if("select"===k||"input"===
k&&"file"===h.type)var ma=Nj;else if(Vg(h))if(ph)ma=Rj;else{ma=Pj;var va=Oj}else(k=h.nodeName)&&"input"===k.toLowerCase()&&("checkbox"===h.type||"radio"===h.type)&&(ma=Qj);if(ma&&(ma=ma(a,d))){Wg(g,ma,c,e);break a}va&&va(a,h,d);"focusout"===a&&(va=h._wrapperState)&&va.controlled&&"number"===h.type&&me(h,"number",h.value)}va=d?Ib(d):window;switch(a){case "focusin":if(Vg(va)||"true"===va.contentEditable)Jb=va,Ke=d,rc=null;break;case "focusout":rc=Ke=Jb=null;break;case "mousedown":Je=!0;break;case "contextmenu":case "mouseup":case "dragend":Je=
!1;dh(g,c,e);break;case "selectionchange":if(dk)break;case "keydown":case "keyup":dh(g,c,e)}var ab;if(Ge)b:{switch(a){case "compositionstart":var da="onCompositionStart";break b;case "compositionend":da="onCompositionEnd";break b;case "compositionupdate":da="onCompositionUpdate";break b}da=void 0}else Hb?Qg(a,c)&&(da="onCompositionEnd"):"keydown"===a&&229===c.keyCode&&(da="onCompositionStart");da&&(Ug&&"ko"!==c.locale&&(Hb||"onCompositionStart"!==da?"onCompositionEnd"===da&&Hb&&(ab=Og()):(Za=e,Ee=
"value"in Za?Za.value:Za.textContent,Hb=!0)),va=ed(d,da),0<va.length&&(da=new qh(da,a,null,c,e),g.push({event:da,listeners:va}),ab?da.data=ab:(ab=Rg(c),null!==ab&&(da.data=ab))));if(ab=ek?Ij(a,c):Jj(a,c))d=ed(d,"onBeforeInput"),0<d.length&&(e=new fk("onBeforeInput","beforeinput",null,c,e),g.push({event:e,listeners:d}),e.data=ab)}Xg(g,b)})}function tc(a,b,c){return{instance:a,listener:b,currentTarget:c}}function ed(a,b){for(var c=b+"Capture",d=[];null!==a;){var e=a,f=e.stateNode;5===e.tag&&null!==
f&&(e=f,f=fc(a,c),null!=f&&d.unshift(tc(a,f,e)),f=fc(a,b),null!=f&&d.push(tc(a,f,e)));a=a.return}return d}function Lb(a){if(null===a)return null;do a=a.return;while(a&&5!==a.tag);return a?a:null}function oh(a,b,c,d,e){for(var f=b._reactName,g=[];null!==c&&c!==d;){var h=c,k=h.alternate,n=h.stateNode;if(null!==k&&k===d)break;5===h.tag&&null!==n&&(h=n,e?(k=fc(c,f),null!=k&&g.unshift(tc(c,k,h))):e||(k=fc(c,f),null!=k&&g.push(tc(c,k,h))));c=c.return}0!==g.length&&a.push({event:b,listeners:g})}function rh(a){return("string"===
typeof a?a:""+a).replace(gk,"\\n").replace(hk,"")}function jd(a,b,c,d){b=rh(b);if(rh(a)!==b&&c)throw Error(m(425));}function kd(){}function Qe(a,b){return"textarea"===a||"noscript"===a||"string"===typeof b.children||"number"===typeof b.children||"object"===typeof b.dangerouslySetInnerHTML&&null!==b.dangerouslySetInnerHTML&&null!=b.dangerouslySetInnerHTML.__html}function ik(a){setTimeout(function(){throw a;})}function Re(a,b){var c=b,d=0;do{var e=c.nextSibling;a.removeChild(c);if(e&&8===e.nodeType)if(c=
e.data,"/$"===c){if(0===d){a.removeChild(e);nc(b);return}d--}else"$"!==c&&"$?"!==c&&"$!"!==c||d++;c=e}while(c);nc(b)}function Ka(a){for(;null!=a;a=a.nextSibling){var b=a.nodeType;if(1===b||3===b)break;if(8===b){b=a.data;if("$"===b||"$!"===b||"$?"===b)break;if("/$"===b)return null}}return a}function sh(a){a=a.previousSibling;for(var b=0;a;){if(8===a.nodeType){var c=a.data;if("$"===c||"$!"===c||"$?"===c){if(0===b)return a;b--}else"/$"===c&&b++}a=a.previousSibling}return null}function ob(a){var b=a[Da];
if(b)return b;for(var c=a.parentNode;c;){if(b=c[Ja]||c[Da]){c=b.alternate;if(null!==b.child||null!==c&&null!==c.child)for(a=sh(a);null!==a;){if(c=a[Da])return c;a=sh(a)}return b}a=c;c=a.parentNode}return null}function ec(a){a=a[Da]||a[Ja];return!a||5!==a.tag&&6!==a.tag&&13!==a.tag&&3!==a.tag?null:a}function Ib(a){if(5===a.tag||6===a.tag)return a.stateNode;throw Error(m(33));}function Rc(a){return a[uc]||null}function bb(a){return{current:a}}function v(a,b){0>Mb||(a.current=Se[Mb],Se[Mb]=null,Mb--)}
function y(a,b,c){Mb++;Se[Mb]=a.current;a.current=b}function Nb(a,b){var c=a.type.contextTypes;if(!c)return cb;var d=a.stateNode;if(d&&d.__reactInternalMemoizedUnmaskedChildContext===b)return d.__reactInternalMemoizedMaskedChildContext;var e={},f;for(f in c)e[f]=b[f];d&&(a=a.stateNode,a.__reactInternalMemoizedUnmaskedChildContext=b,a.__reactInternalMemoizedMaskedChildContext=e);return e}function ea(a){a=a.childContextTypes;return null!==a&&void 0!==a}function th(a,b,c){if(J.current!==cb)throw Error(m(168));
y(J,b);y(S,c)}function uh(a,b,c){var d=a.stateNode;b=b.childContextTypes;if("function"!==typeof d.getChildContext)return c;d=d.getChildContext();for(var e in d)if(!(e in b))throw Error(m(108,gj(a)||"Unknown",e));return E({},c,d)}function ld(a){a=(a=a.stateNode)&&a.__reactInternalMemoizedMergedChildContext||cb;pb=J.current;y(J,a);y(S,S.current);return!0}function vh(a,b,c){var d=a.stateNode;if(!d)throw Error(m(169));c?(a=uh(a,b,pb),d.__reactInternalMemoizedMergedChildContext=a,v(S),v(J),y(J,a)):v(S);
y(S,c)}function wh(a){null===La?La=[a]:La.push(a)}function jk(a){md=!0;wh(a)}function db(){if(!Te&&null!==La){Te=!0;var a=0,b=z;try{var c=La;for(z=1;a<c.length;a++){var d=c[a];do d=d(!0);while(null!==d)}La=null;md=!1}catch(e){throw null!==La&&(La=La.slice(a+1)),xh(De,db),e;}finally{z=b,Te=!1}}return null}function qb(a,b){Ob[Pb++]=nd;Ob[Pb++]=od;od=a;nd=b}function yh(a,b,c){na[oa++]=Ma;na[oa++]=Na;na[oa++]=rb;rb=a;var d=Ma;a=Na;var e=32-ta(d)-1;d&=~(1<<e);c+=1;var f=32-ta(b)+e;if(30<f){var g=e-e%5;
f=(d&(1<<g)-1).toString(32);d>>=g;e-=g;Ma=1<<32-ta(b)+e|c<<e|d;Na=f+a}else Ma=1<<f|c<<e|d,Na=a}function Ue(a){null!==a.return&&(qb(a,1),yh(a,1,0))}function Ve(a){for(;a===od;)od=Ob[--Pb],Ob[Pb]=null,nd=Ob[--Pb],Ob[Pb]=null;for(;a===rb;)rb=na[--oa],na[oa]=null,Na=na[--oa],na[oa]=null,Ma=na[--oa],na[oa]=null}function zh(a,b){var c=pa(5,null,null,0);c.elementType="DELETED";c.stateNode=b;c.return=a;b=a.deletions;null===b?(a.deletions=[c],a.flags|=16):b.push(c)}function Ah(a,b){switch(a.tag){case 5:var c=
a.type;b=1!==b.nodeType||c.toLowerCase()!==b.nodeName.toLowerCase()?null:b;return null!==b?(a.stateNode=b,la=a,fa=Ka(b.firstChild),!0):!1;case 6:return b=""===a.pendingProps||3!==b.nodeType?null:b,null!==b?(a.stateNode=b,la=a,fa=null,!0):!1;case 13:return b=8!==b.nodeType?null:b,null!==b?(c=null!==rb?{id:Ma,overflow:Na}:null,a.memoizedState={dehydrated:b,treeContext:c,retryLane:1073741824},c=pa(18,null,null,0),c.stateNode=b,c.return=a,a.child=c,la=a,fa=null,!0):!1;default:return!1}}function We(a){return 0!==
(a.mode&1)&&0===(a.flags&128)}function Xe(a){if(D){var b=fa;if(b){var c=b;if(!Ah(a,b)){if(We(a))throw Error(m(418));b=Ka(c.nextSibling);var d=la;b&&Ah(a,b)?zh(d,c):(a.flags=a.flags&-4097|2,D=!1,la=a)}}else{if(We(a))throw Error(m(418));a.flags=a.flags&-4097|2;D=!1;la=a}}}function Bh(a){for(a=a.return;null!==a&&5!==a.tag&&3!==a.tag&&13!==a.tag;)a=a.return;la=a}function pd(a){if(a!==la)return!1;if(!D)return Bh(a),D=!0,!1;var b;(b=3!==a.tag)&&!(b=5!==a.tag)&&(b=a.type,b="head"!==b&&"body"!==b&&!Qe(a.type,
a.memoizedProps));if(b&&(b=fa)){if(We(a)){for(a=fa;a;)a=Ka(a.nextSibling);throw Error(m(418));}for(;b;)zh(a,b),b=Ka(b.nextSibling)}Bh(a);if(13===a.tag){a=a.memoizedState;a=null!==a?a.dehydrated:null;if(!a)throw Error(m(317));a:{a=a.nextSibling;for(b=0;a;){if(8===a.nodeType){var c=a.data;if("/$"===c){if(0===b){fa=Ka(a.nextSibling);break a}b--}else"$"!==c&&"$!"!==c&&"$?"!==c||b++}a=a.nextSibling}fa=null}}else fa=la?Ka(a.stateNode.nextSibling):null;return!0}function Qb(){fa=la=null;D=!1}function Ye(a){null===
wa?wa=[a]:wa.push(a)}function vc(a,b,c){a=c.ref;if(null!==a&&"function"!==typeof a&&"object"!==typeof a){if(c._owner){c=c._owner;if(c){if(1!==c.tag)throw Error(m(309));var d=c.stateNode}if(!d)throw Error(m(147,a));var e=d,f=""+a;if(null!==b&&null!==b.ref&&"function"===typeof b.ref&&b.ref._stringRef===f)return b.ref;b=function(a){var b=e.refs;null===a?delete b[f]:b[f]=a};b._stringRef=f;return b}if("string"!==typeof a)throw Error(m(284));if(!c._owner)throw Error(m(290,a));}return a}function qd(a,b){a=
Object.prototype.toString.call(b);throw Error(m(31,"[object Object]"===a?"object with keys {"+Object.keys(b).join(", ")+"}":a));}function Ch(a){var b=a._init;return b(a._payload)}function Dh(a){function b(b,c){if(a){var d=b.deletions;null===d?(b.deletions=[c],b.flags|=16):d.push(c)}}function c(c,d){if(!a)return null;for(;null!==d;)b(c,d),d=d.sibling;return null}function d(a,b){for(a=new Map;null!==b;)null!==b.key?a.set(b.key,b):a.set(b.index,b),b=b.sibling;return a}function e(a,b){a=eb(a,b);a.index=
0;a.sibling=null;return a}function f(b,c,d){b.index=d;if(!a)return b.flags|=1048576,c;d=b.alternate;if(null!==d)return d=d.index,d<c?(b.flags|=2,c):d;b.flags|=2;return c}function g(b){a&&null===b.alternate&&(b.flags|=2);return b}function h(a,b,c,d){if(null===b||6!==b.tag)return b=Ze(c,a.mode,d),b.return=a,b;b=e(b,c);b.return=a;return b}function k(a,b,c,d){var f=c.type;if(f===Bb)return l(a,b,c.props.children,d,c.key);if(null!==b&&(b.elementType===f||"object"===typeof f&&null!==f&&f.$$typeof===Ta&&
Ch(f)===b.type))return d=e(b,c.props),d.ref=vc(a,b,c),d.return=a,d;d=rd(c.type,c.key,c.props,null,a.mode,d);d.ref=vc(a,b,c);d.return=a;return d}function n(a,b,c,d){if(null===b||4!==b.tag||b.stateNode.containerInfo!==c.containerInfo||b.stateNode.implementation!==c.implementation)return b=$e(c,a.mode,d),b.return=a,b;b=e(b,c.children||[]);b.return=a;return b}function l(a,b,c,d,f){if(null===b||7!==b.tag)return b=sb(c,a.mode,d,f),b.return=a,b;b=e(b,c);b.return=a;return b}function u(a,b,c){if("string"===
typeof b&&""!==b||"number"===typeof b)return b=Ze(""+b,a.mode,c),b.return=a,b;if("object"===typeof b&&null!==b){switch(b.$$typeof){case sd:return c=rd(b.type,b.key,b.props,null,a.mode,c),c.ref=vc(a,null,b),c.return=a,c;case Cb:return b=$e(b,a.mode,c),b.return=a,b;case Ta:var d=b._init;return u(a,d(b._payload),c)}if(cc(b)||ac(b))return b=sb(b,a.mode,c,null),b.return=a,b;qd(a,b)}return null}function r(a,b,c,d){var e=null!==b?b.key:null;if("string"===typeof c&&""!==c||"number"===typeof c)return null!==
e?null:h(a,b,""+c,d);if("object"===typeof c&&null!==c){switch(c.$$typeof){case sd:return c.key===e?k(a,b,c,d):null;case Cb:return c.key===e?n(a,b,c,d):null;case Ta:return e=c._init,r(a,b,e(c._payload),d)}if(cc(c)||ac(c))return null!==e?null:l(a,b,c,d,null);qd(a,c)}return null}function p(a,b,c,d,e){if("string"===typeof d&&""!==d||"number"===typeof d)return a=a.get(c)||null,h(b,a,""+d,e);if("object"===typeof d&&null!==d){switch(d.$$typeof){case sd:return a=a.get(null===d.key?c:d.key)||null,k(b,a,d,
e);case Cb:return a=a.get(null===d.key?c:d.key)||null,n(b,a,d,e);case Ta:var f=d._init;return p(a,b,c,f(d._payload),e)}if(cc(d)||ac(d))return a=a.get(c)||null,l(b,a,d,e,null);qd(b,d)}return null}function x(e,g,h,k){for(var n=null,m=null,l=g,t=g=0,q=null;null!==l&&t<h.length;t++){l.index>t?(q=l,l=null):q=l.sibling;var A=r(e,l,h[t],k);if(null===A){null===l&&(l=q);break}a&&l&&null===A.alternate&&b(e,l);g=f(A,g,t);null===m?n=A:m.sibling=A;m=A;l=q}if(t===h.length)return c(e,l),D&&qb(e,t),n;if(null===l){for(;t<
h.length;t++)l=u(e,h[t],k),null!==l&&(g=f(l,g,t),null===m?n=l:m.sibling=l,m=l);D&&qb(e,t);return n}for(l=d(e,l);t<h.length;t++)q=p(l,e,t,h[t],k),null!==q&&(a&&null!==q.alternate&&l.delete(null===q.key?t:q.key),g=f(q,g,t),null===m?n=q:m.sibling=q,m=q);a&&l.forEach(function(a){return b(e,a)});D&&qb(e,t);return n}function I(e,g,h,k){var n=ac(h);if("function"!==typeof n)throw Error(m(150));h=n.call(h);if(null==h)throw Error(m(151));for(var l=n=null,q=g,t=g=0,A=null,w=h.next();null!==q&&!w.done;t++,w=
h.next()){q.index>t?(A=q,q=null):A=q.sibling;var x=r(e,q,w.value,k);if(null===x){null===q&&(q=A);break}a&&q&&null===x.alternate&&b(e,q);g=f(x,g,t);null===l?n=x:l.sibling=x;l=x;q=A}if(w.done)return c(e,q),D&&qb(e,t),n;if(null===q){for(;!w.done;t++,w=h.next())w=u(e,w.value,k),null!==w&&(g=f(w,g,t),null===l?n=w:l.sibling=w,l=w);D&&qb(e,t);return n}for(q=d(e,q);!w.done;t++,w=h.next())w=p(q,e,t,w.value,k),null!==w&&(a&&null!==w.alternate&&q.delete(null===w.key?t:w.key),g=f(w,g,t),null===l?n=w:l.sibling=
w,l=w);a&&q.forEach(function(a){return b(e,a)});D&&qb(e,t);return n}function v(a,d,f,h){"object"===typeof f&&null!==f&&f.type===Bb&&null===f.key&&(f=f.props.children);if("object"===typeof f&&null!==f){switch(f.$$typeof){case sd:a:{for(var k=f.key,n=d;null!==n;){if(n.key===k){k=f.type;if(k===Bb){if(7===n.tag){c(a,n.sibling);d=e(n,f.props.children);d.return=a;a=d;break a}}else if(n.elementType===k||"object"===typeof k&&null!==k&&k.$$typeof===Ta&&Ch(k)===n.type){c(a,n.sibling);d=e(n,f.props);d.ref=vc(a,
n,f);d.return=a;a=d;break a}c(a,n);break}else b(a,n);n=n.sibling}f.type===Bb?(d=sb(f.props.children,a.mode,h,f.key),d.return=a,a=d):(h=rd(f.type,f.key,f.props,null,a.mode,h),h.ref=vc(a,d,f),h.return=a,a=h)}return g(a);case Cb:a:{for(n=f.key;null!==d;){if(d.key===n)if(4===d.tag&&d.stateNode.containerInfo===f.containerInfo&&d.stateNode.implementation===f.implementation){c(a,d.sibling);d=e(d,f.children||[]);d.return=a;a=d;break a}else{c(a,d);break}else b(a,d);d=d.sibling}d=$e(f,a.mode,h);d.return=a;
a=d}return g(a);case Ta:return n=f._init,v(a,d,n(f._payload),h)}if(cc(f))return x(a,d,f,h);if(ac(f))return I(a,d,f,h);qd(a,f)}return"string"===typeof f&&""!==f||"number"===typeof f?(f=""+f,null!==d&&6===d.tag?(c(a,d.sibling),d=e(d,f),d.return=a,a=d):(c(a,d),d=Ze(f,a.mode,h),d.return=a,a=d),g(a)):c(a,d)}return v}function af(){bf=Rb=td=null}function cf(a,b){b=ud.current;v(ud);a._currentValue=b}function df(a,b,c){for(;null!==a;){var d=a.alternate;(a.childLanes&b)!==b?(a.childLanes|=b,null!==d&&(d.childLanes|=
b)):null!==d&&(d.childLanes&b)!==b&&(d.childLanes|=b);if(a===c)break;a=a.return}}function Sb(a,b){td=a;bf=Rb=null;a=a.dependencies;null!==a&&null!==a.firstContext&&(0!==(a.lanes&b)&&(ha=!0),a.firstContext=null)}function qa(a){var b=a._currentValue;if(bf!==a)if(a={context:a,memoizedValue:b,next:null},null===Rb){if(null===td)throw Error(m(308));Rb=a;td.dependencies={lanes:0,firstContext:a}}else Rb=Rb.next=a;return b}function ef(a){null===tb?tb=[a]:tb.push(a)}function Eh(a,b,c,d){var e=b.interleaved;
null===e?(c.next=c,ef(b)):(c.next=e.next,e.next=c);b.interleaved=c;return Oa(a,d)}function Oa(a,b){a.lanes|=b;var c=a.alternate;null!==c&&(c.lanes|=b);c=a;for(a=a.return;null!==a;)a.childLanes|=b,c=a.alternate,null!==c&&(c.childLanes|=b),c=a,a=a.return;return 3===c.tag?c.stateNode:null}function ff(a){a.updateQueue={baseState:a.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function Fh(a,b){a=a.updateQueue;b.updateQueue===a&&(b.updateQueue=
{baseState:a.baseState,firstBaseUpdate:a.firstBaseUpdate,lastBaseUpdate:a.lastBaseUpdate,shared:a.shared,effects:a.effects})}function Pa(a,b){return{eventTime:a,lane:b,tag:0,payload:null,callback:null,next:null}}function fb(a,b,c){var d=a.updateQueue;if(null===d)return null;d=d.shared;if(0!==(p&2)){var e=d.pending;null===e?b.next=b:(b.next=e.next,e.next=b);d.pending=b;return kk(a,c)}e=d.interleaved;null===e?(b.next=b,ef(d)):(b.next=e.next,e.next=b);d.interleaved=b;return Oa(a,c)}function vd(a,b,c){b=
b.updateQueue;if(null!==b&&(b=b.shared,0!==(c&4194240))){var d=b.lanes;d&=a.pendingLanes;c|=d;b.lanes=c;xe(a,c)}}function Gh(a,b){var c=a.updateQueue,d=a.alternate;if(null!==d&&(d=d.updateQueue,c===d)){var e=null,f=null;c=c.firstBaseUpdate;if(null!==c){do{var g={eventTime:c.eventTime,lane:c.lane,tag:c.tag,payload:c.payload,callback:c.callback,next:null};null===f?e=f=g:f=f.next=g;c=c.next}while(null!==c);null===f?e=f=b:f=f.next=b}else e=f=b;c={baseState:d.baseState,firstBaseUpdate:e,lastBaseUpdate:f,
shared:d.shared,effects:d.effects};a.updateQueue=c;return}a=c.lastBaseUpdate;null===a?c.firstBaseUpdate=b:a.next=b;c.lastBaseUpdate=b}function wd(a,b,c,d){var e=a.updateQueue;gb=!1;var f=e.firstBaseUpdate,g=e.lastBaseUpdate,h=e.shared.pending;if(null!==h){e.shared.pending=null;var k=h,n=k.next;k.next=null;null===g?f=n:g.next=n;g=k;var l=a.alternate;null!==l&&(l=l.updateQueue,h=l.lastBaseUpdate,h!==g&&(null===h?l.firstBaseUpdate=n:h.next=n,l.lastBaseUpdate=k))}if(null!==f){var m=e.baseState;g=0;l=
n=k=null;h=f;do{var r=h.lane,p=h.eventTime;if((d&r)===r){null!==l&&(l=l.next={eventTime:p,lane:0,tag:h.tag,payload:h.payload,callback:h.callback,next:null});a:{var x=a,v=h;r=b;p=c;switch(v.tag){case 1:x=v.payload;if("function"===typeof x){m=x.call(p,m,r);break a}m=x;break a;case 3:x.flags=x.flags&-65537|128;case 0:x=v.payload;r="function"===typeof x?x.call(p,m,r):x;if(null===r||void 0===r)break a;m=E({},m,r);break a;case 2:gb=!0}}null!==h.callback&&0!==h.lane&&(a.flags|=64,r=e.effects,null===r?e.effects=
[h]:r.push(h))}else p={eventTime:p,lane:r,tag:h.tag,payload:h.payload,callback:h.callback,next:null},null===l?(n=l=p,k=m):l=l.next=p,g|=r;h=h.next;if(null===h)if(h=e.shared.pending,null===h)break;else r=h,h=r.next,r.next=null,e.lastBaseUpdate=r,e.shared.pending=null}while(1);null===l&&(k=m);e.baseState=k;e.firstBaseUpdate=n;e.lastBaseUpdate=l;b=e.shared.interleaved;if(null!==b){e=b;do g|=e.lane,e=e.next;while(e!==b)}else null===f&&(e.shared.lanes=0);ra|=g;a.lanes=g;a.memoizedState=m}}function Hh(a,
b,c){a=b.effects;b.effects=null;if(null!==a)for(b=0;b<a.length;b++){var d=a[b],e=d.callback;if(null!==e){d.callback=null;d=c;if("function"!==typeof e)throw Error(m(191,e));e.call(d)}}}function ub(a){if(a===wc)throw Error(m(174));return a}function gf(a,b){y(xc,b);y(yc,a);y(Ea,wc);a=b.nodeType;switch(a){case 9:case 11:b=(b=b.documentElement)?b.namespaceURI:oe(null,"");break;default:a=8===a?b.parentNode:b,b=a.namespaceURI||null,a=a.tagName,b=oe(b,a)}v(Ea);y(Ea,b)}function Tb(a){v(Ea);v(yc);v(xc)}function Ih(a){ub(xc.current);
var b=ub(Ea.current);var c=oe(b,a.type);b!==c&&(y(yc,a),y(Ea,c))}function hf(a){yc.current===a&&(v(Ea),v(yc))}function xd(a){for(var b=a;null!==b;){if(13===b.tag){var c=b.memoizedState;if(null!==c&&(c=c.dehydrated,null===c||"$?"===c.data||"$!"===c.data))return b}else if(19===b.tag&&void 0!==b.memoizedProps.revealOrder){if(0!==(b.flags&128))return b}else if(null!==b.child){b.child.return=b;b=b.child;continue}if(b===a)break;for(;null===b.sibling;){if(null===b.return||b.return===a)return null;b=b.return}b.sibling.return=
b.return;b=b.sibling}return null}function jf(){for(var a=0;a<kf.length;a++)kf[a]._workInProgressVersionPrimary=null;kf.length=0}function V(){throw Error(m(321));}function lf(a,b){if(null===b)return!1;for(var c=0;c<b.length&&c<a.length;c++)if(!ua(a[c],b[c]))return!1;return!0}function mf(a,b,c,d,e,f){vb=f;C=b;b.memoizedState=null;b.updateQueue=null;b.lanes=0;yd.current=null===a||null===a.memoizedState?lk:mk;a=c(d,e);if(zc){f=0;do{zc=!1;Ac=0;if(25<=f)throw Error(m(301));f+=1;N=K=null;b.updateQueue=null;
yd.current=nk;a=c(d,e)}while(zc)}yd.current=zd;b=null!==K&&null!==K.next;vb=0;N=K=C=null;Ad=!1;if(b)throw Error(m(300));return a}function nf(){var a=0!==Ac;Ac=0;return a}function Fa(){var a={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};null===N?C.memoizedState=N=a:N=N.next=a;return N}function sa(){if(null===K){var a=C.alternate;a=null!==a?a.memoizedState:null}else a=K.next;var b=null===N?C.memoizedState:N.next;if(null!==b)N=b,K=a;else{if(null===a)throw Error(m(310));K=a;
a={memoizedState:K.memoizedState,baseState:K.baseState,baseQueue:K.baseQueue,queue:K.queue,next:null};null===N?C.memoizedState=N=a:N=N.next=a}return N}function Bc(a,b){return"function"===typeof b?b(a):b}function of(a,b,c){b=sa();c=b.queue;if(null===c)throw Error(m(311));c.lastRenderedReducer=a;var d=K,e=d.baseQueue,f=c.pending;if(null!==f){if(null!==e){var g=e.next;e.next=f.next;f.next=g}d.baseQueue=e=f;c.pending=null}if(null!==e){f=e.next;d=d.baseState;var h=g=null,k=null,n=f;do{var l=n.lane;if((vb&
l)===l)null!==k&&(k=k.next={lane:0,action:n.action,hasEagerState:n.hasEagerState,eagerState:n.eagerState,next:null}),d=n.hasEagerState?n.eagerState:a(d,n.action);else{var u={lane:l,action:n.action,hasEagerState:n.hasEagerState,eagerState:n.eagerState,next:null};null===k?(h=k=u,g=d):k=k.next=u;C.lanes|=l;ra|=l}n=n.next}while(null!==n&&n!==f);null===k?g=d:k.next=h;ua(d,b.memoizedState)||(ha=!0);b.memoizedState=d;b.baseState=g;b.baseQueue=k;c.lastRenderedState=d}a=c.interleaved;if(null!==a){e=a;do f=
e.lane,C.lanes|=f,ra|=f,e=e.next;while(e!==a)}else null===e&&(c.lanes=0);return[b.memoizedState,c.dispatch]}function pf(a,b,c){b=sa();c=b.queue;if(null===c)throw Error(m(311));c.lastRenderedReducer=a;var d=c.dispatch,e=c.pending,f=b.memoizedState;if(null!==e){c.pending=null;var g=e=e.next;do f=a(f,g.action),g=g.next;while(g!==e);ua(f,b.memoizedState)||(ha=!0);b.memoizedState=f;null===b.baseQueue&&(b.baseState=f);c.lastRenderedState=f}return[f,d]}function Jh(a,b,c){}function Kh(a,b,c){c=C;var d=sa(),
e=b(),f=!ua(d.memoizedState,e);f&&(d.memoizedState=e,ha=!0);d=d.queue;qf(Lh.bind(null,c,d,a),[a]);if(d.getSnapshot!==b||f||null!==N&&N.memoizedState.tag&1){c.flags|=2048;Cc(9,Mh.bind(null,c,d,e,b),void 0,null);if(null===O)throw Error(m(349));0!==(vb&30)||Nh(c,b,e)}return e}function Nh(a,b,c){a.flags|=16384;a={getSnapshot:b,value:c};b=C.updateQueue;null===b?(b={lastEffect:null,stores:null},C.updateQueue=b,b.stores=[a]):(c=b.stores,null===c?b.stores=[a]:c.push(a))}function Mh(a,b,c,d){b.value=c;b.getSnapshot=
d;Oh(b)&&Ph(a)}function Lh(a,b,c){return c(function(){Oh(b)&&Ph(a)})}function Oh(a){var b=a.getSnapshot;a=a.value;try{var c=b();return!ua(a,c)}catch(d){return!0}}function Ph(a){var b=Oa(a,1);null!==b&&xa(b,a,1,-1)}function Qh(a){var b=Fa();"function"===typeof a&&(a=a());b.memoizedState=b.baseState=a;a={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Bc,lastRenderedState:a};b.queue=a;a=a.dispatch=ok.bind(null,C,a);return[b.memoizedState,a]}function Cc(a,b,c,d){a={tag:a,create:b,
destroy:c,deps:d,next:null};b=C.updateQueue;null===b?(b={lastEffect:null,stores:null},C.updateQueue=b,b.lastEffect=a.next=a):(c=b.lastEffect,null===c?b.lastEffect=a.next=a:(d=c.next,c.next=a,a.next=d,b.lastEffect=a));return a}function Rh(a){return sa().memoizedState}function Bd(a,b,c,d){var e=Fa();C.flags|=a;e.memoizedState=Cc(1|b,c,void 0,void 0===d?null:d)}function Cd(a,b,c,d){var e=sa();d=void 0===d?null:d;var f=void 0;if(null!==K){var g=K.memoizedState;f=g.destroy;if(null!==d&&lf(d,g.deps)){e.memoizedState=
Cc(b,c,f,d);return}}C.flags|=a;e.memoizedState=Cc(1|b,c,f,d)}function Sh(a,b){return Bd(8390656,8,a,b)}function qf(a,b){return Cd(2048,8,a,b)}function Th(a,b){return Cd(4,2,a,b)}function Uh(a,b){return Cd(4,4,a,b)}function Vh(a,b){if("function"===typeof b)return a=a(),b(a),function(){b(null)};if(null!==b&&void 0!==b)return a=a(),b.current=a,function(){b.current=null}}function Wh(a,b,c){c=null!==c&&void 0!==c?c.concat([a]):null;return Cd(4,4,Vh.bind(null,b,a),c)}function rf(a,b){}function Xh(a,b){var c=
sa();b=void 0===b?null:b;var d=c.memoizedState;if(null!==d&&null!==b&&lf(b,d[1]))return d[0];c.memoizedState=[a,b];return a}function Yh(a,b){var c=sa();b=void 0===b?null:b;var d=c.memoizedState;if(null!==d&&null!==b&&lf(b,d[1]))return d[0];a=a();c.memoizedState=[a,b];return a}function Zh(a,b,c){if(0===(vb&21))return a.baseState&&(a.baseState=!1,ha=!0),a.memoizedState=c;ua(c,b)||(c=Dg(),C.lanes|=c,ra|=c,a.baseState=!0);return b}function pk(a,b,c){c=z;z=0!==c&&4>c?c:4;a(!0);var d=sf.transition;sf.transition=
{};try{a(!1),b()}finally{z=c,sf.transition=d}}function $h(){return sa().memoizedState}function qk(a,b,c){var d=hb(a);c={lane:d,action:c,hasEagerState:!1,eagerState:null,next:null};if(ai(a))bi(b,c);else if(c=Eh(a,b,c,d),null!==c){var e=Z();xa(c,a,d,e);ci(c,b,d)}}function ok(a,b,c){var d=hb(a),e={lane:d,action:c,hasEagerState:!1,eagerState:null,next:null};if(ai(a))bi(b,e);else{var f=a.alternate;if(0===a.lanes&&(null===f||0===f.lanes)&&(f=b.lastRenderedReducer,null!==f))try{var g=b.lastRenderedState,
h=f(g,c);e.hasEagerState=!0;e.eagerState=h;if(ua(h,g)){var k=b.interleaved;null===k?(e.next=e,ef(b)):(e.next=k.next,k.next=e);b.interleaved=e;return}}catch(n){}finally{}c=Eh(a,b,e,d);null!==c&&(e=Z(),xa(c,a,d,e),ci(c,b,d))}}function ai(a){var b=a.alternate;return a===C||null!==b&&b===C}function bi(a,b){zc=Ad=!0;var c=a.pending;null===c?b.next=b:(b.next=c.next,c.next=b);a.pending=b}function ci(a,b,c){if(0!==(c&4194240)){var d=b.lanes;d&=a.pendingLanes;c|=d;b.lanes=c;xe(a,c)}}function ya(a,b){if(a&&
a.defaultProps){b=E({},b);a=a.defaultProps;for(var c in a)void 0===b[c]&&(b[c]=a[c]);return b}return b}function tf(a,b,c,d){b=a.memoizedState;c=c(d,b);c=null===c||void 0===c?b:E({},b,c);a.memoizedState=c;0===a.lanes&&(a.updateQueue.baseState=c)}function di(a,b,c,d,e,f,g){a=a.stateNode;return"function"===typeof a.shouldComponentUpdate?a.shouldComponentUpdate(d,f,g):b.prototype&&b.prototype.isPureReactComponent?!qc(c,d)||!qc(e,f):!0}function ei(a,b,c){var d=!1,e=cb;var f=b.contextType;"object"===typeof f&&
null!==f?f=qa(f):(e=ea(b)?pb:J.current,d=b.contextTypes,f=(d=null!==d&&void 0!==d)?Nb(a,e):cb);b=new b(c,f);a.memoizedState=null!==b.state&&void 0!==b.state?b.state:null;b.updater=Dd;a.stateNode=b;b._reactInternals=a;d&&(a=a.stateNode,a.__reactInternalMemoizedUnmaskedChildContext=e,a.__reactInternalMemoizedMaskedChildContext=f);return b}function fi(a,b,c,d){a=b.state;"function"===typeof b.componentWillReceiveProps&&b.componentWillReceiveProps(c,d);"function"===typeof b.UNSAFE_componentWillReceiveProps&&
b.UNSAFE_componentWillReceiveProps(c,d);b.state!==a&&Dd.enqueueReplaceState(b,b.state,null)}function uf(a,b,c,d){var e=a.stateNode;e.props=c;e.state=a.memoizedState;e.refs={};ff(a);var f=b.contextType;"object"===typeof f&&null!==f?e.context=qa(f):(f=ea(b)?pb:J.current,e.context=Nb(a,f));e.state=a.memoizedState;f=b.getDerivedStateFromProps;"function"===typeof f&&(tf(a,b,f,c),e.state=a.memoizedState);"function"===typeof b.getDerivedStateFromProps||"function"===typeof e.getSnapshotBeforeUpdate||"function"!==
typeof e.UNSAFE_componentWillMount&&"function"!==typeof e.componentWillMount||(b=e.state,"function"===typeof e.componentWillMount&&e.componentWillMount(),"function"===typeof e.UNSAFE_componentWillMount&&e.UNSAFE_componentWillMount(),b!==e.state&&Dd.enqueueReplaceState(e,e.state,null),wd(a,c,e,d),e.state=a.memoizedState);"function"===typeof e.componentDidMount&&(a.flags|=4194308)}function Ub(a,b){try{var c="",d=b;do c+=fj(d),d=d.return;while(d);var e=c}catch(f){e="\\nError generating stack: "+f.message+
"\\n"+f.stack}return{value:a,source:b,stack:e,digest:null}}function vf(a,b,c){return{value:a,source:null,stack:null!=c?c:null,digest:null!=b?b:null}}function wf(a,b){try{console.error(b.value)}catch(c){setTimeout(function(){throw c;})}}function gi(a,b,c){c=Pa(-1,c);c.tag=3;c.payload={element:null};var d=b.value;c.callback=function(){Ed||(Ed=!0,xf=d);wf(a,b)};return c}function hi(a,b,c){c=Pa(-1,c);c.tag=3;var d=a.type.getDerivedStateFromError;if("function"===typeof d){var e=b.value;c.payload=function(){return d(e)};
c.callback=function(){wf(a,b)}}var f=a.stateNode;null!==f&&"function"===typeof f.componentDidCatch&&(c.callback=function(){wf(a,b);"function"!==typeof d&&(null===ib?ib=new Set([this]):ib.add(this));var c=b.stack;this.componentDidCatch(b.value,{componentStack:null!==c?c:""})});return c}function ii(a,b,c){var d=a.pingCache;if(null===d){d=a.pingCache=new rk;var e=new Set;d.set(b,e)}else e=d.get(b),void 0===e&&(e=new Set,d.set(b,e));e.has(c)||(e.add(c),a=sk.bind(null,a,b,c),b.then(a,a))}function ji(a){do{var b;
if(b=13===a.tag)b=a.memoizedState,b=null!==b?null!==b.dehydrated?!0:!1:!0;if(b)return a;a=a.return}while(null!==a);return null}function ki(a,b,c,d,e){if(0===(a.mode&1))return a===b?a.flags|=65536:(a.flags|=128,c.flags|=131072,c.flags&=-52805,1===c.tag&&(null===c.alternate?c.tag=17:(b=Pa(-1,1),b.tag=2,fb(c,b,1))),c.lanes|=1),a;a.flags|=65536;a.lanes=e;return a}function aa(a,b,c,d){b.child=null===a?li(b,null,c,d):Vb(b,a.child,c,d)}function mi(a,b,c,d,e){c=c.render;var f=b.ref;Sb(b,e);d=mf(a,b,c,d,f,
e);c=nf();if(null!==a&&!ha)return b.updateQueue=a.updateQueue,b.flags&=-2053,a.lanes&=~e,Qa(a,b,e);D&&c&&Ue(b);b.flags|=1;aa(a,b,d,e);return b.child}function ni(a,b,c,d,e){if(null===a){var f=c.type;if("function"===typeof f&&!yf(f)&&void 0===f.defaultProps&&null===c.compare&&void 0===c.defaultProps)return b.tag=15,b.type=f,oi(a,b,f,d,e);a=rd(c.type,null,d,b,b.mode,e);a.ref=b.ref;a.return=b;return b.child=a}f=a.child;if(0===(a.lanes&e)){var g=f.memoizedProps;c=c.compare;c=null!==c?c:qc;if(c(g,d)&&a.ref===
b.ref)return Qa(a,b,e)}b.flags|=1;a=eb(f,d);a.ref=b.ref;a.return=b;return b.child=a}function oi(a,b,c,d,e){if(null!==a){var f=a.memoizedProps;if(qc(f,d)&&a.ref===b.ref)if(ha=!1,b.pendingProps=d=f,0!==(a.lanes&e))0!==(a.flags&131072)&&(ha=!0);else return b.lanes=a.lanes,Qa(a,b,e)}return zf(a,b,c,d,e)}function pi(a,b,c){var d=b.pendingProps,e=d.children,f=null!==a?a.memoizedState:null;if("hidden"===d.mode)if(0===(b.mode&1))b.memoizedState={baseLanes:0,cachePool:null,transitions:null},y(Ga,ba),ba|=c;
else{if(0===(c&1073741824))return a=null!==f?f.baseLanes|c:c,b.lanes=b.childLanes=1073741824,b.memoizedState={baseLanes:a,cachePool:null,transitions:null},b.updateQueue=null,y(Ga,ba),ba|=a,null;b.memoizedState={baseLanes:0,cachePool:null,transitions:null};d=null!==f?f.baseLanes:c;y(Ga,ba);ba|=d}else null!==f?(d=f.baseLanes|c,b.memoizedState=null):d=c,y(Ga,ba),ba|=d;aa(a,b,e,c);return b.child}function qi(a,b){var c=b.ref;if(null===a&&null!==c||null!==a&&a.ref!==c)b.flags|=512,b.flags|=2097152}function zf(a,
b,c,d,e){var f=ea(c)?pb:J.current;f=Nb(b,f);Sb(b,e);c=mf(a,b,c,d,f,e);d=nf();if(null!==a&&!ha)return b.updateQueue=a.updateQueue,b.flags&=-2053,a.lanes&=~e,Qa(a,b,e);D&&d&&Ue(b);b.flags|=1;aa(a,b,c,e);return b.child}function ri(a,b,c,d,e){if(ea(c)){var f=!0;ld(b)}else f=!1;Sb(b,e);if(null===b.stateNode)Fd(a,b),ei(b,c,d),uf(b,c,d,e),d=!0;else if(null===a){var g=b.stateNode,h=b.memoizedProps;g.props=h;var k=g.context,n=c.contextType;"object"===typeof n&&null!==n?n=qa(n):(n=ea(c)?pb:J.current,n=Nb(b,
n));var l=c.getDerivedStateFromProps,m="function"===typeof l||"function"===typeof g.getSnapshotBeforeUpdate;m||"function"!==typeof g.UNSAFE_componentWillReceiveProps&&"function"!==typeof g.componentWillReceiveProps||(h!==d||k!==n)&&fi(b,g,d,n);gb=!1;var r=b.memoizedState;g.state=r;wd(b,d,g,e);k=b.memoizedState;h!==d||r!==k||S.current||gb?("function"===typeof l&&(tf(b,c,l,d),k=b.memoizedState),(h=gb||di(b,c,h,d,r,k,n))?(m||"function"!==typeof g.UNSAFE_componentWillMount&&"function"!==typeof g.componentWillMount||
("function"===typeof g.componentWillMount&&g.componentWillMount(),"function"===typeof g.UNSAFE_componentWillMount&&g.UNSAFE_componentWillMount()),"function"===typeof g.componentDidMount&&(b.flags|=4194308)):("function"===typeof g.componentDidMount&&(b.flags|=4194308),b.memoizedProps=d,b.memoizedState=k),g.props=d,g.state=k,g.context=n,d=h):("function"===typeof g.componentDidMount&&(b.flags|=4194308),d=!1)}else{g=b.stateNode;Fh(a,b);h=b.memoizedProps;n=b.type===b.elementType?h:ya(b.type,h);g.props=
n;m=b.pendingProps;r=g.context;k=c.contextType;"object"===typeof k&&null!==k?k=qa(k):(k=ea(c)?pb:J.current,k=Nb(b,k));var p=c.getDerivedStateFromProps;(l="function"===typeof p||"function"===typeof g.getSnapshotBeforeUpdate)||"function"!==typeof g.UNSAFE_componentWillReceiveProps&&"function"!==typeof g.componentWillReceiveProps||(h!==m||r!==k)&&fi(b,g,d,k);gb=!1;r=b.memoizedState;g.state=r;wd(b,d,g,e);var x=b.memoizedState;h!==m||r!==x||S.current||gb?("function"===typeof p&&(tf(b,c,p,d),x=b.memoizedState),
(n=gb||di(b,c,n,d,r,x,k)||!1)?(l||"function"!==typeof g.UNSAFE_componentWillUpdate&&"function"!==typeof g.componentWillUpdate||("function"===typeof g.componentWillUpdate&&g.componentWillUpdate(d,x,k),"function"===typeof g.UNSAFE_componentWillUpdate&&g.UNSAFE_componentWillUpdate(d,x,k)),"function"===typeof g.componentDidUpdate&&(b.flags|=4),"function"===typeof g.getSnapshotBeforeUpdate&&(b.flags|=1024)):("function"!==typeof g.componentDidUpdate||h===a.memoizedProps&&r===a.memoizedState||(b.flags|=
4),"function"!==typeof g.getSnapshotBeforeUpdate||h===a.memoizedProps&&r===a.memoizedState||(b.flags|=1024),b.memoizedProps=d,b.memoizedState=x),g.props=d,g.state=x,g.context=k,d=n):("function"!==typeof g.componentDidUpdate||h===a.memoizedProps&&r===a.memoizedState||(b.flags|=4),"function"!==typeof g.getSnapshotBeforeUpdate||h===a.memoizedProps&&r===a.memoizedState||(b.flags|=1024),d=!1)}return Af(a,b,c,d,f,e)}function Af(a,b,c,d,e,f){qi(a,b);var g=0!==(b.flags&128);if(!d&&!g)return e&&vh(b,c,!1),
Qa(a,b,f);d=b.stateNode;tk.current=b;var h=g&&"function"!==typeof c.getDerivedStateFromError?null:d.render();b.flags|=1;null!==a&&g?(b.child=Vb(b,a.child,null,f),b.child=Vb(b,null,h,f)):aa(a,b,h,f);b.memoizedState=d.state;e&&vh(b,c,!0);return b.child}function si(a){var b=a.stateNode;b.pendingContext?th(a,b.pendingContext,b.pendingContext!==b.context):b.context&&th(a,b.context,!1);gf(a,b.containerInfo)}function ti(a,b,c,d,e){Qb();Ye(e);b.flags|=256;aa(a,b,c,d);return b.child}function Bf(a){return{baseLanes:a,
cachePool:null,transitions:null}}function ui(a,b,c){var d=b.pendingProps,e=F.current,f=!1,g=0!==(b.flags&128),h;(h=g)||(h=null!==a&&null===a.memoizedState?!1:0!==(e&2));if(h)f=!0,b.flags&=-129;else if(null===a||null!==a.memoizedState)e|=1;y(F,e&1);if(null===a){Xe(b);a=b.memoizedState;if(null!==a&&(a=a.dehydrated,null!==a))return 0===(b.mode&1)?b.lanes=1:"$!"===a.data?b.lanes=8:b.lanes=1073741824,null;g=d.children;a=d.fallback;return f?(d=b.mode,f=b.child,g={mode:"hidden",children:g},0===(d&1)&&null!==
f?(f.childLanes=0,f.pendingProps=g):f=Gd(g,d,0,null),a=sb(a,d,c,null),f.return=b,a.return=b,f.sibling=a,b.child=f,b.child.memoizedState=Bf(c),b.memoizedState=Cf,a):Df(b,g)}e=a.memoizedState;if(null!==e&&(h=e.dehydrated,null!==h))return uk(a,b,g,d,h,e,c);if(f){f=d.fallback;g=b.mode;e=a.child;h=e.sibling;var k={mode:"hidden",children:d.children};0===(g&1)&&b.child!==e?(d=b.child,d.childLanes=0,d.pendingProps=k,b.deletions=null):(d=eb(e,k),d.subtreeFlags=e.subtreeFlags&14680064);null!==h?f=eb(h,f):(f=
sb(f,g,c,null),f.flags|=2);f.return=b;d.return=b;d.sibling=f;b.child=d;d=f;f=b.child;g=a.child.memoizedState;g=null===g?Bf(c):{baseLanes:g.baseLanes|c,cachePool:null,transitions:g.transitions};f.memoizedState=g;f.childLanes=a.childLanes&~c;b.memoizedState=Cf;return d}f=a.child;a=f.sibling;d=eb(f,{mode:"visible",children:d.children});0===(b.mode&1)&&(d.lanes=c);d.return=b;d.sibling=null;null!==a&&(c=b.deletions,null===c?(b.deletions=[a],b.flags|=16):c.push(a));b.child=d;b.memoizedState=null;return d}
function Df(a,b,c){b=Gd({mode:"visible",children:b},a.mode,0,null);b.return=a;return a.child=b}function Hd(a,b,c,d){null!==d&&Ye(d);Vb(b,a.child,null,c);a=Df(b,b.pendingProps.children);a.flags|=2;b.memoizedState=null;return a}function uk(a,b,c,d,e,f,g){if(c){if(b.flags&256)return b.flags&=-257,d=vf(Error(m(422))),Hd(a,b,g,d);if(null!==b.memoizedState)return b.child=a.child,b.flags|=128,null;f=d.fallback;e=b.mode;d=Gd({mode:"visible",children:d.children},e,0,null);f=sb(f,e,g,null);f.flags|=2;d.return=
b;f.return=b;d.sibling=f;b.child=d;0!==(b.mode&1)&&Vb(b,a.child,null,g);b.child.memoizedState=Bf(g);b.memoizedState=Cf;return f}if(0===(b.mode&1))return Hd(a,b,g,null);if("$!"===e.data){d=e.nextSibling&&e.nextSibling.dataset;if(d)var h=d.dgst;d=h;f=Error(m(419));d=vf(f,d,void 0);return Hd(a,b,g,d)}h=0!==(g&a.childLanes);if(ha||h){d=O;if(null!==d){switch(g&-g){case 4:e=2;break;case 16:e=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:e=
32;break;case 536870912:e=268435456;break;default:e=0}e=0!==(e&(d.suspendedLanes|g))?0:e;0!==e&&e!==f.retryLane&&(f.retryLane=e,Oa(a,e),xa(d,a,e,-1))}Ef();d=vf(Error(m(421)));return Hd(a,b,g,d)}if("$?"===e.data)return b.flags|=128,b.child=a.child,b=vk.bind(null,a),e._reactRetry=b,null;a=f.treeContext;fa=Ka(e.nextSibling);la=b;D=!0;wa=null;null!==a&&(na[oa++]=Ma,na[oa++]=Na,na[oa++]=rb,Ma=a.id,Na=a.overflow,rb=b);b=Df(b,d.children);b.flags|=4096;return b}function vi(a,b,c){a.lanes|=b;var d=a.alternate;
null!==d&&(d.lanes|=b);df(a.return,b,c)}function Ff(a,b,c,d,e){var f=a.memoizedState;null===f?a.memoizedState={isBackwards:b,rendering:null,renderingStartTime:0,last:d,tail:c,tailMode:e}:(f.isBackwards=b,f.rendering=null,f.renderingStartTime=0,f.last=d,f.tail=c,f.tailMode=e)}function wi(a,b,c){var d=b.pendingProps,e=d.revealOrder,f=d.tail;aa(a,b,d.children,c);d=F.current;if(0!==(d&2))d=d&1|2,b.flags|=128;else{if(null!==a&&0!==(a.flags&128))a:for(a=b.child;null!==a;){if(13===a.tag)null!==a.memoizedState&&
vi(a,c,b);else if(19===a.tag)vi(a,c,b);else if(null!==a.child){a.child.return=a;a=a.child;continue}if(a===b)break a;for(;null===a.sibling;){if(null===a.return||a.return===b)break a;a=a.return}a.sibling.return=a.return;a=a.sibling}d&=1}y(F,d);if(0===(b.mode&1))b.memoizedState=null;else switch(e){case "forwards":c=b.child;for(e=null;null!==c;)a=c.alternate,null!==a&&null===xd(a)&&(e=c),c=c.sibling;c=e;null===c?(e=b.child,b.child=null):(e=c.sibling,c.sibling=null);Ff(b,!1,e,c,f);break;case "backwards":c=
null;e=b.child;for(b.child=null;null!==e;){a=e.alternate;if(null!==a&&null===xd(a)){b.child=e;break}a=e.sibling;e.sibling=c;c=e;e=a}Ff(b,!0,c,null,f);break;case "together":Ff(b,!1,null,null,void 0);break;default:b.memoizedState=null}return b.child}function Fd(a,b){0===(b.mode&1)&&null!==a&&(a.alternate=null,b.alternate=null,b.flags|=2)}function Qa(a,b,c){null!==a&&(b.dependencies=a.dependencies);ra|=b.lanes;if(0===(c&b.childLanes))return null;if(null!==a&&b.child!==a.child)throw Error(m(153));if(null!==
b.child){a=b.child;c=eb(a,a.pendingProps);b.child=c;for(c.return=b;null!==a.sibling;)a=a.sibling,c=c.sibling=eb(a,a.pendingProps),c.return=b;c.sibling=null}return b.child}function wk(a,b,c){switch(b.tag){case 3:si(b);Qb();break;case 5:Ih(b);break;case 1:ea(b.type)&&ld(b);break;case 4:gf(b,b.stateNode.containerInfo);break;case 10:var d=b.type._context,e=b.memoizedProps.value;y(ud,d._currentValue);d._currentValue=e;break;case 13:d=b.memoizedState;if(null!==d){if(null!==d.dehydrated)return y(F,F.current&
1),b.flags|=128,null;if(0!==(c&b.child.childLanes))return ui(a,b,c);y(F,F.current&1);a=Qa(a,b,c);return null!==a?a.sibling:null}y(F,F.current&1);break;case 19:d=0!==(c&b.childLanes);if(0!==(a.flags&128)){if(d)return wi(a,b,c);b.flags|=128}e=b.memoizedState;null!==e&&(e.rendering=null,e.tail=null,e.lastEffect=null);y(F,F.current);if(d)break;else return null;case 22:case 23:return b.lanes=0,pi(a,b,c)}return Qa(a,b,c)}function Dc(a,b){if(!D)switch(a.tailMode){case "hidden":b=a.tail;for(var c=null;null!==
b;)null!==b.alternate&&(c=b),b=b.sibling;null===c?a.tail=null:c.sibling=null;break;case "collapsed":c=a.tail;for(var d=null;null!==c;)null!==c.alternate&&(d=c),c=c.sibling;null===d?b||null===a.tail?a.tail=null:a.tail.sibling=null:d.sibling=null}}function W(a){var b=null!==a.alternate&&a.alternate.child===a.child,c=0,d=0;if(b)for(var e=a.child;null!==e;)c|=e.lanes|e.childLanes,d|=e.subtreeFlags&14680064,d|=e.flags&14680064,e.return=a,e=e.sibling;else for(e=a.child;null!==e;)c|=e.lanes|e.childLanes,
d|=e.subtreeFlags,d|=e.flags,e.return=a,e=e.sibling;a.subtreeFlags|=d;a.childLanes=c;return b}function xk(a,b,c){var d=b.pendingProps;Ve(b);switch(b.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return W(b),null;case 1:return ea(b.type)&&(v(S),v(J)),W(b),null;case 3:d=b.stateNode;Tb();v(S);v(J);jf();d.pendingContext&&(d.context=d.pendingContext,d.pendingContext=null);if(null===a||null===a.child)pd(b)?b.flags|=4:null===a||a.memoizedState.isDehydrated&&0===(b.flags&
256)||(b.flags|=1024,null!==wa&&(Gf(wa),wa=null));xi(a,b);W(b);return null;case 5:hf(b);var e=ub(xc.current);c=b.type;if(null!==a&&null!=b.stateNode)yk(a,b,c,d,e),a.ref!==b.ref&&(b.flags|=512,b.flags|=2097152);else{if(!d){if(null===b.stateNode)throw Error(m(166));W(b);return null}a=ub(Ea.current);if(pd(b)){d=b.stateNode;c=b.type;var f=b.memoizedProps;d[Da]=b;d[uc]=f;a=0!==(b.mode&1);switch(c){case "dialog":B("cancel",d);B("close",d);break;case "iframe":case "object":case "embed":B("load",d);break;
case "video":case "audio":for(e=0;e<Ec.length;e++)B(Ec[e],d);break;case "source":B("error",d);break;case "img":case "image":case "link":B("error",d);B("load",d);break;case "details":B("toggle",d);break;case "input":kg(d,f);B("invalid",d);break;case "select":d._wrapperState={wasMultiple:!!f.multiple};B("invalid",d);break;case "textarea":ng(d,f),B("invalid",d)}pe(c,f);e=null;for(var g in f)if(f.hasOwnProperty(g)){var h=f[g];"children"===g?"string"===typeof h?d.textContent!==h&&(!0!==f.suppressHydrationWarning&&
jd(d.textContent,h,a),e=["children",h]):"number"===typeof h&&d.textContent!==""+h&&(!0!==f.suppressHydrationWarning&&jd(d.textContent,h,a),e=["children",""+h]):$b.hasOwnProperty(g)&&null!=h&&"onScroll"===g&&B("scroll",d)}switch(c){case "input":Pc(d);mg(d,f,!0);break;case "textarea":Pc(d);pg(d);break;case "select":case "option":break;default:"function"===typeof f.onClick&&(d.onclick=kd)}d=e;b.updateQueue=d;null!==d&&(b.flags|=4)}else{g=9===e.nodeType?e:e.ownerDocument;"http://www.w3.org/1999/xhtml"===
a&&(a=qg(c));"http://www.w3.org/1999/xhtml"===a?"script"===c?(a=g.createElement("div"),a.innerHTML="<script>\\x3c/script>",a=a.removeChild(a.firstChild)):"string"===typeof d.is?a=g.createElement(c,{is:d.is}):(a=g.createElement(c),"select"===c&&(g=a,d.multiple?g.multiple=!0:d.size&&(g.size=d.size))):a=g.createElementNS(a,c);a[Da]=b;a[uc]=d;zk(a,b,!1,!1);b.stateNode=a;a:{g=qe(c,d);switch(c){case "dialog":B("cancel",a);B("close",a);e=d;break;case "iframe":case "object":case "embed":B("load",a);e=d;break;
case "video":case "audio":for(e=0;e<Ec.length;e++)B(Ec[e],a);e=d;break;case "source":B("error",a);e=d;break;case "img":case "image":case "link":B("error",a);B("load",a);e=d;break;case "details":B("toggle",a);e=d;break;case "input":kg(a,d);e=ke(a,d);B("invalid",a);break;case "option":e=d;break;case "select":a._wrapperState={wasMultiple:!!d.multiple};e=E({},d,{value:void 0});B("invalid",a);break;case "textarea":ng(a,d);e=ne(a,d);B("invalid",a);break;default:e=d}pe(c,e);h=e;for(f in h)if(h.hasOwnProperty(f)){var k=
h[f];"style"===f?sg(a,k):"dangerouslySetInnerHTML"===f?(k=k?k.__html:void 0,null!=k&&yi(a,k)):"children"===f?"string"===typeof k?("textarea"!==c||""!==k)&&Fc(a,k):"number"===typeof k&&Fc(a,""+k):"suppressContentEditableWarning"!==f&&"suppressHydrationWarning"!==f&&"autoFocus"!==f&&($b.hasOwnProperty(f)?null!=k&&"onScroll"===f&&B("scroll",a):null!=k&&$d(a,f,k,g))}switch(c){case "input":Pc(a);mg(a,d,!1);break;case "textarea":Pc(a);pg(a);break;case "option":null!=d.value&&a.setAttribute("value",""+Ua(d.value));
break;case "select":a.multiple=!!d.multiple;f=d.value;null!=f?Db(a,!!d.multiple,f,!1):null!=d.defaultValue&&Db(a,!!d.multiple,d.defaultValue,!0);break;default:"function"===typeof e.onClick&&(a.onclick=kd)}switch(c){case "button":case "input":case "select":case "textarea":d=!!d.autoFocus;break a;case "img":d=!0;break a;default:d=!1}}d&&(b.flags|=4)}null!==b.ref&&(b.flags|=512,b.flags|=2097152)}W(b);return null;case 6:if(a&&null!=b.stateNode)Ak(a,b,a.memoizedProps,d);else{if("string"!==typeof d&&null===
b.stateNode)throw Error(m(166));c=ub(xc.current);ub(Ea.current);if(pd(b)){d=b.stateNode;c=b.memoizedProps;d[Da]=b;if(f=d.nodeValue!==c)if(a=la,null!==a)switch(a.tag){case 3:jd(d.nodeValue,c,0!==(a.mode&1));break;case 5:!0!==a.memoizedProps.suppressHydrationWarning&&jd(d.nodeValue,c,0!==(a.mode&1))}f&&(b.flags|=4)}else d=(9===c.nodeType?c:c.ownerDocument).createTextNode(d),d[Da]=b,b.stateNode=d}W(b);return null;case 13:v(F);d=b.memoizedState;if(null===a||null!==a.memoizedState&&null!==a.memoizedState.dehydrated){if(D&&
null!==fa&&0!==(b.mode&1)&&0===(b.flags&128)){for(f=fa;f;)f=Ka(f.nextSibling);Qb();b.flags|=98560;f=!1}else if(f=pd(b),null!==d&&null!==d.dehydrated){if(null===a){if(!f)throw Error(m(318));f=b.memoizedState;f=null!==f?f.dehydrated:null;if(!f)throw Error(m(317));f[Da]=b}else Qb(),0===(b.flags&128)&&(b.memoizedState=null),b.flags|=4;W(b);f=!1}else null!==wa&&(Gf(wa),wa=null),f=!0;if(!f)return b.flags&65536?b:null}if(0!==(b.flags&128))return b.lanes=c,b;d=null!==d;d!==(null!==a&&null!==a.memoizedState)&&
d&&(b.child.flags|=8192,0!==(b.mode&1)&&(null===a||0!==(F.current&1)?0===L&&(L=3):Ef()));null!==b.updateQueue&&(b.flags|=4);W(b);return null;case 4:return Tb(),xi(a,b),null===a&&sc(b.stateNode.containerInfo),W(b),null;case 10:return cf(b.type._context),W(b),null;case 17:return ea(b.type)&&(v(S),v(J)),W(b),null;case 19:v(F);f=b.memoizedState;if(null===f)return W(b),null;d=0!==(b.flags&128);g=f.rendering;if(null===g)if(d)Dc(f,!1);else{if(0!==L||null!==a&&0!==(a.flags&128))for(a=b.child;null!==a;){g=
xd(a);if(null!==g){b.flags|=128;Dc(f,!1);d=g.updateQueue;null!==d&&(b.updateQueue=d,b.flags|=4);b.subtreeFlags=0;d=c;for(c=b.child;null!==c;)f=c,a=d,f.flags&=14680066,g=f.alternate,null===g?(f.childLanes=0,f.lanes=a,f.child=null,f.subtreeFlags=0,f.memoizedProps=null,f.memoizedState=null,f.updateQueue=null,f.dependencies=null,f.stateNode=null):(f.childLanes=g.childLanes,f.lanes=g.lanes,f.child=g.child,f.subtreeFlags=0,f.deletions=null,f.memoizedProps=g.memoizedProps,f.memoizedState=g.memoizedState,
f.updateQueue=g.updateQueue,f.type=g.type,a=g.dependencies,f.dependencies=null===a?null:{lanes:a.lanes,firstContext:a.firstContext}),c=c.sibling;y(F,F.current&1|2);return b.child}a=a.sibling}null!==f.tail&&P()>Hf&&(b.flags|=128,d=!0,Dc(f,!1),b.lanes=4194304)}else{if(!d)if(a=xd(g),null!==a){if(b.flags|=128,d=!0,c=a.updateQueue,null!==c&&(b.updateQueue=c,b.flags|=4),Dc(f,!0),null===f.tail&&"hidden"===f.tailMode&&!g.alternate&&!D)return W(b),null}else 2*P()-f.renderingStartTime>Hf&&1073741824!==c&&(b.flags|=
128,d=!0,Dc(f,!1),b.lanes=4194304);f.isBackwards?(g.sibling=b.child,b.child=g):(c=f.last,null!==c?c.sibling=g:b.child=g,f.last=g)}if(null!==f.tail)return b=f.tail,f.rendering=b,f.tail=b.sibling,f.renderingStartTime=P(),b.sibling=null,c=F.current,y(F,d?c&1|2:c&1),b;W(b);return null;case 22:case 23:return ba=Ga.current,v(Ga),d=null!==b.memoizedState,null!==a&&null!==a.memoizedState!==d&&(b.flags|=8192),d&&0!==(b.mode&1)?0!==(ba&1073741824)&&(W(b),b.subtreeFlags&6&&(b.flags|=8192)):W(b),null;case 24:return null;
case 25:return null}throw Error(m(156,b.tag));}function Bk(a,b,c){Ve(b);switch(b.tag){case 1:return ea(b.type)&&(v(S),v(J)),a=b.flags,a&65536?(b.flags=a&-65537|128,b):null;case 3:return Tb(),v(S),v(J),jf(),a=b.flags,0!==(a&65536)&&0===(a&128)?(b.flags=a&-65537|128,b):null;case 5:return hf(b),null;case 13:v(F);a=b.memoizedState;if(null!==a&&null!==a.dehydrated){if(null===b.alternate)throw Error(m(340));Qb()}a=b.flags;return a&65536?(b.flags=a&-65537|128,b):null;case 19:return v(F),null;case 4:return Tb(),
null;case 10:return cf(b.type._context),null;case 22:case 23:return ba=Ga.current,v(Ga),null;case 24:return null;default:return null}}function Wb(a,b){var c=a.ref;if(null!==c)if("function"===typeof c)try{c(null)}catch(d){G(a,b,d)}else c.current=null}function If(a,b,c){try{c()}catch(d){G(a,b,d)}}function Ck(a,b){Jf=Zc;a=ch();if(Ie(a)){if("selectionStart"in a)var c={start:a.selectionStart,end:a.selectionEnd};else a:{c=(c=a.ownerDocument)&&c.defaultView||window;var d=c.getSelection&&c.getSelection();
if(d&&0!==d.rangeCount){c=d.anchorNode;var e=d.anchorOffset,f=d.focusNode;d=d.focusOffset;try{c.nodeType,f.nodeType}catch(M){c=null;break a}var g=0,h=-1,k=-1,n=0,q=0,u=a,r=null;b:for(;;){for(var p;;){u!==c||0!==e&&3!==u.nodeType||(h=g+e);u!==f||0!==d&&3!==u.nodeType||(k=g+d);3===u.nodeType&&(g+=u.nodeValue.length);if(null===(p=u.firstChild))break;r=u;u=p}for(;;){if(u===a)break b;r===c&&++n===e&&(h=g);r===f&&++q===d&&(k=g);if(null!==(p=u.nextSibling))break;u=r;r=u.parentNode}u=p}c=-1===h||-1===k?null:
{start:h,end:k}}else c=null}c=c||{start:0,end:0}}else c=null;Kf={focusedElem:a,selectionRange:c};Zc=!1;for(l=b;null!==l;)if(b=l,a=b.child,0!==(b.subtreeFlags&1028)&&null!==a)a.return=b,l=a;else for(;null!==l;){b=l;try{var x=b.alternate;if(0!==(b.flags&1024))switch(b.tag){case 0:case 11:case 15:break;case 1:if(null!==x){var v=x.memoizedProps,z=x.memoizedState,w=b.stateNode,A=w.getSnapshotBeforeUpdate(b.elementType===b.type?v:ya(b.type,v),z);w.__reactInternalSnapshotBeforeUpdate=A}break;case 3:var t=
b.stateNode.containerInfo;1===t.nodeType?t.textContent="":9===t.nodeType&&t.documentElement&&t.removeChild(t.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(m(163));}}catch(M){G(b,b.return,M)}a=b.sibling;if(null!==a){a.return=b.return;l=a;break}l=b.return}x=zi;zi=!1;return x}function Gc(a,b,c){var d=b.updateQueue;d=null!==d?d.lastEffect:null;if(null!==d){var e=d=d.next;do{if((e.tag&a)===a){var f=e.destroy;e.destroy=void 0;void 0!==f&&If(b,c,f)}e=e.next}while(e!==d)}}
function Id(a,b){b=b.updateQueue;b=null!==b?b.lastEffect:null;if(null!==b){var c=b=b.next;do{if((c.tag&a)===a){var d=c.create;c.destroy=d()}c=c.next}while(c!==b)}}function Lf(a){var b=a.ref;if(null!==b){var c=a.stateNode;switch(a.tag){case 5:a=c;break;default:a=c}"function"===typeof b?b(a):b.current=a}}function Ai(a){var b=a.alternate;null!==b&&(a.alternate=null,Ai(b));a.child=null;a.deletions=null;a.sibling=null;5===a.tag&&(b=a.stateNode,null!==b&&(delete b[Da],delete b[uc],delete b[Me],delete b[Dk],
delete b[Ek]));a.stateNode=null;a.return=null;a.dependencies=null;a.memoizedProps=null;a.memoizedState=null;a.pendingProps=null;a.stateNode=null;a.updateQueue=null}function Bi(a){return 5===a.tag||3===a.tag||4===a.tag}function Ci(a){a:for(;;){for(;null===a.sibling;){if(null===a.return||Bi(a.return))return null;a=a.return}a.sibling.return=a.return;for(a=a.sibling;5!==a.tag&&6!==a.tag&&18!==a.tag;){if(a.flags&2)continue a;if(null===a.child||4===a.tag)continue a;else a.child.return=a,a=a.child}if(!(a.flags&
2))return a.stateNode}}function Mf(a,b,c){var d=a.tag;if(5===d||6===d)a=a.stateNode,b?8===c.nodeType?c.parentNode.insertBefore(a,b):c.insertBefore(a,b):(8===c.nodeType?(b=c.parentNode,b.insertBefore(a,c)):(b=c,b.appendChild(a)),c=c._reactRootContainer,null!==c&&void 0!==c||null!==b.onclick||(b.onclick=kd));else if(4!==d&&(a=a.child,null!==a))for(Mf(a,b,c),a=a.sibling;null!==a;)Mf(a,b,c),a=a.sibling}function Nf(a,b,c){var d=a.tag;if(5===d||6===d)a=a.stateNode,b?c.insertBefore(a,b):c.appendChild(a);
else if(4!==d&&(a=a.child,null!==a))for(Nf(a,b,c),a=a.sibling;null!==a;)Nf(a,b,c),a=a.sibling}function jb(a,b,c){for(c=c.child;null!==c;)Di(a,b,c),c=c.sibling}function Di(a,b,c){if(Ca&&"function"===typeof Ca.onCommitFiberUnmount)try{Ca.onCommitFiberUnmount(Uc,c)}catch(h){}switch(c.tag){case 5:X||Wb(c,b);case 6:var d=T,e=za;T=null;jb(a,b,c);T=d;za=e;null!==T&&(za?(a=T,c=c.stateNode,8===a.nodeType?a.parentNode.removeChild(c):a.removeChild(c)):T.removeChild(c.stateNode));break;case 18:null!==T&&(za?
(a=T,c=c.stateNode,8===a.nodeType?Re(a.parentNode,c):1===a.nodeType&&Re(a,c),nc(a)):Re(T,c.stateNode));break;case 4:d=T;e=za;T=c.stateNode.containerInfo;za=!0;jb(a,b,c);T=d;za=e;break;case 0:case 11:case 14:case 15:if(!X&&(d=c.updateQueue,null!==d&&(d=d.lastEffect,null!==d))){e=d=d.next;do{var f=e,g=f.destroy;f=f.tag;void 0!==g&&(0!==(f&2)?If(c,b,g):0!==(f&4)&&If(c,b,g));e=e.next}while(e!==d)}jb(a,b,c);break;case 1:if(!X&&(Wb(c,b),d=c.stateNode,"function"===typeof d.componentWillUnmount))try{d.props=
c.memoizedProps,d.state=c.memoizedState,d.componentWillUnmount()}catch(h){G(c,b,h)}jb(a,b,c);break;case 21:jb(a,b,c);break;case 22:c.mode&1?(X=(d=X)||null!==c.memoizedState,jb(a,b,c),X=d):jb(a,b,c);break;default:jb(a,b,c)}}function Ei(a){var b=a.updateQueue;if(null!==b){a.updateQueue=null;var c=a.stateNode;null===c&&(c=a.stateNode=new Fk);b.forEach(function(b){var d=Gk.bind(null,a,b);c.has(b)||(c.add(b),b.then(d,d))})}}function Aa(a,b,c){c=b.deletions;if(null!==c)for(var d=0;d<c.length;d++){var e=
c[d];try{var f=a,g=b,h=g;a:for(;null!==h;){switch(h.tag){case 5:T=h.stateNode;za=!1;break a;case 3:T=h.stateNode.containerInfo;za=!0;break a;case 4:T=h.stateNode.containerInfo;za=!0;break a}h=h.return}if(null===T)throw Error(m(160));Di(f,g,e);T=null;za=!1;var k=e.alternate;null!==k&&(k.return=null);e.return=null}catch(n){G(e,b,n)}}if(b.subtreeFlags&12854)for(b=b.child;null!==b;)Fi(b,a),b=b.sibling}function Fi(a,b,c){var d=a.alternate;c=a.flags;switch(a.tag){case 0:case 11:case 14:case 15:Aa(b,a);
Ha(a);if(c&4){try{Gc(3,a,a.return),Id(3,a)}catch(I){G(a,a.return,I)}try{Gc(5,a,a.return)}catch(I){G(a,a.return,I)}}break;case 1:Aa(b,a);Ha(a);c&512&&null!==d&&Wb(d,d.return);break;case 5:Aa(b,a);Ha(a);c&512&&null!==d&&Wb(d,d.return);if(a.flags&32){var e=a.stateNode;try{Fc(e,"")}catch(I){G(a,a.return,I)}}if(c&4&&(e=a.stateNode,null!=e)){var f=a.memoizedProps,g=null!==d?d.memoizedProps:f,h=a.type,k=a.updateQueue;a.updateQueue=null;if(null!==k)try{"input"===h&&"radio"===f.type&&null!=f.name&&lg(e,f);
qe(h,g);var n=qe(h,f);for(g=0;g<k.length;g+=2){var q=k[g],u=k[g+1];"style"===q?sg(e,u):"dangerouslySetInnerHTML"===q?yi(e,u):"children"===q?Fc(e,u):$d(e,q,u,n)}switch(h){case "input":le(e,f);break;case "textarea":og(e,f);break;case "select":var r=e._wrapperState.wasMultiple;e._wrapperState.wasMultiple=!!f.multiple;var p=f.value;null!=p?Db(e,!!f.multiple,p,!1):r!==!!f.multiple&&(null!=f.defaultValue?Db(e,!!f.multiple,f.defaultValue,!0):Db(e,!!f.multiple,f.multiple?[]:"",!1))}e[uc]=f}catch(I){G(a,a.return,
I)}}break;case 6:Aa(b,a);Ha(a);if(c&4){if(null===a.stateNode)throw Error(m(162));e=a.stateNode;f=a.memoizedProps;try{e.nodeValue=f}catch(I){G(a,a.return,I)}}break;case 3:Aa(b,a);Ha(a);if(c&4&&null!==d&&d.memoizedState.isDehydrated)try{nc(b.containerInfo)}catch(I){G(a,a.return,I)}break;case 4:Aa(b,a);Ha(a);break;case 13:Aa(b,a);Ha(a);e=a.child;e.flags&8192&&(f=null!==e.memoizedState,e.stateNode.isHidden=f,!f||null!==e.alternate&&null!==e.alternate.memoizedState||(Of=P()));c&4&&Ei(a);break;case 22:q=
null!==d&&null!==d.memoizedState;a.mode&1?(X=(n=X)||q,Aa(b,a),X=n):Aa(b,a);Ha(a);if(c&8192){n=null!==a.memoizedState;if((a.stateNode.isHidden=n)&&!q&&0!==(a.mode&1))for(l=a,q=a.child;null!==q;){for(u=l=q;null!==l;){r=l;p=r.child;switch(r.tag){case 0:case 11:case 14:case 15:Gc(4,r,r.return);break;case 1:Wb(r,r.return);var x=r.stateNode;if("function"===typeof x.componentWillUnmount){c=r;b=r.return;try{d=c,x.props=d.memoizedProps,x.state=d.memoizedState,x.componentWillUnmount()}catch(I){G(c,b,I)}}break;
case 5:Wb(r,r.return);break;case 22:if(null!==r.memoizedState){Gi(u);continue}}null!==p?(p.return=r,l=p):Gi(u)}q=q.sibling}a:for(q=null,u=a;;){if(5===u.tag){if(null===q){q=u;try{e=u.stateNode,n?(f=e.style,"function"===typeof f.setProperty?f.setProperty("display","none","important"):f.display="none"):(h=u.stateNode,k=u.memoizedProps.style,g=void 0!==k&&null!==k&&k.hasOwnProperty("display")?k.display:null,h.style.display=rg("display",g))}catch(I){G(a,a.return,I)}}}else if(6===u.tag){if(null===q)try{u.stateNode.nodeValue=
n?"":u.memoizedProps}catch(I){G(a,a.return,I)}}else if((22!==u.tag&&23!==u.tag||null===u.memoizedState||u===a)&&null!==u.child){u.child.return=u;u=u.child;continue}if(u===a)break a;for(;null===u.sibling;){if(null===u.return||u.return===a)break a;q===u&&(q=null);u=u.return}q===u&&(q=null);u.sibling.return=u.return;u=u.sibling}}break;case 19:Aa(b,a);Ha(a);c&4&&Ei(a);break;case 21:break;default:Aa(b,a),Ha(a)}}function Ha(a){var b=a.flags;if(b&2){try{a:{for(var c=a.return;null!==c;){if(Bi(c)){var d=c;
break a}c=c.return}throw Error(m(160));}switch(d.tag){case 5:var e=d.stateNode;d.flags&32&&(Fc(e,""),d.flags&=-33);var f=Ci(a);Nf(a,f,e);break;case 3:case 4:var g=d.stateNode.containerInfo,h=Ci(a);Mf(a,h,g);break;default:throw Error(m(161));}}catch(k){G(a,a.return,k)}a.flags&=-3}b&4096&&(a.flags&=-4097)}function Hk(a,b,c){l=a;Hi(a,b,c)}function Hi(a,b,c){for(var d=0!==(a.mode&1);null!==l;){var e=l,f=e.child;if(22===e.tag&&d){var g=null!==e.memoizedState||Jd;if(!g){var h=e.alternate,k=null!==h&&null!==
h.memoizedState||X;h=Jd;var n=X;Jd=g;if((X=k)&&!n)for(l=e;null!==l;)g=l,k=g.child,22===g.tag&&null!==g.memoizedState?Ii(e):null!==k?(k.return=g,l=k):Ii(e);for(;null!==f;)l=f,Hi(f,b,c),f=f.sibling;l=e;Jd=h;X=n}Ji(a,b,c)}else 0!==(e.subtreeFlags&8772)&&null!==f?(f.return=e,l=f):Ji(a,b,c)}}function Ji(a,b,c){for(;null!==l;){b=l;if(0!==(b.flags&8772)){c=b.alternate;try{if(0!==(b.flags&8772))switch(b.tag){case 0:case 11:case 15:X||Id(5,b);break;case 1:var d=b.stateNode;if(b.flags&4&&!X)if(null===c)d.componentDidMount();
else{var e=b.elementType===b.type?c.memoizedProps:ya(b.type,c.memoizedProps);d.componentDidUpdate(e,c.memoizedState,d.__reactInternalSnapshotBeforeUpdate)}var f=b.updateQueue;null!==f&&Hh(b,f,d);break;case 3:var g=b.updateQueue;if(null!==g){c=null;if(null!==b.child)switch(b.child.tag){case 5:c=b.child.stateNode;break;case 1:c=b.child.stateNode}Hh(b,g,c)}break;case 5:var h=b.stateNode;if(null===c&&b.flags&4){c=h;var k=b.memoizedProps;switch(b.type){case "button":case "input":case "select":case "textarea":k.autoFocus&&
c.focus();break;case "img":k.src&&(c.src=k.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(null===b.memoizedState){var n=b.alternate;if(null!==n){var q=n.memoizedState;if(null!==q){var p=q.dehydrated;null!==p&&nc(p)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(m(163));}X||b.flags&512&&Lf(b)}catch(r){G(b,b.return,r)}}if(b===a){l=null;break}c=b.sibling;if(null!==c){c.return=b.return;l=c;break}l=b.return}}function Gi(a){for(;null!==l;){var b=l;if(b===
a){l=null;break}var c=b.sibling;if(null!==c){c.return=b.return;l=c;break}l=b.return}}function Ii(a){for(;null!==l;){var b=l;try{switch(b.tag){case 0:case 11:case 15:var c=b.return;try{Id(4,b)}catch(k){G(b,c,k)}break;case 1:var d=b.stateNode;if("function"===typeof d.componentDidMount){var e=b.return;try{d.componentDidMount()}catch(k){G(b,e,k)}}var f=b.return;try{Lf(b)}catch(k){G(b,f,k)}break;case 5:var g=b.return;try{Lf(b)}catch(k){G(b,g,k)}}}catch(k){G(b,b.return,k)}if(b===a){l=null;break}var h=b.sibling;
if(null!==h){h.return=b.return;l=h;break}l=b.return}}function Hc(){Hf=P()+500}function Z(){return 0!==(p&6)?P():-1!==Kd?Kd:Kd=P()}function hb(a){if(0===(a.mode&1))return 1;if(0!==(p&2)&&0!==U)return U&-U;if(null!==Ik.transition)return 0===Ld&&(Ld=Dg()),Ld;a=z;if(0!==a)return a;a=window.event;a=void 0===a?16:Lg(a.type);return a}function xa(a,b,c,d){if(50<Ic)throw Ic=0,Pf=null,Error(m(185));ic(a,c,d);if(0===(p&2)||a!==O)a===O&&(0===(p&2)&&(Md|=c),4===L&&kb(a,U)),ia(a,d),1===c&&0===p&&0===(b.mode&1)&&
(Hc(),md&&db())}function ia(a,b){var c=a.callbackNode;tj(a,b);var d=Vc(a,a===O?U:0);if(0===d)null!==c&&Ki(c),a.callbackNode=null,a.callbackPriority=0;else if(b=d&-d,a.callbackPriority!==b){null!=c&&Ki(c);if(1===b)0===a.tag?jk(Li.bind(null,a)):wh(Li.bind(null,a)),Jk(function(){0===(p&6)&&db()}),c=null;else{switch(Eg(d)){case 1:c=De;break;case 4:c=Mg;break;case 16:c=ad;break;case 536870912:c=Ng;break;default:c=ad}c=Mi(c,Ni.bind(null,a))}a.callbackPriority=b;a.callbackNode=c}}function Ni(a,b){Kd=-1;
Ld=0;if(0!==(p&6))throw Error(m(327));var c=a.callbackNode;if(Xb()&&a.callbackNode!==c)return null;var d=Vc(a,a===O?U:0);if(0===d)return null;if(0!==(d&30)||0!==(d&a.expiredLanes)||b)b=Nd(a,d);else{b=d;var e=p;p|=2;var f=Oi();if(O!==a||U!==b)Ra=null,Hc(),wb(a,b);do try{Kk();break}catch(h){Pi(a,h)}while(1);af();Od.current=f;p=e;null!==H?b=0:(O=null,U=0,b=L)}if(0!==b){2===b&&(e=ve(a),0!==e&&(d=e,b=Qf(a,e)));if(1===b)throw c=Jc,wb(a,0),kb(a,d),ia(a,P()),c;if(6===b)kb(a,d);else{e=a.current.alternate;
if(0===(d&30)&&!Lk(e)&&(b=Nd(a,d),2===b&&(f=ve(a),0!==f&&(d=f,b=Qf(a,f))),1===b))throw c=Jc,wb(a,0),kb(a,d),ia(a,P()),c;a.finishedWork=e;a.finishedLanes=d;switch(b){case 0:case 1:throw Error(m(345));case 2:xb(a,ja,Ra);break;case 3:kb(a,d);if((d&130023424)===d&&(b=Of+500-P(),10<b)){if(0!==Vc(a,0))break;e=a.suspendedLanes;if((e&d)!==d){Z();a.pingedLanes|=a.suspendedLanes&e;break}a.timeoutHandle=Rf(xb.bind(null,a,ja,Ra),b);break}xb(a,ja,Ra);break;case 4:kb(a,d);if((d&4194240)===d)break;b=a.eventTimes;
for(e=-1;0<d;){var g=31-ta(d);f=1<<g;g=b[g];g>e&&(e=g);d&=~f}d=e;d=P()-d;d=(120>d?120:480>d?480:1080>d?1080:1920>d?1920:3E3>d?3E3:4320>d?4320:1960*Mk(d/1960))-d;if(10<d){a.timeoutHandle=Rf(xb.bind(null,a,ja,Ra),d);break}xb(a,ja,Ra);break;case 5:xb(a,ja,Ra);break;default:throw Error(m(329));}}}ia(a,P());return a.callbackNode===c?Ni.bind(null,a):null}function Qf(a,b){var c=Kc;a.current.memoizedState.isDehydrated&&(wb(a,b).flags|=256);a=Nd(a,b);2!==a&&(b=ja,ja=c,null!==b&&Gf(b));return a}function Gf(a){null===
ja?ja=a:ja.push.apply(ja,a)}function Lk(a){for(var b=a;;){if(b.flags&16384){var c=b.updateQueue;if(null!==c&&(c=c.stores,null!==c))for(var d=0;d<c.length;d++){var e=c[d],f=e.getSnapshot;e=e.value;try{if(!ua(f(),e))return!1}catch(g){return!1}}}c=b.child;if(b.subtreeFlags&16384&&null!==c)c.return=b,b=c;else{if(b===a)break;for(;null===b.sibling;){if(null===b.return||b.return===a)return!0;b=b.return}b.sibling.return=b.return;b=b.sibling}}return!0}function kb(a,b){b&=~Sf;b&=~Md;a.suspendedLanes|=b;a.pingedLanes&=
~b;for(a=a.expirationTimes;0<b;){var c=31-ta(b),d=1<<c;a[c]=-1;b&=~d}}function Li(a){if(0!==(p&6))throw Error(m(327));Xb();var b=Vc(a,0);if(0===(b&1))return ia(a,P()),null;var c=Nd(a,b);if(0!==a.tag&&2===c){var d=ve(a);0!==d&&(b=d,c=Qf(a,d))}if(1===c)throw c=Jc,wb(a,0),kb(a,b),ia(a,P()),c;if(6===c)throw Error(m(345));a.finishedWork=a.current.alternate;a.finishedLanes=b;xb(a,ja,Ra);ia(a,P());return null}function Tf(a,b){var c=p;p|=1;try{return a(b)}finally{p=c,0===p&&(Hc(),md&&db())}}function yb(a){null!==
lb&&0===lb.tag&&0===(p&6)&&Xb();var b=p;p|=1;var c=ca.transition,d=z;try{if(ca.transition=null,z=1,a)return a()}finally{z=d,ca.transition=c,p=b,0===(p&6)&&db()}}function wb(a,b){a.finishedWork=null;a.finishedLanes=0;var c=a.timeoutHandle;-1!==c&&(a.timeoutHandle=-1,Nk(c));if(null!==H)for(c=H.return;null!==c;){var d=c;Ve(d);switch(d.tag){case 1:d=d.type.childContextTypes;null!==d&&void 0!==d&&(v(S),v(J));break;case 3:Tb();v(S);v(J);jf();break;case 5:hf(d);break;case 4:Tb();break;case 13:v(F);break;
case 19:v(F);break;case 10:cf(d.type._context);break;case 22:case 23:ba=Ga.current,v(Ga)}c=c.return}O=a;H=a=eb(a.current,null);U=ba=b;L=0;Jc=null;Sf=Md=ra=0;ja=Kc=null;if(null!==tb){for(b=0;b<tb.length;b++)if(c=tb[b],d=c.interleaved,null!==d){c.interleaved=null;var e=d.next,f=c.pending;if(null!==f){var g=f.next;f.next=e;d.next=g}c.pending=d}tb=null}return a}function Pi(a,b){do{var c=H;try{af();yd.current=zd;if(Ad){for(var d=C.memoizedState;null!==d;){var e=d.queue;null!==e&&(e.pending=null);d=d.next}Ad=
!1}vb=0;N=K=C=null;zc=!1;Ac=0;Uf.current=null;if(null===c||null===c.return){L=1;Jc=b;H=null;break}a:{var f=a,g=c.return,h=c,k=b;b=U;h.flags|=32768;if(null!==k&&"object"===typeof k&&"function"===typeof k.then){var n=k,l=h,p=l.tag;if(0===(l.mode&1)&&(0===p||11===p||15===p)){var r=l.alternate;r?(l.updateQueue=r.updateQueue,l.memoizedState=r.memoizedState,l.lanes=r.lanes):(l.updateQueue=null,l.memoizedState=null)}var v=ji(g);if(null!==v){v.flags&=-257;ki(v,g,h,f,b);v.mode&1&&ii(f,n,b);b=v;k=n;var x=b.updateQueue;
if(null===x){var z=new Set;z.add(k);b.updateQueue=z}else x.add(k);break a}else{if(0===(b&1)){ii(f,n,b);Ef();break a}k=Error(m(426))}}else if(D&&h.mode&1){var y=ji(g);if(null!==y){0===(y.flags&65536)&&(y.flags|=256);ki(y,g,h,f,b);Ye(Ub(k,h));break a}}f=k=Ub(k,h);4!==L&&(L=2);null===Kc?Kc=[f]:Kc.push(f);f=g;do{switch(f.tag){case 3:f.flags|=65536;b&=-b;f.lanes|=b;var w=gi(f,k,b);Gh(f,w);break a;case 1:h=k;var A=f.type,t=f.stateNode;if(0===(f.flags&128)&&("function"===typeof A.getDerivedStateFromError||
null!==t&&"function"===typeof t.componentDidCatch&&(null===ib||!ib.has(t)))){f.flags|=65536;b&=-b;f.lanes|=b;var B=hi(f,h,b);Gh(f,B);break a}}f=f.return}while(null!==f)}Qi(c)}catch(ma){b=ma;H===c&&null!==c&&(H=c=c.return);continue}break}while(1)}function Oi(){var a=Od.current;Od.current=zd;return null===a?zd:a}function Ef(){if(0===L||3===L||2===L)L=4;null===O||0===(ra&268435455)&&0===(Md&268435455)||kb(O,U)}function Nd(a,b){var c=p;p|=2;var d=Oi();if(O!==a||U!==b)Ra=null,wb(a,b);do try{Ok();break}catch(e){Pi(a,
e)}while(1);af();p=c;Od.current=d;if(null!==H)throw Error(m(261));O=null;U=0;return L}function Ok(){for(;null!==H;)Ri(H)}function Kk(){for(;null!==H&&!Pk();)Ri(H)}function Ri(a){var b=Qk(a.alternate,a,ba);a.memoizedProps=a.pendingProps;null===b?Qi(a):H=b;Uf.current=null}function Qi(a){var b=a;do{var c=b.alternate;a=b.return;if(0===(b.flags&32768)){if(c=xk(c,b,ba),null!==c){H=c;return}}else{c=Bk(c,b);if(null!==c){c.flags&=32767;H=c;return}if(null!==a)a.flags|=32768,a.subtreeFlags=0,a.deletions=null;
else{L=6;H=null;return}}b=b.sibling;if(null!==b){H=b;return}H=b=a}while(null!==b);0===L&&(L=5)}function xb(a,b,c){var d=z,e=ca.transition;try{ca.transition=null,z=1,Rk(a,b,c,d)}finally{ca.transition=e,z=d}return null}function Rk(a,b,c,d){do Xb();while(null!==lb);if(0!==(p&6))throw Error(m(327));c=a.finishedWork;var e=a.finishedLanes;if(null===c)return null;a.finishedWork=null;a.finishedLanes=0;if(c===a.current)throw Error(m(177));a.callbackNode=null;a.callbackPriority=0;var f=c.lanes|c.childLanes;
uj(a,f);a===O&&(H=O=null,U=0);0===(c.subtreeFlags&2064)&&0===(c.flags&2064)||Pd||(Pd=!0,Mi(ad,function(){Xb();return null}));f=0!==(c.flags&15990);if(0!==(c.subtreeFlags&15990)||f){f=ca.transition;ca.transition=null;var g=z;z=1;var h=p;p|=4;Uf.current=null;Ck(a,c);Fi(c,a);Tj(Kf);Zc=!!Jf;Kf=Jf=null;a.current=c;Hk(c,a,e);Sk();p=h;z=g;ca.transition=f}else a.current=c;Pd&&(Pd=!1,lb=a,Qd=e);f=a.pendingLanes;0===f&&(ib=null);oj(c.stateNode,d);ia(a,P());if(null!==b)for(d=a.onRecoverableError,c=0;c<b.length;c++)e=
b[c],d(e.value,{componentStack:e.stack,digest:e.digest});if(Ed)throw Ed=!1,a=xf,xf=null,a;0!==(Qd&1)&&0!==a.tag&&Xb();f=a.pendingLanes;0!==(f&1)?a===Pf?Ic++:(Ic=0,Pf=a):Ic=0;db();return null}function Xb(){if(null!==lb){var a=Eg(Qd),b=ca.transition,c=z;try{ca.transition=null;z=16>a?16:a;if(null===lb)var d=!1;else{a=lb;lb=null;Qd=0;if(0!==(p&6))throw Error(m(331));var e=p;p|=4;for(l=a.current;null!==l;){var f=l,g=f.child;if(0!==(l.flags&16)){var h=f.deletions;if(null!==h){for(var k=0;k<h.length;k++){var n=
h[k];for(l=n;null!==l;){var q=l;switch(q.tag){case 0:case 11:case 15:Gc(8,q,f)}var u=q.child;if(null!==u)u.return=q,l=u;else for(;null!==l;){q=l;var r=q.sibling,v=q.return;Ai(q);if(q===n){l=null;break}if(null!==r){r.return=v;l=r;break}l=v}}}var x=f.alternate;if(null!==x){var y=x.child;if(null!==y){x.child=null;do{var C=y.sibling;y.sibling=null;y=C}while(null!==y)}}l=f}}if(0!==(f.subtreeFlags&2064)&&null!==g)g.return=f,l=g;else b:for(;null!==l;){f=l;if(0!==(f.flags&2048))switch(f.tag){case 0:case 11:case 15:Gc(9,
f,f.return)}var w=f.sibling;if(null!==w){w.return=f.return;l=w;break b}l=f.return}}var A=a.current;for(l=A;null!==l;){g=l;var t=g.child;if(0!==(g.subtreeFlags&2064)&&null!==t)t.return=g,l=t;else b:for(g=A;null!==l;){h=l;if(0!==(h.flags&2048))try{switch(h.tag){case 0:case 11:case 15:Id(9,h)}}catch(ma){G(h,h.return,ma)}if(h===g){l=null;break b}var B=h.sibling;if(null!==B){B.return=h.return;l=B;break b}l=h.return}}p=e;db();if(Ca&&"function"===typeof Ca.onPostCommitFiberRoot)try{Ca.onPostCommitFiberRoot(Uc,
a)}catch(ma){}d=!0}return d}finally{z=c,ca.transition=b}}return!1}function Si(a,b,c){b=Ub(c,b);b=gi(a,b,1);a=fb(a,b,1);b=Z();null!==a&&(ic(a,1,b),ia(a,b))}function G(a,b,c){if(3===a.tag)Si(a,a,c);else for(;null!==b;){if(3===b.tag){Si(b,a,c);break}else if(1===b.tag){var d=b.stateNode;if("function"===typeof b.type.getDerivedStateFromError||"function"===typeof d.componentDidCatch&&(null===ib||!ib.has(d))){a=Ub(c,a);a=hi(b,a,1);b=fb(b,a,1);a=Z();null!==b&&(ic(b,1,a),ia(b,a));break}}b=b.return}}function sk(a,
b,c){var d=a.pingCache;null!==d&&d.delete(b);b=Z();a.pingedLanes|=a.suspendedLanes&c;O===a&&(U&c)===c&&(4===L||3===L&&(U&130023424)===U&&500>P()-Of?wb(a,0):Sf|=c);ia(a,b)}function Ti(a,b){0===b&&(0===(a.mode&1)?b=1:(b=Rd,Rd<<=1,0===(Rd&130023424)&&(Rd=4194304)));var c=Z();a=Oa(a,b);null!==a&&(ic(a,b,c),ia(a,c))}function vk(a){var b=a.memoizedState,c=0;null!==b&&(c=b.retryLane);Ti(a,c)}function Gk(a,b){var c=0;switch(a.tag){case 13:var d=a.stateNode;var e=a.memoizedState;null!==e&&(c=e.retryLane);
break;case 19:d=a.stateNode;break;default:throw Error(m(314));}null!==d&&d.delete(b);Ti(a,c)}function Mi(a,b){return xh(a,b)}function Tk(a,b,c,d){this.tag=a;this.key=c;this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null;this.index=0;this.ref=null;this.pendingProps=b;this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null;this.mode=d;this.subtreeFlags=this.flags=0;this.deletions=null;this.childLanes=this.lanes=0;this.alternate=null}function yf(a){a=
a.prototype;return!(!a||!a.isReactComponent)}function Uk(a){if("function"===typeof a)return yf(a)?1:0;if(void 0!==a&&null!==a){a=a.$$typeof;if(a===ie)return 11;if(a===je)return 14}return 2}function eb(a,b){var c=a.alternate;null===c?(c=pa(a.tag,b,a.key,a.mode),c.elementType=a.elementType,c.type=a.type,c.stateNode=a.stateNode,c.alternate=a,a.alternate=c):(c.pendingProps=b,c.type=a.type,c.flags=0,c.subtreeFlags=0,c.deletions=null);c.flags=a.flags&14680064;c.childLanes=a.childLanes;c.lanes=a.lanes;c.child=
a.child;c.memoizedProps=a.memoizedProps;c.memoizedState=a.memoizedState;c.updateQueue=a.updateQueue;b=a.dependencies;c.dependencies=null===b?null:{lanes:b.lanes,firstContext:b.firstContext};c.sibling=a.sibling;c.index=a.index;c.ref=a.ref;return c}function rd(a,b,c,d,e,f){var g=2;d=a;if("function"===typeof a)yf(a)&&(g=1);else if("string"===typeof a)g=5;else a:switch(a){case Bb:return sb(c.children,e,f,b);case fe:g=8;e|=8;break;case ee:return a=pa(12,c,b,e|2),a.elementType=ee,a.lanes=f,a;case ge:return a=
pa(13,c,b,e),a.elementType=ge,a.lanes=f,a;case he:return a=pa(19,c,b,e),a.elementType=he,a.lanes=f,a;case Ui:return Gd(c,e,f,b);default:if("object"===typeof a&&null!==a)switch(a.$$typeof){case hg:g=10;break a;case gg:g=9;break a;case ie:g=11;break a;case je:g=14;break a;case Ta:g=16;d=null;break a}throw Error(m(130,null==a?a:typeof a,""));}b=pa(g,c,b,e);b.elementType=a;b.type=d;b.lanes=f;return b}function sb(a,b,c,d){a=pa(7,a,d,b);a.lanes=c;return a}function Gd(a,b,c,d){a=pa(22,a,d,b);a.elementType=
Ui;a.lanes=c;a.stateNode={isHidden:!1};return a}function Ze(a,b,c){a=pa(6,a,null,b);a.lanes=c;return a}function $e(a,b,c){b=pa(4,null!==a.children?a.children:[],a.key,b);b.lanes=c;b.stateNode={containerInfo:a.containerInfo,pendingChildren:null,implementation:a.implementation};return b}function Vk(a,b,c,d,e){this.tag=b;this.containerInfo=a;this.finishedWork=this.pingCache=this.current=this.pendingChildren=null;this.timeoutHandle=-1;this.callbackNode=this.pendingContext=this.context=null;this.callbackPriority=
0;this.eventTimes=we(0);this.expirationTimes=we(-1);this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0;this.entanglements=we(0);this.identifierPrefix=d;this.onRecoverableError=e;this.mutableSourceEagerHydrationData=null}function Vf(a,b,c,d,e,f,g,h,k,l){a=new Vk(a,b,c,h,k);1===b?(b=1,!0===f&&(b|=8)):b=0;f=pa(3,null,null,b);a.current=f;f.stateNode=a;f.memoizedState={element:d,isDehydrated:c,cache:null,transitions:null,
pendingSuspenseBoundaries:null};ff(f);return a}function Wk(a,b,c){var d=3<arguments.length&&void 0!==arguments[3]?arguments[3]:null;return{$$typeof:Cb,key:null==d?null:""+d,children:a,containerInfo:b,implementation:c}}function Vi(a){if(!a)return cb;a=a._reactInternals;a:{if(nb(a)!==a||1!==a.tag)throw Error(m(170));var b=a;do{switch(b.tag){case 3:b=b.stateNode.context;break a;case 1:if(ea(b.type)){b=b.stateNode.__reactInternalMemoizedMergedChildContext;break a}}b=b.return}while(null!==b);throw Error(m(171));
}if(1===a.tag){var c=a.type;if(ea(c))return uh(a,c,b)}return b}function Wi(a,b,c,d,e,f,g,h,k,l){a=Vf(c,d,!0,a,e,f,g,h,k);a.context=Vi(null);c=a.current;d=Z();e=hb(c);f=Pa(d,e);f.callback=void 0!==b&&null!==b?b:null;fb(c,f,e);a.current.lanes=e;ic(a,e,d);ia(a,d);return a}function Sd(a,b,c,d){var e=b.current,f=Z(),g=hb(e);c=Vi(c);null===b.context?b.context=c:b.pendingContext=c;b=Pa(f,g);b.payload={element:a};d=void 0===d?null:d;null!==d&&(b.callback=d);a=fb(e,b,g);null!==a&&(xa(a,e,g,f),vd(a,e,g));return g}
function Td(a){a=a.current;if(!a.child)return null;switch(a.child.tag){case 5:return a.child.stateNode;default:return a.child.stateNode}}function Xi(a,b){a=a.memoizedState;if(null!==a&&null!==a.dehydrated){var c=a.retryLane;a.retryLane=0!==c&&c<b?c:b}}function Wf(a,b){Xi(a,b);(a=a.alternate)&&Xi(a,b)}function Xk(a){a=Bg(a);return null===a?null:a.stateNode}function Yk(a){return null}function Xf(a){this._internalRoot=a}function Ud(a){this._internalRoot=a}function Yf(a){return!(!a||1!==a.nodeType&&9!==
a.nodeType&&11!==a.nodeType)}function Vd(a){return!(!a||1!==a.nodeType&&9!==a.nodeType&&11!==a.nodeType&&(8!==a.nodeType||" react-mount-point-unstable "!==a.nodeValue))}function Yi(){}function Zk(a,b,c,d,e){if(e){if("function"===typeof d){var f=d;d=function(){var a=Td(g);f.call(a)}}var g=Wi(b,d,a,0,null,!1,!1,"",Yi);a._reactRootContainer=g;a[Ja]=g.current;sc(8===a.nodeType?a.parentNode:a);yb();return g}for(;e=a.lastChild;)a.removeChild(e);if("function"===typeof d){var h=d;d=function(){var a=Td(k);
h.call(a)}}var k=Vf(a,0,!1,null,null,!1,!1,"",Yi);a._reactRootContainer=k;a[Ja]=k.current;sc(8===a.nodeType?a.parentNode:a);yb(function(){Sd(b,k,c,d)});return k}function Wd(a,b,c,d,e){var f=c._reactRootContainer;if(f){var g=f;if("function"===typeof e){var h=e;e=function(){var a=Td(g);h.call(a)}}Sd(b,g,a,e)}else g=Zk(c,b,a,e,d);return Td(g)}var cg=new Set,$b={},Ia=!("undefined"===typeof window||"undefined"===typeof window.document||"undefined"===typeof window.document.createElement),Zd=Object.prototype.hasOwnProperty,
cj=/^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$/,eg={},dg={},R={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(a){R[a]=
new Y(a,0,!1,a,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(a){var b=a[0];R[b]=new Y(b,1,!1,a[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(a){R[a]=new Y(a,2,!1,a.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(a){R[a]=new Y(a,2,!1,a,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(a){R[a]=
new Y(a,3,!1,a.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(a){R[a]=new Y(a,3,!0,a,null,!1,!1)});["capture","download"].forEach(function(a){R[a]=new Y(a,4,!1,a,null,!1,!1)});["cols","rows","size","span"].forEach(function(a){R[a]=new Y(a,6,!1,a,null,!1,!1)});["rowSpan","start"].forEach(function(a){R[a]=new Y(a,5,!1,a.toLowerCase(),null,!1,!1)});var Zf=/[\\-:]([a-z])/g,$f=function(a){return a[1].toUpperCase()};"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(a){var b=
a.replace(Zf,$f);R[b]=new Y(b,1,!1,a,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(a){var b=a.replace(Zf,$f);R[b]=new Y(b,1,!1,a,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(a){var b=a.replace(Zf,$f);R[b]=new Y(b,1,!1,a,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(a){R[a]=new Y(a,1,!1,a.toLowerCase(),null,!1,!1)});R.xlinkHref=new Y("xlinkHref",
1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(a){R[a]=new Y(a,1,!1,a.toLowerCase(),null,!0,!0)});var Sa=zb.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,sd=Symbol.for("react.element"),Cb=Symbol.for("react.portal"),Bb=Symbol.for("react.fragment"),fe=Symbol.for("react.strict_mode"),ee=Symbol.for("react.profiler"),hg=Symbol.for("react.provider"),gg=Symbol.for("react.context"),ie=Symbol.for("react.forward_ref"),ge=Symbol.for("react.suspense"),
he=Symbol.for("react.suspense_list"),je=Symbol.for("react.memo"),Ta=Symbol.for("react.lazy");Symbol.for("react.scope");Symbol.for("react.debug_trace_mode");var Ui=Symbol.for("react.offscreen");Symbol.for("react.legacy_hidden");Symbol.for("react.cache");Symbol.for("react.tracing_marker");var fg=Symbol.iterator,E=Object.assign,ae,ce=!1,cc=Array.isArray,Xd,yi=function(a){return"undefined"!==typeof MSApp&&MSApp.execUnsafeLocalFunction?function(b,c,d,e){MSApp.execUnsafeLocalFunction(function(){return a(b,
c,d,e)})}:a}(function(a,b){if("http://www.w3.org/2000/svg"!==a.namespaceURI||"innerHTML"in a)a.innerHTML=b;else{Xd=Xd||document.createElement("div");Xd.innerHTML="<svg>"+b.valueOf().toString()+"</svg>";for(b=Xd.firstChild;a.firstChild;)a.removeChild(a.firstChild);for(;b.firstChild;)a.appendChild(b.firstChild)}}),Fc=function(a,b){if(b){var c=a.firstChild;if(c&&c===a.lastChild&&3===c.nodeType){c.nodeValue=b;return}}a.textContent=b},dc={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,
borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,
strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},$k=["Webkit","ms","Moz","O"];Object.keys(dc).forEach(function(a){$k.forEach(function(b){b=b+a.charAt(0).toUpperCase()+a.substring(1);dc[b]=dc[a]})});var ij=E({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0}),ze=null,se=null,Eb=null,Fb=null,xg=function(a,b){return a(b)},yg=function(){},te=!1,Oe=!1;if(Ia)try{var Lc={};Object.defineProperty(Lc,
"passive",{get:function(){Oe=!0}});window.addEventListener("test",Lc,Lc);window.removeEventListener("test",Lc,Lc)}catch(a){Oe=!1}var kj=function(a,b,c,d,e,f,g,h,k){var l=Array.prototype.slice.call(arguments,3);try{b.apply(c,l)}catch(q){this.onError(q)}},gc=!1,Sc=null,Tc=!1,ue=null,lj={onError:function(a){gc=!0;Sc=a}},Ba=zb.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.Scheduler,Jg=Ba.unstable_scheduleCallback,Kg=Ba.unstable_NormalPriority,xh=Jg,Ki=Ba.unstable_cancelCallback,Pk=Ba.unstable_shouldYield,
Sk=Ba.unstable_requestPaint,P=Ba.unstable_now,Dj=Ba.unstable_getCurrentPriorityLevel,De=Ba.unstable_ImmediatePriority,Mg=Ba.unstable_UserBlockingPriority,ad=Kg,Ej=Ba.unstable_LowPriority,Ng=Ba.unstable_IdlePriority,Uc=null,Ca=null,ta=Math.clz32?Math.clz32:pj,qj=Math.log,rj=Math.LN2,Wc=64,Rd=4194304,z=0,Ae=!1,Yc=[],Va=null,Wa=null,Xa=null,jc=new Map,kc=new Map,Ya=[],Bj="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" "),
Gb=Sa.ReactCurrentBatchConfig,Zc=!0,$c=null,Za=null,Ee=null,bd=null,Yb={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(a){return a.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},He=ka(Yb),Mc=E({},Yb,{view:0,detail:0}),ak=ka(Mc),ag,bg,Nc,Yd=E({},Mc,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Fe,button:0,buttons:0,relatedTarget:function(a){return void 0===a.relatedTarget?a.fromElement===a.srcElement?a.toElement:a.fromElement:
a.relatedTarget},movementX:function(a){if("movementX"in a)return a.movementX;a!==Nc&&(Nc&&"mousemove"===a.type?(ag=a.screenX-Nc.screenX,bg=a.screenY-Nc.screenY):bg=ag=0,Nc=a);return ag},movementY:function(a){return"movementY"in a?a.movementY:bg}}),ih=ka(Yd),al=E({},Yd,{dataTransfer:0}),Wj=ka(al),bl=E({},Mc,{relatedTarget:0}),Pe=ka(bl),cl=E({},Yb,{animationName:0,elapsedTime:0,pseudoElement:0}),Yj=ka(cl),dl=E({},Yb,{clipboardData:function(a){return"clipboardData"in a?a.clipboardData:window.clipboardData}}),
ck=ka(dl),el=E({},Yb,{data:0}),qh=ka(el),fk=qh,fl={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},gl={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",
112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Gj={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"},hl=E({},Mc,{key:function(a){if(a.key){var b=fl[a.key]||a.key;if("Unidentified"!==b)return b}return"keypress"===a.type?(a=cd(a),13===a?"Enter":String.fromCharCode(a)):"keydown"===a.type||"keyup"===a.type?gl[a.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,
metaKey:0,repeat:0,locale:0,getModifierState:Fe,charCode:function(a){return"keypress"===a.type?cd(a):0},keyCode:function(a){return"keydown"===a.type||"keyup"===a.type?a.keyCode:0},which:function(a){return"keypress"===a.type?cd(a):"keydown"===a.type||"keyup"===a.type?a.keyCode:0}}),Vj=ka(hl),il=E({},Yd,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),nh=ka(il),jl=E({},Mc,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,
ctrlKey:0,shiftKey:0,getModifierState:Fe}),Xj=ka(jl),kl=E({},Yb,{propertyName:0,elapsedTime:0,pseudoElement:0}),Zj=ka(kl),ll=E({},Yd,{deltaX:function(a){return"deltaX"in a?a.deltaX:"wheelDeltaX"in a?-a.wheelDeltaX:0},deltaY:function(a){return"deltaY"in a?a.deltaY:"wheelDeltaY"in a?-a.wheelDeltaY:"wheelDelta"in a?-a.wheelDelta:0},deltaZ:0,deltaMode:0}),bk=ka(ll),Hj=[9,13,27,32],Ge=Ia&&"CompositionEvent"in window,Oc=null;Ia&&"documentMode"in document&&(Oc=document.documentMode);var ek=Ia&&"TextEvent"in
window&&!Oc,Ug=Ia&&(!Ge||Oc&&8<Oc&&11>=Oc),Tg=String.fromCharCode(32),Sg=!1,Hb=!1,Kj={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0},oc=null,pc=null,ph=!1;Ia&&(ph=Lj("input")&&(!document.documentMode||9<document.documentMode));var ua="function"===typeof Object.is?Object.is:Sj,dk=Ia&&"documentMode"in document&&11>=document.documentMode,Jb=null,Ke=null,rc=null,Je=!1,Kb={animationend:gd("Animation","AnimationEnd"),
animationiteration:gd("Animation","AnimationIteration"),animationstart:gd("Animation","AnimationStart"),transitionend:gd("Transition","TransitionEnd")},Le={},eh={};Ia&&(eh=document.createElement("div").style,"AnimationEvent"in window||(delete Kb.animationend.animation,delete Kb.animationiteration.animation,delete Kb.animationstart.animation),"TransitionEvent"in window||delete Kb.transitionend.transition);var jh=hd("animationend"),kh=hd("animationiteration"),lh=hd("animationstart"),mh=hd("transitionend"),
fh=new Map,Zi="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
(function(){for(var a=0;a<Zi.length;a++){var b=Zi[a],c=b.toLowerCase();b=b[0].toUpperCase()+b.slice(1);$a(c,"on"+b)}$a(jh,"onAnimationEnd");$a(kh,"onAnimationIteration");$a(lh,"onAnimationStart");$a("dblclick","onDoubleClick");$a("focusin","onFocus");$a("focusout","onBlur");$a(mh,"onTransitionEnd")})();Ab("onMouseEnter",["mouseout","mouseover"]);Ab("onMouseLeave",["mouseout","mouseover"]);Ab("onPointerEnter",["pointerout","pointerover"]);Ab("onPointerLeave",["pointerout","pointerover"]);mb("onChange",
"change click focusin focusout input keydown keyup selectionchange".split(" "));mb("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));mb("onBeforeInput",["compositionend","keypress","textInput","paste"]);mb("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));mb("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));mb("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var Ec="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Uj=new Set("cancel close invalid load scroll toggle".split(" ").concat(Ec)),id="_reactListening"+Math.random().toString(36).slice(2),gk=/\\r\\n?/g,hk=/\\u0000|\\uFFFD/g,Jf=null,Kf=null,Rf="function"===typeof setTimeout?setTimeout:void 0,Nk="function"===typeof clearTimeout?
clearTimeout:void 0,$i="function"===typeof Promise?Promise:void 0,Jk="function"===typeof queueMicrotask?queueMicrotask:"undefined"!==typeof $i?function(a){return $i.resolve(null).then(a).catch(ik)}:Rf,Zb=Math.random().toString(36).slice(2),Da="__reactFiber$"+Zb,uc="__reactProps$"+Zb,Ja="__reactContainer$"+Zb,Me="__reactEvents$"+Zb,Dk="__reactListeners$"+Zb,Ek="__reactHandles$"+Zb,Se=[],Mb=-1,cb={},J=bb(cb),S=bb(!1),pb=cb,La=null,md=!1,Te=!1,Ob=[],Pb=0,od=null,nd=0,na=[],oa=0,rb=null,Ma=1,Na="",la=
null,fa=null,D=!1,wa=null,Ik=Sa.ReactCurrentBatchConfig,Vb=Dh(!0),li=Dh(!1),ud=bb(null),td=null,Rb=null,bf=null,tb=null,kk=Oa,gb=!1,wc={},Ea=bb(wc),yc=bb(wc),xc=bb(wc),F=bb(0),kf=[],yd=Sa.ReactCurrentDispatcher,sf=Sa.ReactCurrentBatchConfig,vb=0,C=null,K=null,N=null,Ad=!1,zc=!1,Ac=0,ml=0,zd={readContext:qa,useCallback:V,useContext:V,useEffect:V,useImperativeHandle:V,useInsertionEffect:V,useLayoutEffect:V,useMemo:V,useReducer:V,useRef:V,useState:V,useDebugValue:V,useDeferredValue:V,useTransition:V,
useMutableSource:V,useSyncExternalStore:V,useId:V,unstable_isNewReconciler:!1},lk={readContext:qa,useCallback:function(a,b){Fa().memoizedState=[a,void 0===b?null:b];return a},useContext:qa,useEffect:Sh,useImperativeHandle:function(a,b,c){c=null!==c&&void 0!==c?c.concat([a]):null;return Bd(4194308,4,Vh.bind(null,b,a),c)},useLayoutEffect:function(a,b){return Bd(4194308,4,a,b)},useInsertionEffect:function(a,b){return Bd(4,2,a,b)},useMemo:function(a,b){var c=Fa();b=void 0===b?null:b;a=a();c.memoizedState=
[a,b];return a},useReducer:function(a,b,c){var d=Fa();b=void 0!==c?c(b):b;d.memoizedState=d.baseState=b;a={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:a,lastRenderedState:b};d.queue=a;a=a.dispatch=qk.bind(null,C,a);return[d.memoizedState,a]},useRef:function(a){var b=Fa();a={current:a};return b.memoizedState=a},useState:Qh,useDebugValue:rf,useDeferredValue:function(a){return Fa().memoizedState=a},useTransition:function(){var a=Qh(!1),b=a[0];a=pk.bind(null,a[1]);Fa().memoizedState=
a;return[b,a]},useMutableSource:function(a,b,c){},useSyncExternalStore:function(a,b,c){var d=C,e=Fa();if(D){if(void 0===c)throw Error(m(407));c=c()}else{c=b();if(null===O)throw Error(m(349));0!==(vb&30)||Nh(d,b,c)}e.memoizedState=c;var f={value:c,getSnapshot:b};e.queue=f;Sh(Lh.bind(null,d,f,a),[a]);d.flags|=2048;Cc(9,Mh.bind(null,d,f,c,b),void 0,null);return c},useId:function(){var a=Fa(),b=O.identifierPrefix;if(D){var c=Na;var d=Ma;c=(d&~(1<<32-ta(d)-1)).toString(32)+c;b=":"+b+"R"+c;c=Ac++;0<c&&
(b+="H"+c.toString(32));b+=":"}else c=ml++,b=":"+b+"r"+c.toString(32)+":";return a.memoizedState=b},unstable_isNewReconciler:!1},mk={readContext:qa,useCallback:Xh,useContext:qa,useEffect:qf,useImperativeHandle:Wh,useInsertionEffect:Th,useLayoutEffect:Uh,useMemo:Yh,useReducer:of,useRef:Rh,useState:function(a){return of(Bc)},useDebugValue:rf,useDeferredValue:function(a){var b=sa();return Zh(b,K.memoizedState,a)},useTransition:function(){var a=of(Bc)[0],b=sa().memoizedState;return[a,b]},useMutableSource:Jh,
useSyncExternalStore:Kh,useId:$h,unstable_isNewReconciler:!1},nk={readContext:qa,useCallback:Xh,useContext:qa,useEffect:qf,useImperativeHandle:Wh,useInsertionEffect:Th,useLayoutEffect:Uh,useMemo:Yh,useReducer:pf,useRef:Rh,useState:function(a){return pf(Bc)},useDebugValue:rf,useDeferredValue:function(a){var b=sa();return null===K?b.memoizedState=a:Zh(b,K.memoizedState,a)},useTransition:function(){var a=pf(Bc)[0],b=sa().memoizedState;return[a,b]},useMutableSource:Jh,useSyncExternalStore:Kh,useId:$h,
unstable_isNewReconciler:!1},Dd={isMounted:function(a){return(a=a._reactInternals)?nb(a)===a:!1},enqueueSetState:function(a,b,c){a=a._reactInternals;var d=Z(),e=hb(a),f=Pa(d,e);f.payload=b;void 0!==c&&null!==c&&(f.callback=c);b=fb(a,f,e);null!==b&&(xa(b,a,e,d),vd(b,a,e))},enqueueReplaceState:function(a,b,c){a=a._reactInternals;var d=Z(),e=hb(a),f=Pa(d,e);f.tag=1;f.payload=b;void 0!==c&&null!==c&&(f.callback=c);b=fb(a,f,e);null!==b&&(xa(b,a,e,d),vd(b,a,e))},enqueueForceUpdate:function(a,b){a=a._reactInternals;
var c=Z(),d=hb(a),e=Pa(c,d);e.tag=2;void 0!==b&&null!==b&&(e.callback=b);b=fb(a,e,d);null!==b&&(xa(b,a,d,c),vd(b,a,d))}},rk="function"===typeof WeakMap?WeakMap:Map,tk=Sa.ReactCurrentOwner,ha=!1,Cf={dehydrated:null,treeContext:null,retryLane:0};var zk=function(a,b,c,d){for(c=b.child;null!==c;){if(5===c.tag||6===c.tag)a.appendChild(c.stateNode);else if(4!==c.tag&&null!==c.child){c.child.return=c;c=c.child;continue}if(c===b)break;for(;null===c.sibling;){if(null===c.return||c.return===b)return;c=c.return}c.sibling.return=
c.return;c=c.sibling}};var xi=function(a,b){};var yk=function(a,b,c,d,e){var f=a.memoizedProps;if(f!==d){a=b.stateNode;ub(Ea.current);e=null;switch(c){case "input":f=ke(a,f);d=ke(a,d);e=[];break;case "select":f=E({},f,{value:void 0});d=E({},d,{value:void 0});e=[];break;case "textarea":f=ne(a,f);d=ne(a,d);e=[];break;default:"function"!==typeof f.onClick&&"function"===typeof d.onClick&&(a.onclick=kd)}pe(c,d);var g;c=null;for(l in f)if(!d.hasOwnProperty(l)&&f.hasOwnProperty(l)&&null!=f[l])if("style"===
l){var h=f[l];for(g in h)h.hasOwnProperty(g)&&(c||(c={}),c[g]="")}else"dangerouslySetInnerHTML"!==l&&"children"!==l&&"suppressContentEditableWarning"!==l&&"suppressHydrationWarning"!==l&&"autoFocus"!==l&&($b.hasOwnProperty(l)?e||(e=[]):(e=e||[]).push(l,null));for(l in d){var k=d[l];h=null!=f?f[l]:void 0;if(d.hasOwnProperty(l)&&k!==h&&(null!=k||null!=h))if("style"===l)if(h){for(g in h)!h.hasOwnProperty(g)||k&&k.hasOwnProperty(g)||(c||(c={}),c[g]="");for(g in k)k.hasOwnProperty(g)&&h[g]!==k[g]&&(c||
(c={}),c[g]=k[g])}else c||(e||(e=[]),e.push(l,c)),c=k;else"dangerouslySetInnerHTML"===l?(k=k?k.__html:void 0,h=h?h.__html:void 0,null!=k&&h!==k&&(e=e||[]).push(l,k)):"children"===l?"string"!==typeof k&&"number"!==typeof k||(e=e||[]).push(l,""+k):"suppressContentEditableWarning"!==l&&"suppressHydrationWarning"!==l&&($b.hasOwnProperty(l)?(null!=k&&"onScroll"===l&&B("scroll",a),e||h===k||(e=[])):(e=e||[]).push(l,k))}c&&(e=e||[]).push("style",c);var l=e;if(b.updateQueue=l)b.flags|=4}};var Ak=function(a,
b,c,d){c!==d&&(b.flags|=4)};var Jd=!1,X=!1,Fk="function"===typeof WeakSet?WeakSet:Set,l=null,zi=!1,T=null,za=!1,Mk=Math.ceil,Od=Sa.ReactCurrentDispatcher,Uf=Sa.ReactCurrentOwner,ca=Sa.ReactCurrentBatchConfig,p=0,O=null,H=null,U=0,ba=0,Ga=bb(0),L=0,Jc=null,ra=0,Md=0,Sf=0,Kc=null,ja=null,Of=0,Hf=Infinity,Ra=null,Ed=!1,xf=null,ib=null,Pd=!1,lb=null,Qd=0,Ic=0,Pf=null,Kd=-1,Ld=0;var Qk=function(a,b,c){if(null!==a)if(a.memoizedProps!==b.pendingProps||S.current)ha=!0;else{if(0===(a.lanes&c)&&0===(b.flags&
128))return ha=!1,wk(a,b,c);ha=0!==(a.flags&131072)?!0:!1}else ha=!1,D&&0!==(b.flags&1048576)&&yh(b,nd,b.index);b.lanes=0;switch(b.tag){case 2:var d=b.type;Fd(a,b);a=b.pendingProps;var e=Nb(b,J.current);Sb(b,c);e=mf(null,b,d,a,e,c);var f=nf();b.flags|=1;"object"===typeof e&&null!==e&&"function"===typeof e.render&&void 0===e.$$typeof?(b.tag=1,b.memoizedState=null,b.updateQueue=null,ea(d)?(f=!0,ld(b)):f=!1,b.memoizedState=null!==e.state&&void 0!==e.state?e.state:null,ff(b),e.updater=Dd,b.stateNode=
e,e._reactInternals=b,uf(b,d,a,c),b=Af(null,b,d,!0,f,c)):(b.tag=0,D&&f&&Ue(b),aa(null,b,e,c),b=b.child);return b;case 16:d=b.elementType;a:{Fd(a,b);a=b.pendingProps;e=d._init;d=e(d._payload);b.type=d;e=b.tag=Uk(d);a=ya(d,a);switch(e){case 0:b=zf(null,b,d,a,c);break a;case 1:b=ri(null,b,d,a,c);break a;case 11:b=mi(null,b,d,a,c);break a;case 14:b=ni(null,b,d,ya(d.type,a),c);break a}throw Error(m(306,d,""));}return b;case 0:return d=b.type,e=b.pendingProps,e=b.elementType===d?e:ya(d,e),zf(a,b,d,e,c);
case 1:return d=b.type,e=b.pendingProps,e=b.elementType===d?e:ya(d,e),ri(a,b,d,e,c);case 3:a:{si(b);if(null===a)throw Error(m(387));d=b.pendingProps;f=b.memoizedState;e=f.element;Fh(a,b);wd(b,d,null,c);var g=b.memoizedState;d=g.element;if(f.isDehydrated)if(f={element:d,isDehydrated:!1,cache:g.cache,pendingSuspenseBoundaries:g.pendingSuspenseBoundaries,transitions:g.transitions},b.updateQueue.baseState=f,b.memoizedState=f,b.flags&256){e=Ub(Error(m(423)),b);b=ti(a,b,d,c,e);break a}else if(d!==e){e=
Ub(Error(m(424)),b);b=ti(a,b,d,c,e);break a}else for(fa=Ka(b.stateNode.containerInfo.firstChild),la=b,D=!0,wa=null,c=li(b,null,d,c),b.child=c;c;)c.flags=c.flags&-3|4096,c=c.sibling;else{Qb();if(d===e){b=Qa(a,b,c);break a}aa(a,b,d,c)}b=b.child}return b;case 5:return Ih(b),null===a&&Xe(b),d=b.type,e=b.pendingProps,f=null!==a?a.memoizedProps:null,g=e.children,Qe(d,e)?g=null:null!==f&&Qe(d,f)&&(b.flags|=32),qi(a,b),aa(a,b,g,c),b.child;case 6:return null===a&&Xe(b),null;case 13:return ui(a,b,c);case 4:return gf(b,
b.stateNode.containerInfo),d=b.pendingProps,null===a?b.child=Vb(b,null,d,c):aa(a,b,d,c),b.child;case 11:return d=b.type,e=b.pendingProps,e=b.elementType===d?e:ya(d,e),mi(a,b,d,e,c);case 7:return aa(a,b,b.pendingProps,c),b.child;case 8:return aa(a,b,b.pendingProps.children,c),b.child;case 12:return aa(a,b,b.pendingProps.children,c),b.child;case 10:a:{d=b.type._context;e=b.pendingProps;f=b.memoizedProps;g=e.value;y(ud,d._currentValue);d._currentValue=g;if(null!==f)if(ua(f.value,g)){if(f.children===
e.children&&!S.current){b=Qa(a,b,c);break a}}else for(f=b.child,null!==f&&(f.return=b);null!==f;){var h=f.dependencies;if(null!==h){g=f.child;for(var k=h.firstContext;null!==k;){if(k.context===d){if(1===f.tag){k=Pa(-1,c&-c);k.tag=2;var l=f.updateQueue;if(null!==l){l=l.shared;var p=l.pending;null===p?k.next=k:(k.next=p.next,p.next=k);l.pending=k}}f.lanes|=c;k=f.alternate;null!==k&&(k.lanes|=c);df(f.return,c,b);h.lanes|=c;break}k=k.next}}else if(10===f.tag)g=f.type===b.type?null:f.child;else if(18===
f.tag){g=f.return;if(null===g)throw Error(m(341));g.lanes|=c;h=g.alternate;null!==h&&(h.lanes|=c);df(g,c,b);g=f.sibling}else g=f.child;if(null!==g)g.return=f;else for(g=f;null!==g;){if(g===b){g=null;break}f=g.sibling;if(null!==f){f.return=g.return;g=f;break}g=g.return}f=g}aa(a,b,e.children,c);b=b.child}return b;case 9:return e=b.type,d=b.pendingProps.children,Sb(b,c),e=qa(e),d=d(e),b.flags|=1,aa(a,b,d,c),b.child;case 14:return d=b.type,e=ya(d,b.pendingProps),e=ya(d.type,e),ni(a,b,d,e,c);case 15:return oi(a,
b,b.type,b.pendingProps,c);case 17:return d=b.type,e=b.pendingProps,e=b.elementType===d?e:ya(d,e),Fd(a,b),b.tag=1,ea(d)?(a=!0,ld(b)):a=!1,Sb(b,c),ei(b,d,e),uf(b,d,e,c),Af(null,b,d,!0,a,c);case 19:return wi(a,b,c);case 22:return pi(a,b,c)}throw Error(m(156,b.tag));};var pa=function(a,b,c,d){return new Tk(a,b,c,d)},aj="function"===typeof reportError?reportError:function(a){console.error(a)};Ud.prototype.render=Xf.prototype.render=function(a){var b=this._internalRoot;if(null===b)throw Error(m(409));
Sd(a,b,null,null)};Ud.prototype.unmount=Xf.prototype.unmount=function(){var a=this._internalRoot;if(null!==a){this._internalRoot=null;var b=a.containerInfo;yb(function(){Sd(null,a,null,null)});b[Ja]=null}};Ud.prototype.unstable_scheduleHydration=function(a){if(a){var b=nl();a={blockedOn:null,target:a,priority:b};for(var c=0;c<Ya.length&&0!==b&&b<Ya[c].priority;c++);Ya.splice(c,0,a);0===c&&Hg(a)}};var Cj=function(a){switch(a.tag){case 3:var b=a.stateNode;if(b.current.memoizedState.isDehydrated){var c=
hc(b.pendingLanes);0!==c&&(xe(b,c|1),ia(b,P()),0===(p&6)&&(Hc(),db()))}break;case 13:yb(function(){var b=Oa(a,1);if(null!==b){var c=Z();xa(b,a,1,c)}}),Wf(a,1)}};var Gg=function(a){if(13===a.tag){var b=Oa(a,134217728);if(null!==b){var c=Z();xa(b,a,134217728,c)}Wf(a,134217728)}};var xj=function(a){if(13===a.tag){var b=hb(a),c=Oa(a,b);if(null!==c){var d=Z();xa(c,a,b,d)}Wf(a,b)}};var nl=function(){return z};var wj=function(a,b){var c=z;try{return z=a,b()}finally{z=c}};se=function(a,b,c){switch(b){case "input":le(a,
c);b=c.name;if("radio"===c.type&&null!=b){for(c=a;c.parentNode;)c=c.parentNode;c=c.querySelectorAll("input[name="+JSON.stringify(""+b)+'][type="radio"]');for(b=0;b<c.length;b++){var d=c[b];if(d!==a&&d.form===a.form){var e=Rc(d);if(!e)throw Error(m(90));jg(d);le(d,e)}}}break;case "textarea":og(a,c);break;case "select":b=c.value,null!=b&&Db(a,!!c.multiple,b,!1)}};(function(a,b,c){xg=a;yg=c})(Tf,function(a,b,c,d,e){var f=z,g=ca.transition;try{return ca.transition=null,z=1,a(b,c,d,e)}finally{z=f,ca.transition=
g,0===p&&Hc()}},yb);var ol={usingClientEntryPoint:!1,Events:[ec,Ib,Rc,ug,vg,Tf]};(function(a){a={bundleType:a.bundleType,version:a.version,rendererPackageName:a.rendererPackageName,rendererConfig:a.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:Sa.ReactCurrentDispatcher,findHostInstanceByFiber:Xk,
findFiberByHostInstance:a.findFiberByHostInstance||Yk,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1"};if("undefined"===typeof __REACT_DEVTOOLS_GLOBAL_HOOK__)a=!1;else{var b=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(b.isDisabled||!b.supportsFiber)a=!0;else{try{Uc=b.inject(a),Ca=b}catch(c){}a=b.checkDCE?!0:!1}}return a})({findFiberByHostInstance:ob,bundleType:0,version:"18.3.1-next-f1338f8080-20240426",
rendererPackageName:"react-dom"});Q.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=ol;Q.createPortal=function(a,b){var c=2<arguments.length&&void 0!==arguments[2]?arguments[2]:null;if(!Yf(b))throw Error(m(200));return Wk(a,b,null,c)};Q.createRoot=function(a,b){if(!Yf(a))throw Error(m(299));var c=!1,d="",e=aj;null!==b&&void 0!==b&&(!0===b.unstable_strictMode&&(c=!0),void 0!==b.identifierPrefix&&(d=b.identifierPrefix),void 0!==b.onRecoverableError&&(e=b.onRecoverableError));b=Vf(a,1,!1,null,null,
c,!1,d,e);a[Ja]=b.current;sc(8===a.nodeType?a.parentNode:a);return new Xf(b)};Q.findDOMNode=function(a){if(null==a)return null;if(1===a.nodeType)return a;var b=a._reactInternals;if(void 0===b){if("function"===typeof a.render)throw Error(m(188));a=Object.keys(a).join(",");throw Error(m(268,a));}a=Bg(b);a=null===a?null:a.stateNode;return a};Q.flushSync=function(a){return yb(a)};Q.hydrate=function(a,b,c){if(!Vd(b))throw Error(m(200));return Wd(null,a,b,!0,c)};Q.hydrateRoot=function(a,b,c){if(!Yf(a))throw Error(m(405));
var d=null!=c&&c.hydratedSources||null,e=!1,f="",g=aj;null!==c&&void 0!==c&&(!0===c.unstable_strictMode&&(e=!0),void 0!==c.identifierPrefix&&(f=c.identifierPrefix),void 0!==c.onRecoverableError&&(g=c.onRecoverableError));b=Wi(b,null,a,1,null!=c?c:null,e,!1,f,g);a[Ja]=b.current;sc(a);if(d)for(a=0;a<d.length;a++)c=d[a],e=c._getVersion,e=e(c._source),null==b.mutableSourceEagerHydrationData?b.mutableSourceEagerHydrationData=[c,e]:b.mutableSourceEagerHydrationData.push(c,e);return new Ud(b)};Q.render=
function(a,b,c){if(!Vd(b))throw Error(m(200));return Wd(null,a,b,!1,c)};Q.unmountComponentAtNode=function(a){if(!Vd(a))throw Error(m(40));return a._reactRootContainer?(yb(function(){Wd(null,null,a,!1,function(){a._reactRootContainer=null;a[Ja]=null})}),!0):!1};Q.unstable_batchedUpdates=Tf;Q.unstable_renderSubtreeIntoContainer=function(a,b,c,d){if(!Vd(c))throw Error(m(200));if(null==a||void 0===a._reactInternals)throw Error(m(38));return Wd(a,b,c,!1,d)};Q.version="18.3.1-next-f1338f8080-20240426"});
})();
` } } };

// src/ui.js
var CSP = "default-src 'none'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https:; media-src 'self' blob: data:; connect-src 'self' blob: data:; font-src 'self' data:; base-uri 'none'; form-action 'none'; frame-ancestors 'none'; object-src 'none'";
function page() {
  return new Response(ASSETS.html.replaceAll("{{V}}", BUILD.id), { headers: { "Content-Type": "text/html; charset=utf-8", "Content-Security-Policy": CSP, "Permissions-Policy": "microphone=(self), camera=(), geolocation=()", ...SEC } });
}
function staticAsset(path, url) {
  const key = path.startsWith(BASE + "/") ? path.slice(BASE.length) : "";
  const a = ASSETS.files[key];
  if (!a) return null;
  const cache = url.searchParams.get("v") === BUILD.id ? "private, max-age=31536000, immutable" : "no-cache";
  return new Response(a.body, { headers: { "Content-Type": a.type, ...SEC, "Cache-Control": cache } });
}

// src/worker.js
var secrets = (env, s) => ({ llm: !!llmKey(env), tts: ttsConfigured(env), stt: !!sttKey(env), model: !!(s.llm.model || llmModelFallback(env)) });
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
  const done = (res) => {
    ctx.waitUntil(flush());
    return res;
  };
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
      const gone = assetIds(s).filter((id) => !keep.has(id));
      await kvPut(env, uk(uid, "settings"), next);
      await Promise.all(gone.map((id) => deleteAsset(env, uid, id)));
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
      memory.summary = typeof b.summary === "string" ? b.summary.slice(0, 4e3) : "";
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
    return new Response(v.value, { headers: { "Content-Type": v.metadata && v.metadata.ct || "audio/mpeg", ...SEC, "Cache-Control": "private, max-age=86400" } });
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
    if (method === "DELETE") {
      await deleteAsset(env, uid, m[1]);
      return done(json({ ok: true }));
    }
  }
  if (r === "/logs") {
    const k = uk(uid, "logs");
    if (method === "GET") {
      const cur = await kvGet(env, k, []);
      if (url.searchParams.get("download")) {
        const d = /* @__PURE__ */ new Date(), z = (x) => String(x).padStart(2, "0");
        const name = `rhlyria-ai-${d.getUTCFullYear()}${z(d.getUTCMonth() + 1)}${z(d.getUTCDate())}-${z(d.getUTCHours())}${z(d.getUTCMinutes())}${z(d.getUTCSeconds())}.log`;
        return new Response(cur.join("\n") + (cur.length ? "\n" : ""), { headers: { "Content-Type": "text/plain; charset=utf-8", "Content-Disposition": `attachment; filename="${name}"`, ...SEC } });
      }
      return json({ count: cur.length, max: LIMITS.logs });
    }
    if (method === "POST") {
      const b = await readJSON(req);
      const list = Array.isArray(b.entries) ? b.entries.slice(0, 50) : [];
      const c = makeLogger(env, uid, s, "web");
      for (const e of list) if (e && typeof e.msg === "string") c.log(RANK[e.level] !== void 0 ? e.level : "info", e.msg.slice(0, 200), Number(e.ts));
      await c.flush();
      const cur = await kvGet(env, k, []);
      return json({ count: cur.length, max: LIMITS.logs });
    }
    if (method === "DELETE") {
      await kvPut(env, k, []);
      return json({ count: 0, max: LIMITS.logs });
    }
  }
  if (r === "/secrets" && method === "GET") return json(secrets(env, s));
  throw new HttpError(404, "Not found.");
}
var worker_default = {
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
export {
  worker_default as default
};
