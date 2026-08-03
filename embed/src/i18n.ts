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
];

const modules = import.meta.glob(
  "../../public/locales/*/{common,main,MainTemplate,SortSelector,SearchInput,TemplateModal,searchresult}.json",
  { eager: true, import: "default" },
) as Record<string, Record<string, unknown>>;

const resources: Record<string, Record<string, unknown>> = {};
for (const [path, data] of Object.entries(modules)) {
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
