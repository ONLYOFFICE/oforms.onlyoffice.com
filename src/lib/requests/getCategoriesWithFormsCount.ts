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
import { ILocale } from "@src/types/locale";
import { cmsLocale } from "@src/utils/cmsLocale";

interface ICategoryItem {
  id: number;
  attributes: {
    oforms?: {
      data?: {
        attributes?: {
          count?: number;
        };
      };
    };
    [key: string]: unknown;
  };
}

interface ICategoriesMeta {
  pagination?: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
}

interface ICategoriesResponse {
  data: ICategoryItem[];
  meta: ICategoriesMeta;
}

type TCollectionTypePlural = "categories" | "types" | "compilations";
type TCategoryFieldName = "categorie" | "type" | "compilation";
type TCategoryType = string | string[] | null | undefined;

const getCategoriesWithFormsCount = async (
  locale: ILocale["locale"],
  collectionTypePlural: TCollectionTypePlural,
  categoryFieldName: TCategoryFieldName,
  type: TCategoryType,
): Promise<ICategoriesResponse> => {
  const types: string[] = Array.isArray(type) ? type : type ? [type] : [];
  const typeFilters = types.map(
    (ext, i) => `filters[oforms][form_exts][ext][$in][${i}]=${ext}`,
  );
  const populateTypeFilters = types.map(
    (ext, i) => `populate[oforms][filters][form_exts][ext][$in][${i}]=${ext}`,
  );

  const params = [
    `locale=${cmsLocale(locale)}`,
    ...typeFilters,
    ...populateTypeFilters,
    typeFilters.length ? "sort[0]=createdAt:desc" : null,
    `fields[0]=${categoryFieldName}`,
    "populate[oforms][count]=true",
  ]
    .filter(Boolean)
    .join("&");

  const response = await apiRequest<ICategoriesResponse, ICategoriesResponse>(
    `${CONFIG.api.cms}/api/${collectionTypePlural}?${params}`,
    {
      label: "getCategoriesWithFormsCount",
      fallback: { data: [], meta: {} },
    },
  );

  if (Array.isArray(response?.data)) {
    response.data = response.data.filter(
      (item) => (item?.attributes?.oforms?.data?.attributes?.count ?? 0) > 0,
    );
  }

  return response;
};

export { getCategoriesWithFormsCount };
export type {
  ICategoryItem,
  ICategoriesMeta,
  ICategoriesResponse,
  TCollectionTypePlural,
  TCategoryFieldName,
  TCategoryType,
};
