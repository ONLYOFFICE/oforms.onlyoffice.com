import styled from 'styled-components';

const CategorySelectorList = styled.ul`
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
`;

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

export const CategorySelectorFakeBlock = styled.div`
    width: 100%;
    user-select: none;
    height: ${({ $isDesktopClient }) => $isDesktopClient ? '5px' : '17px'};
`;

export const CategorySelectorSubDropdown = styled.div`
    position: absolute;
    z-index: 1;
    width: max-content;
    left: 100%;
    top: ${({ $isDesktopClient }) => $isDesktopClient ? '-1px' : '0px'};
`;

export const CategorySelectorItemIconWrapper = styled.div`
    display: flex;
    color: inherit;

    svg {
        color: ${({ theme, $isDesktopClient }) =>
                $isDesktopClient ? theme.colors.newPalette.iconNormal : 'inherit'};
    }
`;

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


export const DesktopCategorySelectorItem = styled.li`
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 133%;
    letter-spacing: 0.56px;

    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;

    color: ${({ theme }) => theme.colors.newPalette.textNormal};
    padding: 8px 32px;
    cursor: pointer;

    outline: none;

    &.selected {
        background-color: ${({ theme }) => theme.colors.newPalette.highlightButtonPressed};
    }

    &:hover, &:focus-visible, &.with-link a:focus-visible {
        background-color: ${({ theme }) => theme.colors.newPalette.highlightButtonHover};
    }

    &.with-link {
        padding: 0;

        a {
            outline: none;
            color: inherit;
            text-decoration: none;
            font-size: inherit;
            line-height: inherit;
            display: block;
            width: 100%;
            padding: 8px 32px;
        }
    }
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

export const DesktopCategorySelectorSubLink = styled.a`
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 160%;
    text-decoration: none;
    color: ${({ theme }) => theme.colors.newPalette.textNormal};
    
    display: flex;
    align-items: center;
    height: 100%;

    padding: 8px 32px;

    width: 100%;

    &.selected {
        background-color: ${({ theme }) => theme.colors.newPalette.highlightButtonPressed};
    }

    &:hover, &:focus-visible {
        background-color: ${({ theme }) => theme.colors.newPalette.highlightButtonHover};
    }

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

export const WebsiteCategorySelectorItem = styled.li`
    color: #444;

    font-size: 13px;
    letter-spacing: 0.52px;
    line-height: 133%;
    font-weight: 600;

    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: 12px 32px;

    outline: none;
    cursor: pointer;

    &:hover, &:focus-visible, &.with-link a:focus-visible {
        background-color: #F9F9F9;
        color: #FF6F3D;
    }

    &.with-link {
        font-size: 16px;
        padding: 0;

        a {
            width: 100%;
            outline: none;
            display: block;
            padding: 12px 32px;
            color: inherit;
            text-decoration: none;
        }
    }
`;

export const WebsiteCategorySelectorSubList = styled(CategorySelectorSubList)`
    padding: 24px 0;
    border-radius: 0px 0px 6px 6px;
    box-shadow: ${({ theme }) => theme.boxShadows.shadowWindow};
    background-color: #FFF;
`;

export const WebsiteCategorySelectorSubLink = styled.a`
    padding: 12px 32px;

    color: #444;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%;

    text-decoration: none;

    display: flex;
    align-items: center;
    height: 100%;

    &.selected {
        color: #FF6F3D;
    }

    &:hover, &:focus-visible {
        //background-color: #F9F9F9;
        color: #FF6F3D;
    }

    @media screen and (max-width: 1400px) {
        max-width: 410px;
    }

    @media screen and (max-width: 1200px) {
        max-width: 320px;
    }
`;
