import styled from "styled-components";
import { device } from "@utils/devices";
import chevronRight from "@public/icons/chevron-right.svg";

const StyledBreadcrumbs = styled.ul`
  display: flex;
  align-items: center;
  padding: 0;
  margin: 0;
  list-style-type: none;

  &.ar li:not(:last-child) {
      margin-right: 0;
      margin-left: 23px;

      &:before {
        content: "";
        position: absolute;
        top: 50%;
        left: -16px;
        width: 6px;
        height: 8px;
        background-image: url(${chevronRight.src});
        background-repeat: no-repeat;
        transform: translateY(-50%) rotate(180deg);
      }

      &::after {
        display: none;
      }
  }

  li {
    position: relative;
    font-size: 14px;
    line-height: 24px;
    color: #808080;

    .internal-link {
      font-size: 14px;
      line-height: 24px;
      font-weight: 700;
      color: #444444;

      &:hover {
        text-decoration: underline;
      }

      @media screen and ${device.laptop} {
        font-size: 12px;
        line-height: 16px;
      }
    }

    &:not(:last-child) {
      margin-right: 23px;

      &:after {
        content: "";
        position: absolute;
        top: 50%;
        right: -16px;
        width: 6px;
        height: 8px;
        background-image: url(${chevronRight.src});
        background-repeat: no-repeat;
        transform: translateY(-50%);
      }
    }

    @media screen and ${device.laptop} {
      font-size: 12px;
      line-height: 16px;
    }
  }
`;

export default StyledBreadcrumbs;
