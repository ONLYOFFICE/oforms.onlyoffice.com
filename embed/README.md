# oforms embed (v0)

Static templates catalog, loaded by ONLYOFFICE Desktop in an **iframe** so it
ships without a desktop release. Replaces the app that used to live here and its
Next.js shims — no dependency on `../src`.

v0 is a card grid, newest first, with type tabs, pagination, language select and
filters in a popover. No expand-to-full-page, no redesign yet.

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
| `purpose` | one of `business`, `personal` — defaults to `business` |
| `country` | comma list of lowercase country codes |
| `category` | comma list of category slugs, e.g. `contracts-legal` |
| `page` | 1-based page index |
| `locale` | `ar de en es fr it ja pt zh` |
| `theme` | token overrides — JSON, or `name:value;name:value` |
| `hide` | chrome the host supplies itself: `lang`, `search`, `type`, `purpose` (comma list) |

The grid shows **one file type at a time** — no template exists in two formats,
so the tabs partition the catalog rather than filter it. `?type=` pins the
opening tab and `?hide=type` drops the row, which is the desktop shape: the
host's create row already picked the editor.

`type` and `purpose` both always hold exactly one value, so an unknown or
multi-valued param falls back to the first of its order (`docx`, `business`) —
that is also how a stale `?type=docx,pdf` resolves. Neither has an "all" state:
a union of both purposes is the whole catalog, and every template is reachable
since Business covers all but the exclusively-personal ones.

Search is scoped to the active tab, and switching tab keeps the term.

A pick in the language menu is remembered in `localStorage.locale`, so the
locale resolves as `?locale=` → stored pick → `RendererProcessVariable.lang` →
`en`. The host can still pin a language per load; Desktop's UI language is only
the default. Storage being blocked (a third-party frame with site data off) costs
the memory, nothing else.

`?hide=lang` removes the language selector but not locale switching — the host
still drives that with `?locale=` or a `locale` message. Neither is stored: the
host re-states them on the next load.

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

The catalogs ship in the deploy. `scripts/generate-data.mjs` writes
`static/embed-data/main.<locale>.json` (Vite's `publicDir`, copied into `dist`)
plus a datestamp in `data-version.txt`, which `vite.config.ts` bakes into the
bundle. At runtime one locale is fetched from `EMBED_DATA_URL` (default
`./embed-data`) as `main.<locale>.json?v=<stamp>` — no request is needed to
learn the stamp, and the files are served immutable because the stamp is the
cache key.

```bash
EMBED_CMS_URL=https://templates-update.teamlab.info/dashboard \
  node scripts/generate-data.mjs [locale]     # default: all 9
```

**Run it before `npm run build`, not after.** A build with no data generated
warns and stamps `dev`, so `npm run build` still works as a bare typecheck.
`EMBED_CMS_URL` must be the Strapi **v5** instance; production's v4 returns a
different shape and would yield blank cards.

The nine catalogs are 7.62 MB raw / 732 KB gzipped, well inside Pages' limits —
see NOTES.md for the numbers.

## Deploy — Cloudflare Pages

Direct upload with wrangler, same as `onlyoffice.github.io`. The Pages project
does **not** need to be connected to a git repo.

Ad hoc, from a local build:

```bash
EMBED_CMS_URL=https://templates-update.teamlab.info/dashboard \
  node scripts/generate-data.mjs
npm run build
npx wrangler pages deploy dist --project-name=<project>
```

In CI: `.github/workflows/deploy-embed-cloudflare.yml` (manual, or on push to
`release/v10.0.0` under the embed paths). Needs `CLOUDFLARE_API_TOKEN`,
`CLOUDFLARE_ACCOUNT_ID`, `CLOUDFLARE_EMBED_PROJECT_NAME` and the `EMBED_CMS_URL`
variable. Non-production branches land as preview deployments with their own
URLs.

`static/_headers` is copied into the output — hashed assets and `/embed-data/*`
cached forever, `index.html` uncached so a deploy takes effect immediately.

Note the build reads `../public/locales` and `../public/images`, so it needs the
whole repo checked out, not a detached copy of `embed`.
