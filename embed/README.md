# oforms embed

Standalone client bundle of the **oforms main page (templates catalog)** for
embedding in ONLYOFFICE Desktop / DocSpace (a Chromium tab). It reuses the real
components from `../src` — no visual re-implementation — and produces two files:

- `dist/oforms.js` — React app + all 9 locales' catalog data + UI translations (~7 MB)
- `dist/oforms.css` — all styles (CSS modules + global fonts)
- `dist/theme.default.json` — every overridable color token + its default (see Theming)

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
    editLabel: "Использовать этот шаблон", // popup confirm button (localize per host UI)
    cancelLabel: "Отмена", // popup cancel button (localize per host UI)
    // onEdit is OPTIONAL. By default the button opens the template in the desktop
    // editor via window.AscDesktopEditor.openTemplate(fileUrl, "<name>.<ext>")
    // (docx > pptx > xlsx; forms: pdf on editor > 8.1, else docxf). Provide onEdit
    // only to override that.
    // onEdit: (template) => { /* template.file_oform has the file urls */ },
    // theme is OPTIONAL — override any subset of dist/theme.default.json to
    // match the desktop's current color theme (see "Theming" below).
    theme: { "main-background": "#1e1e1e", "main-heading-color": "#f0f0f0" },
  });
</script>
```

Clicking a template card opens a **popup** with the template info (preview, format
badge, name, category tags derived from its subcategories, description, file size
and type) and two buttons — cards do not navigate away. **Cancel** closes the
popup; **Use this template** by default opens the file in the desktop editor
(`AscDesktopEditor.openTemplate`) — pass `onEdit` to override. `editLabel` /
`cancelLabel` change the two buttons' text. Layout matches the
[Figma popup mockup](https://www.figma.com/design/G8hSwprU0uV6n351ZOUq5a/Template-library?node-id=1600-20286).

**Single-page build:** the site's page heading (H1 + subtitle) is hidden, section
titles are plain text (no links to category/type pages), and there is no
search-results page: suggestion clicks open the template popup, while **Enter and
popular-search / history clicks filter the catalog in place** (clearing the input
restores it). Driven by `hideHeader` / `sectionLinks={false}` props on the shared
`MainTemplate` (site behavior unchanged).

### API (`window.OformsEmbed`)

| Method | Description |
| --- | --- |
| `render(target, opts)` | Render the catalog into `target` (selector or element). `opts`: `locale` (culture code, e.g. `"ru-RU"`), `onEdit(template)`, `editLabel` (default `"Use this template"`), `cancelLabel` (default `"Cancel"`), `theme` (color overrides, see Theming). |
| `setLocale(culture)` | Change language at runtime (e.g. when the desktop UI language changes). |
| `setTheme(theme)` | Apply color overrides at runtime (e.g. when the desktop's theme changes) — no re-render, just updates CSS variables. |
| `destroy()` | Unmount and clean up. |

### Theming

Every color the catalog renders with — cards, sidebar, search, sort selector,
the template popup, the language switcher — is wired as a CSS custom property
with a fallback: `var(--desktop-embed-<name>, <default>)`, set at each color's
definition site (both in the shared `../src` components and this package's own
`TemplateModal`/`LanguageSwitcher`). This is why it's overridable at all: CSS
custom properties resolve through `var()` even where the declaring property
itself is an inline style — unlike a plain literal value, which no external
CSS could ever reach.

`dist/theme.default.json` lists every available `<name>` and its current
default value — copy it, edit the ones you want to change, and pass the result
as `theme`:

```js
OformsEmbed.render("#oforms-root", {
  theme: {
    "main-background": "#1e1e1e",
    "main-heading-color": "#f0f0f0",
    "card-format-docx-background-color": "#4a7fd9",
  },
});

// Later — e.g. the desktop's own theme changed to dark — just re-apply:
OformsEmbed.setTheme({ "main-background": "#1e1e1e" });
```

Only pass the names you want to change; everything else keeps its default.
Internally this is just `element.style.setProperty("--desktop-embed-<name>", value)`
on the mount root, so — if preferred over the JS API — the host can equally
set `--desktop-embed-<name>` custom properties itself via its own CSS or
`style.setProperty`, at `#oforms-root` or any ancestor; both approaches compose
and can be mixed freely. Card and popup format-badge colors share the same
token names (`card-format-*`), so one override updates both together.

### Language

- `locale` accepts a **culture code** (`ru-RU`, `en-US`, `pt-BR`, `zh-CN`, …).
  It is mapped to one of the 9 supported languages (ar, de, en, es, fr, it, ja,
  pt, zh). **Anything unsupported (e.g. `ru-RU`) falls back to English.**
- All 9 languages — both UI translations and catalog data (template names) — are
  bundled into the JS, so switching shows that language's templates instantly,
  with no network.
- **Freshness:** the bundled data is a build-time snapshot, but on load the embed
  fetches a fresher copy in the background from a static JSON file on the oforms
  site (`GET <EMBED_DATA_URL>/main.<locale>.json`, served from this repo's
  `public/embed-data/`) and swaps it in. Update the file by running
  `npm run generate` and redeploying the site — no embed rebuild needed. If the
  fetch fails (offline), the bundled snapshot stays. See `EMBED_DATA_URL`.
- There is also a **language switcher** (globe, top-right) inside the embed.
- **Follows the desktop automatically**: on load it subscribes to the desktop
  bridge `AscDesktopEditor.attachEvent("on_native_message", …)` and, on the
  `settings:init` command, reads the locale from its JSON and switches. The host
  can also just call `render`/`setLocale` with a culture code.

## Build

`embed/` reuses components straight from `../src`, which in turn need the
**root** project's dependencies (react, clsx, dayjs, …) — Vite resolves them by
walking up to the root `node_modules`, the same way Node does. So building embed
needs BOTH the root's and embed's own `node_modules` installed.

From the repo root, one command installs both:

```bash
npm run install:all      # = npm install && npm install --prefix embed
```

(Equivalent to running `npm install` at the repo root, then `npm install` again
inside `embed/` — two separate `node_modules` / lockfiles, one command.)

Then, from `embed/`:

```bash
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
| `EMBED_DATA_URL` | `<EMBED_STATIC_URL>/embed-data` | Base URL for the static per-locale JSON, used for background refresh (empty to disable) |
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
