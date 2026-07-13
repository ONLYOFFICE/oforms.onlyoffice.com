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

import type { NextApiRequest, NextApiResponse } from "next";
import { getEmbedForms } from "@src/lib/requests/getEmbedForms";

// Catalog data for the desktop/DocSpace embed. Refreshed from the CMS at most
// once every 3 days (in-memory cache; the embed bundles a snapshot and swaps in
// this fresher copy in the background). CORS-open so the embed can fetch it.
const SUPPORTED = ["ar", "de", "en", "es", "fr", "it", "ja", "pt", "zh"];
const TTL_MS = 3 * 24 * 60 * 60 * 1000; // 3 days
const TTL_SEC = 3 * 24 * 60 * 60;

interface CacheEntry {
  ts: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
}
const cache: Record<string, CacheEntry> = {};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  if (req.method === "OPTIONS") {
    res.status(204).end();
    return;
  }

  const raw = String(req.query.locale ?? "en");
  const locale = SUPPORTED.includes(raw) ? raw : "en";

  try {
    const now = Date.now();
    const hit = cache[locale];
    if (!hit || now - hit.ts > TTL_MS) {
      cache[locale] = { ts: now, data: await getEmbedForms(locale) };
    }
    res.setHeader(
      "Cache-Control",
      `public, s-maxage=${TTL_SEC}, stale-while-revalidate=86400`,
    );
    res.status(200).json(cache[locale].data);
  } catch (err) {
    console.error("[api/embed-data]", locale, err);
    // Serve a stale copy if we have one; otherwise signal upstream failure.
    if (cache[locale]) {
      res.status(200).json(cache[locale].data);
    } else {
      res.status(502).json({ error: "cms_unavailable" });
    }
  }
}
