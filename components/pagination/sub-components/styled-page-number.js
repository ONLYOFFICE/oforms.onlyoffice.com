import styled from "styled-components";
import Button from "../../button";

const StyledPageNumber = styled(Button)`
    font-weight: 400;
    font-size: 16px;
    line-height: 22px;
    padding: 9px 13px;
    height: 40px;

    &.previous-page,
    &.next-page{
        border: none;
    }
    &.go-to-page{
        border: 1px solid #E2E2E2;
    }
    &:hover{
        &.go-to-page:not(.active){
            border: 1px solid #FF6F3D;
        }
        &.go-to-page.active{
            background-color: #444444;
            cursor: default;
        }
    }
`;
export default StyledPageNumber;