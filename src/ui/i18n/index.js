// Copyright (c) 2026 CERETOSPHERE (under COSVerses). Used with special permission from MiNoWa Industry.
// SPDX-License-Identifier: MIT
import en from "./en.js";
import th from "./th.js";
import zh from "./zh.js";
const LOCALES = { en, th, zh };
const TAGS = { en: "en-US", th: "th-TH", zh: "zh-CN" };
let current = "en";
export const setLocale = lang => { current = LOCALES[lang] ? lang : "en"; };
export const localeTag = () => TAGS[current];
export const t = (key, vars) => {
  let m = (LOCALES[current] && LOCALES[current][key]) || key;
  if (vars) for (const k of Object.keys(vars)) m = m.split("{" + k + "}").join(String(vars[k]));
  return m;
};
