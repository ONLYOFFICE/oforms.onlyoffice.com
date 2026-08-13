import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type KeyboardEvent,
  type MouseEvent,
} from "react";
import { RouterProvider } from "../../shims/next-router";
import { isRtlLocale } from "@src/utils/rtl";
import { BackToTop } from "./components/BackToTop";
import { LanguageSwitcher } from "./components/LanguageSwitcher";
import { Template } from "./components/Template";
import { TemplateModal, type TTemplate } from "./components/TemplateModal";
import { IEmbedApp } from "./EmbedApp.types";
import styles from "./EmbedApp.module.scss";

const normalizeUrl = (u: string) => (u?.startsWith("/") ? u : `/${u}`);

const isSearchInput = (t: EventTarget | null): t is HTMLInputElement =>
  t instanceof HTMLInputElement && t.id === "search-input";

const isSearchClearButton = (t: EventTarget | null) => {
  const button = t instanceof HTMLElement ? t.closest("button") : null;
  if (!button) return false;
  const input = document.getElementById("search-input");
  return !!input && button.parentElement === input.parentElement;
};

const setSearchInputValue = (value: string) => {
  const input = document.getElementById(
    "search-input",
  ) as HTMLInputElement | null;
  if (!input || input.value === value) return;
  const setter = Object.getOwnPropertyDescriptor(
    window.HTMLInputElement.prototype,
    "value",
  )?.set;
  setter?.call(input, value);
  input.dispatchEvent(new Event("input", { bubbles: true }));
};

const EmbedApp = ({ locale, data, onLocaleChange, onEdit }: IEmbedApp) => {
  const [selected, setSelected] = useState<TTemplate | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const clearSearch = useCallback(() => {
    setSearchQuery("");
    setSearchInputValue("");
  }, []);

  useEffect(() => {
    clearSearch();
  }, [locale, clearSearch]);

  const byPath = useMemo(() => {
    const map = new Map<string, TTemplate>();
    for (const t of data?.data ?? []) {
      if (t?.url) map.set(normalizeUrl(String(t.url)), t);
    }
    return map;
  }, [data]);

  const onKeyDownCapture = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" && isSearchInput(e.target)) {
      setSearchQuery(e.target.value);
    }
  };

  const onClickCapture = (e: MouseEvent<HTMLDivElement>) => {
    if (isSearchClearButton(e.target)) {
      setSearchQuery("");
      return;
    }

    const anchor = (e.target as HTMLElement).closest("a");
    if (!anchor) return;
    const href = anchor.getAttribute("href") || "";
    let path = href;
    try {
      path = new URL(href, window.location.href).pathname;
    } catch {
      /* keep raw */
    }
    if (path.startsWith("/searchresult")) {
      e.preventDefault();
      // Put the term into the search input (suggestions dropdown) and apply it.
      try {
        const q =
          new URL(href, window.location.href).searchParams.get("query") ?? "";
        if (q) {
          setSearchInputValue(q);
          document.getElementById("search-input")?.focus();
          setSearchQuery(q);
        }
      } catch {
        /* ignore */
      }
      return;
    }

    if (path === "/" && searchQuery) {
      e.preventDefault();
      setSearchInputValue("");
      setSearchQuery("");
      return;
    }
    const template = byPath.get(path);
    if (template) {
      e.preventDefault();
      setSelected(template);
      setIsOpen(true);
    }
  };

  const dir = isRtlLocale(locale) ? "rtl" : "ltr";

  return (
    <RouterProvider locale={locale} onQueryChange={clearSearch}>
      <div
        className={styles.embed}
        lang={locale}
        dir={dir}
        onClickCapture={onClickCapture}
        onKeyDownCapture={onKeyDownCapture}
      >
        <div className={styles.topbar}>
          <LanguageSwitcher current={locale} onChange={onLocaleChange} />
        </div>

        <Template data={data} isEmbed={true} searchQuery={searchQuery} />

        <BackToTop />

        <TemplateModal
          selected={selected}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onEdit={onEdit}
        />
      </div>
    </RouterProvider>
  );
};

export { EmbedApp };
