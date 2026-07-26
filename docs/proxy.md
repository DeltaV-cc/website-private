# IntelHub CORS proxy

## Purpose

Browsers block many third-party intel APIs from `deltav-cc.github.io` (and other origins) due to CORS. The Cloudflare Worker at **`https://proxy.hub.deltav.cc`** fetches a target URL server-side and returns the body with:

```http
Access-Control-Allow-Origin: *
Cache-Control: public, max-age=300
```

IntelHub client code calls it as:

```text
https://proxy.hub.deltav.cc/?url=<encoded-upstream-url>
```

See `app/intelhub/hooks.ts` for call sites.

## Source of truth

| File | Role |
|------|------|
| `workers/proxy.js` | Worker fetch handler |
| `wrangler.toml` | Route `proxy.hub.deltav.cc/*` on zone `deltav.cc` |

Deploy with Wrangler (requires Cloudflare credentials; not part of `pnpm build`):

```bash
npx wrangler deploy
```

## Current behavior (important)

As of this writing the Worker:

1. Requires a `?url=` query parameter (400 if missing)
2. Fetches **any** absolute URL the client supplies
3. Reflects status/body with open CORS (`*`)
4. Sets `User-Agent: DeltaV-IntelHub/1.0`

This is effectively an **open CORS proxy** limited only by Cloudflare quotas and ops monitoring. That is useful for IntelHub but is an abuse and SSRF-adjacent risk if left unrestricted.

## Recommended hardening (ops follow-up)

Not applied in the professionalism hygiene PR (behavior change). When ready:

1. Allowlist upstream hosts actually used by IntelHub (CISA, NVD, HIBP, etc.)
2. Block private/link-local IP ranges and metadata endpoints
3. Rate-limit by IP / bot management on the route
4. Optionally require a shared secret header for non-browser callers

## Abuse and security reports

See [SECURITY.md](../SECURITY.md). Report suspected abuse or proxy policy issues to **engage@deltav.cc**.

## Relation to the static site

- The static export on GitHub Pages does **not** deploy this Worker.
- Changing only the Next.js app does not redeploy the proxy.
- Clone-only builds work without Wrangler; live IntelHub third-party pulls need the Worker (or another CORS strategy).
