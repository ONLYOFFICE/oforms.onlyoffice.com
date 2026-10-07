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

import type { NextApiRequest, NextApiResponse } from "next";
import { languages } from "@src/config/languages";
import { getAllFormUrls } from "@src/lib/requests/getAllFormUrls";
import { getCategoryUrls } from "@src/lib/requests/getCategoryUrls";
import { clearLocaleCaches } from "@src/lib/api/cacheByLocale";

const STATIC_PAGES = [
  "/",
  "/document-templates",
  "/presentation-templates",
  "/pdf-form-templates",
  "/spreadsheet-templates",
  "/searchresult",
];

const REVALIDATE_CONCURRENCY = 20;

let currentRevalidation: AbortController | null = null;

const withLocale = (locale: string, path: string) => {
  if (locale === "en") return path;

  return path === "/" ? `/${locale}` : `/${locale}${path}`;
};

const getLocalePaths = async (locale: string, signal: AbortSignal) => {
  const [forms, categories] = await Promise.all([
    getAllFormUrls(locale, signal),
    getCategoryUrls(locale, signal),
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
  signal: AbortSignal,
) => {
  const failed: string[] = [];

  for (let i = 0; i < paths.length; i += REVALIDATE_CONCURRENCY) {
    if (signal.aborted) break;

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

  res.status(202).json({ message: "Revalidation started" });

  currentRevalidation?.abort();
  clearLocaleCaches();

  const controller = new AbortController();
  currentRevalidation = controller;
  const { signal } = controller;

  try {
    const locales = languages.map((language) => language.shortKey);
    const pathsByLocale = await Promise.all(
      locales.map((locale) => getLocalePaths(locale, signal)),
    );
    const paths = [...new Set(pathsByLocale.flat())];

    const failed = await revalidateInBatches(
      paths,
      (path) => res.revalidate(path),
      signal,
    );

    if (failed.length > 0) {
      console.error(
        `[revalidate] failed to revalidate paths, failed: ${failed.length}, total: ${paths.length}`,
        failed,
      );
    } else {
      console.log("[revalidate] successfully revalidated");
    }
  } catch (error) {
    if (signal.aborted) return;

    const message = error instanceof Error ? error.message : String(error);
    console.error("[revalidate]", message);
  } finally {
    if (currentRevalidation === controller) currentRevalidation = null;
  }
}
