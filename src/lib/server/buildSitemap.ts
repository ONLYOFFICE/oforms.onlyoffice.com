import { languages } from "@src/config/languages";
import { getFormsByLocale } from "@src/lib/requests/getAllFormsAllLocales";
import { getCachedCategoryUrls } from "@src/lib/requests/getCategoryUrls";
import { ILocale } from "@src/types/locale";
import { getCanonicalUrl } from "@src/utils/seoUrl";

type TLocale = ILocale["locale"];

interface ISitemapPage {
  path: string;
  lastmod?: string;
}

interface ISitemapCategory extends ISitemapPage {
  documentId: string;
}

interface ILocaleSitemapData {
  forms: ISitemapPage[];
  categories: ISitemapCategory[];
}

interface ISitemapEntry {
  loc: string;
  lastmod?: string;
}

const LOCALES = languages.map((language) => language.shortKey);

const isNonEmpty = (value: unknown): value is string =>
  typeof value === "string" && value.length > 0;

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

const uniqueByPath = <T extends ISitemapPage>(pages: T[]): T[] => {
  const seen = new Set<string>();

  return pages.filter((page) => {
    if (seen.has(page.path)) return false;
    seen.add(page.path);
    return true;
  });
};

const byPath = (a: ISitemapPage, b: ISitemapPage) =>
  a.path.localeCompare(b.path);

const getLocaleSitemapData = async (
  locale: TLocale,
): Promise<ILocaleSitemapData> => {
  const [forms, categories] = await Promise.all([
    getFormsByLocale(locale),
    getCachedCategoryUrls(locale),
  ]);

  const latestFormByCategory = new Map<string, string>();

  forms.data.forEach((form) => {
    const lastmod = toLastmod(form.updatedAt);

    if (!lastmod) return;

    (form.subcategories ?? []).filter(Boolean).forEach((subcategory) => {
      (subcategory.parent_categories ?? [])
        .filter(Boolean)
        .forEach(({ documentId }) => {
          const current = latestFormByCategory.get(documentId);

          if (!current || lastmod > current) {
            latestFormByCategory.set(documentId, lastmod);
          }
        });
    });
  });

  const categoryPages = uniqueByPath(
    categories.data
      .filter((category) => isNonEmpty(category.urlReq))
      .map((category) => ({
        path: `/${category.urlReq}`,
        documentId: category.documentId,
        lastmod: latest([
          toLastmod(category.updatedAt),
          latestFormByCategory.get(category.documentId),
        ]),
      })),
  ).sort(byPath);

  const categoryPaths = new Set(categoryPages.map((page) => page.path));

  const formPages = uniqueByPath(
    forms.data
      .filter((form) => isNonEmpty(form.url))
      .map((form) => ({
        path: `/${form.url}`,
        lastmod: toLastmod(form.updatedAt),
      }))
      .filter((page) => !categoryPaths.has(page.path)),
  ).sort(byPath);

  return { forms: formPages, categories: categoryPages };
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
