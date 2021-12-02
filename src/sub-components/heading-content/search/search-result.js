import React from "react";

import StyledResultSearch from "./styled-result";

import Link from "../../../../components/internal-link";
import Text from "../../../../components/text";
import Box from "../../../../components/box";

const SearchResult = ({
    onMouseLeaveSearchResult,
    resultMouseLeave,
    resultItems,
    searchItem
}) => {
    const resultSearchArray = resultItems ? resultItems : [];
    const lengthResultSearchArray = resultSearchArray.slice(0, 3);

    return (
        <>
            {(resultMouseLeave && searchItem !== "") &&
                <StyledResultSearch onMouseLeave={onMouseLeaveSearchResult}>
                    <div className="result-search">
                        {
                            lengthResultSearchArray.length !== 0 ?
                                lengthResultSearchArray.map(({ name }, id) => {
                                    const href = name.replace(/\s/g, "-").replace(/[{()}]/g, '').toLowerCase();
                                    return (<Link label={name} href={href} key={`key-item-${id}`} />);
                                })
                                : <Text>No more results...</Text>
                        }
                    </div>
                </StyledResultSearch>
            }
        </>
    );
};

export default SearchResult;