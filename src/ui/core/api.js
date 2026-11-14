// Copyright (c) 2026 CERETOSPHERE (under COSVerses). Used with special permission from MiNoWa Industry.
// SPDX-License-Identifier: MIT
import { t } from "../i18n/index.js";
export const API = "/horizon/api";
export const api = async (path, { method = "GET", json, body, headers = {}, signal } = {}) => {
  let res;
  try { res = await fetch(API + path, { method, credentials: "same-origin", signal, headers: { ...(json !== undefined ? { "Content-Type": "application/json" } : {}), ...headers }, body: json !== undefined ? JSON.stringify(json) : body }); }
  catch (e) { if (e.name === "AbortError") throw e; throw new Error(t("Can't reach the server. If you use Cloudflare Access, reload the page to sign in again.")); }
  if (!res.ok) {
    let m = res.statusText || t("Error ") + res.status;
    try { const j = await res.json(); if (j.error) m = j.error; } catch (e) {}
    const err = new Error(m);
    err.status = res.status;
    throw err;
  }
  return res;
};
export const getJSON = async (path, opt) => (await api(path, opt)).json();
