import {
  useEffect,
  useMemo,
  useState,
  type FormEvent,
  type KeyboardEvent,
  type MouseEvent,
} from "react";
import { RouterProvider } from "../shims/next-router";
import { MainTemplate } from "@src/components/templates/Main";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { TemplateModal, type Template } from "./TemplateModal";
import type { Locale } from "./locale";
import styles from "./EmbedApp.module.scss";

interface Props {
  locale: Locale;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  onLocaleChange: (shortKey: string) => void;
  onEdit: (template: Template) => void;
  editLabel: string;
  cancelLabel: string;
}

const normalizeUrl = (u: string) => (u?.startsWith("/") ? u : `/${u}`);

const isSearchInput = (t: EventTarget | null): t is HTMLInputElement =>
  t instanceof HTMLInputElement && t.id === "search-input";

export function EmbedApp({ locale, data, onLocaleChange, onEdit, editLabel, cancelLabel }: Props) {
  const [selected, setSelected] = useState<Template | null>(null);
  // Enter-applied search: filters the catalog itself (there is no results page).
  const [searchQuery, setSearchQuery] = useState("");

  // A new locale means a new catalog — drop the applied search.
  useEffect(() => {
    setSearchQuery("");
  }, [locale]);

  // Map template path -> template, to recognise card clicks (full catalog, so
  // suggestion clicks work regardless of the applied search).
  const byPath = useMemo(() => {
    const map = new Map<string, Template>();
    for (const t of data?.data ?? []) {
      if (t?.url) map.set(normalizeUrl(String(t.url)), t);
    }
    return map;
  }, [data]);

  const filteredData = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return data;
    return {
      ...data,
      data: (data?.data ?? []).filter((t: Template) =>
        String(t?.name_form ?? "")
          .toLowerCase()
          .includes(q),
      ),
    };
  }, [data, searchQuery]);

  // Enter in the search field applies the in-place catalog search.
  const onKeyDownCapture = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" && isSearchInput(e.target)) {
      setSearchQuery(e.target.value);
    }
  };

  // Emptying the search field resets the applied search.
  const onInputCapture = (e: FormEvent<HTMLDivElement>) => {
    if (isSearchInput(e.target) && e.target.value.trim() === "") {
      setSearchQuery("");
    }
  };

  // Intercept clicks on template links: open the info modal instead of leaving.
  // History / popular-search links perform an in-place search — the embed is a
  // single page, there is no search-results page to go to.
  const onClickCapture = (e: MouseEvent<HTMLDivElement>) => {
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
      e.stopPropagation();
      // Put the term into the search input (suggestions dropdown) and apply it.
      try {
        const q = new URL(href, window.location.href).searchParams.get("query") ?? "";
        const input = document.getElementById("search-input") as HTMLInputElement | null;
        if (input && q) {
          const setter = Object.getOwnPropertyDescriptor(
            window.HTMLInputElement.prototype,
            "value",
          )?.set;
          setter?.call(input, q);
          input.dispatchEvent(new Event("input", { bubbles: true }));
          input.focus();
          setSearchQuery(q);
        }
      } catch {
        /* ignore */
      }
      return;
    }
    const template = byPath.get(path);
    if (template) {
      e.preventDefault();
      e.stopPropagation();
      setSelected(template);
    }
  };

  return (
    <RouterProvider locale={locale}>
      <div
        className={styles.embed}
        onClickCapture={onClickCapture}
        onKeyDownCapture={onKeyDownCapture}
        onInputCapture={onInputCapture}
      >
        <div className={styles.topbar}>
          <LanguageSwitcher current={locale} onChange={onLocaleChange} />
        </div>
        {/* Single-page build: no page heading, section titles are not links. */}
        <MainTemplate allForms={filteredData} hideHeader sectionLinks={false} />
        {selected && (
          <TemplateModal
            template={selected}
            editLabel={editLabel}
            cancelLabel={cancelLabel}
            onEdit={onEdit}
            onClose={() => setSelected(null)}
          />
        )}
      </div>
    </RouterProvider>
  );
}
