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
