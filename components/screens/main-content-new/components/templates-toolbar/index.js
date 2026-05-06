import { useState, useRef, useEffect, useId } from "react";
import searchIcon from "@public/icons/templates/search_icon.svg";
import arrowIcon from "@public/icons/templates/arrow.svg";
import StyledToolbar from "./styled-templates-toolbar";

export const SORT_OPTIONS = [
  { value: "newest", label: "Newest - Oldest" },
  { value: "oldest", label: "Oldest - Newest" },
  { value: "popular", label: "Most Popular" },
  { value: "az", label: "A → Z" },
];

const SEARCH_DEBOUNCE_MS = 300;

const TemplatesToolbar = ({
  totalCount,
  searchValue,
  onSearchChange,
  sortValue = "newest",
  onSortChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const sortRef = useRef(null);
  const sortMenuId = useId();
  const searchInputId = useId();

  const [localSearch, setLocalSearch] = useState(searchValue ?? "");

  useEffect(() => {
    setLocalSearch(searchValue ?? "");
  }, [searchValue]);

  useEffect(() => {
    if (localSearch === (searchValue ?? "")) return;
    const id = setTimeout(() => onSearchChange?.(localSearch), SEARCH_DEBOUNCE_MS);
    return () => clearTimeout(id);
  }, [localSearch, searchValue, onSearchChange]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (sortRef.current && !sortRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const currentSort = SORT_OPTIONS.find((o) => o.value === sortValue) ?? SORT_OPTIONS[0];

  const handleSortPick = (value) => {
    onSortChange?.(value);
    setIsOpen(false);
  };

  return (
    <StyledToolbar>
      <div className="toolbar-left">
        <div className="sort" ref={sortRef}>
          <span className="sort-label">Sort by:</span>
          <button
            type="button"
            className={`sort-trigger ${isOpen ? "open" : ""}`}
            onClick={() => setIsOpen((v) => !v)}
            aria-haspopup="true"
            aria-expanded={isOpen}
            aria-controls={sortMenuId}
          >
            {currentSort.label}
            <img className="chevron" src={arrowIcon.src} alt="" aria-hidden="true" />
          </button>

          {isOpen && (
            <div id={sortMenuId} className="sort-menu">
              {SORT_OPTIONS.map((option) => {
                const isActive = option.value === sortValue;
                return (
                  <button
                    key={option.value}
                    type="button"
                    aria-pressed={isActive}
                    className={`sort-option ${isActive ? "active" : ""}`}
                    onClick={() => handleSortPick(option.value)}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          )}
        </div>
        <span className="total-count" aria-live="polite">
          {totalCount} Documents
        </span>
      </div>

      <div className="search" role="search">
        <label htmlFor={searchInputId} className="visually-hidden">
          Search templates
        </label>
        <img className="search-icon" src={searchIcon.src} alt="" aria-hidden="true" />
        <input
          id={searchInputId}
          type="search"
          className="search-input"
          placeholder="Search templates (invoice, contract, budget...)"
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
        />
        {localSearch && (
          <button
            type="button"
            className="search-clear"
            aria-label="Clear search"
            onClick={() => {
              setLocalSearch("");
              onSearchChange?.("");
            }}
          >
            <span aria-hidden="true">×</span>
          </button>
        )}
      </div>
    </StyledToolbar>
  );
};

export default TemplatesToolbar;
