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

// One file of the DocSpace room, as embed/scripts/sync-docspace.mjs writes data/<locale>.json.
export interface ITemplate {
  path: string;
  id: number;
  version: number;
  updated: string;
  // Bytes.
  size: number;
  // Preview images, which stop at 10.
  pages: number;
  meta: {
    slug: string;
    category: string;
    "card-title": string;
    "card-text": string;
    description: string;
    "seo-title": string;
    "seo-description": string;
    added: string;
    // Sheets of a spreadsheet, pages of the rest.
    pages?: number;
    popular?: string;
  };
}

// `meta` is null when the sync's strip failed.
export type IRoomRecord = Omit<ITemplate, "meta"> & {
  meta: ITemplate["meta"] | null;
};

// What a card needs, so a page does not carry the whole catalog's descriptions.
export type ITemplateCard = Pick<
  ITemplate,
  "path" | "id" | "version" | "pages"
> & {
  meta: Pick<ITemplate["meta"], "slug" | "card-title" | "card-text">;
};

export type { TFormat };

// A room record with the catalog it came from: other locales stand in for other countries.
export type TCatalogItem = ITemplate & { locale: string };
