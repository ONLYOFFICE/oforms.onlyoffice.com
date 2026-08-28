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

/**
 * Catalog filtering and sorting.
 *
 * Ported verbatim in behaviour from the site's
 * `src/components/templates/Main/Main.utils.ts` and `src/utils/helpers.ts`.
 * These encode product rules that are not obvious from the UI — keep them in
 * sync with the site rather than re-deriving them.
 */
import {
  ALLOWED_TYPES,
  type ICategoryTree,
  type ICountry,
  type IParentCategory,
  type IPurpose,
  type ISubcategoryCount,
  type ITemplate,
  type TAllowedTypes,
} from "../types";

export type TSortKey = "popular" | "asc" | "desc" | "name_asc" | "name_desc";

const SORT_MAP: Record<TSortKey, string> = {
  asc: "createdAt:desc",
  desc: "createdAt:asc",
  name_asc: "name_form:asc",
  name_desc: "name_form:desc",
  popular: "popular_template:desc",
};

export const SORT_KEYS = Object.keys(SORT_MAP) as TSortKey[];

// Built once — localeCompare constructs one per call.
const collator = new Intl.Collator(undefined, { sensitivity: "base" });

export const normalizeSortKey = (value: string | null | undefined): TSortKey =>
  value && value in SORT_MAP ? (value as TSortKey) : "asc";

export const getQueryValues = (value: string | null | undefined): string[] =>
  value ? value.split(",").filter(Boolean) : [];

export const sortForms = (
  forms: ITemplate[] | undefined,
  sort: TSortKey,
): ITemplate[] => {
  const [field, direction] = SORT_MAP[sort].split(":");
  const dir = direction === "desc" ? -1 : 1;

  return [...(forms ?? [])].sort((a, b) => {
    switch (field) {
      case "name_form":
        return dir * collator.compare(a.name_form, b.name_form);
      case "popular_template":
        return (
          dir *
          (Number(Boolean(a.popular_template)) -
            Number(Boolean(b.popular_template)))
        );
      case "createdAt":
      default:
        return (
          dir *
          (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
        );
    }
  });
};

interface IFormsFilters {
  type?: string[];
  country?: string[];
  purpose?: string[];
  subcategory?: string[];
}

export const getFilteredForms = (
  forms: ITemplate[] | undefined,
  filters: IFormsFilters,
): ITemplate[] => {
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
          sub.parent_categories?.some(
            (cat) => cat.purpose && purpose.includes(cat.purpose.key),
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

export const getFormsByTypes = (
  forms: ITemplate[] | undefined,
  types: string[],
): ITemplate[] => {
  if (!types.length) return forms ?? [];
  return (
    forms?.filter((form) =>
      form.form_exts?.some((item) => types.includes(item.ext)),
    ) ?? []
  );
};

export const groupFormsByExt = (
  forms: ITemplate[] | undefined,
): Record<TAllowedTypes, ITemplate[]> => {
  const groups = Object.fromEntries(
    ALLOWED_TYPES.map((ext) => [ext, [] as ITemplate[]]),
  ) as Record<TAllowedTypes, ITemplate[]>;

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

export const getCountries = (
  forms: ITemplate[] | undefined,
): (ICountry & { count: number })[] => {
  const countryMap = new Map<number, ICountry & { count: number }>();

  forms?.forEach((form) => {
    form.countries?.filter(Boolean).forEach((country) => {
      const existing = countryMap.get(country.id);
      if (existing) existing.count += 1;
      else countryMap.set(country.id, { ...country, count: 1 });
    });
  });

  return Array.from(countryMap.values()).sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
  );
};

export const getPurposes = (forms: ITemplate[] | undefined): IPurpose[] =>
  Array.from(
    new Map(
      (forms ?? [])
        .flatMap((form) =>
          form.subcategories.flatMap((sub) =>
            sub.parent_categories.map((cat) => cat.purpose),
          ),
        )
        .filter((purpose): purpose is IPurpose => Boolean(purpose))
        .map((purpose) => [purpose.id, purpose] as const),
    ).values(),
  ).sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
  );

/**
 * Flat category list for the filter drawer.
 *
 * The site groups categories under a purpose; this version filters by
 * subcategory only, so purposes are collapsed away and duplicates (a category
 * reachable from more than one purpose) are removed.
 */
export const getCategories = (
  forms: ITemplate[] | undefined,
): ICategoryTree[] => {
  const seen = new Map<number, ICategoryTree>();

  Object.values(getCategoriesByPurpose(forms))
    .flat()
    .forEach((entry) => {
      if (!seen.has(entry.category.id)) seen.set(entry.category.id, entry);
    });

  return Array.from(seen.values()).sort(
    (a, b) =>
      new Date(a.category.createdAt).getTime() -
      new Date(b.category.createdAt).getTime(),
  );
};

export const getCategoriesByPurpose = (
  forms: ITemplate[] | undefined,
): Record<string, ICategoryTree[]> => {
  const subcategoryCounts: Record<number, number> = {};
  forms?.forEach((form) => {
    const seen = new Set<number>();
    form.subcategories?.filter(Boolean).forEach((sub) => {
      if (seen.has(sub.id)) return;
      seen.add(sub.id);
      subcategoryCounts[sub.id] = (subcategoryCounts[sub.id] ?? 0) + 1;
    });
  });

  const purposeMap = new Map<
    string,
    {
      purpose: IPurpose;
      categories: Map<
        number,
        { category: IParentCategory; subcategories: Map<number, ISubcategoryCount> }
      >;
    }
  >();

  forms?.forEach((form) => {
    form.subcategories?.filter(Boolean).forEach((sub) => {
      sub.parent_categories?.filter(Boolean).forEach((category) => {
        const purpose = category.purpose;
        if (!purpose) return;

        if (!purposeMap.has(purpose.key)) {
          purposeMap.set(purpose.key, { purpose, categories: new Map() });
        }
        const purposeEntry = purposeMap.get(purpose.key)!;

        if (!purposeEntry.categories.has(category.id)) {
          purposeEntry.categories.set(category.id, {
            category,
            subcategories: new Map(),
          });
        }
        const categoryEntry = purposeEntry.categories.get(category.id)!;

        categoryEntry.subcategories.set(sub.id, {
          ...sub,
          count: subcategoryCounts[sub.id] ?? 0,
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
