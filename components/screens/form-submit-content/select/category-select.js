import StyledSelect from "./styled-select";
import { useState, useEffect, useRef } from "react";
import Text from "@components/common/text";

const CategorySelect = ({ t, label, labelMore, placeholder, selected, setSelected, errorText, valid, setValid, error, setError, setCategoryId, searchValue, setSearchValue, categoriesData }) => {
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
    <StyledSelect className={selectedError && error ? "error" : ""}>
      <Text className="label">{label} <Text className="label-more">{labelMore}</Text></Text>

      <div ref={selectRef} className="select-wrapper">
        <div onClick={toggleOpen} className={`select category-select ${isOpen ? "open" : ""} ${valid ? "valid" : ""}`}>
          {!isOpen && selected.length === 0 &&
            <Text className="placeholder">{placeholder}</Text>
          }
          <div className="select-value">{selected.join(', ')}</div>
          <input
            ref={inputRef}
            onChange={(e) => setSearchValue(e.target.value)}
            className={`select-input ${isOpen ? "active" : ""}`}
            type="text"
            value={searchValue}
          />
          <Text className="select-length">{selected.length > 0 && `(${selected.length})`}</Text>
        </div>
        {isOpen && (
          <div className="select-options">
            {filteredOptions.length > 0 ?
              <>
                <div className="select-option reset" onClick={handleClearSelection}>
                  {t("Reset")}
                </div>
                {filteredOptions.map((option) => (
                  <div
                    onClick={() => handleOptionClick(option)}
                    key={option.attributes.categorie}
                    className={`select-option ${selected.includes(option.attributes.categorie) ? "selected" : ""}`}
                  >
                    {option.attributes.categorie}
                  </div>
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