import { useState, useRef, useEffect } from "react";
import searchIcon from "@public/icons/templates/search_icon.svg";
import arrowIcon from "@public/icons/templates/arrow.svg";
import StyledToolbar from "./styled-templates-toolbar";

export const SORT_OPTIONS = [
  { value: "newest", label: "Newest - Oldest" },
  { value: "oldest", label: "Oldest - Newest" },
  { value: "popular", label: "Most Popular" },
  { value: "az", label: "A → Z" },
];

const TemplatesToolbar = ({
  totalCount,
  searchValue,
  onSearchChange,
  sortValue = "newest",
  onSortChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const sortRef = useRef(null);

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
            aria-expanded={isOpen}
          >
            {currentSort.label}
            <img className="chevron" src={arrowIcon.src} alt="" aria-hidden="true" />
          </button>

          {isOpen && (
            <div className="sort-menu" role="listbox">
              {SORT_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  role="option"
                  aria-selected={option.value === sortValue}
                  className={`sort-option ${option.value === sortValue ? "active" : ""}`}
                  onClick={() => handleSortPick(option.value)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>
        <span className="total-count">{totalCount} Documents</span>
      </div>

      <div className="search">
        <img className="search-icon" src={searchIcon.src} alt="" aria-hidden="true" />
        <input
          type="text"
          className="search-input"
          placeholder="Search templates (invoice, contract, budget...)"
          value={searchValue ?? ""}
          onChange={(e) => onSearchChange?.(e.target.value)}
        />
      </div>
    </StyledToolbar>
  );
};

export default TemplatesToolbar;
