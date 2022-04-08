import React, { useState } from "react";
import StyledPagination from "./styled-pagination";
import PageNumber from "./sub-components/page-number";
import { ReactSVG } from "react-svg";
import Link from "../link";

const Pagination = ({ data, dataLimit }) => {
  const pageLimit = Math.round(data.length / dataLimit);

  const [pages] = useState(Math.round(data.length / dataLimit));
  const [currentPage, setCurrentPage] = useState(1);

  function goToNextPage() {
    setCurrentPage((page) => page + 1);
  }

  function goToPreviousPage() {
    setCurrentPage((page) => page - 1);
  }

  function changePage(event) {
    const pageNumber = Number(event.target.textContent);
    setCurrentPage(pageNumber);
  }

  const getPaginatedData = () => {
    const startIndex = currentPage * dataLimit - dataLimit;
    const endIndex = startIndex + dataLimit;
    return data.slice(startIndex, endIndex);
  };

  const getPaginationGroup = () => {
    let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
    return new Array(pageLimit).fill().map((_, idx) => start + idx + 1);
  };
  return (
    <StyledPagination className="pagination">
      <Link
        className="previous-page"
        onClick={currentPage === 1 ? null : goToPreviousPage}
      >
        <ReactSVG
          className="arrow"
          src="/icons/arrow-left.react.svg"
          wrapper="svg"
        ></ReactSVG>
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
        onClick={currentPage === pages ? null : goToNextPage}
      >
        <ReactSVG
          className="arrow"
          src="/icons/arrow-right.react.svg"
          wrapper="svg"
        ></ReactSVG>
      </Link>
    </StyledPagination>
  );
};

export default Pagination;
