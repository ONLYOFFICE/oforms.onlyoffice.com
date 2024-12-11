import styled from "styled-components";
import { device } from "@utils/devices";

const StyledCategorySelector = styled.div`
  position: relative;
  border: 1px solid #AAAAAA;
  border-radius: 3px;
  padding: 7px 8px 7px 16px;

  &.active {
    border-color: #FF6F3D;

    > .category-selector-heading .category-selector-title {
      color: #FF6F3D;

      svg path {
        fill: #FF6F3D;
      }
    }
  }

  &.editor {
    display: none;

    .category-selector-title {
      display: flex;
      justify-content: space-between;
      width: 100%;
    }
  }

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
    justify-content: space-between;
    overflow: initial;
    white-space: nowrap;
    cursor: pointer;
    font-size: 13px;
    font-weight: 600;
    line-height: 17px;
    letter-spacing: 0.04em;
    width: 100%;
    text-transform: uppercase;

    &.open {
      svg {
        transform: rotate(180deg);
      }
    }

    svg {
      display: flex;
      ${props => props.locale === "ar" ? "margin-right: 10px;" : "margin-left: 10px;"}

      path {
        fill: #aaaaaa;
      }
    }
  }

  .category-selector-dropdown {
    position: absolute;
    top: calc(100% + 17px);
    ${props => props.locale === "ar" ? "right: 0;" : "left: 0;"}
    border-radius: 0 0 6px 6px;
    padding: 16px 0;
    background-color: #ffffff;
    box-shadow: 0 20px 50px 0 rgba(85, 85, 85, 0.15);
    z-index: 10;
    
    &:before {
      content: "";
      position: absolute;
      width: 100%;
      height: 17px;
      top: -17px;
      left: 0;
      background-color: transparent;

      @media screen and ${device.laptop} {
        content: none;
      }
    }

    .category-selector-title {
      @media screen and ${device.laptop} {
        font-size: 16px;
        line-height: 24px;
      }
    }

    @media screen and ${device.laptop} {
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
    text-align: center;

    svg {
      display: flex;
      transform: ${props => props.locale === "ar" && "rotate(180deg)"};
    }

    @media screen and ${device.laptop} {
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

    svg {
      transform: ${props => props.locale === "ar" && "rotate(180deg)"};
    }

    path {
      fill: #444444;
    }
  }

  .category-selector-item {
    position: relative;
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
    transition: color 0.3s, background-color 0.3s;
    cursor: pointer;

    &:not([href]) {
      padding: ${props => props.locale === "ar" ? "13px 32px 13px 88px" : "13px 88px 13px 32px"};
      font-weight: 700;
      letter-spacing: -0.02em;

      @media screen and ${device.laptop} {
        padding: ${props => props.locale === "ar" ? "12px 24px 12px 56px" : "12px 56px 12px 24px"};
      }
    }

    svg {
      position: absolute;
      top: 50%;
      ${props => props.locale === "ar" ? "left: 32px;" : "right: 32px;"}
      display: flex;
      transform: ${props => props.locale === "ar" ? "translateY(-50%) rotate(180deg)" : "translateY(-50%)"};

      @media screen and ${device.laptop} {
        ${props => props.locale === "ar" ? "left: 16px;" : "right: 16px;"}
      }
    }

    &:hover {
      color: #FF6F3D;
      background-color: #F5F5F5;
    }

    &.active {
      color: #FF6F3D;
      background-color: #F5F5F5;
    }

    @media screen and ${device.laptop} {
      padding: 12px 24px;
      font-weight: 700;
      letter-spacing: -0.02em;
      min-height: 48px;
      white-space: initial;
    }
  }

  .category-selector-submenu {
    position: absolute;
    top: 0;
    ${props => props.locale === "ar" ? "right: 100%;" : "left: 100%;"}
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

    @media screen and ${device.laptop} {
      position: fixed;
      top: 0;
      ${props => props.locale === "ar" ? "right: 0;" : "left: 0;"}
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
      box-sizing: border-box;
      display: block;
      padding: 12px 32px;
      font-size: 16px;
      line-height: 24px;
      color: #444444;
      max-width: 400px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      transition: color 0.3s;

      &:hover {
        color: #FF6F3D;
      }

      &.active {
        color: #FF6F3D;
      }

      @media screen and (max-width: 1430px) {
        max-width: ${props => props.locale === "pt" && "calc(290px + (390 - 290) * ((100vw - 1024px) / (1430 - 1024)))"};
      }

      @media screen and (max-width: 1400px) {
        max-width: ${props => props.locale === "fr" && "calc(274px + (370 - 274) * ((100vw - 1024px) / (1400 - 1024)))"};
      }

      @media screen and (max-width: 1380px) {
        max-width: ${props => (props.locale === "de" || props.locale === "es") && "calc(296px + (380 - 296) * ((100vw - 1024px) / (1380 - 1024)))"};
      }

      @media screen and (max-width: 1260px) {
        max-width: ${props => props.locale === "it" && "calc(306px + (370 - 306) * ((100vw - 1024px) / (1260 - 1024)))"};
      }

      @media screen and (max-width: 1180px) {
        max-width: ${props => props.locale === "en" && "calc(284px + (340 - 284) * ((100vw - 1024px) / (1180 - 1024)))"};
      }

      @media screen and (max-width: 1130px) {
        max-width: ${props => props.locale === "ja" && "calc(312px + (346 - 312) * ((100vw - 1024px) / (1130 - 1024)))"};
      }

      @media screen and (max-width: 1024px) {
        white-space: initial;
        text-overflow: initial;
        overflow: initial;
        max-width: 100%;
      }

      @media screen and ${device.laptop} {
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

    @media screen and ${device.laptop} {
      padding: 16px 0;
    }
  }

  @media screen and ${device.mobile} {
    &.editor {
      display: block;
    }
  }
`;

export default StyledCategorySelector;