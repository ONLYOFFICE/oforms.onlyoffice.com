import styled from "styled-components";

const StyledDropdownMenu = styled.div`
    display: block;
    position: absolute;
    z-index: 1;
    background-color: #fff;
    border-radius: 3px;
    padding-top: 14px;
    top: 50px;
    width: intrinsic;
    box-shadow: 0px 7px 25px rgb(85 85 85 / 15%);

    &.close{
        display: none;
    }

.dropdownItem{
    font-weight: 400;
    display: block;
    padding: 16px;
    font-size: 16px;
    cursor: pointer;
    min-width: 220px;
    line-height: 1;

    &:hover,
    &.selected{
        color: #ff6f3d;
        background-color: #f5f5f5;
    }
}
`;

export default StyledDropdownMenu;