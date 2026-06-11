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

import { apiRequest } from "@src/lib/api/apiRequest";
import CONFIG from "@src/config/config.json";
import { SORT_MAP, TSortKey } from "@src/utils/sortMap";
import { ILocale } from "@src/types/locale";
import { cmsLocale } from "@src/utils/cmsLocale";

type TRelation = "categories" | "types" | "compilations";
type TQueryValue = string | string[] | null | undefined;

const RELATION_FIELD_MAP: Record<TRelation, string> = {
  categories: "categorie",
  types: "type",
  compilations: "compilation",
};

const getTypeWithSubCategoryForms = async (
  locale: ILocale["locale"],
  relation: TRelation,
  typeQuery: TQueryValue,
  categoryQuery: string | null,
  sort: TSortKey,
  pageSize?: number,
  page?: number,
) => {
  const fieldName = RELATION_FIELD_MAP[relation];
  const toArray = (value: TQueryValue): string[] =>
    Array.isArray(value) ? value : value ? [value] : [];

  const types = toArray(typeQuery);

  const typeFilters = types.map(
    (ext, i) => `filters[form_exts][ext][$in][${i}]=${ext}`,
  );

  const params = [
    `locale=${cmsLocale(locale)}`,
    ...typeFilters,
    `filters[$or][0][${relation}][id][$in]=${categoryQuery}`,
    `populate[${relation}][filters][id][$in][0]=${categoryQuery}`,
    `populate[${relation}][fields][0]=${fieldName}`,
    `populate[${relation}][fields][1]=urlReq`,
    pageSize ? `pagination[pageSize]=${pageSize}` : null,
    page ? `pagination[page]=${page}` : null,
    `sort[0]=${SORT_MAP[sort] ?? "createdAt:desc"}`,
    "populate[card_prewiew][fields][0]=url",
    "populate[form_exts][fields][0]=ext",
    "fields[0]=name_form",
    "fields[1]=description_card",
    "fields[2]=url",
  ]
    .filter(Boolean)
    .join("&");

  return apiRequest(`${CONFIG.api.cms}/api/oforms?${params}`, {
    label: "getTypeWithSubCategoryForms",
    fallback: { data: [], meta: { pagination: { total: 0 } } },
  });
};

export { getTypeWithSubCategoryForms };
