import React from "react";

import StyledResultSearch from "./styled-result";

import Link from "@components/common/internal-link";
import Text from "@components/common/text";

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
                console.log("it = ", it.attributes.name_form);
                const href = it.attributes.name_form
                  .replace(/\s/g, "-")
                  .replace(/[{()}]/g, "")
                  .replace("/", "-")
                  .toLowerCase();
                return (
                  <Link
                    className="item-result-search"
                    label={it.attributes.name_form}
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
