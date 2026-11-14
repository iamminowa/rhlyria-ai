# Keep two-tier memory

## Context and Problem Statement

The companion should remember what was said without sending the whole history on every request. The owner asked for the most recent turns to be kept in full, and older turns to be condensed into a short summary that keeps only the important facts.

## Decision

The most recent turns are kept verbatim. The default is three turns, configurable from 1 to 6. A turn is one user message and one reply.

When more turns exist than the window allows, the oldest unsummarized turn is merged into a rolling summary by the language model. The summary is capped at 2,000 characters and aims for about 800. If the summarization call fails, a plain one-line record is appended instead. The owner can edit or clear the summary in Settings.

Accepted tradeoffs: summaries lose detail, each turn beyond the window costs one extra model call, and summary quality depends on the chosen model.

## Alternatives Considered

- **Send full history and truncate**: benefits are no extra calls. Drawbacks are that anything beyond the window is forgotten entirely. Rejected.
- **Vector retrieval of past messages**: benefits are finding old details by relevance. Drawbacks are an embedding service, an index, and more infrastructure. Rejected for version 2.0.
- **No memory**: benefits are simplicity. Drawbacks are a poor companion experience. Rejected.

## More Information

- Implementation: `summarize` in `src/chat.js`.
- Revisit if users need reliable recall of specific past facts, which would favor retrieval.
