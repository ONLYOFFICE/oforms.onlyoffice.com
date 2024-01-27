import styled, { createGlobalStyle } from 'styled-components';

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
    border: 1px solid red;
    overflow-y: auto;

    z-index: 1000;
    background-color: #FFF;
`;

export const WebsiteMobileCategorySelectorDropdownHeader = styled.header`
    padding: 12px 16px;
    
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const WebsiteMobileCategorySelectorDropdownIconWrapper = styled.div`
    display: flex;
    
    svg {
        color: #444444;
    }
`

export const WebsiteMobileCategorySelectorDropdownTitle = styled.h3`
    margin: 0;
    color: #444;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 133%;
    text-transform: capitalize;
`;

export const WebsiteMobileCategorySelectorDropdownList = styled.ul`
    list-style: none;
    margin: 0;
    padding: 0;
    
    display: flex;
    flex-direction: column;
`;
