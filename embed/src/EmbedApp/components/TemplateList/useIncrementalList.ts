import { useEffect, useRef, useState } from "react";

/** Cards rendered up front, and how many more each time the sentinel appears. */
const PAGE = 60;

/**
 * The redesign replaced the old section-per-category layout with one flat grid,
 * so a locale can put well over 2,000 cards in a single list. Mounting them all
 * costs a matching number of DOM nodes and <img> elements, which the Desktop
 * webview feels immediately. Render a page at a time and grow when a sentinel
 * just past the last card scrolls into view.
 */
const useIncrementalList = (total: number, resetKey: unknown) => {
  const [limit, setLimit] = useState(PAGE);
  const sentinel = useRef<HTMLDivElement>(null);

  // A new list (view switch, filter, search) starts from the first page again.
  useEffect(() => setLimit(PAGE), [resetKey]);

  useEffect(() => {
    const el = sentinel.current;
    if (!el || limit >= total) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLimit((current) => Math.min(current + PAGE, total));
        }
      },
      // Start fetching the next page before the user reaches the end.
      { rootMargin: "400px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [limit, total]);

  return { limit, sentinel, hasMore: limit < total };
};

export { useIncrementalList, PAGE };
