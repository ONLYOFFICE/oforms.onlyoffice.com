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
import { getAllFormUrls } from "@src/lib/requests/getAllFormUrls";
import { getCategoryUrls } from "@src/lib/requests/getCategoryUrls";

const STATIC_PAGES = [
  "/",
  "/document-templates",
  "/presentation-templates",
  "/pdf-form-templates",
  "/spreadsheet-templates",
  "/searchresult",
];

const REVALIDATE_CONCURRENCY = 20;

const withLocale = (locale: string, path: string) => {
  if (locale === "en") return path;

  return path === "/" ? `/${locale}` : `/${locale}${path}`;
};

const getLocalePaths = async (locale: string) => {
  const [forms, categories] = await Promise.all([
    getAllFormUrls(locale),
    getCategoryUrls(locale),
  ]);

  const dynamicPaths = [
    ...forms.data
      .filter((form) => typeof form.url === "string" && form.url.length > 0)
      .map((form) => `/${form.url}`),
    ...categories.data
      .filter(
        (category) =>
          typeof category.urlReq === "string" && category.urlReq.length > 0,
      )
      .map((category) => `/${category.urlReq}`),
  ];

  return [...STATIC_PAGES, ...dynamicPaths].map((path) =>
    withLocale(locale, path),
  );
};

const revalidateInBatches = async (
  paths: string[],
  revalidate: (path: string) => Promise<void>,
) => {
  const failed: string[] = [];

  for (let i = 0; i < paths.length; i += REVALIDATE_CONCURRENCY) {
    const batch = paths.slice(i, i + REVALIDATE_CONCURRENCY);
    const results = await Promise.allSettled(batch.map(revalidate));

    results.forEach((result, index) => {
      if (result.status === "rejected") failed.push(batch[index]);
    });
  }

  return failed;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (
    req.headers["authorization"] !==
    `Bearer ${process.env.REVALIDATE_AUTHORIZATION_TOKEN}`
  ) {
    return res.status(401).json({ message: "Invalid token" });
  }

  try {
    const locales = languages.map((language) => language.shortKey);
    const pathsByLocale = await Promise.all(locales.map(getLocalePaths));
    const paths = [...new Set(pathsByLocale.flat())];

    const failed = await revalidateInBatches(paths, (path) =>
      res.revalidate(path),
    );

    return res.status(200).json({
      revalidated: paths.length - failed.length,
      total: paths.length,
      failed,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return res.status(500).json({ error: message });
  }
}
