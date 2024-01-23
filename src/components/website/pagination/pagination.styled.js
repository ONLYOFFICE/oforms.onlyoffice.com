import styled from 'styled-components';

export const PaginationStyled = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
`;

export const PaginationButton = styled.button`
    display: flex;
    padding: 8px 6px;

    border: none;
    background-color: transparent;
    margin: 0;
    cursor: pointer;

    svg {
        color: #444444;
    }
    
    &:disabled {
        cursor: not-allowed;
    }
`;

export const PaginationList = styled.ol`
    list-style: none;
    margin: 0;
    padding: 0;

    display: grid;
    grid-template-columns: repeat(${({$maxPagesToShow}) => $maxPagesToShow}, 1fr);
    align-items: center;
    gap: 4px;
`;

export const PaginationListItem = styled.li`
    display: flex;
    a {
        text-align: center;
        flex-grow: 1;
        padding: 8px 12px;
        border-radius: 3px;
        border: 1px solid #E2E2E2;

        color: #444;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        text-decoration: none;
    }

    &:hover {
        a {
            border: 1px solid #FF6F3D;
            color: #FF6F3D;
        }
    }
    
    &.current {
        a {
            background: #333;
            color: #FFFFFF;
            border: none;
        }
    }
`;
