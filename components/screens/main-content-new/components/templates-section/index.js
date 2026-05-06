import InternalLink from "@components/common/internal-link";
import TemplateCard from "../template-card";
import StyledSection from "./styled-templates-section";

const TemplatesSection = ({ title, templates, href }) => {
  if (!templates?.length) return null;

  return (
    <StyledSection>
      {href ? (
        <InternalLink className="section-title-link" href={href}>
          <h2 className="section-title">{title}</h2>
        </InternalLink>
      ) : (
        <h2 className="section-title">{title}</h2>
      )}
      <div className="cards-grid">
        {templates.map((template) => (
          <TemplateCard key={template.id} template={template} />
        ))}
      </div>
    </StyledSection>
  );
};

export default TemplatesSection;
