import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { FALLBACK, type Locale } from "./locale";

const NAMESPACES = [
  "common",
  "main",
  "MainTemplate",
  "SortSelector",
  "SearchInput",
  "TemplateModal",
  "searchresult",
  // Embed-only strings live in embed/locales, not the site's public/locales,
  // so panel copy stays out of the website translation set.
  "EmbedPanel",
];

const siteModules = import.meta.glob(
  "../../public/locales/*/{common,main,MainTemplate,SortSelector,SearchInput,TemplateModal,searchresult}.json",
  { eager: true, import: "default" },
) as Record<string, Record<string, unknown>>;

// Only `en` exists today; i18next's fallbackLng covers the other locales until
// the panel copy is translated.
const embedModules = import.meta.glob("../locales/*/EmbedPanel.json", {
  eager: true,
  import: "default",
}) as Record<string, Record<string, unknown>>;

const resources: Record<string, Record<string, unknown>> = {};
for (const [path, data] of Object.entries({
  ...siteModules,
  ...embedModules,
})) {
  const m = path.match(/locales\/([^/]+)\/([^/]+)\.json$/);
  if (!m) continue;
  const [, loc, ns] = m;
  (resources[loc] ??= {})[ns] = data;
}

let started = false;

export async function initI18n(locale: Locale = FALLBACK) {
  if (!started) {
    started = true;
    await i18n.use(initReactI18next).init({
      lng: locale,
      fallbackLng: FALLBACK,
      ns: NAMESPACES,
      defaultNS: "common",
      resources,
      interpolation: { escapeValue: false },
      react: { useSuspense: false },
    });
  } else if (i18n.language !== locale) {
    await i18n.changeLanguage(locale);
  }
  return i18n;
}
