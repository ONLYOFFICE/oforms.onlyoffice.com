import styled from "styled-components";
import { Base } from "../themes";

const StyledAccordion = styled.div`
display: flex;
flex-direction: column;
`;

StyledAccordion.defaultProps = { theme: Base };

export default StyledAccordion;
