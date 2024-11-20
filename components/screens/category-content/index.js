import StyledCategoryContent from "./styled-category-content";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import SearchNoResult from "@components/screens/common/search-no-result";
import CategorySelector from "./category-selector";
import Text from "@components/common/text";
import Heading from "@components/common/heading";
import InternalLink from "@components/common/internal-link";
import Card from "@components/screens/common/card";
import SortSelector from "@components/common/sort-selector";
import Pagination from "@components/common/pagination";

const CategoryContent = ({ t, locale, subtitle, sort, page, forms, categories, types, compilations, categoryName, categoryUrl }) => {
  const router = useRouter();
  const countPage = forms.meta?.pagination.pageCount;
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
    <StyledCategoryContent locale={locale}>
      <div className="category-nav">
        <ul className="category-nav-list">
          <li><InternalLink id="category-nav-home-link" className={router.pathname === "/" ? "active" : ""} href="/" label={t("Home")} /></li>
          <li><InternalLink id="category-nav-pdf-form-link" className={router.pathname === "/pdf-form-templates" ? "active" : ""} href={`/pdf-form-templates${router.query._sort ? `?_sort=${router.query._sort}` : ""}`} label={t("Form")} /></li>
          <li><InternalLink id="category-nav-document-link" className={router.pathname === "/document-templates" ? "active" : ""} href={`/document-templates${router.query._sort ? `?_sort=${router.query._sort}` : ""}`} label={t("Document")} /></li>
          <li><InternalLink id="category-nav-spreadsheet-link" className={router.pathname === "/spreadsheet-templates" ? "active" : ""} href={`/spreadsheet-templates${router.query._sort ? `?_sort=${router.query._sort}` : ""}`} label={t("Spreadsheet")} /></li>
          <li><InternalLink id="category-nav-presentation-link" className={router.pathname === "/presentation-templates" ? "active" : ""} href={`/presentation-templates${router.query._sort ? `?_sort=${router.query._sort}` : ""}`} label={t("Presentation")} /></li>
        </ul>
      </div>
      <div className="category-header">
        <Heading className="category-title" level={2} label={categoryName} />
        <Text className="category-text" label={subtitle} />
      </div>
      {forms.data.length > 0 ? (
        <>
          <div className="category-info">
            <CategorySelector
              t={t}
              locale={locale}
              sort={sort}
              categories={categories}
              types={types}
              compilations={compilations}
              categoryName={categoryName}
            />
            <SortSelector t={t} locale={locale} sort={sort} />
          </div>
          <div className="category-items">
            {forms.data.map((data, index) => (
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
          categoryUrl={categoryUrl}
        />
      }
    </StyledCategoryContent>
  );
};

export default CategoryContent;