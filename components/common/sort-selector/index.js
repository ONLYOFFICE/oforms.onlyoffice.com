import StyledSortSelector from "./styled-sort-selector";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { ReactSVG } from "react-svg";

const SortSelector = ({ t, locale, sort }) => {
  const router = useRouter();
  const [typeSortData, setTypeSortData] = useState(t("Newest - Oldest"));
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    if (sort === "desc") {
      setTypeSortData(t("Oldest - Newest"));
    } else {
      setTypeSortData(t("Newest - Oldest"));
    }
  }, [t, sort]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isDropdownOpen && !event.target.closest(".sort-selector")) {
        closeDropdown();
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isDropdownOpen]);

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  const handleSortClick = (sort) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, _sort: sort }
    }, undefined, { scroll: false });

    closeDropdown();
  };

  return (
    <StyledSortSelector className="sort-selector" onMouseEnter={() => setDropdownOpen(true)} onMouseLeave={() => setDropdownOpen(false)}>
      <button onClick={() => setDropdownOpen(!isDropdownOpen)} className="sort-btn">
        <span className="sort-label">{t("Sort by")}{locale === "ja" || locale === "zh" ? "：" : locale === "pt" ? ": " : ":"}</span>
        <span className="sort-name">{typeSortData}</span>
        <ReactSVG className={`sort-icon ${isDropdownOpen ? "open" : ""}`} src="/icons/chevron-down.svg" />
      </button>
      {isDropdownOpen && (
        <ul className={`sort-dropdown ${locale === "ar" && "ar"}`}>
          <li>
            <button onClick={() => handleSortClick("asc")} className={`sort-dropdown-btn ${sort === "asc" ? "active" : ""}`}>{t("Newest - Oldest")}</button>
          </li>
          <li>
            <button onClick={() => handleSortClick("desc")} className={`sort-dropdown-btn ${sort === "desc" ? "active" : ""}`}>{t("Oldest - Newest")}</button>
          </li>
        </ul>
      )}
    </StyledSortSelector>
  );
};

SortSelector.propTypes = {
  t: PropTypes.func,
  sort: PropTypes.string
};

export default SortSelector;