import styled from "styled-components";
import Section from "@components/common/section";

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

    @media (max-width: 500px) {
      padding: 0 0 40px;
    }
  }
`;

export default StyledAccordionContent;
