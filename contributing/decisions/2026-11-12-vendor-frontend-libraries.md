# Vendor frontend libraries

## Context and Problem Statement

The UI loaded React and the Liquid Glass SDK from a CDN. That CDN only allows certain origins, so the app failed on other domains such as workers.dev. A public project should not depend on a third-party host staying available or allowing a new origin.

## Decision

React 18.3.1 UMD builds and the Liquid Glass SDK are vendored under `src/vendor/` and served by the Worker at `/horizon/vendor/`. The Content Security Policy allows scripts, styles, and connections only from the same origin.

The only change to the SDK is the path its loader uses for React. The original license headers are kept, and `NOTICE.md` records the origin of each file.

If the SDK fails to load, the app falls back to a flat interface with no glass effect, and the Settings page explains why.

Accepted tradeoffs: updates are manual, and the bundle includes about 280 KB of vendored code.

## Alternatives Considered

- **Keep loading from a CDN**: benefits are no bytes in the bundle and automatic patch updates. Drawbacks are origin allowlists, availability risk, and CSP exceptions. Rejected.
- **Install through npm and bundle with esbuild**: benefits are standard version pinning and updates. Drawbacks are that the Liquid Glass SDK is distributed here as static files, and no npm package for it was confirmed. Rejected until a package exists.

## More Information

- Vendor notes: `src/vendor/README.md`. Attribution: `NOTICE.md`.
- Revisit if the SDK is published as an npm package, or if React is upgraded.
