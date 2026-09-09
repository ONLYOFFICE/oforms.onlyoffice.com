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

/**
 * Generates static/embed-data/main.<locale>.json from the same Strapi endpoint
 * as the site's getAllForms(). Not part of `npm run build` — run by the deploy
 * workflow just before it, since static/ is Vite's publicDir and ships in dist.
 *
 * Usage:
 *   node embed-new/scripts/generate-data.mjs [locale]   (default: all 9 locales)
 */
import { writeFile, mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const CONFIG = require("../../src/config/config.json");

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dirname, "..", "static", "embed-data");
const VERSION_FILE = join(__dirname, "..", "data-version.txt");
const CMS = (process.env.EMBED_CMS_URL || CONFIG.api.cms).replace(/\/$/, "");
const CMS_ORIGIN = new URL(CMS).origin;
const ALL_LOCALES = ["ar", "de", "en", "es", "fr", "it", "ja", "pt", "zh"];
// Pass a locale to generate just one; default generates all 9.
const arg = process.argv[2];
const LOCALES = arg && arg !== "all" ? [arg] : ALL_LOCALES;

// Matches src/utils/cmsLocale.ts
const CMS_LOCALE_MAP = { pt: "pt-br", zh: "zh-CN" };
const cmsLocale = (l) => CMS_LOCALE_MAP[l] ?? l;

// Mirrors src/lib/requests/getAllForms.ts
const buildUrl = (l, page) =>
  `${CMS}/api/oforms?` +
  [
    `locale=${cmsLocale(l)}`,
    `pagination[page]=${page}`,
    "pagination[pageSize]=1000",
    "sort[0]=createdAt:desc",
    "fields[0]=name_form",
    // Not description_card: the CMS keeps the SEO call to action there.
    "fields[1]=template_desc",
    "fields[2]=url",
    "fields[3]=popular_template",
    "fields[4]=createdAt",
    "fields[5]=file_pages",
    "populate[card_prewiew][fields][0]=url",
    "populate[form_exts][fields][0]=ext",
    // The actual template files (opened in the desktop editor via openTemplate).
    "populate[file_oform][fields][0]=name",
    "populate[file_oform][fields][1]=url",
    "populate[file_oform][fields][2]=size",
    "populate[file_oform][fields][3]=ext",
    "populate[file_oform][fields][4]=updatedAt",
    "populate[countries][fields][0]=name",
    "populate[countries][fields][1]=code",
    "populate[countries][fields][2]=createdAt",
    "populate[subcategories][fields][0]=name",
    "populate[subcategories][fields][1]=urlReq",
    "populate[subcategories][fields][2]=createdAt",
    "populate[subcategories][populate][parent_categories][fields][0]=name",
    "populate[subcategories][populate][parent_categories][fields][1]=urlReq",
    "populate[subcategories][populate][parent_categories][fields][2]=createdAt",
    "populate[subcategories][populate][parent_categories][populate][purpose][fields][0]=name",
    "populate[subcategories][populate][parent_categories][populate][purpose][fields][1]=key",
    "populate[subcategories][populate][parent_categories][populate][purpose][fields][2]=createdAt",
  ].join("&");

// file_oform stores the extension dotted, form_exts bare. Anything else is not
// a value form_exts may hold, so it is left alone.
const EXT_BY_FILE = {
  ".docx": "docx",
  ".xlsx": "xlsx",
  ".pptx": "pptx",
  ".pdf": "pdf",
};

// A part naming a file format is the call to action, not the description.
const CTA_FORMAT = /\b(docx|xlsx|pptx|pdf)\b/i;

// template_desc is the call to action then the description, separated by a newline
// on 3251 of 3340 and by a space on the other 89 — one split, then drop everything
// through the last part naming a format. The 19 naming nothing else keep it.
// Revisit after the CMS is cleaned up: once every record has a description and the
// call to action is always its own paragraph, this is the last part of a newline
// split, and the format name stops being the marker.
const describe = (text) => {
  const parts = (text ?? "").trim().split(/\s*\n+\s*|(?<=[.!?。！？])\s+/);
  const cta = parts.findLastIndex((part) => CTA_FORMAT.test(part));
  return (cta < parts.length - 1 ? parts.slice(cta + 1) : parts).join(" ");
};

