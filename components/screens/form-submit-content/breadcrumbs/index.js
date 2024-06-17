import StyledBreadcrumbs from "./styled-breadcrumbs";
import Link from "@components/common/internal-link";
import Text from "@components/common/text";

const Breadcrumbs = ({ t, locale }) => {
  return (
    <StyledBreadcrumbs>
      <Link className="breadcrumb-links home" href={`/${locale === "en" ? "" : `${locale}/`}`}>{t("Templates")}</Link>
      <Text className="breadcrumb-items-name" label={t("Loading your template")} />
    </StyledBreadcrumbs>
  );
};

export default Breadcrumbs;
