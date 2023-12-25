import styled from "styled-components";

export const MenuItemStyled = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    user-select: none;
`

export const MenuItemTitle = styled.span`
    user-select: none;
`

export const MenuItemIcon = styled.span`
    display: flex;
    align-items: center;
    justify-content: center;

    & svg {
        width: 24px;
        height: 24px;
    }
`
