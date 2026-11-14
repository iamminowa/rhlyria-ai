// Copyright (c) 2026 CERETOSPHERE (under COSVerses). Used with special permission from MiNoWa Industry.
// SPDX-License-Identifier: MIT
import { ASSET_PREFIX, LIMITS, RANK, normalize, uk } from "./config.js";
import { HttpError, SEC, rid } from "./util.js";
export const kvGet = async (env, k, d) => { const v = await env.AI_KV.get(k, "json"); return v ?? d; };
export const kvPut = (env, k, v, o) => env.AI_KV.put(k, JSON.stringify(v), o);
export const loadSettings = async (env, uid) => normalize(await kvGet(env, uk(uid, "settings"), {}));
export function makeLogger(env, uid, s, src) {
  const min = RANK[s.log.level] ?? 1;
  const buf = [];
  const log = (lv, msg, ts) => {
    if ((RANK[lv] ?? 1) < min) return;
    const at = Number.isFinite(ts) && ts > Date.now() - 86400000 && ts <= Date.now() + 5000 ? ts : Date.now();
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
export const pairsOf = hist => {
  const out = [];
  let u = null;
  for (const m of hist) { if (m.role === "user") u = m; else if (u) { out.push([u, m]); u = null; } }
  return out;
};
export const putAudio = (env, uid, id, a) => env.AI_KV.put(`audio:${uid}:${id}`, a.buf, { expirationTtl: LIMITS.audioTtl, metadata: { ct: a.ct } });
export async function wipeAudio(env, uid) {
  let cursor;
  do {
    const l = await env.AI_KV.list({ prefix: `audio:${uid}:`, cursor });
    await Promise.all(l.keys.map(k => env.AI_KV.delete(k.name)));
    cursor = l.list_complete ? undefined : l.cursor;
  } while (cursor);
}
export const sniff = b => {
  if (b.length >= 8 && b[0] === 0x89 && b[1] === 0x50 && b[2] === 0x4e && b[3] === 0x47) return "image/png";
  if (b.length >= 3 && b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff) return "image/jpeg";
  if (b.length >= 4 && b[0] === 0x47 && b[1] === 0x49 && b[2] === 0x46 && b[3] === 0x38) return "image/gif";
  if (b.length >= 12 && b[0] === 0x52 && b[1] === 0x49 && b[2] === 0x46 && b[3] === 0x46 && b[8] === 0x57 && b[9] === 0x45 && b[10] === 0x42 && b[11] === 0x50) return "image/webp";
  if (b.length >= 4 && b[0] === 0x67 && b[1] === 0x6c && b[2] === 0x54 && b[3] === 0x46) return "model/gltf-binary";
  return null;
};
export const KINDS = ["pngTalk", "pngIdle", "bg", "vrm"];
const assetKey = (uid, id) => `${uid}/${id}`;
export const vrmLimit = env => env.AI_R2 ? LIMITS.vrm : LIMITS.kv;
export async function storeAsset(env, uid, kind, bytesOrStream, size, name) {
  const id = rid();
  if (kind === "vrm") {
    if (size > vrmLimit(env)) throw new HttpError(413, `The VRM file is larger than ${vrmLimit(env) / 1048576} MB.`);
    if (env.AI_R2) {
      await env.AI_R2.put(assetKey(uid, id), bytesOrStream, { httpMetadata: { contentType: "model/gltf-binary" }, customMetadata: { kind, name } });
      const head = await env.AI_R2.get(assetKey(uid, id), { range: { offset: 0, length: 12 } });
      const b = head ? new Uint8Array(await head.arrayBuffer()) : new Uint8Array();
      if (sniff(b) !== "model/gltf-binary") { await env.AI_R2.delete(assetKey(uid, id)); throw new HttpError(415, "This file is not a VRM/GLB model."); }
    } else {
      const buf = bytesOrStream instanceof ArrayBuffer ? bytesOrStream : await new Response(bytesOrStream).arrayBuffer();
      if (sniff(new Uint8Array(buf, 0, Math.min(12, buf.byteLength))) !== "model/gltf-binary") throw new HttpError(415, "This file is not a VRM/GLB model.");
      await env.AI_KV.put(`asset:${uid}:${id}`, buf, { metadata: { ct: "model/gltf-binary", kind, name } });
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
export async function deleteAsset(env, uid, id) {
  if (env.AI_R2) await env.AI_R2.delete(assetKey(uid, id));
  await env.AI_KV.delete(`asset:${uid}:${id}`);
}
export async function serveAsset(env, uid, id, req) {
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
      const r = o.range;
      const off = r.offset ?? Math.max(0, o.size - (r.suffix || 0));
      const len = r.length ?? (r.suffix ? Math.min(r.suffix, o.size) : o.size - off);
      h.set("Content-Range", `bytes ${off}-${off + len - 1}/${o.size}`);
      h.set("Content-Length", String(len));
    } else h.set("Content-Length", String(o.size));
    return new Response(o.body, { status, headers: h });
  }
  const r = await env.AI_KV.getWithMetadata(`asset:${uid}:${id}`, "arrayBuffer");
  if (!r.value) throw new HttpError(404, "File not found.");
  return new Response(r.value, { headers: { ...base, "Content-Type": (r.metadata && r.metadata.ct) || "application/octet-stream" } });
}
export async function importImage(env, uid, kind, raw) {
  let u;
  try { u = new URL(raw); } catch (e) { throw new HttpError(400, "Invalid link."); }
  const h = u.hostname;
  if (u.protocol !== "https:" || u.username || u.password || h === "localhost" || /^[\d.]+$/.test(h) || h.includes(":") || h.endsWith(".local") || h.endsWith(".internal")) throw new HttpError(400, "This link is not allowed. Use an https link to a public website.");
  const res = await fetch(u.toString(), { headers: { Accept: "image/*" }, signal: AbortSignal.timeout(20000) });
  if (!res.ok) throw new HttpError(502, `Could not download the image (${res.status}).`);
  if (Number(res.headers.get("content-length") || 0) > LIMITS.img) throw new HttpError(413, "Images must be 10 MB or smaller.");
  const reader = res.body.getReader();
  const chunks = [];
  let total = 0;
  for (;;) {
    const { value, done } = await reader.read();
    if (done) break;
    total += value.length;
    if (total > LIMITS.img) { await reader.cancel(); throw new HttpError(413, "Images must be 10 MB or smaller."); }
    chunks.push(value);
  }
  const all = new Uint8Array(total);
  let o = 0;
  for (const c of chunks) { all.set(c, o); o += c.length; }
  return storeAsset(env, uid, kind, all.buffer, total, decodeURIComponent(u.pathname.split("/").pop() || "").slice(0, 80));
}
export { ASSET_PREFIX };
