import StyledSearch from "./styled-search";
import { useState, useRef, useEffect, useCallback } from "react";
import Router, { useRouter } from "next/router";
import { ReactSVG } from "react-svg";
import debounce from "lodash.debounce";
import CONFIG from "@config/config";
import popularSearch from "./popular-search.json";
import Text from "@components/common/text";
import TextInput from "@components/common/text-input";
import InternalLink from "@components/common/internal-link";
import Heading from "@components/common/heading";

const Search = ({ t, locale, templateSecondary, templateTertiary, templateQuaternary }) => {
  const [searchItem, setSearchItem] = useState("");
  const [searchResult, setSearchResult] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);
  const [searchValue, setSearchValue] = useState([]);
  const [inputFocus, setInputFocus] = useState(false);
  const searchRef = useRef(null);
  const router = useRouter();

  const updateSearchValue = useCallback(debounce(async (e) => {
    const searchName = locale === "en" || locale === "fr" || locale === "pt" ? e.target.value?.toLowerCase() === "curriculum vitae" || e.target.value?.toLowerCase() === "curriculum" || e.target.value?.toLowerCase() === "vitae" ? "cv" : e.target.value : e.target.value;

    if (searchName) {
      const searchRes = await fetch(`${CONFIG.api.cms}/api/oforms/?sort=name_form:asc&locale=${locale === "pt" ? "pt-br" : locale}&filters[name_form][$containsi]=${searchName}&pagination[pageSize]=5`);
      const searchData = await searchRes.json();
      setSearchValue(searchData);
    } else {
      setSearchValue([]);
    }
  }, 500), [locale]);

  const Highlight = ({ searchQuery, text }) => {
    if (!searchQuery) return text;
  
    const regexp = new RegExp(`(${searchQuery})`, 'ig');
    return text.split(regexp).map((part, index) => 
      regexp.test(part) ? <span key={index} className="search-excerpt">{part}</span> : part
    );
  };

  const HighlightText = useCallback((text) => <Highlight searchQuery={searchItem} text={text} />, [searchItem]);

  useEffect(() => {
    const localStorageSearchHistory = JSON.parse(localStorage.getItem("search_history"));

    if (localStorageSearchHistory?.length > 0) {
      setSearchHistory(JSON.parse(localStorage.getItem("search_history")));
    }

    if (router.pathname === "/searchresult") {
      setSearchItem(router.query.query);
    }
  }, [router.pathname, router.query.query]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchResult(false);
        setInputFocus(false);
      }
    };

    if (searchResult) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [searchResult]);

  const handleRemoveSearchHistoryItem = (e, indexToRemove) => {
    e.stopPropagation();
    const updatedSearchHistory = searchHistory.filter((_, index) => index !== indexToRemove);
    setSearchHistory(updatedSearchHistory);
    localStorage.setItem("search_history", JSON.stringify(updatedSearchHistory));
  };

  const updateSearchHistory = (value) => {
    const filteredQuery = value.trim();

    if (filteredQuery && !searchHistory?.includes(filteredQuery)) {
      const newSearchHistory = [filteredQuery, ...searchHistory.slice(0, 4)];
      newSearchHistory.sort((a, b) => a.localeCompare(b));
      setSearchHistory(newSearchHistory);
      localStorage.setItem("search_history", JSON.stringify(newSearchHistory));
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      updateSearchHistory(searchItem);
      setSearchResult(false);
      Router.push(`/searchresult?query=${searchItem}`);
    }
  };

  return (
    <StyledSearch className="search" templateSecondary={templateSecondary} templateTertiary={templateTertiary} templateQuaternary={templateQuaternary}>
      <div className="search-wrapper">
        <div className={`search-container ${searchItem ? "value" : ""}`}>
          <div ref={searchRef} className="search-input">
            <TextInput
              onChange={(e) => { 
                setSearchItem(e.target.value);
                updateSearchValue(e);
              }}
              onClick={() => setSearchResult(true)}
              onFocus={() => setInputFocus(true)}
              onKeyDown={handleKeyDown}
              handlerClearValue={() => {
                setSearchItem("");
                setSearchValue([]);
              }}
              className={inputFocus ? "focus" : ""}
              value={searchItem}
              type="text"
              label={t("Search PDF forms and templates")}
              searchIcon={true}
            />
            {searchResult && (
              searchValue.length === 0 ? (
                <div className="search-results">
                  {searchHistory?.length > 0 &&
                    <Heading className="search-results-label" label={t("History")} level={6} />
                  }
                  {searchHistory?.map((item, index) => (
                    <div onClick={() => setSearchResult(false)} className="search-results-item" key={index}>
                      <InternalLink href={`/searchresult?query=${item}`} label={item} />
                      <button onClick={(e) => handleRemoveSearchHistoryItem(e, index)} className="search-results-btn">
                        <ReactSVG src="/icons/cross-circle.svg" />
                      </button>
                    </div>
                  ))}
                  {popularSearch[locale].length > 0 &&
                    <>
                      <Heading className="search-results-label" label={t("Popular search")} level={6} />
                      {popularSearch[locale].map((item, index) => (
                        <InternalLink onClick={() => setSearchResult(false)} className="search-results-popular-item" href={`/searchresult?query=${item}`} label={item} key={index} />
                      ))}
                    </>
                  }
                </div>
              ) : (
                <div className="search-results">
                  {searchValue.data.length > 0 ? (
                    searchValue.data?.map((item, index) => (
                      <InternalLink
                        onClick={() => updateSearchHistory(item.attributes.name_form)}
                        className="search-results-popular-item"
                        href={item.attributes.url}
                        label={HighlightText(item.attributes.name_form)}
                        key={index}
                      />
                    ))
                  ): (
                    <div className="search-results-no-results">{t("No more results...")}</div>
                  )}
                </div>
            ))}
          </div>
          <Text className="search-title" label={t("All Templates")} />
        </div>
      </div>
    </StyledSearch>
  );
};

export default Search;
