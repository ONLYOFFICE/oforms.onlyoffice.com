import styled from "styled-components";

export const DesktopSortSelector = styled.div``

export const DesktopSortSelectorIconWrapper = styled.div`
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
        color: ${({theme}) => theme.colors.newPalette.iconNormal};
    }
`

export const WebsiteSortSelector = styled.div`
    position: relative;
`

export const WebsiteSortSelectorHeader = styled.header`
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
`

export const WebsiteSortSelectorLabel = styled.h4`
    color: #808080;
    text-align: right;
    font-size: 13px;
    font-style: normal;
    font-weight: 600;
    line-height: 18px;
    letter-spacing: 0.52px;
    text-transform: uppercase;
    margin: 0;
`

export const WebsiteSortSelectorValue = styled.span`
    color: #333;
    text-align: right;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 18px;
`

export const WebsiteSortSelectorIconWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
        transition: transform 200ms ease-in-out;
        transform: ${({isOpen}) => isOpen ? 'rotate(180deg)' : undefined};
        color: #444;
    }
`

export const WebsiteSortSelectorDropdown = styled.ul`
    margin: 0;
    padding: 8px 0;
    list-style: none;
    border-radius: 3px;
    border: 1px solid #666;
    background: #FFF;
    box-shadow: 0px 7px 25px 0px rgba(85, 85, 85, 0.15);
    
    display: flex;
    flex-direction: column;
    
    position: absolute;
    z-index: 1;
    right: 0;
`

export const WebsiteSortSelectorDropdownItem = styled.li`
    color: #444;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 160%;
    
    a {
        padding: 8px 16px;
        display: block;
        color: inherit;
        text-decoration: none;
    }
    
    &.active a {
        color: #FF6F3D;
    }
    
    &:hover {
        background-color: #F5F5F5;
    }
`
