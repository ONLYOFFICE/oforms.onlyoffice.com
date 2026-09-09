# deploy-hook

Cloudflare Worker. Strapi publishes a form → this dispatches
`.github/workflows/deploy-embed-cloudflare.yml`, which regenerates the catalogs
and redeploys `embed/dist` to Pages.

## Why a Worker and not a deploy hook

Pages' own deploy hooks rebuild from a connected git repo. This repo lives on a
self-hosted Gitea, which Pages cannot connect to, and the build needs
the `generate-data.mjs` step against `EMBED_CMS_URL` — so the deploy stays in
Actions and something has to convert Strapi's webhook into a `workflow_dispatch`
call. Strapi can only send its own payload to a fixed URL with fixed headers, so
it cannot make that call itself, and pointing it at the API directly would put a
repo-write token in the CMS config.

## Setup

1. `npm install`
2. Create the repo token — it only needs to start a workflow:
   - **GitHub**: fine-grained PAT on this repo, `Actions: read and write`.
   - **Gitea**: user token with `write:repository` (Actions dispatch is 1.24+,
     and the workflow's `concurrency` needs 1.26+ — older ignores it silently).
3. Set the secrets:
   ```sh
   npx wrangler secret put STRAPI_WEBHOOK_SECRET   # any long random string
   npx wrangler secret put GIT_TOKEN
   npx wrangler secret put GIT_API_BASE            # api root, no trailing slash
   npx wrangler secret put GIT_REPO                # owner/repo
   ```
   `GIT_API_BASE` is `https://api.github.com` for GitHub, or
   `https://<git-host>/api/v1` for Gitea.
4. Check the remaining `vars` in `wrangler.jsonc` — `GIT_REF` and
   `WORKFLOW_FILE` must match the workflow you want to run.
5. `npm run deploy` → note the `*.workers.dev` URL.
6. In Strapi → **Settings → Webhooks → Create**:
   - URL: the Worker URL
   - Header: `Authorization: Bearer <STRAPI_WEBHOOK_SECRET>`
   - Events: `publish`, `unpublish`, `delete` (Entry)

`workflow_dispatch` is already on the workflow, so nothing there changes.

## Why the git host is a secret

`wrangler.jsonc` is committed, and `vars` in it are plaintext in the repo and in
the dashboard. `GIT_API_BASE` and `GIT_REPO` name internal git infrastructure,
so they are secrets instead — encrypted at rest and unreadable after being set.
Nothing in the code changes: secrets and vars both arrive on `env`.

Two consequences worth knowing. A fetch-level failure names the full url in its
message, so the dispatch is wrapped and rethrown as `dispatch unreachable: <name>`
— otherwise observability logs would republish the host. And a secret is still
readable by anyone who can deploy to this Cloudflare account; this hides the host
from the repo, not from your team.

## Behaviour

- Rejects anything but `POST` with the right bearer token.
- Ignores events on models `generate-data.mjs` never reads, and ignores
  `entry.create` / `entry.update` — the generator fetches published entries only.
- Debounces `DEBOUNCE_MS` (120s) in a Durable Object alarm. Publishing 50 forms
  fires 50 webhooks; without this that is 50 runs, each refetching 9 locales.
- A failed dispatch throws in the alarm, which the runtime retries with backoff.

## Checks

```sh
npx tsc --noEmit                        # typecheck
npm run tail                            # live logs
curl -X POST https://<worker>/ \
  -H "Authorization: Bearer $SECRET" -H 'content-type: application/json' \
  -d '{"event":"entry.publish","model":"oform"}'
```
Expect `202 queued after entry.publish on oform`, then a run ~2 minutes later.
