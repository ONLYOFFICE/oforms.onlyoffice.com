import {useState, useEffect, useMemo} from "react";
import Router, { useRouter } from 'next/router'
import axios from "axios";

import CONFIG from "@config/config.json";
import SearchArea from "@common/searchArea";
import SearchResult from "./search-result";
import {useTranslation} from "next-i18next";

const SearchContent = ({ handlerSetModal, handlerCardData }) => {
  const [focusOnSearch, setFocusOnSearch] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const router = useRouter();
  const locale = router.locale
  const isDesktopClient = router.query.desktop;
  const theme = router.query.theme
  const searchQuery = router.query.query
  const CMSConfigAPI = CONFIG.api.cms || "http://localhost:1337";

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

    if (e.target.value.length >= 2) {
      const searchReqData = () => {
        const query = locale === "en" || locale === "fr" || locale === "pt" ? e.target.value.toLowerCase() === "curriculum vitae" || e.target.value.toLowerCase() === "curriculum" || e.target.value.toLowerCase() === "vitae" ? "cv" : e.target.value : e.target.value;
        const searchURL = `${CMSConfigAPI}/api/oforms?populate[0]=categories&locale=${locale === "pt" ? "pt-br" : locale}&filters[name_form][$containsi]=${query}&populate=template_image&populate=file_oform&populate=categories&populate=card_prewiew`;
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
      searchReqData();
    } else {
      setSearchResult(null);
    }
  };

  const onEnterPress = (e) => {
    if (searchValue.length >= 2) {
      if (isDesktopClient) {
        !(searchResultPathname) && Router.push(`/searchresult/?desktop=true&query=${searchValue}${appTheme !== undefined ? `&theme=${appTheme}` : ''}`)
        searchResultPathname && Router.push(`?desktop=true&query=${searchValue}${appTheme !== undefined ? `&theme=${appTheme}` : ''}`, null, { shallow: true })
      } else {
        !(searchResultPathname) && Router.push(`/searchresult/?query=${searchValue}`)
        searchResultPathname && Router.push(`?query=${searchValue}`, null, { shallow: true })
      }
    }

    setFocusOnSearch(false);
  };

  const clearValueSearch = () => {
    setSearchValue("");
  };

  const onCloseSearchResult = () => {
    setFocusOnSearch(false);
  };

  return (
    <>
      <SearchArea
          clearValueSearch={clearValueSearch}
          valueSearch={searchValue}
          callback={onSearch}
          onEnterPress={onEnterPress}
      />


      {searchValue.length >= 2 && (
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
