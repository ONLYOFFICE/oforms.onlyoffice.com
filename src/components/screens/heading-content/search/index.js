import {useState, useEffect, useMemo} from "react";
import Router, { useRouter } from 'next/router'
import axios from "axios";

import CONFIG from "@config/config.json";
import Search from "@common/search-area";
import SearchResult from "./search-result";

const SearchContent = ({ t, handlerSetModal, handlerCardData }) => {
  const [focusOnSearch, setFocusOnSearch] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const router = useRouter();
  const locale = router.locale
  const isDesktopClient = router.query.desktop;
  const theme = router.query.theme
  const searchQuery = router.query.query

  useEffect(() => {
    if(searchQuery) {
      setSearchValue(searchQuery)
    }
  }, [searchQuery])

  const appTheme = useMemo(() => {
    if(theme && isDesktopClient) return theme
  }, [theme, isDesktopClient])
  const searchResultPathname = router.pathname === "/searchresult";

  const onSearch = (e) => {
    e.preventDefault();
    setSearchValue(e.target.value);
  };

  const onEnterPress = (e) => {
    if (searchValue.length > 2) {
      if (isDesktopClient) {
        e.code === 'Enter' && !(searchResultPathname) && Router.push(`/searchresult/?desktop=true&query=${searchValue}${appTheme !== undefined ? `&theme=${appTheme}` : ''}`)
        e.code === 'Enter' && searchResultPathname && Router.push(`?desktop=true&query=${searchValue}${appTheme !== undefined ? `&theme=${appTheme}` : ''}`, null, { shallow: true })
      } else {
        e.code === 'Enter' && !(searchResultPathname) && Router.push(`/searchresult/?query=${searchValue}`)
        e.code === 'Enter' && searchResultPathname && Router.push(`?query=${searchValue}`, null, { shallow: true })
      }
    }
  };

  const clearValueSearch = () => {
    setSearchValue("");
  };

  const onCloseSearchResult = () => {
    setFocusOnSearch(false);
  };

  const CMSConfigAPI = CONFIG.api.cms || "http://localhost:1337";
  const searchReqData = () => {
    const searchURL = `${CMSConfigAPI}/api/oforms?populate[0]=categories&locale=${locale}&filters[name_form][$containsi]=${searchValue}&populate=template_image&populate=file_oform&populate=categories&populate=card_prewiew`;
    const delayDebounce = setTimeout(() => {
      axios
        .get(searchURL)
        .then((response) => {
          setSearchResult(response.data);
          setFocusOnSearch(true);
        })
        .catch((error) => console.log(error));
    }, 2500);

    return () => clearTimeout(delayDebounce);
  };

  useEffect(() => {
    if (searchValue.length > 2) {
      searchReqData();
    } else {
      setSearchResult(null);
    }
  }, [router]);


  return (
    <>
      <Search
        t={t}
        callback={onSearch}
        valueSearch={searchValue}
        clearValueSearch={clearValueSearch}
        onEnterPress={onEnterPress}
      />
      {searchValue.length > 2 && (
        <SearchResult
          searchValue={searchValue}
          resultItems={searchResult}
          onMouseLeaveSearchResult={onCloseSearchResult}
          resultMouseLeave={focusOnSearch}
          isDesktopClient={isDesktopClient}
          handlerSetModal={handlerSetModal}
          handlerCardData={handlerCardData}
        />
      )}
    </>
  );
};

export default SearchContent;
