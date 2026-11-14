// Copyright (c) 2026 CERETOSPHERE (under COSVerses). Used with special permission from MiNoWa Industry.
// SPDX-License-Identifier: MIT
export const UI = {};
const version = new URL(import.meta.url).search;
let mod = null;
try { mod = await import("/horizon/vendor/liquid.js" + version); } catch (e) { mod = null; }
export const glassOk = !!mod;
export const Lib = mod ? { Button: mod.Button, Glass: mod.Glass, Input: mod.Input, Menu: mod.Menu, SegmentedControl: mod.SegmentedControl, Slider: mod.Slider, Switch: mod.Switch, TabBar: mod.TabBar } : null;
