import { useCallback, useEffect, useMemo, useState } from "react";
import {
  getCategoriesByPurpose,
  getCountries,
  getFilteredForms,
  getFormsByTypes,
  getPurposes,
  groupFormsByExt,
} from "@src/components/templates/Main/Main.utils";
import { ALLOWED_TYPES, type TAllowedTypes } from "@src/utils/allowedTypes";
import {
  loadFavorites,
  loadRecent,
  saveFavorites,
  saveRecent,
  touchRecent,
  type IRecentEntry,
} from "../storage";
import type { ITemplateData, TTemplate } from "./EmbedApp.types";

/** Left-nav destination. Mirrors the three Figma nav items. */
type TView = "all" | "recent" | "favorites";

/** Figma "Last opened" chips, shown only in the Recent view. */
type TLastOpened = "3days" | "week" | "3month" | "year";

const LAST_OPENED_DAYS: Record<TLastOpened, number> = {
  "3days": 3,
  week: 7,
  "3month": 90,
  year: 365,
};

const DAY_MS = 24 * 60 * 60 * 1000;

const toggle = <T>(list: T[], value: T): T[] =>
  list.includes(value) ? list.filter((v) => v !== value) : [...list, value];

/**
 * Templates stored on the machine come first in every list.
 *
 * A stable partition rather than a comparator, so whatever order each group
 * already had survives -- source order in All Templates and Favorites, recency
 * in Recent.
 */
const localFirst = (forms: TTemplate[]): TTemplate[] => {
  const local: TTemplate[] = [];
  const cloud: TTemplate[] = [];
  for (const form of forms) (form.__local ? local : cloud).push(form);
  return local.length ? [...local, ...cloud] : forms;
};

/**
 * The Main.utils helpers are typed against the site's IFormsData item, which is
 * a subset of the embed's ITemplate (it has no file_oform, no __local fields).
 * They only ever filter and sort, never construct, so the items coming out are
 * the very objects that went in -- narrow the type back.
 */
const asTemplates = (forms: unknown[]): TTemplate[] => forms as TTemplate[];

