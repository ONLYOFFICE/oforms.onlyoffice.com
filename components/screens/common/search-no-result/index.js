import StyledSearchNoResult from "./styled-search-no-result";
import Heading from "@components/common/heading";

const SearchNoResult = ({ t }) => {
  return (
    <StyledSearchNoResult>
      <Heading className="search-no-result-title" level={3} label={t("No results matching your query could be found")} />
      <div className="search-no-result-img"></div>
    </StyledSearchNoResult>
  );
};

export default SearchNoResult;