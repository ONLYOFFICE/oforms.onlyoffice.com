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
import { getSelectedCountries } from "@src/utils/localeCountry";
import { normalizeSearchQuery } from "@src/utils/searchQuery";
import { DEFAULT_PURPOSE_KEY, PURPOSE_BY_CATEGORY } from "@src/utils/purposes";
import { cardUrl, extOf } from "@src/utils/templateFiles";
import {
  getTemplatesByExt,
  getPopularTemplates,
  getSectionPopularTemplates,
  normalizeSortKey,
  sortForms,
} from "@src/utils/helpers";
import {
  getCategoriesByPurpose,
  getCountries,
  getFilteredForms,
  getFormsInScope,
  getPurposeKeys,
  getTemplatesByCategory,
  groupFormsByExt,
  resolvePurpose,
} from "@src/components/templates/Main/Main.utils";
import { ICategoryNode } from "@src/components/modules/Main/Main.types";
import { TCatalogItem } from "@src/types/room";
import {
  categoryName,
  collatorFor,
  countryName,
  purposeName,
} from "./catalogNames";
import {
  ICardView,
  ICategoryView,
  IMainFacets,
  IMainSectionView,
  IMainView,
  IMainViewFilters,
  ISearchView,
  TFormNames,
} from "./mainView.types";

const TYPE_SECTIONS: { ext: TAllowedTypes; labelKey: string }[] = [
  { ext: "docx", labelKey: "DocumentTemplates" },
  { ext: "xlsx", labelKey: "SpreadsheetTemplates" },
  { ext: "pptx", labelKey: "PresentationTemplates" },
  { ext: "pdf", labelKey: "PdfFormsTemplates" },
];

const CATEGORY_SECTIONS_LIMIT = 3;
const CATEGORY_SECTION_SIZE = 4;

const getAllowedTypes = (types: string[]): TAllowedTypes[] =>
  Array.from(new Set(types.map((item) => item.toLowerCase()))).filter(
    (item): item is TAllowedTypes =>
      ALLOWED_TYPES.includes(item as TAllowedTypes),
  );

const getAllowedCategories = (
  forms: TCatalogItem[],
  categories: string[],
): string[] => {
  const available = new Set(forms.map(({ meta }) => meta.category));

  return Array.from(
    new Set(categories.map((item) => item.toLowerCase())),
  ).filter((item) => available.has(item));
};

const getCountryCodes = (forms: TCatalogItem[]) =>
  getCountries(forms).map(({ code }) => code);

const categoryTree = (
  forms: TCatalogItem[],
  locale: string,
  keep?: { forms: TCatalogItem[]; categories: string[] },
) => {
  const collator = collatorFor(locale);

  return getCategoriesByPurpose(
    forms,
    (slug) => categoryName(locale, slug),
    (a, b) => collator.compare(a, b),
    keep,
  );
};

const getPurposeFacets = (
  allForms: TCatalogItem[],
  categoriesByPurpose: Record<string, ICategoryNode[]>,
  filters: IMainViewFilters,
  keepEmptyPurposes = true,
) => {
  const keys = getPurposeKeys(allForms).filter(
    (key) =>
      categoriesByPurpose[key]?.length ||
      (keepEmptyPurposes &&
        (key === filters.purpose || key === DEFAULT_PURPOSE_KEY)),
  );

  const selectedPurpose = resolvePurpose(keys, categoriesByPurpose, {
    purpose: filters.purpose,
    category: filters.category,
  });

  return {
    purposes: keys.map((key) => ({
      key,
      name: purposeName(filters.locale, key),
    })),
    selectedPurpose,
    categories: filters.category.filter(
      (category) =>
        !selectedPurpose || PURPOSE_BY_CATEGORY[category] === selectedPurpose,
    ),
  };
};

const toPurposeList = (purpose?: string): string[] =>
  purpose ? [purpose] : [];

const getCountriesWithSelected = (
  forms: TCatalogItem[],
  sourceForms: TCatalogItem[],
  selectedCountries: string[],
  locale: string,
) => {
  const countries = getCountries(forms);
  const missing = getCountries(sourceForms)
    .filter(
      ({ code }) =>
        selectedCountries.includes(code) &&
        !countries.some((item) => item.code === code),
    )
    .map((country) => ({ ...country, count: 0 }));

  return [...countries, ...missing].map(({ code, count }) => ({
    code,
    count,
    name: countryName(locale, code),
  }));
};

const pickSidebarFacets = ({
  docxForms,
  xlsxForms,
  pptxForms,
  pdfForms,
  countries,
  purposes,
  categoriesByPurpose,
}: IMainFacets) => ({
  docxForms,
  xlsxForms,
  pptxForms,
  pdfForms,
  countries,
  purposes,
  categoriesByPurpose,
});

const toCardView = (form: TCatalogItem): ICardView => ({
  id: form.id,
  name_form: form.meta["card-title"],
  description_card: form.meta["card-text"],
  url: form.meta.slug,
  preview: cardUrl(form),
  format: extOf(form),
  locale: form.locale,
});

