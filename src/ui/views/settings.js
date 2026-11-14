// Copyright (c) 2026 CERETOSPHERE (under COSVerses). Used with special permission from MiNoWa Industry.
// SPDX-License-Identifier: MIT
import { useState, h } from "../core/react.js";
import { UI, glassOk } from "../core/glass.js";
import { jaName, APP_NAME } from "../core/text.js";
import { count } from "../core/util.js";
import { t, localeTag } from "../i18n/index.js";
import { Row, Seg, ImgField } from "./components.js";
export function SettingsBody({ c }) {
  const { s, set, mem, setMem, logN } = c;
  const [probe, setProbe] = useState("");
  const [conf, setConf] = useState(false);
  const n = count(probe, s.persona.countMode), lim = s.persona.maxLen;
  const sec = (t, ...k) => h("section", { className: "sec" }, h("h2", { className: "sh" }, t), ...k);
  const sw = (g, k, a) => h(UI.Switch, { "aria-label": a, checked: s[g][k], onCheckedChange: v => set(g, { [k]: v }) });
  const sl = (g, k, a, min, max, step) => h(UI.Slider, { "aria-label": a, min, max, step: step || 1, value: s[g][k], onValueChange: v => set(g, { [k]: v }), style: { width: "100%" } });
  const inp = (g, k, a, ph) => h(UI.Input, { "aria-label": a, placeholder: ph, value: s[g][k], onValueChange: v => set(g, { [k]: v }), style: { maxWidth: "none" } });
  const keyChip = v => h("span", { className: "chip " + (v === true ? "ok" : v === false ? "no" : "") }, v === true ? t("Key found") : v === false ? t("Missing") : t("Not checked"));
  return h("div", { className: "sheet" },
    sec(t("Appearance"),
      h(Row, { label: t("Language"), desc: t("Language of the app interface. Replies follow the language you write in."), stack: true }, Seg(t("Language"), [["en", "English"], ["th", "ไทย"], ["zh", "中文"]], s.ui.lang, v => set("ui", { lang: v }), 96)),
      h(Row, { label: t("Theme"), stack: true }, Seg(t("Theme"), [["light", t("Light")], ["dark", t("Dark")]], s.ui.theme, v => set("ui", { theme: v }), 100)),
      h(Row, { label: t("Liquid Glass effect"), desc: glassOk ? t("On: translucent glass with animations. Off: a solid, flat UI with no glass animation or transparency. Stored on this device (localStorage) when you save.") : t("The Liquid Glass files could not be loaded, so the flat UI is used automatically.") }, sw("ui", "glass", t("Liquid Glass effect")))),
    sec(t("User name"),
      h(Row, { label: t("Display name"), desc: t("Used to address you in chat and captions. Leave empty to use “senpai”."), stack: true }, inp("user", "name", t("Display name"), t("e.g. Alex"))),
      h(Row, { label: t("Translate your name into Japanese too"), desc: t("When replies are translated into Japanese, your name is written in Japanese too.") }, sw("user", "translate", t("Translate name"))),
      s.user.translate && h(Row, { key: "ja", label: t("Japanese name (optional)"), desc: t("Leave empty to let the model translate it."), stack: true }, inp("user", "ja", t("Japanese name"), t("e.g. ノワ"))),
      s.user.translate && s.user.name.trim() && h(Row, { key: "pv", label: t("Preview"), value: `${s.user.name.trim()} → ${jaName(s.user)}` })),
    sec(t("Character & message rules"),
      h(Row, { label: t("Character name"), stack: true }, inp("persona", "name", t("Character name"), "Rhlyria")),
      h(Row, { label: t("System prompt"), desc: t("{max} is the maximum length set below and {user} is the user name set above."), stack: true }, h("textarea", { className: "field", "aria-label": t("System prompt"), value: s.persona.prompt, onChange: e => set("persona", { prompt: e.target.value }) })),
      h(Row, { label: t("Maximum reply length"), value: lim + (s.persona.countMode === "bytes" ? " bytes" : t(" characters")), desc: t("Applies to both the original reply and its translation. If exceeded, the model is asked once to shorten it, then it is cut at a sentence end."), stack: true }, sl("persona", "maxLen", t("Maximum length"), 50, 300, 10)),
      h(Row, { label: t("How length is counted"), desc: t("Some voice providers bill per UTF-8 byte (Thai, Japanese and Chinese use 3 bytes per character). Choose how the limit is counted."), stack: true }, Seg(t("Counting"), [["chars", t("Characters")], ["bytes", "UTF-8 bytes"]], s.persona.countMode, v => set("persona", { countMode: v }), 110)),
      h(Row, { label: t("Length counter test"), value: h("span", { className: n > lim ? "over" : "" }, `${n} / ${lim}`), stack: true }, h(UI.Input, { "aria-label": t("Test text"), placeholder: t("Type or paste text to count"), value: probe, onValueChange: setProbe, style: { maxWidth: "none" } }))),
    sec(t("Language model"),
      h(Row, { label: t("Model slug"), desc: t("One model is used for both replies and translation. The default is a free model with a limited quota. Use any model your provider supports."), stack: true }, inp("llm", "model", t("Model slug"), t("e.g. anthropic/claude-…"))),
      h(Row, { label: t("Temperature"), value: (s.llm.temp / 10).toFixed(1), stack: true }, sl("llm", "temp", t("Temperature"), 0, 20)),
      h(Row, { label: t("Max tokens"), stack: true }, h(UI.Input, { "aria-label": t("Max tokens"), type: "number", value: String(s.llm.maxTokens), onValueChange: v => set("llm", { maxTokens: v === "" ? "" : Number(v) }), style: { maxWidth: "none" } }))),
    sec(t("Translation"),
      h(Row, { label: t("Translate replies before speaking"), desc: t("The translation is shown on top, the original below, and the voice speaks the translation.") }, sw("tr", "on", t("Translate replies"))),
      h(Row, { label: t("Target language"), stack: true }, Seg(t("Target language"), [["ja", "日本語"], ["en", "English"], ["zh", "中文"], ["th", "ไทย"], ["ko", "한국어"]], s.tr.target, v => set("tr", { target: v }), 72)),
      h(Row, { label: t("Show the original under the translation") }, sw("tr", "showOriginal", t("Show original")))),
    sec(t("Voice (text-to-speech)"),
      h(Row, { label: t("Voice in chat"), desc: t("Live mode always speaks.") }, sw("tts", "on", t("Voice in chat"))),
      h(Row, { label: t("Voice ID"), desc: t("Leave empty to use the provider's default voice."), stack: true }, inp("tts", "voice", t("Voice ID"), "reference_id")),
      h(Row, { label: t("Voice model"), desc: t("Model name sent to your voice provider."), stack: true }, inp("tts", "model", t("Voice model"), "s2.1-pro")),
      h(Row, { label: t("File format"), desc: t("mp3 is small and plays in every browser."), stack: true }, Seg(t("File format"), [["mp3", "mp3"], ["opus", "opus"]], s.tts.format, v => set("tts", { format: v }), 88)),
      h(Row, { label: t("Latency"), desc: t("Only sent if your voice provider supports it. Test it with your provider."), stack: true }, Seg(t("Latency"), [["low", "low"], ["balanced", "balanced"], ["normal", "normal"]], s.tts.latency, v => set("tts", { latency: v }), 92)),
      h(Row, { label: t("Speaking speed"), value: (s.tts.speed / 10).toFixed(1) + "x", stack: true }, sl("tts", "speed", t("Speaking speed"), 5, 20)),
      h(Row, { label: t("Volume"), value: s.tts.volume + "%", stack: true }, sl("tts", "volume", t("Volume"), 0, 100)),
      h(Row, { label: t("Try the voice"), desc: t("Uses the saved voice settings and counts against your voice provider quota.") }, h(UI.Button, { onClick: c.testVoice }, t("Test")))),
    sec(t("Listening (speech-to-text on the server)"),
      h(Row, { label: t("Transcription model"), desc: t("Audio is sent to the server and transcribed there, so no model is downloaded to the device. The default is Whisper Large V3 on OpenRouter."), stack: true }, inp("stt", "model", t("Transcription model"), "openai/whisper-large-v3")),
      h(Row, { label: t("Spoken language"), desc: t("Pick a language for the best accuracy, or Auto if you mix languages."), stack: true }, Seg(t("Spoken language"), [["auto", t("Auto")], ["en", "English"], ["th", "ไทย"], ["zh", "中文"], ["ja", "日本語"]], s.stt.lang, v => set("stt", { lang: v }), 88)),
      h(Row, { label: t("Send automatically after transcribing"), desc: t("When off, the transcript is placed in the chat box so you can edit it first.") }, sw("stt", "autosend", t("Auto-send")))),
    sec(t("Memory"),
      h(Row, { label: t("Recent turns kept in full"), value: s.mem.turns + t(" turns"), desc: t("1 turn = 1 user message + 1 reply from {name}", { name: s.persona.name }), stack: true }, sl("mem", "turns", t("Number of turns"), 1, 6)),
      h(Row, { label: t("Summarize older turns automatically"), desc: t("The server summarizes turns that fall outside the window above.") }, sw("mem", "auto", t("Auto-summarize"))),
      h(Row, { label: t("Summary memory"), value: t("{n} turns summarized", { n: mem.done }), stack: true }, h("textarea", { className: "field sm", "aria-label": t("Summary memory"), placeholder: t("No summary yet"), value: mem.summary, onChange: e => setMem(p => ({ ...p, summary: e.target.value })), onBlur: e => c.saveSummary(e.target.value) })),
      h(Row, { label: t("Clear data"), desc: t("Clearing takes effect immediately; no need to save."), stack: true }, h("div", { className: "btns" },
        h(UI.Button, { onClick: c.clearSummary }, t("Clear summary only")),
        h(UI.Button, { variant: "filled", destructive: true, onClick: () => { if (!conf) { setConf(true); setTimeout(() => setConf(false), 3000); return; } setConf(false); c.clearAll(); } }, conf ? t("Press again to confirm") : t("Clear chat & memory"))))),
    sec(t("Live mode"),
      h(Row, { label: t("Character type"), desc: t("VRM uses a 3D model file. PNG uses two images that swap between speaking and idle."), stack: true }, Seg(t("Character type"), [["vrm", "VRM"], ["png", "PNG"]], s.live.mode, v => set("live", { mode: v }), 100)),
      h(Row, { label: t("How to talk in Live mode"), desc: t("Tap to start and tap to stop, or hold the mic while you talk and release to send."), stack: true }, Seg(t("Talk method"), [["tap", t("Tap to start / stop")], ["hold", t("Hold to talk")]], s.live.micMode, v => set("live", { micMode: v }), 140)),
      s.live.mode === "vrm"
        ? h(ImgField, { label: t("VRM file"), desc: t("Upload a .vrm file to store it on the server. For now the screen still shows a sample figure instead of the 3D model."), accept: ".vrm,.glb", vrm: true, value: s.live.vrm, onChange: v => set("live", { vrm: v }) })
        : [
          h(ImgField, { key: "t", tall: true, label: t("Speaking image"), desc: t("9:16 portrait image"), value: s.live.pngTalk, onChange: v => set("live", { pngTalk: v }) }),
          h(ImgField, { key: "i", tall: true, label: t("Idle image"), desc: t("9:16 portrait image"), value: s.live.pngIdle, onChange: v => set("live", { pngIdle: v }) }),
          h(Row, { key: "f", label: t("Swap images with the voice"), desc: t("When off, the speaking image stays until speech ends.") }, sw("live", "flap", t("Swap images")))
        ],
      s.live.mode === "vrm" && h(Row, { label: t("Mouth sensitivity"), value: (s.live.mouth / 10).toFixed(1) + "x", stack: true }, sl("live", "mouth", t("Mouth sensitivity"), 3, 20)),
      h(ImgField, { label: t("Live background image"), desc: t("Paste an image link or choose a file. Leave empty for a plain background."), value: s.live.bg, onChange: v => set("live", { bg: v }) }),
      h(Row, { label: t("Show captions") }, sw("live", "captions", t("Show captions")))),
    sec(t("API keys (stored as Worker secrets)"),
      h(Row, { label: t("Language model key"), desc: "LLM_API_KEY" }, keyChip(c.keys.llm)),
      h(Row, { label: t("Voice key"), desc: "TTS_API_KEY" }, keyChip(c.keys.tts)),
      h(Row, { label: "Cloudflare Access", desc: t("Works fine with Cloudflare Access alone. Set ACCESS_TEAM_DOMAIN and ACCESS_AUD if you also want the Worker to verify the token.") }, h("span", { className: "chip " + (c.access ? "ok" : "") }, c.access ? t("Worker verifies the token") : t("Not verified in the app"))),
      h(Row, { label: t("Check status"), desc: t("Only reports whether a key exists. Key values are never sent to the browser.") }, h(UI.Button, { disabled: c.keys.busy, onClick: c.checkKeys }, c.keys.busy ? t("Checking…") : t("Check")))),
    sec(t("Log"),
      h(Row, { label: t("Log level"), stack: true }, Seg(t("Log level"), [["debug", "debug"], ["info", "info"], ["warn", "warn"], ["error", "error"]], s.log.level, v => set("log", { level: v }), 72)),
      h(Row, { label: t("Stored entries"), value: `${logN} / 500`, desc: t("The first 500 entries are kept on the server. Keys and chat content are never logged."), stack: true }, h("div", { className: "btns" },
        h(UI.Button, { variant: "filled", onClick: c.dlLog }, t("Download .log")),
        h(UI.Button, { destructive: true, disabled: !logN, onClick: c.clearLog }, t("Clear log"))))),
    h("div", { className: "foot" }, c.build && h("div", { className: "ver" }, h("b", null, `${APP_NAME} ${c.build.version} (${c.build.release})`), ` · ${t("build")} ${c.build.number} · ${t("id")} ${c.build.id} · ${new Date(c.build.built).toLocaleString(localeTag(), { dateStyle: "medium", timeStyle: "short" })}`, h("ul", null, c.build.notes.map((n, i) => h("li", { key: i }, n)))), "Liquid Glass: glisse by Kelvin Zhang (MIT) · inspired by Riko Project by rayenfeng (MIT)"));
}
