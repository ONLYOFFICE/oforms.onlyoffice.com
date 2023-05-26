import styled, {css} from "styled-components";

export const InputStyled = styled.input`
  background-color: transparent;
  border: none;
  outline: none;
  width: 100%;
  display: block;
  margin: 0;
  padding: 16px 0 16px 16px;

  & + label {
    ${({inFocus}) => {
      if (inFocus) {
        return css`
          transform: translateY(-15px) scale(0.8);
        `
      }
    }}
  }
`;

export const InputLabel = styled.label`
  position: absolute;
  left: 16px;
  top: 16px;
  transition: 100ms transform ease-in-out;
  transform-origin: top left;
  pointer-events: none;
`;

export const InputWrapper = styled.div`
  border-radius: 3px;
  overflow: hidden;
  width: ${({width}) => width || '100%'};
  position: relative;
  display: flex;
`;

export const InputIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  
  &.input-component__clear-icon {
    cursor: pointer;
  }
`;