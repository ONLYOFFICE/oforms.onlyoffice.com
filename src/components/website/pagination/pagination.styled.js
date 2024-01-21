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
`;

export const PaginationList = styled.ol`
    list-style: none;
    margin: 0;
    padding: 0;

    display: flex;
    align-items: center;
    gap: 4px;
`;

export const PaginationListItem = styled.li`
    a {
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
`;
