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

/**
 * Catalog filtering.
 *
 * Ported verbatim in behaviour from the site's
 * `src/components/templates/Main/Main.utils.ts` and `src/utils/helpers.ts`.
 * These encode product rules that are not obvious from the UI — keep them in
 * sync with the site rather than re-deriving them.
 */
import type { ICategoryCount, IPurpose, ITemplate } from "../types";

interface IFormsFilters {
  type?: string;
  purpose?: string;
  category?: string;
}

export const getFilteredForms = (
  forms: ITemplate[] | undefined,
  filters: IFormsFilters,
): ITemplate[] => {
  const { type, purpose, category } = filters;

  return (
    forms?.filter((form) => {
      if (type && !form.form_exts?.some((item) => item.ext === type)) {
        return false;
      }

      if (
        purpose &&
        !form.subcategories?.some((sub) =>
          sub.parent_categories?.some((cat) => cat.purpose?.key === purpose),
        )
      ) {
        return false;
      }

      if (
        category &&
        !form.subcategories?.some((sub) =>
          sub.parent_categories?.some((cat) => cat.urlReq === category),
        )
      ) {
        return false;
      }

      return true;
    }) ?? []
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
  );

/**
 * Flat parent-category list for the Category filter.
 *
 * The site nests purpose > category > subcategory; the filter offers only the
 * parent categories. A template counts once per category however many of its
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

  return Array.from(categoryMap.values());
};
