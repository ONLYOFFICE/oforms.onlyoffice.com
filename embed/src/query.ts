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

import { readDesktopLang } from "./desktopVars";
import {
  isLocale,
  normalizeLocale,
  readStoredLang,
  type Locale,
} from "./locale";
import { PURPOSE_ORDER, TYPE_ORDER } from "./types";

const allowedOr = (
  value: string | null,
  allowed: readonly string[],
  fallback: string,
): string => (value && allowed.includes(value) ? value : fallback);

export interface ICatalogQuery {
  q: string;
  type: string;
  category: string;
  purpose: string;
  page: number;
  /** The page's language: UI strings, `lang`, `dir`. */
  locale: Locale;
  /** The catalog's language, `""` when it follows `locale`. */
  lang: Locale | "";
}

const params = () => new URLSearchParams(window.location.search);

export function readQuery(): ICatalogQuery {
  const p = params();
  const page = Number.parseInt(p.get("page") ?? "1", 10);
  const lang = p.get("lang");

  return {
    q: (p.get("q") ?? "").trim(),
    type: allowedOr(p.get("type"), TYPE_ORDER, TYPE_ORDER[0]),
    category: p.get("category") ?? "",
    purpose: allowedOr(p.get("purpose"), PURPOSE_ORDER, ""),
    page: Number.isFinite(page) && page > 0 ? page : 1,
    locale: normalizeLocale(p.get("locale") || readDesktopLang()),
    lang: isLocale(lang) ? lang : (readStoredLang() ?? ""),
  };
}

/**
 * Mirrors state back into the address bar with replaceState — no navigation.
 * Keeps params it does not own untouched.
 */
export function writeQuery(query: ICatalogQuery): void {
  const next = params();

  const set = (key: string, value: string) => {
    if (value) next.set(key, value);
    else next.delete(key);
  };

  set("q", query.q);
  set("type", query.type);
  set("category", query.category);
  set("purpose", query.purpose);
  set("page", query.page > 1 ? String(query.page) : "");
  set("locale", query.locale);
  set("lang", query.lang);

  const search = next.toString();
  window.history.replaceState(
    window.history.state,
    "",
    window.location.pathname + (search ? `?${search}` : ""),
  );
}
