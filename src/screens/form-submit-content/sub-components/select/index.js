import { useState, useEffect, useRef } from "react";
import StyledSelect from "./styled-select";
import Text from "@common/text";

const Select = ({ t, label, labelMore, placeholder, options, selected, setSelected, isMulti, error, setError, errorText, valid, setValid, selectedActive, setSelectedActive, selectedIndex, setSelectedIndex, setLanguageKey }) => {
  const [searchValue, setSearchValue] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [selectedError, setSelectedError] = useState(false);
  const inputRef = useRef();

  useEffect(() => {
    typeof window !== "undefined" && isActive && window.addEventListener("click", handleClickOutside);

    if (!isActive && selected.length === 0) {
      setValid(false);
    } else if (!isActive && selected.length > 0) {
      setValid(true);
    };

    if (isMulti && selected.length > 5) {
      setSelectedError(true);
      setError(true);
      setValid(false);
    };

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [isActive]);

  const handleState = () => {
    setValid(false);
    setIsActive(!isActive);
    setSearchValue("");
    isMulti && inputRef.current.focus();
  };

  const handleSelectOption = (e, i) => {
    if (isMulti) {
      let options = [...selectedActive];
      options[i] = !options[i];
      setSelectedActive(options);

      setSelected((prev) => {
        if (prev.includes(e.target.childNodes[0].data)) {
          return prev.filter((select) => select !== e.target.childNodes[0].data);
        } else {
          return [...prev, e.target.childNodes[0].data];
        };
      });
    } else {
      setSelectedIndex(i);
      setSelected(e.target.childNodes[0].data);
    };

    if (selected.length + 1 === 0) {
      setSelectedError(true);
      setError(true);
    } else {
      setSelectedError(false);
      setError(false);
    };

    setIsActive(false);
    setSearchValue("");
  };

  const handleSelectReset = () => {
    setSelected([]);
    setSearchValue("");
    isMulti ? setSelectedActive(new Array(options.length).fill(false)) : setSelectedIndex(null);
    setIsActive(false);
    setSelectedError(true);
    setError(true);
  };

  const handleClickOutside = (e) => {
    setSearchValue("");

    if (isActive && (!e.target.closest(".select-wrapper"))) {
      setIsActive(false);
    };

    if (selected.length === 0) {
      setSelectedError(true);
      setError(true);
    };
  };

  return (
    <StyledSelect className={selectedError && error ? "error" : ""}>
      <Text className="label">{label} <Text className="label-more">{labelMore}</Text></Text>
      <div className="select-wrapper">
        <div onClick={handleState} className={`select ${isActive ? "open" : ""} ${isMulti ? "multi" : ""} ${valid ? "valid" : ""}`}>
          {!isActive && selected.length === 0 &&
            <Text className="placeholder">{placeholder}</Text>
          }
          <div className="select-value">{isMulti ? selected.join(', ') : selected}</div>
          {isMulti &&
            <input
              onChange={(e) => setSearchValue(e.target.value)}
              ref={inputRef}
              className={`select-input ${isActive ? "active" : ""}`}
              value={searchValue}
              name="select"
              type="text"
            />
          }
          {isMulti &&
            <Text className="select-length">{selected.length > 0 && `(${selected.length})`}</Text>
          }
        </div>

        {isActive &&
          <div className="select-options">
            <div onClick={handleSelectReset} className="select-option reset">{t("Reset")}</div>
            {options.map((option, i) => (
              <div
                onClick={e => { handleSelectOption(e, i); !isMulti && setLanguageKey(option.key) }}
                key={i}
                className={`
                  select-option 
                  ${(isMulti ? selectedActive[i] : selectedIndex === i) ? "selected" : ""} 
                  ${isMulti ? option.toLowerCase().includes(searchValue.toLowerCase()) ? "" : "hidden" : ""}
                `}
              >
                {isMulti ? option : option.title}
              </div>
            ))}
          </div>
        }
      </div>
      {!isActive && selectedError && <Text className="error-text">{isMulti && selected.length > 5 ? t("Maximum 5") : errorText}</Text>}
    </StyledSelect>
  );
};

export default Select;