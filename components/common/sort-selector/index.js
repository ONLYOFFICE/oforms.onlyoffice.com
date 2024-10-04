import StyledSortSelector from "./styled-sort-selector";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

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
      <button onClick={() => setDropdownOpen(!isDropdownOpen)} id="sort-btn" className="sort-btn">
        <span className="sort-label">{t("Sort by")}{locale === "ja" || locale === "zh" ? "：" : locale === "pt" ? ": " : ":"}</span>
        <span className="sort-name">{typeSortData}</span>
        <svg className={`sort-icon ${isDropdownOpen ? "open" : ""}`} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M11.4966 12.4016L8.31194 9.22434C8.01306 8.92615 7.52725 8.9249 7.22685 9.22155C6.92644 9.51821 6.92521 10.0004 7.22408 10.2986L10.9471 14.0131C11.1147 14.1803 11.3411 14.2541 11.5606 14.2344C11.738 14.2212 11.9117 14.1471 12.047 14.0121L15.7652 10.3025C16.064 10.0043 16.0628 9.52206 15.7624 9.2254C15.462 8.92875 14.9762 8.93 14.6773 9.22819L11.4966 12.4016Z" fill="black" fillOpacity="0.8"/>
        </svg>
      </button>
      {isDropdownOpen && (
        <ul className="sort-dropdown">
          <li>
            <button onClick={() => handleSortClick("asc")} id="sort-dropdown-asc-btn" className={`sort-dropdown-btn ${sort === "asc" ? "active" : ""}`}>{t("Newest - Oldest")}</button>
          </li>
          <li>
            <button onClick={() => handleSortClick("desc")} id="sort-dropdown-desc-btn" className={`sort-dropdown-btn ${sort === "desc" ? "active" : ""}`}>{t("Oldest - Newest")}</button>
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