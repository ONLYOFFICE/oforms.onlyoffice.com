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

import { ITemplateCard } from "@src/types/room";
import { TFormat } from "@src/types/data";

// data/, files/ and images/ are siblings in the bucket.
const ROOT =
  process.env.NEXT_PUBLIC_TEMPLATES_URL ||
  "https://static-oforms.onlyoffice.com";

const stemOf = (path: string) => path.slice(0, path.lastIndexOf("."));

export const catalogUrl = (locale: string) => `${ROOT}/data/${locale}.json`;

export const extOf = ({ path }: Pick<ITemplateCard, "path">) =>
  path.slice(path.lastIndexOf(".") + 1) as TFormat;

// Desktop picks the editor from everything after the URL's last dot.
export const fileUrl = (template: ITemplateCard) =>
  `${ROOT}/files/${template.path}?v=${template.version}.${extOf(template)}`;

export const fileName = (template: ITemplateCard) =>
  `${template.meta["card-title"]}.${extOf(template)}`;

export const cardUrl = ({ path, pages, version }: ITemplateCard) =>
  pages > 0 ? `${ROOT}/images/${stemOf(path)}.card.webp?v=${version}` : "";

export const pageUrls = ({ path, pages, version }: ITemplateCard) =>
  Array.from(
    { length: pages },
    (_, i) => `${ROOT}/images/${stemOf(path)}.page.${i + 1}.webp?v=${version}`,
  );
