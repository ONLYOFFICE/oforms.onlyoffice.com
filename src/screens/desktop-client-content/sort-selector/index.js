import StyledSortSelector from "./styled-sort-selector";
import { useRouter } from "next/router";
import { SortAsc, SortDesc } from "@icons";

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
      {sort === "asc" ? <SortAsc size={24} /> : <SortDesc size={24} />}
    </StyledSortSelector>
  );
};

export default SortSelector;