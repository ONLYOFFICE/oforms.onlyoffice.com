import React from "react";

import StyledResultSearch from "./styled-result";

import Link from "../../../../components/internal-link";
import Text from "../../../../components/text";

const SearchResult = ({
  onMouseLeaveSearchResult,
  resultMouseLeave,
  resultItems,
  searchItem,
}) => {
  const resultSearchArray = resultItems ? resultItems : [];
  const lengthResultSearchArray = resultSearchArray.slice(0, 3);

  return (
    <>
      {resultMouseLeave && searchItem !== "" && (
        <StyledResultSearch onMouseLeave={onMouseLeaveSearchResult}>
          <div className="result-search">
            {lengthResultSearchArray.length !== 0 ? (
              lengthResultSearchArray.map(({ name_form }, id) => {
                const href = name_form
                  .replace(/\s/g, "-")
                  .replace(/[{()}]/g, "")
                  .replace("/", "-")
                  .toLowerCase();
                return (
                  <Link
                    className="item-result-search"
                    label={name_form}
                    href={href}
                    key={`key-item-${id}`}
                  />
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