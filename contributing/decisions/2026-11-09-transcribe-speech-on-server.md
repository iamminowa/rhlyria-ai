# Transcribe speech on the server

## Context and Problem Statement

The first version ran Whisper in the browser through WebAssembly. The model download is hundreds of megabytes, it was slow on phones and tablets, and some devices could not run it. The owner wants nothing to be downloaded to the user's device when they speak.

## Decision

The browser records the microphone as 16 kHz mono WAV and sends it to the Worker. The Worker forwards it to the configured speech-to-text provider. By default this is OpenRouter with `openai/whisper-large-v3`, and the model and language are settings. Clips are limited to 4 MB, and the recording stops automatically after 60 seconds.

Scope: speech-to-text for chat and Live mode. Non-goal: offline recognition.

Accepted tradeoffs: audio leaves the user's device and goes to the provider, every utterance costs provider credits, and latency depends on the network.

## Alternatives Considered

- **Whisper in the browser (WebAssembly)**: benefits are no per-request cost and audio stays on the device. Drawbacks are large downloads, device limits, and slow first use. This was the first version and was replaced.
- **Web Speech API**: benefits are that it is free and needs no download. Drawbacks are that audio goes to the browser vendor, support and Thai accuracy vary by browser, and results cannot be controlled. Rejected.
- **Self-hosted speech model on a GPU server**: benefits are full control and privacy. Drawbacks are that it sits outside Workers and adds operations work. Rejected for this version.

## More Information

- Client recording: `src/ui/core/capture.js`. Server route: `/horizon/api/stt` in `src/worker.js`.
- Provider selection: [Add provider adapters](2026-11-14-add-provider-adapters.md).
- Revisit if the provider price changes materially, or if users need audio to stay on their device.
