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

import type { Locale } from "./locale";
import type { ICatalog, ITemplate } from "./types";

const DATA_URL = (process.env.EMBED_DATA_URL || "").replace(/\/$/, "");

// The English catalog is ~1.6 MB, so this is deliberately more generous than
// the 8s the old bundle used.
const FETCH_TIMEOUT_MS = 15000;

export const catalogUrl = (locale: Locale) => `${DATA_URL}/main.${locale}.json`;

/**
 * Fetches the catalog for one locale.
 *
 * No caching layer by design: only the active locale is ever requested, and
 * ordinary HTTP caching covers repeat loads.
 *
 * Throws on failure so the UI can show an explicit error state rather than an
 * empty grid that looks like "no templates".
 */
export async function loadCatalog(
  locale: Locale,
  signal?: AbortSignal,
): Promise<ICatalog> {
  if (!DATA_URL) throw new Error("EMBED_DATA_URL is not configured");

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
