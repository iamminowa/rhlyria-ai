// Copyright (c) 2026 CERETOSPHERE (under COSVerses). Used with special permission from MiNoWa Industry.
// SPDX-License-Identifier: MIT
import { h } from "./react.js";
export const svg = (...d) => h("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true" }, d.map((p, i) => h("path", { key: i, d: p })));
export const I = {
  chat: svg("M5 4h14a1 1 0 011 1v10a1 1 0 01-1 1h-8l-4 4v-4H5a1 1 0 01-1-1V5a1 1 0 011-1z"),
  live: svg("M4 10v4", "M8 7v10", "M12 4v16", "M16 8v8", "M20 10.5v3"),
  gear: svg("M4 8h9", "M17 8h3", "M4 16h3", "M11 16h9", "M15 8a2 2 0 10-4 0 2 2 0 004 0z", "M9 16a2 2 0 10-4 0 2 2 0 004 0z"),
  mic: svg("M12 3a3 3 0 013 3v6a3 3 0 01-6 0V6a3 3 0 013-3z", "M6 11a6 6 0 0012 0", "M12 17v4"),
  send: svg("M4 12l16-8-6 16-3-7z"),
  play: svg("M8 5l11 7-11 7z"),
  stop: svg("M7 7h10v10H7z"),
  x: svg("M6 6l12 12", "M18 6L6 18"),
  check: svg("M5 12.5l4.5 4.5L19 7"),
  eye: svg("M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z", "M15 12a3 3 0 10-6 0 3 3 0 006 0z"),
  eyeOff: svg("M3 3l18 18", "M10.6 6.1A9.6 9.6 0 0112 6c6 0 10 6 10 6a17 17 0 01-3.3 3.9", "M6.3 7.6C3.6 9.3 2 12 2 12s4 7 10 7a9.6 9.6 0 004-.9"),
  spin: h("svg", { className: "spin", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", "aria-hidden": "true" }, h("path", { d: "M12 3a9 9 0 019 9" }))
};
export const dots = h("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 3, strokeLinecap: "round", "aria-hidden": "true" }, h("path", { d: "M5 12h.01M12 12h.01M19 12h.01" }));
