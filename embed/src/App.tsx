/*
 * Copyright (C) Ascensio System SIA, 2009-2026
 *
 * This program is a free software product. You can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License (AGPL)
 * version 3 as published by the Free Software Foundation, together with the
 * additional terms provided in the LICENSE file.
 *
 * This program is distributed WITHOUT ANY WARRANTY; without even the implied
 * warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. For
 * details, see the GNU AGPL at: https://www.gnu.org/licenses/agpl-3.0.html
 *
 * You can contact Ascensio System SIA by email at info@onlyoffice.com
 * or by postal mail at 20A-6 Ernesta Birznieka-Upisha Street, Riga,
 * LV-1050, Latvia, European Union.
 *
 * The interactive user interfaces in modified versions of the Program
 * are required to display Appropriate Legal Notices in accordance with
 * Section 5 of the GNU AGPL version 3.
 *
 * No trademark rights are granted under this License.
 *
 * All non-code elements of the Product, including illustrations,
 * icon sets, and technical writing content, are licensed under the
 * Creative Commons Attribution-ShareAlike 4.0 International License:
 * https://creativecommons.org/licenses/by-sa/4.0/legalcode
 *
 * This license applies only to such non-code elements and does not
 * modify or replace the licensing terms applicable to the Program's
 * source code, which remains licensed under the GNU Affero General
 * Public License v3.
 *
 * SPDX-License-Identifier: AGPL-3.0-only
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
import { Pagination } from "./components/Pagination/Pagination";
import { SearchBox } from "./components/SearchBox/SearchBox";
import { TemplateModal } from "./components/TemplateModal/TemplateModal";
import { TypeFilter } from "./components/TypeFilter/TypeFilter";
import { loadCatalog } from "./data";
import { getFilteredForms } from "./lib/filters";
import { initI18n } from "./i18n";
import {
  LANGUAGES,
  isRtlLocale,
  normalizeLocale,
  storeLang,
  type Locale,
} from "./locale";
import { readQuery, writeQuery, type ICatalogQuery } from "./query";
import { notifyReady, onHostMessage, requestOpenTemplate } from "./bridge";
import { applyTheme, isTheme } from "./theme";
import { PURPOSE_ORDER, purposeOf, type ITemplate } from "./types";
import styles from "./App.module.scss";

const PAGE_SIZE = 24;

// Opened directly, the page needs a heading saying what it is; in a frame the host
// already does.
const STANDALONE = "standalone" in document.documentElement.dataset;

const LANGUAGE_OPTIONS = LANGUAGES.map((item) => ({
  value: item.shortKey,
  label: item.longKey,
  lang: item.shortKey,
}));

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
  const [scrolled, setScrolled] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<HTMLDivElement>(null);

  // Templates come in this language; everything else on the page is `locale`.
  const lang = query.lang || query.locale;

  // Standalone, the document scrolls rather than the list: bring the toolbar
  // back, not the site header above it.
  const toListTop = useCallback(() => {
    listRef.current?.scrollTo({ top: 0 });
    const top = appRef.current?.offsetTop ?? 0;
    if (window.scrollY > top) window.scrollTo({ top });
  }, []);

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
      toListTop();
    },
    [update, toListTop],
  );

  // Only ever one catalog at a time, so no caching layer is needed.
  useEffect(() => {
    const controller = new AbortController();
    setStatus("loading");

    (async () => {
      try {
        const catalog = await loadCatalog(lang, controller.signal);
        if (controller.signal.aborted) return;
        setTemplates(catalog);
        setStatus("ready");
      } catch (error) {
        if (controller.signal.aborted) return;
        console.error("[oforms-embed] failed to load the catalog", error);
        setStatus("error");
      }
    })();

    return () => controller.abort();
  }, [lang, reloadToken]);

  // Layout effect, or `ar` paints one LTR frame before the mirror — measured at
  // every CPU throttle level. Resources are bundled, so the language switch
  // re-renders inside the same commit.
  useLayoutEffect(() => {
    void initI18n(query.locale);
    document.documentElement.lang = query.locale;
    document.documentElement.dir = isRtlLocale(query.locale) ? "rtl" : "ltr";
  }, [query.locale]);

  useEffect(() => {
    const stop = onHostMessage((message) => {
      if (message.type === "theme" && isTheme(message.value)) {
        applyTheme(message.value, document.documentElement);
      } else if (message.type === "locale" && message.value) {
        filter({ locale: normalizeLocale(message.value) });
      }
    });

    notifyReady();
    return stop;
  }, [filter]);

  const purposeOptions = useMemo(
    () =>
      PURPOSE_ORDER.filter((key) =>
        templates.some((item) => purposeOf(item) === key),
      ).map((key) => ({
        value: key,
        label: t(`PurposeNames.${key}`, { defaultValue: key }),
      })),
    [templates, t],
  );

  const allCategories = useMemo(
    () => new Set(templates.map((item) => item.meta.category)),
    [templates],
  );

  // A slug from another locale would empty the grid with nothing
  // shown as selected.
  const category = allCategories.has(query.category) ? query.category : "";

  const available = useMemo(
    () =>
      new Set(
        getFilteredForms(templates, {
          type: query.type,
          purpose: query.purpose,
        }).map((item) => item.meta.category),
      ),
    [templates, query.type, query.purpose],
  );

  const collator = useMemo(
    () => new Intl.Collator(query.locale),
    [query.locale],
  );

  // What the type and purpose leave, plus the selected row even when they
  // leave none of it.
  const categoryOptions = [...allCategories]
    .filter((key) => available.has(key) || key === category)
    .map((key) => ({
      value: key,
      label: t(`CategoryNames.${key}`, { defaultValue: key }),
    }))
    .sort((a, b) => collator.compare(a.label, b.label));

  const visible = useMemo(() => {
    const filtered = getFilteredForms(templates, {
      type: query.type,
      category,
      purpose: query.purpose,
    });

    const term = query.q.trim().toLowerCase();
    return term
      ? filtered.filter((form) =>
          form.meta["card-title"].toLowerCase().includes(term),
        )
      : filtered;
  }, [templates, query.type, category, query.purpose, query.q]);

  const pages = Math.max(1, Math.ceil(visible.length / PAGE_SIZE));
  const page = Math.min(query.page, pages);
  const shown = visible.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  // Not type: it always has a value, so Clear would silently move the user to
  // Documents.
  const hasFilters = query.q !== "" || category !== "" || query.purpose !== "";

  const clearFilters = () => filter({ q: "", category: "", purpose: "" });

  return (
    <div ref={appRef} className={styles.app}>
      <header
        className={clsx(styles.header, scrolled && styles["header-scrolled"])}
      >
        {STANDALONE && (
          <h1 className={styles.title}>
            {t("FreeDocumentTemplatesAndFillableForms", { ns: "MainTemplate" })}
          </h1>
        )}

        <div className={styles.toolbar}>
          <SearchBox value={query.q} onChange={(q) => filter({ q })} />

          {(query.category === "" || templates.length > 0) && (
            <FilterButton
              label={t("Category")}
              clearLabel={t("ClearCategory")}
              options={categoryOptions}
              value={category}
              onChange={(value) => filter({ category: value })}
            />
          )}

          {(query.purpose === "" || templates.length > 0) && (
            <FilterButton
              label={t("Purpose", { ns: "MainTemplate" })}
              clearLabel={t("ClearPurpose")}
              options={purposeOptions}
              value={query.purpose}
              onChange={(value) => filter({ purpose: value })}
            />
          )}

          <FilterButton
            label={t("Language")}
            clearLabel={t("ClearLanguage")}
            options={LANGUAGE_OPTIONS}
            value={query.lang}
            onChange={(value) => {
              storeLang(value as Locale | "");
              filter({ lang: value as Locale | "" });
            }}
          />
        </div>

        <div className={styles["toolbar-types"]}>
          <TypeFilter
            selected={query.type}
            onSelect={(ext) => filter({ type: ext })}
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
            <CardGrid
              templates={shown}
              type={query.type}
              lang={lang}
              onSelect={setSelected}
            />
          ) : (
            <EmptyState hasFilters={hasFilters} onClearFilters={clearFilters} />
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
              toListTop();
            }}
          />
        </footer>
      )}

      <TemplateModal
        template={selected}
        lang={lang}
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
