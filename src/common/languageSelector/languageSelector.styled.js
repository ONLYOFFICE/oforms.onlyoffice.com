import styled from "styled-components";

export const LanguageSelectorStyled = styled.div`
  position: relative;

  .lang-selector__icon {
    color: ${({theme}) => theme.colors.palette.iconNormal};
    transition: all 200ms ease-in-out;
    transform: rotate(${({isOpen}) => isOpen ? '180deg' : '0deg'});
  }

  .lang-selector__dropdown {
    display: ${({isOpen}) => isOpen ? 'block' : 'none'};
    background-color: ${({isDesktopClient, theme}) =>
            isDesktopClient ? theme.colors.palette.backgroundNormal : theme.colors.base.white};
  }

  .lang-selector__link {
    &.active {
      background-color: ${({isDesktopClient, theme}) =>
              isDesktopClient ? theme.colors.palette.canvasScrollThumb : undefined};
    }
    &:hover {
      background-color: ${({isDesktopClient, theme}) =>
              isDesktopClient ? theme.colors.palette.canvasScrollThumbHover : undefined};
    }
  }
`

export const LanguageSelectorHeader = styled.div`
  width: 48px;
  display: grid;
  grid-template-columns: 24px max-content;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
`;

export const LanguageSelectorDropdown = styled.div`
  position: absolute;
  box-shadow: ${({theme}) => theme.boxShadows.shadowMenu};
  top: 25px;
  padding: 4px 0;
  border: 1px solid ${({theme}) => theme.colors.palette.borderToolbar};
  left: -5px;
  border-radius: 2px;
  z-index: 100;
`;

export const LanguageSelectorLink = styled.a`
  display: flex;
  padding: 0 4px;
`;