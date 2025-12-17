import StyledSearchInput from "./styled-search-input";
import { useState, useRef, useEffect, useCallback } from "react";
import Router, { useRouter } from "next/router";
import debounce from "lodash.debounce";
import popularSearch from "../../header/search/popular-search.json";
import getSearchResultInput from "@lib/requests/getSearchResultInput";
import TextInput from "@components/common/text-input";
import InternalLink from "@components/common/internal-link";
import Heading from "@components/common/heading";

const SearchInput = ({ t, locale, isMainPage, handleInputFocusChange = () => {} }) => {
  const router = useRouter();
  const searchRef = useRef(null);
  const [searchItem, setSearchItem] = useState("");
  const [searchResult, setSearchResult] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);
  const [searchValue, setSearchValue] = useState([]);
  const [inputFocus, setInputFocus] = useState(false);

  const updateSearchValue = useCallback(debounce(async (e) => {
    if (e.target.value) {
      const searchData = await getSearchResultInput(locale, e.target.value);
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
        handleInputFocusChange(false);
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

  const keyDownHandler = (e) => {
    if (e.key === "Enter") {
      updateSearchHistory(searchItem);
      setSearchResult(false);
      Router.push(`/searchresult?query=${searchItem}`);
    }
  };

  return (
    <StyledSearchInput
      className="search-input"
      ref={searchRef}
      $locale={locale}
      $isMainPage={isMainPage}
    >
      <TextInput
        onChange={(e) => {
          setSearchItem(e.target.value);
          updateSearchValue(e);
        }}
        onClick={() => setSearchResult(true)}
        onFocus={() => {setInputFocus(true); handleInputFocusChange(true)}}
        onKeyDown={keyDownHandler}
        handlerClearValue={() => {
          setSearchItem("");
          setSearchValue([]);
        }}
        className={inputFocus ? "focus" : ""}
        value={searchItem}
        type="text"
        label={isMainPage ? t("Search PDF forms and templates") : null}
        placeholder={!isMainPage ? t("Search") : null}
        searchIcon={true}
        locale={locale}
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
                  <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g opacity="0.4">
                      <path fillRule="evenodd" clipRule="evenodd" d="M3.31348 12C3.31348 7.0275 7.34098 3 12.3135 3C17.286 3 21.3135 7.0275 21.3135 12C21.3135 16.9725 17.286 21 12.3135 21C7.34098 21 3.31348 16.9725 3.31348 12ZM8.77772 9.87868C8.3872 9.48816 8.3872 8.85499 8.77772 8.46447C9.16825 8.07394 9.80141 8.07394 10.1919 8.46447L12.3133 10.5858L14.4346 8.46447C14.8251 8.07394 15.4583 8.07394 15.8488 8.46447C16.2393 8.85499 16.2393 9.48816 15.8488 9.87868L13.7275 12L15.8488 14.1213C16.2393 14.5118 16.2393 15.145 15.8488 15.5355C15.4583 15.9261 14.8251 15.9261 14.4346 15.5355L12.3133 13.4142L10.1919 15.5355C9.80141 15.9261 9.16825 15.9261 8.77772 15.5355C8.3872 15.145 8.3872 14.5118 8.77772 14.1213L10.899 12L8.77772 9.87868Z" fill="#444444" />
                    </g>
                  </svg>
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
            ) : (
              <div className="search-results-no-results">{t("No more results...")}</div>
            )}
          </div>
        ))}
    </StyledSearchInput>
  );
};

export default SearchInput;
``