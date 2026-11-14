// Copyright (c) 2026 CERETOSPHERE (under COSVerses). Used with special permission from MiNoWa Industry.
// SPDX-License-Identifier: MIT
import { useState, useRef, useEffect, useCallback, h } from "./core/react.js";
import { I } from "./core/icons.js";
import { UI, glassOk, Lib } from "./core/glass.js";
import { Plain } from "./core/plain.js";
import { DEFAULTS } from "./core/defaults.js";
import { nid, fmt, dl } from "./core/util.js";
import { API, api, getJSON } from "./core/api.js";
import { audio } from "./core/audio.js";
import { wavBlob, startCapture } from "./core/capture.js";
import { t, setLocale } from "./i18n/index.js";
import { Msg, Wait, Figure, stLabel } from "./views/components.js";
import { SettingsBody } from "./views/settings.js";
export function App() {
  const [tab, setTab] = useState("chat");
  const [s, setS] = useState(DEFAULTS);
  const [d, setD] = useState(DEFAULTS);
  setLocale(s.ui.lang);
  Object.assign(UI, s.ui.glass && Lib ? Lib : Plain);
  const sRef = useRef(s); sRef.current = s;
  const [ready, setReady] = useState(false);
  const [bootErr, setBootErr] = useState(null);
  const [msgs, setMsgs] = useState([]);
  const [mem, setMem] = useState({ summary: "", done: 0 });
  const [busy, setBusy] = useState(null);
  const [play, setPlay] = useState(null);
  const [rec, setRec] = useState(null);
  const [tx, setTx] = useState(false);
  const [draft, setDraft] = useState("");
  const [toast, setToast] = useState(null);
  const [keys, setKeys] = useState({ llm: null, tts: null, stt: null, busy: false });
  const [logN, setLogN] = useState(0);
  const [saving, setSaving] = useState(false);
  const [access, setAccess] = useState(false);
  const [build, setBuild] = useState(null);
  const [fail, setFail] = useState(null);
  const tt = useRef(), recIv = useRef(), run = useRef(0), pageRef = useRef(), appRef = useRef(), botRef = useRef(), logq = useRef([]), abortRef = useRef(null), capRef = useRef(null), recRef = useRef(null), holdRef = useRef(false), aurls = useRef(new Map());
  const dirty = JSON.stringify(d) !== JSON.stringify(s);
  const log = useCallback((lv, m) => { logq.current.push({ level: lv, msg: String(m).slice(0, 200), ts: Date.now() }); }, []);
  const flushLogs = useCallback(async () => {
    if (!logq.current.length) return;
    const entries = logq.current.splice(0, 50);
    try { await api("/logs", { method: "POST", json: { entries } }); } catch (e) {}
  }, []);
  const notify = useCallback((t, ms = 2600) => { setToast(t); clearTimeout(tt.current); tt.current = setTimeout(() => setToast(null), ms); }, []);
  const set = useCallback((g, v) => setD(p => ({ ...p, [g]: { ...p[g], ...v } })), []);
  const quick = useCallback((g, v) => {
    const next = { ...sRef.current, [g]: { ...sRef.current[g], ...v } };
    setS(next); sRef.current = next;
    setD(p => ({ ...p, [g]: { ...p[g], ...v } }));
    getJSON("/settings", { method: "PUT", json: next }).catch(e => notify(t("Save failed: ") + e.message));
  }, [notify]);
  const boot = useCallback(async () => {
    setBootErr(null);
    try {
      const j = await getJSON("/bootstrap");
      let st = j.settings;
      try { const ls = localStorage.getItem("rhlyria.glass"); if (ls !== null) st = { ...st, ui: { ...st.ui, glass: ls !== "0" } }; } catch (e) {}
      setS(st); setD(st); sRef.current = st;
      setMsgs(j.messages); setMem(j.memory); setKeys({ ...j.secrets, busy: false }); setLogN(j.logs.count); setAccess(!!j.access); setBuild(j.build || null);
      setReady(true);
    } catch (e) { setBootErr(e.message || t("Can't reach the server")); }
  }, []);
  useEffect(() => { boot(); }, [boot]);
  useEffect(() => { if (ready) log("info", "session start"); }, [ready, log]);
  useEffect(() => { const iv = setInterval(flushLogs, 8000); return () => clearInterval(iv); }, [flushLogs]);
  useEffect(() => { document.documentElement.setAttribute("data-theme", s.ui.theme); }, [s.ui.theme]);
  useEffect(() => { document.documentElement.lang = s.ui.lang; try { localStorage.setItem("rhlyria.lang", s.ui.lang); } catch (e) {} }, [s.ui.lang]);
  useEffect(() => { document.documentElement.dataset.glass = s.ui.glass && glassOk ? "on" : "off"; try { localStorage.setItem("rhlyria.glass", s.ui.glass ? "1" : "0"); } catch (e) {} }, [s.ui.glass]);
  useEffect(() => {
    const el = botRef.current, app = appRef.current;
    if (!el || !app) return;
    const ro = new ResizeObserver(() => app.style.setProperty("--dock-h", Math.ceil(el.getBoundingClientRect().height) + "px"));
    ro.observe(el);
    return () => ro.disconnect();
  }, [ready]);
  useEffect(() => {
    if (tab !== "settings" || !ready) return;
    getJSON("/memory").then(j => setMem({ summary: j.summary, done: j.done })).catch(() => {});
    getJSON("/logs").then(j => setLogN(j.count)).catch(() => {});
  }, [tab, ready]);
  const audioUrl = async (key, fetcher) => {
    if (aurls.current.has(key)) return aurls.current.get(key);
    const blob = await (await fetcher()).blob();
    const u = URL.createObjectURL(blob);
    aurls.current.set(key, u);
    return u;
  };
  const loadInto = url => new Promise(res => {
    const fin = () => { audio.oncanplaythrough = null; audio.onerror = null; res(); };
    audio.oncanplaythrough = fin; audio.onerror = fin;
    audio.src = url; audio.load();
    setTimeout(fin, 8000);
  });
  const stopPlay = useCallback(() => { audio.pause(); setPlay(null); }, []);
  const playAudio = useCallback(async (id, url) => {
    audio.onplaying = () => setPlay({ id, st: "playing" });
    audio.onended = audio.onerror = audio.onpause = () => setPlay(p => p && p.id === id ? null : p);
    if (audio.src !== url) audio.src = url;
    try { audio.currentTime = 0; await audio.play(); } catch (e) { setPlay(null); notify(t("Couldn't play audio. Tap the play button on the message.")); }
  }, [notify]);
  const onPlay = useCallback(async m => {
    if (play && play.id === m.id) { stopPlay(); log("info", "tts stop"); return; }
    setPlay({ id: m.id, st: "loading" });
    try {
      let u = null;
      if (m.audio) { try { u = await audioUrl("a" + m.audio, () => api("/audio/" + m.audio)); } catch (e) { u = null; } }
      if (!u) { log("info", "tts replay request"); u = await audioUrl("m" + m.id, () => api("/tts", { method: "POST", json: { text: m.ja || m.text } })); }
      await loadInto(u);
      await playAudio(m.id, u);
    } catch (e) { setPlay(null); notify(t("Couldn't generate voice: ") + e.message); }
  }, [play, stopPlay, playAudio, log, notify]);
  const abortRec = useCallback(() => {
    clearInterval(recIv.current);
    if (capRef.current) { capRef.current.cancel(); capRef.current = null; }
    recRef.current = null;
    setRec(null);
  }, []);
  const cancelAll = useCallback(() => {
    run.current++;
    if (abortRef.current) abortRef.current.abort();
    holdRef.current = false;
    abortRec();
    setBusy(null); setTx(false); stopPlay();
    log("info", "cancelled by user");
  }, [abortRec, stopPlay, log]);
  const turn = useCallback(async (text, from, retry) => {
    const t = text.trim();
    if (!t) return;
    const id = ++run.current;
    const ac = new AbortController();
    abortRef.current = ac;
    setFail(null);
    if (!retry) setMsgs(m => [...m, { id: "u" + nid(), role: "user", text: t }]);
    log("info", `user(${from}) chars=${[...t].length}`);
    try {
      setBusy("think");
      const res = await api("/chat", { method: "POST", json: { text: t, from }, signal: ac.signal });
      const reader = res.body.getReader(), dc = new TextDecoder();
      let buf = "", fin = null;
      for (;;) {
        const { value, done } = await reader.read();
        if (done) break;
        buf += dc.decode(value, { stream: true });
        let i;
        while ((i = buf.indexOf("\n")) >= 0) {
          const line = buf.slice(0, i).trim();
          buf = buf.slice(i + 1);
          if (!line) continue;
          const ev = JSON.parse(line);
          if (ev.stage) { if (run.current === id) setBusy(ev.stage); }
          else if (ev.error) throw new Error(ev.error);
          else if (ev.done) fin = ev;
        }
      }
      if (run.current !== id) return;
      if (!fin) throw new Error(t("The reply was cut off."));
      const m = fin.message;
      let url = null;
      if (m.audio) {
        try { url = await audioUrl("a" + m.audio, () => api("/audio/" + m.audio)); await loadInto(url); }
        catch (e) { url = null; notify(t("Couldn't load the audio")); }
      } else if (fin.ttsError) notify(t("Couldn't generate voice: ") + fin.ttsError);
      if (run.current !== id) return;
      setMsgs(x => [...x, m]);
      setBusy(null);
      if (url) playAudio(m.id, url);
    } catch (e) {
      if (run.current === id) {
        setBusy(null);
        if (e.name !== "AbortError") { setFail({ text: t, from, error: e.message }); notify(t("Couldn't send: ") + e.message, 7000); log("error", "chat failed: " + e.message); }
      }
    }
  }, [log, notify, playAudio]);
  const startRec = useCallback(async from => {
    if (recRef.current || tx || busy) return false;
    stopPlay();
    let cap;
    try { cap = await startCapture(); }
    catch (e) { notify(t("Couldn't open the microphone: ") + (e.name === "NotAllowedError" ? t("Microphone permission was not granted") : e.message)); log("error", "mic: " + e.message); return false; }
    if (recRef.current) { cap.cancel(); return false; }
    capRef.current = cap;
    recRef.current = { from, start: Date.now() };
    setRec({ from, t: 0 });
    log("info", `mic start lang=${sRef.current.stt.lang} mode=${sRef.current.live.micMode}`);
    clearInterval(recIv.current);
    recIv.current = setInterval(() => setRec(r => r ? { ...r, t: r.t + 1 } : r), 1000);
    return true;
  }, [tx, busy, stopPlay, log, notify]);
  const stopRec = useCallback(async () => {
    const cur = recRef.current, cap = capRef.current;
    if (!cur || !cap) return;
    capRef.current = null; recRef.current = null;
    clearInterval(recIv.current); setRec(null); setTx(true);
    const id = ++run.current;
    const ac = new AbortController();
    abortRef.current = ac;
    try {
      const pcm = await cap.stop();
      if (pcm.length < 6400) { setTx(false); notify(t("Too short — try again.")); return; }
      let e2 = 0, n = 0;
      for (let i = 0; i < pcm.length; i += 16) { e2 += pcm[i] * pcm[i]; n++; }
      if (Math.sqrt(e2 / n) < 0.004) { setTx(false); notify(t("No speech detected — try again.")); return; }
      log("info", `mic stop ${(pcm.length / 16000).toFixed(1)}s, sending to server stt`);
      const j = await getJSON("/stt", { method: "POST", body: wavBlob(pcm), headers: { "Content-Type": "audio/wav" }, signal: ac.signal });
      if (run.current !== id) return;
      const t = String(j.text || "").trim();
      setTx(false);
      if (!t) { notify(t("Couldn't transcribe — try again.")); return; }
      log("info", `transcript chars=${[...t].length}`);
      if (cur.from === "live" || sRef.current.stt.autosend) turn(t, cur.from); else setDraft(t);
    } catch (e) {
      if (run.current === id) { setTx(false); if (e.name !== "AbortError") { notify(t("Transcription failed: ") + e.message, 7000); log("error", "stt failed: " + e.message); } }
    }
  }, [turn, log, notify]);
  useEffect(() => { if (rec && rec.t >= 60) stopRec(); }, [rec, stopRec]);
  const send = () => { if (!draft.trim()) return; const t = draft; setDraft(""); turn(t, "chat"); };
  const clearAll = useCallback(async () => {
    cancelAll(); setFail(null);
    try { await api("/memory?scope=all", { method: "DELETE" }); setMsgs([]); setMem({ summary: "", done: 0 }); aurls.current.clear(); notify(t("Chat and memory cleared")); }
    catch (e) { notify(t("Couldn't clear: ") + e.message); }
  }, [cancelAll, notify]);
  useEffect(() => { const el = pageRef.current; if (!el || tab !== "chat") return; const f = requestAnimationFrame(() => { el.scrollTop = el.scrollHeight; }); return () => cancelAnimationFrame(f); }, [msgs.length, busy, tab, rec, tx, ready]);
  const checkKeys = async () => {
    setKeys(k => ({ ...k, busy: true }));
    try { const j = await getJSON("/secrets"); setKeys({ llm: j.llm, tts: j.tts, stt: j.stt, busy: false }); notify(j.llm && j.tts ? t("All keys found") : t("Some keys are missing")); }
    catch (e) { setKeys(k => ({ ...k, busy: false })); notify(t("Check failed: ") + e.message); }
  };
  const dlLog = async () => {
    await flushLogs();
    const j = await getJSON("/logs").catch(() => null);
    if (!j || !j.count) { notify(t("No log entries yet")); return; }
    setLogN(j.count);
    const a = document.createElement("a");
    a.href = API + "/logs?download=1"; a.download = "";
    document.body.appendChild(a); a.click(); a.remove();
    notify(t("Downloading {n} log entries", { n: j.count }));
  };
  const clearLog = async () => { try { await api("/logs", { method: "DELETE" }); setLogN(0); notify(t("Log cleared")); } catch (e) { notify(t("Couldn't clear: ") + e.message); } };
  const saveSummary = async v => { try { await api("/memory", { method: "PUT", json: { summary: v } }); } catch (e) { notify(t("Couldn't save memory: ") + e.message); } };
  const clearSummary = async () => { try { await api("/memory?scope=summary", { method: "DELETE" }); setMem(p => ({ ...p, summary: "" })); notify(t("Summary cleared")); } catch (e) { notify(t("Couldn't clear: ") + e.message); } };
  const testVoice = async () => {
    try {
      notify(t("Generating a test voice…"));
      const u = await audioUrl("test" + Date.now(), () => api("/tts", { method: "POST", json: { text: "こんにちは、テスト音声です。" } }));
      await loadInto(u);
      await playAudio("test", u);
    } catch (e) { notify(t("Voice test failed: ") + e.message); }
  };
  const dlChat = () => {
    if (!msgs.length) { notify(t("No messages yet")); return; }
    dl("rhlyria-chat.txt", msgs.map(m => ((m.role === "user" ? (s.user.name.trim() || t("You")) : s.persona.name) + ": ") + (m.ja ? m.ja + "\n  " : "") + m.text).join("\n\n") + "\n", "text/plain;charset=utf-8");
    notify(t("Chat saved to a file"));
  };
  const save = async () => {
    if (saving) return;
    if (!dirty) { notify(t("No changes")); return; }
    setSaving(true);
    try {
      const next = JSON.parse(JSON.stringify(d));
      for (const kind of ["pngTalk", "pngIdle", "bg", "vrm"]) {
        const v = next.live[kind];
        if (!v) continue;
        if (v.startsWith("blob:") || v.startsWith("data:")) {
          const blob = await (await fetch(v)).blob();
          const r = await getJSON("/assets?kind=" + kind, { method: "POST", body: blob, headers: { "Content-Type": blob.type || "application/octet-stream", "X-File-Name": encodeURIComponent(blob.name || "") } });
          if (v.startsWith("blob:")) URL.revokeObjectURL(v);
          next.live[kind] = r.url;
        } else if (kind !== "vrm" && /^https:\/\//.test(v)) {
          const r = await getJSON("/assets/import", { method: "POST", json: { kind, url: v } });
          next.live[kind] = r.url;
        }
      }
      const out = await getJSON("/settings", { method: "PUT", json: next });
      setS(out.settings); setD(out.settings); sRef.current = out.settings;
      log("info", "settings saved");
      notify(t("Settings saved"));
    } catch (e) { notify(t("Save failed: ") + e.message); log("error", "save failed: " + e.message); }
    finally { setSaving(false); }
  };
  const revert = () => { setD(s); notify(t("Reverted to the saved settings")); };
  const resetAll = async () => {
    try { const out = await getJSON("/settings", { method: "DELETE" }); setS(out.settings); setD(out.settings); sRef.current = out.settings; notify(t("Settings reset")); }
    catch (e) { notify(t("Couldn't reset: ") + e.message); }
  };
  const ctx = { s: d, saved: s, access, build, set, mem, setMem, logN, log, notify, keys, checkKeys, dlLog, clearLog, clearAll, testVoice, saveSummary, clearSummary };
  const lastAi = [...msgs].reverse().find(m => m.role === "ai"), lastU = [...msgs].reverse().find(m => m.role === "user");
  const speaking = !!(play && play.st === "playing" && lastAi && play.id === lastAi.id);
  const uname = s.user.name.trim() || t("You");
  const txLabel = t("Transcribing…");
  const hold = s.live.micMode === "hold";
  const micUp = () => {
    holdRef.current = false;
    const cur = recRef.current;
    if (!cur) return;
    if (Date.now() - cur.start < 400) { abortRec(); notify(t("Hold while you talk, release when you're done.")); return; }
    stopRec();
  };
  const micDown = async e => {
    if (!hold || recRef.current || tx || busy) return;
    if (e && e.preventDefault && e.type !== "keydown") e.preventDefault();
    try { e.currentTarget.setPointerCapture(e.pointerId); } catch (x) {}
    holdRef.current = true;
    const ok = await startRec("live");
    if (ok && !holdRef.current) micUp();
  };
  let menu, page, cap = null, dock = null;
  if (!ready) {
    return h("div", { className: "stage" }, h("div", { className: "wallpaper" }),
      h("div", { className: "boot" }, bootErr ? [h("div", { key: "m" }, t("Can't reach the server: ") + bootErr), h(UI.Button, { key: "b", variant: "filled", onClick: boot }, t("Retry"))] : h(Wait, { label: t("Loading…") })));
  }
  if (tab === "chat") {
    const recChat = rec && rec.from === "chat";
    menu = [
      { label: s.tts.on ? t("Mute voice") : t("Enable voice"), onSelect: () => { quick("tts", { on: !s.tts.on }); notify(s.tts.on ? t("Voice in chat is off") : t("Voice in chat is on")); } },
      { label: t("Save chat as a file"), onSelect: dlChat },
      { label: t("Go to settings"), onSelect: () => setTab("settings") },
      "separator",
      { label: t("Clear chat & memory"), destructive: true, onSelect: clearAll }
    ];
    page = h("div", { className: "page", ref: pageRef },
      h("div", { className: "msgs" },
        !msgs.length && !busy && h("div", { className: "empty" }, t("Say hello to {name}", { name: s.persona.name })),
        msgs.map(m => h(Msg, { key: m.id, m, s, play, onPlay })),
        busy && h("div", { className: "m a" }, h("div", { className: "bub" }, h(Wait, { label: stLabel(busy) }))),
        fail && h("div", { className: "m a" }, h("div", { className: "bub err", role: "alert" }, h("div", { className: "errt" }, t("Couldn't send")), h("div", { className: "errm" }, fail.error), h("div", { className: "btns" }, h(UI.Button, { onClick: () => turn(fail.text, fail.from, true) }, t("Retry")), h(UI.Button, { onClick: () => setFail(null) }, t("Dismiss"))))),
        tx && h("div", { className: "m a" }, h("div", { className: "bub" }, h(Wait, { label: txLabel })))));
    const mid = recChat
      ? h(UI.Glass, { className: "strip" }, h("span", { className: "meter" }, [0, 1, 2, 3, 4].map(i => h("i", { key: i }))), h("span", null, t("Listening ") + fmt(rec.t)))
      : h(UI.Input, { "aria-label": t("Type a message"), placeholder: tx ? t("Transcribing…") : t("Message {name}", { name: s.persona.name }), value: draft, disabled: tx, onValueChange: setDraft, enterKeyHint: "send", style: { maxWidth: "none", flex: 1 }, onKeyDown: e => { if (e.key === "Enter" && !e.nativeEvent.isComposing) send(); } });
    dock = h("div", { className: "comp" }, mid,
      recChat
        ? [h(UI.Button, { key: "c", icon: I.x, "aria-label": t("Cancel recording"), onClick: cancelAll }), h(UI.Button, { key: "o", variant: "filled", icon: I.check, "aria-label": t("Finish and send"), onClick: stopRec })]
        : [h(UI.Button, { key: "m", icon: I.mic, "aria-label": t("Talk"), disabled: !!(busy || tx), onClick: () => startRec("chat") }), h(UI.Button, { key: "s", variant: "filled", icon: busy ? I.stop : I.send, "aria-label": busy ? t("Cancel") : t("Send"), disabled: !busy && !draft.trim(), onClick: busy ? cancelAll : send })]);
  } else if (tab === "live") {
    menu = [
      { label: s.live.captions ? t("Hide captions") : t("Show captions"), onSelect: () => quick("live", { captions: !s.live.captions }) },
      { label: t("Go to settings"), onSelect: () => setTab("settings") },
      "separator",
      { label: t("Clear chat & memory"), destructive: true, onSelect: clearAll }
    ];
    const working = busy || tx;
    page = h("div", { className: "live" },
      h("div", { className: "figure" + (speaking ? " speaking" : "") + (s.live.flap ? " flap" : ""), style: { "--mouth": s.live.mouth / 10 } }, h(Figure, { live: s.live })));
    if (s.live.captions) cap = h("div", { className: "cap", "aria-live": "polite" },
      rec ? h("div", { className: "wait" }, h("span", { className: "meter" }, [0, 1, 2, 3, 4].map(i => h("i", { key: i }))), h("span", { className: "wl" }, t("Listening ") + fmt(rec.t) + (hold ? t(" · release to send") : "")))
        : working ? h(Wait, { label: busy ? stLabel(busy) : txLabel })
          : fail ? h("div", { className: "orig solo" }, t("Couldn't send: ") + fail.error)
          : [lastU && h("div", { key: "u", className: "you" }, uname + ": " + lastU.text),
            lastAi ? [lastAi.ja && h("div", { key: "j", className: "ja", lang: "ja" }, lastAi.ja), (!lastAi.ja || s.tr.showOriginal) && h("div", { key: "o", className: "orig" + (lastAi.ja ? "" : " solo") }, lastAi.text)]
              : h("div", { key: "e", className: "orig solo" }, hold ? t("Hold the mic to talk") : t("Tap the mic to start talking"))]);
    dock = h(UI.Glass, { className: "dock" },
      h(UI.Button, { icon: I.stop, "aria-label": t("Stop"), disabled: !(rec || tx || busy || speaking), onClick: cancelAll }),
      h("span", { className: "micwrap" + (rec ? " on" : "") + (hold ? " hold" : ""), onPointerDown: hold ? micDown : undefined, onPointerUp: hold ? micUp : undefined, onPointerCancel: hold ? micUp : undefined, onContextMenu: hold ? e => e.preventDefault() : undefined, onKeyDown: hold ? e => { if ((e.key === " " || e.key === "Enter") && !e.repeat) { e.preventDefault(); micDown(e); } } : undefined, onKeyUp: hold ? e => { if (e.key === " " || e.key === "Enter") micUp(); } : undefined },
        h(UI.Button, { className: "big", variant: "filled", icon: rec && !hold ? I.check : I.mic, "aria-label": hold ? t("Hold to talk") : rec ? t("Finish talking") : t("Start talking"), disabled: !rec && !!(tx || busy), onClick: hold ? undefined : () => rec ? stopRec() : startRec("live") })),
      h(UI.Button, { icon: s.live.captions ? I.eye : I.eyeOff, "aria-label": s.live.captions ? t("Hide captions") : t("Show captions"), onClick: () => quick("live", { captions: !s.live.captions }) }));
  } else {
    menu = [
      { label: t("Export settings (.json)"), onSelect: () => { dl("rhlyria-settings.json", JSON.stringify(s, null, 2), "application/json"); notify(t("Settings exported")); } },
      { label: t("Reset to defaults"), destructive: true, onSelect: resetAll }
    ];
    page = h("div", { className: "page" }, h(SettingsBody, { c: ctx }));
    dock = h(UI.Glass, { className: "sdock" },
      h("span", { className: "hint" + (dirty ? " dirty" : "") }, dirty ? t("You have unsaved changes") : t("Everything is saved")),
      h("span", { className: "btns" },
        h(UI.Button, { disabled: !dirty || saving, onClick: revert }, t("Revert")),
        h(UI.Button, { variant: "filled", disabled: saving, onClick: save }, saving ? t("Saving…") : t("Save"))));
  }
  const bgOn = tab === "live" && !!s.live.bg;
  return h("div", { className: "stage" + (tab === "live" ? " on-live" : "") },
    h("div", { className: "wallpaper", style: bgOn ? { backgroundImage: `url(${JSON.stringify(s.live.bg)})` } : null, ...(bgOn ? { "data-glisse-backdrop": "" } : null) }),
    tab === "chat" && h("div", { className: "haze" }),
    h("div", { className: "app", ref: appRef },
      page,
      h("div", { className: "corner" }, h(UI.Menu, { "aria-label": t("Options"), items: menu })),
      h("div", { className: "bottom", ref: botRef }, cap, dock,
        h("div", { className: "tabs" }, h(UI.TabBar, { "aria-label": t("Main menu"), items: [{ value: "chat", label: t("Chat"), icon: I.chat }, { value: "live", label: t("Live"), icon: I.live }, { value: "settings", label: t("Settings"), icon: I.gear }], value: tab, onValueChange: setTab, style: { "--lg-tab-width": "58px", "--lg-tab-height": "38px" } }))),
      toast && h(UI.Glass, { className: "toast", role: "status" }, toast)));
}

