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
import {
  ICategoryTree,
  IPurposeCategories,
} from "@src/components/modules/Main/Main.types";

type TFormItem = IFormsData["data"][number];
type TSubcategory = TFormItem["subcategories"][number];
type TFormsByExt = Record<TAllowedTypes, TFormItem[]>;
type TPurpose =
  TFormItem["subcategories"][number]["parent_categories"][number]["purpose"];
type TCountry = TFormItem["countries"][number];

interface ISubcategorySection {
  subcategory: TSubcategory;
  data: TFormItem[];
}

interface ICategorySection {
  category: TFormItem["subcategories"][number]["parent_categories"][number];
  data: TFormItem[];
}

export const getTemplatesBySubcategories = (
  forms: TFormItem[] | undefined,
  urlReqs: string[],
  limit = Infinity,
): ISubcategorySection[] =>
  urlReqs
    .map((urlReq) => {
      const data: TFormItem[] = [];
      let subcategory: TSubcategory | undefined;

      forms?.forEach((form) => {
        const matched = form.subcategories?.find(
          (sub) => sub.urlReq === urlReq,
        );
        if (!matched) return;
        subcategory = subcategory ?? matched;
        data.push(form);
      });

      if (!subcategory) return null;
      return { subcategory, data: data.slice(0, limit) };
    })
    .filter((section): section is ISubcategorySection => section !== null);

export const getTemplatesByParentCategory = (
  forms: TFormItem[] | undefined,
  parentUrlReq: string,
  limit = 4,
): ICategorySection | null => {
  let category: ICategorySection["category"] | undefined;

  const buckets = new Map<number, { forms: TFormItem[]; seen: Set<number> }>();

  forms?.forEach((form) => {
    form.subcategories?.filter(Boolean).forEach((sub) => {
      const matched = sub.parent_categories?.find(
        (cat) => cat.urlReq === parentUrlReq,
      );
      if (!matched) return;
      category = category ?? matched;

      const bucket = buckets.get(sub.id) ?? {
        forms: [],
        seen: new Set<number>(),
      };
      if (!bucket.seen.has(form.id)) {
        bucket.seen.add(form.id);
        bucket.forms.push(form);
      }
      buckets.set(sub.id, bucket);
    });
  });

  if (!category) return null;

  const queues = Array.from(buckets.values())
    .map((bucket) => bucket.forms)
    .filter((forms) => forms.length > 0);

  const data: TFormItem[] = [];
  const usedFormIds = new Set<number>();

  while (data.length < limit) {
    let progressed = false;

    for (const queue of queues) {
      if (data.length >= limit) break;
      const next = queue.find((form) => !usedFormIds.has(form.id));
      if (!next) continue;
      usedFormIds.add(next.id);
      data.push(next);
      progressed = true;
    }

    if (!progressed) break;
  }

  return { category, data };
};

export const getFormsInScope = (
  forms: TFormItem[] | undefined,
  locale: string,
  selectedCountries: string[],
): TFormItem[] => {
  if (selectedCountries.length) return forms ?? [];
  return forms?.filter((form) => !form.locale || form.locale === locale) ?? [];
};

export const getPurposes = (forms: TFormItem[] | undefined): TPurpose[] => {
  const purposeMap = new Map<string, TPurpose>();

  forms?.forEach((form) => {
    form.subcategories?.filter(Boolean).forEach((sub) => {
      sub.parent_categories?.filter(Boolean).forEach((cat) => {
        const purpose = cat.purpose;
        if (!purpose?.key || purposeMap.has(purpose.key)) return;
        purposeMap.set(purpose.key, purpose);
      });
    });
  });

  return Array.from(purposeMap.values()).sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
  );
};

export const getCountries = (
  forms: TFormItem[] | undefined,
  countryNames?: Record<string, string>,
): (TCountry & { count: number })[] => {
  const countryMap = new Map<string, TCountry & { count: number }>();

  forms?.forEach((form) => {
    form.countries?.filter(Boolean).forEach((country) => {
      const code = country.code.toLowerCase();
      const existing = countryMap.get(code);

      if (existing) {
        existing.count += 1;
      } else {
        countryMap.set(code, { ...country, count: 1 });
      }
    });
  });

  return Array.from(countryMap.values())
    .map((country) => ({
      ...country,
      name: countryNames?.[country.code.toLowerCase()] ?? country.name,
    }))
    .sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    );
};

