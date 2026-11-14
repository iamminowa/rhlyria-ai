// Copyright (c) 2026 CERETOSPHERE (under COSVerses). Used with special permission from MiNoWa Industry.
// SPDX-License-Identifier: MIT
import { HttpError, toB64 } from "../util.js";
import { llmBase, llmKey, isOpenRouter, authHeaders, providerError } from "./llm.js";
export const sttUrl = env => String(env.STT_URL || llmBase(env) + "/audio/transcriptions");
export const sttKey = env => String(env.STT_API_KEY || llmKey(env));
export const sttFormat = env => String(env.STT_FORMAT || (isOpenRouter(sttUrl(env)) ? "openrouter" : "openai"));
export async function transcribe(env, s, buf, origin) {
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
  const res = await fetch(url, { method: "POST", headers, body, signal: AbortSignal.timeout(60000) });
  const data = await res.json().catch(() => null);
  if (!res.ok) throw providerError(res, data, "Speech-to-text", s.stt.model);
  return String((data && data.text) || "").trim();
}
