import { languages } from "@src/config/languages";
import { getTemplates } from "@src/lib/requests/getTemplates";
import { ILocale } from "@src/types/locale";
import { getCanonicalUrl } from "@src/utils/seoUrl";

type TLocale = ILocale["locale"];

interface ISitemapPage {
  path: string;
  lastmod?: string;
}

interface ILocaleSitemapData {
  forms: ISitemapPage[];
  categories: ISitemapPage[];
}

interface ISitemapEntry {
  loc: string;
  lastmod?: string;
}

const LOCALES = languages.map((language) => language.shortKey);

const toLastmod = (value?: string): string | undefined => {
  if (!value) return undefined;

  const date = new Date(value);

  return Number.isNaN(date.getTime())
    ? undefined
    : date.toISOString().slice(0, 10);
};

const latest = (dates: (string | undefined)[]): string | undefined =>
  dates.reduce<string | undefined>(
    (result, date) => (date && (!result || date > result) ? date : result),
    undefined,
  );

const byPath = (a: ISitemapPage, b: ISitemapPage) =>
  a.path.localeCompare(b.path);

const getLocaleSitemapData = async (
  locale: TLocale,
): Promise<ILocaleSitemapData> => {
  const templates = await getTemplates(locale);

  const latestByCategory = new Map<string, string | undefined>();
  templates.forEach(({ meta, updated }) => {
    latestByCategory.set(
      meta.category,
      latest([latestByCategory.get(meta.category), toLastmod(updated)]),
    );
  });

  const categories = [...latestByCategory]
    .map(([category, lastmod]) => ({ path: `/${category}`, lastmod }))
    .sort(byPath);

  const forms = templates
    .map(({ meta, updated }) => ({
      path: `/${meta.slug}`,
      lastmod: toLastmod(updated),
    }))
    .sort(byPath);

  return { forms, categories };
};

const buildSitemapEntries = async (): Promise<ISitemapEntry[]> => {
  const dataByLocale = await Promise.all(
    LOCALES.map((locale) => getLocaleSitemapData(locale)),
  );

  return LOCALES.flatMap((locale, index) => {
    const pages = [
      ...dataByLocale[index].categories,
      ...dataByLocale[index].forms,
    ];

    const root: ISitemapEntry = {
      loc: getCanonicalUrl("/", locale),
      lastmod: latest(pages.map((page) => page.lastmod)),
    };

    return [
      root,
      ...pages.map((page) => ({
        loc: getCanonicalUrl(page.path, locale),
        lastmod: page.lastmod,
      })),
    ];
  });
};

const escapeXml = (value: string): string =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

const renderEntry = ({ loc, lastmod }: ISitemapEntry): string =>
  [
    "  <url>",
    `    <loc>${escapeXml(loc)}</loc>`,
    ...(lastmod ? [`    <lastmod>${lastmod}</lastmod>`] : []),
    "  </url>",
  ].join("\n");

const buildSitemapXml = async (): Promise<string> => {
  const entries = await buildSitemapEntries();

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...entries.map(renderEntry),
    "</urlset>",
    "",
  ].join("\n");
};

export { buildSitemapXml };
