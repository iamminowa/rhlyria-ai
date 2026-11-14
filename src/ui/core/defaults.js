// Copyright (c) 2026 CERETOSPHERE (under COSVerses). Used with special permission from MiNoWa Industry.
// SPDX-License-Identifier: MIT
export const readGlass = () => { try { return localStorage.getItem("rhlyria.glass") !== "0"; } catch (e) { return true; } };
export const readLang = () => { try { const v = localStorage.getItem("rhlyria.lang"); return v === "th" || v === "zh" ? v : "en"; } catch (e) { return "en"; } };
export const DEFAULTS = {
  ui: { theme: "light", glass: readGlass(), lang: readLang() },
  persona: { name: "Rhlyria", prompt: "", maxLen: 300, countMode: "chars" },
  user: { name: "", translate: true, ja: "" },
  llm: { model: "", temp: 8, maxTokens: 1000 },
  tr: { on: false, target: "ja", showOriginal: true },
  tts: { on: true, voice: "", model: "s2.1-pro", format: "mp3", latency: "balanced", speed: 10, volume: 100 },
  stt: { model: "openai/whisper-large-v3", lang: "auto", autosend: true },
  mem: { turns: 3, auto: true },
  live: { mode: "vrm", micMode: "tap", vrm: "", pngTalk: "", pngIdle: "", flap: true, bg: "", mouth: 10, captions: true },
  log: { level: "info" }
};
