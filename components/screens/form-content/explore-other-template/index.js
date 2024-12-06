import StyledExploreOtherTemplate from "./styled-explore-other-template";
import Heading from "@components/common/heading";
import InternalLink from "@components/common/internal-link";

const ExploreOtherTemplate = ({ t, locale, compilations }) => {
  return (
    <StyledExploreOtherTemplate className="explore-other-template" locale={locale}>
      <Heading className="explore-other-template-title" level={3} label={t("Explore other templates")} />
      <div className="templates-editor">
        <Heading className="explore-other-template-title" level={6} label={t("Templates by editor")} />
        <div className="explore-other-template-items">
          <InternalLink id="templates-editor-pdf-btn" className="templates-editor-btn pdf" label={t("PDF Form")} href="pdf-form-templates" />
          <InternalLink id="templates-editor-docx-btn" className="templates-editor-btn docx" label={t("Document")} href="document-templates" />
          <InternalLink id="templates-editor-xlsx-btn" className="templates-editor-btn xlsx" label={t("Spreadsheet")} href="spreadsheet-templates" />
          <InternalLink id="templates-editor-pptx-btn" className="templates-editor-btn pptx" label={t("Presentation")} href="presentation-templates" />
        </div>
      </div>
      <div className="popular-compilations">
        <Heading className="explore-other-template-title" level={6} label={t("Popular compilations")} />
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