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
import type {
  ICategoryCount,
  ICountry,
  IPurpose,
  ITemplate,
} from "../types";

export const getQueryValues = (value: string | null | undefined): string[] =>
  value ? value.split(",").filter(Boolean) : [];

/** The grid's only order. Call once on load — the filters below preserve it. */
export const sortByNewest = (forms: ITemplate[] | undefined): ITemplate[] =>
  [...(forms ?? [])].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

interface IFormsFilters {
  type?: string[];
  country?: string[];
  purpose?: string[];
  category?: string[];
}

export const getFilteredForms = (
  forms: ITemplate[] | undefined,
  filters: IFormsFilters,
): ITemplate[] => {
  const { type, country, purpose, category } = filters;

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
        category?.length &&
        !form.subcategories?.some((sub) =>
          sub.parent_categories?.some((cat) => category.includes(cat.urlReq)),
        )
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
 * Flat parent-category list for the filter drawer.
 *
 * The site nests purpose > category > subcategory; the drawer offers only the
 * 17 parent categories, so both the purpose grouping and the 53 subcategories
 * are collapsed away. A template counts once per category however many of its
 * subcategories lead there.
 */
export const getCategories = (
  forms: ITemplate[] | undefined,
): ICategoryCount[] => {
  const categoryMap = new Map<number, ICategoryCount>();

  forms?.forEach((form) => {
    const seen = new Set<number>();
    form.subcategories?.filter(Boolean).forEach((sub) => {
      sub.parent_categories?.filter(Boolean).forEach((category) => {
        if (seen.has(category.id)) return;
        seen.add(category.id);

        const existing = categoryMap.get(category.id);
        if (existing) existing.count += 1;
        else categoryMap.set(category.id, { ...category, count: 1 });
      });
    });
  });

  return Array.from(categoryMap.values()).sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
  );
};
