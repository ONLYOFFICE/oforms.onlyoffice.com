import styled from "styled-components";
import { device } from "@utils/devices";

const StyledBreadcrumb = styled.div`
  margin-bottom: 32px;
  font-size: 14px;
  line-height: 24px;

  .breadcrumb-links {
    position: relative;
    margin-right: 23px;
    line-height: 24px;
    text-decoration: none;
    cursor: pointer;

    &:before {
      content: "";
      position: absolute;
      right: -13px;
      top: 50%;
      width: 4px;
      height: 6px;
      background-image: url("https://static-oforms.onlyoffice.com/icons/line.svg");
      background-repeat: no-repeat;
      background-size: contain;
      transform: translateY(-50%);
    }

    &.home {
      font-weight: 700;
      color: #444444;
      overflow: initial;
    }
  }

  .breadcrumb-items-name {
    line-height: 24px;
    color: #808080;
  }

  @media ${device.mobile} {
    margin-bottom: 24px;
  }
`;

export default StyledBreadcrumb;