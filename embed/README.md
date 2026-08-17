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
      "card-heading-color": "#f0f0f0",
      "card-description-color": "#9092a6",
    },
  });
</script>
```

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
  },
});

// Later — e.g. the desktop's own theme changed to dark — just re-apply:
OformsEmbed.setTheme({ "card-heading-color": "#f0f0f0" });
```
