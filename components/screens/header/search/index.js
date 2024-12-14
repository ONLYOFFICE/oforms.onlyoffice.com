import StyledSearch from "./styled-search";
import { useState } from "react";
import Text from "@components/common/text";
import SearchInput from "@components/screens/common/search-input";

const Search = ({ t, locale, isMainPage }) => {
  const [isInputFocused, setIsInputFocused] = useState(false);

  const handleInputFocusChange = (focusState) => {
    setIsInputFocused(focusState);
  };

  return (
    <StyledSearch className="search" locale={locale}>
      <div className="search-wrapper">
        <div className={`search-container ${isInputFocused ? "focus" : ""}`}>
          <SearchInput t={t} locale={locale} isMainPage={isMainPage} handleInputFocusChange={handleInputFocusChange} />
          <Text className="search-title" label={t("All Templates")} />
        </div>
      </div>
    </StyledSearch>
  );
};

export default Search;
