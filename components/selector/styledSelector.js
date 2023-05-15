import styled from "styled-components";

export const StyledSelector = styled.div`
  width: max-content;
  display: flex;
  align-items: center;
  gap: 8px;
  position: relative;
  cursor: pointer;
  
  .selector__label {
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 160%;
    color: ${({theme}) => theme.colors.palette.textSecondary};
  }
  
  .selector__value {
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 133%;
    color: ${({theme}) => theme.colors.palette.textNormal};
    cursor: pointer;
  }
  
  .selector__icon {
    cursor: pointer;
    transition: transform 200ms ease-in-out;
    transform: rotate(0deg);
    path {
      fill: ${({theme}) => theme.colors.palette.iconNormal};
    }
  }
  
  
  &.open .selector__icon {
    transform: rotate(180deg);
  }
`;

export const StyledSelectorDropdown = styled.div`
  display: ${({isOpen}) => isOpen ? 'block' : 'none'};
  position: absolute;
  z-index: 99;
  top: 100%;
  right: 0;
`;