// Preview urls may be root-relative, and form_exts disagrees with the file that
// actually opens on 10 of 3340. Fixed here rather than in each consumer,
// because they all read form_exts and file_oform agrees with the url every time.
// template_desc is trimmed to its description in the same pass and for the same
// reason: one correction here beats the same rule in every consumer.
const normalize = (items) => {
  for (const item of items) {
    const preview = item?.card_prewiew?.url;
    if (typeof preview === "string" && preview.startsWith("/")) {
      item.card_prewiew.url = CMS_ORIGIN + preview;
    }

    const tagged = item?.form_exts?.[0];
    const actual = EXT_BY_FILE[item?.file_oform?.[0]?.ext];
    if (tagged && actual) tagged.ext = actual;

    item.template_desc = describe(item?.template_desc);

    const pages = Number(item?.file_pages);
    if (Number.isInteger(pages) && pages > 0) item.file_pages = pages;
    else delete item.file_pages;
  }

  return items;
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function fetchPage(l, page, attempt = 1) {
  const url = buildUrl(l, page);
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Strapi ${res.status} for ${url}`);
    return await res.json();
  } catch (err) {
    if (attempt >= 4) throw err;
    console.warn(`  retry ${attempt} (${l} p${page}): ${err.message ?? err}`);
    await sleep(1500 * attempt);
    return fetchPage(l, page, attempt + 1);
  }
}

async function generateLocale(locale) {
  const first = await fetchPage(locale, 1);
  const pageCount = first.meta?.pagination?.pageCount ?? 1;

  let data = [...first.data];
  if (pageCount > 1) {
    const rest = await Promise.all(
      Array.from({ length: pageCount - 1 }, (_, i) => fetchPage(locale, i + 2)),
    );
    data = rest.reduce((acc, p) => acc.concat(p.data), data);
  }

  const output = { data: normalize(data), meta: first.meta };

  // Every path here is read flat, which is Strapi v5; v4 wraps each record in
  // data/attributes and drops unknown populate keys silently with a 200, so the
  // wrong CMS yields a full catalog of blank cards rather than an error.
  // card_prewiew.url is filled on 3340 of 3340, so one miss is that mistake.
  if (data.some((item) => !item?.card_prewiew?.url)) {
    throw new Error(
      `${locale}: previews missing — is EMBED_CMS_URL the Strapi v5 instance?`,
    );
  }

  await mkdir(OUT_DIR, { recursive: true });
  await writeFile(join(OUT_DIR, `main.${locale}.json`), JSON.stringify(output));
  console.log(
    `✓ ${String(data.length).padStart(4)} templates → static/embed-data/main.${locale}.json`,
  );
}

async function main() {
  console.log(`Fetching catalog for [${LOCALES.join(", ")}] from ${CMS} …`);

  // 202608281603 — the handoff to vite.config.ts, which bakes it into the bundle
  // as the ?v= stamp and into index.html as a meta tag. Outside static/ on
  // purpose: it is a build input, not something to serve.
  //
  // Written before the catalogs, not after: a run that throws part-way leaves new
  // files on disk, and under `immutable` an old stamp would pin them in every
  // browser that already holds the previous copy. Bumping first costs a
  // re-download of the locales that did not change.
  const version = new Date().toISOString().replace(/\D/g, "").slice(0, 12);
  await writeFile(VERSION_FILE, version);
  console.log(`✓ version ${version} → data-version.txt`);

  for (const locale of LOCALES) {
    await generateLocale(locale);
  }

  console.log(
    "\nWritten to static/embed-data/ — Vite copies it into dist, so run this before\n" +
      "`npm run build`, not after.",
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
