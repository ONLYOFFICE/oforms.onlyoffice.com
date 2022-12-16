import styled from "styled-components";
import { device } from "@components/utils/devices";

import Box from "@components/common/box";
import Link from "@components/common/internal-link";
import Text from "@components/common/text";

const StyledBreadcrumb = styled(Box)`
  gap: 10px;
  padding-bottom: 16px;
  margin-bottom: 48px;
  font-size: 14px;
  color: #444444;
border-bottom: 1px solid #e5e5e5; 

  .breadcrumb-links {
    display: inline;
    position: relative;
    color: #444444;
    text-decoration: none;
    font-size: 14px;
    cursor: pointer;
    padding-right: 10px;
    font-weight: 700;
    :before {
      content: "";
      position: absolute;
      right: 0px;
      top: 7px;
      width: 4px;
      height: 6px;
      background-image: url('https://static-oforms.teamlab.info/icons/line.svg');
      background-repeat: no-repeat;
      background-size: cover;
    }
  }

  .breadcrumb-items-name {
    color: #808080;
    font-size: 14px;
  }
`;

const Breadcrumb = ({ category, language, t }) => {
  const lnh = language === "en" ? "" : `${language}/`;
  return (
    <StyledBreadcrumb>
      <Link className="breadcrumb-links" href={`/${lnh}`}>
        {t("Forms")}
      </Link>
      <Text className="breadcrumb-items-name" label={category} />
    </StyledBreadcrumb>
  );
};

export default Breadcrumb;
