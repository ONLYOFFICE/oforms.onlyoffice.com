import InternalLink from "@components/common/internal-link";
import TemplateCard from "../template-card";
import StyledSection from "./styled-templates-section";

const TemplatesSection = ({ title, templates, href }) => {
  if (!templates?.length) return null;

  return (
    <StyledSection>
      <h2 className="section-title">
        {href ? (
          <InternalLink className="section-title-link" href={href}>
            {title}
          </InternalLink>
        ) : (
          title
        )}
      </h2>
      <ul className="cards-grid">
        {templates.map((template) => (
          <li key={template.id} className="cards-grid__item">
            <TemplateCard template={template} />
          </li>
        ))}
      </ul>
    </StyledSection>
  );
};

export default TemplatesSection;
