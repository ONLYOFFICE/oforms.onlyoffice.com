import styled from "styled-components";

const StyledNav = styled.nav`
display: flex;
column-gap: 40px;
justify-content: center;

.navitem_features_menu{
    color: #fff;
}

.heading-nav-item {
    display: block;
}

.heading-nav-item {
    color: #333;
}

.external-link {
    color: #333;
    text-decoration: none;
    :hover {
        color: rgb(255, 111, 61);
    }
}

@media (max-width: 1050px) {
        padding: 0;
        background-color: #fff;
        min-height: 100px;
        height: 100vh;
        margin: 0;
        position: absolute;
        left: ${props => props.stateMobile ? "0" : "-120vw"};
        top: 0;
        overflow: auto;
        text-align: center;
        font-size: 16px;
        transition: right .5s;
        width: 60%;
        z-index: 5;
        display: block;
        padding-top: 90px;
        box-sizing: border-box;
        overflow-x: hidden;

.mobile-heading-nav-item {
    display: block;
}

}

`;

export default StyledNav;