import styled, {css} from "styled-components";

export const StyledHeader = styled.header`
  padding: 41px 37px 0 37px;
  
  ${({isDesktopClient, theme}) => {
      if(isDesktopClient) {
          return css`
            position: sticky;
            top: 0;
            z-index: 10;
            background-color: ${theme.colors.palette.backgroundNormal};
            
            
            @media screen and (min-width: 600px) {
              .header__box {
                border-bottom: 1px solid ${theme.colors.palette.borderToolbarButtonHover};
              }
            }
          `
      }
  }}
`;

export const HeaderBox = styled.div`
  display: flex;
  align-items: center;
`

export const HeaderTitle = styled.h3`
  margin: 0 0 23px 0;
  font-style: normal;
  font-weight: 300;
  font-size: 24px;
  line-height: 32px;
  color: ${({theme}) => theme.colors.palette.textNormal};
  padding-bottom: 12px;
  border-bottom: 1px solid ${({theme}) => theme.colors.palette.borderToolbarButtonHover};
`
