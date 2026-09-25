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

import { IFormsData } from "@src/types/data";
import { ALLOWED_TYPES, TAllowedTypes } from "@src/utils/allowedTypes";
import { getSelectedCountries } from "@src/utils/localeCountry";
import { normalizeSearchQuery } from "@src/utils/searchQuery";
import {
  getTemplatesByExt,
  getPopularTemplates,
  normalizeSortKey,
  sortForms,
} from "@src/utils/helpers";
import {
  getCategoriesByPurpose,
  getCountries,
  getFilteredForms,
  getFormsInScope,
  getPurposes,
  getTemplatesByParentCategory,
  getTemplatesBySubcategories,
  groupFormsByExt,
} from "@src/components/templates/Main/Main.utils";
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

type TFormItem = IFormsData["data"][number];

const TYPE_SECTIONS: { ext: TAllowedTypes; labelKey: string }[] = [
  { ext: "docx", labelKey: "DocumentTemplates" },
  { ext: "xlsx", labelKey: "SpreadsheetTemplates" },
  { ext: "pptx", labelKey: "PresentationTemplates" },
  { ext: "pdf", labelKey: "PdfFormsTemplates" },
];

const CATEGORY_SECTIONS: string[] = [
  "contracts-legal",
  "finance",
  "sales-marketing",
];

const getAllowedTypes = (types: string[]): TAllowedTypes[] =>
  Array.from(new Set(types.map((item) => item.toLowerCase()))).filter(
    (item): item is TAllowedTypes =>
      ALLOWED_TYPES.includes(item as TAllowedTypes),
  );

const getAllowedSubcategories = (
  forms: TFormItem[] | undefined,
  subcategories: string[],
): string[] => {
  const available = new Set(
    forms?.flatMap(
      (form) =>
        form.subcategories?.filter(Boolean).map((sub) => sub.urlReq) ?? [],
    ),
  );

  return Array.from(
    new Set(subcategories.map((item) => item.toLowerCase())),
  ).filter((item) => available.has(item));
};

const getCountriesWithSelected = (
  forms: TFormItem[],
  sourceForms: TFormItem[] | undefined,
  selectedCountries: string[],
  countryNames?: Record<string, string>,
) => {
  const countries = getCountries(forms, countryNames);
  const missing = getCountries(sourceForms, countryNames)
    .filter(
      (country) =>
        selectedCountries.includes(country.code.toLowerCase()) &&
        !countries.some((item) => item.code === country.code),
    )
    .map((country) => ({ ...country, count: 0 }));

  return [...countries, ...missing].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
  );
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

const toCardView = (form: TFormItem): ICardView => ({
  id: form.id,
  name_form: form.name_form,
  description_card: form.description_card,
  url: form.url,
  preview: form.card_prewiew?.url ?? "",
  format: form.form_exts?.[0]?.ext ?? ALLOWED_TYPES[0],
});

export const buildFormNames = (
  allForms: TFormItem[] | undefined,
  locale: string,
  rawCountry: string[],
): TFormNames => {
  const country = getSelectedCountries(
    rawCountry,
    locale,
    getCountries(allForms).map((item) => item.code.toLowerCase()),
  );

  return getFilteredForms(getFormsInScope(allForms, locale, country), {
    country,
  }).map(({ id, name_form, url }) => ({ id, name_form, url }));
};

export const resolveMainFilters = (
  forms: TFormItem[] | undefined,
  raw: {
    locale: string;
    type: string[];
    country: string[];
    subcategory: string[];
    sort?: string | string[];
  },
): IMainViewFilters => {
  const type = getAllowedTypes(raw.type);
  const country = getSelectedCountries(
    raw.country,
    raw.locale,
    getCountries(forms).map((item) => item.code.toLowerCase()),
  );

  return {
    locale: raw.locale,
    type,
    country,
    subcategory: getAllowedSubcategories(forms, raw.subcategory),
    sort: normalizeSortKey(raw.sort),
  };
};

