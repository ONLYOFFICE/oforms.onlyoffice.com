# oforms embed

Standalone client bundle of the **oforms main page (templates catalog)** for
embedding in ONLYOFFICE Desktop / DocSpace (a Chromium tab). It reuses the real
components from `../src` — no visual re-implementation — and produces three
files:

- `dist/oforms.js` — React app + all 9 locales' catalog data + UI translations (~7.7 MB)
- `dist/oforms.css` — all styles (CSS modules + base reset + the web fonts, inlined)
- `dist/theme.default.json` — every overridable design token + its default (see Theming)

`dist/index.html` is written too — a minimal demo host, not part of the bundle.

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
    locale: "en-US",
    // onEdit is OPTIONAL. By default the button opens the template in the desktop
    // editor via window.AscDesktopEditor.openTemplate(fileUrl, "<name>.<ext>")
    // (docx > pptx > xlsx; forms: pdf on editor > 8.1, else docxf). Outside the
    // desktop (no AscDesktopEditor) it opens the template page on the site in a
    // new tab. Provide onEdit only to override that.
    // onEdit: (template) => { /* template.file_oform has the file urls */ },
    // theme is OPTIONAL — override any subset of dist/theme.default.json to
    // match the desktop's current color theme (see "Theming" below).
    theme: {
      "card-heading-color": "#f0f0f0",
      "card-description-color": "#9092a6",
    },
  });
</script>
```

Instead of calling `render` you can let the bundle mount itself: put
`data-oforms-auto` (optionally with `data-locale="en-US"`) on the container and
it is rendered on `DOMContentLoaded` — or immediately, if the script loads after
the document is ready.

Clicking a template card opens a **popup** with the template info (preview, format
badge, name, category tags derived from its subcategories, a "Free" label,
description, file size and type) and two buttons — cards do not navigate away.
**Cancel** closes the popup; **Use this template** by default opens the file in
the desktop editor (`AscDesktopEditor.openTemplate`) — pass `onEdit` to override.
Both button captions come from the bundled translations (`TemplateModal`
namespace), so they follow the embed's current language. Layout matches the
[Figma popup mockup](https://www.figma.com/design/G8hSwprU0uV6n351ZOUq5a/Template-library?node-id=1600-20286).

**Single-page build:** the embed does not reuse the site's `MainTemplate` page —
`src/EmbedApp/components/Template` composes the shared `Main` module
(`@src/components/modules/Main`) itself and passes `isEmbed`, which hides the
page heading (H1 + subtitle). Section titles are plain text (`href={undefined}`
on every `MainSection`, so no links to category/type pages), and there is no
search-results page: suggestion clicks open the template popup, while **Enter and
popular-search / history clicks filter the catalog in place** (clearing the input,
or changing any filter, restores it). A search with no matches renders the site's
`SearchNoResult` block. Site behavior is unchanged.

### API (`window.OformsEmbed`)

| Method                 | Description                                                                                                                                                                                                                      |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `render(target, opts)` | Render the catalog into `target` (selector or element). `opts`: `locale` (culture code, e.g. `"en-US"`), `onEdit(template)`, `theme` (token overrides, see Theming). Returns a promise resolving `false` if `target` is missing. |
| `setLocale(culture)`   | Change language at runtime (e.g. when the desktop UI language changes). Promise; `false` if called before `render`.                                                                                                              |
| `setTheme(theme)`      | Apply token overrides at runtime (e.g. when the desktop's theme changes) — no re-render, just updates the CSS custom properties. Returns `false` if called before `render`.                                                      |
| `destroy()`            | Unmount and clean up.                                                                                                                                                                                                            |

### Theming

The colors the catalog renders with — cards, sidebar, search, sort selector,
the language switcher, the popup — are **design tokens**: CSS custom properties
read as `var(--<name>)` at each color's definition site. The shared `../src`
components take them from the site's own token file (`src/styles/tokens.css`,
which defines every default at `:root`); this package's own components use the
same naming with a literal fallback in their `var()`. This is why the colors are
overridable at all: CSS custom properties resolve through `var()` even where the
declaring property itself is an inline style — unlike a plain literal value,
which no external CSS could ever reach.

`dist/theme.default.json` lists every available `<name>` and its current
default value — copy it, edit the ones you want to change, and pass the result
as `theme`:

```js
OformsEmbed.render("#oforms-root", {
  theme: {
    "card-heading-color": "#f0f0f0",
    "sidebar-item-text-color": "#c8c8c8",
    "card-format-docx-background-color": "#4a7fd9",
  },
});

