/*
 * (c) Copyright Ascensio System SIA 2009-2026
 *
 * This program is a free software product.
 * You can redistribute it and/or modify it under the terms
 * of the GNU Affero General Public License (AGPL) version 3 as published by the Free Software
 * Foundation. In accordance with Section 7(a) of the GNU AGPL its Section 15 shall be amended
 * to the effect that Ascensio System SIA expressly excludes the warranty of non-infringement of
 * any third-party rights.
 *
 * This program is distributed WITHOUT ANY WARRANTY, without even the implied warranty
 * of MERCHANTABILITY or FITNESS FOR A PARTICULAR  PURPOSE. For details, see
 * the GNU AGPL at: http://www.gnu.org/licenses/agpl-3.0.html
 *
 * You can contact Ascensio System SIA at Lubanas st. 125a-25, Riga, Latvia, EU, LV-1021.
 *
 * The  interactive user interfaces in modified source and object code versions of the Program must
 * display Appropriate Legal Notices, as required under Section 5 of the GNU AGPL version 3.
 *
 * Pursuant to Section 7(b) of the License you must retain the original Product logo when
 * distributing the program. Pursuant to Section 7(e) we decline to grant you any rights under
 * trademark law for use of our trademarks.
 *
 * All the Product's GUI elements, including illustrations and icon sets, as well as technical writing
 * content are licensed under the terms of the Creative Commons Attribution-ShareAlike 4.0
 * International. See the License terms at http://creativecommons.org/licenses/by-sa/4.0/legalcode
 */

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import { CardGrid } from "./components/CardGrid/CardGrid";
import { EmptyState } from "./components/EmptyState/EmptyState";
import { FilterButton } from "./components/FilterButton/FilterButton";
import { LanguageSelect } from "./components/LanguageSelect/LanguageSelect";
import { Pagination } from "./components/Pagination/Pagination";
import { SearchBox } from "./components/SearchBox/SearchBox";
import { TemplateModal } from "./components/TemplateModal/TemplateModal";
import { TypeFilter } from "./components/TypeFilter/TypeFilter";
import { loadCatalog } from "./data";
import {
  getCategories,
  getFilteredForms,
  getPurposes,
  sortByNewest,
} from "./lib/filters";
import { initI18n } from "./i18n";
import { isRtlLocale, storeLocale, type Locale } from "./locale";
import { readHidden, readQuery, writeQuery, type ICatalogQuery } from "./query";
import { notifyReady, onHostMessage, requestOpenTemplate } from "./bridge";
import { applyTheme, isTheme } from "./theme";
import { PURPOSE_ORDER, type ITemplate } from "./types";
import styles from "./App.module.scss";

const PAGE_SIZE = 24;

