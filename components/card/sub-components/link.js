import React from "react";
import styled from "styled-components";
import Link from "../../link";

const ELink = styled(Link)`
  text-decoration: none;
  color: #444444;
  font-weight: 700;
  font-size: 16px;
  line-height: 22px;

  &:hover {
    color: #ff6f3d;
  }

  @media (max-width: 768px) {
    font-size: 14px;
    line-height: 19px;
  }

  @media (max-width: 425px) {
    font-size: 14px;
    line-height: 19px;
  }
`;
const LinkCard = (props) => {
  return <ELink target="_self" {...props} />;
};

export default LinkCard;
