import styled from "styled-components";
import { device } from "@utils/devices";

const StyledCategorySelector = styled.div`
  position: relative;

  .category-selector-heading {
    display: flex;
    align-items: center;
  }

  .category-selector-name {
    margin-right: 8px;
    font-weight: 700;
    font-size: 14px;
    line-height: 133%;
    color: #444444;
    cursor: pointer;

    @media screen and ${device.laptop} {
      max-width: 130px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }

    @media screen and ${device.tablet} {
      max-width: 70px;
    }

    @media screen and ${device.mobileM} {
      max-width: 30px;
    }
  }

  .category-selector-btn {
    display: flex;
    border: none;
    padding: 0;
    background-color: transparent;
    cursor: pointer;

    div {
      display: flex;
    }

    svg {
      path {
        stroke: #444444;
        transition: stroke 0.3s;
      }
    }

    &:hover {
      svg {
        path {
          stroke: #7A7A7A;
        }
      }
    }

    &:active {
      svg {
        path {
          stroke: #444444;
        }
      }
    }
  }

  .category-selector-title {
    display: inline-flex;
    align-items: center;
    overflow: initial;
    white-space: nowrap;
    cursor: pointer;

    &.open {
      svg {
        transform: rotate(180deg);
      }
    }

    svg {
      display: flex;
      margin-left: 10px;

      > div {
        display: flex;
      }

      path {
        fill: #444444;
      }
    }

    @media screen and (max-width: 896px) {
      font-size: 16px;
      line-height: 21px;
    }
  }

  .category-selector-dropdown {
    position: absolute;
    top: calc(100% + 17px);
    left: 0;
    border-radius: 0 0 6px 6px;
    padding: 16px 0;
    background-color: #ffffff;
    box-shadow: 0 20px 50px 0 rgba(85, 85, 85, 0.15);
    z-index: 10;

    &.ar {
      left: auto;
      right: 0;

      .category-selector-item {
        @media screen and (max-width: 896px) {
          padding: 12px 24px 12px 16px;
        }
      }
    }
    
    &:before {
      content: "";
      position: absolute;
      width: 100%;
      height: 17px;
      top: -17px;
      left: 0;
      background-color: transparent;

      @media screen and (max-width: 896px) {
        content: none;
      }
    }

    @media screen and (max-width: 896px) {
      position: fixed;
      top: 0;
      width: 100%;
      height: 100%;
      border-radius: initial;
      padding: 0;
      box-shadow: initial;
      z-index: 1001;
    }
  }

  .category-selector-header {
    display: none;
    align-items: center;
    justify-content: space-between;
    padding: 12px 16px;

    svg {
      display: flex;
    }

    @media screen and (max-width: 896px) {
      position: sticky;
      top: 0;
      display: flex;
      background-color: #ffffff;
      z-index: 2;
    }
  }

  .category-selector-header-btn {
    border: none;
    padding: 0;
    background-color: transparent;
    cursor: pointer;

    path {
      fill: #444444;
    }
  }

  .category-selector-item {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 13px 32px;
    font-size: 16px;
    line-height: 22px;
    min-height: 48px;
    color: #444444;
    white-space: nowrap;
    cursor: pointer;

    &:not([href]) {
      font-weight: 700;
      letter-spacing: -0.02em;
    }

    svg {
      display: flex;
      margin-left: 32px;
    }

    &:hover {
      color: #FF6F3D;
      background-color: #F5F5F5;
    }

    &.active {
      color: #FF6F3D;
      background-color: #F5F5F5;
    }

    @media screen and (max-width: 896px) {
      padding: 12px 16px 12px 24px;
      font-weight: 700;
      letter-spacing: -0.02em;
      min-height: 48px;
      white-space: initial;
    }
  }

  .category-selector-submenu {
    position: absolute;
    top: 0;
    left: 100%;
    border-radius: 0 0 6px 6px;
    padding: 16px 0;
    background-color: #ffffff;
    z-index: 10;
    box-shadow: 0 7px 25px 0 rgba(85, 85, 85, 0.15);

    .category-selector-header {
      border-bottom: 1px solid #F2F2F2;
    }

    .category-selector-title {
      display: block;
      margin: 0 24px;
      font-size: 14px;
      font-weight: 600;
      line-height: 19px;
      letter-spacing: 0.04em;
      color: #FF6F3D;
      cursor: initial;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    @media screen and (max-width: 896px) {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border-radius: initial;
      padding: 0;
      box-shadow: initial;
      overflow-y: auto;
    }
  }

  .category-selector-links {
    padding: 0;
    margin: 0;
    list-style-type: none;

    a {
      display: block;
      padding: 12px 32px;
      font-size: 16px;
      line-height: 24px;
      color: #444444;
      max-width: 400px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;

      &:hover {
        color: #FF6F3D;
      }

      &.active {
        color: #FF6F3D;
      }

      @media screen and (max-width: 1200px) {
        max-width: 300px;
      }

      @media screen and (max-width: 1024px) {
        white-space: initial;
        text-overflow: initial;
        overflow: initial;
        max-width: 100%;
      }

      @media screen and (max-width: 896px) {
        padding: 12px 16px;
      }
    }

    &.category-selector-links-columns {
      display: grid;
      grid-template-columns: 1fr 1fr;
      align-items: start;

      @media screen and ${device.laptop} {
        grid-template-columns: initial;
      }
    }

    @media screen and (max-width: 896px) {
      padding: 16px 0;
    }
  }
`;

export default StyledCategorySelector;