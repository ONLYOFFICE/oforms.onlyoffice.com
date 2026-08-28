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

// Shape of the catalog JSON served from the CDN (main.<locale>.json).

// Kept in the site's original order — getTemplatesByExt sorts a template's
// form_exts by index into this array, so the order is load-bearing.
export const ALLOWED_TYPES = ["pptx", "docx", "pdf", "xlsx"] as const;
export type TAllowedTypes = (typeof ALLOWED_TYPES)[number];

// The order the UI presents types in (filters, sections). Separate from
// ALLOWED_TYPES on purpose — this one is purely presentational.
export const TYPE_ORDER: readonly TAllowedTypes[] = [
  "docx",
  "xlsx",
  "pptx",
  "pdf",
];

export const isAllowedType = (value: string): value is TAllowedTypes =>
  (ALLOWED_TYPES as readonly string[]).includes(value);

export interface IPurpose {
  id: number;
  documentId?: string;
  name: string;
  key: string;
  createdAt: string;
}

export interface IParentCategory {
  id: number;
  documentId?: string;
  name: string;
  urlReq: string;
  createdAt: string;
  purpose: IPurpose | null;
}

export interface ISubcategory {
  id: number;
  documentId?: string;
  name: string;
  urlReq: string;
  createdAt: string;
  parent_categories: IParentCategory[];
}

export interface ICountry {
  id: number;
  name: string;
  code: string;
  createdAt: string;
}

export interface IFormExt {
  id: number;
  ext: TAllowedTypes;
}

export interface IOformFile {
  id?: number;
  name?: string;
  url?: string;
  size?: number;
  ext?: string;
}

export interface ICardPreview {
  id?: number;
  url?: string;
}

export interface ITemplate {
  id: number;
  documentId?: string;
  name_form: string;
  description_card: string;
  url: string;
  popular_template: boolean | null;
  createdAt: string;
  card_prewiew?: ICardPreview | null;
  form_exts: IFormExt[];
  file_oform?: IOformFile[];
  countries?: ICountry[];
  subcategories: ISubcategory[];
}

export interface ICatalog {
  data: ITemplate[];
  meta?: unknown;
}

/** A subcategory plus how many templates currently fall under it. */
export interface ISubcategoryCount extends ISubcategory {
  count: number;
}

export interface ICategoryTree {
  category: IParentCategory;
  subcategories: ISubcategoryCount[];
}
