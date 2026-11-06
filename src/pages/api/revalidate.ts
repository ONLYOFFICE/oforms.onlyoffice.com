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
import { readdir, rm } from "fs/promises";
import path from "path";
import { languages } from "@src/config/languages";
import { getAllFormUrls } from "@src/lib/requests/getAllFormUrls";
import { getCategoryUrls } from "@src/lib/requests/getCategoryUrls";
import { clearLocaleCaches } from "@src/lib/api/cacheByLocale";
import { i18n } from "@/next-i18next.config";

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

const isNonEmpty = (value: unknown): value is string =>
  typeof value === "string" && value.length > 0;

const getCmsSlugs = async (locale: string, signal: AbortSignal) => {
  const [forms, categories] = await Promise.all([
    getAllFormUrls(locale, signal),
    getCategoryUrls(locale, signal),
  ]);

  return new Set(
    [
      ...forms.data.map((form) => form.url),
      ...categories.data.map((category) => category.urlReq),
    ].filter(isNonEmpty),
  );
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

const getLocalePaths = async (locale: string, signal: AbortSignal) => {
  const [cmsSlugs, cachedSlugs] = await Promise.all([
    getCmsSlugs(locale, signal),
    getCachedSlugs(locale),
  ]);

  const staleSlugs = cachedSlugs.filter((slug) => !cmsSlugs.has(slug));

  const toPaths = (slugs: Iterable<string>) =>
    [...slugs].map((slug) => withLocale(locale, `/${slug}`));

  return {
    active: [
      ...STATIC_PAGES.map((page) => withLocale(locale, page)),
      ...toPaths(cmsSlugs),
    ],
    stale: toPaths(staleSlugs),
    removeStale: () =>
      Promise.all(staleSlugs.map((slug) => removeCachedPage(locale, slug))),
  };
};

const getAllPaths = async (signal: AbortSignal) => {
  const byLocale = await Promise.all(
    languages.map((language) => getLocalePaths(language.shortKey, signal)),
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

    const { active, stale, removeStale } = await getAllPaths(signal);

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
