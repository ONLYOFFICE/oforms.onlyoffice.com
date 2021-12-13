import styled from "styled-components";
import { Base } from "../themes";

const StyledInput = styled.div`
  display: block;
  position: relative;
  width: ${(props) => props.width || props.theme.textInput.width};
  padding: 0;
  margin: 0;
  z-index: 1;
  input:focus + label {
    top: ${(props) => props.theme.textInput.label.top};
    font-size: ${(props) => props.theme.textInput.label.fontSize};
    left: ${(props) => props.theme.textInput.label.left};
    color: ${(props) =>
    props.colorHover ||
    (props.defaultInput && props.theme.textInput.backgroundColor) ||
    (props.isSuccess && props.theme.textInput.borderColorSuccess) ||
    (props.isError && props.theme.textInput.borderColorError) ||
    props.theme.textInput.label.colorHover};
  }

  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 30px white inset !important;
  }

  .error-text {
    position: absolute;
    padding-top: 55px;
    z-index: 0;
    width: max-content;

    @media (max-width: 592px) {
      padding-top: 46px;
      max-width: calc(100vw - 64px);
      line-height: 16px;
      position: relative;
    }
  }
`;

StyledInput.defaultProps = { theme: Base };

export default StyledInput;
