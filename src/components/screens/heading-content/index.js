import Menu from "./menu";
import SearchContent from "./search";
import StyledHeadingContent from "./styled-headig";

const HeadingContent = ({ t, template, currentLanguage, isInvert }) => {
  return (
    <StyledHeadingContent template={template}>
      <Menu t={t} template={template} currentLanguage={currentLanguage} isInvert={isInvert} />
      {!template ? (
        <SearchContent t={t} currentLanguage={currentLanguage} />
      ) : null}
    </StyledHeadingContent>
  );
};

export default HeadingContent;