// Later — e.g. the desktop's own theme changed to dark — just re-apply:
OformsEmbed.setTheme({ "card-heading-color": "#f0f0f0" });
```

Most tokens are colors, but a few are other values (a box-shadow, an opacity) —
whatever the declaration at the definition site expects; the JSON's default
shows which.

Only pass the names you want to change; everything else keeps its default.
Internally this is just `element.style.setProperty("--<name>", value)` on the
mount root, where it overrides the `:root` default for the whole subtree — so,
if preferred over the JS API, the host can equally set the `--<name>` custom
properties itself via its own CSS or `style.setProperty`, at `#oforms-root` or
any ancestor; both approaches compose and can be mixed freely. Names carry no
embed-specific prefix, so a token the host happens to define under the same
name higher up the tree is overridden by ours at the mount root. Card and popup
format-badge colors share the same token names (`card-format-*`), so one
override updates both together.

The `dev` page (`npm run dev`) applies the whole of `theme.default.json` on
render, so editing that file is the quickest way to try a palette against the
live catalog.

### Language

- `locale` accepts a **culture code** (`en-US`, `de-DE`, `pt-BR`, `zh-CN`, …).
  It is mapped to one of the 9 supported languages (ar, de, en, es, fr, it, ja,
  pt, zh). **Anything unsupported (e.g. `ru-RU`) falls back to English.**
- All 9 languages — both UI translations and catalog data (template names) — are
  bundled into the JS, so switching shows that language's templates instantly,
  with no network.
- **Freshness:** the bundled data is a build-time snapshot, but on load the embed
  fetches a fresher copy in the background from a static JSON file on the oforms
  site (`GET <EMBED_DATA_URL>/main.<locale>.json`, served from this repo's
  `public/embed-data/`) and swaps it in (once per locale per session; logged as
  `[oforms-embed] catalog revalidated`). Update the file by running
  `npm run generate` and redeploying the site — no embed rebuild needed. If the
  fetch fails (offline) or the payload is malformed, the bundled snapshot stays.
  See `EMBED_DATA_URL`.
- There is also a **language switcher** (globe, top-right) inside the embed.
- **Arabic renders RTL** — the wrapper sets `dir="rtl"` (`@src/utils/rtl`) and the
  styles use logical properties, so the whole catalog mirrors.
- **Follows the desktop automatically**: on load it subscribes to the desktop
  bridge `AscDesktopEditor.attachEvent("on_native_message", …)` and, on the
  `settings:init` / `settings:lang` commands, reads the locale from the payload
  (JSON object or plain string) and switches. As a fallback it also wraps a
  global `window.on_native_message`, chaining to any handler already installed.
  A message arriving before `render` is remembered and applied on mount. The host
  can also just call `render` / `setLocale` with a culture code.

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
npm run generate -- de   # ...or just one locale (arg defaults to "all")
npm run build            # bundle -> dist/oforms.js + oforms.css + theme.default.json + index.html
npm run dev              # vite dev server on embed/index.html (hot reload, dev theme applied)
npm run preview          # serve dist/ as the host would
```

`generate` writes the per-locale JSON into `public/embed-data/`; `build` bundles
all of them into the JS (git-ignored, so run `generate` before `build` after a
fresh clone). Nothing is fetched at runtime for the catalog.

## Configuration (build-time env)

| Env                | Default                             | Purpose                                                                                 |
| ------------------ | ----------------------------------- | --------------------------------------------------------------------------------------- |
| `EMBED_SITE_URL`   | `https://oforms.onlyoffice.com`     | Where card / search links point                                                         |
| `EMBED_STATIC_URL` | `https://oforms.onlyoffice.com`     | Where non-inlined icons load from (CSS `url(/images/…)`, rewritten in postbuild)        |
| `EMBED_DATA_URL`   | `<EMBED_STATIC_URL>/embed-data`     | Base URL for the static per-locale JSON, used for background refresh (empty to disable) |
| `EMBED_CMS_URL`    | value from `src/config/config.json` | CMS the generator reads                                                                 |

