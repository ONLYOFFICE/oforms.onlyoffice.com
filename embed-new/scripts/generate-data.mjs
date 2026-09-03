/**
 * Generates public/embed-data/main.<locale>.json from the same Strapi endpoint
 * as the site's getAllForms(). Not part of `npm run build` — run by the
 * embed-data-sync workflow, which uploads the result to the bucket.
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
const OUT_DIR = join(__dirname, "..", "..", "public", "embed-data");
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
  await mkdir(OUT_DIR, { recursive: true });
  await writeFile(join(OUT_DIR, `main.${locale}.json`), JSON.stringify(output));
  console.log(
    `✓ ${String(data.length).padStart(4)} templates → public/embed-data/main.${locale}.json`,
  );
}

async function main() {
  console.log(`Fetching catalog for [${LOCALES.join(", ")}] from ${CMS} …`);
  for (const locale of LOCALES) {
    await generateLocale(locale);
  }

  // 202608281603 — the embed appends it as ?v= so a sync replaces cached copies.
  const version = new Date().toISOString().replace(/\D/g, "").slice(0, 12);
  await writeFile(join(OUT_DIR, "version.txt"), version);
  console.log(`✓ version ${version} → public/embed-data/version.txt`);

  console.log(
    "\nWritten to public/embed-data/ — uploaded to the bucket by the embed-data-sync workflow,\n" +
      "then fetched by the bundle at runtime.",
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
