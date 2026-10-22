import { languages } from "@src/config/languages";
import {
  COLLAPSE_QUERY_PARAM,
  COUNTRIES_COLLAPSE_QUERY_PARAM,
  EXPAND_QUERY_PARAM,
} from "@src/utils/queryFilters";
import { LANG_QUERY_PARAM } from "@src/utils/queryLang";
import { getLocalePath, getSiteUrl } from "@src/utils/seoUrl";

const PRODUCTION_HOST = "templates.onlyoffice.com";

const PRIVATE_PAGES = ["/editor", "/searchresult", "/form-submit"];

const STATE_QUERY_PARAMS = [
  "sort",
  LANG_QUERY_PARAM,
  EXPAND_QUERY_PARAM,
  COLLAPSE_QUERY_PARAM,
  COUNTRIES_COLLAPSE_QUERY_PARAM,
];

const getSiteHost = (): string => {
  try {
    return new URL(getSiteUrl()).hostname.toLowerCase().replace(/^www\./, "");
  } catch {
    return "";
  }
};

const isProductionSite = (): boolean => getSiteHost() === PRODUCTION_HOST;

const buildRobotsTxt = (): string => {
  if (!isProductionSite()) {
    return ["User-agent: *", "Disallow: /", ""].join("\n");
  }

  const privatePaths = languages.flatMap(({ shortKey }) =>
    PRIVATE_PAGES.map((page) => getLocalePath(page, shortKey)),
  );

  return [
    "User-agent: *",
    "Disallow: /api/",
    ...privatePaths.flatMap((path) => [
      `Disallow: ${path}$`,
      `Disallow: ${path}?`,
    ]),
    ...STATE_QUERY_PARAMS.flatMap((param) => [
      `Disallow: /*?${param}=`,
      `Disallow: /*&${param}=`,
    ]),
    "",
    `Sitemap: ${getSiteUrl()}/sitemap.xml`,
    "",
  ].join("\n");
};

export { buildRobotsTxt };
