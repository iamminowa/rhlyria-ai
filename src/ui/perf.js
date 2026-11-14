// Copyright (c) 2026 CERETOSPHERE (under COSVerses). Used with special permission from MiNoWa Industry.
// SPDX-License-Identifier: MIT
(() => {
  const r = document.documentElement, nav = navigator, mq = q => matchMedia(q).matches;
  const lite = (nav.deviceMemory && nav.deviceMemory <= 4) || (nav.hardwareConcurrency && nav.hardwareConcurrency <= 4) || (nav.connection && nav.connection.saveData) || mq("(prefers-reduced-motion: reduce)");
  try { r.dataset.glass = localStorage.getItem("rhlyria.glass") === "0" ? "off" : "on"; } catch (e) { r.dataset.glass = "on"; }
  r.dataset.perf = lite ? "lite" : mq("(pointer: coarse)") ? "mobile" : "full";
  document.addEventListener("visibilitychange", () => r.toggleAttribute("data-hidden", document.hidden));
  const active = new Set();
  let last = 0, seen = 0, timer = 0;
  const note = e => {
    seen = performance.now();
    last = e.pointerId;
    if (e.type === "pointerdown") active.add(e.pointerId);
    else if (e.type !== "pointermove") active.delete(e.pointerId);
    if (e.type === "pointerup" || e.type === "pointercancel") { clearTimeout(timer); timer = setTimeout(sweep, 450); }
  };
  const sweep = () => {
    if (performance.now() - seen > 6000) active.clear();
    if (active.size) return;
    if (document.querySelector(".lg-tab-bar[data-lifted], .lg-segmented[data-lifted], [data-pressed]"))
      window.dispatchEvent(new PointerEvent("pointercancel", { pointerId: last, isPrimary: true, bubbles: true }));
  };
  for (const t of ["pointerdown", "pointermove", "pointerup", "pointercancel"]) addEventListener(t, note, { capture: true, passive: true });
  setInterval(sweep, 1500);
})();