const App = () => {
  const { t } = useTranslation("embed");

  const [query, setQuery] = useState<ICatalogQuery>(readQuery);
  const [templates, setTemplates] = useState<ITemplate[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    "loading",
  );
  const [selected, setSelected] = useState<ITemplate | null>(null);
  // Bumped to re-run the fetch when the locale has not changed (retry).
  const [reloadToken, setReloadToken] = useState(0);
  const [hidden] = useState(readHidden);
  const [scrolled, setScrolled] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  const update = useCallback((patch: Partial<ICatalogQuery>) => {
    setQuery((prev) => {
      const next = { ...prev, ...patch };
      writeQuery(next);
      return next;
    });
  }, []);

  // Any change to what is being shown returns to the first page, and to the top
  // of the list — instantly, since the cards a smooth scroll would travel over
  // belong to the result being replaced.
  const filter = useCallback(
    (patch: Partial<ICatalogQuery>) => {
      update({ ...patch, page: 1 });
      listRef.current?.scrollTo({ top: 0 });
    },
    [update],
  );

  // Catalog data — refetched whenever the locale changes. Only ever one locale
  // at a time, so no caching layer is needed.
  useEffect(() => {
    const controller = new AbortController();
    setStatus("loading");

    (async () => {
      try {
        await initI18n(query.locale);
        const catalog = await loadCatalog(query.locale, controller.signal);
        if (controller.signal.aborted) return;
        setTemplates(sortByNewest(catalog.data));
        setStatus("ready");
      } catch (error) {
        if (controller.signal.aborted) return;
        console.error("[oforms-embed] failed to load the catalog", error);
        setStatus("error");
      }
    })();

    return () => controller.abort();
  }, [query.locale, reloadToken]);

  // Direction follows the locale. Layout effect, or `ar` paints one LTR frame
  // before the mirror — measured at every CPU throttle level.
  useLayoutEffect(() => {
    document.documentElement.lang = query.locale;
    document.documentElement.dir = isRtlLocale(query.locale) ? "rtl" : "ltr";
  }, [query.locale]);

  useEffect(() => {
    const stop = onHostMessage((message) => {
      if (message.type === "theme" && isTheme(message.value)) {
        applyTheme(message.value, document.documentElement);
      } else if (message.type === "locale" && message.value) {
        filter({ locale: message.value as Locale });
      }
    });

    notifyReady();
    return stop;
  }, [filter]);

  // Names from the catalog, order fixed: `createdAt` order differs by locale.
  const purposeOptions = useMemo(() => {
    const purposes = getPurposes(templates);
    return PURPOSE_ORDER.flatMap((key) => {
      const purpose = purposes.find((item) => item.key === key);
      return purpose ? [{ value: key, label: purpose.name }] : [];
    });
  }, [templates]);

  // Names from the whole catalog, counts from what the filters leave: a row the
  // active type has none of can then stay visible while it is selected.
  const categories = useMemo(() => {
    const counts = new Map(
      getCategories(
        getFilteredForms(templates, {
          type: query.types,
          purpose: query.purpose,
        }),
      ).map((category) => [category.id, category.count]),
    );

    return getCategories(templates)
      .filter(
        (category) => !query.purpose || category.purpose?.key === query.purpose,
      )
      .map((category) => ({
        ...category,
        count: counts.get(category.id) ?? 0,
      }));
  }, [templates, query.types, query.purpose]);

  // A slug from another locale or purpose would empty the grid with nothing
  // shown as selected.
  const category = categories.some((item) => item.urlReq === query.category)
    ? query.category
    : "";

  const categoryOptions = categories
    .filter((item) => item.count > 0 || item.urlReq === category)
    .map((item) => ({ value: item.urlReq, label: item.name }));

  const visible = useMemo(() => {
    const filtered = getFilteredForms(templates, {
      type: query.types,
      category,
      purpose: query.purpose,
    });

    const term = query.q.trim().toLowerCase();
    return term
      ? filtered.filter((form) => form.name_form.toLowerCase().includes(term))
      : filtered;
  }, [templates, query.types, category, query.purpose, query.q]);

  const pages = Math.max(1, Math.ceil(visible.length / PAGE_SIZE));
  const page = Math.min(query.page, pages);
  const shown = visible.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  // Not type: it always has a value, so Clear would silently move the user to
  // Documents.
  const hasFacetFilters = category !== "" || query.purpose !== "";

  const clearFilters = () => filter({ category: "", purpose: "" });

  return (
    <div className={styles.app}>
      <header
        className={clsx(styles.header, scrolled && styles["header-scrolled"])}
      >
        <div className={styles.toolbar}>
          <div className={styles["toolbar-query"]}>
            {!hidden.has("search") && (
              <SearchBox value={query.q} onChange={(q) => filter({ q })} />
            )}

            {(query.category === "" || templates.length > 0) && (
              <FilterButton
                label={t("Category")}
                clearLabel={t("ClearCategory")}
                options={categoryOptions}
                value={category}
                onChange={(value) => filter({ category: value })}
              />
            )}

            {!hidden.has("purpose") &&
              (query.purpose === "" || templates.length > 0) && (
                <FilterButton
                  label={t("Purpose", { ns: "MainTemplate" })}
                  clearLabel={t("ClearPurpose")}
                  options={purposeOptions}
                  value={query.purpose}
                  onChange={(value) =>
                    // Each category has one purpose, so a switch to the other
                    // orphans it.
                    filter({
                      purpose: value,
                      category:
                        value &&
                        categories.find((item) => item.urlReq === category)
                          ?.purpose?.key !== value
                          ? ""
                          : category,
                    })
                  }
                />
              )}
          </div>

          {!hidden.has("lang") && (
            <LanguageSelect
              value={query.locale}
              onChange={(locale) => {
                storeLocale(locale);
                filter({ locale });
              }}
            />
          )}
        </div>

        <div className={styles["toolbar-types"]}>
          <TypeFilter
            selected={query.types[0]}
            onSelect={(ext) => filter({ types: [ext] })}
          />
        </div>
      </header>

      {/* Focusable because Chromium only made scrollers keyboard-focusable in
          127, and Desktop is on 109 — without it PageDown does nothing. */}
      <div
        ref={listRef}
        tabIndex={0}
        className={styles.scroll}
        onScroll={(event) => setScrolled(event.currentTarget.scrollTop > 0)}
      >
        {status === "loading" && (
          <p className={styles.notice}>{t("Loading")}</p>
        )}

        {status === "error" && (
          <p className={styles.notice}>
            {t("LoadFailed")}{" "}
            <button
              type="button"
              className={styles["notice-retry"]}
              onClick={() => setReloadToken((token) => token + 1)}
            >
              {t("Retry")}
            </button>
          </p>
        )}

        {status === "ready" &&
          (shown.length > 0 ? (
            <CardGrid templates={shown} onSelect={setSelected} />
          ) : (
            <EmptyState
              hasFilters={hasFacetFilters}
              onClearFilters={clearFilters}
            />
          ))}
      </div>

      {/* `Pagination` renders nothing for a single page, and an empty footer
          would still hold its padding. */}
      {status === "ready" && pages > 1 && (
        <footer className={styles.footer}>
          <Pagination
            page={page}
            pages={pages}
            onChange={(next) => {
              update({ page: next });
              listRef.current?.scrollTo({ top: 0 });
            }}
          />
        </footer>
      )}

      <TemplateModal
        template={selected}
        onClose={() => setSelected(null)}
        onUse={(template) => {
          requestOpenTemplate(template);
          setSelected(null);
        }}
      />
    </div>
  );
};

export { App };
