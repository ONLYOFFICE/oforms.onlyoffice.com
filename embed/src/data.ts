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

import type { Locale } from "./locale";
import type { ICatalog, ITemplate } from "./types";

const DATA_URL = (process.env.EMBED_DATA_URL || "").replace(/\/$/, "");

// Baked in by vite.config.ts from the generated data-version.txt, so the catalog
// url is known without a request. The stamp is the whole cache key — the files
// themselves are served immutable.
const DATA_VERSION = process.env.EMBED_DATA_VERSION || "dev";

// The English catalog is ~1.6 MB, so this is deliberately more generous than
// the 8s the old bundle used.
const FETCH_TIMEOUT_MS = 15000;

const RETRIES = 2;

export const catalogUrl = (locale: Locale) =>
  `${DATA_URL}/main.${locale}.json?v=${DATA_VERSION}`;

const wait = (ms: number, signal?: AbortSignal) =>
  new Promise<void>((resolve, reject) => {
    const timer = setTimeout(resolve, ms);
    signal?.addEventListener(
      "abort",
      () => {
        clearTimeout(timer);
        reject(signal.reason);
      },
      { once: true },
    );
  });

/**
 * Fetches the catalog for one locale, retrying twice on failure.
 *
 * Only the active locale is ever requested, and the ?v= stamp lets the browser
 * cache it until the next deploy changes the stamp.
 *
 * Throws once the retries are spent, so the UI can show an explicit error
 * rather than an empty grid that looks like "no templates".
 */
export async function loadCatalog(
  locale: Locale,
  signal?: AbortSignal,
): Promise<ICatalog> {
  if (!DATA_URL) throw new Error("EMBED_DATA_URL is not configured");

  for (let attempt = 0; ; attempt++) {
    try {
      return await fetchCatalog(locale, signal);
    } catch (error) {
      // An abort means the caller moved on (locale switched, unmounted) —
      // that is not a failure worth retrying.
      if (signal?.aborted || attempt >= RETRIES) throw error;
      await wait(500 * (attempt + 1), signal);
    }
  }
}

async function fetchCatalog(
  locale: Locale,
  signal?: AbortSignal,
): Promise<ICatalog> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  const onAbort = () => controller.abort();
  signal?.addEventListener("abort", onAbort);

  try {
    const response = await fetch(catalogUrl(locale), {
      signal: controller.signal,
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const json = (await response.json()) as ICatalog;
    if (!Array.isArray(json?.data)) throw new Error("unexpected payload shape");

    return json;
  } finally {
    clearTimeout(timer);
    signal?.removeEventListener("abort", onAbort);
  }
}

/** Preview image for a card, or an empty string when the CMS has none. */
export const previewUrl = (template: ITemplate): string =>
  template.card_prewiew?.url ?? "";
