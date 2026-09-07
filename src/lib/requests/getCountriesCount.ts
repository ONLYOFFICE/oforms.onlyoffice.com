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
import { getCountries, getCountryNames } from "@src/lib/requests/getCountries";
import { languages } from "@src/config/languages";
import { ILocale } from "@src/types/locale";
import { TAllowedTypes } from "@src/utils/allowedTypes";
import { cmsLocale } from "@src/utils/cmsLocale";

export interface ICountryCount {
  code: string;
  name: string;
  count: number;
  createdAt: string;
}

type TFormCountries = { countries?: { code?: string }[] };

const PAGE_SIZE = 1000;

const buildUrl = (
  locale: ILocale["locale"],
  page: number,
  ext?: TAllowedTypes,
  category?: string,
) =>
  `${CONFIG.api.cms}/api/oforms?${[
    `locale=${cmsLocale(locale)}`,
    ext ? `filters[form_exts][ext][$eq]=${ext}` : "",
    category
      ? `filters[subcategories][parent_categories][urlReq][$eq]=${category}`
      : "",
    `pagination[page]=${page}`,
    `pagination[pageSize]=${PAGE_SIZE}`,
    "fields[0]=id",
    "populate[countries][fields][0]=code",
  ]
    .filter(Boolean)
    .join("&")}`;

const buildLocaleCounts = async (
  locale: ILocale["locale"],
  ext?: TAllowedTypes,
  category?: string,
): Promise<Record<string, number>> => {
  const label = `getCountriesCount (${locale}${ext ? ` ${ext}` : ""}${
    category ? ` ${category}` : ""
  })`;

  const fetchPage = async (page: number) => {
    const res = await apiRequest(buildUrl(locale, page, ext, category), {
      label: `${label} page ${page}`,
    });

    return await res.json();
  };

  let forms: TFormCountries[] = [];

  try {
    const firstPage = await fetchPage(1);
    const pageCount = firstPage.meta?.pagination?.pageCount ?? 1;

    const restPages = await Promise.all(
      Array.from({ length: Math.max(pageCount - 1, 0) }, (_, index) =>
        fetchPage(index + 2),
      ),
    );

    forms = [firstPage, ...restPages].flatMap(
      (page) => (page.data ?? []) as TFormCountries[],
    );
  } catch {
    return {};
  }

  const counts: Record<string, number> = {};

  forms.forEach((form) => {
    const seen = new Set<string>();

    form.countries?.filter(Boolean).forEach((country) => {
      if (!country.code) return;

      const code = country.code.toLowerCase();
      if (seen.has(code)) return;

      seen.add(code);
      counts[code] = (counts[code] ?? 0) + 1;
    });
  });

  return counts;
};

const getLocaleCounts = cacheByLocale(buildLocaleCounts);

const getCountriesCount = async (
  locale: ILocale["locale"],
  ext?: TAllowedTypes,
  category?: string,
): Promise<ICountryCount[]> => {
  const locales = languages.map(({ shortKey }) => shortKey);

  const [countsByLocale, countries, countryNames] = await Promise.all([
    Promise.all(locales.map((item) => getLocaleCounts(item, ext, category))),
    getCountries(locale),
    getCountryNames(locale),
  ]);

  const createdAtByCode = new Map<string, string>(
    (countries.data ?? [])
      .filter((country: { code?: string }) => country?.code)
      .map((country: { code: string; createdAt?: string }) => [
        country.code.toLowerCase(),
        country.createdAt ?? "",
      ]),
  );

  const totals = new Map<string, number>();

  countsByLocale.forEach((counts) => {
    Object.entries(counts).forEach(([code, count]) => {
      totals.set(code, (totals.get(code) ?? 0) + count);
    });
  });

  return Array.from(totals.entries())
    .map(([code, count]) => ({
      code,
      name: countryNames[code] ?? code.toUpperCase(),
      count,
      createdAt: createdAtByCode.get(code) ?? "",
    }))
    .sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    );
};

export { getCountriesCount };