export const buildFormNames = (
  allForms: TCatalogItem[],
  locale: string,
  rawCountry: string[],
): TFormNames => {
  const country = getSelectedCountries(
    rawCountry,
    locale,
    getCountryCodes(allForms),
  );

  return getFilteredForms(getFormsInScope(allForms, locale, country), {
    country,
  }).map((form) => ({
    id: form.id,
    name_form: form.meta["card-title"],
    url: form.meta.slug,
    locale: form.locale,
  }));
};

export const resolveMainFilters = (
  forms: TCatalogItem[],
  raw: {
    locale: string;
    type: string[];
    country: string[];
    category: string[];
    purpose?: string;
    sort?: string | string[];
  },
): IMainViewFilters => ({
  locale: raw.locale,
  type: getAllowedTypes(raw.type),
  country: getSelectedCountries(
    raw.country,
    raw.locale,
    getCountryCodes(forms),
  ),
  category: getAllowedCategories(forms, raw.category),
  purpose: raw.purpose || undefined,
  sort: normalizeSortKey(raw.sort),
});

export const buildMainView = (
  allForms: TCatalogItem[],
  filters: IMainViewFilters,
): IMainView => {
  const {
    locale,
    type: selectedTypes,
    country: selectedCountries,
    category: requestedCategories,
  } = filters;

  const scopedForms = getFormsInScope(allForms, locale, selectedCountries);

  const categoriesByPurpose = categoryTree(
    getFilteredForms(scopedForms, {
      type: selectedTypes,
      country: selectedCountries,
    }),
    locale,
    { forms: scopedForms, categories: requestedCategories },
  );

  const {
    purposes,
    selectedPurpose,
    categories: selectedCategories,
  } = getPurposeFacets(allForms, categoriesByPurpose, filters);
  const selectedPurposes = toPurposeList(selectedPurpose);

  const formsForTypeFilter = getFilteredForms(scopedForms, {
    country: selectedCountries,
    purpose: selectedPurposes,
    category: selectedCategories,
  });
  const formsForCountryFilter = getFilteredForms(allForms, {
    type: selectedTypes,
    purpose: selectedPurposes,
    category: selectedCategories,
  });

  const filteredForms = sortForms(
    getFilteredForms(scopedForms, {
      type: selectedTypes,
      country: selectedCountries,
      purpose: selectedPurposes,
      category: selectedCategories,
    }),
    filters.sort,
  );

  const purposeCategories = selectedPurpose
    ? (categoriesByPurpose[selectedPurpose] ?? [])
    : [];

  const categorySections: IMainSectionView[] =
    selectedTypes.length || selectedCategories.length || !selectedPurpose
      ? []
      : purposeCategories
          .map((node) => ({
            node,
            data: getTemplatesByCategory(
              filteredForms,
              node.urlReq,
              CATEGORY_SECTION_SIZE,
            ),
          }))
          .filter(({ data }) => data.length > 0)
          .slice(0, CATEGORY_SECTIONS_LIMIT)
          .map(({ node, data }) => ({
            key: `category-${node.urlReq}`,
            label: node.name,
            href: node.urlReq,
            data: data.map(toCardView),
          }));

  const filterSections: IMainSectionView[] = selectedCategories.length
    ? selectedCategories
        .map((category) => ({
          category,
          data: getTemplatesByCategory(filteredForms, category),
        }))
        .filter(({ data }) => data.length > 0)
        .map(({ category, data }) => ({
          key: `category-${category}`,
          label: categoryName(locale, category),
          data: data.map(toCardView),
        }))
    : TYPE_SECTIONS.filter((section) => selectedTypes.includes(section.ext))
        .map((section) => ({
          section,
          data: getTemplatesByExt(filteredForms, section.ext, Infinity),
        }))
        .filter(({ data }) => data.length > 0)
        .map(({ section, data }) => ({
          key: `ext-${section.ext}`,
          labelKey: section.labelKey,
          data: data.map(toCardView),
        }));

  const {
    docx: docxForms,
    xlsx: xlsxForms,
    pptx: pptxForms,
    pdf: pdfForms,
  } = groupFormsByExt(formsForTypeFilter);

  return {
    docxForms: docxForms.length,
    xlsxForms: xlsxForms.length,
    pptxForms: pptxForms.length,
    pdfForms: pdfForms.length,
    countries: getCountriesWithSelected(
      formsForCountryFilter,
      allForms,
      selectedCountries,
      locale,
    ),
    purposes,
    categoriesByPurpose,
    totalCount: filteredForms.length,
    popularTemplates: getSectionPopularTemplates(filteredForms).map(toCardView),
    sections: [...categorySections, ...filterSections],
    isEmpty: filteredForms.length === 0,
  };
};

