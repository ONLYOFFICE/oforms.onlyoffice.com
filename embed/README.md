# oforms embed

Standalone client bundle of the **oforms main page (templates catalog)** for
embedding in ONLYOFFICE Desktop (a Chromium tab). It reuses the real components
from `../src` — no visual re-implementation — and produces two files:

- `dist/oforms.js` — React app + all catalog data, bundled (no runtime API call)
- `dist/oforms.css` — all styles (CSS modules + global fonts)

## Build

```bash
npm install              # once (installs vite + tooling; shared libs come from ../node_modules)
npm run generate         # fetch catalog data from the CMS -> data/main.en.json
npm run build            # -> dist/oforms.js + dist/oforms.css
npm run smoke            # optional: headless render + filter check
```

Update flow: `npm run generate` → `npm run build` → ship the two `dist/` files.

## How the desktop side embeds it

```html
<link rel="stylesheet" href="oforms.css" />
<div id="oforms-root" data-locale="en"></div>
<script src="oforms.js"></script>
```

The app mounts into `#oforms-root`. `data-locale` selects the language.

The bundle is a classic (non-module) script, so **no web server is required** —
it runs from `file://`, a custom app protocol, or embedded app resources alike.
(Fonts/icons/previews still load over the network from the CDN.)

## Configuration (build-time env)

| Env | Default | Purpose |
| --- | --- | --- |
| `EMBED_SITE_URL` | `https://oforms.onlyoffice.com` | Where card / search links point |
| `EMBED_STATIC_URL` | `https://oforms.onlyoffice.com` | Where fonts / icons / previews load from |
| `EMBED_CMS_URL` | value from `src/config/config.json` | CMS the generator reads |

## How it works (Next → standalone)

The real components depend on Next.js; `shims/` provide drop-in replacements
(aliased in `vite.config.ts`):

- **`next/router`** — filter/sort state lives in the URL query and is driven by
  `router.push({ query })`. The shim keeps that query in React state (client-side
  filtering, no navigation). Links to other pages (a template, search) navigate
  out to `EMBED_SITE_URL`.
- **`next/link`** — renders `<a>`; root-relative hrefs are absolutized to the site.
- **`next-i18next`** — re-exported from `react-i18next`; initialised in `src/i18n.ts`
  with the bundled `common/main/MainTemplate/SortSelector/SearchInput` namespaces.
- **`next/head`, `next/image`** — no-op / plain `<img>`.
- `process.env.NEXT_PUBLIC_*` reads are inlined via Vite `define`.

## Scope & notes

- **Catalog only** (matches the desktop team's reference prototype). The site
  header/footer (ONLYOFFICE chrome, ui-kit) are intentionally not included.
- **Assets from CDN**: fonts, filter/card icons and card previews load over the
  network from `EMBED_STATIC_URL` / the CMS. Not fully offline — bundling assets
  would be a further step.
- **Single locale** shipped per build (currently `en`). Add locales by importing
  their namespaces in `src/i18n.ts` and generating `data/main.<locale>.json`.
- **Style isolation**: `oforms.css` includes global `body`/`html` rules from the
  site. If it clashes with the host tab, mount under a Shadow DOM or scope the CSS.
