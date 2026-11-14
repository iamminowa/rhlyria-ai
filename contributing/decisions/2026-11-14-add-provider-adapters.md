# Add provider adapters

## Context and Problem Statement

The first version called OpenRouter and Fish Audio directly, with their names and request shapes hard-coded. Language models, speech-to-text, and voice services change often, and other people who fork the project need to use their own providers without rewriting the core code.

## Decision

Each external service is reached through a small adapter in `src/providers/`:

- **Language model**: `LLM_BASE_URL` (default OpenRouter) and `LLM_MODEL`. Any OpenAI-compatible chat endpoint works.
- **Speech-to-text**: `STT_URL` and `STT_FORMAT`. `openrouter` sends JSON with base64 audio, and `openai` sends multipart form data.
- **Text-to-speech**: `TTS_URL` and `TTS_FORMAT`. `fish` keeps the Fish Audio request shape, and `openai` uses the OpenAI speech request shape.

Keys use generic names: `LLM_API_KEY`, `TTS_API_KEY`, and optionally `STT_API_KEY`. The original names `OPENROUTER_API_KEY` and `FISH_API_KEY` are still accepted.

Scope: request shapes that already exist. Non-goal: a plugin system.

Accepted tradeoffs: more variables to document, and a new request shape requires a new branch in code.

## Alternatives Considered

- **Hard-code one provider**: benefits are simplicity. Drawbacks are that every fork rewrites the core. Rejected.
- **Run a multi-provider gateway such as LiteLLM**: benefits are many providers out of the box. Drawbacks are another service to host and operate. Rejected for a single-Worker design.
- **Plugin registry loaded at runtime**: benefits are extensibility. Drawbacks are complexity and a larger security surface for keys and requests. Rejected.

## More Information

- Adapters: `src/providers/llm.js`, `src/providers/stt.js`, `src/providers/tts.js`.
- Configuration table: README, Configuration section.
- Related: [Transcribe speech on the server](2026-11-09-transcribe-speech-on-server.md).
