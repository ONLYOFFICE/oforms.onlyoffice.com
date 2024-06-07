import StyledBreadcrumbs from "./styled-breadcrumbs";
import InternalLink from "@components/common/internal-link";

const Breadcrumbs = ({ t, children }) => {
  return (
    <StyledBreadcrumbs className="breadcrumbs">
      <li><InternalLink href="/" label={t("Main templates")} /></li>
      <li>{children}</li>
    </StyledBreadcrumbs>
  );
};

export default Breadcrumbs;