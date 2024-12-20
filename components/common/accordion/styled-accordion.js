import styled from "styled-components";
import { device } from "@utils/devices";
import plusIcon from "@public/icons/plus.svg";
import minusIcon from "@public/icons/minus.svg";

const StyledAccordion = styled.div`
  .accordion-item {
    border-top: 1px solid #E5E5E5;
  }

  .accordion-header {
    display: flex;
    border: none;
    padding: 22px 0;
    width: 100%;
    cursor: pointer;
    background-color: transparent;
  }

  .accordion-heading {
    text-align: ${props => props.locale === "ar" ? "right" : "left"};
    letter-spacing: -0.02em;
    color: #333333;

    @media screen and ${device.laptop} {
      font-size: 16px;
    }
  }

  .accordion-icon {
    ${props => props.locale === "ar" ? "margin-left: 10px;" : "margin-right: 10px;"}
    width: 24px;
    min-width: 24px;
    height: 24px;
    background-repeat: no-repeat;

    &.plus {
      background-image: url(${plusIcon.src});
    }

    &.minus {
      background-image: url(${minusIcon.src});
    }
  }

  .accordion-content {
    overflow: hidden;
    transition: max-height 0.2s ease;
  }

  .accordion-text {
    padding: ${props => props.locale === "ar" ? "2px 34px 22px 0" : "2px 0 22px 34px"};
    font-size: 14px;

    a {
      color: #FF6F3D;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }

    @media screen and ${device.laptop} {
      font-size: 13px;
    }
  }
`;
export default StyledAccordion;
