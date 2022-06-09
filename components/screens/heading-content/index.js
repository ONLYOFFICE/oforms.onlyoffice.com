import Menu from "./menu";
import SearchContent from "./search";
import StyledHeadingContent from "./styled-headig";

const HeadingContent = ({ t, template, currentLanguage }) => {
  return (
    <StyledHeadingContent template={template}>
      <Menu t={t} template={template} currentLanguage={currentLanguage} />
      {!template ? (
        <SearchContent t={t} currentLanguage={currentLanguage} />
      ) : null}
    </StyledHeadingContent>
  );
};

export default HeadingContent;
