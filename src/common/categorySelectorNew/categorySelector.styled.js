import styled from 'styled-components';

export const CategorySelectorStyled = styled.div`
    position: relative;
    width: max-content;

    &.expanded .chevron-icon {
        transform: rotate(180deg);
    }
`;

export const CategorySelectorHeader = styled.header`
    display: flex;
    align-items: center;
    cursor: pointer;
    gap: ${({$isDesktopClient}) => $isDesktopClient ? '8px' : '10px'};
`;

export const DesktopCategorySelectorClearIconWrapper = styled.button`
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
    height: 25px;


    transition: transform 200ms ease-in-out;

    svg {
        color: ${({ theme, $isDesktopClient }) =>
                $isDesktopClient ? theme.colors.newPalette.iconNormal : '#444444'};
    }
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

export const WebsiteCategorySelectorLabel = styled.span`
    color: #333;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: 133%;
    letter-spacing: -0.36px;
`