## How it works (Next → standalone)

The real components depend on Next.js; `shims/` provide drop-in replacements
(aliased in `vite.config.ts`):

- **`next/router`** — filter/sort state lives in the URL query, driven by
  `router.push({ query })`. The shim keeps that query in React state (client-side
  filtering, no navigation). Links to other pages navigate out to `EMBED_SITE_URL`.
- **`next/link`** → `<a>` (root-relative hrefs absolutized to the site).
- **`next-i18next`** → `react-i18next`; init + the 7 bundled namespaces
  (`common`, `main`, `MainTemplate`, `SortSelector`, `SearchInput`,
  `TemplateModal`, `searchresult`) × 9 locales in `src/i18n.ts`.
- **`next/head`, `next/image`** → no-op / plain `<img>`.
- **`@src/utils/getAssetUrl`** — the UI icons the catalog needs are imported and
  inlined as base64 `data:` uris (SVGs base64-encoded by hand: Vite's default
  svg data uri keeps raw quotes, which are invalid inside an unquoted `url()` in
  an inline style). Anything not in the map falls back to prefixing with
  `EMBED_STATIC_URL`.
- `process.env.NEXT_PUBLIC_*` reads are inlined via Vite `define`.

## Scope & notes

- **Catalog only** (matches the reference prototype). The site header/footer
  (ONLYOFFICE chrome, ui-kit) are intentionally not included.
- **Catalog data (all locales) is bundled** — instant, works offline; a fresher
  copy is fetched in the background (see Freshness). Card **preview images** and
  the actual template **files** load over the network on demand — preview urls are
  absolutized to the CMS origin by `scripts/generate-data.mjs`.
- **Fonts are bundled, not fetched.** The faces live in `src/fonts/` (copies of
  the site's `public/fonts`, woff2 only) and are declared in `src/global.css` with
  **relative** urls — the library-mode build inlines module-graph assets, so
  `dist/oforms.css` carries them as base64 `data:` uris and needs no font hosting.
  (A root-absolute `url(/fonts/…)` resolves against `publicDir` instead and stays
  a plain url — that's why the old build had to base64 them by hand in postbuild.)
  `scripts/postbuild.mjs` fails the build if a face is missing or left pointing at
  a url. Adding a weight costs ~4/3 of the file size in `oforms.css`, so only the
  weights the styles name are included: Sora 400/500/600/700/800 (catalog) and
  Segoe UI 400/700 (template modal).
- **`scripts/postbuild.mjs`** also rewrites any root-absolute `url(/images/…)`
  left in the built CSS to `EMBED_STATIC_URL`, then writes `dist/index.html` (the
  classic-script demo host) and copies `theme.default.json` into `dist/`.
- **Server side:** the revalidation endpoint lives in this repo at
  `src/pages/api/embed-data/[locale].ts` (uses `src/lib/requests/getEmbedForms.ts`,
  in-memory cache, 3 days by default — `EMBED_DATA_TTL_SEC` overrides — CORS-open).
  Runs on the main oforms site (`next start`).
- **Style isolation**: `oforms.css` includes global `body`/`html` rules. If it
  clashes with the host tab, mount under a Shadow DOM or scope the CSS.
