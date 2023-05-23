import styled, {css} from "styled-components";

export const CategorySelectorDropdown = styled.div`
  position: absolute;
  min-width: 291px;
  z-index: 99;
  left: -26px;
  top: calc(100% + 18px);
  background-color: ${({theme}) => theme.colors.palette.backgroundNormal};
  border-radius: 0px 0px 6px 6px;
  padding: 16px 0;
  box-shadow: ${({theme}) => theme.boxShadows.shadowMenu};
  display: flex;
  flex-direction: column;
  border: 1px solid ${({theme}) => theme.colors.palette.borderToolbarButtonHover};

  &:before {
    content: "";
    position: absolute;
    width: 100%;
    height: 18px;
    top: -18px;
    left: 0;
    background-color: transparent;
  }
}

@media (max-width: 1150px) {
  .heading-nav-item:before {
    display: none;
  }
}
`;

export const CategorySelectorDropdownItem = styled.span`
  font-size: 13px;
  cursor: pointer;
  white-space: nowrap;
  font-weight: 600;
  letter-spacing: 0.04em;
  color: ${({theme}) => theme.colors.palette.textNormal};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 32px;

  & path {
    fill: ${({theme}) => theme.colors.palette.textNormal};
  }

  ${({isOpen, theme, isDesktopClient}) => {
    const styles = css`
      background-color: ${isDesktopClient ? theme.colors.palette.highlightButtonHover : undefined};
      color: ${isDesktopClient ? theme.colors.palette.textNormal : theme.colors.primary};

      & .arrow-right path {
        fill: ${isDesktopClient ? theme.colors.palette.textNormal : theme.colors.primary};
      }
    `
    if (isOpen) return styles;
  }}
`;

export const CategorySelectorDropdownLink = styled.a`
  font-size: 16px;
  font-weight: 600;
  text-transform: capitalize;
  text-decoration: none;
  color: ${({theme}) => theme.colors.palette.textNormal};
  padding: 15px 32px;
  width: 100%;

  &:hover {
    ${(p) => {
      const {isDesktopClient, theme} = p;
      return {
        backgroundColor: isDesktopClient ? theme.colors.palette.highlightButtonHover : undefined,
        color: isDesktopClient ? theme.colors.palette.textNormal : theme.colors.primary,
      }
    }}
  }
`;

export const CategorySelectorDropdownSubmenu = styled.div`
  background-color: ${({theme}) => theme.colors.palette.backgroundNormal};
  padding: 16px 0;
  position: absolute;
  z-index: 99;
  left: 289px;
  top: 0;
  border-radius: 0 0 6px 6px;
  box-shadow: ${({theme}) => theme.boxShadows.shadowMenu};
  border: 1px solid ${({theme}) => theme.colors.palette.borderToolbarButtonHover};
  margin-top: -1px;
  ${(p) => {
    const {inOneColumn} = p
    if (!inOneColumn) {
      return css`
        display: grid;
        grid-template-columns: 1fr 1fr;
      `
    } else {
      return css`
        & a:nth-child(odd) {
          border-right: none;
        }
      `
    }
  }}
`;

export const CategorySelectorDropdownSubmenuLink = styled.a`
  padding: 15px 32px;
  font-weight: 400;
  text-transform: capitalize;
  font-size: 14px;
  line-height: 160%;
  text-decoration: none;
  color: ${({theme}) => theme.colors.palette.textNormal};
  white-space: nowrap;
  display: block;

  &:nth-child(odd) {
    ${(p) => {
        const { isDesktopClient, theme } = p;
        if(isDesktopClient) {
            return {
                borderRight: `1px solid ${theme.colors.palette.borderToolbar}`
            }
        }
    }}
  }

  &:hover {
    ${(p) => {
      const {isDesktopClient, theme} = p;
      return {
        backgroundColor: isDesktopClient ? theme.colors.palette.highlightButtonHover : undefined,
        color: isDesktopClient ? theme.colors.palette.textNormal : theme.colors.primary,
      }
    }}
  }
`;