import Menu from "./menu";
import SearchContent from "./search";
import StyledHeadingContent from "./styled-headig";

const HeadingContent = ({ template, currentLanguage, isInvert, templateForm }) => {
  return (
    <StyledHeadingContent template={template} templateForm={templateForm}>
      <Menu template={template} currentLanguage={currentLanguage} isInvert={isInvert} />
      {!template ? (
        <SearchContent currentLanguage={currentLanguage} />
      ) : null}
    </StyledHeadingContent>
  );
};

export default HeadingContent;
