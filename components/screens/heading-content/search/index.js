import {useState, useEffect, useMemo} from "react";
import Router, { useRouter } from 'next/router'
import axios from "axios";

import CONFIG from "@config/config";
import Search from "@components/common/search-area";
import SearchResult from "./search-result";

const SearchContent = ({ t, currentLanguage, isDesktopClient, handlerSetModal, handlerCardData }) => {
  const [focusOnSearch, setFocusOnSearch] = useState(false);
  const [searchItem, setSearchItem] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const router = useRouter();
  const theme = router.query.theme

  const appTheme = useMemo(() => {
    if(theme && isDesktopClient) return theme
  }, [theme, isDesktopClient])
  const searchResultPathname = router.pathname === "/searchresult";

  const onSearch = (e) => {
    e.preventDefault();
    setSearchItem(e.target.value);
  };

  const onEnterPress = (e) => {
    if (searchItem.length > 2) {
      if (isDesktopClient) {
        e.code === 'Enter' && !(searchResultPathname) && Router.push(`/searchresult/?desktop=true?query=${searchItem}${appTheme !== undefined ? `&theme=${appTheme}` : ''}`)
        e.code === 'Enter' && searchResultPathname && Router.push(`?desktop=true?query=${searchItem}${appTheme !== undefined ? `&theme=${appTheme}` : ''}`, null, { shallow: true })
      } else {
        e.code === 'Enter' && !(searchResultPathname) && Router.push(`/searchresult/?query=${searchItem}`)
        e.code === 'Enter' && searchResultPathname && Router.push(`?query=${searchItem}`, null, { shallow: true })
      }
    }
  };

  const clearValueSearch = () => {
    setSearchItem("");
  };

  const onCloseSearchResult = () => {
    setFocusOnSearch(false);
  };

  const CMSConfigAPI = CONFIG.api.cms || "http://localhost:1337";
  const searchReqData = () => {
    const searchURL = `${CMSConfigAPI}/api/oforms?populate[0]=categories&locale=${currentLanguage}&filters[name_form][$containsi]=${searchItem}&populate=template_image&populate=file_oform&populate=categories&populate=card_prewiew`;
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
    if (searchItem.length > 2) {
      searchReqData();
    } else {
      setSearchResult(null);
    }
  }, [searchItem]);

  return (
    <>
      <Search
        t={t}
        callback={onSearch}
        valueSearch={searchItem}
        clearValueSearch={clearValueSearch}
        onEnterPress={onEnterPress}
      />
      {searchItem.length > 2 && (
        <SearchResult
          searchItem={searchItem}
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
