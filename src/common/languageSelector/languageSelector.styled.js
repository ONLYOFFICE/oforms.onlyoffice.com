import styled, { keyframes } from 'styled-components';

const runningLine = keyframes`
    from {
        width: 0;
    }

    to {
        width: 50%;
    }
`;

export const LanguageSelectorFlag = styled.span`
    background-image: url("https://static-www.onlyoffice.com/images/flags/flags.svg");
    background-repeat: no-repeat;

    width: 24px;
    height: 24px;

    &.en {
        background-position-y: -24px;
    }

    &.fr {
        background-position-y: -72px;
    }

    &.de {
        background-position-y: 0;
    }

    &.es {
        background-position-y: -48px;
    }

    &.pt {
        background-position-y: -192px;
    }

    &.it {
        background-position-y: -96px;
    }

    &.ja {
        background-position-y: -360px;
    }

    &.zh {
        background-position-y: -168px;
    }
`;

export const LanguageSelectorIconWrapper = styled.div`
    display: flex;

    transition: transform 200ms ease-in-out;

    svg {
        color: ${({ theme, $isDesktopClient }) => $isDesktopClient ? theme.colors.newPalette.iconNormal : '#FFF'};
    }
    
    &.inverted svg {
        color: #444444;
    }
`;

export const LanguageSelectorStyled = styled.div`
    position: relative;

    &.expanded {
        .chevron-icon {
            transform: rotate(180deg);
        }
    }
`;

export const LanguageSelectorHeader = styled.header`
    display: flex;
    align-items: center;
    height: 100%;

    margin: 0;
    padding: 0;
    border: 0;
    background-color: transparent;
    cursor: pointer;
    
    gap: ${({$isDesktopClient}) => $isDesktopClient ? undefined : '5px'};
`;

export const DesktopLanguageSelectorList = styled.ul`
    margin: 0;
    padding: 4px 0;
    list-style: none;

    display: flex;
    flex-direction: column;

    border: 1px solid ${({ theme }) => theme.colors.newPalette.highlightButtonPressed};
    background-color: ${({ theme }) => theme.colors.newPalette.backgroundNormal};
    border-radius: 2px;

    position: absolute;
    z-index: 1;
    left: -5px;
`;

export const DesktopLanguageSelectorItemLink = styled.a`
    padding: 0 4px;
    display: flex;
    
    outline: none;

    &.current {
        background-color: ${({ theme }) => theme.colors.newPalette.highlightButtonPressed};
    }

    &:hover, &:focus-visible {
        background-color: ${({ theme }) => theme.colors.newPalette.highlightButtonHover};
    }
`;

export const WebsiteLanguageSelectorList = styled.ul`
    margin: 0;
    list-style: none;

    display: flex;
    align-items: center;
    flex-direction: column;

    position: absolute;
    z-index: 1;
    left: -10px;
    top: 100%;

    background-color: #fff;
    padding: 16px;
    box-shadow: 0 20px 50px rgba(85, 85, 85, 0.15);
    border-radius: 0 0 8px 8px;

    &:after, &:before {
        animation-name: ${runningLine};
        animation-duration: 300ms;
        animation-fill-mode: forwards;
        animation-timing-function: ease-in-out;
    }

    &:after {
        display: block;
        position: absolute;
        width: 50%;
        content: "";
        height: 1px;
        background-color: #FF642E;
        left: 50%;
        top: 0;
    }

    &:before {
        display: block;
        position: absolute;
        width: 50%;
        content: "";
        height: 1px;
        background-color: #FF642E;
        right: 50%;
        top: 0;
    }
`;

export const WebsiteLanguageSelectorItemLink = styled.a`
    display: flex;
`;
