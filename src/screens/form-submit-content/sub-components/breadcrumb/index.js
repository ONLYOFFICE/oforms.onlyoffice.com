import StyledBreadcrumb from "./styled-breadcrumb";
import Link from "@common/internal-link";
import Text from "@common/text";

const Breadcrumb = ({ t, language }) => {
  const lnh = language === "en" ? "" : `${language}/`;

  return (
    <StyledBreadcrumb>
      <Link className="breadcrumb-links home" href={`/${lnh}`}>{t("Forms")}</Link>
      <Text className="breadcrumb-items-name" label={"Loading your form"} />
    </StyledBreadcrumb>
  );
};

export default Breadcrumb;
