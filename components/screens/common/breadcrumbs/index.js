import StyledBreadcrumbs from "./styled-breadcrumbs";
import InternalLink from "@components/common/internal-link";

const Breadcrumbs = ({ t, children, label, locale }) => {
  return (
    <StyledBreadcrumbs $locale={locale} className="breadcrumbs">
      <li><InternalLink href="/" label={t("Main templates")} /></li>
      <li>{children || label}</li>
    </StyledBreadcrumbs>
  );
};

export default Breadcrumbs;