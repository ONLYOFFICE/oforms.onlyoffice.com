import styled from 'styled-components';

export const HeaderStyled = styled.header``;

export const HeaderTitle = styled.h3`
    font-size: 24px;
    font-style: normal;
    font-weight: 300;
    line-height: 32px;
    margin: 0 0 12px 0;
    color: ${({ theme }) => theme.colors.newPalette.textNormal};
    user-select: none;
`;

export const HeaderBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    @media screen and (max-width: 900px) {
        justify-content: ${({ active }) => active ? 'right' : undefined};
        .dropdown-component {
            display: ${({ active }) => active ? 'none' : undefined};
        }
    }

    @media screen and (max-width: 400px) {
        justify-content: right;
        .dropdown-component {
            display: none;
        }
    }
`;

export const HeaderInputWrapper = styled.div`
    display: flex;
    gap: 16px;
    align-items: center;
`;
