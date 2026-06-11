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
import { TSearchResult } from "@src/components/widgets/SearchInput/SearchInput.types";
import { ILocale } from "@src/types/locale";
import { SORT_MAP, TSortKey } from "@src/utils/sortMap";
import { cmsLocale } from "@src/utils/cmsLocale";

const getSearchResult = async (
  locale: ILocale["locale"],
  searchQuery: string,
  sort: TSortKey,
  pageSize?: number,
  page?: number,
): Promise<TSearchResult> => {
  const searchName =
    locale === "en" || locale === "fr" || locale === "pt"
      ? searchQuery?.toLowerCase() === "curriculum vitae" ||
        searchQuery?.toLowerCase() === "curriculum" ||
        searchQuery?.toLowerCase() === "vitae"
        ? "cv"
        : searchQuery
      : searchQuery;

  const params = [
    `locale=${cmsLocale(locale)}`,
    `filters[name_form][$containsi]=${encodeURIComponent(searchName)}`,
    pageSize ? `pagination[pageSize]=${pageSize}` : null,
    page ? `pagination[page]=${page}` : null,
    `sort[0]=${SORT_MAP[sort] ?? "createdAt:desc"}`,
    sort === "popular" ? "sort[1]=createdAt:desc" : null,
    "populate[card_prewiew][fields][0]=url",
    "populate[form_exts][fields][0]=ext",
    "fields[0]=name_form",
    "fields[1]=description_card",
    "fields[2]=url",
  ]
    .filter(Boolean)
    .join("&");

  return apiRequest(`${CONFIG.api.cms}/api/oforms?${params}`, {
    label: "getSearchResult",
    fallback: { data: [], meta: {} },
  });
};

export { getSearchResult };
