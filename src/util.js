// Copyright (c) 2026 CERETOSPHERE (under COSVerses). Used with special permission from MiNoWa Industry.
// SPDX-License-Identifier: MIT
import { LIMITS } from "./config.js";
export const enc = new TextEncoder();
export const dec = new TextDecoder();
export class HttpError extends Error {
  constructor(status, message) { super(message); this.status = status; }
}
export const SEC = { "X-Content-Type-Options": "nosniff", "Referrer-Policy": "no-referrer", "Cache-Control": "no-store" };
export const json = (data, status = 200, extra = {}) => new Response(JSON.stringify(data), { status, headers: { "Content-Type": "application/json; charset=utf-8", ...SEC, ...extra } });
export const rid = () => [...crypto.getRandomValues(new Uint8Array(16))].map(b => b.toString(16).padStart(2, "0")).join("");
export const count = (t, m) => m === "bytes" ? enc.encode(t).length : [...t].length;
export const clip = (t, n, m) => {
  if (count(t, m) <= n) return t;
  let o = "";
  for (const c of t) { if (count(o + c, m) > n) break; o += c; }
  const k = Math.max(o.lastIndexOf("。"), o.lastIndexOf("."), o.lastIndexOf("!"), o.lastIndexOf("?"), o.lastIndexOf("！"), o.lastIndexOf("？"), o.lastIndexOf(" "));
  return (k > o.length * 0.5 ? o.slice(0, k + 1) : o).trim();
};
export const b64u = s => {
  s = s.replace(/-/g, "+").replace(/_/g, "/");
  while (s.length % 4) s += "=";
  const bin = atob(s), a = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) a[i] = bin.charCodeAt(i);
  return a;
};
export const toB64 = u8 => {
  let t = "";
  for (let i = 0; i < u8.length; i += 0x8000) t += String.fromCharCode.apply(null, u8.subarray(i, i + 0x8000));
  return btoa(t);
};
export async function readJSON(req, max = LIMITS.jsonBody) {
  const len = Number(req.headers.get("content-length") || 0);
  if (len > max) throw new HttpError(413, "Request body is too large.");
  const text = await req.text();
  if (text.length > max) throw new HttpError(413, "Request body is too large.");
  try { return JSON.parse(text || "{}"); } catch (e) { throw new HttpError(400, "Invalid JSON."); }
}
