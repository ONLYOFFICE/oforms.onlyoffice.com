/*
 * Copyright (C) Ascensio System SIA, 2009-2026
 *
 * This program is a free software product. You can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License (AGPL)
 * version 3 as published by the Free Software Foundation, together with the
 * additional terms provided in the LICENSE file.
 *
 * This program is distributed WITHOUT ANY WARRANTY; without even the implied
 * warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. For
 * details, see the GNU AGPL at: https://www.gnu.org/licenses/agpl-3.0.html
 *
 * You can contact Ascensio System SIA by email at info@onlyoffice.com
 * or by postal mail at 20A-6 Ernesta Birznieka-Upisha Street, Riga,
 * LV-1050, Latvia, European Union.
 *
 * The interactive user interfaces in modified versions of the Program
 * are required to display Appropriate Legal Notices in accordance with
 * Section 5 of the GNU AGPL version 3.
 *
 * No trademark rights are granted under this License.
 *
 * All non-code elements of the Product, including illustrations,
 * icon sets, and technical writing content, are licensed under the
 * Creative Commons Attribution-ShareAlike 4.0 International License:
 * https://creativecommons.org/licenses/by-sa/4.0/legalcode
 *
 * This license applies only to such non-code elements and does not
 * modify or replace the licensing terms applicable to the Program's
 * source code, which remains licensed under the GNU Affero General
 * Public License v3.
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import i18n, { type Resource, type ResourceLanguage } from "i18next";
import { initReactI18next } from "react-i18next";
import { FALLBACK, type Locale } from "./locale";

// Only what this app renders. `common` and `main` were globbed and never read
// — 11.8 KB across the 9 locales for nothing.
export const NAMESPACES = [
  "MainTemplate",
  "SearchInput",
  "TemplateModal",
  "searchresult",
  "embed",
] as const;

// All 9 locales are bundled rather than fetched: it is only ~27 KB in total,
// and it means switching language needs no network at all.
const modules = import.meta.glob(
  "../../public/locales/*/{MainTemplate,SearchInput,TemplateModal,searchresult,embed}.json",
  { eager: true, import: "default" },
) as Record<string, Record<string, string>>;

const resources: Resource = {};

for (const [path, data] of Object.entries(modules)) {
  const match = path.match(/locales\/([^/]+)\/([^/]+)\.json$/);
  if (!match) continue;
  const [, locale, namespace] = match;
  (resources[locale] ??= {} as ResourceLanguage)[namespace] = data;
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
