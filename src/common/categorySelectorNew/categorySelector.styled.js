import styled from 'styled-components';

const CategorySelector = styled.div`
    position: relative;

    &.expanded .chevron-icon {
        transform: rotate(180deg);
    }
`;

const CategorySelectorHeader = styled.header`
    display: flex;
    align-items: center;
    gap: 8px;
`;

const CategorySelectorList = styled.ul`
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
`;

const CategorySelectorItem = styled.li`
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 133%;
    letter-spacing: 0.56px;

    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const CategorySelectorDropdown = styled.div`
    position: absolute;
    z-index: 1;
    width: max-content;
`;

export const CategorySelectorSubDropdown = styled(CategorySelectorDropdown)`
    left: 100%;
    top: 0;
`

export const CategorySelectorClearIconWrapper = styled.button`
    display: flex;
    cursor: pointer;

    margin: 0;
    padding: 0;
    border: none;
    background-color: transparent;

    svg {
        color: ${({ theme }) => theme.colors.newPalette.iconNormal};
    }
`;

export const CategorySelectorDropdownIndicatorIconWrapper = styled.span`
    display: flex;

    transition: transform 200ms ease-in-out;

    svg {
        color: ${({ theme, $isDesktopClient }) =>
                $isDesktopClient ? theme.colors.newPalette.iconNormal : '#444444'};
    }
`;

export const CategorySelectorItemIconWrapper = styled.div`
    display: flex;
    color: inherit;

    svg {
        color: ${({ theme, $isDesktopClient }) =>
                $isDesktopClient ? theme.colors.newPalette.iconNormal : 'inherit'};
    }
`;


export const DesktopCategorySelector = styled(CategorySelector)`

`;

export const DesktopCategorySelectorHeader = styled(CategorySelectorHeader)`
    cursor: pointer;
`;

export const DesktopCategorySelectorLabel = styled.span`
    color: ${({ theme }) => theme.colors.newPalette.textSecondary};
    font-size: 14px;
    font-weight: 400;
    line-height: 150%;

    user-select: none;
`;

export const DesktopCategorySelectorValue = styled.div`
    color: ${({ theme }) => theme.colors.newPalette.textNormal};
    font-weight: 700;
    font-size: 14px;
    line-height: 133%;

    user-select: none;
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

export const DesktopCategorySelectorItem = styled(CategorySelectorItem)`
    color: ${({ theme }) => theme.colors.newPalette.textNormal};
    padding: 8px 32px;
    cursor: pointer;

    outline: none;

    &.selected {
        background-color: ${({ theme }) => theme.colors.newPalette.highlightButtonPressed};
    }

    &:hover, &:focus, &.with-link a:focus {
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


export const WebsiteCategorySelector = styled(CategorySelector)`

`;

export const WebsiteCategorySelectorHeader = styled(CategorySelectorHeader)`

`;
