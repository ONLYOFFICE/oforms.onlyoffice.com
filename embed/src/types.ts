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

// Words, not extensions: these sit beside a "Create spreadsheet" button in the
// desktop shell, where "xlsx" would be a second name for the same thing.
export const TYPE_LABEL_KEYS: Record<TAllowedTypes, string> = {
  docx: "Documents",
  xlsx: "Spreadsheets",
  pptx: "Presentations",
  pdf: "PdfForms",
};

export const isAllowedType = (value: string): value is TAllowedTypes =>
  (ALLOWED_TYPES as readonly string[]).includes(value);

// Keys are the same in all 9 catalogs; only the names are localised. Fixed
// order because the CMS createdAt order differs per locale.
export const PURPOSE_ORDER = ["business", "personal"] as const;

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
  updatedAt?: string;
}

export interface ICardPreview {
  id?: number;
  url?: string;
}

export interface ITemplate {
  id: number;
  documentId?: string;
  name_form: string;
  template_desc: string;
  url: string;
  file_pages?: number;
  popular_template: boolean | null;
  createdAt: string;
  card_prewiew?: ICardPreview | null;
  form_exts: IFormExt[];
  file_oform?: IOformFile[];
  subcategories: ISubcategory[];
}

export interface ICatalog {
  data: ITemplate[];
  meta?: unknown;
}

/** A parent category plus how many templates currently fall under it. */
export interface ICategoryCount extends IParentCategory {
  count: number;
}
