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

// The order the UI presents types in.
export const TYPE_ORDER = ["docx", "xlsx", "pptx", "pdf"] as const;
export type TAllowedTypes = (typeof TYPE_ORDER)[number];

// Words, not extensions: these sit beside a "Create spreadsheet" button in the
// desktop shell, where "xlsx" would be a second name for the same thing.
export const TYPE_LABEL_KEYS: Record<TAllowedTypes, string> = {
  docx: "Documents",
  xlsx: "Spreadsheets",
  pptx: "Presentations",
  pdf: "PdfForms",
};

export const isAllowedType = (value: string): value is TAllowedTypes =>
  (TYPE_ORDER as readonly string[]).includes(value);

export const PURPOSE_ORDER = ["business", "personal"] as const;
export type TPurpose = (typeof PURPOSE_ORDER)[number];

// One purpose per category: 17 of 17 in the nine Strapi catalogs.
export const PURPOSE_BY_CATEGORY: Partial<Record<string, TPurpose>> = {
  "contracts-legal": "business",
  "events-holidays": "personal",
  "everyday-life": "personal",
  finance: "business",
  "forms-applications": "business",
  "gifts-achievements": "personal",
  "health-lifestyle": "personal",
  "home-education": "business",
  "hr-employment": "business",
  integrations: "business",
  leisure: "personal",
  "operations-management": "business",
  "organization-productivity": "personal",
  "personal-events": "personal",
  "real-estate": "business",
  "sales-marketing": "business",
  travel: "personal",
};

// One file of the DocSpace room, as sync-docspace.mjs writes data/<locale>.json.
export interface ITemplate {
  path: string;
  id: number;
  version: number;
  updated: string;
  // Bytes.
  size: number;
  pages: number;
  meta: {
    slug: string;
    category: string;
    "card-title": string;
    description: string;
    added: string;
    // Sheets of a spreadsheet, pages of the rest; `pages` counts preview images, which stop at 10.
    pages?: number;
  };
}

// `meta` is null when the strip failed; data.ts drops those.
export type IRoomRecord = Omit<ITemplate, "meta"> & {
  meta: ITemplate["meta"] | null;
};

export const extOf = ({ path }: ITemplate) =>
  path.slice(path.lastIndexOf(".") + 1) as TAllowedTypes;

export const purposeOf = ({ meta }: ITemplate) =>
  PURPOSE_BY_CATEGORY[meta.category] as TPurpose;
