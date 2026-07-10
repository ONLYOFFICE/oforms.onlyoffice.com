/**
 * Client-side i18next init. Bundles the 5 namespaces the main page uses,
 * for the locale(s) we ship. Add more locales by importing their JSON below.
 */
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enCommon from "../../public/locales/en/common.json";
import enMain from "../../public/locales/en/main.json";
import enMainTemplate from "../../public/locales/en/MainTemplate.json";
import enSortSelector from "../../public/locales/en/SortSelector.json";
import enSearchInput from "../../public/locales/en/SearchInput.json";

const NAMESPACES = ["common", "main", "MainTemplate", "SortSelector", "SearchInput"];

const resources: Record<string, Record<string, unknown>> = {
  en: {
    common: enCommon,
    main: enMain,
    MainTemplate: enMainTemplate,
    SortSelector: enSortSelector,
    SearchInput: enSearchInput,
  },
};

export async function initI18n(locale = "en") {
  const lng = resources[locale] ? locale : "en";
  await i18n.use(initReactI18next).init({
    lng,
    fallbackLng: "en",
    ns: NAMESPACES,
    defaultNS: "common",
    resources,
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
  });
  return i18n;
}
