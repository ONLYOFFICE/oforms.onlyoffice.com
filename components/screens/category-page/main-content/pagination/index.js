import PageNumber from "@components/common/pagination/sub-components/page-number";
import StyledPagination from "@components/common/pagination/styled-pagination";

const Pagination = ({
  currentPage,
  goToPreviousPage,
  getPaginationGroup,
  changePage,
  goToNextPage,
  locale,
  sort,
  category,
}) => {
  return (
    <StyledPagination className="pagination">
      {/* <Link className="previous-page" onClick={(e) => goToPreviousPage(e)}>
        <ReactSVG
          className="arrow"
          src="/icons/arrow-left.react.svg"
          wrapper="svg"
        />
      </Link> */}
      {getPaginationGroup.map((item, index) => (
        <a
          href={`${locale === "en" ? "" : `${locale}/${category}`}?page=${item}${
            sort !== undefined && sort !== "asc" ? `&_sort=${sort}` : ""
          }`}
          key={index + item}
        >
          <PageNumber
            className={`go-to-page ${currentPage === item && " active"}`}
            onClick={changePage}
            typeButton={currentPage === item ? "secondary" : "transparent"}
            label={String(item)}
            key={index}
          />
        </a>
      ))}
      {/* <Link className="next-page" onClick={(e) => goToNextPage(e)}>
        <ReactSVG
          className="arrow"
          src="/icons/arrow-right.react.svg"
          wrapper="svg"
        />
      </Link> */}
    </StyledPagination>
  );
};

export default Pagination;
