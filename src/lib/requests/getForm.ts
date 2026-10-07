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

import CONFIG from "@src/config/config.json";
import { apiRequest } from "@src/lib/api/apiRequest";
import { ILocale } from "@src/types/locale";
import { cmsLocale } from "@src/utils/cmsLocale";

const getForm = async (locale: ILocale["locale"], queryForm: string) => {
  const params = [
    `filters[url][$eq]=${queryForm}`,
    `locale=${cmsLocale(locale)}`,
    "populate[card_prewiew][fields][0]=url",
    "populate[page_screens][fields][0]=url",
    "populate[form_exts][fields][0]=ext",
    "populate[file_oform][fields][0]=name",
    "populate[file_oform][fields][1]=size",
    "populate[file_oform][fields][2]=updatedAt",
    "populate[file_oform][fields][3]=url",
    "populate[file_oform][fields][4]=hash",
    "populate[categories][fields][5]=categorie",
    "populate[categories][fields][6]=urlReq",
    "fields[0]=seo_title",
    "fields[1]=seo_description",
    "fields[2]=name_form",
    "fields[3]=description_card",
    "fields[4]=url",
    "fields[5]=template_desc",
    "fields[6]=file_pages",
  ]
    .filter(Boolean)
    .join("&");

  const res = await apiRequest(`${CONFIG.api.cms}/api/oforms?${params}`, {
    label: "getForm",
  });

  return await res.json();
};

export { getForm };
