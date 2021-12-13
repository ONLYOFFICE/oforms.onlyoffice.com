import styled from "styled-components";


const StyledAccordionContent = styled.div`
    .titleAccordion{
        padding: 0 0 56px;

        @media (max-width: 500px) {
            padding: 0 0 40px;
        }
    }

    .text-trans-accordion {
        vertical-align: bottom;
    }

    .link-trans-acc {
        display: block;
    }
`;





export default StyledAccordionContent;
