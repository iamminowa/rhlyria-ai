# Store state in KV and R2

## Context and Problem Statement

The app keeps settings, the last 300 chat messages, a memory summary, up to 500 log entries, synthesized audio kept for seven days, and uploaded images or VRM models. A dashboard-only user should not have to provision a database server, and the storage must work on the free Workers plan.

## Decision

Structured state and small files are stored in Workers KV under the binding `AI_KV`. Uploaded images and VRM models are stored in R2 under the binding `AI_R2` when it is bound. Without R2, uploads fall back to KV with lower limits (images up to 10 MB, VRM up to 20 MB).

Keys are prefixed by owner, for example `u:owner:settings`, so the layout can support more owners later without a migration. Logs are flushed to KV in batches to limit write volume.

Accepted tradeoffs: KV is eventually consistent and limits writes per key. Chat history is updated by read-modify-write, which is safe for one owner but can lose messages if two chats finish at the same moment.

## Alternatives Considered

- **D1 (SQLite)**: benefits are relational queries and transactions. Drawbacks are extra setup and schema code for simple document data. Rejected for version 2.0; revisit with multiple owners.
- **Durable Objects**: benefits are strong consistency per object. Drawbacks are more setup and more concepts for contributors. Rejected for now.
- **Browser localStorage only**: benefits are no server state. Drawbacks are that settings and history do not follow the user to other devices and uploads cannot be served from a URL. Rejected; localStorage is kept only for the glass toggle and interface language.

## More Information

- Storage helpers: `src/store.js`.
- Revisit when more than one owner writes concurrently, or when chat history needs search.
