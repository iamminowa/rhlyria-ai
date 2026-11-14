// Copyright (c) 2026 CERETOSPHERE (under COSVerses). Used with special permission from MiNoWa Industry.
// SPDX-License-Identifier: MIT
import { HttpError, enc, dec, b64u } from "./util.js";
let jwks = null, jwksAt = 0;
async function accessKeys(team, force) {
  if (!force && jwks && Date.now() - jwksAt < 3600000) return jwks;
  const r = await fetch(`https://${team}/cdn-cgi/access/certs`);
  if (!r.ok) throw new HttpError(503, "Could not fetch the Cloudflare Access signing keys.");
  jwks = (await r.json()).keys || [];
  jwksAt = Date.now();
  return jwks;
}
export async function authenticate(req, env) {
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
  try { header = JSON.parse(dec.decode(b64u(parts[0]))); payload = JSON.parse(dec.decode(b64u(parts[1]))); } catch (e) { throw deny(); }
  if (header.alg !== "RS256") throw deny();
  let jwk = (await accessKeys(team, false)).find(k => k.kid === header.kid);
  if (!jwk) jwk = (await accessKeys(team, true)).find(k => k.kid === header.kid);
  if (!jwk) throw deny();
  const key = await crypto.subtle.importKey("jwk", jwk, { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" }, false, ["verify"]);
  let ok = false;
  try { ok = await crypto.subtle.verify("RSASSA-PKCS1-v1_5", key, b64u(parts[2]), enc.encode(parts[0] + "." + parts[1])); } catch (e) { ok = false; }
  if (!ok) throw deny();
  const now = Date.now() / 1000;
  if (!payload.exp || payload.exp < now) throw deny();
  if (payload.nbf && payload.nbf > now + 30) throw deny();
  if (payload.iss !== `https://${team}`) throw deny();
  if (![].concat(payload.aud || []).includes(aud)) throw deny();
  const email = String(payload.email || payload.common_name || payload.sub || "").toLowerCase();
  if (!email) throw deny();
  const allow = String(env.ALLOWED_EMAILS || "").split(",").map(x => x.trim().toLowerCase()).filter(Boolean);
  if (allow.length && !allow.includes(email)) throw new HttpError(403, "This account is not allowed.");
  return { verified: true, email };
}
