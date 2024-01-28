import styled from 'styled-components';

import {
    CategorySelectorIconWrapper,
    CategorySelectorList,
    DesktopCategorySelectorSubListItemLink,
    WebsiteCategorySelectorSubListItemLink
} from '../common.styled'

const CategorySelectorSubList = styled.ul`
    list-style: none;
    margin: 0;
    padding: 0;

    display: grid;
    grid-template-columns: max-content max-content;

    &.one-column {
        grid-template-columns: max-content;
    }
`;

export const CategorySelectorSubDropdown = styled.div`
    position: absolute;
    z-index: 1;
    width: max-content;
    left: 100%;
    top: ${({ $isDesktopClient }) => $isDesktopClient ? '-1px' : '0px'};
`;

export const CategorySelectorItemIconWrapper = styled(CategorySelectorIconWrapper)``;

export const CategorySelectorDropdownStyled = styled.div`
    position: absolute;
    z-index: 1;
    width: max-content;
    top: 100%;
`;

export const CategorySelectorItemTitle = styled.p`
    margin: 0;

    @media screen and (max-width: 1400px) {
        max-width: 250px;
    }

    @media screen and (max-width: 1200px) {
        max-width: 210px;
    }

    @media screen and (max-width: 1000px) {
        max-width: 250px;
    }
`;

export const DesktopCategorySelectorList = styled(CategorySelectorList)`
    position: relative;
    padding: 24px 0;
    min-width: 277px;

    border: 1px solid ${({ theme }) => theme.colors.newPalette.borderRegularControl};
    background-color: ${({ theme }) => theme.colors.newPalette.backgroundNormal};
    border-radius: 0px 0px 6px 6px;
    box-shadow: ${({ theme }) => theme.boxShadows.shadowWindow};
`;


export const DesktopCategorySelectorSubList = styled(CategorySelectorSubList)`
    cursor: auto;

    padding: 16px 0;

    border: 1px solid ${({ theme }) => theme.colors.newPalette.borderRegularControl};
    background-color: ${({ theme }) => theme.colors.newPalette.backgroundNormal};
    border-radius: 0px 0px 6px 6px;
    box-shadow: ${({ theme }) => theme.boxShadows.shadowWindow};

    &.one-column li a {
        border-right: none;
    }
`;

export const DesktopCategorySelectorSubItem = styled.li`
    &:nth-child(odd) a {
        border-right: 1px solid ${({ theme }) => theme.colors.newPalette.backgroundTabBar};
    }
`;

export const DesktopCategorySelectorSubLink = styled(DesktopCategorySelectorSubListItemLink)`
    @media screen and (max-width: 1400px) {
        max-width: 410px;
    }

    @media screen and (max-width: 1200px) {
        max-width: 320px;
    }
`;

export const WebsiteCategorySelectorList = styled(CategorySelectorList)`
    position: relative;
    padding: 16px 0;
    background-color: #FFF;
    border-radius: 0px 0px 6px 6px;
    box-shadow: ${({ theme }) => theme.boxShadows.shadowWindow};
    min-width: 291px;
`;

export const WebsiteCategorySelectorSubList = styled(CategorySelectorSubList)`
    padding: 24px 0;
    border-radius: 0px 0px 6px 6px;
    box-shadow: ${({ theme }) => theme.boxShadows.shadowWindow};
    background-color: #FFF;
`;

export const WebsiteCategorySelectorSubLink = styled(WebsiteCategorySelectorSubListItemLink)`
    @media screen and (max-width: 1400px) {
        max-width: 410px;
    }

    @media screen and (max-width: 1200px) {
        max-width: 320px;
    }

    @media screen and (max-width: 1000px) {
        max-width: 350px;
    }
`;
