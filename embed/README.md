# oforms embed

Standalone client bundle of the **ONLYOFFICE Templates panel** for embedding in
ONLYOFFICE Desktop / DocSpace (a Chromium tab). It produces three files:

- `dist/oforms.js` — React app + all 9 locales' catalog data + UI translations (~7.7 MB)
- `dist/oforms.css` — all styles (CSS modules + base reset + the web fonts, inlined)
- `dist/theme.default.json` — every overridable design token + its default (see Theming)

`dist/index.html` is written too — a minimal demo host, not part of the bundle.

The bundle is a **classic (non-module) script**, so **no web server is required** —
it runs from `file://`, a custom app protocol, or embedded app resources alike.

## UI

The panel is laid out from the Figma mockups of the editor's Templates panel:
a fixed 360px filter column (nav, Type / Country / Purpose / Category, and a
pinned "Clear all filters" footer) beside a flexible list column (search row,
list header with the result count, and a card grid). It is drawn with the
**ONLYOFFICE editor UI kit** — Segoe UI, `#000000cc` text, 4px radii, 30px
chips — not the oforms website design system.

The components live in `src/EmbedApp` and are owned by this package. Earlier
versions re-used the website's `Main` / `Sidebar` / `Card` components through the
`@src` alias; the redesign does not, so panel changes no longer affect
oforms.onlyoffice.com. Only pure helpers are still shared
(`@src/components/templates/Main/Main.utils`, `@src/utils/allowedTypes`,
`@src/utils/rtl`); the `shims/` Next.js replacements remain so any future `@src`
import keeps resolving.

**Sizing:** the panel fills its mount element and scrolls its own list column,
so the host must give that element a **definite height**. Without one,
`height: 100%` resolves to `auto` and the panel grows to full content height
instead of scrolling internally.

```css
#oforms-root {
  height: 100%;
} /* or a fixed px height, or a flex/grid track */
```

**Persisted state:** favourites and recently opened templates are stored in
`localStorage` under `oforms-embed:favorites` and `oforms-embed:recent`.
Storage failures are ignored and degrade to in-memory only.

## Integration

```html
<link rel="stylesheet" href="oforms.css" />
<div id="oforms-root" style="height: 100%"></div>
<script src="oforms.js"></script>
<script>
  // Call whenever the container exists. Loading order no longer matters.
  OformsEmbed.render("#oforms-root", {
    // locale is OPTIONAL. Without it the desktop's interface language is
    // detected automatically (and followed on live switches — see "Language").
    // Pass it only to force a specific initial locale, e.g. "en-US".
    // onEdit is OPTIONAL. By default the button opens the template in the desktop
    // editor via window.AscDesktopEditor.openTemplate(fileUrl, "<name>.<ext>")
    // (docx > pptx > xlsx; forms: pdf on editor > 8.1, else docxf). Outside the
    // desktop (no AscDesktopEditor) it opens the template page on the site in a
    // new tab. Provide onEdit only to override that.
    // onEdit: (template) => { /* template.file_oform has the file urls */ },
    // theme is OPTIONAL — override any subset of dist/theme.default.json to
    // match the desktop's current color theme (see "Theming" below).
    theme: {
      "oo-text-normal": "#e7e7e7",
      "oo-bg-action-panel": "#333333",
    },
  });
</script>
```

### Theming

Colors, radii and shadows are **design tokens** — CSS custom properties named
after the editor's own Figma variables (`text/normal` → `--oo-text-normal`).
Every component reads them through `var()` and none hardcodes a value, so the
whole panel is restyleable from outside.

Defaults for the light theme are defined at `:root` in `src/tokens.css` and ship
inside `oforms.css`, so the bundle renders correctly with no theme passed.
`dist/theme.default.json` lists every token and its default — copy it, edit what
you want, and pass the result as `theme` (it is applied as inline custom
properties on the mount element, which overrides the `:root` defaults):

```js
OformsEmbed.render("#oforms-root", {
  theme: { "oo-text-normal": "#e7e7e7", "oo-bg-pane": "#3d3d3d" },
});

// Later — e.g. the desktop's own theme changed to dark — just re-apply:
OformsEmbed.setTheme({ "oo-text-normal": "#e7e7e7" });
```

A dark theme is not implemented yet: `src/tokens.css` has an empty
`:root[data-oo-theme="dark"]` block reserved for it. Until the dark mockups
land, `setTheme()` is the way to follow the desktop's dark mode.

## Design conformance checks

The numbers taken off the Figma frames are asserted, not eyeballed. With a
server running the panel (`npm run dev`, or the built `dist/`):

```sh
npm run check:measures   -- http://localhost:5173/ 1358,954,720
npm run check:typography -- http://localhost:5173/
```

- `check:measures` diffs `embed.measure.json` — panel/list paddings, chip and
  card geometry, gaps, radii, border widths, font steps — against
  `getComputedStyle` at each width, and exits non-zero on any mismatch.
- `check:typography` asserts every text node renders in Segoe-UI at one of the
  six Figma text styles.

Both need `puppeteer-core` resolvable from the repo root
(`npm install puppeteer-core --no-save`) and Chrome; override its location with
`CHROME_PATH`.
