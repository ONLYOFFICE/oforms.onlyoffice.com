import StyledSelect from "./styled-select";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Text from "@components/common/text";

const LanguageSelect = ({ t, label, labelMore, placeholder, selected, setSelected, errorText, valid, setValid, error, setError, setLanguageKey, setSearchValue, setCategory, setCategoryValid, setCategoryId, categoriesData, setCategoriesData, setCategoryError }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedError, setSelectedError] = useState(false);
  const selectRef = useRef();

  const languageData = [
    { title: t("English"), key: "en" },
    { title: t("Chinese (Simplified)"), key: "zh" },
    { title: t("French"), key: "fr" },
    { title: t("German"), key: "de" },
    { title: t("Portuguese"), key: "pt" },
    { title: t("Spanish"), key: "es" }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      };

      if (selected.length === 0) {
        setSelectedError(true);
        setError(true);
      };
    };

    typeof window !== "undefined" && isOpen && window.addEventListener("click", handleClickOutside);

    if (!isOpen && selected.length === 0) {
      setValid(false);
    } else if (!isOpen && selected.length > 0) {
      setValid(true);
    };

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  const toggleOpen = () => {
    setValid(false);
    setIsOpen(!isOpen);
  };

  const handleOptionClick = async (option) => {
    setSelected(option.title);
    setLanguageKey(option.key);

    if (selected.length + 1 === 0) {
      setSelectedError(true);
      setError(true);
    } else {
      setSelectedError(false);
      setError(false);
    };

    setIsOpen(false);
    const locale = option.key;
    const res = await axios.post("/api/categories", { locale });

    if (categoriesData[0].attributes.locale !== res.data.categories.data[0].attributes.locale) {
      setCategory([]);
      setCategoryId([]);
      setSearchValue("");
      setCategoryValid("");
      setCategoryError(true);
    };

    setCategoriesData(res.data.categories.data);
  };

  return (
    <StyledSelect className={selectedError && error ? "error" : ""}>
      <Text onClick={() => ad()} className="label">{label} <Text className="label-more">{labelMore}</Text></Text>

      <div ref={selectRef} className="select-wrapper">
        <div onClick={toggleOpen} className={`select ${isOpen ? "open" : ""} ${valid ? "valid" : ""}`}>
          {!isOpen && selected.length === 0 &&
            <Text className="placeholder">{placeholder}</Text>
          }
          <div className="select-value">{selected}</div>
        </div>
        {isOpen && (
          <div className="select-options">
            {languageData.filter((option) => option.title).length > 0 ?
              languageData.filter((option) => option.title).map((option) => (
                <div
                  onClick={() => handleOptionClick(option)}
                  key={option.title}
                  className={`select-option ${selected.includes(option.title) ? "selected" : ""}`}
                >
                  {option.title}
                </div>
              ))
              :
              <div className="select-option no-options">{t("No options")}</div>
            }
          </div>
        )}
      </div>
      {!isOpen && selectedError && <Text className="error-text">{errorText}</Text>}
    </StyledSelect>
  );
};

export default LanguageSelect;