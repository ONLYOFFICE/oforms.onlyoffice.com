import styled from "styled-components";
import { device } from "@utils/devices";

const StyledSortSelector = styled.div`
  position: relative;

  .sort-btn {
    display: flex;
    align-items: center;
    border: none;
    padding: 0;
    background-color: transparent;
    cursor: pointer;
  }

  .sort-label {
    ${props => props.locale === "ar" ? "margin-left: 8px;" : "margin-right: 8px;"}
    font-size: 13px;
    font-weight: 600;
    line-height: 24px;
    letter-spacing: 0.04em;
    color: #808080;
    text-transform: uppercase;

    @media screen and ${device.mobile} {
      display: none;
    }
  }

  .sort-name {
    font-size: 14px;
    font-weight: 600;
    line-height: 22px;
    color: #444444;

    @media screen and ${device.mobile} {
      font-size: 13px;
      line-height: 21px;
    }
  }

  .sort-icon {
    ${props => props.locale === "ar" ? "margin-right: 8px;" : "margin-left: 8px;"}

    &.open {
      transform: rotate(180deg);
    }

    @media screen and ${device.mobile} {
      ${props => props.locale === "ar" ? "margin-right: 4px;" : "margin-left: 4px;"}
    }
  }

  .sort-dropdown {
    position: absolute;
    top: calc(100% + 16px);
    ${props => props.locale === "ar" ? "left: 0;" : "right: 0;"}
    display: flex;
    flex-direction: column;
    list-style: none;
    padding: 16px 0px;
    margin: 0;
    background-color: #FFFFFF;
    border-radius: 0 0 6px 6px;
    box-shadow: rgba(85, 85, 85, 0.15) 0 20px 50px 0;
    z-index: 99;

    &:before {
      content: "";
      position: absolute;
      width: 100%;
      height: 16px;
      top: -16px;
      left: 0;
      background-color: transparent;

      @media screen and ${device.tablet} {
        content: none;
      }
    }
  }

  .sort-dropdown-btn {
    border: none;
    padding: 12px 32px;
    color: #444444;
    font-size: 14px;
    line-height: 22px;
    font-weight: 600;
    background-color: transparent;
    white-space: nowrap;
    cursor: pointer;
    transition: color 0.3s, background-color 0.3s;

    &:hover {
      background-color: #f5f5f5;
    }

    &.active {
      color: #ff6f3d;
      background-color: #f5f5f5;
    }

    @media screen and ${device.mobile} {
      padding: 12px 16px;
      font-size: 13px;
      line-height: 21px;
    }
  }
`;

export default StyledSortSelector;