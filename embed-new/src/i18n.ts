/*
 * (c) Copyright Ascensio System SIA 2009-2026
 *
 * This program is a free software product.
 * You can redistribute it and/or modify it under the terms
 * of the GNU Affero General Public License (AGPL) version 3 as published by the Free Software
 * Foundation. In accordance with Section 7(a) of the GNU AGPL its Section 15 shall be amended
 * to the effect that Ascensio System SIA expressly excludes the warranty of non-infringement of
 * any third-party rights.
 *
 * This program is distributed WITHOUT ANY WARRANTY, without even the implied warranty
 * of MERCHANTABILITY or FITNESS FOR A PARTICULAR  PURPOSE. For details, see
 * the GNU AGPL at: http://www.gnu.org/licenses/agpl-3.0.html
 *
 * You can contact Ascensio System SIA at Lubanas st. 125a-25, Riga, Latvia, EU, LV-1021.
 *
 * The  interactive user interfaces in modified source and object code versions of the Program must
 * display Appropriate Legal Notices, as required under Section 5 of the GNU AGPL version 3.
 *
 * Pursuant to Section 7(b) of the License you must retain the original Product logo when
 * distributing the program. Pursuant to Section 7(e) we decline to grant you any rights under
 * trademark law for use of our trademarks.
 *
 * All the Product's GUI elements, including illustrations and icon sets, as well as technical writing
 * content are licensed under the terms of the Creative Commons Attribution-ShareAlike 4.0
 * International. See the License terms at http://creativecommons.org/licenses/by-sa/4.0/legalcode
 */

import i18n, { type Resource, type ResourceLanguage } from "i18next";
import { initReactI18next } from "react-i18next";
import { FALLBACK, SUPPORTED, type Locale } from "./locale";

export const NAMESPACES = [
  "common",
  "main",
  "MainTemplate",
  "SearchInput",
  "TemplateModal",
  "searchresult",
  "embed",
] as const;

// All 9 locales are bundled rather than fetched: it is only ~37 KB in total,
// and it means switching language needs no network at all.
const modules = import.meta.glob(
  "../../public/locales/*/{common,main,MainTemplate,SearchInput,TemplateModal,searchresult}.json",
  { eager: true, import: "default" },
) as Record<string, Record<string, string>>;

// Labels this page needs that the shared catalogs do not carry yet. English
// only — other locales fall back to these until the keys are translated and
// moved into public/locales/<locale>/.
const EMBED_STRINGS: Record<string, string> = {
  Filters: "Filters",
  Templates: "Templates",
  Language: "Language",
  Previous: "Previous",
  Next: "Next",
  Close: "Close",
  Clear: "Clear",
  Loading: "Loading templates…",
  LoadFailed: "Templates could not be loaded.",
  Retry: "Retry",
};

const resources: Resource = {};

for (const [path, data] of Object.entries(modules)) {
  const match = path.match(/locales\/([^/]+)\/([^/]+)\.json$/);
  if (!match) continue;
  const [, locale, namespace] = match;
  (resources[locale] ??= {} as ResourceLanguage)[namespace] = data;
}

for (const locale of SUPPORTED) {
  (resources[locale] ??= {} as ResourceLanguage).embed = EMBED_STRINGS;
}

let started = false;

export async function initI18n(locale: Locale = FALLBACK) {
  if (!started) {
    started = true;
    await i18n.use(initReactI18next).init({
      lng: locale,
      fallbackLng: FALLBACK,
      ns: NAMESPACES as unknown as string[],
      defaultNS: "MainTemplate",
      resources,
      interpolation: { escapeValue: false },
      react: { useSuspense: false },
    });
  } else if (i18n.language !== locale) {
    await i18n.changeLanguage(locale);
  }
  return i18n;
}
