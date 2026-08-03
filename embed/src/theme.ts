export type Theme = Record<string, string>;

export function applyTheme(theme: Theme, root: HTMLElement): void {
  for (const [name, value] of Object.entries(theme)) {
    const prop = name.startsWith("--") ? name : `--${name}`;
    if (value == null) root.style.removeProperty(prop);
    else root.style.setProperty(prop, value);
  }
}
