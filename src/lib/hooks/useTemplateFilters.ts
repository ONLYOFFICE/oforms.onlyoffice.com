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

import { useRouter } from "next/router";
import {
  CATEGORY_PATHNAME,
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
  apply: (next: ITemplateFilters) => void;
}

export const useTemplateFilters = (
  allowed: TAllowedValues = {},
): IUseTemplateFilters => {
  const router = useRouter();
  const filters = parseFilters(router.query, allowed);
  const isCategoryPage = router.pathname === CATEGORY_PATHNAME;

  const navigate = (next: ITemplateFilters, toHome = false) => {
    const { pathname, query, shallow } = resolveFilterTarget(
      router.pathname,
      next,
      router.query,
      { toHome },
    );

    router.push({ pathname, query }, undefined, { scroll: false, shallow });
  };

  const apply = (next: ITemplateFilters) =>
    navigate(next, isCategoryPage && next.subcategory.length > 0);

  return {
    filters,
    apply,
    toggle: (key, value) => apply(toggleFilterValue(filters, key, value)),
    select: (key, value) => apply(setFilterValue(filters, key, value)),
    setPurpose: (purpose) => apply({ ...filters, purpose }),
    clearAll: () => navigate(clearFilters(filters), isCategoryPage),
  };
};
