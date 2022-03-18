import React from "react";
import styled from "styled-components";
import { device } from "../../../../../components/utils/devices";

import line from "../../../../../static/icons/line.svg";

import Box from "../../../../../components/box";
import Link from "../../../../../components/internal-link";

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
    :before {
      content: "";
      position: absolute;
      right: -10px;
      top: 6px;
      width: 4px;
      height: 6px;
      background-image: url(${line});
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
      background-image: url(${line});
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

const Breadcrumb = ({ name, categories, language }) => {
  const lnh = language === "en" ? "" : `${language}/`;
  return (
    <StyledBreadcrumb>
      <Link className="breadcrumb-links" href={`/${lnh}`} label={"Forms"} />
      {/* <Text className="breadcrumb-items" label={categories} />
      <Text className="breadcrumb-items-name" label={name} /> */}
    </StyledBreadcrumb>
  );
};

Breadcrumb.propTypes = {};

export default Breadcrumb;
