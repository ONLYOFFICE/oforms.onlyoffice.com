import React, { useState } from "react";
import StyledPagination from "./styled-pagination";
import PageNumber from "./sub-components/page-number";
import { ReactSVG } from "react-svg";
import Link from "../link";

const Pagination = ({ currentPage, goToPreviousPage, getPaginationGroup, changePage, pages, goToNextPage, ...rest }) => {

  return (
    <StyledPagination className="pagination">
      <Link
        className="previous-page"
        onClick={(e) => goToPreviousPage(e)}
      >
        <img
          className="arrow"
          src="https://static-oforms.onlyoffice.com/icons/arrow-left.svg"
          wrapper="svg"
        ></img>
      </Link>
      {getPaginationGroup().map((item, index) => (
        <PageNumber
          className={`go-to-page ${currentPage === item && " active"}`}
          onClick={changePage}
          typeButton={currentPage === item ? "secondary" : "transparent"}
          label={String(item)}
          key={index}
        ></PageNumber>
      ))}
      <Link
        className="next-page"
        onClick={(e) => goToNextPage(e)}
      >
        <img
          className="arrow"
          src="https://static-oforms.onlyoffice.com/icons/arrow-right.svg"
          wrapper="svg"
        ></img>
      </Link>
    </StyledPagination>
  );
};

export default Pagination;