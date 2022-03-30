import React, { useState, useEffect } from "react";
import { useStaticQuery, graphql } from "gatsby";

import Search from "../../../../components/search-area";

import SearchResult from "./search-result";

const SearchContent = ({ t }) => {
  const data = useStaticQuery(graphql`
    {
      allDataJson {
        edges {
          node {
            data {
              id
              attributes {
                name_form
              }
            }
          }
        }
      }
    }
  `);

  const searchDataItems = data?.allDataJson?.edges[1].node.data;

  const [focusOnSearch, setFocusOnSearch] = useState(false);
  const [searchItem, setSearchItem] = useState("");
  const [resultSearch, setResultSearch] = useState([]);

  const searchFilter = () => {
    let tmpArray = [];
    searchDataItems.filter(({ attributes }) => {
      let { name_form } = attributes;
      if (name_form.toLowerCase().includes(searchItem.toLowerCase())) {
        tmpArray.push({ ...attributes });
      }
    });
    if (searchItem !== "") {
      setResultSearch(tmpArray);
      setFocusOnSearch(true);
    } else {
      setResultSearch(null);
    }
  };

  useEffect(() => {
    searchFilter();
  }, [searchItem]);

  const onSearch = (e) => {
    setSearchItem(e.target.value);
  };

  const clearValueSearch = () => {
    setSearchItem("");
  };

  const onCloseSearchResult = () => {
    setFocusOnSearch(false);
  };

  return (
    <>
      <Search
        t={t}
        callback={onSearch}
        valueSearch={searchItem}
        clearValueSearch={clearValueSearch}
      />
      <SearchResult
        searchItem={searchItem}
        resultItems={resultSearch}
        onMouseLeaveSearchResult={onCloseSearchResult}
        resultMouseLeave={focusOnSearch}
      />
    </>
  );
};

export default SearchContent;
