import styled from "styled-components";

const StyledPagination = styled.div`
    display: flex;
    margin: 56px auto 0;
    justify-content: center;
    flex-direction: row;
    flex-wrap: nowrap;
    gap: 4px;
    align-items: center;

    .arrow{
        width: 24px;
        height: 24px;
        padding: 7px 6px 4px;
        
        &:hover svg svg path{
            fill: #FF6F3D;
        }
    }

    @media (max-width: 485px) {
        margin: 16px auto 0;
    }
`;
export default StyledPagination;