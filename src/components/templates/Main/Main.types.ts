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
  TExt,
  IFormsData,
  ITypeFormsCountData,
  ICategoryItemData,
} from "@src/components/modules/Main/Main.types";
import { TCardFormat } from "@src/components/widgets/Card/Card.types";

export const EXT_ORDER: TExt[] = ["docx", "xlsx", "pptx", "pdf"];

interface ISubCategoryFormsData {
  data: {
    id: number;
    attributes: {
      categorie: string;
      urlReq: string;
      oforms: {
        data: {
          id: number;
          attributes: {
            name_form: string;
            description_card: string;
            url: string;
            createdAt: string;
            card_prewiew: {
              data: {
                id: number;
                attributes: {
                  url: string;
                };
              };
            };
            form_exts: {
              data: {
                id: number;
                attributes: {
                  ext: TCardFormat;
                };
              }[];
            };
          };
        }[];
      };
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

export interface ITypeWithSubCategoryFormsData {
  data: {
    id: number;
    attributes: {
      name_form: string;
      description_card: string;
      url: string;
      createdAt?: string;
      card_prewiew: {
        data: {
          id: number;
          attributes: {
            url: string;
          };
        };
      };
      form_exts: {
        data: {
          id: number;
          attributes: {
            ext: TCardFormat;
          };
        }[];
      };
    } & {
      categories?: {
        data: {
          id: number;
          attributes: { categorie: string; urlReq: string };
        }[];
      };
      types?: {
        data: {
          id: number;
          attributes: { type: string; urlReq: string };
        }[];
      };
      compilations?: {
        data: {
          id: number;
          attributes: { compilation: string; urlReq: string };
        }[];
      };
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

export interface IMainTemplate {
  popularForms: IFormsData;
  typeFormsCount: ITypeFormsCountData;
  categories: ICategoryItemData<"categorie">;
  types: ICategoryItemData<"type">;
  compilations: ICategoryItemData<"compilation">;
  salesTemplates: ISubCategoryFormsData;
  docxForms: IFormsData;
  pdfForms: IFormsData;
  xlsxForms: IFormsData;
  pptxForms: IFormsData;
  subCategoryForms: IFormsData;
  typeWithSubCategoryForms: ITypeWithSubCategoryFormsData;
}
