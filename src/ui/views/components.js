// Copyright (c) 2026 CERETOSPHERE (under COSVerses). Used with special permission from MiNoWa Industry.
// SPDX-License-Identifier: MIT
import { useRef, h } from "../core/react.js";
import { I } from "../core/icons.js";
import { UI } from "../core/glass.js";
import { t } from "../i18n/index.js";
export const Row = ({ label, desc, value, stack, children }) => h("div", { className: "row" + (stack ? " stack" : "") }, h("div", { className: "rl" }, h("div", { className: "rt" }, h("span", null, label), value != null && h("span", { className: "rv" }, value)), desc && h("div", { className: "rd" }, desc)), h("div", { className: "rc" }, children));
export const Seg = (label, items, value, onValueChange, w) => h(UI.SegmentedControl, { "aria-label": label, items: items.map(([v, l]) => ({ value: v, label: l })), value, onValueChange, style: { "--lg-tab-width": (w || 76) + "px" } });
export const Msg = ({ m, s, play, onPlay }) => {
  if (m.role === "user") return h("div", { className: "m u" }, h("div", { className: "bub" }, m.text));
  const p = play && play.id === m.id ? play.st : null;
  return h("div", { className: "m a" },
    h("div", { className: "bub" }, m.ja && h("div", { className: "ja", lang: "ja" }, m.ja), (!m.ja || s.tr.showOriginal) && h("div", { className: "orig" + (m.ja ? "" : " solo") }, m.text)),
    h(UI.Button, { className: "mini", icon: p === "loading" ? I.spin : p === "playing" ? I.stop : I.play, "aria-label": p === "playing" ? t("Stop audio") : t("Play audio"), onClick: () => onPlay(m) }));
};
export const Wait = ({ label }) => h("div", { className: "wait", "aria-live": "polite" }, h("span", { className: "dots" }, h("i"), h("i"), h("i")), h("span", { className: "wl" }, label));
export const Placeholder = () => h("svg", { viewBox: "0 0 300 533", preserveAspectRatio: "xMidYMax meet", role: "img", "aria-label": t("Sample character") },
  h("g", { transform: "translate(0 60)" },
    h("path", { d: "M34 473C34 320 80 275 150 275S266 320 266 473Z", fill: "#1f6f78" }),
    h("path", { d: "M70 395C120 412 180 412 230 395", stroke: "#17565d", strokeWidth: 8, fill: "none", strokeLinecap: "round" }),
    h("path", { d: "M118 278L150 322 182 278Z", fill: "#f6efe6" }),
    h("rect", { x: 132, y: 232, width: 36, height: 54, rx: 14, fill: "#f0c9ae" }),
    h("path", { d: "M70 150C70 62 230 62 230 150L240 272C200 256 100 256 60 272Z", fill: "#3a211b" }),
    h("path", { d: "M82 100L68 26 134 72Z", fill: "#e8742f" }),
    h("path", { d: "M90 88L82 50 114 72Z", fill: "#fbe3cd" }),
    h("path", { d: "M218 100L232 26 166 72Z", fill: "#e8742f" }),
    h("path", { d: "M210 88L218 50 186 72Z", fill: "#fbe3cd" }),
    h("ellipse", { cx: 150, cy: 152, rx: 70, ry: 78, fill: "#f6d7c0" }),
    h("path", { d: "M80 138C84 78 216 78 220 138 200 120 186 114 170 100 160 122 130 126 104 112 96 122 88 130 80 138Z", fill: "#3a211b" }),
    h("g", { className: "eyes" }, h("ellipse", { cx: 120, cy: 160, rx: 8, ry: 11, fill: "#2a1a16" }), h("ellipse", { cx: 180, cy: 160, rx: 8, ry: 11, fill: "#2a1a16" }), h("circle", { cx: 123, cy: 156, r: 3, fill: "#fff" }), h("circle", { cx: 183, cy: 156, r: 3, fill: "#fff" })),
    h("ellipse", { cx: 104, cy: 184, rx: 12, ry: 6, fill: "#f08a70", opacity: 0.45 }),
    h("ellipse", { cx: 196, cy: 184, rx: 12, ry: 6, fill: "#f08a70", opacity: 0.45 }),
    h("ellipse", { className: "mouth", cx: 150, cy: 194, rx: 9, ry: 8, fill: "#8c2f2a" })));
export const Figure = ({ live }) => {
  if (live.mode === "png" && (live.pngTalk || live.pngIdle)) {
    const idle = live.pngIdle || live.pngTalk, talk = live.pngTalk || live.pngIdle;
    return h("div", { className: "png" }, h("img", { className: "idle", src: idle, alt: "", draggable: false, decoding: "async" }), h("img", { className: "talk", src: talk, alt: "", draggable: false, decoding: "async" }));
  }
  return h(Placeholder);
};
export function ImgField({ label, desc, value, onChange, tall, accept, vrm }) {
  const ref = useRef();
  const stored = value.startsWith("/horizon/api/assets/");
  const note = stored ? t("Stored on the server") : /^https:/.test(value) ? (vrm ? t("Using an external link") : t("Will be imported on save")) : t("Will be uploaded on save");
  return h(Row, { label, desc, stack: true },
    h(UI.Input, { "aria-label": label, placeholder: vrm ? t("https://…/avatar.vrm or choose a file") : t("Paste an image link https://…"), value, onValueChange: onChange, style: { maxWidth: "none" } }),
    h("div", { className: "btns imgbtns" },
      h(UI.Button, { onClick: () => ref.current.click() }, t("Choose file")),
      h(UI.Button, { destructive: true, disabled: !value, onClick: () => onChange("") }, t("Clear")),
      value && h("span", { className: "chip " + (stored ? "ok" : "") }, note),
      !vrm && value && h("img", { className: "thumb", style: tall ? { height: 64 } : null, src: value, alt: t("Preview"), onError: e => { e.currentTarget.style.visibility = "hidden"; }, onLoad: e => { e.currentTarget.style.visibility = ""; } })),
    h("input", { ref, type: "file", accept: accept || "image/png,image/jpeg,image/webp,image/gif", hidden: true, onChange: e => { const f = e.target.files[0]; if (f) onChange(URL.createObjectURL(f)); e.target.value = ""; } }));
}
export const stLabel = k => ({ think: t("Thinking…"), trans: t("Translating…"), voice: t("Generating voice…") })[k];
