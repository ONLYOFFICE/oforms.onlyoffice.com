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

import CONFIG from "@src/config/config.json";
import { apiRequest } from "@src/lib/api/apiRequest";
import { cacheByLocale } from "@src/lib/api/cacheByLocale";
import { ILocale } from "@src/types/locale";
import { cmsLocale } from "@src/utils/cmsLocale";
import { languages } from "@src/config/languages";

type TFormWithSubcategories = {
  id: number;
  subcategories?: {
    name?: string;
    urlReq?: string;
    parent_categories?: {
      name?: string;
      urlReq?: string;
      purpose?: { key: string; name?: string };
    }[];
  }[];
};

const buildUrl = (locale: ILocale["locale"], page: number) => {
  const params = [
    `locale=${cmsLocale(locale)}`,
    `pagination[page]=${page}`,
    "pagination[pageSize]=1000",
    "sort[0]=createdAt:desc",
    "fields[0]=name_form",
    "fields[1]=description_card",
    "fields[2]=url",
    "fields[3]=popular_template",
    "fields[4]=createdAt",
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

const fetchAllForms = async (locale: ILocale["locale"]) => {
  const firstPageRes = await apiRequest(buildUrl(locale, 1), {
    label: "getAllForms",
  });
  const firstPage = await firstPageRes.json();

  const pageCount = firstPage.meta.pagination?.pageCount ?? 1;

  if (pageCount <= 1) return firstPage;

  const restPages = await Promise.all(
    Array.from({ length: pageCount - 1 }, async (_, i) => {
      const res = await apiRequest(buildUrl(locale, i + 2), {
        label: `getAllForms (page ${i + 2})`,
      });
      return await res.json();
    }),
  );

  const data = restPages.reduce(
    (acc, page) => acc.concat(page.data),
    [...firstPage.data],
  );

  return { data, meta: firstPage.meta };
};

const getFormsByLocale = cacheByLocale(fetchAllForms);

const buildAllLocales = async (locale: ILocale["locale"]) => {
  const locales = languages.map(({ shortKey }) => shortKey);
  const ordered = [locale, ...locales.filter((item) => item !== locale)];

  const results = await Promise.all(
    ordered.map(async (item) => {
      try {
        const forms = await getFormsByLocale(item);
        return { locale: item, data: forms.data ?? [], meta: forms.meta };
      } catch {
        return { locale: item, data: [], meta: undefined };
      }
    }),
  );

  const localeNames = new Map<string, string>();
  const currentForms =
    results.find((result) => result.locale === locale)?.data ?? [];

  currentForms.forEach((form: TFormWithSubcategories) => {
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
      .filter((form: { id: number }) => {
        if (seen.has(form.id)) return false;
        seen.add(form.id);
        return true;
      })
      .map((form: TFormWithSubcategories) => {
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

  return { data, meta: results[0]?.meta };
};

const getAllFormsAllLocales = cacheByLocale(buildAllLocales);

export { getAllFormsAllLocales, getFormsByLocale };
