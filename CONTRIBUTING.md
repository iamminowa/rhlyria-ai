# Contributing

Thanks for your interest. Before opening a pull request:

1. Run `npm test` and make sure it passes. It checks the API and the documentation.
2. Keep the copyright header and SPDX line at the top of new files.
3. Do not add third-party CDN URLs. Vendor libraries under `src/vendor/` and keep their license headers.
4. Add translations for any new user-facing string in `src/ui/i18n/` (English is the source).
5. Never log or return API keys.
6. For a change that affects architecture, propose an ADR in `contributing/decisions/` (see its README for the format).
7. Keep the README files in step: English, Thai, and Chinese versions must have the same sections.

Please report security issues privately instead of opening a public issue.
