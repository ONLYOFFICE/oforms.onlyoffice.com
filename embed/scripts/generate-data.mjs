/**
 * Generates embed/data/main.<locale>.json — the templates catalog data that the
 * main page needs — by calling the same Strapi endpoint as the site's
 * getAllForms(). The JSON is imported into the bundle at build time, so the
 * desktop bundle needs no network at runtime (except CDN images/fonts).
 *
 * Usage:
 *   node scripts/generate-data.mjs [locale]     (locale defaults to "en")
 *
 * Run once per locale you ship, then `npm run build`.
 */
import { writeFile, mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const CONFIG = require("../../src/config/config.json");

const __dirname = dirname(fileURLToPath(import.meta.url));
const CMS = (process.env.EMBED_CMS_URL || CONFIG.api.cms).replace(/\/$/, "");
const CMS_ORIGIN = new URL(CMS).origin;
const locale = process.argv[2] || "en";

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
    "fields[1]=description_card",
    "fields[2]=url",
    "fields[3]=popular_template",
    "fields[4]=createdAt",
    "populate[card_prewiew][fields][0]=url",
    "populate[form_exts][fields][0]=ext",
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

// Card preview urls from the CMS may be root-relative; make them absolute so
// they load from the CMS host inside the desktop tab.
const absolutizePreviews = (items) => {
  for (const item of items) {
    const url = item?.card_prewiew?.url;
    if (typeof url === "string" && url.startsWith("/")) {
      item.card_prewiew.url = CMS_ORIGIN + url;
    }
  }
  return items;
};

async function fetchPage(l, page) {
  const url = buildUrl(l, page);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Strapi ${res.status} for ${url}`);
  return res.json();
}

async function main() {
  console.log(`Fetching catalog (locale: ${locale}) from ${CMS} …`);
  const first = await fetchPage(locale, 1);
  const pageCount = first.meta?.pagination?.pageCount ?? 1;

  let data = [...first.data];
  if (pageCount > 1) {
    const rest = await Promise.all(
      Array.from({ length: pageCount - 1 }, (_, i) => fetchPage(locale, i + 2)),
    );
    data = rest.reduce((acc, p) => acc.concat(p.data), data);
  }

  const output = { data: absolutizePreviews(data), meta: first.meta };

  const outDir = join(__dirname, "..", "data");
  await mkdir(outDir, { recursive: true });
  const outFile = join(outDir, `main.${locale}.json`);
  await writeFile(outFile, JSON.stringify(output));
  console.log(`✓ ${data.length} templates → data/main.${locale}.json`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
