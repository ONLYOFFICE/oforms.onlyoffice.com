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

import { languages } from "@src/config/languages";
import { isRtlLocale } from "@src/utils/rtl";

const LANG_PENDING_ATTRIBUTE = "data-lang-pending";

const LANG_PENDING_TIMEOUT = 10000;

const LANG_PENDING_CONFIG = {
  locales: languages.map(({ shortKey }) => shortKey),
  defaultLocale: "en",
  excluded: ["searchresult", "editor", "404", "500"],
  rtl: languages
    .map(({ shortKey }) => shortKey)
    .filter((shortKey) => isRtlLocale(shortKey)),
};

export const LANG_PENDING_SCRIPT = `(function(){try{var c=${JSON.stringify(
  LANG_PENDING_CONFIG,
)},g=(new URLSearchParams(location.search).get("lang")||"").toLowerCase(),s=location.pathname.split("/").filter(Boolean),l=c.locales.indexOf(s[0])>-1?s.shift():c.defaultLocale;if(s.length===1&&c.excluded.indexOf(s[0])<0&&c.locales.indexOf(g)>-1&&g!==l){var d=document.documentElement;d.lang=g;d.dir=c.rtl.indexOf(g)>-1?"rtl":"ltr";d.setAttribute("${LANG_PENDING_ATTRIBUTE}","");setTimeout(function(){d.removeAttribute("${LANG_PENDING_ATTRIBUTE}")},${LANG_PENDING_TIMEOUT})}}catch(e){}})();`;

export const isLangPending = () =>
  document.documentElement.hasAttribute(LANG_PENDING_ATTRIBUTE);

export const clearLangPending = () =>
  document.documentElement.removeAttribute(LANG_PENDING_ATTRIBUTE);
