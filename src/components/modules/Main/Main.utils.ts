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

import { TTaxonomyRelation } from "@src/components/modules/Main/Main.types";
import {
  ICategoryItemData,
  ITypeWithSubCategoryFormsData,
  IFormsData,
} from "./Main.types";

const parseSelectedIds = (param: string | string[] | undefined) =>
  param
    ? String(param)
        .split(",")
        .map((v) => v.trim())
        .filter(Boolean)
    : [];

export const sumSelectedTaxonomyCount = (
  query: Record<string, string | string[] | undefined>,
  categories: ICategoryItemData<"categorie">,
  types: ICategoryItemData<"type">,
  compilations: ICategoryItemData<"compilation">,
) => {
  type TTaxonomyItem = {
    id: number;
    attributes: { oforms: { data: { attributes: { count: number } } } };
  };

  const sources: { param: string; data: TTaxonomyItem[] }[] = [
    { param: "categories", data: categories.data },
    { param: "types", data: types.data },
    { param: "compilations", data: compilations.data },
  ];

  return sources.reduce((total, { param, data }) => {
    const selectedIds = parseSelectedIds(query[param]);

    return (
      total +
      selectedIds.reduce((sum, id) => {
        const item = data.find((entry) => String(entry.id) === id);
        return sum + (item?.attributes.oforms.data.attributes.count ?? 0);
      }, 0)
    );
  }, 0);
};

export const getSubCategoryAttributes = (
  subCategoryForms: IFormsData | undefined,
) =>
  (
    subCategoryForms?.data[0] as
      | ITypeWithSubCategoryFormsData["data"][number]
      | undefined
  )?.attributes;

export const getActiveSubCategoryRelation = (
  subCategoryAttributes: ReturnType<typeof getSubCategoryAttributes>,
): TTaxonomyRelation | null =>
  subCategoryAttributes?.categories
    ? "categories"
    : subCategoryAttributes?.types
      ? "types"
      : subCategoryAttributes?.compilations
        ? "compilations"
        : null;

export const getActiveSubCategoryId = (
  query: Record<string, string | string[] | undefined>,
  activeSubCategoryRelation: TTaxonomyRelation | null,
) =>
  activeSubCategoryRelation
    ? parseSelectedIds(query[activeSubCategoryRelation])[0]
    : undefined;

export const getSelectedSubCategories = (
  query: Record<string, string | string[] | undefined>,
) =>
  (["categories", "types", "compilations"] as TTaxonomyRelation[]).flatMap(
    (relation) => {
      return parseSelectedIds(query[relation]).map((id) => {
        return {
          relation,
          id,
        };
      });
    },
  );
