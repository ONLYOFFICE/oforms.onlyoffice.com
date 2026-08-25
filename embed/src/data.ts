import type { Locale } from "./locale";

type CatalogData = any;

const DATA_URL = (process.env.EMBED_DATA_URL || "").replace(/\/$/, "");

const FETCH_TIMEOUT_MS = 8000;

const EMPTY: CatalogData = { data: [], meta: {} };

export async function loadData(locale: Locale): Promise<CatalogData> {
  if (!DATA_URL || typeof fetch === "undefined") {
    console.warn("[oforms-embed] no catalog url configured — EMBED_DATA_URL is empty");
    return EMPTY;
  }

  const url = `${DATA_URL}/main.${locale}.json`;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const res = await fetch(url, { signal: controller.signal });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    if (!Array.isArray(json?.data)) throw new Error("unexpected payload shape");
    return json;
  } catch (err) {
    console.warn(`[oforms-embed] could not load the catalog from ${url}`, err);
    return EMPTY;
  } finally {
    clearTimeout(timer);
  }
}
