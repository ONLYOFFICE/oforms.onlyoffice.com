import { useTranslation } from "react-i18next";
import { EmptyState } from "./EmptyState";
import { ListHeader } from "./ListHeader";
import { SearchBar } from "./SearchBar";
import { TemplateCard } from "./TemplateCard";
import { useIncrementalList } from "./useIncrementalList";
import type { ITemplateList } from "./TemplateList.types";
import styles from "./TemplateList.module.scss";

const TITLE_KEY = {
  all: "AllTemplates",
  recent: "Recents",
  favorites: "Favorites",
} as const;

const EMPTY_KEYS = {
  recent: ["NoRecentTitle", "NoRecentText"],
  favorites: ["NoFavoritesTitle", "NoFavoritesText"],
} as const;

const TemplateList = ({ state, onOpen, onOpenFilters }: ITemplateList) => {
  const { t } = useTranslation("EmbedPanel");
  // "No results found" already exists translated on the site's search namespace.
  const { t: tSearch } = useTranslation("searchresult");
  const { results, view } = state;

  // Reset paging whenever the list identity changes, not just its length --
  // two different filters can yield the same count.
  const { limit, sentinel, hasMore } = useIncrementalList(
    results.length,
    `${view}|${state.query}|${state.types.join()}|${state.countries.join()}|${state.purpose}|${state.subcategories.join()}|${state.lastOpened}`,
  );

  // Figma prints a count on All Templates and Favorites; only Recents omits it.
  const count =
    view === "recent" && !state.isSearching
      ? undefined
      : t("Results", { count: results.length });

  const searching = state.isSearching || view === "all";
  const [emptyTitleKey, emptyTextKey] = searching
    ? (["NoResultsTitle", "NoResultsText"] as const)
    : EMPTY_KEYS[view];

  return (
    <div className={styles["template-list"]}>
      <div className={styles["template-list-scroll"]}>
        <div className={styles["template-list-inner"]}>
          <SearchBar
            value={state.query}
            onSearch={state.setQuery}
            onOpenFilters={onOpenFilters}
            activeFilterCount={state.activeFilterCount}
          />
          <ListHeader title={t(TITLE_KEY[view])} count={count} />

          {results.length > 0 ? (
            <>
              <div className={styles["template-list-grid"]}>
                {results.slice(0, limit).map((template) => (
                  <TemplateCard
                    key={template.id}
                    template={template}
                    isFavorite={state.favorites.has(template.url)}
                    onOpen={onOpen}
                    onToggleFavorite={state.toggleFavorite}
                  />
                ))}
              </div>
              {hasMore && (
                <div
                  ref={sentinel}
                  className={styles["template-list-sentinel"]}
                  aria-hidden="true"
                />
              )}
            </>
          ) : (
            <EmptyState
              title={searching ? tSearch("NoResultsFound") : t(emptyTitleKey)}
              text={t(emptyTextKey)}
            />
          )}
        </div>
      </div>

      {/* Figma "Dimming": a 32px fade pinned over the bottom of the scroller. */}
      <div className={styles["template-list-fade"]} aria-hidden="true" />
    </div>
  );
};

export { TemplateList };
