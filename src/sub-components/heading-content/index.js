import React from "react";

import StyledHeadingContent from "./styled-headig";

import Menu from "./menu";
import SearchContent from "./search";

const HeadingContent = ({
    template,
}) => {
    return (
        <StyledHeadingContent template={template}>
            <Menu template={template} />
            {!template ? <SearchContent /> : null}
        </StyledHeadingContent>
    );
};

export default HeadingContent;