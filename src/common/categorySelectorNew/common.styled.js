import styled, { css } from 'styled-components';

import { MOBILE_BREAKPOINT, TABLET_BREAKPOINT } from './useCategorySelector'

export const CategorySelectorIconWrapper = styled.button`
    background-color: transparent;
    border: none;
    padding: 0;
    margin: 0;

    cursor: pointer;

    display: flex;
    align-items: center;
    justify-content: center;

    color: ${({ theme, $isDesktopClient, $isItemIcon }) =>
            $isDesktopClient ? theme.colors.newPalette.iconNormal :
                    $isItemIcon ? 'inherit' : '#444'
    };

    svg {
        color: inherit;
    }
`;

export const CategorySelectorList = styled.ul`
    list-style: none;
    margin: 0;
    padding: 0;

    display: flex;
    flex-direction: column;
`;

export const CategorySelectorDropdownFakeBlock = styled.div`
    width: 100%;
    user-select: none;
    height: ${({ $isDesktopClient }) => $isDesktopClient ? '5px' : '17px'};
`;

const DesktopCategorySelectorListItemSharedStyles = css`
    width: 100%;
    padding: 8px 32px;

    color: ${({ theme }) => theme.colors.newPalette.textNormal};
    font-size: 14px;
    font-weight: 600;
    line-height: 133%;
    letter-spacing: 0.56px;

    outline: none;

    &:hover, &:focus-visible, &.active {
        background-color: ${({ theme }) => theme.colors.newPalette.highlightButtonHover};
    }

    @media screen and (max-width: ${TABLET_BREAKPOINT}px) {
        padding: 12px 16px 12px 24px;
    }
`;

export const DesktopCategorySelectorListItemButton = styled.button`
    ${DesktopCategorySelectorListItemSharedStyles};
    border: none;
    background-color: transparent;
    margin: 0;
    
    cursor: pointer;

    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
`;

export const DesktopCategorySelectorListItemMainLink = styled.a`
    ${DesktopCategorySelectorListItemSharedStyles};
    text-decoration: none;
    display: block;

    @media screen and (max-width: ${TABLET_BREAKPOINT}px) {
        font-size: 16px;
        letter-spacing: normal;
        text-transform: capitalize;
    }
`;

export const DesktopCategorySelectorSubListItemLink = styled.a`
    width: 100%;
    display: block;
    padding: 8px 32px;

    color: ${({ theme }) => theme.colors.newPalette.textNormal};
    font-size: 14px;
    font-weight: 400;
    line-height: 160%;
    text-decoration: none;

    &.selected {
        background-color: ${({ theme }) => theme.colors.newPalette.highlightButtonPressed};
    }

    &:hover, &:focus-visible {
        background-color: ${({ theme }) => theme.colors.newPalette.highlightButtonHover};
    }
`;

export const WebsiteCategorySelectorListItemMainLink = styled.a`
    width: 100%;
    display: block;
    padding: 13px 32px;

    color: #444;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 133%;
    text-transform: capitalize;
    text-decoration: none;
    outline: none;

    &:hover, &:focus-visible {
        background: #F9F9F9;
        color: #FF6F3D;
    }

    @media screen and (max-width: ${MOBILE_BREAKPOINT}px) {
        padding: 12px 16px 12px 24px;
    }
`;

export const WebsiteCategorySelectorListItemButton = styled.button`
    width: 100%;
    padding: 12px 32px;
    border: none;
    background-color: transparent;
    margin: 0;
    
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 32px;

    cursor: pointer;

    color: #444;
    font-size: 13px;
    font-style: normal;
    font-weight: 600;
    line-height: 133%; /* 17.29px */
    letter-spacing: 0.52px;
    text-transform: uppercase;

    outline: none;

    &:hover, &:focus-visible, &.active {
        background: #F9F9F9;
        color: #FF6F3D;
    }
    
    @media screen and (max-width: ${MOBILE_BREAKPOINT}px) {
        font-size: 16px;
        letter-spacing: 0.64px;
        padding: 12px 16px 12px 24px;
    }
`;

export const WebsiteCategorySelectorSubListItemLink = styled.a`
    width: 100%;
    display: block;
    padding: 12px 32px;

    color: #444;
    font-size: 16px;
    font-weight: 400;
    line-height: 150%;
    text-decoration: none;
    
    outline: none;

    &:hover, &:focus-visible, &.selected {
        color: #FF6F3D;
    }

    @media screen and (max-width: ${MOBILE_BREAKPOINT}) {
        line-height: 133%;
        text-transform: capitalize;
        padding: 12px 16px;
    }
`;
