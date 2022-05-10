import styled from "styled-components";
import { device } from "@components/utils/devices";

import Box from "@components/common/box";
import Link from "@components/common/internal-link";
import Text from "@components/common/text";

const StyledBreadcrumb = styled(Box)`
  gap: 10px;
  padding-top: 15px;
  font-size: 12px;
  color: #444444;

  .breadcrumb-links {
    display: inline;
    position: relative;
    color: #444444;
    text-decoration: none;
    font-size: 12px;
    cursor: pointer;
    padding-right: 10px;
    :before {
      content: "";
      position: absolute;
      right: 0px;
      top: 7px;
      width: 4px;
      height: 6px;
      background-image: url(/icons/line.svg);
      background-repeat: no-repeat;
      background-size: cover;
    }
  }

  .breadcrumb-items {
    display: inline;
    position: relative;
    font-size: 12px;
    margin-left: 10px;
    padding-right: 14px;
    :before {
      content: "";
      position: absolute;
      right: 0px;
      top: 9px;
      width: 4px;
      height: 6px;
      background-image: url(/icons/line.svg);
      background-repeat: no-repeat;
      background-size: cover;
    }
  }

  .breadcrumb-items-name {
    color: #808080;
    font-size: 12px;
  }

  @media ${device.laptop} {
    padding-top: 58px;
  }
`;

const Breadcrumb = ({ name, categories, language, t }) => {
  const lnh = language === "en" ? "" : `${language}/`;
  return (
    <StyledBreadcrumb>
      <Link className="breadcrumb-links" href={`/${lnh}`}>
        {t("Forms")}
      </Link>
      <Link className="breadcrumb-links" href={`/${lnh}form/${categories}`}>
        {categories}
      </Link>
      <Text className="breadcrumb-items-name" label={name} />
    </StyledBreadcrumb>
  );
};

export default Breadcrumb;
