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

import CONFIG from "@src/config/config.json";
import { CMS_PAGE_SIZE, fetchAllPages } from "@src/lib/api/fetchAllPages";
import { cacheByLocale } from "@src/lib/api/cacheByLocale";
import { IFormsData } from "@src/types/data";
import { ILocale } from "@src/types/locale";
import { cmsLocale } from "@src/utils/cmsLocale";
import { languages } from "@src/config/languages";

const buildUrl = (locale: ILocale["locale"], page: number) => {
  const params = [
    `locale=${cmsLocale(locale)}`,
    `pagination[page]=${page}`,
    `pagination[pageSize]=${CMS_PAGE_SIZE}`,
    "sort[0]=createdAt:desc",
    "fields[0]=name_form",
    "fields[1]=description_card",
    "fields[2]=url",
    "fields[3]=popular_template",
    "fields[4]=createdAt",
    "fields[5]=updatedAt",
    "populate[card_prewiew][fields][0]=url",
    "populate[form_exts][fields][0]=ext",
    "populate[countries][fields][0]=name",
    "populate[countries][fields][1]=code",
    "populate[countries][fields][2]=createdAt",
    "populate[subcategories][fields][0]=name",
    "populate[subcategories][fields][1]=urlReq",
    "populate[subcategories][fields][2]=createdAt",
    "populate[subcategories][populate][parent_categories][fields][0]=name",
    "populate[subcategories][populate][parent_categories][fields][1]=urlReq",
    "populate[subcategories][populate][parent_categories][fields][2]=createdAt",
    "populate[subcategories][populate][parent_categories][populate][purpose][fields][0]=name",
    "populate[subcategories][populate][parent_categories][populate][purpose][fields][1]=key",
    "populate[subcategories][populate][parent_categories][populate][purpose][fields][2]=createdAt",
  ]
    .filter(Boolean)
    .join("&");

  return `${CONFIG.api.cms}/api/oforms?${params}`;
};

const fetchAllForms = (locale: ILocale["locale"]) =>
  fetchAllPages<IFormsData>((page) => buildUrl(locale, page), {
    label: "getAllForms",
  });

const getFormsByLocale = cacheByLocale(fetchAllForms);

const incompleteResults = new WeakSet<object>();

const buildAllLocales = async (locale: ILocale["locale"]) => {
  const locales = languages.map(({ shortKey }) => shortKey);
  const ordered = [locale, ...locales.filter((item) => item !== locale)];

  const settled = await Promise.allSettled(
    ordered.map((item) => getFormsByLocale(item)),
  );

  const current = settled[0];
  if (current.status === "rejected") throw current.reason;

  const results = settled.map((result, index) =>
    result.status === "fulfilled"
      ? {
          locale: ordered[index],
          data: result.value.data ?? [],
          meta: result.value.meta,
        }
      : { locale: ordered[index], data: [], meta: undefined },
  );
  const isIncomplete = settled.some((result) => result.status === "rejected");

  const localeNames = new Map<string, string>();
  const currentForms =
    results.find((result) => result.locale === locale)?.data ?? [];

  currentForms.forEach((form) => {
    form.subcategories?.filter(Boolean).forEach((sub) => {
      if (sub.urlReq && sub.name) localeNames.set(sub.urlReq, sub.name);
      sub.parent_categories?.filter(Boolean).forEach((category) => {
        if (category.urlReq && category.name) {
          localeNames.set(category.urlReq, category.name);
        }
        const purpose = category.purpose;
        if (purpose?.key && purpose.name) {
          localeNames.set(`purpose:${purpose.key}`, purpose.name);
        }
      });
    });
  });

  const translate = <T extends { urlReq?: string; name?: string }>(
    item: T,
  ): T =>
    item.urlReq && localeNames.has(item.urlReq)
      ? { ...item, name: localeNames.get(item.urlReq)! }
      : item;

  const seen = new Set<number>();
  const data = results.flatMap(({ locale: formLocale, data: forms }) =>
    forms
      .filter((form) => {
        if (seen.has(form.id)) return false;
        seen.add(form.id);
        return true;
      })
      .map((form) => {
        if (formLocale === locale) return { ...form, locale: formLocale };

        return {
          ...form,
          subcategories: (form.subcategories ?? [])
            .filter(Boolean)
            .map((sub) => ({
              ...translate(sub),
              parent_categories: (sub.parent_categories ?? [])
                .filter(Boolean)
                .map((category) => ({
                  ...translate(category),
                  purpose: category.purpose
                    ? {
                        ...category.purpose,
                        name:
                          localeNames.get(`purpose:${category.purpose.key}`) ??
                          category.purpose.name,
                      }
                    : category.purpose,
                })),
            })),
          locale: formLocale,
        };
      }),
  );

  const result = { data, meta: results[0]?.meta };

  if (isIncomplete) incompleteResults.add(result);

  return result;
};

const getAllFormsAllLocales = cacheByLocale(buildAllLocales, {
  shouldCache: (result) => !incompleteResults.has(result),
});

export { getAllFormsAllLocales, getFormsByLocale };
