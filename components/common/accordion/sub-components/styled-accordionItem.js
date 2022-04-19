import styled from "styled-components";
import { Base } from "@components/themes";

const StyledAccordionItem = styled.div`
  position: relative;
  border-top: 1px solid #e5e5e5;
  padding: 24px 0 24px 40px;

  .accordion {
    display: flex;
    justify-content: flex-start;
    cursor: pointer;
    outline: none;
    align-items: center;
  }

  .accordion-icon {
    position: absolute;
    left: 12px;
    top: 24px;
    font-size: 24px;
    line-height: 24px;
    font-weight: 600;
    transition: transform 0.2s ease;
  }

  .accordion-content {
    background-color: white;
    overflow: hidden;
    transition: max-height 0.2s ease;
  }

  .accordion-text {
    font-weight: 400;
    font-size: 14px;
    padding: 24px 0 8px;
  }

  .accordion-heading {
    outline: none;
  }

  @media (max-width: 600px) {
    .accordion-heading {
      font-size: 16px;
    }
  }
`;

StyledAccordionItem.defaultProps = { theme: Base };

export default StyledAccordionItem;
