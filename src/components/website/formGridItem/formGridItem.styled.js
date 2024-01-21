import styled from 'styled-components';

export const FormGridItemStyled = styled.li`
    width: inherit;
`;

export const FormGridItemContent = styled.article`
    width: inherit;
    display: flex;
    flex-direction: column;

    border: 1px solid transparent;

    &.active {
        border-radius: 3px;
        border: 1px solid #808080;
        background: #FFF;

        box-shadow: 0 7px 25px 0 rgba(85, 85, 85, 0.15);
    }
`;

export const FormGridItemImgLink = styled.a`
    width: inherit;
    box-shadow: ${({ $isActive }) =>
            $isActive ? undefined : '0px 7px 15px 0px rgba(85, 85, 85, 0.10)'};
    border-radius: 3px;
    overflow: hidden;
    display: flex;
    padding: 14px;
`;

export const FormGridItemImg = styled.img`
    width: inherit;
`;

export const FormGridItemBox = styled.div`
    padding: 24px;
    
    @media screen and (max-width: 1200px) {
        padding-bottom: 32px;
    }

    @media screen and (max-width: 750px) {
        padding: 16px;
    }
`;

export const FormGridItemTitle = styled.h3`
    margin: 0 0 10px 0;

    a {
        color: inherit;
        text-decoration: none;
    }
    
    @media screen and (max-width: 1200px) {
        margin-bottom: 8px;
    }
`;

export const FormGridItemTitleLink = styled.a`
    color: #444;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 133%;
    letter-spacing: -0.32px;
    outline: none;

    &:hover, &:focus-visible {
        color: #FF6F3D;
    }
    
    @media screen and (max-width: 750px) {
        font-size: 14px;
    }
`

export const FormGridItemDesc = styled.p`
    color: #333;

    font-size: 13px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%;
    margin: 0 0 24px 0;

    display: -webkit-box;
    -webkit-line-clamp: 6;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    
    @media screen and (max-width: 1200px) {
        margin-bottom: 16px;
    }
    
    @media screen and (max-width: 450px) {
        margin-bottom: 8px;
        font-size: 12px;
    }
`;

export const FormGridItemLinksWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    
    
    @media screen and (min-width: 1201px) {
        &:not(.active) {
            opacity: 0;
            user-select: none;
        }
    }
    
    @media screen and (max-width: 1200px) {
        gap: 12px;
    }
    
    @media screen and (max-width: 750px) {
        grid-template-columns: 1fr;
        gap: 8px;
    }
`;

export const FormGridItemFillOutLink = styled.a`
    padding: 15px 10px;

    border-radius: 3px;
    background: #FF6F3D;

    color: #FFF;
    text-align: center;
    font-size: 13px;
    font-style: normal;
    font-weight: 600;
    line-height: 133%;
    letter-spacing: 0.52px;
    text-transform: uppercase;
    text-decoration: none;
    outline: none;
    
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    &:hover, &:focus-visible {
        background-color: rgb(255, 134, 92);
    }
`;

export const FormGridItemDownloadLink = styled.a`
    padding: 15px 10px;
    color: #444;
    font-size: 13px;
    font-style: normal;
    font-weight: 600;
    line-height: 133%;
    letter-spacing: 0.52px;
    text-transform: uppercase;
    outline: none;

    border-radius: 3px;
    border: 1px solid #AAA;
    text-align: center;
    text-decoration: none;
    
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    &:hover, &:focus-visible {
        color: #FF6F3D;
        border-color: #FF6F3D;
    }
`;

