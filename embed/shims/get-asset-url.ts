/**
 * Embed replacement for @src/utils/getAssetUrl.
 *
 * The catalog's UI icons are bundled into the JS as data URIs (the production
 * site does not host the redesign assets yet, and this also makes the embed
 * self-contained). Anything not in the map falls back to the original
 * behavior — prefixing with NEXT_PUBLIC_STATIC_URL.
 */
// SVGs are imported raw and encoded to base64 here: Vite's default svg data
// URIs keep raw single quotes, which are invalid inside an unquoted CSS url()
// in an inline style (the declaration gets dropped and the icon disappears).
// Base64 uses only url-token-safe characters. PNGs inline as base64 already.
import filtersIcon from "../../public/images/icons/filters.svg?raw";
import sidebarCross from "../../public/images/modules/main/cross.svg?raw";
import searchIcon from "../../public/images/icons/search.svg?raw";
import searchCross from "../../public/images/icons/cross.svg?raw";
import suggestionCheck from "../../public/images/templates/searchresult/check.svg?raw";
import suggestionTry from "../../public/images/templates/searchresult/try.svg?raw";
import suggestionBrowse from "../../public/images/templates/searchresult/browse.svg?raw";
import suggestionFilters from "../../public/images/templates/searchresult/filters.svg?raw";
import cardLocal from "../../public/images/widgets/card/local.svg?raw";
import cardCloud from "../../public/images/widgets/card/cloud.svg?raw";
import docxHover from "../../public/images/widgets/card/docx-hover.png";
import xlsxHover from "../../public/images/widgets/card/xlsx-hover.png";
import pptxHover from "../../public/images/widgets/card/pptx-hover.png";
import pdfHover from "../../public/images/widgets/card/pdf-hover.png";
import noResultsFound from "../../public/images/templates/searchresult/no-results-found.png";

const svgDataUri = (svg: string): string =>
  "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svg)));

const BUNDLED: Record<string, string> = {
  "/images/templates/main/filters.svg": svgDataUri(filtersIcon),
  "/images/modules/main/cross.svg": svgDataUri(sidebarCross),
  "/images/templates/main/search-input/search.svg": svgDataUri(searchIcon),
  "/images/templates/main/search-input/cross.svg": svgDataUri(searchCross),
  "/images/templates/searchresult/check.svg": svgDataUri(suggestionCheck),
  "/images/templates/searchresult/try.svg": svgDataUri(suggestionTry),
  "/images/templates/searchresult/browse.svg": svgDataUri(suggestionBrowse),
  "/images/templates/searchresult/filters.svg": svgDataUri(suggestionFilters),
  "/images/widgets/card/local.svg": svgDataUri(cardLocal),
  "/images/widgets/card/cloud.svg": svgDataUri(cardCloud),
  "/images/widgets/card/docx-hover.png": docxHover,
  "/images/widgets/card/xlsx-hover.png": xlsxHover,
  "/images/widgets/card/pptx-hover.png": pptxHover,
  "/images/widgets/card/pdf-hover.png": pdfHover,
  "/images/templates/searchresult/no-results-found.png": noResultsFound,
};

export function getAssetUrl(path?: string): string {
  if (!path) return "";
  const url = path.trim();
  const bundled = BUNDLED[url];
  if (bundled) return bundled;
  // Original getAssetUrl behavior:
  if (/^(https?:)?\/\//i.test(url) || url.startsWith("data:")) return url;
  if (/^\/?files\//i.test(url)) return url;
  const base = process.env.NEXT_PUBLIC_STATIC_URL || "";
  if (!base) return url;
  const hasTrailing = base.endsWith("/");
  const hasLeading = url.startsWith("/");
  if (hasTrailing && hasLeading) return base + url.slice(1);
  if (!hasTrailing && !hasLeading) return base + "/" + url;
  return base + url;
}
