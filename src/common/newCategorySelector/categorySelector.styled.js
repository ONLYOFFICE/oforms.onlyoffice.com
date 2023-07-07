import styled, {createGlobalStyle, css} from "styled-components";

export const CategorySelectorGlobalStyles = createGlobalStyle`
  .rc-menu {
    list-style: none;
    margin: 0;
    
    background-color: ${({theme}) => theme.colors.palette.backgroundNormal};
    width: 278px;
    border-radius: 0 0 6px 6px;
    box-shadow: ${({theme}) => theme.boxShadows.shadowMenu};
    border: 1px solid ${({theme}) => theme.colors.palette.borderToolbarButtonHover};
  }
  
  .menu-item {
    cursor: pointer;
  }
  
  .menu-item__icon {
    transform: rotate(-90deg);
  }

  .rc-menu-submenu-popup {
    position: absolute;
    z-index: 1;
    top: 191.5px !important;
  }

  .rc-menu-submenu-hidden {
    display: none;
  }

  ${({isDesktopClient}) => {
    if (isDesktopClient) return css`
      .rc-menu {
        padding: 24px 0;
      }

      .rc-menu-sub {
        padding: 16px 0;
        border-radius: 0 0 6px 6px;
        box-shadow: ${({theme}) => theme.boxShadows.shadowMenu};
        border: 1px solid ${({theme}) => theme.colors.palette.borderToolbarButtonHover};
        background-color: ${({theme}) => theme.colors.palette.backgroundNormal};
        margin-top: 0.5px;
        width: auto;
      }
      
      .menu-item {
        padding: 10.5px 32px;
        font-size: 14px;
        font-style: normal;
        font-weight: 600;
        line-height: 133%;
        letter-spacing: 0.56px;
        text-decoration: none;
        color: ${({theme}) => theme.colors.palette.textNormal};
        
        &:hover {
          background-color: ${({theme}) => theme.colors.palette.highlightButtonHover};
        }
        
        &.active {
          background-color: ${({theme}) => theme.colors.palette.highlightButtonPressed};
        }
      }

      .rc-menu-sub .menu-item {
        padding: 8px 32px;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 160%;
      }
    `
    
    return css`
      
    `
  }}
`

export const SubMenuBox = styled.div`
  width: 100%;
  ${({inOneColumn}) => {
    if (!inOneColumn) {
      return css`
        display: grid;
        grid-template-columns: 1fr 1fr;

        & li:nth-child(odd) {
          border-right: 1px solid ${({theme}) => theme.colors.palette.borderToolbarButtonHover};;
        }
      `
    }
  }}
`