export const groupFormsByExt = (
  forms: TFormItem[] | undefined,
): TFormsByExt => {
  const groups: TFormsByExt = Object.fromEntries(
    ALLOWED_TYPES.map((ext) => [ext, []]),
  ) as TFormsByExt;

  forms?.forEach((form) => {
    const seen = new Set<TAllowedTypes>();
    form.form_exts?.forEach(({ ext }) => {
      if (groups[ext] && !seen.has(ext)) {
        seen.add(ext);
        groups[ext].push(form);
      }
    });
  });

  return groups;
};

interface IFormsFilters {
  type?: string[];
  country?: string[];
  purpose?: string[];
  subcategory?: string[];
}

export const getFilteredForms = (
  forms: TFormItem[] | undefined,
  filters: IFormsFilters,
): TFormItem[] => {
  const { type, country, purpose, subcategory } = filters;

  return (
    forms?.filter((form) => {
      if (
        type?.length &&
        !form.form_exts?.some((item) => type.includes(item.ext))
      ) {
        return false;
      }

      if (
        country?.length &&
        !form.countries?.some((item) =>
          country.includes(item.code.toLowerCase()),
        )
      ) {
        return false;
      }

      if (
        purpose?.length &&
        !form.subcategories?.some((sub) =>
          sub.parent_categories?.some((cat) =>
            purpose.includes(cat.purpose?.key),
          ),
        )
      ) {
        return false;
      }

      if (
        subcategory?.length &&
        !form.subcategories?.some((sub) => subcategory.includes(sub.urlReq))
      ) {
        return false;
      }

      return true;
    }) ?? []
  );
};

export const getFilteredCount = (
  forms: TFormItem[] | undefined,
  filters: IFormsFilters,
): number => getFilteredForms(forms, filters).length;

export const getCategoriesByPurpose = (
  forms: TFormItem[] | undefined,
): Record<string, ICategoryTree[]> => {
  const subcategoryCounts: Record<string, number> = {};
  forms?.forEach((form) => {
    const seen = new Set<string>();
    form.subcategories?.filter(Boolean).forEach((sub) => {
      if (seen.has(sub.urlReq)) return;
      seen.add(sub.urlReq);
      subcategoryCounts[sub.urlReq] = (subcategoryCounts[sub.urlReq] ?? 0) + 1;
    });
  });

  const purposeMap = new Map<string, IPurposeCategories>();
  forms?.forEach((form) => {
    form.subcategories?.filter(Boolean).forEach((sub) => {
      sub.parent_categories?.filter(Boolean).forEach((category) => {
        const purpose = category.purpose;
        if (!purpose) return;

        if (!purposeMap.has(purpose.key)) {
          purposeMap.set(purpose.key, { purpose, categories: new Map() });
        }
        const purposeEntry = purposeMap.get(purpose.key)!;

        if (!purposeEntry.categories.has(category.urlReq)) {
          purposeEntry.categories.set(category.urlReq, {
            category,
            subcategories: new Map(),
          });
        }
        const categoryEntry = purposeEntry.categories.get(category.urlReq)!;

        categoryEntry.subcategories.set(sub.urlReq, {
          ...sub,
          count: subcategoryCounts[sub.urlReq] ?? 0,
        });
      });
    });
  });

  const result: Record<string, ICategoryTree[]> = {};
  purposeMap.forEach(({ purpose, categories }) => {
    result[purpose.key] = Array.from(categories.values())
      .map(({ category, subcategories }) => ({
        category,
        subcategories: Array.from(subcategories.values()).sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
        ),
      }))
      .sort(
        (a, b) =>
          new Date(a.category.createdAt).getTime() -
          new Date(b.category.createdAt).getTime(),
      );
  });

  return result;
};
