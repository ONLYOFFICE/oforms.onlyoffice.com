import StyledSearchResultContent from "./styled-search-result-content";
import { useState, useEffect } from "react";
import Breadcrumbs from "@components/screens/common/breadcrumbs";
import Card from "@components/screens/common/card";
import SearchNoResult from "@components/screens/common/search-no-result";
import Heading from "@components/common/heading";
import SortSelector from "@components/common/sort-selector";
import Pagination from "@components/common/pagination";

const SearchResultContent = ({ t, locale, searchQuery, searchData, sort, page }) => {
  const countPage = searchData.meta?.pagination.pageCount;
  const [pageLimit, setPageLimit] = useState(countPage > 7 ? 7 : countPage);

  const arrayStart = [...Array(countPage).keys()].map(i => i + 1)
    .filter(item => item % pageLimit === 0)
    .map((item, index) => item - index);

  const checkInterval = (page, min, max) => {
    if ((page >= min) && (page < max)) return min;
    if (page <= min && page < max) return 0;
    if (page >= min && !max) return min;
  };

  const getPaginationGroup = () => {
    let start = 0;
    for (let i = 0; i < arrayStart.length; i++) {
      if (checkInterval(page, arrayStart[i], arrayStart[i + 1])) {
        start = checkInterval(page, arrayStart[i], arrayStart[i + 1])
        break;
      }
    }
    return countPage > 7 ? 
      new Array(countPage - start < pageLimit ? countPage - start + 1 : pageLimit).fill().map((_, idx) => start === 0 ? start + idx + 1 : start + idx) : 
      new Array(countPage).fill().map((_, idx) => idx + 1);
  };

  const resizeHandler = () => {
    window.innerWidth < 425 ? setPageLimit(countPage > 5 ? 5 : countPage) : setPageLimit(countPage > 7 ? 7 : countPage);
  };

  useEffect(() => {
    resizeHandler();
    window.addEventListener("resize", resizeHandler);

    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  });

  return (
    <StyledSearchResultContent>
      <Breadcrumbs t={t} locale={locale}>
        {
          locale === "fr" ? `${t("Search by")} « ${searchQuery} »` :
          locale === "es" ? `${t("Search by")} «${searchQuery}»` :
          locale === "ja" ? `"${searchQuery}"${t("Search by")}` :
          locale === "zh" ? `${t("Search by")} “${searchQuery}”` :
          `${t("Search by")} "${searchQuery}"`
        }
      </Breadcrumbs>

      {searchData.data?.length > 0 ? (
        <>
          <Heading className="search-result-title" level={2} label={searchQuery ? `${t("Search results for")} '${searchQuery}'` : t("Search results")} />
          <div className="search-result-nav">
            <span className="search-result-length">{searchData.meta?.pagination.total ? searchData.meta?.pagination.total : 0} {t("templates")}</span>
            <SortSelector t={t} locale={locale} sort={sort} />
          </div>
          <div className="search-result-items">
            {searchData.data?.map((data, index) => (
              <Card data={data} key={index} />
            ))}
          </div>
        </>
      ) : (
        <SearchNoResult t={t} />
      )}

      {countPage !== 0 && countPage !== 1 &&
        <Pagination
          countPage={countPage}
          getPaginationGroup={getPaginationGroup()}
          locale={locale}
          sort={sort}
          page={Number(page)}
        />
      }
    </StyledSearchResultContent>
  );
};

export default SearchResultContent;