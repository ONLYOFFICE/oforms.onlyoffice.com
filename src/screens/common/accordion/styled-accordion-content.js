import styled from "styled-components";
import Section from "@common/section";

const StyledAccordionContent = styled(Section)`
  .text-trans-accordion {
    vertical-align: bottom;
    .link-trans-acc {
      display: contents;
    }
  }
  .accordion-text {
    .link-trans-acc {
      display: contents;
    }
  }
  .titleAccordion {
    padding: 0 0 56px;
    font-size: 32px;
    line-height: 38px;
    font-weight: 700;

    @media (max-width: 500px) {
      padding: 0 0 40px;
    }
  }
  @media (max-width: 500px) {
    .titleAccordion {
      font-size: 24px;
    }
    .text-trans-accordion {
      font-size: 13px;
    }
    .accordion-text {
      .link-trans-acc {
        display: contents;
        font-size: inherit;
      }
    }
  }
`;

export default StyledAccordionContent;
