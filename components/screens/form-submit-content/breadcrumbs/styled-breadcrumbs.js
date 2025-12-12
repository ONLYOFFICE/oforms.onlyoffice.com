import styled from "styled-components";
import { device } from "@utils/devices";

const StyledBreadcrumbs = styled.div`
  margin-bottom: 32px;
  font-size: 14px;
  line-height: 24px;

  .breadcrumbs-link {
    position: relative;
    ${props => props.$locale === "ar" ? "margin-left: 23px;" : "margin-right: 23px;"}
    line-height: 24px;
    text-decoration: none;
    cursor: pointer;

    &:before {
      content: "";
      position: absolute;
      ${props => props.$locale === "ar" ? "left: -13px;" : "right: -13px;"}
      top: 50%;
      width: 4px;
      height: 6px;
      background-image: url("https://static-oforms.onlyoffice.com/icons/line.svg");
      background-repeat: no-repeat;
      background-size: contain;
      transform: ${props => props.$locale === "ar" ? "translateY(-50%) rotate(180deg)" : "translateY(-50%)"};
    }

    &.home {
      font-weight: 700;
      color: #444444;
      overflow: initial;
    }

    &:hover {
      text-decoration: underline;
    }
  }

  .breadcrumbs-item {
    line-height: 24px;
    color: #808080;
  }

  @media ${device.mobile} {
    margin-bottom: 24px;
  }
`;

export default StyledBreadcrumbs;