import React from "react";

import StyledHeadingContent from "./styled-headig";

import Menu from "./menu";
import SearchContent from "./search";

const HeadingContent = ({
    t,
    language,
    template,
}) => {
    return (
        <StyledHeadingContent template={template}>
            <Menu template={template} t={t} language={language} />
            {!template ? <SearchContent t={t} /> : null}
        </StyledHeadingContent>
    );
};

export default HeadingContent;