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

import { useRouter } from "next/router";
import {
  CATEGORY_PATHNAME,
  SEARCH_PATHNAME,
  resolveFilterTarget,
} from "@src/utils/filterNavigation";
import {
  clearFilters,
  ITemplateFilters,
  parseFilters,
  setFilterValue,
  TAllowedValues,
  TFilterKey,
  toggleFilterValue,
} from "@src/utils/queryFilters";

interface IUseTemplateFilters {
  filters: ITemplateFilters;
  toggle: (key: TFilterKey, value: string) => void;
  select: (key: TFilterKey, value: string) => void;
  setPurpose: (purpose: string) => void;
  clearAll: () => void;
  apply: (next: ITemplateFilters, options?: { toHome?: boolean }) => void;
}

export const useTemplateFilters = (
  allowed: TAllowedValues = {},
  { redirectToHome = false }: { redirectToHome?: boolean } = {},
): IUseTemplateFilters => {
  const router = useRouter();
  const isCategoryPage = router.pathname === CATEGORY_PATHNAME;
  const isSearchPage = router.pathname === SEARCH_PATHNAME;
  const parsed = parseFilters(router.query, allowed);
  const filters = isCategoryPage
    ? { ...parsed, category: [], purpose: undefined }
    : parsed;

  const navigate = (next: ITemplateFilters, toHome: boolean) => {
    const { pathname, query, shallow } = resolveFilterTarget(
      router.pathname,
      next,
      router.query,
      { toHome },
    );

    router.push({ pathname, query }, undefined, { scroll: false, shallow });
  };

  const apply = (
    next: ITemplateFilters,
    { toHome = false }: { toHome?: boolean } = {},
  ) =>
    navigate(
      next,
      toHome || redirectToHome || (isCategoryPage && next.category.length > 0),
    );

  return {
    filters,
    apply,
    toggle: (key, value) => apply(toggleFilterValue(filters, key, value)),
    select: (key, value) => apply(setFilterValue(filters, key, value)),
    setPurpose: (purpose) => navigate({ ...filters, purpose }, redirectToHome),
    clearAll: () =>
      navigate(
        clearFilters(filters),
        redirectToHome || isCategoryPage || isSearchPage,
      ),
  };
};
