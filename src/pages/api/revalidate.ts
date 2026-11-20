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
import { readdir, rm } from "fs/promises";
import path from "path";
import { languages } from "@src/config/languages";
import { getTemplates } from "@src/lib/requests/getTemplates";
import { clearLocaleCaches } from "@src/lib/api/cacheByLocale";
import { i18n } from "@/next-i18next.config";
import { ILocale } from "@src/types/locale";

const STATIC_PAGES = ["/", "/searchresult"];
const DEFAULT_LOCALE = i18n.defaultLocale;
const CONCURRENCY = 20;
const PAGES_CACHE_DIR = path.join(process.cwd(), ".next", "server", "pages");
const RESERVED_SLUGS = new Set(["404", "500", "searchresult"]);

let activeRun: { controller: AbortController; done: Promise<void> } | null =
  null;

const withLocale = (locale: string, page: string) => {
  if (locale === DEFAULT_LOCALE) return page;

  return page === "/" ? `/${locale}` : `/${locale}${page}`;
};

const getCatalogSlugs = async (locale: ILocale["locale"]) => {
  const templates = await getTemplates(locale);

  return new Set(templates.flatMap(({ meta }) => [meta.slug, meta.category]));
};

const getCachedSlugs = async (locale: string) => {
  try {
    const files = await readdir(path.join(PAGES_CACHE_DIR, locale));

    return files
      .filter((file) => file.endsWith(".html"))
      .map((file) => file.slice(0, -".html".length))
      .filter((slug) => !RESERVED_SLUGS.has(slug));
  } catch {
    return [];
  }
};

const removeCachedPage = (locale: string, slug: string) =>
  Promise.all(
    [".html", ".json"].map((ext) =>
      rm(path.join(PAGES_CACHE_DIR, locale, `${slug}${ext}`), {
        force: true,
      }),
    ),
  );

const getLocalePaths = async (locale: string) => {
  const [catalogSlugs, cachedSlugs] = await Promise.all([
    getCatalogSlugs(locale),
    getCachedSlugs(locale),
  ]);

  const staleSlugs = cachedSlugs.filter((slug) => !catalogSlugs.has(slug));

  const toPaths = (slugs: Iterable<string>) =>
    [...slugs].map((slug) => withLocale(locale, `/${slug}`));

  return {
    active: [
      ...STATIC_PAGES.map((page) => withLocale(locale, page)),
      ...toPaths(catalogSlugs),
    ],
    stale: toPaths(staleSlugs),
    removeStale: () =>
      Promise.all(staleSlugs.map((slug) => removeCachedPage(locale, slug))),
  };
};

const getAllPaths = async () => {
  const byLocale = await Promise.all(
    languages.map((language) => getLocalePaths(language.shortKey)),
  );

  return {
    active: [...new Set(byLocale.flatMap((locale) => locale.active))],
    stale: [...new Set(byLocale.flatMap((locale) => locale.stale))],
    removeStale: () =>
      Promise.all(byLocale.map((locale) => locale.removeStale())),
  };
};

const revalidatePaths = async (
  res: NextApiResponse,
  paths: string[],
  signal?: AbortSignal,
) => {
  const failed: string[] = [];

  for (let i = 0; i < paths.length && !signal?.aborted; i += CONCURRENCY) {
    const batch = paths.slice(i, i + CONCURRENCY);
    const results = await Promise.allSettled(
      batch.map((path) => res.revalidate(path)),
    );

    results.forEach((result, index) => {
      if (result.status === "rejected") failed.push(batch[index]);
    });
  }

  return failed;
};

const run = async (res: NextApiResponse, signal: AbortSignal) => {
  try {
    clearLocaleCaches();

    const { active, stale, removeStale } = await getAllPaths();

    if (signal.aborted) {
      console.log("[revalidate] aborted by a newer request");
      return;
    }

    await removeStale();

    const paths = [...stale, ...active];
    const failed = [
      ...(await revalidatePaths(res, stale)),
      ...(await revalidatePaths(res, active, signal)),
    ];

    if (signal.aborted) {
      console.log("[revalidate] aborted by a newer request");
    } else if (failed.length > 0) {
      console.error(
        `[revalidate] failed: ${failed.length} of ${paths.length}`,
        failed,
      );
    } else {
      console.log(
        `[revalidate] revalidated ${active.length} paths, removed ${stale.length} stale paths`,
      );
    }
  } catch (error) {
    if (signal.aborted) {
      console.log("[revalidate] aborted by a newer request");
      return;
    }

    console.error(
      "[revalidate]",
      error instanceof Error ? error.message : String(error),
    );
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const token = process.env.REVALIDATE_AUTHORIZATION_TOKEN;

  if (!token) {
    console.error("[revalidate] REVALIDATE_AUTHORIZATION_TOKEN is not set");
    return res.status(500).json({ message: "Server misconfigured" });
  }

  if (req.headers["authorization"] !== `Bearer ${token}`) {
    return res.status(401).json({ message: "Invalid token" });
  }

  res.status(202).json({ message: "Revalidation started" });

  const previous = activeRun;
  previous?.controller.abort();

  const controller = new AbortController();
  const done = (async () => {
    await previous?.done;
    if (!controller.signal.aborted) await run(res, controller.signal);
  })();

  const current = { controller, done };
  activeRun = current;

  await done;

  if (activeRun === current) activeRun = null;
}
