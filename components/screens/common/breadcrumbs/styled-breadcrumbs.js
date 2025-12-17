import styled from "styled-components";
import { device } from "@utils/devices";
import chevronRight from "@public/icons/chevron-right.svg";

const StyledBreadcrumbs = styled.ul`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  padding: 0;
  margin: 0;
  list-style-type: none;

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
      ${props => props.$locale === "ar" ? "margin-left: 23px;" : "margin-right: 23px;"}

      &:after {
        content: "";
        position: absolute;
        top: 50%;
        ${props => props.$locale === "ar" ? "left: -16px;" : "right: -16px;"}
        width: 6px;
        height: 8px;
        background-image: url(${chevronRight.src});
        background-repeat: no-repeat;
        transform: ${props => props.$locale === "ar" ? "translateY(-50%) rotate(180deg)" : "translateY(-50%)"};
      }
    }

    @media screen and ${device.laptop} {
      font-size: 12px;
      line-height: 16px;
    }
  }
`;

export default StyledBreadcrumbs;
