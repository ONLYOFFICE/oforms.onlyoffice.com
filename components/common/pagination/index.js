import React from "react";

import PageNumber from "./sub-components/page-number";
import StyledPagination from "./styled-pagination";
import { ReactSVG } from "react-svg";

const Pagination = ({
  page,
  countPage,
  getPaginationGroup,
  category,
  locale,
  sort,
}) => {

  const previousPage = () => {
    return (
      <a
        className={`previous-page ${page === 1 && "disabled"}`}
        href={page === 1 ? null :
          !category
            ? `${locale === "en" ? "" : `${locale}/`}?page=${page - 1}${
                sort !== undefined && sort !== "asc" ? `&_sort=${sort}#forms` : ""
              }`
            : `${
                locale === "en" ? "" : `/${locale}`
              }/form/${category}?page=${page - 1}${
                sort !== undefined && sort !== "asc" ? `&_sort=${sort}#forms` : ""
              }`
        }
      >
        <ReactSVG
          className={`arrow ${page === 1 && "disabled"}`}
          src="/icons/arrow-left.react.svg"
          wrapper="svg"
        />
      </a>
    );
  };

  const nextPage = () => {
    return (
      <a
        className={`next-page ${page === countPage && "disabled"}`}
        href={page === countPage ? null :
          !category
            ? `${locale === "en" ? "" : `${locale}/`}?page=${page + 1}${
                sort !== undefined && sort !== "asc" ? `&_sort=${sort}#forms` : ""
              }`
            : `${
                locale === "en" ? "" : `/${locale}`
              }/form/${category}?page=${page + 1}${
                sort !== undefined && sort !== "asc" ? `&_sort=${sort}#forms` : ""
              }`
        }
      >
        <ReactSVG
          className={`arrow ${page === countPage && "disabled"}`}
          src="/icons/arrow-right.react.svg"
          wrapper="svg"
        />
      </a>
    );
  };
  
  return (
    <StyledPagination className="pagination">
      {previousPage()}
      {getPaginationGroup.map((item, index) => (
        <a
          href={
            page !== item ? 
            (
            !category
              ? `${locale === "en" ? "" : `${locale}/`}?page=${item}${
                  sort !== undefined && sort !== "asc" ? `&_sort=${sort}#forms` : ""
                }`
              : `${
                  locale === "en" ? "" : `/${locale}`
                }/form/${category}?page=${item}${
                  sort !== undefined && sort !== "asc" ? `&_sort=${sort}#forms` : ""
                }`
            ) : null
          }
          key={index + item}
        >
          <PageNumber
            className={`go-to-page ${page === item && " active"}`}
            typeButton={page === item ? "secondary" : "transparent"}
            label={String(item)}
            key={index}
          />
        </a>
      ))}
      {nextPage()}
    </StyledPagination>
  );
};

export default Pagination;
