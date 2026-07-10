/**
 * Minimal `next/router` replacement for the standalone embed.
 *
 * The catalog drives all its filter/sort state through the URL query and
 * `router.push({ query })`. Here we keep that query in React state (no real
 * navigation) so the components work unchanged. Links that target OTHER pages
 * (a template, search results) navigate out to the live site instead.
 */
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type Query = Record<string, string | string[] | undefined>;
type Url = string | { pathname?: string; query?: Query };
interface PushOptions {
  shallow?: boolean;
  scroll?: boolean;
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "";
const EMBED_PATHNAME = "/";

const absolutize = (path: string): string => {
  if (/^https?:\/\//i.test(path)) return path;
  const base = SITE_URL.replace(/\/$/, "");
  return base + (path.startsWith("/") ? path : `/${path}`);
};

const queryToString = (query: Query): string => {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(query)) {
    if (value == null) continue;
    if (Array.isArray(value)) value.forEach((v) => params.append(key, v));
    else params.set(key, String(value));
  }
  const s = params.toString();
  return s ? `?${s}` : "";
};

const parseInitialQuery = (): Query => {
  if (typeof window === "undefined") return {};
  const query: Query = {};
  new URLSearchParams(window.location.search).forEach((value, key) => {
    query[key] = value;
  });
  return query;
};

const cleanQuery = (query: Query): Query => {
  const out: Query = {};
  for (const [key, value] of Object.entries(query)) {
    if (value == null || value === "") continue;
    out[key] = value;
  }
  return out;
};

interface RouterState {
  query: Query;
  setQuery: (q: Query) => void;
  locale: string;
}

const RouterContext = createContext<RouterState | null>(null);

export const RouterProvider = ({
  locale = "en",
  children,
}: {
  locale?: string;
  children: ReactNode;
}) => {
  const [query, setQueryState] = useState<Query>(parseInitialQuery);

  const setQuery = useCallback((q: Query) => {
    const next = cleanQuery(q);
    setQueryState(next);
    if (typeof window !== "undefined" && window.history) {
      window.history.replaceState(
        window.history.state,
        "",
        window.location.pathname + queryToString(next),
      );
    }
  }, []);

  const value = useMemo<RouterState>(
    () => ({ query, setQuery, locale }),
    [query, setQuery, locale],
  );

  return (
    <RouterContext.Provider value={value}>{children}</RouterContext.Provider>
  );
};

export function useRouter() {
  const ctx = useContext(RouterContext);
  const state: RouterState = ctx ?? {
    query: {},
    setQuery: () => {},
    locale: "en",
  };

  const navigate = useCallback(
    (url: Url) => {
      // String url => a real route (search results, a template). Go to the site.
      if (typeof url === "string") {
        if (typeof window !== "undefined") window.location.assign(absolutize(url));
        return Promise.resolve(true);
      }
      const targetPath = url.pathname ?? EMBED_PATHNAME;
      const nextQuery = url.query ?? {};
      // Same page => just update the query state (client-side filtering).
      if (targetPath === EMBED_PATHNAME) {
        state.setQuery(nextQuery);
        return Promise.resolve(true);
      }
      // Different page => navigate out to the live site.
      if (typeof window !== "undefined") {
        window.location.assign(absolutize(targetPath + queryToString(nextQuery)));
      }
      return Promise.resolve(true);
    },
    [state],
  );

  return useMemo(
    () => ({
      query: state.query,
      pathname: EMBED_PATHNAME,
      route: EMBED_PATHNAME,
      asPath: EMBED_PATHNAME + queryToString(state.query),
      basePath: "",
      locale: state.locale,
      locales: [state.locale],
      defaultLocale: "en",
      isReady: true,
      isFallback: false,
      isPreview: false,
      push: (url: Url, _as?: Url, _options?: PushOptions) => navigate(url),
      replace: (url: Url, _as?: Url, _options?: PushOptions) => navigate(url),
      prefetch: () => Promise.resolve(),
      back: () => {},
      forward: () => {},
      reload: () => {},
      beforePopState: () => {},
      events: { on: () => {}, off: () => {}, emit: () => {} },
    }),
    [state.query, state.locale, navigate],
  );
}

export default { useRouter, RouterProvider };
