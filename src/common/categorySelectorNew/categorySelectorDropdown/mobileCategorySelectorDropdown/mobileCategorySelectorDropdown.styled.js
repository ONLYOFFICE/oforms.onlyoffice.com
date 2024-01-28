import styled, { createGlobalStyle } from 'styled-components';

import {
    CategorySelectorIconWrapper,
    CategorySelectorList,
} from '../../common.styled';

export const RemoveScrollFromHTML = createGlobalStyle`
    body {
        overflow-y: hidden;
    }
`;

export const WebsiteMobileCategorySelectorDropdownStyled = styled.div`
    position: fixed;
    width: 100dvw;
    height: 100dvh;

    left: 0;
    bottom: 0;
    top: 0;
    overflow-y: auto;

    z-index: 1000;
    background-color: #FFF;
`;

export const WebsiteMobileCategorySelectorDropdownHeader = styled.header`
    padding: 12px 16px;

    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
`;

export const WebsiteMobileCategorySelectorDropdownIconWrapper = styled(CategorySelectorIconWrapper)``;

export const WebsiteMobileCategorySelectorDropdownTitle = styled.h3`
    margin: 0;
    color: #444;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 133%;
    text-transform: capitalize;

    overflow: hidden;
    text-overflow: ellipsis;
    width: inherit;
`;

export const WebsiteMobileCategorySelectorDropdownList = styled(CategorySelectorList)``;

export const WebsiteMobileCategorySelectorDropdownContent = styled.div`
    position: relative;
`;

export const WebsiteMobileCategorySelectorSubDropdown = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background-color: #FFF;
    cursor: default;

    overflow-y: auto;
`;

export const WebsiteMobileCategorySelectorSubDropdownHeader = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 12px 16px 12px 12px;
`;

export const WebsiteMobileCategorySelectorSubDropdownHeaderTitle = styled.h4`
    margin: 0;

    color: #FF6F3D;
    text-align: center;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 133%;
    letter-spacing: 0.56px;
    text-transform: uppercase;
`;

export const WebsiteMobileCategorySelectorDropdownSubList = styled(CategorySelectorList)`
    padding: 16px 0;
`;

export const DesktopMobileSelectorDropdownStyled = styled.div`
    position: absolute;
    width: max-content;
    z-index: 1;
    top: 100%;
`;

export const DesktopMobileSelectorDropdownList = styled(CategorySelectorList)`
    padding: 24px 0 16px;

    background-color: ${({ theme }) => theme.colors.newPalette.backgroundNormal};

    min-width: 320px;
    position: relative;

    &:not(.sub-list-opened) {
        box-shadow: ${({ theme }) => theme.boxShadows.shadowWindow};
    }
`;

export const DesktopMobileSelectorDropdownSubDropdown = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;

    display: flex;
    flex-direction: column;
    background-color: ${({ theme }) => theme.colors.newPalette.backgroundNormal};
    box-shadow: ${({ theme }) => theme.boxShadows.shadowWindow};

    max-height: calc(100dvh - 152px);
    overflow-y: auto;
`;

export const DesktopMobileSelectorDropdownHeader = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 12px;

    background-color: ${({ theme }) => theme.colors.newPalette.backgroundTabBar};
`;

export const DesktopMobileSelectorDropdownHeaderTitle = styled.h4`
    margin: 0;
    color: ${({ theme }) => theme.colors.newPalette.textNormal};
    text-align: center;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 133%;
    letter-spacing: 0.56px;
`;

export const DesktopMobileSelectorDropdownSubList = styled(CategorySelectorList)`
    padding: 16px 0;
`;
