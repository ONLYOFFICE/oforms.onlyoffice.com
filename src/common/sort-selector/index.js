import StyledSortSelector from "./styled-sort-selector";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { ReactSVG } from "react-svg";

const SortSelector = ({ t, sort }) => {
  const router = useRouter();
  const [typeSortData, setTypeSortData] = useState(t("NameA-Z"));
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    if (sort === "desc") {
      setTypeSortData(t("NameZ-A"));
    } else {
      setTypeSortData(t("NameA-Z"));
    }
  }, [sort]);

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
        <span className="sort-label">{t("SortBy")}</span>
        <span className="sort-name">{typeSortData}</span>
        <ReactSVG className={`sort-icon ${isDropdownOpen ? "open" : ""}`} src="/icons/chevron-down.svg" />
      </button>
      {isDropdownOpen && (
        <ul className="sort-dropdown">
          <li>
            <button onClick={() => handleSortClick("asc")} className="sort-dropdown-btn">{t("NameA-Z")}</button>
          </li>
          <li>
            <button onClick={() => handleSortClick("desc")} className="sort-dropdown-btn">{t("NameZ-A")}</button>
          </li>
        </ul>
      )}
    </StyledSortSelector>
  );
};

export default SortSelector;