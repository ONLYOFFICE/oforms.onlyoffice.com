import StyledBreadcrumbs from "./styled-breadcrumbs";
import Link from "@components/common/internal-link";
import Text from "@components/common/text";

const Breadcrumbs = ({ t, locale }) => {
  return (
    <StyledBreadcrumbs>
      <Link className="breadcrumbs-link home" href={`/${locale === "en" ? "" : `${locale}/`}`} label={t("Templates")} />
      <Text className="breadcrumbs-item" label={t("Loading your template")} />
    </StyledBreadcrumbs>
  );
};

export default Breadcrumbs;
