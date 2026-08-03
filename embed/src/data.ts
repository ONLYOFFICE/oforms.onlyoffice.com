import { FALLBACK, type Locale } from "./locale";

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

const DATA_BASE = (process.env.EMBED_DATA_URL || "").replace(/\/$/, "");
const freshCache: Record<string, CatalogData> = {};

export async function fetchFreshData(
  locale: Locale,
): Promise<CatalogData | null> {
  if (!DATA_BASE) return null;
  if (freshCache[locale]) return freshCache[locale];
  try {
    const res = await fetch(`${DATA_BASE}/main.${locale}.json`, {
      cache: "no-store",
    });
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
