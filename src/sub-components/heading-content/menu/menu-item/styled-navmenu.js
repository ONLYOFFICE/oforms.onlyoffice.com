import styled from "styled-components";

const StyledNavMenu = styled.div`
.heading-nav-item {
    color: #fff;
    font-size: 12px;
    font-weight: 400;
    padding: 0px;
    margin: 0px;
}
`;

const StyledMenuItemsWrapper = styled.div`
    width: auto;
    height: auto;
    margin: auto;
    background-color: white;
    z-index: 500;
    position: absolute;
    padding: 27px;

    @media (max-width: 1050px) {
        padding: 0;
        background-color: #fff;
        min-height: 100px;
        height: 100vh;
        margin: 0;
        position: absolute;
        left: ${props => props.isOpen ? "0" : "-120vw"};
        top: 0;
        overflow: auto;
        text-align: center;
        font-size: 16px;
        transition: right .5s;
        width: 100%;
        z-index: 5;
        display: block;
        padding-top: 90px;
        box-sizing: border-box;
        overflow-x: hidden;
    }
`;

export { StyledNavMenu, StyledMenuItemsWrapper };