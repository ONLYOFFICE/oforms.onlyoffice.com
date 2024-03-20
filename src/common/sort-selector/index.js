import StyledSortSelector from "./styled-sort-selector";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import { ReactSVG } from "react-svg";

const SortSelector = ({ t, sort }) => {
  const router = useRouter();
  const [typeSortData, setTypeSortData] = useState(t("NameA-Z"));
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (sort === "desc") {
      setTypeSortData(t("NameZ-A"));
    } else {
      setTypeSortData(t("NameA-Z"));
    }
  }, [sort]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeDropdown();
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

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
    <StyledSortSelector ref={dropdownRef} onMouseEnter={() => setDropdownOpen(true)} onMouseLeave={() => setDropdownOpen(false)}>
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