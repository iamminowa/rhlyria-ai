// Copyright (c) 2026 CERETOSPHERE (under COSVerses). Used with special permission from MiNoWa Industry.
// SPDX-License-Identifier: MIT
let _id = 10;
export const nid = () => ++_id;
export const count = (t, m) => m === "bytes" ? new TextEncoder().encode(t).length : [...t].length;
export const fmt = s => Math.floor(s / 60) + ":" + String(s % 60).padStart(2, "0");
export const dl = (name, text, type) => {
  const u = URL.createObjectURL(new Blob([text], { type }));
  const a = document.createElement("a");
  a.href = u; a.download = name; document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(u), 1500);
};
