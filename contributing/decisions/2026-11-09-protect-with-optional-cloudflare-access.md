# Protect with optional Cloudflare Access

## Context and Problem Statement

The app holds paid provider keys and private chat history, so anyone who finds the URL could spend the owner's credits. The owner plans to put Cloudflare Access in front of the app. Other people may deploy the project without Access, and the app should not break for them, but it must not silently run half-protected either.

## Decision

Cloudflare Access is the expected gatekeeper and is configured in the Cloudflare dashboard, not in the application. The Worker can also verify the Access token itself. When both `ACCESS_TEAM_DOMAIN` and `ACCESS_AUD` are set, every request must carry a valid Cloudflare Access JWT (checked for signature, issuer, audience, and expiry). `ALLOWED_EMAILS` can further restrict the account list.

If only one of the two variables is set, the Worker returns a 503 with a clear message instead of running unprotected. If neither is set, the app runs without its own check, and the documentation says so.

Scope: the owner's deployment. Non-goal: a built-in login system.

Accepted tradeoffs: a deployment without Access is open to anyone with the URL. This is documented in the README Security section and in DEPLOY.md.

## Alternatives Considered

- **Built-in login (password or one-time code)**: benefits are protection without Access. Drawbacks are password storage, reset flows, and duplicating what Access already does well. Rejected.
- **Always require Access**: benefits are the strongest default. Drawbacks are that dashboard-only deployments would fail until Access is configured, and that Access detection can misfire for some users. Rejected as a hard requirement; kept as a strong recommendation.
- **Shared secret header**: benefits are simplicity. Drawbacks are that it is weak, easy to leak in a browser, and hard to rotate per user. Rejected.

## More Information

- Verification code: `src/auth.js`.
- Revisit when several people need separate accounts, which would require per-user storage.