const usePanelState = (data: ITemplateData) => {
  const forms = data?.data ?? [];

  const [view, setView] = useState<TView>("all");
  const [query, setQuery] = useState("");
  const [types, setTypes] = useState<TAllowedTypes[]>([]);
  const [countries, setCountries] = useState<string[]>([]);
  const [subcategories, setSubcategories] = useState<string[]>([]);
  const [lastOpened, setLastOpened] = useState<TLastOpened | null>(null);

  const [favorites, setFavorites] = useState<string[]>(loadFavorites);
  const [recent, setRecent] = useState<IRecentEntry[]>(loadRecent);

  // Purpose is single-select and always has a value — the mockups never show
  // it unset. Default to the first purpose the catalogue reports (Business).
  const purposes = useMemo(() => getPurposes(forms), [forms]);
  const defaultPurpose = purposes[0]?.key ?? null;
  const [purpose, setPurpose] = useState<string | null>(null);
  const activePurpose = purpose ?? defaultPurpose;

  useEffect(() => saveFavorites(favorites), [favorites]);
  useEffect(() => saveRecent(recent), [recent]);

  const toggleFavorite = useCallback((url: string) => {
    setFavorites((current) => toggle(current, url));
  }, []);

  /** Call when a template is actually opened, so it lands in Recent. */
  const markOpened = useCallback((url: string) => {
    setRecent((current) => touchRecent(current, url));
  }, []);

  const clearFilters = useCallback(() => {
    setTypes([]);
    setCountries([]);
    setSubcategories([]);
    setPurpose(null);
    setLastOpened(null);
  }, []);

  /**
   * Switching nav destinations swaps which filter sections are on screen, so
   * the ones going away must not keep narrowing the new list.
   *
   * This runs on selection rather than in an effect keyed on `view`: React
   * bails out when the value is unchanged, so an effect never fired for a
   * re-click of the current item -- leaving a user who had searched into an
   * empty result set stuck on "No results found" with the query still applied.
   */
  const selectView = useCallback(
    (next: TView) => {
      setView(next);
      clearFilters();
      setQuery("");
    },
    [clearFilters],
  );

  // --- source list for the active view -------------------------------------

  const recentTs = useMemo(
    () => new Map(recent.map((e) => [e.url, e.ts])),
    [recent],
  );
  const favoriteSet = useMemo(() => new Set(favorites), [favorites]);

  const viewForms = useMemo(() => {
    if (view === "favorites") {
      return forms.filter((form) => favoriteSet.has(form.url));
    }
    if (view === "recent") {
      const cutoff = lastOpened
        ? Date.now() - LAST_OPENED_DAYS[lastOpened] * DAY_MS
        : 0;
      return forms
        .filter((form) => {
          const ts = recentTs.get(form.url);
          return ts !== undefined && ts >= cutoff;
        })
        .sort(
          (a, b) => (recentTs.get(b.url) ?? 0) - (recentTs.get(a.url) ?? 0),
        );
    }
    return forms;
  }, [forms, view, favoriteSet, recentTs, lastOpened]);

  // --- filters -------------------------------------------------------------

  // Progressive narrowing, matching the site: the Country list reflects the
  // Type selection, and the Category tree reflects Type + Country.
  const formsByType = useMemo(
    () => asTemplates(getFormsByTypes(viewForms, types)),
    [viewForms, types],
  );
  const formsByTypeAndCountry = useMemo(
    () =>
      asTemplates(
        getFilteredForms(viewForms, { type: types, country: countries }),
      ),
    [viewForms, types, countries],
  );

  const filteredForms = useMemo(() => {
    // Purpose sits in the panel as a filter section with the same weight as
    // Type and Country, so it narrows the list too -- not only the category
    // tree underneath it.
    //
    // Local templates are exempt from it. Purpose is the one filter that is
    // always active without the user ever choosing it, and a template's purpose
    // comes from CMS taxonomy that on-device files often lack: matched by name
    // (embed/local-templates/*.json) they land under whichever purpose that
    // entry carries, and unmatched ones carry none at all. Applying Purpose to
    // them would hide a personal template behind the Business default and hide
    // an unmatched one under every purpose -- i.e. permanently. Every filter
    // the user picks deliberately still applies.
    const cloud = asTemplates(
      getFilteredForms(
        viewForms.filter((form) => !form.__local),
        {
          type: types,
          country: countries,
          purpose: activePurpose ? [activePurpose] : [],
          subcategory: subcategories,
        },
      ),
    );
    const local = asTemplates(
      getFilteredForms(
        viewForms.filter((form) => form.__local),
        { type: types, country: countries, subcategory: subcategories },
      ),
    );
    return local.length ? [...local, ...cloud] : cloud;
  }, [viewForms, types, countries, activePurpose, subcategories]);

  const trimmed = query.trim().toLowerCase();
  const results = useMemo(
    () =>
      localFirst(
        trimmed
          ? filteredForms.filter((form) =>
              form.name_form.toLowerCase().includes(trimmed),
            )
          : filteredForms,
      ),
    [filteredForms, trimmed],
  );

  // --- data for the filter panel -------------------------------------------

  const typeCounts = useMemo(() => {
    const groups = groupFormsByExt(viewForms);
    return ALLOWED_TYPES.reduce<Record<string, number>>((acc, ext) => {
      acc[ext] = groups[ext]?.length ?? 0;
      return acc;
    }, {});
  }, [viewForms]);

  const countryOptions = useMemo(
    () => getCountries(formsByType),
    [formsByType],
  );

  const categoryGroups = useMemo(() => {
    const byPurpose = getCategoriesByPurpose(formsByTypeAndCountry);
    return activePurpose ? (byPurpose[activePurpose] ?? []) : [];
  }, [formsByTypeAndCountry, activePurpose]);

  const activeFilterCount =
    types.length + countries.length + subcategories.length;

  return {
    // state
    view,
    query,
    types,
    countries,
    subcategories,
    purpose: activePurpose,
    purposes,
    lastOpened,
    favorites: favoriteSet,
    hasRecent: recent.length > 0,
    // derived
    results,
    typeCounts,
    countryOptions,
    categoryGroups,
    activeFilterCount,
    isSearching: trimmed.length > 0,
    // actions
    setView: selectView,
    setQuery,
    setPurpose,
    setLastOpened,
    toggleType: (ext: TAllowedTypes) => setTypes((c) => toggle(c, ext)),
    toggleCountry: (code: string) => setCountries((c) => toggle(c, code)),
    toggleSubcategory: (urlReq: string) =>
      setSubcategories((c) => toggle(c, urlReq)),
    toggleFavorite,
    markOpened,
    clearFilters,
    isFavorite: (template: TTemplate) => favoriteSet.has(template.url),
  };
};

export { usePanelState, LAST_OPENED_DAYS };
export type { TView, TLastOpened };
