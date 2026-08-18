/*
 * Persisted, host-agnostic panel state: favourites and recently opened
 * templates. Both are keyed by the template `url`, which is the same stable
 * identifier EmbedApp already uses to map an anchor click back to a template.
 *
 * localStorage can be unavailable (private mode, a restrictive Desktop
 * webview), so every access is guarded and degrades to in-memory only.
 */

const FAVORITES_KEY = "oforms-embed:favorites";
const RECENT_KEY = "oforms-embed:recent";
const RECENT_LIMIT = 50;

interface IRecentEntry {
  url: string;
  /** Epoch milliseconds of the last open. */
  ts: number;
}

const read = (key: string): unknown => {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const write = (key: string, value: unknown) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage unavailable or full — keep the in-memory value */
  }
};

const loadFavorites = (): string[] => {
  const parsed = read(FAVORITES_KEY);
  return Array.isArray(parsed)
    ? parsed.filter((u) => typeof u === "string")
    : [];
};

const saveFavorites = (urls: string[]) => write(FAVORITES_KEY, urls);

const loadRecent = (): IRecentEntry[] => {
  const parsed = read(RECENT_KEY);
  if (!Array.isArray(parsed)) return [];
  return parsed
    .filter(
      (e): e is IRecentEntry =>
        !!e && typeof e.url === "string" && typeof e.ts === "number",
    )
    .sort((a, b) => b.ts - a.ts);
};

const saveRecent = (entries: IRecentEntry[]) => write(RECENT_KEY, entries);

/** Move `url` to the front of the recent list, stamped now. */
const touchRecent = (entries: IRecentEntry[], url: string): IRecentEntry[] =>
  [{ url, ts: Date.now() }, ...entries.filter((e) => e.url !== url)].slice(
    0,
    RECENT_LIMIT,
  );

export {
  loadFavorites,
  loadRecent,
  saveFavorites,
  saveRecent,
  touchRecent,
  RECENT_LIMIT,
};
export type { IRecentEntry };
