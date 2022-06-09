import styled from "styled-components";
import { Base } from "../../themes";
import Button from "../button";

const StyledButtonInput = styled(Button)`
  padding: ${(props) => props.padding || props.theme.textInput.padding};
  height: ${(props) => props.height || props.theme.textInput.height};
  z-index: 1;
  width: ${(props) =>
    props.squareButton
      ? props.height || props.theme.textInput.height
      : "min-content"};

  overflow: ${(props) => props.theme.button.overflow};
  text-overflow: ${(props) => props.theme.button.textOverflow};
  position: relative;
  float: right;

  padding: 20px;
`;

StyledButtonInput.defaultProps = { theme: Base };

export default StyledButtonInput;
