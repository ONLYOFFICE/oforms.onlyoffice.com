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

import CONFIG from "@src/config/config.json";
import { apiRequest } from "@src/lib/api/apiRequest";
import { ILocale } from "@src/types/locale";
import { cmsLocale } from "@src/utils/cmsLocale";

const getForm = async (locale: ILocale["locale"], queryForm: string) => {
  const params = [
    `filters[url][$eq]=${encodeURIComponent(queryForm)}`,
    `locale=${encodeURIComponent(cmsLocale(locale))}`,
    "populate[card_prewiew][fields][0]=url",
    "populate[page_screens][fields][0]=url",
    "populate[form_exts][fields][0]=ext",
    "populate[file_oform][fields][0]=name",
    "populate[file_oform][fields][1]=size",
    "populate[file_oform][fields][2]=updatedAt",
    "populate[file_oform][fields][3]=url",
    "populate[file_oform][fields][4]=hash",
    "populate[subcategories][fields][0]=name",
    "populate[subcategories][fields][1]=urlReq",
    "populate[subcategories][populate][localizations][fields][0]=name",
    "populate[subcategories][populate][localizations][fields][1]=urlReq",
    "populate[subcategories][populate][localizations][fields][2]=locale",
    "populate[subcategories][populate][parent_categories][fields][0]=name",
    "populate[subcategories][populate][parent_categories][fields][1]=urlReq",
    "populate[subcategories][populate][parent_categories][populate][localizations][fields][0]=name",
    "populate[subcategories][populate][parent_categories][populate][localizations][fields][1]=urlReq",
    "populate[subcategories][populate][parent_categories][populate][localizations][fields][2]=locale",
    "populate[subcategories][populate][parent_categories][populate][localizations][populate][subcategories][fields][0]=urlReq",
    "populate[subcategories][populate][parent_categories][populate][localizations][populate][subcategories][fields][1]=createdAt",
    "populate[subcategories][populate][parent_categories][populate][localizations][populate][subcategories][populate][oforms][count]=true",
    "populate[subcategories][populate][parent_categories][populate][subcategories][fields][0]=urlReq",
    "populate[subcategories][populate][parent_categories][populate][subcategories][fields][1]=createdAt",
    "populate[subcategories][populate][parent_categories][populate][subcategories][populate][oforms][count]=true",
    "fields[0]=seo_title",
    "fields[1]=seo_description",
    "fields[2]=name_form",
    "fields[3]=description_card",
    "fields[4]=url",
    "fields[5]=template_desc",
    "fields[6]=template_desc_2",
    "fields[7]=file_pages",
  ]
    .filter(Boolean)
    .join("&");

  const res = await apiRequest(`${CONFIG.api.cms}/api/oforms?${params}`, {
    label: "getForm",
  });

  return await res.json();
};

export { getForm };
