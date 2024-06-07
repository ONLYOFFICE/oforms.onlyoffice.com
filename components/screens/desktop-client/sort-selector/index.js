import StyledSortSelector from "./styled-sort-selector";
import { useRouter } from "next/router";
import { SortAscIcon } from "./icons/sort-asc";
import { SortDescIcon } from "./icons/sort-desc";

const SortSelector = ({ sort, theme }) => {
  const router = useRouter();

  const handleSortClick = () => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, _sort: router.query._sort === "asc" || router.query._sort == undefined ? "desc" : "asc" }
    }, undefined, { scroll: false });
  };

  return (
    <StyledSortSelector onClick={() => handleSortClick()} theme={theme} className="sort-btn">
      {sort === "asc" ? <SortAscIcon /> : <SortDescIcon />}
    </StyledSortSelector>
  );
};

export default SortSelector;