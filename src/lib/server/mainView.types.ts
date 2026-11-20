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
  locale?: string;
}

export interface IMainSectionView {
  key: string;
  label?: string;
  labelKey?: string;
  href?: string;
  expanded?: boolean;
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
  purpose?: string;
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
