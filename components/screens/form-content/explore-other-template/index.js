import StyledExploreOtherTemplate from "./styled-explore-other-template";
import Heading from "@components/common/heading";
import InternalLink from "@components/common/internal-link";

const ExploreOtherTemplate = ({ t, locale, compilations }) => {
  return (
    <StyledExploreOtherTemplate className="explore-other-template">
      <Heading className="explore-other-template-title" level={3} label={t("Explore other template")} />
      <div className="templates-editor">
        <Heading className="explore-other-template-title" level={6} label={t("Templates by editor")} />
        <div className="explore-other-template-items">
          <InternalLink className="templates-editor-btn pdf" label={t("PDF Form")} href="pdf-form-templates" />
          <InternalLink className="templates-editor-btn document" label={t("Document")} href="document-templates" />
          <InternalLink className="templates-editor-btn spreadsheet" label={t("Spreadsheet")} href="spreadsheet-templates" />
          <InternalLink className="templates-editor-btn presentation" label={t("Presentation")} href="presentation-templates" />
        </div>
      </div>
      <div className="popular-compilations">
        <Heading className="explore-other-template-title" level={6} label={t("Popular Compilations")} />
        <div className="explore-other-template-items">
          {compilations.data?.map((compilation) => (
            <InternalLink
              className="btn-transparent"
              href={`${locale === "en" ? "" : locale}/form/compilations/${compilation.attributes.urlReq}`}
              key={compilation.id}
            >
              {compilation.attributes.compilation}
            </InternalLink>
          ))}
        </div>
      </div>
    </StyledExploreOtherTemplate>
  );
};

export default ExploreOtherTemplate;