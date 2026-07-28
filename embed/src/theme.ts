/**
 * Theming: every themeable color across the catalog is wired as
 * `var(--desktop-embed-<name>, <default>)` at its definition site (see the
 * shared ../src components and this package's own TemplateModal/LanguageSwitcher).
 * Applying a theme is just setting `--desktop-embed-<name>` custom properties
 * on the mount root — CSS custom properties resolve through var() even where
 * the consuming declaration itself is an inline style, so this works
 * regardless of how deep in the tree a color is set.
 *
 * The `--desktop-embed-` prefix avoids colliding with the host page's own
 * variables (the embed is injected into someone else's app).
 */
export type Theme = Record<string, string>;

const PREFIX = "--desktop-embed-";

/** Apply (or clear, when value is null/undefined) a set of theme overrides on
 *  `root`. Descendants — including the template popup — inherit them. */
export function applyTheme(theme: Theme, root: HTMLElement): void {
  for (const [name, value] of Object.entries(theme)) {
    if (value == null) root.style.removeProperty(PREFIX + name);
    else root.style.setProperty(PREFIX + name, value);
  }
}
