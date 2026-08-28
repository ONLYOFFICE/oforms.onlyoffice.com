# oforms embed (v0)

Static templates catalog, loaded by ONLYOFFICE Desktop in an **iframe** so it
ships without a desktop release. Replaces `../embed` and its Next.js shims — no
dependency on `../src`.

v0 is a flat card grid with sort, pagination, language select and filters in a
drawer. No category tabs, no expand-to-full-page, no redesign yet.

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
| `type` | comma list of `docx,xlsx,pptx,pdf` |
| `country` | comma list of lowercase country codes |
| `subcategory` | comma list of subcategory slugs |
| `sort` | `popular`, `asc`, `desc`, `name_asc`, `name_desc` |
| `page` | 1-based page index |
| `locale` | `ar de en es fr it ja pt zh` |
| `theme` | token overrides — JSON, or `name:value;name:value` |
| `font` | host font family |

`theme` and `font` are params (not messages) so the first paint is already
correct. Colours are CSS custom properties — see `src/styles/tokens.css`, names
match `../embed/theme.default.json`.

## Host bridge

Cross-origin (host `file://`, page `https://`), so the page cannot reach
`window.AscDesktopEditor` — opening a template is delegated to the host.

- **page → host:** `{type:"ready"}`, `{type:"openTemplate", file, template}`
- **host → page:** `{type:"theme", tokens}`, `{type:"font", family}`, `{type:"locale", value}`

Inbound origins are checked against `EMBED_HOST_ORIGINS` (default
`null,file://` — a `file://` host reports origin `"null"`).

> The host holds native `AscDesktopEditor` access; this page must never be
> granted it.

## Data

Fetched at runtime, one locale at a time, from
`EMBED_DATA_URL` (default `https://oforms.onlyoffice.com/oforms-editor/embed`):
`main.<locale>.json`. No caching layer — HTTP caching covers repeat loads. Don't
move this JSON to a Pages host; it is ~17 MB across all locales.

## Deploy — Cloudflare Pages

Cloudflare runs the build, so there is no CI workflow and no build output in the
repo. Connect the GitHub repo and set:

| Setting | Value |
|---|---|
| Root directory | `embed-new` |
| Build command | `npm run build` |
| Build output directory | `dist` |

Every branch gets a preview URL. `static/_headers` caches hashed assets forever
and keeps `index.html` uncached.

The build reads `../public/locales` and `../public/images`, so the whole repo
must be checked out — set the root directory, don't point Cloudflare at a
detached copy of `embed-new`.
