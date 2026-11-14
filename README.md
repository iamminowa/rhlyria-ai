<div align="center">

# Rhlyria AI

**Self-hosted voice and text AI companion** running as one Cloudflare Worker.

English · [ไทย](README.th.md) · [中文](README.zh.md)

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/iamminowa/rhlyria-ai)

</div>

Rhlyria AI lets you talk with a friendly AI character by text or by voice. Replies can be translated into a second language and spoken aloud, and the character can appear as a 3D VRM model or as two PNG images. Everything runs in one Cloudflare Worker: it serves the web app, stores settings and chat history, and calls the model providers on your behalf, so API keys never reach the browser.

## Table of Contents

- [Security](#security)
- [Background](#background)
- [Install](#install)
- [Usage](#usage)
- [Configuration](#configuration)
- [Providers](#providers)
- [Development](#development)
- [Project Layout](#project-layout)
- [API](#api)
- [Thanks](#thanks)
- [Contributing](#contributing)
- [License](#license)


## Security

The app has no login of its own. Put it behind Cloudflare Access, or set `ACCESS_TEAM_DOMAIN` and `ACCESS_AUD` so the Worker verifies Access tokens itself. Without either, anyone who knows the URL can use the app and spend your provider credits. API keys are stored as Worker secrets, are never sent to the browser, and are never written to logs. See [ADR: Protect with optional Cloudflare Access](contributing/decisions/2026-11-09-protect-with-optional-cloudflare-access.md).

## Background

Rhlyria AI is adapted from [Riko Project](https://github.com/rayenfeng/riko_project) (MIT), a local Python voice companion. This version moves the idea into a browser app on Cloudflare Workers, so it works on phones, tablets, and computers without installing anything. The glass interface uses the Liquid Glass SDK, based on [glisse](https://github.com/0kzh/glisse) (MIT). Architecture decisions are recorded in [contributing/decisions](contributing/decisions/README.md).

## Install

**Dependencies:** a Cloudflare account (the free plan works). For the developer path, also Node.js 20 or newer and npm.

**Option A: no terminal (recommended).** Follow [DEPLOY.md](DEPLOY.md). In short: download `dist/worker.js`, create a Worker in the Cloudflare dashboard, paste the file, bind a KV namespace as `AI_KV`, add the `LLM_API_KEY` secret, and deploy.

**Option B: developer, from a terminal.**

```bash
npm install
npx wrangler login
npm run setup
```

Create the KV namespace (and the optional R2 bucket) in your Cloudflare account, then add their IDs to `wrangler.jsonc` under `kv_namespaces` and `r2_buckets`.

**Updating:** replace the Worker code with the new `dist/worker.js` and deploy again, or run `git pull` and `npm run deploy`.

## Usage

Open your Worker URL, for example `https://rhlyria-ai.<your-subdomain>.workers.dev`, and then:

1. Open **Settings**, check the language model name, and save. The default model is a free model with limited quota.
2. Type a message in **Chat**, or tap the microphone in **Live**.

To call the API directly, send a message and read the streamed JSON lines:

```bash
curl -X POST https://your-worker.example.workers.dev/horizon/api/chat \
  -H "Content-Type: application/json" \
  -d '{"text": "Hello!"}'
```

When Cloudflare Access protects the app, a direct call must include the Access token.

## Configuration

Set these in the Cloudflare dashboard under **Settings > Variables and Secrets**, or with `wrangler secret put` for secrets.

| Name | Required | Default | Purpose |
| --- | --- | --- | --- |
| `LLM_API_KEY` | Yes | none | Key for the language model and, unless overridden, speech-to-text |
| `LLM_BASE_URL` | No | `https://openrouter.ai/api/v1` | Any OpenAI-compatible base URL |
| `LLM_MODEL` | No | none | Model used if Settings is empty |
| `TTS_API_KEY` | No | none | Key for text-to-speech. Without it, replies are text only |
| `TTS_URL` | No | `https://api.fish.audio/v1/tts` | Text-to-speech endpoint |
| `TTS_FORMAT` | No | `fish` | `fish` or `openai` |
| `STT_URL` | No | OpenRouter transcription endpoint | Speech-to-text endpoint |
| `STT_FORMAT` | No | `openrouter` | `openrouter` or `openai` (multipart form) |
| `STT_API_KEY` | No | `LLM_API_KEY` | Separate key for speech-to-text |
| `ACCESS_TEAM_DOMAIN` | No | none | Your Access team domain. Set together with `ACCESS_AUD` |
| `ACCESS_AUD` | No | none | Access application audience tag |
| `ALLOWED_EMAILS` | No | none | Comma-separated emails allowed when Access is verified |

Bindings: `AI_KV` is required. `AI_R2` is optional; without it, uploads are stored in KV with lower limits.

The legacy names `OPENROUTER_API_KEY` and `FISH_API_KEY` still work.

## Providers

Language, speech-to-text, and text-to-speech are separate adapters in `src/providers/`. To use an OpenAI-compatible service for everything, set:

```
LLM_BASE_URL=https://api.openai.com/v1
LLM_API_KEY=...
STT_FORMAT=openai
TTS_URL=https://api.openai.com/v1/audio/speech
TTS_FORMAT=openai
TTS_API_KEY=...
```

Speech-to-text then uses `LLM_BASE_URL` as its base unless `STT_URL` is set. For a new request shape, add a branch in the matching adapter. See [ADR: Add provider adapters](contributing/decisions/2026-11-14-add-provider-adapters.md).

## Development

```bash
npm install
npm run build
npm test
npm run dev
```

`npm run build` bundles the app into `dist/worker.js`. `npm test` builds, checks the documentation, and runs the API tests. The tests need no network access and use simulated providers.

## Project Layout

```
src/
  worker.js        HTTP routes
  chat.js          chat turns, translation, length limits, memory summary
  config.js        defaults, validation, shared constants
  auth.js          optional Cloudflare Access token verification
  store.js         KV and R2 storage, uploads, logs
  ui.js            serves the app and sets security headers
  providers/       language model, speech-to-text, and text-to-speech adapters
  ui/              browser app (React, i18n, components)
  vendor/          vendored React and Liquid Glass SDK
contributing/decisions/   architecture decision records
tests/                    documentation and API tests
build.mjs                 produces dist/worker.js
```

## API

All routes are under `/horizon/api`. Writes must come from the same origin.

- `GET /health`, `GET /bootstrap`: status, settings, history, and build information
- `GET`, `PUT`, `DELETE /settings`: read, save, or reset settings
- `GET`, `PUT`, `DELETE /memory`: read or edit the summary, or clear it with `?scope=summary` or `?scope=all`
- `POST /chat`: send a message; the response is a stream of JSON lines with `stage`, `done`, or `error` events
- `POST /tts`: synthesize text and return audio
- `POST /stt`: transcribe a WAV recording and return `{ "text": "..." }`
- `GET /audio/:id`: fetch audio from a recent reply
- `POST /assets?kind=pngTalk|pngIdle|bg|vrm`: upload a file; `POST /assets/import` fetches an image by https link
- `GET`, `DELETE /assets/:id`: fetch or remove an upload
- `GET`, `POST`, `DELETE /logs`: read, add to, or clear the log; `?download=1` returns a `.log` file
- `GET /secrets`: reports whether each key is set, never its value

## Thanks

- [Riko Project](https://github.com/rayenfeng/riko_project) by rayenfeng, the original concept (MIT).
- [glisse](https://github.com/0kzh/glisse) by Kelvin Zhang, the base of the Liquid Glass SDK (MIT).
- [React](https://react.dev) and its contributors (MIT).

## Contributing

Questions and bug reports are welcome as issues in this repository. Pull requests are accepted. Before opening one, run `npm test`, keep the copyright and license headers, add translations for every new interface string, and read [CONTRIBUTING.md](CONTRIBUTING.md). For a change to the architecture, propose an ADR in [contributing/decisions](contributing/decisions/README.md) first.

## License

[MIT](LICENSE). Copyright (c) 2026 CERETOSPHERE (under COSVerses), used with special permission from MiNoWa Industry. Third-party components keep their own licenses; see [NOTICE.md](NOTICE.md).
