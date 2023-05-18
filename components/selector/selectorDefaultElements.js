import styled from "styled-components";

export const SelectorDefaultDropdown = styled.ul`
  list-style: none;
  margin: 0;
  padding: 4px 0;
  border: 1px solid ${({theme}) => theme.colors.palette.borderToolbarButtonHover};
  background-color: ${(p) => p.theme.colors.palette.backgroundNormal};
  box-shadow: ${({theme}) => theme.boxShadows.shadowMenu};
  width: inherit;
  display: flex;
  flex-direction: column;
  position: absolute;
  z-index: 99;
  top: 100%;
  right: 0;
`;

export const SelectorDefaultDropdownItem = styled.li`
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 160%;
  color: ${({theme}) => theme.colors.palette.textNormal};
  text-decoration: none;
  padding: 3px 11px;
  background-color: ${(p) => p.isDesktopClient ?( p.isActive ? p.theme.colors.palette.highlightButtonHover : undefined) : undefined};
  &:hover {
    ${(p) => {
    if(p.isDesktopClient) {
        return {
            backgroundColor: p.theme.colors.palette.highlightButtonHover
        }
    }

    return {
        color: '#ff6f3d'
    }
}
}
`;