export const resolveCategoryFilters = (
  allForms: TCatalogItem[],
  category: string,
  raw: {
    locale: string;
    type: string[];
    country: string[];
    sort?: string | string[];
  },
): IMainViewFilters => ({
  locale: raw.locale,
  type: getAllowedTypes(raw.type),
  country: getSelectedCountries(
    raw.country,
    raw.locale,
    getCountryCodes(allForms.filter(({ meta }) => meta.category === category)),
  ),
  category: [],
  sort: normalizeSortKey(raw.sort),
});

export const buildCategoryView = (
  allForms: TCatalogItem[],
  category: string,
  filters: IMainViewFilters,
): ICategoryView => {
  const { locale, type: selectedTypes, country: selectedCountries } = filters;

  const scopedForms = getFilteredForms(
    getFormsInScope(allForms, locale, selectedCountries),
    { country: selectedCountries, category: [category] },
  );
  const filteredForms = sortForms(
    getFilteredForms(scopedForms, { type: selectedTypes }),
    filters.sort,
  );
  const isEmpty = filteredForms.length === 0;

  return {
    categoryUrlReq: category,
    totalCount: filteredForms.length,
    popularTemplates: getSectionPopularTemplates(filteredForms).map(toCardView),
    sections: isEmpty
      ? []
      : [
          {
            key: `category-${category}`,
            label: categoryName(locale, category),
            data: filteredForms.map(toCardView),
          },
        ],
    isEmpty,
    ...pickSidebarFacets(
      buildMainView(
        allForms,
        isEmpty
          ? filters
          : {
              ...filters,
              category: [category],
              purpose: PURPOSE_BY_CATEGORY[category],
            },
      ),
    ),
  };
};

export const resolveSearchFilters = (
  allForms: TCatalogItem[],
  raw: {
    locale: string;
    type: string[];
    country: string[];
    category: string[];
    purpose?: string;
    sort?: string | string[];
  },
): IMainViewFilters => resolveMainFilters(allForms, raw);

const buildSearchFacets = (
  matchedForms: TCatalogItem[],
  scopedMatchedForms: TCatalogItem[],
  filters: IMainViewFilters,
  selectedPurposes: string[],
) => {
  const {
    locale,
    type: selectedTypes,
    country: selectedCountries,
    category: selectedCategories,
  } = filters;

  const {
    docx: docxForms,
    xlsx: xlsxForms,
    pptx: pptxForms,
    pdf: pdfForms,
  } = groupFormsByExt(
    getFilteredForms(scopedMatchedForms, {
      country: selectedCountries,
      purpose: selectedPurposes,
      category: selectedCategories,
    }),
  );

  return {
    docxForms: docxForms.length,
    xlsxForms: xlsxForms.length,
    pptxForms: pptxForms.length,
    pdfForms: pdfForms.length,
    countries: getCountriesWithSelected(
      getFilteredForms(matchedForms, {
        type: selectedTypes,
        purpose: selectedPurposes,
        category: selectedCategories,
      }),
      matchedForms,
      selectedCountries,
      locale,
    ),
  };
};

export const buildSearchView = (
  allForms: TCatalogItem[],
  searchQuery: string,
  filters: IMainViewFilters,
): ISearchView => {
  const {
    locale,
    type: selectedTypes,
    country: selectedCountries,
    category: requestedCategories,
    sort,
  } = filters;

  const trimmedQuery = searchQuery.trim();
  const query = normalizeSearchQuery(trimmedQuery, locale);
  const matchedForms = query
    ? allForms.filter((form) =>
        form.meta["card-title"].toLowerCase().includes(query),
      )
    : [];

  const scopedMatchedForms = getFormsInScope(
    matchedForms,
    locale,
    selectedCountries,
  );

  const categoriesByPurpose = categoryTree(
    getFilteredForms(scopedMatchedForms, {
      type: selectedTypes,
      country: selectedCountries,
    }),
    locale,
    { forms: scopedMatchedForms, categories: requestedCategories },
  );

  const {
    purposes,
    selectedPurpose,
    categories: selectedCategories,
  } = getPurposeFacets(allForms, categoriesByPurpose, filters, false);
  const selectedPurposes = toPurposeList(selectedPurpose);

  const foundForms = sortForms(
    getFilteredForms(scopedMatchedForms, {
      type: selectedTypes,
      country: selectedCountries,
      purpose: selectedPurposes,
      category: selectedCategories,
    }),
    sort,
  );
  const isEmpty = foundForms.length === 0;

  return {
    searchQuery: trimmedQuery,
    totalCount: foundForms.length,
    foundForms: foundForms.map(toCardView),
    popularTemplates: isEmpty
      ? getPopularTemplates(
          sortForms(
            getFilteredForms(
              getFormsInScope(allForms, locale, selectedCountries),
              { country: selectedCountries },
            ),
            sort,
          ),
        ).map(toCardView)
      : [],
    isEmpty,
    hasMatches: matchedForms.length > 0,
    ...buildSearchFacets(
      matchedForms,
      scopedMatchedForms,
      { ...filters, category: selectedCategories },
      selectedPurposes,
    ),
    purposes,
    categoriesByPurpose,
  };
};
