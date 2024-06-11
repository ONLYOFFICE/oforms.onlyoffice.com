import StyledBreadcrumb from "./styled-breadcrumb";
import Link from "@components/common/internal-link";
import Text from "@components/common/text";

const Breadcrumb = ({ t, locale }) => {
  return (
    <StyledBreadcrumb>
      <Link className="breadcrumb-links home" href={`/${locale === "en" ? "" : `${locale}/`}`}>{t("Templates")}</Link>
      <Text className="breadcrumb-items-name" label={t("Loading your template")} />
    </StyledBreadcrumb>
  );
};

export default Breadcrumb;
