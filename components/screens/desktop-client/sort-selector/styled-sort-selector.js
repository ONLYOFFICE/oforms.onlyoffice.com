import styled from "styled-components";

const StyledSortSelector = styled.button`
  display: flex;
  border: none;
  padding: 0;
  background-color: transparent;
  cursor: pointer;

  svg {
    path {
      fill: ${props =>
        props.theme === "theme-light" ? "rgba(0, 0, 0, 0.8)" :
        props.theme === "theme-dark" ? "rgba(255, 255, 255, 0.8)" :
        props.theme === "theme-contrast-dark" ? "#E8E8E8" : 
        "#444444"
      };
    }
  }
`;

export default StyledSortSelector;