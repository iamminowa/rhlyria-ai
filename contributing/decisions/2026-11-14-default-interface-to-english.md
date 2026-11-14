# Default interface to English

## Context and Problem Statement

The first interface was written in Thai for one owner. The project is now public, so new users need English by default, and Thai and Chinese should remain available. Reply language is a separate concern: it follows what the user types.

## Decision

All interface text goes through a small translation function `t()` in `src/ui/i18n/`. English is the source language, and Thai and Chinese catalogs are maintained next to it. The default is English. Users switch language in Settings, and the choice is stored on the device and in the server settings.

Missing keys fall back to the English text. Translated replies depend on the user's input language and on the translation target, not on the interface language.

Accepted tradeoffs: every new user-facing string needs entries in each catalog. `CONTRIBUTING.md` lists this as a requirement.

## Alternatives Considered

- **Hard-code one language**: benefits are simplicity. Drawbacks are that it excludes most users. Rejected.
- **Detect language from the browser only**: benefits are automatic selection. Drawbacks are unpredictable behavior on shared devices and no way to override it. Rejected as the only mechanism; the browser language is not used.
- **Full i18n library**: benefits are pluralization and formatting rules. Drawbacks are a dependency and build complexity for a small number of strings. Rejected.

## More Information

- Catalogs: `src/ui/i18n/en.js`, `th.js`, `zh.js`. Helper: `src/ui/i18n/index.js`.
- Translated documentation: `README.th.md` and `README.zh.md`.
