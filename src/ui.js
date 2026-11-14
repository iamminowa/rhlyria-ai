// Copyright (c) 2026 CERETOSPHERE (under COSVerses). Used with special permission from MiNoWa Industry.
// SPDX-License-Identifier: MIT
import { BASE, BUILD } from "./config.js";
import { SEC } from "./util.js";
import { ASSETS } from "./generated/assets.js";
const CSP = "default-src 'none'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https:; media-src 'self' blob: data:; connect-src 'self' blob: data:; font-src 'self' data:; base-uri 'none'; form-action 'none'; frame-ancestors 'none'; object-src 'none'";
export function page() {
  return new Response(ASSETS.html.replaceAll("{{V}}", BUILD.id), { headers: { "Content-Type": "text/html; charset=utf-8", "Content-Security-Policy": CSP, "Permissions-Policy": "microphone=(self), camera=(), geolocation=()", ...SEC } });
}
export function staticAsset(path, url) {
  const key = path.startsWith(BASE + "/") ? path.slice(BASE.length) : "";
  const a = ASSETS.files[key];
  if (!a) return null;
  const cache = url.searchParams.get("v") === BUILD.id ? "private, max-age=31536000, immutable" : "no-cache";
  return new Response(a.body, { headers: { "Content-Type": a.type, ...SEC, "Cache-Control": cache } });
}
