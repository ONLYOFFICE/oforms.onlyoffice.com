import { languages } from "@src/config/languages";
import { cacheByLocale } from "@src/lib/api/cacheByLocale";
import { getFormsByLocale } from "@src/lib/requests/getAllFormsAllLocales";
import { getCachedCategoryUrls } from "@src/lib/requests/getCategoryUrls";
import {
  getCategoryPaths,
  localesSharingPath,
} from "@src/lib/server/categoryLocales";
import { IHreflang } from "@src/components/modules/Head/Head.types";
import { ILocale } from "@src/types/locale";
import { buildHreflangs, getCanonicalUrl } from "@src/utils/seoUrl";

type TLocale = ILocale["locale"];

interface ISitemapPage {
  path: string;
  lastmod?: string;
}

interface ISitemapCategory extends ISitemapPage {
  urlReq: string;
  documentId: string;
}

interface ILocaleSitemapData {
  forms: ISitemapPage[];
  categories: ISitemapCategory[];
}

interface ISitemapEntry {
  loc: string;
  lastmod?: string;
  alternates: IHreflang[];
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

const getLocaleSitemapData = cacheByLocale(
  async (locale: TLocale): Promise<ILocaleSitemapData> => {
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
          urlReq: category.urlReq,
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
  },
);

const buildSitemapEntries = async (): Promise<ISitemapEntry[]> => {
  const [dataByLocale, categoryPaths] = await Promise.all([
    Promise.all(LOCALES.map((locale) => getLocaleSitemapData(locale))),
    getCategoryPaths(),
  ]);

  const rootAlternates = buildHreflangs("/", true);

  return LOCALES.flatMap((locale, index) => {
    const { categories, forms } = dataByLocale[index];

    const root: ISitemapEntry = {
      loc: getCanonicalUrl("/", locale),
      lastmod: latest([...categories, ...forms].map((page) => page.lastmod)),
      alternates: rootAlternates,
    };

    const categoryEntries = categories.map((category) => ({
      loc: getCanonicalUrl(category.path, locale),
      lastmod: category.lastmod,
      alternates: buildHreflangs(
        category.path,
        true,
        localesSharingPath(categoryPaths, category.documentId, category.urlReq),
      ),
    }));

    const formEntries = forms.map((form) => ({
      loc: getCanonicalUrl(form.path, locale),
      lastmod: form.lastmod,
      alternates: [],
    }));

    return [root, ...categoryEntries, ...formEntries];
  });
};

const escapeXml = (value: string): string =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

const renderEntry = ({ loc, lastmod, alternates }: ISitemapEntry): string =>
  [
    "  <url>",
    `    <loc>${escapeXml(loc)}</loc>`,
    ...(lastmod ? [`    <lastmod>${lastmod}</lastmod>`] : []),
    ...alternates.map(
      ({ hrefLang, href }) =>
        `    <xhtml:link rel="alternate" hreflang="${hrefLang}" href="${escapeXml(href)}"/>`,
    ),
    "  </url>",
  ].join("\n");

const buildSitemapXml = async (): Promise<string> => {
  const entries = await buildSitemapEntries();

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    ...entries.map(renderEntry),
    "</urlset>",
    "",
  ].join("\n");
};

const LAST_XML_KEY = Symbol.for("oforms.sitemapLastXml");

const globalStore = globalThis as typeof globalThis & {
  [LAST_XML_KEY]?: string;
};

const getSitemapXml = async (): Promise<{ xml: string; stale: boolean }> => {
  try {
    const xml = await buildSitemapXml();

    globalStore[LAST_XML_KEY] = xml;

    return { xml, stale: false };
  } catch (error) {
    const lastSuccessfulXml = globalStore[LAST_XML_KEY];

    if (!lastSuccessfulXml) throw error;

    console.error(
      "[sitemap] serving the previous build:",
      error instanceof Error ? error.message : String(error),
    );

    return { xml: lastSuccessfulXml, stale: true };
  }
};

export { getSitemapXml };
