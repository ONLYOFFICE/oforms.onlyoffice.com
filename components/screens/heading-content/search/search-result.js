import Text from "@components/common/text";
import Link from "@components/common/internal-link";
import reName from "@utils/helpers/fixname";
import StyledResultSearch from "./styled-result";

const SearchResult = ({
  onMouseLeaveSearchResult,
  resultMouseLeave,
  resultItems,
  searchItem,
}) => {
  const resultSearchArray =
    resultItems?.data?.length > 0 ? resultItems?.data : [];
  const lengthResultSearchArray = resultSearchArray.slice(0, 3);
  return (
    <>
      {resultMouseLeave && searchItem !== "" && (
        <StyledResultSearch onMouseLeave={onMouseLeaveSearchResult}>
          <div className="result-search">
            {lengthResultSearchArray.length > 0 ? (
              lengthResultSearchArray.map((it, id) => {
                const hrefForm = reName(it.attributes.url);
                const hrefCategory = reName(
                  it.attributes.categories.data[0].attributes.urlReq
                );
                return (
                  <Link
                    className="item-result-search"
                    href={"/form/[category]/[form]"}
                    as={`/form/${hrefCategory}/${hrefForm}`}
                    key={`key-item-${id}`}
                  >
                    {it.attributes.name_form}
                  </Link>
                );
              })
            ) : (
              <Text
                className="item-result-search text-def"
                label="No more results..."
              />
            )}
          </div>
        </StyledResultSearch>
      )}
    </>
  );
};

export default SearchResult;
