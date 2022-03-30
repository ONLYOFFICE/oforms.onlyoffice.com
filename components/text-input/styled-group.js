import styled from "styled-components";
import { Base } from "../themes";

const StyleGroupInput = styled.div`
  display: grid;
  grid-template-columns: auto max-content;
  width: ${(props) => props.width || "100%"};
  height: ${(props) => props.height || props.theme.textInput.height};

  @media (max-width: 592px) {
    height: 48px;
  }
`;

StyleGroupInput.defaultProps = {
  theme: Base,
};
export default StyleGroupInput;
