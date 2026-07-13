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
import { cmsLocale } from "@src/utils/cmsLocale";

// Extended variant of getAllForms for the desktop/DocSpace embed: same catalog
// query, but additionally populates `file_oform` (the actual template files, so
// the embed can open them in the editor) and makes preview urls absolute.
// Keep the field/populate list in sync with embed/scripts/generate-data.mjs.
const CMS_ORIGIN = new URL(CONFIG.api.cms).origin;

const buildUrl = (locale: string, page: number) => {
  const params = [
    `locale=${cmsLocale(locale)}`,
    `pagination[page]=${page}`,
    "pagination[pageSize]=1000",
    "sort[0]=createdAt:desc",
    "fields[0]=name_form",
    "fields[1]=description_card",
    "fields[2]=url",
    "fields[3]=popular_template",
    "fields[4]=createdAt",
    "populate[card_prewiew][fields][0]=url",
    "populate[form_exts][fields][0]=ext",
    "populate[file_oform][fields][0]=name",
    "populate[file_oform][fields][1]=url",
    "populate[file_oform][fields][2]=size",
    "populate[file_oform][fields][3]=ext",
    "populate[countries][fields][0]=name",
    "populate[countries][fields][1]=code",
    "populate[countries][fields][2]=createdAt",
    "populate[subcategories][fields][0]=name",
    "populate[subcategories][fields][1]=urlReq",
    "populate[subcategories][fields][2]=createdAt",
    "populate[subcategories][populate][parent_categories][fields][0]=name",
    "populate[subcategories][populate][parent_categories][fields][1]=urlReq",
    "populate[subcategories][populate][parent_categories][fields][2]=createdAt",
    "populate[subcategories][populate][parent_categories][populate][purpose][fields][0]=name",
    "populate[subcategories][populate][parent_categories][populate][purpose][fields][1]=key",
    "populate[subcategories][populate][parent_categories][populate][purpose][fields][2]=createdAt",
  ].join("&");

  return `${CONFIG.api.cms}/api/oforms?${params}`;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const absolutizePreviews = (items: any[]) => {
  for (const item of items) {
    const url = item?.card_prewiew?.url;
    if (typeof url === "string" && url.startsWith("/")) {
      item.card_prewiew.url = CMS_ORIGIN + url;
    }
  }
  return items;
};

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

// The CMS can be transiently slow; retry a few times before giving up.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fetchPage = async (locale: string, page: number, attempt = 1): Promise<any> => {
  try {
    const res = await apiRequest(buildUrl(locale, page), {
      label: `getEmbedForms (${locale} p${page})`,
    });
    return await res.json();
  } catch (err) {
    if (attempt >= 4) throw err;
    await sleep(1500 * attempt);
    return fetchPage(locale, page, attempt + 1);
  }
};

export const getEmbedForms = async (locale: string) => {
  const first = await fetchPage(locale, 1);
  const pageCount = first.meta?.pagination?.pageCount ?? 1;

  let data = [...first.data];
  if (pageCount > 1) {
    const rest = await Promise.all(
      Array.from({ length: pageCount - 1 }, (_, i) => fetchPage(locale, i + 2)),
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data = rest.reduce((acc: any[], p) => acc.concat(p.data), data);
  }

  return { data: absolutizePreviews(data), meta: first.meta };
};
