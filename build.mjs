// Copyright (c) 2026 CERETOSPHERE (under COSVerses). Used with special permission from MiNoWa Industry.
// SPDX-License-Identifier: MIT
import { build } from "esbuild";
import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";
const root = new URL(".", import.meta.url).pathname;
const read = p => readFileSync(join(root, p), "utf8");
const walk = d => readdirSync(join(root, d)).flatMap(f => statSync(join(root, d, f)).isDirectory() ? (f === "generated" ? [] : walk(join(d, f))) : [join(d, f)]);
const ver = JSON.parse(read("version.json"));
const now = new Date();
const z = n => String(n).padStart(2, "0");
const number = process.env.BUILD_NUMBER || `${now.getUTCFullYear()}${z(now.getUTCMonth() + 1)}${z(now.getUTCDate())}.${z(now.getUTCHours())}${z(now.getUTCMinutes())}`;
const ui = await build({ entryPoints: [join(root, "src/ui/main.js")], bundle: true, format: "esm", target: "es2022", platform: "browser", write: false, legalComments: "none", external: ["/horizon/*"] });
const files = {
  "/app.js": { type: "text/javascript; charset=utf-8", body: ui.outputFiles[0].text },
  "/app.css": { type: "text/css; charset=utf-8", body: read("src/ui/app.css") },
  "/perf.js": { type: "text/javascript; charset=utf-8", body: read("src/ui/perf.js") },
  "/vendor/liquid.js": { type: "text/javascript; charset=utf-8", body: read("src/vendor/liquid.js") },
  "/vendor/liquid.css": { type: "text/css; charset=utf-8", body: read("src/vendor/liquid.css") },
  "/vendor/react.js": { type: "text/javascript; charset=utf-8", body: read("src/vendor/react.js") },
  "/vendor/react-dom.js": { type: "text/javascript; charset=utf-8", body: read("src/vendor/react-dom.js") }
};
const hash = createHash("sha256");
for (const f of [...walk("src")].sort()) hash.update(f).update(readFileSync(join(root, f)));
hash.update(JSON.stringify(ver));
const build_ = { version: `${ver.major}.${ver.version}.${ver.pack}`, release: ver.release, number, id: hash.digest("hex").slice(0, 8), built: now.toISOString().replace(/\.\d+Z$/, "Z"), notes: ver.notes };
mkdirSync(join(root, "src/generated"), { recursive: true });
writeFileSync(join(root, "src/generated/build.js"), `export const BUILD = ${JSON.stringify(build_, null, 2)};\n`);
writeFileSync(join(root, "src/generated/assets.js"), `export const ASSETS = ${JSON.stringify({ html: read("src/ui/index.html"), files })};\n`);
const banner = `// Rhlyria AI ${build_.version} (${build_.release}) - build ${build_.number} - id ${build_.id}\n// Copyright (c) 2026 CERETOSPHERE (under COSVerses). Used with special permission from MiNoWa Industry.\n// SPDX-License-Identifier: MIT. Third-party notices: see NOTICE.md (React, Liquid Glass SDK).\n`;
await build({ entryPoints: [join(root, "src/worker.js")], bundle: true, format: "esm", target: "es2022", platform: "neutral", mainFields: ["module", "main"], outfile: join(root, "dist/worker.js"), legalComments: "none", banner: { js: banner } });
console.log(`Built Rhlyria AI ${build_.version} (${build_.release}) build ${build_.number} id ${build_.id} -> dist/worker.js`);