export const buildMainView = (
  allForms: TFormItem[] | undefined,
  filters: IMainViewFilters,
  countryNames?: Record<string, string>,
): IMainView => {
  const {
    locale,
    type: selectedTypes,
    country: selectedCountries,
    subcategory: selectedSubcategories,
  } = filters;

  const scopedForms = getFormsInScope(allForms, locale, selectedCountries);

  const formsForTypeFilter = getFilteredForms(scopedForms, {
    country: selectedCountries,
    subcategory: selectedSubcategories,
  });
  const formsForCountryFilter = getFilteredForms(allForms, {
    type: selectedTypes,
    subcategory: selectedSubcategories,
  });
  const formsForCategoryFilter = getFilteredForms(scopedForms, {
    type: selectedTypes,
    country: selectedCountries,
  });

  const filteredForms = sortForms(
    getFilteredForms(scopedForms, {
      type: selectedTypes,
      country: selectedCountries,
      subcategory: selectedSubcategories,
    }),
    filters.sort,
  );

  const categorySections: IMainSectionView[] =
    selectedTypes.length || selectedSubcategories.length
      ? []
      : CATEGORY_SECTIONS.map((urlReq) =>
          getTemplatesByParentCategory(filteredForms, urlReq),
        )
          .filter(
            (section): section is NonNullable<typeof section> =>
              section !== null && section.data.length > 0,
          )
          .map(({ category, data }) => ({
            key: `category-${category.id}`,
            label: category.name,
            href: category.urlReq,
            data: data.map(toCardView),
          }));

  const filterSections: IMainSectionView[] = selectedSubcategories.length
    ? getTemplatesBySubcategories(filteredForms, selectedSubcategories).map(
        ({ subcategory, data }) => ({
          key: `subcategory-${subcategory.id}`,
          label: subcategory.name,
          data: data.map(toCardView),
        }),
      )
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

  const categoriesByPurpose = getCategoriesByPurpose(formsForCategoryFilter, {
    forms: scopedForms,
    subcategories: selectedSubcategories,
  });

  return {
    docxForms: docxForms.length,
    xlsxForms: xlsxForms.length,
    pptxForms: pptxForms.length,
    pdfForms: pdfForms.length,
    countries: getCountriesWithSelected(
      formsForCountryFilter,
      allForms,
      selectedCountries,
      countryNames,
    ),
    purposes: getPurposes(allForms).filter(
      (purpose) => categoriesByPurpose[purpose.key]?.length,
    ),
    categoriesByPurpose,
    totalCount: filteredForms.length,
    popularTemplates: getPopularTemplates(filteredForms).map(toCardView),
    sections: [...categorySections, ...filterSections],
    isEmpty: filteredForms.length === 0,
  };
};

const isInCategory = (form: TFormItem, categoryUrlReq: string) =>
  form.subcategories?.some((sub) =>
    sub?.parent_categories?.some((cat) => cat?.urlReq === categoryUrlReq),
  );

export const resolveCategoryFilters = (
  allForms: TFormItem[] | undefined,
  categoryUrlReq: string,
  raw: {
    locale: string;
    type: string[];
    country: string[];
    sort?: string | string[];
  },
): IMainViewFilters => {
  const categoryForms = allForms?.filter((form) =>
    isInCategory(form, categoryUrlReq),
  );

  return {
    locale: raw.locale,
    type: getAllowedTypes(raw.type),
    country: getSelectedCountries(
      raw.country,
      raw.locale,
      getCountries(categoryForms).map((item) => item.code.toLowerCase()),
    ),
    subcategory: [],
    sort: normalizeSortKey(raw.sort),
  };
};

export const buildCategoryView = (
  allForms: TFormItem[] | undefined,
  categoryUrlReq: string,
  filters: IMainViewFilters,
  countryNames?: Record<string, string>,
): ICategoryView => {
  const {
    locale,
    type: selectedTypes,
    country: selectedCountries,
    sort,
  } = filters;

  const localeForms = getFormsInScope(
    allForms,
    locale,
    selectedCountries,
  ).filter((form) => isInCategory(form, categoryUrlReq));
  const scopedForms = getFilteredForms(localeForms, {
    country: selectedCountries,
  });

  const filteredForms = sortForms(
    getFilteredForms(scopedForms, { type: selectedTypes }),
    sort,
  );

  const subcategoryUrlReqs = Array.from(
    new Set(
      filteredForms.flatMap(
        (form) =>
          form.subcategories
            ?.filter((sub) =>
              sub?.parent_categories?.some(
                (cat) => cat?.urlReq === categoryUrlReq,
              ),
            )
            .map((sub) => sub.urlReq) ?? [],
      ),
    ),
  );

  const sections = getTemplatesBySubcategories(
    filteredForms,
    subcategoryUrlReqs,
  ).map(({ subcategory, data }) => ({
    key: `subcategory-${subcategory.id}`,
    label: subcategory.name,
    data: data.map(toCardView),
  }));

  const result = {
    categoryUrlReq,
    totalCount: filteredForms.length,
    popularTemplates: getPopularTemplates(filteredForms).map(toCardView),
    sections,
    isEmpty: sections.length === 0,
  };

  if (result.isEmpty) {
    return {
      ...result,
      ...pickSidebarFacets(
        buildMainView(allForms, { ...filters, subcategory: [] }, countryNames),
      ),
    };
  }

  const categoryForms = allForms?.filter((form) =>
    isInCategory(form, categoryUrlReq),
  );

  const {
    docx: docxForms,
    xlsx: xlsxForms,
    pptx: pptxForms,
    pdf: pdfForms,
  } = groupFormsByExt(scopedForms);

  const categoriesByPurpose = getCategoriesByPurpose(filteredForms);

  return {
    ...result,
    docxForms: docxForms.length,
    xlsxForms: xlsxForms.length,
    pptxForms: pptxForms.length,
    pdfForms: pdfForms.length,
    countries: getCountriesWithSelected(
      getFilteredForms(categoryForms, { type: selectedTypes }),
      categoryForms,
      selectedCountries,
      countryNames,
    ),
    purposes: getPurposes(allForms).filter(
      (purpose) => categoriesByPurpose[purpose.key]?.length,
    ),
    categoriesByPurpose,
  };
};

