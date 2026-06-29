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
import { IFormsData } from "@src/types/data";
import { cmsLocale } from "@src/utils/cmsLocale";

const buildUrl = (locale: ILocale["locale"], page: number) => {
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
  ]
    .filter(Boolean)
    .join("&");

  return `${CONFIG.api.cms}/api/oforms?${params}`;
};

const getExtForms = async (locale: ILocale["locale"]) => {
  const firstPage = await apiRequest<IFormsData>(buildUrl(locale, 1), {
    label: "getExtForms",
  });

  const pageCount = firstPage.meta.pagination?.pageCount ?? 1;

  if (pageCount <= 1) return firstPage;

  const restPages = await Promise.all(
    Array.from({ length: pageCount - 1 }, (_, i) =>
      apiRequest<IFormsData>(buildUrl(locale, i + 2), {
        label: `getExtForms (page ${i + 2})`,
      }),
    ),
  );

  const data = restPages.reduce(
    (acc, page) => acc.concat(page.data),
    [...firstPage.data],
  );

  return { data, meta: firstPage.meta };
};

export { getExtForms };
