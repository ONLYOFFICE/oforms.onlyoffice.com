import { languages } from "@src/config/languages";
import { getCachedCategoryUrls } from "@src/lib/requests/getCategoryUrls";
import { ILocale } from "@src/types/locale";

type TLocale = ILocale["locale"];

type TCategoryPaths = Map<string, Map<TLocale, string>>;

const LOCALES = languages.map((language) => language.shortKey);

const getCategoryPaths = async (): Promise<TCategoryPaths> => {
  const byLocale = await Promise.all(
    LOCALES.map((locale) => getCachedCategoryUrls(locale)),
  );

  const paths: TCategoryPaths = new Map();

  byLocale.forEach((categories, index) => {
    categories.data.forEach(({ documentId, urlReq }) => {
      if (!urlReq) return;

      const localePaths = paths.get(documentId) ?? new Map<TLocale, string>();

      localePaths.set(LOCALES[index], urlReq);
      paths.set(documentId, localePaths);
    });
  });

  return paths;
};

const localesSharingPath = (
  paths: TCategoryPaths,
  documentId: string,
  urlReq: string,
): TLocale[] => {
  const localePaths = paths.get(documentId);

  if (!localePaths) return [];

  return LOCALES.filter((locale) => localePaths.get(locale) === urlReq);
};

const getCategoryLocales = async (
  locale: TLocale,
  urlReq: string,
): Promise<TLocale[]> => {
  const paths = await getCategoryPaths();

  const match = [...paths.entries()].find(
    ([, localePaths]) => localePaths.get(locale) === urlReq,
  );

  return match ? localesSharingPath(paths, match[0], urlReq) : [locale];
};

export { getCategoryPaths, localesSharingPath, getCategoryLocales };
