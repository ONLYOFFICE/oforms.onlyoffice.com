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
    padding: 10.5px 32px;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 133%;
    letter-spacing: 0.56px;
    text-decoration: none;
    color: ${({theme}) => theme.colors.palette.textNormal};

    &:hover {
      background-color: ${({theme}) => theme.colors.palette.highlightButtonPressed};
    }

    &.active {
      background-color: ${({theme}) => theme.colors.palette.highlightButtonHover};
    }
  }
  
  .menu-item__icon {
    transform: rotate(-90deg);
  }

  .rc-menu-submenu-popup {
    position: absolute;
    top: 191.5px !important;
    z-index: 1;
    opacity: 1;
  }

  .rc-menu-submenu-hidden {
    opacity: 0;
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

      .rc-menu-sub .menu-item {
        padding: 8px 32px;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 160%;
      }
    `
    
    return css`
      .rc-menu {
        padding: 16px 0;
      }

      .rc-menu-sub .menu-item {
        text-transform: none;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 150%;
      }

      .menu-item {
        padding: 15px 32px;
        font-size: 13px;
        font-style: normal;
        font-weight: 600;
        line-height: 133%;
        letter-spacing: 0.52px;
        text-transform: uppercase;
        text-decoration: none;
        color: ${({theme}) => theme.colors.palette.textNormal};
        

        &:hover {
          color: ${({theme}) => theme.colors.primary};
        }

        &.active {
          color: ${({theme}) => theme.colors.primary};
        }
      }
    `
  }}
`

export const SubMenuBox = styled.div`
  width: 100%;
  ${({inOneColumn, isDesktopClient}) => {
    if (!inOneColumn) {
      return css`
        display: grid;
        grid-template-columns: 1fr 1fr;

        & li:nth-child(odd) {
          border-right: ${isDesktopClient ? `1px solid ${({theme}) => theme.colors.palette.borderToolbarButtonHover}` : undefined};
        }
      `
    }
  }}
`
