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

import { ALLOWED_TYPES, TAllowedTypes } from "@src/utils/allowedTypes";
import { localeCountry } from "@src/utils/localeCountry";
import { extOf } from "@src/utils/templateFiles";
import {
  DEFAULT_PURPOSE_KEY,
  PURPOSE_BY_CATEGORY,
  PURPOSE_ORDER,
} from "@src/utils/purposes";
import { languages } from "@src/config/languages";
import { ICategoryNode } from "@src/components/modules/Main/Main.types";
import { TCatalogItem } from "@src/types/room";

type TFormsByExt = Record<TAllowedTypes, TCatalogItem[]>;

// Each catalog is one country's.
const countryOf = ({ locale }: TCatalogItem) => localeCountry(locale) ?? "";

const purposeOf = ({ meta }: TCatalogItem) =>
  PURPOSE_BY_CATEGORY[meta.category];

export const getTemplatesByCategory = (
  forms: TCatalogItem[],
  category: string,
  limit = Infinity,
): TCatalogItem[] =>
  forms.filter(({ meta }) => meta.category === category).slice(0, limit);

export const getFormsInScope = (
  forms: TCatalogItem[],
  locale: string,
  selectedCountries: string[],
): TCatalogItem[] =>
  selectedCountries.length
    ? forms
    : forms.filter((form) => form.locale === locale);

export const getPurposeKeys = (forms: TCatalogItem[]): string[] =>
  PURPOSE_ORDER.filter((key) => forms.some((form) => purposeOf(form) === key));

export const resolvePurpose = (
  purposeKeys: string[],
  categoriesByPurpose: Record<string, ICategoryNode[]>,
  { purpose, category = [] }: { purpose?: string; category?: string[] },
): string | undefined => {
  if (purpose && purposeKeys.includes(purpose)) return purpose;

  const categoryPurpose = category.length
    ? purposeKeys.find((key) =>
        categoriesByPurpose[key]?.some((node) =>
          category.includes(node.urlReq),
        ),
      )
    : undefined;

  return (
    categoryPurpose ??
    (purposeKeys.includes(DEFAULT_PURPOSE_KEY)
      ? DEFAULT_PURPOSE_KEY
      : purposeKeys[0])
  );
};

const COUNTRY_ORDER = languages.map(({ shortKey }) => localeCountry(shortKey));

export const getCountries = (
  forms: TCatalogItem[],
): { code: string; count: number }[] => {
  const counts = new Map<string, number>();
  forms.forEach((form) => {
    const code = countryOf(form);
    if (code) counts.set(code, (counts.get(code) ?? 0) + 1);
  });

  return [...counts]
    .sort(([a], [b]) => COUNTRY_ORDER.indexOf(a) - COUNTRY_ORDER.indexOf(b))
    .map(([code, count]) => ({ code, count }));
};

export const groupFormsByExt = (forms: TCatalogItem[]): TFormsByExt => {
  const groups = Object.fromEntries(
    ALLOWED_TYPES.map((ext) => [ext, []]),
  ) as unknown as TFormsByExt;

  forms.forEach((form) => groups[extOf(form)]?.push(form));

  return groups;
};

interface IFormsFilters {
  type?: string[];
  country?: string[];
  purpose?: string[];
  category?: string[];
}

export const getFilteredForms = (
  forms: TCatalogItem[],
  { type, country, purpose, category }: IFormsFilters,
): TCatalogItem[] =>
  forms.filter(
    (form) =>
      (!type?.length || type.includes(extOf(form))) &&
      (!country?.length || country.includes(countryOf(form))) &&
      (!purpose?.length || purpose.includes(purposeOf(form) ?? "")) &&
      (!category?.length || category.includes(form.meta.category)),
  );

// Categories with their template counts, per purpose, in the order `compare` gives
// their names. A kept category stays listed at 0, so a selected one never vanishes.
export const getCategoriesByPurpose = (
  forms: TCatalogItem[],
  nameOf: (slug: string) => string,
  compare: (a: string, b: string) => number,
  keep?: { forms: TCatalogItem[]; categories: string[] },
): Record<string, ICategoryNode[]> => {
  const counts = new Map<string, number>();
  forms.forEach(({ meta }) =>
    counts.set(meta.category, (counts.get(meta.category) ?? 0) + 1),
  );
  keep?.forms.forEach(({ meta }) => {
    if (keep.categories.includes(meta.category) && !counts.has(meta.category)) {
      counts.set(meta.category, 0);
    }
  });

  const result: Record<string, ICategoryNode[]> = {};
  counts.forEach((count, urlReq) => {
    const purpose = PURPOSE_BY_CATEGORY[urlReq];
    if (!purpose) return;
    (result[purpose] ??= []).push({ name: nameOf(urlReq), urlReq, count });
  });
  Object.values(result).forEach((nodes) =>
    nodes.sort((a, b) => compare(a.name, b.name)),
  );

  return result;
};
