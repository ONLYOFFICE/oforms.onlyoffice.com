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

import { TFormat } from "@src/types/data";
import { TSortKey } from "@src/utils/helpers";
import {
  ICategoryTree,
  IPurposeNode,
} from "@src/components/modules/Main/Main.types";
import { ISearchInput } from "@src/components/modules/Main/sub-components/SearchInput/SearchInput.types";

export interface ICardView {
  id: number;
  name_form: string;
  description_card: string;
  url: string;
  preview: string;
  format: TFormat;
}

export interface IMainSectionView {
  key: string;
  label?: string;
  labelKey?: string;
  href?: string;
  data: ICardView[];
}

export type TFormNames = ISearchInput["formNames"];

export interface IMainFacets {
  docxForms: number;
  xlsxForms: number;
  pptxForms: number;
  pdfForms: number;
  countries: {
    name: string;
    code: string;
    count: number;
  }[];
  purposes: IPurposeNode[];
  categoriesByPurpose: Record<string, ICategoryTree[]>;
  totalCount: number;
  popularTemplates: ICardView[];
  isEmpty: boolean;
}

export interface IMainView extends IMainFacets {
  sections: IMainSectionView[];
}

export interface IMainViewFilters {
  locale: string;
  type: string[];
  country: string[];
  subcategory: string[];
  sort: TSortKey;
}

export interface ICategoryView extends IMainView {
  categoryUrlReq: string;
}

export interface ISearchView extends IMainFacets {
  searchQuery: string;
  foundForms: ICardView[];
  hasMatches: boolean;
}
