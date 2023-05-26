import styled from "styled-components";

export const TextInputWrapper = styled.div`
  & .input-component {
    border: 1px solid ${({theme}) => theme.colors.other.gray100};
  }

  & .input-component__input {
    font-weight: 400;
    font-size: 14px;
    line-height: 19px;
  }
  
  & .input-component__label {
    font-weight: 400;
    font-size: 14px;
    line-height: 19px;
    color: ${({theme}) => theme.colors.other.gray100}
  }
`;