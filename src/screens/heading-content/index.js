import Menu from "./menu";
import SearchContent from "./search";
import StyledHeadingContent from "./styled-headig";

const HeadingContent = ({ t, template, currentLanguage, isInvert, templateForm, stateMobile, setStateMobile }) => {
  return (
    <StyledHeadingContent template={template} templateForm={templateForm}>
      <Menu t={t} template={template} locale={currentLanguage} isInvert={isInvert} stateMobile={stateMobile} setStateMobile={setStateMobile} />
      {!template ? (
        <SearchContent currentLanguage={currentLanguage} />
      ) : null}
    </StyledHeadingContent>
  );
};

export default HeadingContent;
