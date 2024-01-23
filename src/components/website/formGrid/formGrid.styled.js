import styled from 'styled-components';

export const FormGridStyled = styled.ul`
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 32px;
    
    list-style: none;
    margin: 0;
    padding: 0;

    @media screen and (max-width: 1200px) {
        grid-template-columns: 328px 328px;
        justify-content: center;
        column-gap: 24px;
        row-gap: 40px;
    }
    
    @media screen and (max-width: 770px) {
        grid-template-columns: 1fr 1fr;
    }
    
    @media screen and (max-width: 450px) {
        grid-template-columns: minmax(auto, 328px);
    }
`;

export const FormGridEmpty = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 32px;
`

export const FormGridEmptyImg = styled.img`
    
`

export const FormGridEmptyDesc = styled.p`
    margin: 0;
    color: rgb(51, 51, 51);
    font-size: 18px;
    letter-spacing: -0.02em;
    font-weight: 700;
    line-height: 133%;
`
