import React from "react";

import StyledHeadingContent from "./styled-headig";

import Menu from "./menu";
import SearchContent from "./search";

const HeadingContent = ({ t, template, currentLanguage }) => {
  return (
    <StyledHeadingContent template={template}>
      <Menu t={t} template={template} currentLanguage={currentLanguage} />
      {!template ? <SearchContent t={t} /> : null}
    </StyledHeadingContent>
  );
};

export default HeadingContent;
