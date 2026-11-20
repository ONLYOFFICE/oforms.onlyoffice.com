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

import { ILocale } from "@src/types/locale";

type Locale = ILocale["locale"];

const CLEARERS_KEY = Symbol.for("oforms.localeCacheClearers");

const globalStore = globalThis as typeof globalThis & {
  [CLEARERS_KEY]?: Set<() => void>;
};

const clearers = (globalStore[CLEARERS_KEY] ??= new Set<() => void>());

const cacheByLocale = <A extends (string | undefined)[], T>(
  fetcher: (locale: Locale, ...args: A) => Promise<T>,
  { shouldCache }: { shouldCache?: (value: T) => boolean } = {},
): ((locale: Locale, ...args: A) => Promise<T>) => {
  const cache = new Map<string, Promise<T>>();

  clearers.add(() => cache.clear());

  return (locale: Locale, ...args: A) => {
    const key = JSON.stringify([locale, ...args]);

    const cached = cache.get(key);
    if (cached) return cached;

    const promise: Promise<T> = fetcher(locale, ...args).then(
      (value) => {
        if (shouldCache && !shouldCache(value) && cache.get(key) === promise) {
          cache.delete(key);
        }
        return value;
      },
      (error) => {
        if (cache.get(key) === promise) cache.delete(key);
        throw error;
      },
    );

    cache.set(key, promise);

    return promise;
  };
};

const clearLocaleCaches = () => {
  clearers.forEach((clear) => clear());
};

export { cacheByLocale, clearLocaleCaches };
