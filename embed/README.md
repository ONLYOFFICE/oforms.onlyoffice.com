# oforms embed

Standalone client bundle of the **oforms main page (templates catalog)** for
embedding in ONLYOFFICE Desktop / DocSpace (a Chromium tab). It reuses the real
components from `../src` — no visual re-implementation — and produces two files:

- `dist/oforms.js` — React app + all 9 locales' catalog data + UI translations (~7 MB)
- `dist/oforms.css` — all styles (CSS modules + global fonts)

The bundle is a **classic (non-module) script**, so **no web server is required** —
it runs from `file://`, a custom app protocol, or embedded app resources alike.

## Integration

```html
<link rel="stylesheet" href="oforms.css" />
<div id="oforms-root"></div>
<script src="oforms.js"></script>
<script>
  // Call whenever the container exists. Loading order no longer matters.
  OformsEmbed.render("#oforms-root", {
    locale: "ru-RU",
    editLabel: "Использовать этот шаблон", // popup button label (localize per host UI)
    // onEdit is OPTIONAL. By default the button opens the template in the desktop
    // editor via window.AscDesktopEditor.openTemplate(fileUrl, "<name>.<ext>")
    // (docx > pptx > xlsx; forms: pdf on editor > 8.1, else docxf). Provide onEdit
    // only to override that.
    // onEdit: (template) => { /* template.file_oform has the file urls */ },
  });
</script>
```

Clicking a template card opens a **popup** with the template info and a single
**Use this template** button — cards do not navigate away. By default the button
opens the template in the desktop editor (`AscDesktopEditor.openTemplate`); pass
`onEdit` to override, and `editLabel` to change the button text.

### API (`window.OformsEmbed`)

| Method | Description |
| --- | --- |
| `render(target, opts)` | Render the catalog into `target` (selector or element). `opts`: `locale` (culture code, e.g. `"ru-RU"`), `onEdit(template)`, `editLabel` (default `"Use this template"`). |
| `setLocale(culture)` | Change language at runtime (e.g. when the desktop UI language changes). |
| `destroy()` | Unmount and clean up. |

### Language

- `locale` accepts a **culture code** (`ru-RU`, `en-US`, `pt-BR`, `zh-CN`, …).
  It is mapped to one of the 9 supported languages (ar, de, en, es, fr, it, ja,
  pt, zh). **Anything unsupported (e.g. `ru-RU`) falls back to English.**
- All 9 languages — both UI translations and catalog data (template names) — are
  bundled into the JS, so switching shows that language's templates instantly,
  with no network.
- **Freshness:** the bundled data is a build-time snapshot, but on load the embed
  fetches a fresher copy in the background from the oforms site
  (`GET <site>/api/embed-data/<locale>`, cached 3 days) and swaps it in. So new
  CMS templates appear within ~3 days without rebuilding/redelivering the files.
  If the fetch fails (offline), the bundled snapshot stays. See `EMBED_DATA_URL`.
- There is also a **language switcher** (globe, top-right) inside the embed.
- **Follows the desktop automatically**: on load it subscribes to the desktop
  bridge `AscDesktopEditor.attachEvent("on_native_message", …)` and, on the
  `settings:init` command, reads the locale from its JSON and switches. The host
  can also just call `render`/`setLocale` with a culture code.

## Build

```bash
npm install              # once
npm run generate         # fetch all 9 locales -> ../public/embed-data/main.<locale>.json
npm run build            # bundle everything -> dist/oforms.js + dist/oforms.css + dist/index.html
npm run smoke            # optional: headless render / filter / locale-switch check
```

`generate` writes the per-locale JSON into `public/embed-data/`; `build` bundles
all of them into the JS (git-ignored, so run `generate` before `build` after a
fresh clone). Nothing is fetched at runtime for the catalog.

## Configuration (build-time env)

| Env | Default | Purpose |
| --- | --- | --- |
| `EMBED_SITE_URL` | `https://oforms.onlyoffice.com` | Where card / search links point |
| `EMBED_STATIC_URL` | `https://oforms.onlyoffice.com` | Where fonts / icons / previews load from |
| `EMBED_DATA_URL` | `<EMBED_STATIC_URL>/api/embed-data` | Revalidation endpoint for background refresh (empty to disable) |
| `EMBED_CMS_URL` | value from `src/config/config.json` | CMS the generator reads |

## How it works (Next → standalone)

The real components depend on Next.js; `shims/` provide drop-in replacements
(aliased in `vite.config.ts`):

- **`next/router`** — filter/sort state lives in the URL query, driven by
  `router.push({ query })`. The shim keeps that query in React state (client-side
  filtering, no navigation). Links to other pages navigate out to `EMBED_SITE_URL`.
- **`next/link`** → `<a>` (root-relative hrefs absolutized to the site).
- **`next-i18next`** → `react-i18next`; init + all 9 bundled namespaces in `src/i18n.ts`.
- **`next/head`, `next/image`** → no-op / plain `<img>`.
- `process.env.NEXT_PUBLIC_*` reads are inlined via Vite `define`.

## Scope & notes

- **Catalog only** (matches the reference prototype). The site header/footer
  (ONLYOFFICE chrome, ui-kit) are intentionally not included.
- **Catalog data (all locales) is bundled** — instant, works offline; a fresher
  copy is fetched in the background (see Freshness). Card **preview images / fonts**
  (CDN) and the actual template **files** (S3) load over the network on demand.
- **Server side:** the revalidation endpoint lives in this repo at
  `src/pages/api/embed-data/[locale].ts` (uses `src/lib/requests/getEmbedForms.ts`,
  in-memory 3-day cache, CORS-open). Runs on the main oforms site (`next start`).
- **Style isolation**: `oforms.css` includes global `body`/`html` rules. If it
  clashes with the host tab, mount under a Shadow DOM or scope the CSS.
