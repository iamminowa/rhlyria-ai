// Copyright (c) 2026 CERETOSPHERE (under COSVerses). Used with special permission from MiNoWa Industry.
// SPDX-License-Identifier: MIT
const KANA = { a: "ア", i: "イ", u: "ウ", e: "エ", o: "オ", ka: "カ", ki: "キ", ku: "ク", ke: "ケ", ko: "コ", sa: "サ", shi: "シ", si: "シ", su: "ス", se: "セ", so: "ソ", ta: "タ", chi: "チ", ti: "チ", tsu: "ツ", tu: "ツ", te: "テ", to: "ト", na: "ナ", ni: "ニ", nu: "ヌ", ne: "ネ", no: "ノ", ha: "ハ", hi: "ヒ", fu: "フ", hu: "フ", he: "ヘ", ho: "ホ", ma: "マ", mi: "ミ", mu: "ム", me: "メ", mo: "モ", ya: "ヤ", yu: "ユ", yo: "ヨ", ra: "ラ", ri: "リ", ru: "ル", re: "レ", ro: "ロ", la: "ラ", li: "リ", lu: "ル", le: "レ", lo: "ロ", wa: "ワ", wo: "ヲ", ga: "ガ", gi: "ギ", gu: "グ", ge: "ゲ", go: "ゴ", za: "ザ", ji: "ジ", zu: "ズ", ze: "ゼ", zo: "ゾ", da: "ダ", de: "デ", do: "ド", ba: "バ", bi: "ビ", bu: "ブ", be: "ベ", bo: "ボ", pa: "パ", pi: "ピ", pu: "プ", pe: "ペ", po: "ポ", n: "ン" };
const LONE = { k: "ク", s: "ス", t: "ト", d: "ド", g: "グ", b: "ブ", p: "プ", m: "ム", r: "ル", l: "ル", h: "ハ", j: "ジ", z: "ズ", f: "フ", v: "ヴ", c: "ク", x: "クス", y: "イ", w: "ウ", q: "ク" };
export const kana = t => {
  const s = t.toLowerCase().replace(/[^a-z]/g, "");
  let o = "", i = 0;
  while (i < s.length) {
    let hit = null;
    for (const L of [3, 2, 1]) { const k = s.slice(i, i + L); if (KANA[k]) { hit = [k, L]; break; } }
    if (hit) { o += KANA[hit[0]]; i += hit[1]; }
    else if (s[i] === s[i + 1] && !"aiueon".includes(s[i])) { o += "ッ"; i++; }
    else { o += LONE[s[i]] || ""; i++; }
  }
  return o;
};
export const jaName = u => { const n = u.name.trim(); if (!n) return "senpai"; if (!u.translate) return n; return u.ja.trim() || kana(n) || n; };
export const APP_NAME = "Rhlyria AI";
