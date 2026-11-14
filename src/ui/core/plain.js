// Copyright (c) 2026 CERETOSPHERE (under COSVerses). Used with special permission from MiNoWa Industry.
// SPDX-License-Identifier: MIT
import { h, useState, useRef, useEffect } from "./react.js";
import { dots } from "./icons.js";
function PMenu({ items, ...p }) {
  const [o, setO] = useState(false);
  const ref = useRef();
  useEffect(() => {
    if (!o) return;
    const f = e => { if (ref.current && !ref.current.contains(e.target)) setO(false); };
    const k = e => { if (e.key === "Escape") setO(false); };
    document.addEventListener("pointerdown", f);
    document.addEventListener("keydown", k);
    return () => { document.removeEventListener("pointerdown", f); document.removeEventListener("keydown", k); };
  }, [o]);
  return h("div", { className: "pl-menu", ref },
    h("button", { type: "button", className: "pl-btn", "data-icon": "only", "aria-label": p["aria-label"], "aria-expanded": o, onClick: () => setO(!o) }, dots),
    o && h("div", { className: "pl-pop", role: "menu" }, items.map((it, i) => it === "separator" ? h("hr", { key: i }) : h("button", { key: i, type: "button", role: "menuitem", "data-destructive": it.destructive ? "" : undefined, onClick: () => { setO(false); if (it.onSelect) it.onSelect(); } }, it.label))));
}
export const Plain = {
  Button: ({ icon, variant, destructive, tint, className, children, ...p }) => h("button", { type: "button", className: "pl-btn" + (className ? " " + className : ""), "data-variant": variant, "data-destructive": destructive ? "" : undefined, "data-icon": icon ? (children ? "lead" : "only") : undefined, ...p }, icon, children),
  Glass: ({ className, children, ...p }) => h("div", { className: "pl-glass" + (className ? " " + className : ""), ...p }, children),
  Input: ({ value, onValueChange, style, ...p }) => h("div", { className: "pl-input", style }, h("input", { value, onChange: e => onValueChange && onValueChange(e.target.value), ...p })),
  Menu: PMenu,
  SegmentedControl: ({ items, value, onValueChange, style, ...p }) => h("div", { className: "pl-seg", role: "radiogroup", style, "aria-label": p["aria-label"] }, items.map(it => h("button", { key: it.value, type: "button", role: "radio", "aria-checked": it.value === value, onClick: () => onValueChange(it.value) }, it.label))),
  Slider: ({ min, max, step, value, onValueChange, style, ...p }) => h("input", { type: "range", className: "pl-range", min, max, step, value, style, "aria-label": p["aria-label"], onChange: e => onValueChange(Number(e.target.value)) }),
  Switch: ({ checked, onCheckedChange, ...p }) => h("button", { type: "button", role: "switch", className: "pl-switch", "aria-checked": !!checked, "aria-label": p["aria-label"], onClick: () => onCheckedChange(!checked) }, h("i")),
  TabBar: ({ items, value, onValueChange, style, ...p }) => h("nav", { className: "pl-tabs", style, "aria-label": p["aria-label"] }, items.map(it => h("button", { key: it.value, type: "button", role: "tab", "aria-selected": it.value === value, onClick: () => onValueChange(it.value) }, it.icon, it.label)))
};
