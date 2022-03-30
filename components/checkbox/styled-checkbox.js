import styled from "styled-components";
import Base from "../themes/base";

const StyledLabel = styled.label`
  display: grid;
  grid-template-columns: min-content auto;
  align-items: center;
  gap: 8px;
  position: relative;
  margin: 0;
  max-width: calc(100% - 32px);

  user-select: none;
  -o-user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

  color: ${(props) => props.theme.checkbox.color};
  font-size: ${(props) => props.theme.checkbox.fontSize};
  line-height: ${(props) => props.theme.checkbox.lineHeight};

  cursor: ${(props) => (props.isDisabled ? "not-allowed" : "pointer")};

  .checkbox-text {
    vertical-align: bottom;
  }
`;

StyledLabel.defaultProps = { theme: Base };

const HiddenInput = styled.input`
  opacity: 0.0001;
  position: absolute;
  right: 0;
  z-index: -1;
`;

export { StyledLabel, HiddenInput };
