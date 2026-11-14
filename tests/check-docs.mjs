// Copyright (c) 2026 CERETOSPHERE (under COSVerses). Used with special permission from MiNoWa Industry.
// SPDX-License-Identifier: MIT
import { readFileSync, readdirSync, existsSync, statSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const failures = [];
const fail = m => failures.push(m);
const slug = text => {
  let out = "";
  for (const ch of text.trim().toLowerCase()) {
    if (ch === " ") out += "-";
    else if (/[\p{L}\p{N}\p{M}\-_]/u.test(ch)) out += ch;
  }
  return out;
};
const headingsOf = md => md.split("\n").filter(l => /^#{1,6} /.test(l)).map(l => l.replace(/^#+ /, "").trim());
const anchorsOf = md => new Set(headingsOf(md).map(slug));
const linksOf = md => [...md.matchAll(/\[[^\]]*\]\(([^)\s]+)\)/g)].map(m => m[1]).filter(u => !/^(https?:|mailto:)/.test(u));
const readme = ["README.md", "README.th.md", "README.zh.md"];
const REQUIRED_ORDER = ["Install", "Usage", "Contributing", "License"];
for (const f of readme) {
  const md = readFileSync(join(root, f), "utf8");
  const lines = md.split("\n");
  if (!/^# .+ _\(rhlyria-ai\)_$/m.test(md)) fail(`${f}: title must be "# Name _(rhlyria-ai)_"`);
  const pkg = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
  const shortLine = lines[2] || "";
  if (f === "README.md" && shortLine !== pkg.description) fail(`${f}: short description must equal package.json description`);
  if (shortLine.length >= 120) fail(`${f}: short description must be under 120 characters`);
  const level2 = lines.map((l, i) => [l, i]).filter(([l]) => l.startsWith("## ")).map(([l]) => l.slice(3).trim());
  const tocIdx = level2.findIndex(h => ["Table of Contents", "สารบัญ", "目录"].includes(h));
  if (tocIdx < 0) fail(`${f}: missing Table of Contents`);
  const sections = level2.slice(tocIdx + 1);
  const tocLinks = [...md.matchAll(/^- \[([^\]]+)\]\(#([^)]+)\)$/gm)].map(m => [m[1], m[2]]);
  const anchors = anchorsOf(md);
  if (tocLinks.length !== sections.length) fail(`${f}: ToC has ${tocLinks.length} entries but ${sections.length} sections follow`);
  tocLinks.forEach(([text, a], i) => {
    if (!anchors.has(a)) fail(`${f}: ToC anchor #${a} does not match a heading`);
    if (sections[i] && sections[i] !== text) fail(`${f}: ToC entry "${text}" out of order with heading "${sections[i]}"`);
  });
  const en = ["Install", "Usage", "Contributing", "License"].map(h => sections.indexOf(h));
  const th = ["การติดตั้ง", "การใช้งาน", "การมีส่วนร่วม", "สัญญาอนุญาต"].map(h => sections.indexOf(h));
  const zh = ["安装", "用法", "贡献", "许可证"].map(h => sections.indexOf(h));
  const idx = [en, th, zh].find(a => a.every(i => i >= 0));
  if (!idx) fail(`${f}: required sections missing or untranslated`);
  else if (!idx.every((v, i, a) => i === 0 || a[i - 1] < v)) fail(`${f}: required sections out of order`);
  if (sections[sections.length - 1] && !idx?.includes(sections.length - 1)) fail(`${f}: License must be the last section`);
  if (sections.length > 0 && !/^[^\n]*/.test(sections[sections.length - 1])) fail(`${f}: unexpected last section`);
  for (const link of linksOf(md)) {
    const [file, hash] = link.split("#");
    if (file === "") {
      if (hash && !anchors.has(hash)) fail(`${f}: broken in-page anchor #${hash}`);
      continue;
    }
    const target = resolve(root, file);
    if (!existsSync(target)) { fail(`${f}: broken link ${link}`); continue; }
    if (hash && statSync(target).isFile() && target.endsWith(".md")) {
      const t = readFileSync(target, "utf8");
      if (!anchorsOf(t).has(hash)) fail(`${f}: link ${link} points to a missing heading`);
    }
  }
}
const dec = join(root, "contributing/decisions");
const adrs = readdirSync(dec).filter(f => f.endsWith(".md") && f !== "README.md");
const index = readFileSync(join(dec, "README.md"), "utf8");
for (const f of adrs) {
  if (!/^\d{4}-\d{2}-\d{2}-[a-z][a-z0-9-]*\.md$/.test(f)) fail(`ADR ${f}: filename must be YYYY-MM-DD-verb-phrase.md`);
  const md = readFileSync(join(dec, f), "utf8");
  if (md.startsWith("---")) fail(`ADR ${f}: YAML frontmatter is not allowed`);
  if (!md.startsWith("# ")) fail(`ADR ${f}: must start with a title heading`);
  if (/status:/i.test(md)) fail(`ADR ${f}: explicit status fields are not allowed`);
  if (/^## (Consequences|Implementation Plan|Verification)/m.test(md)) fail(`ADR ${f}: forbidden section present`);
  const h2 = headingsOf(md).filter((_, i, a) => true).filter(h => md.includes("## " + h));
  const order = ["Context and Problem Statement", "Decision", "Alternatives Considered"];
  const at = order.map(h => md.indexOf("\n## " + h + "\n"));
  if (at.some(v => v < 0)) fail(`ADR ${f}: missing required section`);
  else if (!at.every((v, i, a) => i === 0 || a[i - 1] < v)) fail(`ADR ${f}: sections out of order`);
  if (!index.includes(f)) fail(`ADR ${f}: not listed in the index`);
  for (const link of linksOf(md)) {
    const target = resolve(dec, link.split("#")[0]);
    if (!existsSync(target)) fail(`ADR ${f}: broken link ${link}`);
  }
}
for (const link of linksOf(index)) {
  if (!existsSync(resolve(dec, link))) fail(`ADR index: broken link ${link}`);
}
for (const f of ["LICENSE", "NOTICE.md", "CONTRIBUTING.md", "CHANGELOG.md", "DEPLOY.md"]) if (!existsSync(join(root, f))) fail(`missing ${f}`);
if (failures.length) { console.log("Documentation checks failed:\n- " + failures.join("\n- ")); process.exit(1); }
console.log(`Documentation checks passed: ${readme.length} READMEs, ${adrs.length} ADRs.`);
