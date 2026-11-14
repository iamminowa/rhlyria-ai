// Copyright (c) 2026 CERETOSPHERE (under COSVerses). Used with special permission from MiNoWa Industry.
// SPDX-License-Identifier: MIT
import { BUILD } from "./generated/build.js";
export { BUILD };
export const BASE = "/horizon";
export const API = BASE + "/api";
export const ASSET_PREFIX = API + "/assets/";
export const ASSET_RE = /^\/horizon\/api\/assets\/[0-9a-f]{32}$/;
export const LIMITS = { chatText: 2000, ttsText: 1000, jsonBody: 65536, img: 10 * 1024 * 1024, vrm: 80 * 1024 * 1024, kv: 20 * 1024 * 1024, stt: 4 * 1024 * 1024, hist: 300, logs: 500, audioTtl: 604800 };
export const RANK = { debug: 0, info: 1, warn: 2, error: 3 };
export const LANGS = ["en", "th", "zh"];
export const DEFAULTS = {
  ui: { theme: "light", glass: true, lang: "en" },
  persona: { name: "Rhlyria", prompt: "You are Rhlyria, a friendly, slightly teasing anime-style companion. Call the user {user}.\nReply with short plain text, like a person chatting. Do not narrate scenes or actions and do not use asterisks.\nAnswer in the same language the user writes in, and keep every reply under {max} characters.", maxLen: 300, countMode: "chars" },
  user: { name: "", translate: true, ja: "" },
  llm: { model: "google/gemma-4-26b-a4b-it:free", temp: 8, maxTokens: 1000 },
  tr: { on: false, target: "ja", showOriginal: true },
  tts: { on: true, voice: "", model: "s2.1-pro", format: "mp3", latency: "balanced", speed: 10, volume: 100 },
  stt: { model: "openai/whisper-large-v3", lang: "auto", autosend: true },
  mem: { turns: 3, auto: true },
  live: { mode: "vrm", micMode: "tap", vrm: "", pngTalk: "", pngIdle: "", flap: true, bg: "", mouth: 10, captions: true },
  log: { level: "info" }
};
const str = (v, d, max) => typeof v === "string" ? v.slice(0, max) : d;
const num = (v, d, min, max) => { const n = Number(v); return Number.isFinite(n) ? Math.round(Math.min(max, Math.max(min, n))) : d; };
const bool = (v, d) => typeof v === "boolean" ? v : d;
const oneOf = (v, d, list) => list.includes(v) ? v : d;
const link = (v, d) => typeof v === "string" && (v === "" || ASSET_RE.test(v) || /^https:\/\/[^\s]{1,2000}$/.test(v)) ? v : d;
const slug = (v, d) => typeof v === "string" && /^[A-Za-z0-9._:/@-]{1,120}$/.test(v.trim()) ? v.trim() : d;
export function normalize(input) {
  const i = input && typeof input === "object" ? input : {};
  const g = k => i[k] && typeof i[k] === "object" ? i[k] : {};
  const D = DEFAULTS;
  const ui = g("ui"), pe = g("persona"), us = g("user"), ll = g("llm"), tr = g("tr"), tt = g("tts"), st = g("stt"), me = g("mem"), li = g("live"), lo = g("log");
  return {
    ui: { theme: oneOf(ui.theme, D.ui.theme, ["light", "dark"]), glass: bool(ui.glass, D.ui.glass), lang: oneOf(ui.lang, D.ui.lang, LANGS) },
    persona: { name: str(pe.name, D.persona.name, 40).trim() || D.persona.name, prompt: str(pe.prompt, D.persona.prompt, 4000), maxLen: num(pe.maxLen, D.persona.maxLen, 50, 300), countMode: oneOf(pe.countMode, D.persona.countMode, ["chars", "bytes"]) },
    user: { name: str(us.name, "", 40).trim(), translate: bool(us.translate, D.user.translate), ja: str(us.ja, "", 40).trim() },
    llm: { model: slug(ll.model, D.llm.model), temp: num(ll.temp, D.llm.temp, 0, 20), maxTokens: num(ll.maxTokens, D.llm.maxTokens, 50, 4000) },
    tr: { on: bool(tr.on, D.tr.on), target: oneOf(tr.target, D.tr.target, ["ja", "en", "zh", "th", "ko"]), showOriginal: bool(tr.showOriginal, D.tr.showOriginal) },
    tts: { on: bool(tt.on, D.tts.on), voice: typeof tt.voice === "string" && (tt.voice.trim() === "" || /^[A-Za-z0-9._-]{1,64}$/.test(tt.voice.trim())) ? tt.voice.trim() : D.tts.voice, model: slug(tt.model, D.tts.model), format: oneOf(tt.format, D.tts.format, ["mp3", "opus"]), latency: oneOf(tt.latency, D.tts.latency, ["low", "normal", "balanced"]), speed: num(tt.speed, D.tts.speed, 5, 20), volume: num(tt.volume, D.tts.volume, 0, 100) },
    stt: { model: slug(st.model, D.stt.model), lang: oneOf(st.lang, D.stt.lang, ["auto", "en", "th", "zh", "ja", "ko"]), autosend: bool(st.autosend, D.stt.autosend) },
    mem: { turns: num(me.turns, D.mem.turns, 1, 6), auto: bool(me.auto, D.mem.auto) },
    live: { mode: oneOf(li.mode, D.live.mode, ["vrm", "png"]), micMode: oneOf(li.micMode, D.live.micMode, ["tap", "hold"]), vrm: link(li.vrm, ""), pngTalk: link(li.pngTalk, ""), pngIdle: link(li.pngIdle, ""), flap: bool(li.flap, D.live.flap), bg: link(li.bg, ""), mouth: num(li.mouth, D.live.mouth, 3, 20), captions: bool(li.captions, D.live.captions) },
    log: { level: oneOf(lo.level, D.log.level, ["debug", "info", "warn", "error"]) }
  };
}
export const assetIds = s => [s.live.vrm, s.live.pngTalk, s.live.pngIdle, s.live.bg].filter(v => ASSET_RE.test(v)).map(v => v.slice(ASSET_PREFIX.length));
export const uk = (uid, name) => `u:${uid}:${name}`;
