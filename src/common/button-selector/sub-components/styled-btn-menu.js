import styled from "styled-components";
import { device } from "@components/utils/devices";

const StyledBtnMenu = styled.div`
  display: block;
  position: absolute;
  z-index: 1;
  background-color: #fff;
  border-radius: 3px;
  padding: 8px 0;
  top: 61px;
  right: 0;
  width: 100%;
  box-shadow: 0px 7px 25px 0px rgba(85, 85, 85, 0.15);
  border: 1px solid #666666;

  @media ${device.mobile} {
    top: 53px;
  }

  &.close {
    display: none;
  }

  .dropdown-item {
    border: none;
    font-weight: 400;
    display: block;
    padding: 8px 16px;
    font-size: 16px;
    line-height: 26px;
    cursor: pointer;
    width: 100%;
    min-width: 220px;
    outline: none;
    color: #444;
    text-decoration: none;
    background-color: transparent;
    text-align: left;

    &:hover {
      color: #ff6f3d;
      background-color: #f5f5f5;
    }
  }
`;

export default StyledBtnMenu;