export const resolveSearchFilters = (
  allForms: TFormItem[] | undefined,
  raw: {
    locale: string;
    type: string[];
    country: string[];
    subcategory: string[];
    sort?: string | string[];
  },
): IMainViewFilters => ({
  locale: raw.locale,
  type: getAllowedTypes(raw.type),
  country: getSelectedCountries(
    raw.country,
    raw.locale,
    getCountries(allForms).map((item) => item.code.toLowerCase()),
  ),
  subcategory: getAllowedSubcategories(allForms, raw.subcategory),
  sort: normalizeSortKey(raw.sort),
});

const buildSearchFacets = (
  allForms: TFormItem[] | undefined,
  matchedForms: TFormItem[],
  scopedMatchedForms: TFormItem[],
  filters: IMainViewFilters,
  countryNames?: Record<string, string>,
) => {
  const {
    type: selectedTypes,
    country: selectedCountries,
    subcategory: selectedSubcategories,
  } = filters;

  const {
    docx: docxForms,
    xlsx: xlsxForms,
    pptx: pptxForms,
    pdf: pdfForms,
  } = groupFormsByExt(
    getFilteredForms(scopedMatchedForms, {
      country: selectedCountries,
      subcategory: selectedSubcategories,
    }),
  );

  const categoriesByPurpose = getCategoriesByPurpose(
    getFilteredForms(scopedMatchedForms, {
      type: selectedTypes,
      country: selectedCountries,
    }),
    { forms: scopedMatchedForms, subcategories: selectedSubcategories },
  );

  return {
    docxForms: docxForms.length,
    xlsxForms: xlsxForms.length,
    pptxForms: pptxForms.length,
    pdfForms: pdfForms.length,
    countries: getCountriesWithSelected(
      getFilteredForms(matchedForms, {
        type: selectedTypes,
        subcategory: selectedSubcategories,
      }),
      matchedForms,
      selectedCountries,
      countryNames,
    ),
    purposes: getPurposes(allForms).filter(
      (purpose) => categoriesByPurpose[purpose.key]?.length,
    ),
    categoriesByPurpose,
  };
};

export const buildSearchView = (
  allForms: TFormItem[] | undefined,
  searchQuery: string,
  filters: IMainViewFilters,
  countryNames?: Record<string, string>,
): ISearchView => {
  const {
    locale,
    type: selectedTypes,
    country: selectedCountries,
    subcategory: selectedSubcategories,
    sort,
  } = filters;

  const trimmedQuery = searchQuery.trim();
  const query = normalizeSearchQuery(trimmedQuery, locale);
  const matchedForms = query
    ? (allForms ?? []).filter((form) =>
        form.name_form.toLowerCase().includes(query),
      )
    : [];

  const scopedMatchedForms = getFormsInScope(
    matchedForms,
    locale,
    selectedCountries,
  );

  const foundForms = sortForms(
    getFilteredForms(scopedMatchedForms, {
      type: selectedTypes,
      country: selectedCountries,
      subcategory: selectedSubcategories,
    }),
    sort,
  );
  const isEmpty = foundForms.length === 0;
  const hasMatches = !isEmpty || scopedMatchedForms.length > 0;

  const result = {
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
    hasMatches,
  };

  if (!hasMatches) {
    return {
      ...result,
      ...pickSidebarFacets(buildMainView(allForms, filters, countryNames)),
    };
  }

  return {
    ...result,
    ...buildSearchFacets(
      allForms,
      matchedForms,
      scopedMatchedForms,
      filters,
      countryNames,
    ),
  };
};
