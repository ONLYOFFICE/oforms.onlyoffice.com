import styled from 'styled-components';

export const BreadCrumbStyled = styled.div`
    display: flex;
    gap: 10px;
    align-items: center;
    flex-wrap: wrap;
`;

export const BreadCrumbHomeLink = styled.a`
    color: #444;
    
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: 133%;
    text-decoration: none;
`

export const BreadCrumbLink = styled.a`
    color: #808080;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    text-decoration: none;
`

export const BreadCrumbIconWrapper = styled.div`
    display: flex;
    
    svg {
        color: #666666;
    }
`

export const BreadCrumbItemWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`
