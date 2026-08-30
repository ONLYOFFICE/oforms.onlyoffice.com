# oforms embed (v0)

Static templates catalog, loaded by ONLYOFFICE Desktop in an **iframe** so it
ships without a desktop release. Replaces `../embed` and its Next.js shims — no
dependency on `../src`.

v0 is a card grid, newest first, with type tabs, pagination, language select and
filters in a drawer. No expand-to-full-page, no redesign yet.

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

`?hide=lang` removes the language selector but not locale switching — the host
still drives that with `?locale=` or a `locale` message.

There is no sort control and no `?sort=` — the grid is always newest first.

`theme` is a param (not a message) so the first paint is already correct.
Colours are CSS custom properties — see `src/styles/tokens.css`, names match
`../embed/theme.default.json`. The font is one of those tokens:
`?theme=font-family-base:Georgia,serif`.

## Host bridge

Cross-origin (host `file://`, page `https://`), so the page cannot reach
`window.AscDesktopEditor` — opening a template is delegated to the host.

- **page → host:** `{type:"ready"}`, `{type:"openTemplate", file, template}`
- **host → page:** `{type:"theme", tokens}`, `{type:"locale", value}`

Inbound origins are checked against `EMBED_HOST_ORIGINS` (default
`null,file://` — a `file://` host reports origin `"null"`).

> The host holds native `AscDesktopEditor` access; this page must never be
> granted it.

## Data

Fetched at runtime, one locale at a time, from
`EMBED_DATA_URL` (default `https://oforms.onlyoffice.com/oforms-editor/embed`):
`main.<locale>.json?v=<stamp>`, where the stamp is read at startup from
`version.txt` — uploaded uncached, rewritten by every data sync, so the browser
holds a cached catalog until the data actually changes. Don't move this JSON to
a Pages host; it is ~17 MB across all locales (139 KB gzipped for the largest
single locale).

`version.txt` must exist in the bucket before this app is deployed — the first
run of the data-sync workflow creates it.

## Deploy — Cloudflare Pages

Direct upload with wrangler, same as `onlyoffice.github.io`. The Pages project
does **not** need to be connected to a git repo.

Ad hoc, from a local build:

```bash
npm run build
npx wrangler pages deploy dist --project-name=<project>
```

In CI: `.github/workflows/deploy-embed-cloudflare.yml` (manual, or on push to
the embed paths). Needs `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID` and
`CLOUDFLARE_EMBED_PROJECT_NAME`. Non-production branches land as preview
deployments with their own URLs.

`static/_headers` is copied into the output — hashed assets cached forever,
`index.html` uncached so a deploy takes effect immediately.

Note the build reads `../public/locales` and `../public/images`, so it needs the
whole repo checked out, not a detached copy of `embed-new`.
