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

import { ALLOWED_TYPES } from "@src/utils/allowedTypes";
import { DEFAULT_SORT_KEY, SORT_KEYS } from "@src/utils/helpers";

const VIEW_PENDING_ATTRIBUTE = "data-view-pending";

const VIEW_PENDING_TIMEOUT = 10000;

const VIEW_PENDING_CONFIG = {
  types: ALLOWED_TYPES,
  sorts: SORT_KEYS.filter((key) => key !== DEFAULT_SORT_KEY),
  searchPath: "/searchresult",
};

export const VIEW_PENDING_SCRIPT = `(function(){try{var c=${JSON.stringify(
  VIEW_PENDING_CONFIG,
)},p=new URLSearchParams(location.search);function l(k){return p.getAll(k).join(",").split(",").filter(Boolean)}var s=location.pathname.replace(/\\/+$/,"");if(l("type").some(function(t){return c.types.indexOf(t.toLowerCase())>-1})||l("country").length||l("subcategory").length||c.sorts.indexOf((p.get("sort")||"").toLowerCase())>-1||(s.slice(-c.searchPath.length)===c.searchPath&&(p.get("query")||"").trim())){var d=document.documentElement;d.setAttribute("${VIEW_PENDING_ATTRIBUTE}","");setTimeout(function(){d.removeAttribute("${VIEW_PENDING_ATTRIBUTE}")},${VIEW_PENDING_TIMEOUT})}}catch(e){}})();`;

export const clearViewPending = () =>
  document.documentElement.removeAttribute(VIEW_PENDING_ATTRIBUTE);
