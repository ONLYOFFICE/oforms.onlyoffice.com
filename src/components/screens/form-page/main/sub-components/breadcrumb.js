import styled from "styled-components";
import { device } from "../../../../utils/devices";

import Box from "@common/box";
import Link from "@common/internal-link";
import Text from "@common/text";

const StyledBreadcrumb = styled(Box)`
  gap: 10px;
  padding-top: 15px;
  padding-bottom: 16px;
  margin-bottom: 40px;
  border-bottom: 1px solid #E5E5E5;
  font-size: 12px;
  color: #444444;
  flex-wrap: wrap;

  .breadcrumb-links {
    display: inline;
    position: relative;
    color: #808080;
    text-decoration: none;
    font-size: 14px;
    cursor: pointer;
    padding-right: 10px;
    line-height: 133%;
    :before {
      content: "";
      position: absolute;
      right: 0px;
      top: 7px;
      width: 4px;
      height: 6px;
      background-image: url('https://static-oforms.onlyoffice.com/icons/line.svg');
      background-repeat: no-repeat;
      background-size: cover;
    }

    &.home{
      font-weight: 700;
      color: #444444;
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
      background-image: url('https://static-oforms.onlyoffice.com/icons/line.svg');
      background-repeat: no-repeat;
      background-size: cover;
    }
  }

  .breadcrumb-items-name {
    color: #808080;
    font-size: 14px;
    line-height: 133%;
  }

  @media ${device.laptop} {
    padding-top: 58px;
  }
`;

const Breadcrumb = ({ name, categories, language, t, className, href }) => {
  const lnh = language === "en" ? "" : `${language}/`;
  return (
    <StyledBreadcrumb className={className ? className : null}>
      <Link className="breadcrumb-links home" href={`/${lnh}`}>
        {t("Forms")}
      </Link>
      <Link className="breadcrumb-links" href={`/${lnh}form/${href}`}>
        {categories}
      </Link>
      <Text className="breadcrumb-items-name" label={name} />
    </StyledBreadcrumb>
  );
};

export default Breadcrumb;
