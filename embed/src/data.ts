/** Catalog data. All 9 locales are bundled into the JS (generated into
 *  public/embed-data by `npm run generate`), so switching language shows that
 *  language's templates instantly — no network, no deploy dependency. */
import { FALLBACK, type Locale } from "./locale";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type CatalogData = any;

const modules = import.meta.glob("../../public/embed-data/main.*.json", {
  eager: true,
  import: "default",
}) as Record<string, CatalogData>;

const bundled: Record<string, CatalogData> = {};
for (const [path, data] of Object.entries(modules)) {
  const m = path.match(/main\.([a-z-]+)\.json$/);
  if (m) bundled[m[1]] = data;
}

export async function loadData(locale: Locale): Promise<CatalogData> {
  return bundled[locale] ?? bundled[FALLBACK];
}

// Background revalidation: fetch a fresher snapshot from the oforms site (its
// API route caches for 3 days). Returns null on any failure (offline etc.) so
// the bundled snapshot keeps showing.
const DATA_BASE = (process.env.EMBED_DATA_URL || "").replace(/\/$/, "");
const freshCache: Record<string, CatalogData> = {};

export async function fetchFreshData(locale: Locale): Promise<CatalogData | null> {
  if (!DATA_BASE) return null;
  if (freshCache[locale]) return freshCache[locale];
  try {
    const res = await fetch(`${DATA_BASE}/${locale}`);
    if (!res.ok) return null;
    const data = await res.json();
    if (data && Array.isArray(data.data)) {
      freshCache[locale] = data;
      return data;
    }
    return null;
  } catch {
    return null;
  }
}
