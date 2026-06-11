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

import {
  IFormsData,
  ITypeFormsCountData,
  ICategoryItemData,
} from "@src/components/modules/Main/Main.types";

interface ICategoryInfo<K extends string = "categorie"> {
  data: {
    id: number;
    attributes: {
      [P in K]: string;
    } & {
      header_description: string;
      seo_description: string;
      seo_title: string;
      urlReq: string;
    };
  }[];
  meta: {
    pagination: {
      page: number;
      pageCount: number;
      pageSize: number;
      total: number;
    };
  };
}

export interface ISubCategoryPage<K extends string = "categorie"> {
  popularForms: IFormsData;
  typeFormsCount: ITypeFormsCountData;
  categories: ICategoryItemData<"categorie">;
  types: ICategoryItemData<"type">;
  compilations: ICategoryItemData<"compilation">;
  categoryForms: IFormsData;
  categoryInfo: ICategoryInfo<K>;
}

export interface ISubCategoryTemplate extends Omit<
  ISubCategoryPage,
  "categoryInfo"
> {
  categoryId: number;
  categoryName: string;
  categoryRelation: "categories" | "types" | "compilations";
}
