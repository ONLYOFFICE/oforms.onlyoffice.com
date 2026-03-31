import StyledSelect from "./styled-select";
import { useState, useEffect, useRef } from "react";
import Text from "@components/common/text";

const CategorySelect = ({ t, locale, label, labelMore, placeholder, selected, setSelected, errorText, valid, setValid, error, setError, setCategoryId, searchValue, setSearchValue, categoriesData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedError, setSelectedError] = useState(false);
  const selectRef = useRef();
  const inputRef = useRef();
  const filteredOptions = categoriesData.filter((option) => option.attributes.categorie.toLowerCase().includes(searchValue.toLowerCase()));

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      };

      if (selected.length === 0) {
        setSelectedError(true);
        setError(true);
      };

      setSearchValue("");
    };

    typeof window !== "undefined" && isOpen && window.addEventListener("click", handleClickOutside);

    if (!isOpen && selected.length === 0) {
      setValid(false);
    } else if (!isOpen && selected.length > 0) {
      setValid(true);
    };

    if (selected.length > 5) {
      setSelectedError(true);
      setError(true);
      setValid(false);
    };

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  const toggleOpen = () => {
    setValid(false);
    setIsOpen(!isOpen);
    setSearchValue("");
    inputRef.current.focus();
  };

  const handleOptionClick = (option) => {
    if (selected.includes(option.attributes.categorie)) {
      setSelected(selected.filter((item) => item !== option.attributes.categorie));
    } else {
      setSelected([...selected, option.attributes.categorie]);
    };

    setCategoryId((prev) => {
      if (prev.includes(option.id)) {
        return prev.filter((select) => select !== option.id);
      } else {
        return [...prev, option.id];
      };
    });

    if (selected.length + 1 === 0) {
      setSelectedError(true);
      setError(true);
    } else {
      setSelectedError(false);
      setError(false);
    };

    setIsOpen(false);
    setSearchValue("");
  };

  const handleClearSelection = () => {
    setSelected([]);
    setSearchValue("");
    setIsOpen(false);
    setSelectedError(true);
    setError(true);
  };

  return (
    <StyledSelect $locale={locale} className={selectedError && error ? "error" : ""}>
      <label className="label" htmlFor="category-input">{label} <Text className="label-more">{labelMore}</Text></label>

      <div ref={selectRef} className="select-wrapper">
        <button onClick={toggleOpen} className={`select category-select ${isOpen ? "open" : ""} ${valid ? "valid" : ""}`} type="button">
          {!isOpen && selected.length === 0 &&
            <Text className="placeholder">{placeholder}</Text>
          }
          <span className="select-value">{selected.join(', ')}</span>
          <input
            ref={inputRef}
            onChange={(e) => setSearchValue(e.target.value)}
            id="category-input"
            className={`select-input ${isOpen ? "active" : ""}`}
            type="text"
            value={searchValue}
          />
          <Text className="select-length">{selected.length > 0 && `(${selected.length})`}</Text>
        </button>
        {isOpen && (
          <div className="select-options">
            {filteredOptions.length > 0 ?
              <>
                <button className="select-option reset" onClick={handleClearSelection} type="button">
                  {t("Reset")}
                </button>
                {filteredOptions.map((option) => (
                  <button
                    onClick={() => handleOptionClick(option)}
                    key={option.attributes.categorie}
                    className={`select-option ${selected.includes(option.attributes.categorie) ? "selected" : ""}`}
                    type="button"
                  >
                    {option.attributes.categorie}
                  </button>
                ))}
              </>
              :
              <div className="select-option no-options">{t("No options")}</div>
            }
          </div>
        )}
      </div>
      {!isOpen && selectedError && <Text className="error-text">{selected.length > 5 ? t("maximum 5") : errorText}</Text>}
    </StyledSelect>
  );
};

export default CategorySelect;