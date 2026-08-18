import { useEffect, useState, type FormEvent } from "react";
import { useTranslation } from "react-i18next";
import {
  CountBadge,
  CrossIcon,
  FiltersIcon,
  IconButton,
  SearchIcon,
} from "../../ui";
import styles from "./SearchBar.module.scss";

interface ISearchBar {
  /** Applied query, owned by the panel state. */
  value: string;
  onSearch: (query: string) => void;
  /** Present only at narrow widths, where the filter panel is a drawer. */
  onOpenFilters?: () => void;
  activeFilterCount: number;
}

/**
 * Figma search row: a 36px input that flexes, plus a fixed 77px "Search"
 * button sharing the input's hairline.
 *
 * The draft lives here and is only lifted on submit, which is what the mockup
 * implies (there is an explicit Search button, not a live filter).
 */
const SearchBar = ({
  value,
  onSearch,
  onOpenFilters,
  activeFilterCount,
}: ISearchBar) => {
  const { t } = useTranslation("EmbedPanel");
  const { t: tMain } = useTranslation("MainTemplate");
  const [draft, setDraft] = useState(value);

  // Keep the box in sync when the query is reset from outside (view switch,
  // locale change, "clear all filters").
  useEffect(() => setDraft(value), [value]);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    onSearch(draft.trim());
  };

  // Every other filter in the panel switches off by clicking it again; without
  // this the only way out of a search was select-all, delete, Enter.
  const clear = () => {
    setDraft("");
    onSearch("");
  };

  return (
    <form className={styles["search-bar"]} onSubmit={submit} role="search">
      <div className={styles["search-bar-field"]}>
        <SearchIcon className={styles["search-bar-icon"]} aria-hidden="true" />
        <input
          className={styles["search-bar-input"]}
          type="search"
          value={draft}
          placeholder={t("SearchPlaceholder")}
          aria-label={t("SearchPlaceholder")}
          onChange={(e) => setDraft(e.target.value)}
        />
        {(draft || value) && (
          <IconButton
            className={styles["search-bar-clear"]}
            aria-label={tMain("ClearAllFilters")}
            onClick={clear}
          >
            <CrossIcon size={16} aria-hidden="true" />
          </IconButton>
        )}
      </div>
      <button type="submit" className={styles["search-bar-button"]}>
        {t("Search")}
      </button>
      {onOpenFilters && (
        <button
          type="button"
          className={styles["search-bar-filters"]}
          onClick={onOpenFilters}
        >
          <FiltersIcon aria-hidden="true" />
          <CountBadge count={activeFilterCount} />
        </button>
      )}
    </form>
  );
};

export { SearchBar };
