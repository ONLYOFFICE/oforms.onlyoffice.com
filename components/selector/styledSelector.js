import styled from "styled-components";
import Text from "../common/text";

export const StyledSelector = styled.div`
  width: max-content;
  position: relative;
  cursor: pointer;
`;

export const StyledSelectorDropdown = styled.div`
  display: ${({isOpen}) => isOpen ? 'block' : 'none'};
`;