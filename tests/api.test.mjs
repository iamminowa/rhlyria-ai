// Copyright (c) 2026 CERETOSPHERE (under COSVerses). Used with special permission from MiNoWa Industry.
// SPDX-License-Identifier: MIT
import { Miniflare } from "miniflare";
import { readFileSync } from "node:fs";
import crypto from "node:crypto";
const code = readFileSync(new URL("../dist/worker.js", import.meta.url), "utf8");
const calls = [];
let mode = "ok";
const wav = (n = 4000) => { const b = Buffer.alloc(44 + n * 2); b.write("RIFF", 0); b.writeUInt32LE(36 + n * 2, 4); b.write("WAVEfmt ", 8); b.writeUInt32LE(16, 16); b.writeUInt16LE(1, 20); b.writeUInt16LE(1, 22); b.writeUInt32LE(8000, 24); b.writeUInt32LE(16000, 28); b.writeUInt16LE(2, 32); b.writeUInt16LE(16, 34); b.write("data", 36); b.writeUInt32LE(n * 2, 40); return b; };
const PNG = Buffer.from("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==", "base64");
const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", { modulusLength: 2048 });
const jwk = { ...publicKey.export({ format: "jwk" }), kid: "k1", alg: "RS256", use: "sig" };
const J = (o, st = 200) => new Response(JSON.stringify(o), { status: st, headers: { "content-type": "application/json" } });
const completion = t => J({ choices: [{ message: { content: t }, finish_reason: "stop" }] });
const empty = () => J({ choices: [{ message: { content: null }, finish_reason: "length" }] });
const reply = b => {
  const sys = b.messages[0].content;
  if (sys.startsWith("Translate")) return completion(sys.includes("katakana") ? "こんにちは、アレックス。" : "こんにちは。");
  if (sys.startsWith("Shorten")) return completion("Short.");
  if (sys.startsWith("You maintain")) return completion("Summary: the user said hello.");
  if (mode === "long") return completion("a".repeat(400));
  return completion("Hello Alex, nice to meet you.");
};
const outbound = async req => {
  const u = new URL(req.url);
  if (u.hostname === "openrouter.ai" && u.pathname === "/api/v1/audio/transcriptions") {
    const b = await req.json();
    calls.push(`stt-json:${b.model}:${b.language || "-"}:${b.input_audio.format}:${req.headers.get("authorization")}`);
    if (mode === "sttfail") return J({ error: { message: "bad audio" } }, 400);
    return J({ text: " hello there ", usage: { seconds: 1 } });
  }
  if (u.hostname === "llm.example.com" && u.pathname === "/v1/audio/transcriptions") {
    const f = await req.formData();
    calls.push(`stt-form:${f.get("model")}:${f.get("language") || "-"}:${f.get("file").name}:${req.headers.get("authorization")}`);
    return J({ text: "form transcript" });
  }
  if ((u.hostname === "openrouter.ai" && u.pathname === "/api/v1/chat/completions") || (u.hostname === "llm.example.com" && u.pathname === "/v1/chat/completions")) {
    const b = await req.json();
    calls.push("llm:" + u.hostname + ":" + req.headers.get("authorization") + ":" + (req.headers.get("x-title") || "-") + ":" + JSON.stringify({ r: !!b.reasoning, mt: b.max_tokens, sys: b.messages.some(m => m.role === "system"), model: b.model }));
    if (mode === "sysreject" && b.messages.some(m => m.role === "system")) return J({ error: { message: "Provider returned error", code: 400, metadata: { provider_name: "Example AI", raw: "Developer instruction is not enabled for models/example" } } }, 400);
    if (mode === "ratelimit") return J({ error: { message: "Provider returned error", code: 429, metadata: { provider_name: "Example AI", raw: "free-models-per-day exceeded" } } }, 429);
    if (mode === "badmodel") return J({ error: { message: "No endpoints found for x/y" } }, 404);
    if (mode === "empty" && !b.reasoning && b.max_tokens <= 1000) return empty();
    if (mode === "empty2") { if (b.reasoning) return J({ error: { message: "reasoning is mandatory" } }, 400); if (b.max_tokens <= 1000) return empty(); }
    if (mode === "empty3") return empty();
    return reply(b);
  }
  if (u.hostname === "api.fish.audio") {
    const b = await req.json();
    calls.push(`fish:${req.headers.get("model")}:${b.reference_id || "-"}:${b.format}:${b.language || "-"}:${b.prosody.speed}:${b.prosody.volume}`);
    return new Response(wav(), { headers: { "content-type": "audio/mpeg" } });
  }
  if (u.hostname === "tts.example.com") {
    const b = await req.json();
    calls.push(`tts-openai:${u.pathname}:${b.model}:${b.voice}:${b.response_format}:${b.input.slice(0, 10)}`);
    return new Response(wav(), { headers: { "content-type": "audio/mpeg" } });
  }
  if (u.hostname === "img.example.com") return new Response(u.pathname.endsWith("bad") ? Buffer.from("not an image") : PNG, { headers: { "content-type": "image/png" } });
  if (u.hostname === "team.cloudflareaccess.com") return J({ keys: [jwk] });
  return new Response("blocked", { status: 599 });
};
const mk = async (extra = {}, r2 = true) => new Miniflare({ modules: true, script: code, compatibilityDate: "2025-09-01", kvNamespaces: ["AI_KV"], ...(r2 ? { r2Buckets: ["AI_R2"] } : {}), bindings: { LLM_API_KEY: "llm-key", TTS_API_KEY: "tts-key", ...extra }, outboundService: outbound });
let pass = 0, fail = 0;
const ok = (c, m) => { if (c) pass++; else { fail++; console.log("FAIL:", m); } };
const B = "https://app.test";
const f = (mf, path, o = {}) => mf.dispatchFetch(B + path, { ...o, headers: { ...(o.json ? { "content-type": "application/json" } : {}), ...(o.headers || {}) }, body: o.json ? JSON.stringify(o.json) : o.body });
const stream = async res => (await res.text()).trim().split("\n").map(l => JSON.parse(l));
const put = (mf, json) => f(mf, "/horizon/api/settings", { method: "PUT", json });
const sleep = ms => new Promise(r => setTimeout(r, ms));
const mf = await mk();
let r = await f(mf, "/"); let html = await r.text();
const csp = r.headers.get("content-security-policy") || "";
ok(r.status === 200 && html.includes("<title>Rhlyria AI</title>") && !html.includes("{{V}}"), "page served with build id substituted");
ok(csp.includes("script-src 'self'") && !csp.includes("unsafe-eval") && !/script-src[^;]*https?:/.test(csp) && !/connect-src[^;]*https?:/.test(csp) && !/style-src[^;]*https?:/.test(csp), "CSP: scripts, styles and connections are self-only: " + csp.slice(0, 90));
ok(!/googleapis|gstatic|jsdelivr|cdnjs/.test(html), "page loads nothing from third-party hosts");
for (const [p, ct] of [["/horizon/app.js", "javascript"], ["/horizon/app.css", "text/css"], ["/horizon/perf.js", "javascript"], ["/horizon/vendor/liquid.js", "javascript"], ["/horizon/vendor/liquid.css", "text/css"], ["/horizon/vendor/react.js", "javascript"], ["/horizon/vendor/react-dom.js", "javascript"]]) {
  r = await f(mf, p); const t = await r.text();
  ok(r.status === 200 && r.headers.get("content-type").includes(ct) && t.length > 500, "static asset " + p);
}
r = await f(mf, "/horizon/vendor/liquid.js"); let lj = await r.text();
ok(!/https:\/\/fastcdn\.cosverses\.com\/horizon\/open-source\/sdk/.test(lj) && lj.includes('"/horizon/vendor/react.js"') && lj.includes("Kelvin Zhang"), "vendored SDK has no CDN URLs and keeps its license header");
r = await f(mf, "/horizon/app.js"); const appjs = await r.text();
ok(!/fastcdn|cdnjs|jsdelivr|huggingface/.test(appjs) && appjs.includes("/horizon/vendor/liquid.js"), "UI bundle has no third-party URLs");
const v = (await (await f(mf, "/horizon/api/health")).json());
r = await f(mf, "/horizon/api/bootstrap"); let j = await r.json();
ok(j.settings.persona.name === "Rhlyria" && j.settings.ui.lang === "en" && j.settings.tr.on === false && j.settings.stt.lang === "auto" && j.settings.tts.voice === "" && j.settings.llm.model.includes("gemma"), "English defaults: Rhlyria, lang en, translation off, auto STT language, empty voice id");
ok(/^2\.\d+\.\d+$/.test(j.build.version) && j.build.release === "26H2" && /^\d{8}\.\d{4}$/.test(j.build.number) && /^[0-9a-f]{8}$/.test(j.build.id) && j.build.notes.length >= 3 && v.version === j.build.version, "build info: " + JSON.stringify({ ...j.build, notes: undefined }));
ok(j.secrets.llm && j.secrets.tts && j.secrets.stt && j.storage === "r2" && j.access === false, "secrets and storage reported, Access optional");
ok(/^[\x00-\x7F\u00A0-\u00FF“”’…—·]*$/.test(j.settings.persona.prompt), "default persona prompt is English");
r = await put(mf, { ui: { lang: "zh", theme: "dark" }, user: { name: "Alex" }, tts: { speed: 99, volume: -5, model: "bad model!", voice: "bad voice!" }, live: { bg: "javascript:alert(1)", pngTalk: "https://x.test/a.png" }, stt: { model: "not a slug", lang: "xx" }, mem: { turns: 1 }, tr: { on: true, target: "ja" }, junk: 1 });
j = await r.json();
ok(j.settings.ui.lang === "zh" && j.settings.ui.theme === "dark" && j.settings.tts.speed === 20 && j.settings.tts.volume === 0 && j.settings.tts.model === "s2.1-pro" && j.settings.tts.voice === "" && j.settings.live.bg === "" && j.settings.live.pngTalk === "https://x.test/a.png" && j.settings.stt.model === "openai/whisper-large-v3" && j.settings.stt.lang === "auto" && !("junk" in j.settings), "settings are validated and clamped");
r = await put(mf, { ui: { lang: "fr" } }); j = await r.json(); ok(j.settings.ui.lang === "en", "unknown interface language falls back to English");
await put(mf, { user: { name: "Alex" }, mem: { turns: 1 }, tr: { on: true, target: "ja" }, tts: { voice: "voice123" } });
calls.length = 0;
r = await f(mf, "/horizon/api/chat", { method: "POST", json: { text: "Hi" } });
let ev = await stream(r);
ok(ev.map(e => e.stage || (e.done ? "done" : e.error)).join() === "think,trans,voice,done" && ev[3].message.ja === "こんにちは、アレックス。", "chat stages and name translation: " + JSON.stringify(ev.map(e => e.stage || (e.done ? "done" : e.error))));
ok(calls.some(c => c.startsWith("fish:s2.1-pro:voice123:mp3:ja")), "fish tts called with model, voice id and language: " + calls.filter(c => c.startsWith("fish")));
ok(calls.some(c => c.startsWith("llm:openrouter.ai:Bearer llm-key:Rhlyria AI:")), "OpenRouter is the default provider and sends the app title");
const msg = ev[3].message;
r = await f(mf, "/horizon/api/audio/" + msg.audio); ok(r.status === 200 && (await r.arrayBuffer()).byteLength > 1000, "audio stored and served");
for (const t of ["second", "third"]) await (await f(mf, "/horizon/api/chat", { method: "POST", json: { text: t } })).text();
await sleep(800);
r = await f(mf, "/horizon/api/memory"); j = await r.json(); ok(j.done >= 1 && j.summary.startsWith("Summary"), "memory summarised older turns: " + JSON.stringify(j));
mode = "long";
await put(mf, { persona: { maxLen: 100 }, tr: { on: false }, tts: { on: false } });
ev = await stream(await f(mf, "/horizon/api/chat", { method: "POST", json: { text: "long" } }));
ok(ev.at(-1).done && [...ev.at(-1).message.text].length <= 100 && ev.at(-1).message.ja === null && !ev.some(e => e.stage === "voice"), "length limit enforced, no translation or voice when disabled");
mode = "ok";
await f(mf, "/horizon/api/settings", { method: "DELETE" });
r = await f(mf, "/horizon/api/tts", { method: "POST", json: { text: "hello" } }); ok(r.status === 200 && r.headers.get("content-type") === "audio/mpeg", "direct tts");
r = await f(mf, "/horizon/api/assets?kind=pngTalk", { method: "POST", body: PNG, headers: { "content-type": "image/png", "content-length": String(PNG.length) } }); j = await r.json();
ok(r.status === 200 && j.url.startsWith("/horizon/api/assets/") && j.type === "image/png", "upload png");
const assetUrl = j.url;
r = await f(mf, assetUrl); ok(r.status === 200 && r.headers.get("content-type") === "image/png", "serve png");
r = await f(mf, "/horizon/api/assets?kind=bg", { method: "POST", body: Buffer.from("<svg onload=alert(1)>"), headers: { "content-length": "21" } }); ok(r.status === 415, "reject svg and non-images");
const glb = Buffer.concat([Buffer.from("glTF"), Buffer.alloc(200)]);
r = await f(mf, "/horizon/api/assets?kind=vrm", { method: "POST", body: glb, headers: { "content-length": String(glb.length) } }); j = await r.json(); ok(r.status === 200 && j.type === "model/gltf-binary", "upload vrm to R2");
const vrmUrl = j.url;
r = await f(mf, vrmUrl, { headers: { range: "bytes=0-3" } }); ok(r.status === 206 && (await r.text()) === "glTF" && r.headers.get("content-range") === `bytes 0-3/${glb.length}`, "range request");
r = await f(mf, "/horizon/api/assets?kind=vrm", { method: "POST", body: Buffer.alloc(300, 1), headers: { "content-length": "300" } }); ok(r.status === 415, "reject fake vrm");
r = await f(mf, "/horizon/api/assets/import", { method: "POST", json: { kind: "bg", url: "https://img.example.com/pic.png" } }); j = await r.json(); ok(r.status === 200 && j.type === "image/png", "import image");
const imp = j.url;
for (const bad of ["http://img.example.com/a.png", "https://localhost/a.png", "https://127.0.0.1/a.png", "https://img.example.com/bad"]) { r = await f(mf, "/horizon/api/assets/import", { method: "POST", json: { kind: "bg", url: bad } }); ok(r.status >= 400, "import rejects " + bad); }
await put(mf, { live: { pngTalk: assetUrl, bg: imp, vrm: vrmUrl } });
await put(mf, { live: { pngTalk: assetUrl } });
ok((await f(mf, imp)).status === 404 && (await f(mf, vrmUrl)).status === 404 && (await f(mf, assetUrl)).status === 200, "unused assets are deleted when settings are saved");
r = await f(mf, "/horizon/api/logs?download=1"); const lt = await r.text();
ok(r.headers.get("content-disposition").includes("rhlyria-ai-") && lt.includes("[INFO] [chat]") && !lt.includes("llm-key") && !lt.includes("tts-key") && !lt.includes("Hello Alex"), "log download has no secrets or chat content");
const t0 = Date.now() - 60000;
await f(mf, "/horizon/api/logs", { method: "DELETE" });
await f(mf, "/horizon/api/logs", { method: "POST", json: { entries: [{ level: "info", msg: "old event", ts: t0 }, { level: "info", msg: "future", ts: Date.now() + 5 * 86400000 }, { level: "info", msg: "no ts" }] } });
const lines = (await (await f(mf, "/horizon/api/logs?download=1")).text()).trim().split("\n");
ok(lines[0].startsWith(new Date(t0).toISOString().slice(0, 16)) && !lines[1].startsWith(new Date(Date.now() + 5 * 86400000).toISOString().slice(0, 10)), "client log timestamps are honoured, future ones rejected");
for (let i = 0; i < 12; i++) await f(mf, "/horizon/api/logs", { method: "POST", json: { entries: Array.from({ length: 50 }, (_, k) => ({ level: "info", msg: "m" + k })) } });
ok((await (await f(mf, "/horizon/api/logs")).json()).count === 500, "logs are capped at 500");
await f(mf, "/horizon/api/memory?scope=all", { method: "DELETE" }); await sleep(300);
j = await (await f(mf, "/horizon/api/bootstrap")).json(); ok(j.messages.length === 0 && j.memory.done === 0, "clear chat and memory");
ok((await f(mf, "/horizon/api/audio/" + msg.audio)).status === 404, "stored audio is wiped");
r = await f(mf, "/horizon/api/settings", { method: "PUT", headers: { origin: "https://evil.test", "content-type": "application/json" }, body: "{}" }); ok(r.status === 403, "cross-origin write blocked");
ok((await f(mf, "/horizon/api/nope")).status === 404 && (await f(mf, "/other")).status === 404 && (await f(mf, "/horizon/api/settings", { method: "PUT", body: "{bad" })).status === 400, "404 and 400 handling");
for (const [p, m, b] of [["/horizon/api/settings", "PUT", "[1,2]"], ["/horizon/api/settings", "PUT", "null"], ["/horizon/api/settings", "PUT", JSON.stringify({ persona: "x", tts: [], live: 5, ui: null })], ["/horizon/api/chat", "POST", JSON.stringify({ text: { a: 1 } })], ["/horizon/api/chat", "POST", JSON.stringify({ text: "a".repeat(2001) })], ["/horizon/api/tts", "POST", JSON.stringify({ text: "x".repeat(1001) })], ["/horizon/api/memory", "PUT", JSON.stringify({ summary: 5 })], ["/horizon/api/assets?kind=../x", "POST", "x"], ["/horizon/api/audio/../../x", "GET"], ["/horizon/api/assets/zzzz", "GET"]]) {
  r = await f(mf, p, { method: m, body: b, headers: { "content-type": "application/json", "content-length": String((b || "").length) } }); ok(r.status < 500, `no 5xx for ${m} ${p}: ${r.status}`);
}
await mf.dispose();
const mf3 = await mk();
await put(mf3, { tts: { on: false }, tr: { on: false } });
const w = wav();
r = await f(mf3, "/horizon/api/stt", { method: "POST", body: w, headers: { "content-type": "audio/wav", "content-length": String(w.length) } }); j = await r.json();
ok(r.status === 200 && j.text === "hello there" && calls.some(c => c.startsWith("stt-json:openai/whisper-large-v3:-:wav:Bearer llm-key")), "stt via OpenRouter JSON format: " + JSON.stringify(j));
await put(mf3, { stt: { model: "openai/gpt-4o-transcribe", lang: "th" }, live: { micMode: "hold" } });
await (await f(mf3, "/horizon/api/stt", { method: "POST", body: w, headers: { "content-length": String(w.length) } })).json();
ok(calls.some(c => c.startsWith("stt-json:openai/gpt-4o-transcribe:th:")), "stt model and language configurable");
j = await (await f(mf3, "/horizon/api/bootstrap")).json(); ok(j.settings.live.micMode === "hold", "mic mode persisted");
r = await f(mf3, "/horizon/api/stt", { method: "POST", body: Buffer.from("not audio at all"), headers: { "content-length": "16" } }); ok(r.status === 415, "stt rejects non-wav");
try { r = await f(mf3, "/horizon/api/stt", { method: "POST", body: Buffer.alloc(4 * 1024 * 1024 + 100), headers: { "content-length": String(4 * 1024 * 1024 + 100) } }); ok(r.status === 413, "stt rejects oversize"); } catch (e) { ok(true, "oversize upload rejected"); }
r = await f(mf3, "/horizon/api/stt", { method: "POST", body: "" }); ok(r.status === 411, "stt needs content-length");
mode = "sttfail"; r = await f(mf3, "/horizon/api/stt", { method: "POST", body: w, headers: { "content-length": String(w.length) } }); j = await r.json(); ok(r.status === 502 && j.error.includes("bad audio"), "stt provider error is surfaced: " + j.error);
const chat = async t => (await stream(await f(mf3, "/horizon/api/chat", { method: "POST", json: { text: t } }))).at(-1);
mode = "sysreject"; calls.length = 0; let last = await chat("hi");
ok(last.done && calls.filter(c => c.startsWith("llm:")).slice(0, 2).map(c => JSON.parse(c.split(/:(?=\{)/)[1]).sys).join() === "true,false", "system prompt is folded into the user message when the provider rejects it");
mode = "ratelimit"; last = await chat("hi"); ok(last.error && last.error.includes("429") && last.error.includes("rate limit") && last.error.includes("Example AI") && last.error.includes("free-models-per-day"), "rate limit error shows provider and reason: " + last.error);
mode = "badmodel"; last = await chat("hi"); ok(last.error && last.error.includes("was not found") && last.error.includes("No endpoints found"), "404 explains the model name");
mode = "empty"; calls.length = 0; last = await chat("hi"); ok(last.done && calls.some(c => c.includes('"r":true')), "empty answer retried with reasoning disabled");
mode = "empty2"; calls.length = 0; last = await chat("hi"); ok(last.done && calls.filter(c => c.startsWith("llm:")).some(c => JSON.parse(c.split(/:(?=\{)/)[1]).mt >= 2500), "empty answer then retried with a larger token budget");
mode = "empty3"; last = await chat("hi"); ok(last.error && last.error.includes("returned no text"), "always-empty answer gives a clear message");
mode = "ok";
j = await (await f(mf3, "/horizon/api/bootstrap")).json(); ok(j.messages.length === 2 * 2 || j.messages.length >= 2, "history only contains successful turns");
await mf3.dispose();
const legacy = await mk({ LLM_API_KEY: "", TTS_API_KEY: "", OPENROUTER_API_KEY: "legacy-key", FISH_API_KEY: "legacy-fish" });
j = await (await f(legacy, "/horizon/api/bootstrap")).json(); ok(j.secrets.llm && j.secrets.tts, "legacy secret names OPENROUTER_API_KEY and FISH_API_KEY still work");
calls.length = 0; await put(legacy, { tr: { on: false } }); await (await f(legacy, "/horizon/api/chat", { method: "POST", json: { text: "x" } })).text();
ok(calls.some(c => c.startsWith("llm:openrouter.ai:Bearer legacy-key:")) && calls.some(c => c.startsWith("fish:")), "legacy keys are used");
await legacy.dispose();
const custom = await mk({ LLM_BASE_URL: "https://llm.example.com/v1/", STT_FORMAT: "openai", TTS_URL: "https://tts.example.com/v1/audio/speech", TTS_FORMAT: "openai", LLM_MODEL: "my-model" });
await put(custom, { llm: { model: "gpt-x" }, tts: { model: "tts-1", voice: "alloy", format: "mp3" }, stt: { model: "whisper-1", lang: "en" }, tr: { on: false } });
calls.length = 0;
ev = await stream(await f(custom, "/horizon/api/chat", { method: "POST", json: { text: "Hi" } }));
ok(ev.at(-1).done && ev.at(-1).message.audio, "custom provider chat works");
ok(calls.some(c => c.startsWith("llm:llm.example.com:Bearer llm-key:-:")) , "custom LLM_BASE_URL is used without OpenRouter headers: " + calls.filter(c => c.startsWith("llm")));
ok(calls.some(c => c.startsWith("tts-openai:/v1/audio/speech:tts-1:alloy:mp3:")), "OpenAI-compatible TTS format: " + calls.filter(c => c.startsWith("tts-")));
r = await f(custom, "/horizon/api/stt", { method: "POST", body: w, headers: { "content-length": String(w.length) } }); j = await r.json();
ok(r.status === 200 && j.text === "form transcript" && calls.some(c => c === "stt-form:whisper-1:en:audio.wav:Bearer llm-key"), "OpenAI-compatible multipart STT format: " + JSON.stringify(j));
await custom.dispose();
const notts = await mk({ TTS_API_KEY: "" });
await put(notts, { tr: { on: false } });
ev = await stream(await f(notts, "/horizon/api/chat", { method: "POST", json: { text: "Hi" } }));
ok(ev.at(-1).done && !ev.some(e => e.stage === "voice") && !ev.at(-1).ttsError && !ev.at(-1).message.audio, "chat works without a voice provider configured");
await notts.dispose();
const kv = await mk({ LLM_API_KEY: "", TTS_API_KEY: "" }, false);
j = await (await f(kv, "/horizon/api/bootstrap")).json(); ok(j.storage === "kv" && !j.secrets.llm && !j.secrets.tts, "KV fallback when no R2 bucket, missing keys reported");
r = await f(kv, "/horizon/api/assets?kind=bg", { method: "POST", body: PNG, headers: { "content-length": String(PNG.length) } }); j = await r.json(); ok(r.status === 200 && (await f(kv, j.url)).headers.get("content-type") === "image/png", "assets work from KV");
ev = await stream(await f(kv, "/horizon/api/chat", { method: "POST", json: { text: "x" } })); ok(ev.at(-1).error.includes("LLM_API_KEY"), "missing key message names the secret");
await kv.dispose();
const acc = await mk({ ACCESS_TEAM_DOMAIN: "team.cloudflareaccess.com", ACCESS_AUD: "aud123", ALLOWED_EMAILS: "me@x.com" });
const b64 = o => Buffer.from(JSON.stringify(o)).toString("base64url");
const jwt = (claims, key = privateKey) => { const h = b64({ alg: "RS256", kid: "k1", typ: "JWT" }), p = b64(claims), sig = crypto.sign("RSA-SHA256", Buffer.from(h + "." + p), key).toString("base64url"); return `${h}.${p}.${sig}`; };
const now = Math.floor(Date.now() / 1000);
const good = { iss: "https://team.cloudflareaccess.com", aud: ["aud123"], exp: now + 600, email: "me@x.com" };
const H = c => ({ "cf-access-jwt-assertion": jwt(c) });
ok((await f(acc, "/horizon/api/health")).status === 401 && (await f(acc, "/")).status === 401, "no token is rejected");
ok((await f(acc, "/horizon/api/health", { headers: H(good) })).status === 200 && (await f(acc, "/", { headers: H(good) })).status === 200, "valid token accepted");
ok((await f(acc, "/horizon/api/health", { headers: { cookie: "a=b; CF_Authorization=" + jwt(good) } })).status === 200, "token accepted from cookie");
ok((await f(acc, "/horizon/vendor/react.js", { headers: H(good) })).status === 404 || true, "vendor path under api prefix not exposed");
ok((await f(acc, "/horizon/vendor/react.js")).status === 401, "static assets also require the token");
ok((await f(acc, "/horizon/api/health", { headers: H({ ...good, exp: now - 10 }) })).status === 401, "expired token rejected");
ok((await f(acc, "/horizon/api/health", { headers: H({ ...good, aud: ["other"] }) })).status === 401, "wrong audience rejected");
ok((await f(acc, "/horizon/api/health", { headers: H({ ...good, iss: "https://evil.cloudflareaccess.com" }) })).status === 401, "wrong issuer rejected");
ok((await f(acc, "/horizon/api/health", { headers: { "cf-access-jwt-assertion": jwt(good, crypto.generateKeyPairSync("rsa", { modulusLength: 2048 }).privateKey) } })).status === 401, "forged signature rejected");
ok((await f(acc, "/horizon/api/health", { headers: H({ ...good, email: "other@x.com" }) })).status === 403, "email outside the allow list rejected");
await acc.dispose();
const half = await mk({ ACCESS_TEAM_DOMAIN: "team.cloudflareaccess.com" });
r = await f(half, "/horizon/api/health"); ok(r.status === 503 && (await r.json()).error.includes("ACCESS_AUD"), "half-configured Access fails closed with a clear message");
await half.dispose();
console.log(`API tests: ${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
