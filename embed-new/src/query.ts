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

import { getQueryValues } from "./lib/filters";
import { normalizeLocale, type Locale } from "./locale";

export interface ICatalogQuery {
  q: string;
  types: string[];
  countries: string[];
  categories: string[];
  purposes: string[];
  page: number;
  locale: Locale;
}

const params = () => new URLSearchParams(window.location.search);

export function readQuery(): ICatalogQuery {
  const p = params();
  const page = Number.parseInt(p.get("page") ?? "1", 10);

  return {
    q: (p.get("q") ?? "").trim(),
    types: getQueryValues(p.get("type")),
    countries: getQueryValues(p.get("country")),
    categories: getQueryValues(p.get("category")),
    purposes: getQueryValues(p.get("purpose")),
    page: Number.isFinite(page) && page > 0 ? page : 1,
    locale: normalizeLocale(p.get("locale")),
  };
}

/**
 * Mirrors state back into the address bar with replaceState — no navigation.
 * Keeps params the host set (theme) untouched.
 */
export function writeQuery(query: ICatalogQuery): void {
  const next = params();

  const set = (key: string, value: string) => {
    if (value) next.set(key, value);
    else next.delete(key);
  };

  set("q", query.q);
  set("type", query.types.join(","));
  set("country", query.countries.join(","));
  set("category", query.categories.join(","));
  set("purpose", query.purposes.join(","));
  set("page", query.page > 1 ? String(query.page) : "");
  set("locale", query.locale);

  const search = next.toString();
  window.history.replaceState(
    window.history.state,
    "",
    window.location.pathname + (search ? `?${search}` : ""),
  );
}

/** One-shot boot params the host passes for correct first paint. */
export function readBootParams(): { theme: string | null } {
  const p = params();
  return { theme: p.get("theme") };
}

/** Chrome the host supplies itself, e.g. `?hide=lang,search`. */
export const readHidden = (): Set<string> =>
  new Set(getQueryValues(params().get("hide")));

/** Toggles a value in a list, returning a new list. */
export const toggleValue = (list: string[], value: string): string[] =>
  list.includes(value)
    ? list.filter((item) => item !== value)
    : [...list, value];
