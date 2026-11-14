// Copyright (c) 2026 CERETOSPHERE (under COSVerses). Used with special permission from MiNoWa Industry.
// SPDX-License-Identifier: MIT
import { HttpError } from "../util.js";
const DEFAULT_URL = "https://api.fish.audio/v1/tts";
export const ttsUrl = env => String(env.TTS_URL || DEFAULT_URL);
export const ttsKey = env => String(env.TTS_API_KEY || env.FISH_API_KEY || "");
export const ttsFormat = env => String(env.TTS_FORMAT || "fish");
export const ttsConfigured = env => !!ttsKey(env);
const volDb = p => p <= 0 ? -40 : Math.max(-40, Math.min(0, Math.round(200 * Math.log10(p / 100)) / 10));
export async function synthesize(env, s, text) {
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
    if (t.format === "mp3") body.mp3_bitrate = 64; else body.opus_bitrate = 32000;
    if (/[\u3040-\u30ff]/.test(text)) body.language = "ja";
  }
  const res = await fetch(ttsUrl(env), { method: "POST", headers, body: JSON.stringify(body), signal: AbortSignal.timeout(60000) });
  if (!res.ok) {
    let m = "";
    try { const j = await res.json(); m = j.message || j.reason || (j.error && (j.error.message || j.error)) || ""; } catch (e) {}
    throw new HttpError(502, `Text-to-speech ${res.status}${m ? ": " + String(m).slice(0, 300) : ""}`);
  }
  const buf = await res.arrayBuffer();
  if (!buf.byteLength) throw new HttpError(502, "The voice provider returned no audio.");
  return { buf, ct: t.format === "mp3" ? "audio/mpeg" : "audio/ogg" };
}
