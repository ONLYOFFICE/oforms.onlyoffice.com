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
import { languages } from "@src/config/languages";

const LOCALES = languages.map(({ shortKey }) => shortKey);

export const VIEW_CACHE_CONTROL =
  "public, s-maxage=600, stale-while-revalidate=3600";

export const getSingle = (value: NextApiRequest["query"][string]) =>
  (Array.isArray(value) ? value[0] : value) ?? "";

export const resolveLocale = (value: NextApiRequest["query"][string]) => {
  const raw = getSingle(value);
  return LOCALES.includes(raw) ? raw : "en";
};

export const clientIpOf = (req: NextApiRequest): string => {
  const forwarded = req.headers["x-forwarded-for"];
  const firstHop = (Array.isArray(forwarded) ? forwarded[0] : forwarded)
    ?.split(",")[0]
    ?.trim();

  return firstHop || req.socket.remoteAddress || "unknown";
};

export const isGetRequest = (
  req: NextApiRequest,
  res: NextApiResponse<{ error: string }>,
) => {
  if (req.method === "GET") return true;

  res.setHeader("Allow", "GET");
  res.status(405).json({ error: "Method not allowed" });
  return false;
};
