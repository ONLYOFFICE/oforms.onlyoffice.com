import styled from "styled-components";
import { Base } from "../../themes";
import { device } from "../utils/devices";

const StyledTextInput = styled.input`
  position: ${(props) => props.theme.textInput.position};
  display: ${(props) => props.theme.textInput.display};
  margin: ${(props) => props.theme.textInput.margin};
  padding: ${(props) => props.padding || props.theme.textInput.padding};
  height: ${(props) => props.height || props.theme.textInput.height};
  width: ${(props) =>
    props.withButton ? "102%" : props.width || props.theme.textInput.width};

  padding-top: ${(props) => props.isPlaceholder && "12px"};
  padding-bottom: ${(props) => !props.isPlaceholder && "2px"};

  color: ${(props) => props.color || props.theme.textInput.textColor};
  font-size: ${(props) => props.fontSize || props.theme.textInput.fontSize};
  font-weight: ${(props) =>
    props.fontWeight || props.theme.textInput.fontWeight};
  overflow: ${(props) => props.theme.textInput.overflow};
  line-height: ${(props) => props.theme.textInput.lineHeight};
  text-decoration: ${(props) => props.theme.textInput.textDecoration};
  text-transform: ${(props) => props.theme.textInput.textTransform};
  text-shadow: ${(props) => props.theme.textInput.textShadow};
  text-align: ${(props) => props.theme.textInput.textAlign};

  outline: ${(props) => props.theme.textInput.outline};

  border-radius: ${(props) => props.theme.textInput.borderRadius};
  -moz-border-radius: ${(props) => props.theme.textInput.borderRadius};
  -webkit-border-radius: ${(props) => props.theme.textInput.borderRadius};

  box-shadow: ${(props) => props.theme.textInput.boxShadow};
  box-sizing: ${(props) => props.theme.textInput.boxSizing};
  border: ${(props) => props.theme.textInput.border};
  z-index: 1;
  border-right: ${(props) =>
    (props.checkButton && "none") || props.theme.textInput.border};

  border-color: ${(props) =>
    (props.isError && props.theme.textInput.borderColorError) ||
    (props.isSuccess && props.theme.textInput.borderColorSuccess) ||
    props.theme.textInput.borderColor};

  background-color: ${(props) =>
    (props.isError && props.theme.textInput.backgroundColorError) ||
    (props.isSuccess && props.theme.textInput.backgroundColorSuccess) ||
    (props.backgroundColor && props.backgroundColor) ||
    props.theme.textInput.backgroundColor};

  cursor: text;
  -webkit-appearance: none;

  &:hover:not(:focus) {
    border-color: ${(props) =>
      (props.isError && props.theme.textInput.borderColorError) ||
      (props.isSuccess && props.theme.textInput.borderColorSuccess) ||
      props.theme.textInput.borderColorHover};

    background-color: ${(props) =>
      (props.isError && props.theme.textInput.backgroundColorError) ||
      (props.isSuccess && props.theme.textInput.backgroundColorSuccess) ||
      (props.backgroundColor && props.backgroundColor) ||
      props.theme.textInput.backgroundColor};
  }

  &:focus {
    border-color: ${(props) => props.theme.textInput.borderColorHover};

    background-color: ${(props) =>
      (props.backgroundColor && props.backgroundColor) ||
      props.theme.textInput.backgroundColor};
  }

  &:disabled {
    cursor: default;
    border-color: ${(props) => props.theme.textInput.borderColorDisabled};
    background-color: ${(props) =>
      props.theme.textInput.backgroundColorDisabled};
  }

  @media ${device.tablet} {
    width: ${(props) =>
      props.withButton
        ? "102%"
        : props.width || props.theme.textInput.media.width};
    font-size: ${(props) => props.fontSize || props.theme.textInput.fontSize};
  }

  @media (max-width: 592px) {
    height: 48px;
  }

  @media ${device.mobileL} {
    width: ${(props) =>
      props.withButton
        ? "102%"
        : props.width || props.theme.textInput.media.width};
    font-size: ${(props) => props.theme.textInput.media.fontSize};
  }
`;

StyledTextInput.defaultProps = { theme: Base };

export default StyledTextInput;
