import styled from "styled-components";

const StyledAccordionContent = styled.div`
  .text-trans-accordion {
    vertical-align: bottom;
    .link-trans-acc {
      display: contents;
    }
  }
  .accordion__text {
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
