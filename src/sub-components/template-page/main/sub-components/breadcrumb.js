import React from "react";
import styled from "styled-components";
import { device } from "../../../../../components/utils/devices";

import Box from "../../../../../components/box";
import Link from "../../../../../components/internal-link";
import Text from "../../../../../components/text";

const StyledBreadcrumb = styled(Box)`
  gap: 10px;
  padding-top: 15px;
  font-size: 12px;
  color: #444444;
  align-items: flex-start;

  .breadcrumb-links {
    color: #444444;
    text-decoration: none;
    font-size: 12px;
  }

  .breadcrumb-items {
    font-size: 12px;
  }

  .breadcrumb-items-name {
    color: #808080;
    font-size: 12px;
  }

  @media ${device.tablet} {
    padding-top: 0;
  }
`;

const Breadcrumb = ({ name, categories }) => {
  return (
    <StyledBreadcrumb>
      <Link className="breadcrumb-links" href="/" label={"Forms"} />
      <Text className="breadcrumb-items" label={">"} />
      <Text className="breadcrumb-items" label={categories} />
      <Text className="breadcrumb-items" label={">"} />
      <Text className="breadcrumb-items-name" label={name} />
    </StyledBreadcrumb>
  );
};

Breadcrumb.propTypes = {};

export default Breadcrumb;
