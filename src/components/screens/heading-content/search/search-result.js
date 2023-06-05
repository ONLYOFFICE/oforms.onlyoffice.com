import Text from "@common/text";
import InternalLink from "@common/internal-link";
import reName from "@utils/helpers/fixname";
import StyledSearchResult from "./styled-result";

const SearchResult = ({
  onMouseLeaveSearchResult,
  resultMouseLeave,
  resultItems,
  searchItem,
  isDesktopClient,
  handlerSetModal,
  handlerCardData,
}) => {
  const searchResultArray = resultItems?.data?.length > 0 ? resultItems?.data : [];
  return (
    <>
      {resultMouseLeave && searchItem !== "" && (
        <StyledSearchResult className="search-result-wrapper" onMouseLeave={onMouseLeaveSearchResult}>
          <div className="search-result">
            {searchResultArray.length > 0 ? (
              searchResultArray.map((it, id) => {
                const hrefForm = reName(it.attributes.url);
                const hrefCategory = reName(
                  it.attributes.categories.data[0].attributes.urlReq
                );
                return isDesktopClient ?
                  <div 
                    className="item-search-result" 
                    key={`key-item-${id}`}
                    onClick={() => {handlerSetModal(); handlerCardData(it.attributes);}}
                  >
                    {it.attributes.name_form}
                  </div>
                :
                  <InternalLink
                    className="item-search-result"
                    href={`/${hrefForm}`}
                    key={`key-item-${id}`}
                  >
                    {it.attributes.name_form}
                  </InternalLink>
              })
            ) : (
              <Text
                className="item-search-result text-def"
                label="No more results..."
              />
            )}
          </div>
        </StyledSearchResult>
      )}
    </>
  );
};
export default SearchResult;
