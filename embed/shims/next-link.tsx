/**
 * Minimal `next/link` replacement. Renders a plain <a>. Root-relative hrefs are
 * absolutized to the live site so cards / section / search links open the real
 * oforms page. Next-only props (prefetch, locale, shallow, ...) are dropped.
 */
import { forwardRef, type AnchorHTMLAttributes } from "react";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "";

type Url = string | { pathname?: string; query?: Record<string, unknown> };

const hrefToString = (href: Url): string => {
  if (typeof href === "string") return href;
  const pathname = href.pathname ?? "/";
  const params = new URLSearchParams();
  for (const [k, v] of Object.entries(href.query ?? {})) {
    if (v != null) params.set(k, String(v));
  }
  const qs = params.toString();
  return qs ? `${pathname}?${qs}` : pathname;
};

const absolutize = (path: string): string => {
  if (!path || path === "#") return path || "#";
  if (/^(https?:)?\/\//i.test(path) || path.startsWith("mailto:")) return path;
  const base = SITE_URL.replace(/\/$/, "");
  return base + (path.startsWith("/") ? path : `/${path}`);
};

interface LinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  href: Url;
  // Next-only props to swallow:
  prefetch?: boolean;
  locale?: string | false;
  replace?: boolean;
  shallow?: boolean;
  scroll?: boolean;
  passHref?: boolean;
  legacyBehavior?: boolean;
}

const NextLink = forwardRef<HTMLAnchorElement, LinkProps>(function NextLink(
  {
    href,
    prefetch: _prefetch,
    locale: _locale,
    replace: _replace,
    shallow: _shallow,
    scroll: _scroll,
    passHref: _passHref,
    legacyBehavior: _legacyBehavior,
    children,
    ...rest
  },
  ref,
) {
  return (
    <a ref={ref} href={absolutize(hrefToString(href))} {...rest}>
      {children}
    </a>
  );
});

export default NextLink;
