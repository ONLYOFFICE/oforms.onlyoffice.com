# oforms embed (v0)

Static templates catalog, loaded by ONLYOFFICE Desktop in an **iframe** so it
ships without a desktop release. Replaces the app that used to live here and its
Next.js shims — no dependency on `../src`.

v0 is a card grid, newest first, with type tabs, pagination, and
Category, Purpose and Language buttons. No expand-to-full-page, no redesign yet.

The page is a fixed shell — the controls and the pagination hold still and only
the card list scrolls — so **the host must give the iframe a definite height**.
A `height: auto` iframe is 150px.

## Develop

```bash
npm install
npm run dev      # http://localhost:5173/?locale=ar  — 0.16 MB vs 1.6 MB for en, and RTL
npm run build
```

## Query parameters

| Param | Meaning |
|---|---|
| `q` | search term (substring on the template name), set by the host |
| `type` | one of `docx,xlsx,pptx,pdf` — defaults to `docx` |
| `purpose` | one of `business`, `personal` — omitted is both |
| `category` | one category slug, e.g. `contracts-legal` |
| `page` | 1-based page index |
| `locale` | page language: `ar de en es fr it ja pt zh` |
| `lang` | catalog language, same values — omitted follows `locale` |

The grid shows **one file type at a time** — no template exists in two formats,
so the tabs partition the catalog rather than filter it. `?type=` pins the
opening tab.

An unknown `type` falls back to `docx`, an unknown `purpose` to both.

Search is scoped to the active tab, and switching tab keeps the term.

The page's language and the catalog's are separate. `locale` (UI strings,
direction, dates) resolves `?locale=` → `RendererProcessVariable.lang` → `en`
and is never stored. The Language button picks `lang` — which catalog loads, so
only template names and descriptions — and resolves `?lang=` →
`localStorage.lang` → `locale`. Storage being blocked costs the memory, nothing
else.

The host drives the page language with `?locale=` or a `locale` message, and can
pin the catalog with `?lang=`. None of these is stored.

There is no sort control and no `?sort=` — the grid is always newest first.

Desktop's light/dark comes from `RendererProcessVariable.theme.type`, read in
`index.html` before the first paint; a live switch arrives as a `theme` message.
Colours are CSS custom properties — see `src/styles/tokens.css`.

## Host bridge

Cross-origin (host `file://`, page `https://`), so the page cannot reach
anything of the host's — `window.parent.…`, its DOM, its custom properties.
Its own globals are another matter: Desktop injects `AscDesktopEditor` into this
frame, so `openTemplate` is called natively and the message is only the
fallback. `desktopVars.ts` is the one file that touches it.

- **page → host:** `{type:"ready"}`, `{type:"openTemplate", file, template}`
- **host → page:** `{type:"theme", value:"light"|"dark"}`, `{type:"locale", value}`

Inbound origins are checked against `EMBED_HOST_ORIGINS` (default
`null,file://` — a `file://` host reports origin `"null"`).

> Desktop grants this frame all 197 native methods, which it arguably should
> not. `openTemplate` is the only one used, and it stays behind the boolean in
> `desktopVars.ts` so nothing else can come to depend on it.

## Data

The catalogs live outside the deploy, in the bucket the DocSpace sync writes:
`data/<locale>.json`, one record per template file:
`{path, id, version, updated, size, pages, meta}`, with `meta` holding the
catalog properties (`slug`, `category`, `card-title`, `description`, `added`).
The file is `files/<path>`, its card `images/<path without ext>.card.webp`.
At runtime one locale is fetched from `EMBED_DATA_URL` (default
`https://static-oforms.onlyoffice.com/data`) as `<locale>.json?v=<stamp>` and
converted to templates in `src/data.ts`. All of it is immutable: files and images
carry their DocSpace `?v=<version>`, the catalogs the `embed-data-version` meta tag
in `index.html`, so no request is needed to learn it. The deploy stamps the
newest catalog's upload time (`EMBED_DATA_TIME`), and each sync rewrites that
tag in the deployed `index.html`; a local build stamps its own time.

## Deploy

S3 is production, Cloudflare Pages is for testing. Both run by hand.

- **Production** — `.github/workflows/deploy-embed.yml`: build, sync `dist` to S3,
  invalidate CloudFront. Hashed assets are immutable, `index.html` revalidates.
- **Templates** — `.github/workflows/sync-docspace.yml`: the DocSpace room to
  `files/`, `images/` and `data/` in the bucket, then the new stamp into the
  deployed `index.html`. Daily from `master`, or by hand (a dry run by default).

### Cloudflare Pages

Direct upload with wrangler, same as `onlyoffice.github.io`. The Pages project
does **not** need to be connected to a git repo.

Ad hoc, from a local build:

```bash
npm run build
npx wrangler pages deploy dist --project-name=<project>
```

In CI: `.github/workflows/deploy-embed-cloudflare.yml`, by hand. Needs the secrets
`CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID` and `CLOUDFLARE_PROJECT_NAME`.
Non-production branches land as preview deployments with their own URLs.

`static/_headers` is copied into the output — hashed assets
cached forever, `index.html` uncached so a deploy takes effect immediately.

Note the build reads `../public/locales` and `../public/images`, so it needs the
whole repo checked out, not a detached copy of `embed`.
