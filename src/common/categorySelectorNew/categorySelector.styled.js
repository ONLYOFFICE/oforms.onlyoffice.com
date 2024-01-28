import styled from 'styled-components';

import { MOBILE_BREAKPOINT } from './useCategorySelector';
import { CategorySelectorIconWrapper } from './common.styled'


export const CategorySelectorStyled = styled.div`
    position: relative;
    width: max-content;

    &.expanded .chevron-icon {
        transform: rotate(180deg);
    }

    @media screen and (max-width: ${MOBILE_BREAKPOINT}px) {
        position: ${({ $isDesktopClient }) => !$isDesktopClient ? 'static' : undefined};
    }
`;

export const CategorySelectorHeader = styled.header`
    display: flex;
    align-items: center;
    cursor: pointer;
    gap: ${({ $isDesktopClient }) => $isDesktopClient ? '8px' : '10px'};
`;


export const CategorySelectorDropdownIndicatorIconWrapper = styled(CategorySelectorIconWrapper)`
    transition: transform 200ms ease-in-out;
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
`;
