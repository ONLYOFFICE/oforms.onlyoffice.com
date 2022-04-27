import React, { useState, useEffect } from "react";

import SearchResult from "./search-result";
import Search from "@components/common/search-area";
import CONFIG from "@config/config";

import axios from "axios";

const SearchContent = ({ t, currentLanguage }) => {
  const [focusOnSearch, setFocusOnSearch] = useState(false);
  const [searchItem, setSearchItem] = useState("");
  const [resultSearch, setResultSearch] = useState([]);

  const onSearch = (e) => {
    e.preventDefault();
    setSearchItem(e.target.value);
  };

  const clearValueSearch = () => {
    setSearchItem("");
  };

  const onCloseSearchResult = () => {
    setFocusOnSearch(false);
  };

  const CMSConfigAPI = CONFIG.api.cms || "http://localhost:1337";
  const searchReqData = () => {
    const searchURL = `${CMSConfigAPI}/api/oforms?locale=${currentLanguage}&filters[name_form][$containsi]=${searchItem}`;
    const delayDebounce = setTimeout(() => {
      console.log(searchItem);
      axios
        .get(searchURL)
        .then((response) => {
          setResultSearch(response.data);
          setFocusOnSearch(true);
        })
        .catch((error) => console.log(error));
    }, 1000);

    return () => clearTimeout(delayDebounce);
  };

  useEffect(() => {
    if (searchItem.length > 2) {
      searchReqData();
    } else {
      setResultSearch(null);
    }
  }, [searchItem]);

  return (
    <>
      <Search
        t={t}
        callback={onSearch}
        valueSearch={searchItem}
        clearValueSearch={clearValueSearch}
      />
      {searchItem.length > 2 && (
        <SearchResult
          searchItem={searchItem}
          resultItems={resultSearch}
          onMouseLeaveSearchResult={onCloseSearchResult}
          resultMouseLeave={focusOnSearch}
        />
      )}
    </>
  );
};

export default SearchContent;
