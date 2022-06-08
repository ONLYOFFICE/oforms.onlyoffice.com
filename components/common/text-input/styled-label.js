import styled from "styled-components";
import { Base } from "../../themes";

const Label = styled.label`
  width: calc(100% - 40px);
  font-size: ${(props) =>
    !props.isEmpty
      ? props.theme.textInput.label.fontSize
      : props.theme.textInput.fontSize};
  z-index: 2;
  color: ${(props) =>
    props.labelColor ||
    (props.isError
      ? "#CB0000"
      : props.isSuccess
      ? "#8BB825"
      : props.theme.textInput.placeholderColor)};

  position: absolute;
  top: ${(props) =>
    props.defaultChecked ? props.theme.textInput.label.top : "30%"};
  left: ${(props) =>
    props.defaultChecked ? props.theme.textInput.label.left : "0px"};
  padding: ${(props) => props.padding || props.theme.textInput.label.padding};
  margin: ${(props) => props.margin || props.theme.textInput.margin};

  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  pointer-events: none;
  user-select: none;
  vertical-align: ${(props) => props.theme.textInput.verticalAlign};

  -webkit-transition: top 0.2s ease-in-out, font-size 0.2s ease-in-out,
    left 0.2s ease-in-out;
  transition: top 0.2s ease-in-out, font-size 0.2s ease-in-out,
    left 0.2s ease-in-out;

  @media (max-width: 592px) {
    top: ${(props) =>
      props.defaultChecked ? props.theme.textInput.label.top : "27%"};
  }
`;

Label.defaultProps = { theme: Base };

export default Label;
