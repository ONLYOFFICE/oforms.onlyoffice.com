import type { Locale } from "./locale";

type CatalogData = any;

const DATA_URL = (process.env.EMBED_DATA_URL || "").replace(/\/$/, "");

const ATTEMPT_TIMEOUTS_MS = [8000, 20000];

async function fetchCatalog(url: string, timeoutMs: number): Promise<CatalogData> {
  const controller = new AbortController();
  let timedOut = false;
  const timer = setTimeout(() => {
    timedOut = true;
    controller.abort();
  }, timeoutMs);

  try {
    const res = await fetch(url, { signal: controller.signal });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    if (!Array.isArray(json?.data)) throw new Error("unexpected payload shape");
    return json;
  } catch (err) {
    if (timedOut) throw new Error(`no response within ${timeoutMs}ms`);
    throw err;
  } finally {
    clearTimeout(timer);
  }
}

export async function loadData(locale: Locale): Promise<CatalogData | null> {
  if (!DATA_URL || typeof fetch === "undefined") {
    console.warn("[oforms-embed] no catalog url configured — EMBED_DATA_URL is empty");
    return null;
  }
  if (typeof navigator !== "undefined" && navigator.onLine === false) {
    console.warn("[oforms-embed] offline — cloud templates not loaded");
    return null;
  }

  const url = `${DATA_URL}/main.${locale}.json`;
  const attempts = ATTEMPT_TIMEOUTS_MS.length;

  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      return await fetchCatalog(url, ATTEMPT_TIMEOUTS_MS[attempt - 1]);
    } catch (err) {
      const reason = err instanceof Error ? err.message : String(err);
      const next =
        attempt < attempts ? " — retrying" : " — cloud templates not loaded";
      console.warn(
        `[oforms-embed] catalog request ${attempt}/${attempts} failed for ${url}: ${reason}${next}`,
      );
    }
  }

  return null;
}
