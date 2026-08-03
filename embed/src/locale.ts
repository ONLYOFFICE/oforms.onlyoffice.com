export const SUPPORTED = [
  "ar",
  "de",
  "en",
  "es",
  "fr",
  "it",
  "ja",
  "pt",
  "zh",
] as const;
export type Locale = (typeof SUPPORTED)[number];
export const FALLBACK: Locale = "en";

export const LANGUAGES: { shortKey: Locale; longKey: string }[] = [
  { shortKey: "en", longKey: "English" },
  { shortKey: "fr", longKey: "Français" },
  { shortKey: "de", longKey: "Deutsch" },
  { shortKey: "es", longKey: "Español" },
  { shortKey: "pt", longKey: "Português" },
  { shortKey: "it", longKey: "Italiano" },
  { shortKey: "ja", longKey: "日本語" },
  { shortKey: "zh", longKey: "中文" },
  { shortKey: "ar", longKey: "عربي" },
];

/** "ru-RU" -> "ru", "pt-BR" -> "pt", "EN" -> "en". */
const baseOf = (culture: string): string =>
  String(culture || "")
    .trim()
    .toLowerCase()
    .split(/[-_]/)[0];

export function normalizeLocale(culture: string | null | undefined): Locale {
  const base = baseOf(culture ?? "");
  return (SUPPORTED as readonly string[]).includes(base)
    ? (base as Locale)
    : FALLBACK;
}
