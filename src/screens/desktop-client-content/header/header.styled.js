import styled from 'styled-components';

export const HeaderStyled = styled.header`

    .clear-icon {
        cursor: pointer;
        color: ${({ theme }) => theme.colors.newPalette.iconNormal};
        transition: transform 50ms ease-in-out;
        right: 0;
        position: absolute;

        &:hover {
            color: ${({ theme }) => theme.colors.palette.iconContrastPopoverHover};
        }
    }

    .search-icon {
        color: ${({ theme }) => theme.colors.newPalette.iconNormal};
        cursor: pointer;
    }
`;

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

export const HeaderForm = styled.form`
    display: flex;
    align-items: center;
    height: 30px;
    position: relative;

    .search-icon {
        margin-right: 0;
    }

    &.active {
        border-bottom: ${({ theme }) =>
                `1px solid ${theme.colors.palette.borderToolbarButtonHover}`};

        .search-icon {
            margin-right: 4px;
        }
    }
`;

export const HeaderInput = styled.input`
    background-color: transparent;
    border: none;
    outline: none;
    margin: 0;
    padding: 0;
    width: ${({ active }) => active ? '250px' : 0};
    transition: width 300ms ease-in-out;
    color: ${({ theme }) => theme.colors.newPalette.textNormal};
`;
