// Copyright (c) 2026 CERETOSPHERE (under COSVerses). Used with special permission from MiNoWa Industry.
// SPDX-License-Identifier: MIT
export const audio = new Audio();
audio.preload = "auto";
const SILENT = "data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA=";
let unlocked = false;
addEventListener("pointerdown", () => { if (unlocked) return; unlocked = true; audio.src = SILENT; audio.play().catch(() => {}); }, { once: true, capture: true });
