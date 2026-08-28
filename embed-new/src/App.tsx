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

import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { CardGrid } from "./components/CardGrid/CardGrid";
import { EmptyState } from "./components/EmptyState/EmptyState";
import { FilterDrawer } from "./components/FilterDrawer/FilterDrawer";
import { LanguageSelect } from "./components/LanguageSelect/LanguageSelect";
import { Pagination } from "./components/Pagination/Pagination";
import { SearchBox } from "./components/SearchBox/SearchBox";
import { SortSelect } from "./components/SortSelect/SortSelect";
import { TemplateModal } from "./components/TemplateModal/TemplateModal";
import { FiltersIcon } from "./components/icons";
import { loadCatalog } from "./data";
import {
  getCategories,
  getCountries,
  getFilteredForms,
  getFormsByTypes,
  getPurposes,
  groupFormsByExt,
  sortForms,
} from "./lib/filters";
import { initI18n } from "./i18n";
import { isRtlLocale, type Locale } from "./locale";
import { readQuery, toggleValue, writeQuery, type ICatalogQuery } from "./query";
import { notifyReady, onHostMessage, requestOpenTemplate } from "./bridge";
import { applyTheme } from "./theme";
import { TYPE_ORDER, type ITemplate, type TAllowedTypes } from "./types";
import styles from "./App.module.scss";

const PAGE_SIZE = 24;

const App = () => {
  const { t } = useTranslation("embed");

  const [query, setQuery] = useState<ICatalogQuery>(readQuery);
  const [templates, setTemplates] = useState<ITemplate[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    "loading",
  );
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selected, setSelected] = useState<ITemplate | null>(null);
  // Bumped to re-run the fetch when the locale has not changed (retry).
  const [reloadToken, setReloadToken] = useState(0);

  const update = useCallback((patch: Partial<ICatalogQuery>) => {
    setQuery((prev) => {
      const next = { ...prev, ...patch };
      writeQuery(next);
      return next;
    });
  }, []);

  // Any change to what is being shown returns to the first page.
  const filter = useCallback(
    (patch: Partial<ICatalogQuery>) => update({ ...patch, page: 1 }),
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
        setTemplates(catalog.data);
        setStatus("ready");
      } catch (error) {
        if (controller.signal.aborted) return;
        console.error("[oforms-embed] failed to load the catalog", error);
        setStatus("error");
      }
    })();

    return () => controller.abort();
  }, [query.locale, reloadToken]);

  // Direction follows the locale.
  useEffect(() => {
    document.documentElement.lang = query.locale;
    document.documentElement.dir = isRtlLocale(query.locale) ? "rtl" : "ltr";
  }, [query.locale]);

  // Live theme / font / locale updates from the desktop host.
  useEffect(() => {
    const stop = onHostMessage((message) => {
      if (message.type === "theme" && message.tokens) {
        applyTheme(message.tokens, document.documentElement);
      } else if (message.type === "font" && message.family) {
        document.documentElement.style.setProperty(
          "--font-family-base",
          message.family,
        );
      } else if (message.type === "locale" && message.value) {
        filter({ locale: message.value as Locale });
      }
    });

    notifyReady();
    return stop;
  }, [filter]);

  const typeCounts = useMemo(() => {
    const groups = groupFormsByExt(templates);
    return Object.fromEntries(
      TYPE_ORDER.map((ext) => [ext, groups[ext]?.length ?? 0]),
    ) as Record<TAllowedTypes, number>;
  }, [templates]);

  const countries = useMemo(
    () => getCountries(getFormsByTypes(templates, query.types)),
    [templates, query.types],
  );

  const purposes = useMemo(() => {
    const counts = new Map<string, number>();
    templates.forEach((form) => {
      const keys = new Set<string>();
      form.subcategories?.forEach((sub) =>
        sub.parent_categories?.forEach((cat) => {
          if (cat.purpose) keys.add(cat.purpose.key);
        }),
      );
      keys.forEach((key) => counts.set(key, (counts.get(key) ?? 0) + 1));
    });
    return getPurposes(templates).map((purpose) => ({
      ...purpose,
      count: counts.get(purpose.key) ?? 0,
    }));
  }, [templates]);

  const categories = useMemo(
    () =>
      getCategories(
        getFilteredForms(templates, {
          type: query.types,
          country: query.countries,
          purpose: query.purposes,
        }),
      ),
    [templates, query.types, query.countries, query.purposes],
  );

  const visible = useMemo(() => {
    // Country only narrows the result once a subcategory is chosen — this
    // matches the site and is deliberate, not an oversight.
    const filtered = getFilteredForms(templates, {
      type: query.types,
      country: query.subcategories.length ? query.countries : [],
      subcategory: query.subcategories,
      purpose: query.purposes,
    });

    const term = query.q.trim().toLowerCase();
    const searched = term
      ? filtered.filter((form) =>
          form.name_form.toLowerCase().includes(term),
        )
      : filtered;

    return sortForms(searched, query.sort);
  }, [templates, query]);

  const pages = Math.max(1, Math.ceil(visible.length / PAGE_SIZE));
  const page = Math.min(query.page, pages);
  const shown = visible.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const hasFilters =
    query.types.length > 0 ||
    query.countries.length > 0 ||
    query.subcategories.length > 0 ||
    query.purposes.length > 0;

  const clearFilters = () =>
    filter({ types: [], countries: [], subcategories: [], purposes: [] });

  return (
    <div className={styles.app}>
      <div className={styles.toolbar}>
        <div className={styles["toolbar-left"]}>
          <button
            type="button"
            className={styles["toolbar-filters"]}
            onClick={() => setIsDrawerOpen(true)}
          >
            <FiltersIcon />
            {t("Filters")}
            {hasFilters && (
              <span className={styles["toolbar-filters-dot"]} aria-hidden />
            )}
          </button>

          <span
            className={styles["toolbar-count"]}
            style={status === "ready" ? undefined : { visibility: "hidden" }}
          >
            <span className={styles["toolbar-count-value"]}>
              {visible.length}
            </span>{" "}
            {t("Templates")}
          </span>
        </div>

        <SearchBox value={query.q} onChange={(q) => filter({ q })} />

        <div className={styles["toolbar-controls"]}>
          <SortSelect
            value={query.sort}
            onChange={(sort) => filter({ sort })}
          />

          <LanguageSelect
            value={query.locale}
            onChange={(locale) => filter({ locale })}
          />
        </div>
      </div>

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
          <>
            <CardGrid templates={shown} onSelect={setSelected} />
            <Pagination
              page={page}
              pages={pages}
              onChange={(next) => {
                update({ page: next });
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />
          </>
        ) : (
          <EmptyState hasFilters={hasFilters} onClearFilters={clearFilters} />
        ))}

      <FilterDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        typeCounts={typeCounts}
        countries={countries}
        categories={categories}
        purposes={purposes}
        selectedTypes={query.types}
        selectedCountries={query.countries}
        selectedSubcategories={query.subcategories}
        selectedPurposes={query.purposes}
        onToggleType={(value) =>
          filter({ types: toggleValue(query.types, value) })
        }
        onToggleCountry={(value) =>
          filter({ countries: toggleValue(query.countries, value) })
        }
        onToggleSubcategory={(value) =>
          filter({ subcategories: toggleValue(query.subcategories, value) })
        }
        onTogglePurpose={(value) =>
          filter({ purposes: toggleValue(query.purposes, value) })
        }
        onClearAll={clearFilters}
      />

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
