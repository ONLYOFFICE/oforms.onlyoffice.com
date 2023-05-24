import styled, {css} from "styled-components";

export const StyledHeader = styled.header`
  padding-top: 32px;
  display: flex;
  align-items: center;
  
  ${({isDesktopClient, theme}) => {
      if(isDesktopClient) {
          return css`
            position: sticky;
            top: 0;
            z-index: 10;
            background-color: ${theme.colors.palette.backgroundNormal};
            border-bottom: 1px solid ${theme.colors.palette.borderToolbarButtonHover};
          `
      }
  }}
`;