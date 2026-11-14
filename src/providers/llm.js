// Copyright (c) 2026 CERETOSPHERE (under COSVerses). Used with special permission from MiNoWa Industry.
// SPDX-License-Identifier: MIT
import { HttpError } from "../util.js";
const DEFAULT_BASE = "https://openrouter.ai/api/v1";
export const llmBase = env => String(env.LLM_BASE_URL || DEFAULT_BASE).replace(/\/+$/, "");
export const llmKey = env => String(env.LLM_API_KEY || env.OPENROUTER_API_KEY || "");
export const llmModelFallback = env => String(env.LLM_MODEL || env.OPENROUTER_MODEL || "");
export const isOpenRouter = url => { try { return new URL(url).hostname.endsWith("openrouter.ai"); } catch (e) { return false; } };
export const authHeaders = (env, url, key, origin) => {
  const h = { Authorization: `Bearer ${key}` };
  if (isOpenRouter(url)) { h["HTTP-Referer"] = origin; h["X-Title"] = "Rhlyria AI"; }
  return h;
};
export const errorDetail = (res, data) => {
  const e = data && data.error;
  const raw = e && e.metadata && e.metadata.raw;
  const rawText = typeof raw === "string" ? raw : raw ? JSON.stringify(raw) : "";
  const provider = e && e.metadata && e.metadata.provider_name;
  const message = (e && (typeof e === "string" ? e : e.message)) || String(res.status);
  return [message, provider ? `(${provider})` : "", rawText].filter(Boolean).join(" ").replace(/\s+/g, " ").slice(0, 400);
};
export const providerError = (res, data, label, model) => {
  const hint = { 401: "the API key was rejected", 402: "not enough credit", 404: `model "${model}" was not found, check the model name in Settings`, 408: "the model timed out", 429: "rate limit reached, try again later or pick another model in Settings" }[res.status];
  return new HttpError(502, `${label} ${res.status}${hint ? ": " + hint : ""} [${errorDetail(res, data)}]`);
};
const SYSTEM_REJECTED = /developer instruction|system (prompt|message|instruction|role)|instruction.{0,30}not (enabled|supported)|not supported.{0,30}system/i;
const foldSystem = msgs => {
  const sys = msgs.filter(m => m.role === "system").map(m => m.content).join("\n\n");
  const rest = msgs.filter(m => m.role !== "system");
  if (!sys) return rest;
  const i = rest.findIndex(m => m.role === "user");
  if (i < 0) return [{ role: "user", content: sys }, ...rest];
  const out = [...rest];
  out[i] = { ...out[i], content: `${sys}\n\n---\n\n${out[i].content}` };
  return out;
};
export async function chat(env, s, messages, origin, o = {}) {
  const base = llmBase(env);
  const url = base + "/chat/completions";
  const key = llmKey(env);
  const model = (s.llm.model || llmModelFallback(env)).trim();
  if (!key) throw new HttpError(503, "No language model API key is set. Add the LLM_API_KEY secret.");
  if (!model) throw new HttpError(400, "No language model is set. Choose one in Settings.");
  const maxTokens = o.maxTokens ?? s.llm.maxTokens;
  const call = async (msgs, extra = {}) => {
    const res = await fetch(url, {
      method: "POST",
      headers: { ...authHeaders(env, url, key, origin), "Content-Type": "application/json" },
      body: JSON.stringify({ model, messages: msgs, temperature: o.temp ?? s.llm.temp / 10, max_tokens: maxTokens, ...extra }),
      signal: AbortSignal.timeout(60000)
    });
    return { res, data: await res.json().catch(() => null) };
  };
  const textOf = d => {
    const c = d && d.choices && d.choices[0] && d.choices[0].message && d.choices[0].message.content;
    return typeof c === "string" ? c : Array.isArray(c) ? c.map(p => p.text || "").join("") : "";
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
      if (r2.res.ok && textOf(r2.data).trim()) { text = textOf(r2.data); break; }
    }
  }
  if (!text.trim()) throw new HttpError(502, `Model "${model}" returned no text (it may have spent its token budget on reasoning). Try another model or raise Max tokens in Settings.`);
  return text;
}
