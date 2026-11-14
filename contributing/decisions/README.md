# Architecture Decision Records (ADR)

An Architecture Decision Record (ADR) captures an important architecture decision along with its context, rationale, and alternatives.

## Conventions

- Directory: `contributing/decisions`
- Naming: `YYYY-MM-DD-verb-phrase.md`, for example `2026-11-14-add-provider-adapters.md`
- Format: Context and Problem Statement, Decision, Alternatives Considered, and optional More Information
- No YAML frontmatter and no explicit status fields; merging the ADR pull request accepts the decision
- Tradeoffs belong in the decision and alternatives; implementation and verification belong in issues or pull requests

## Workflow

- Propose a new ADR in a pull request and discuss it there.
- Merging the pull request accepts the decision.
- To replace a decision, create a new ADR and link both records, explaining the replacement.

## ADRs

- [2026-11-07 Run as a single Cloudflare Worker](2026-11-07-run-as-single-worker.md)
- [2026-11-07 Keep two-tier memory](2026-11-07-keep-two-tier-memory.md)
- [2026-11-08 Store state in KV and R2](2026-11-08-store-state-in-kv-and-r2.md)
- [2026-11-09 Protect with optional Cloudflare Access](2026-11-09-protect-with-optional-cloudflare-access.md)
- [2026-11-09 Transcribe speech on the server](2026-11-09-transcribe-speech-on-server.md)
- [2026-11-12 Vendor frontend libraries](2026-11-12-vendor-frontend-libraries.md)
- [2026-11-14 Add provider adapters](2026-11-14-add-provider-adapters.md)
- [2026-11-14 Default interface to English](2026-11-14-default-interface-to-english.md)
