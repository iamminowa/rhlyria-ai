# Run as a single Cloudflare Worker

## Context and Problem Statement

Rhlyria AI needs a web UI and an HTTP API that a single owner can host cheaply, and that other people can deploy without learning a build pipeline. The original Riko Project is a local Python program with a terminal interface, so it cannot run on a phone or tablet. The hosting target is Cloudflare Workers, and the UI must work from any browser.

## Decision

The browser UI and the HTTP API are served by one Cloudflare Worker. At build time, `build.mjs` bundles the React application, its CSS and vendored libraries, and the Worker code into `dist/worker.js`. The UI assets are embedded as strings inside that file, so deploying means uploading one file.

Scope: the owner account and its settings. Non-goals: multi-tenant accounts, server-side rendering, and a separate static-asset host.

Accepted tradeoffs: the single file grows as features are added, every UI change requires a Worker redeploy, and chat requests share the Worker's CPU and time limits. Streaming responses and background work through `waitUntil` keep long replies within those limits.

## Alternatives Considered

- **Cloudflare Pages for the UI plus a Worker for the API**: benefits are separate caching and deploys for static files. Drawbacks are two deployment units, cross-origin configuration, and more steps for someone who only uses the dashboard. Rejected because the install path should be one upload.
- **Local desktop app or CLI**: benefits are no hosting and direct device access. Drawbacks are that it cannot be opened from a phone or tablet and that each user must install it. Rejected because multi-device use is a stated goal.
- **Keep the Python server**: benefits are reuse of the original code. Drawbacks are that it cannot run on Workers and needs a long-running host. Rejected.

## More Information

- Build entry point: `build.mjs`. Worker router: `src/worker.js`.
- Revisit if the bundle approaches the Worker size limit, or if the UI needs independent deploys.
- Related: [Protect with optional Cloudflare Access](2026-11-09-protect-with-optional-cloudflare-access.md), [Store state in KV and R2](2026-11-08-store-state-in-kv-and-r2.md).
