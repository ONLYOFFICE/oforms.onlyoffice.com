import styled from "styled-components";
import { device } from "@components/utils/devices";

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
    color: ${props =>
      props.theme === "theme-light" ? "rgba(0, 0, 0, 0.8)" :
      props.theme === "theme-dark" ? "rgba(255, 255, 255, 0.8)" :
      props.theme === "theme-contrast-dark" ? "#E8E8E8" : 
      "#444444"
    };
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
        stroke: ${props =>
          props.theme === "theme-light" ? "rgba(0, 0, 0, 0.8)" :
          props.theme === "theme-dark" ? "rgba(255, 255, 255, 0.8)" :
          props.theme === "theme-contrast-dark" ? "#E8E8E8" : 
          "#444444"
        };
        transition: stroke 0.3s;
      }
    }

    &:hover {
      svg {
        path {
          stroke: ${props =>
            props.theme === "theme-dark" || props.theme === "theme-contrast-dark" ? "#BBBBBB" :
            "#7A7A7A"
          };
        }
      }
    }

    &:active {
      svg {
        path {
          stroke: ${props =>
            props.theme === "theme-dark" ? "#F1F1F1" :
            props.theme === "theme-contrast-dark" ? "#FFFFFF" : 
            "#444444"
          };
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

    &.desktop-category-page {
      padding-right: 8px;

      svg {
        display: none;
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
    padding: 24px 0;
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
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 32px;
    font-size: 16px;
    line-height: 24px;
    min-height: 40px;
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
    padding: 24px 0;
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
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: start;
    padding: 0;
    margin: 0;
    list-style-type: none;

    a {
      display: block;
      padding: 12px 32px;
      font-size: 16px;
      line-height: 24px;
      color: #444444;
      width: max-content;
      min-width: 100%;
      max-width: 420px;

      &:hover {
        color: #FF6F3D;
      }

      &.active {
        color: #FF6F3D;
      }

      @media screen and (max-width: 1250px) {
        max-width: 290px;
      }

      @media screen and (max-width: 1024px) {
        max-width: 100%;
      }

      @media screen and (max-width: 896px) {
        padding: 12px 16px;
        width: 100%;
      }
    }

    @media screen and ${device.laptop} {
      grid-template-columns: initial;
    }

    @media screen and (max-width: 896px) {
      padding: 16px 0;
    }
  }

  &.desktop-client {
    transition: width 0.3s, opacity 0.3s, visibility 0.3s;

    &.hide-mobile {
      @media screen and (max-width: 592px) {
        width: 0;
        opacity: 0;
        visibility: hidden;
      }
    }

    @media screen and ${device.laptop} {
      position: initial;
    }

    .category-selector-title {
      font-size: 14px;
      font-weight: 400;
      line-height: 21px;
      color: ${props =>
        props.theme === "theme-dark" ? "rgba(255, 255, 255, 0.6)" :
        props.theme === "theme-contrast-dark" ? "#B8B8B8" : 
        "#A5A5A5"
      };

      svg {
        margin-left: 8px;
        width: 22px;
        height: 22px;

        path {
          fill: ${props =>
            props.theme === "theme-dark" ? "rgba(255, 255, 255, 0.6)" :
            props.theme === "theme-contrast-dark" ? "rgba(255, 255, 255, 0.8)" : 
            "#444444"
          };
        }
      }
    }

    .category-selector-dropdown {
      position: absolute;
      top: calc(100% - 1px);
      left: 0;
      padding: 24px 0;
      border: 1px solid ${props =>
        props.theme === "theme-light" ? "#C0C0C0" :
        props.theme === "theme-dark" ? "#5A5A5A" :
        props.theme === "theme-contrast-dark" ? "#616161" : 
        "#D8DADC"
      };
      width: initial;
      height: initial;
      background-color: ${props =>
        props.theme === "theme-dark" ? "#333333" :
        props.theme === "theme-contrast-dark" ? "#1E1E1E" : 
        "#FFFFFF"
      };
      box-shadow: ${props =>
        props.theme === "theme-dark" || props.theme === "theme-contrast-dark" ? "0 4px 10px 0 rgba(0, 0, 0, 0.4)" :
        "0 4px 10px 0 rgba(0, 0, 0, 0.2)"
      };

      &:before {
        content: none;
      }

      > .category-selector-header {
        display: none;
      }

      @media screen and ${device.laptop} {
        &.active {
          border: none;
          box-shadow: none;
          background-color: transparent;

          .category-selector-item {
            opacity: 0;
            visibility: hidden;
          }
        }
      }

      @media screen and ${device.mobileL} {
        max-width: 290px;
      }
    }

    .category-selector-item {
      padding: 8px 32px;
      font-size: 16px;
      font-weight: 600;
      line-height: 24px;
      color: ${props =>
        props.theme === "theme-light" ? "rgba(0, 0, 0, 0.8)" :
        props.theme === "theme-dark" ? "rgba(255, 255, 255, 0.8)" :
        props.theme === "theme-contrast-dark" ? "#E8E8E8" : 
        "#444444"
      };

      &:not([href]) {
        font-weight: 600;
        letter-spacing: 0.04em;

        @media screen and (max-width: 896px) {
          font-size: 14px;
          line-height: 19px;
        }
      }

      svg {
        path {
          fill: ${props =>
            props.theme === "theme-light" ? "rgba(0, 0, 0, 0.8)" :
            props.theme === "theme-dark" ? "rgba(255, 255, 255, 0.8)" :
            props.theme === "theme-contrast-dark" ? "#E8E8E8" : 
            "#444444"
          };
        }
      }

      &:hover {
        color: ${props =>
          props.theme === "theme-light" ? "rgba(0, 0, 0, 0.8)" :
          props.theme === "theme-dark" ? "rgba(255, 255, 255, 0.8)" :
          props.theme === "theme-contrast-dark" ? "#E8E8E8" : 
          "#444444"
        };
        background-color: ${props =>
          props.theme === "theme-light" ? "#CBCBCB" :
          props.theme === "theme-dark" ? "#555555" :
          props.theme === "theme-contrast-dark" ? "#424242" : 
          "#F5F5F5"
        };
      }

      @media screen and ${device.mobileL} {
        white-space: initial;

        svg {
          margin-left: 8px;
        }
      }
    }

    .category-selector-submenu {
      border: 1px solid ${props =>
        props.theme === "theme-light" ? "#E0E0E0" :
        props.theme === "theme-dark" ? "#5A5A5A" :
        props.theme === "theme-contrast-dark" ? "#616161" : 
        "#D8DADC"
      };
      padding: 16px 0;
      background-color: ${props =>
        props.theme === "theme-dark" ? "#333333" :
        props.theme === "theme-contrast-dark" ? "#1E1E1E" : 
        "#FFFFFF"
      };
      box-shadow: ${props =>
        props.theme === "theme-dark" || props.theme === "theme-contrast-dark" ? "0 4px 10px 0 rgba(0, 0, 0, 0.4)" :
        "0 4px 10px 0 rgba(0, 0, 0, 0.2)"
      };

      .category-selector-header {
        border-bottom: none;
      }

      @media screen and ${device.laptop} {
        position: absolute;
        left: 0;
        height: initial;
        padding: 0;
        min-width: 320px;
        box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.2);
        overflow: initial;
  
        .category-selector-header {
          position: relative;
          top: initial;
          display: flex;
          padding: 12px;
          background-color: ${props =>
            props.theme === "theme-light" ? "#CBCBCB" :
            props.theme === "theme-dark" ? "#555555" :
            props.theme === "theme-contrast-dark" ? "#424242" : 
            "#F5F5F5"
          };
        }
  
        .category-selector-title {
          font-weight: 600;
          color: ${props =>
            props.theme === "theme-dark" ? "rgba(255, 255, 255, 0.8)" :
            props.theme === "theme-contrast-dark" ? "#E8E8E8" : 
            "#444444"
          };
        }

        .category-selector-header-btn {
          svg {
            path {
              fill: ${props =>
                props.theme === "theme-dark" ? "rgba(255, 255, 255, 0.8)" :
                props.theme === "theme-contrast-dark" ? "#E8E8E8" : 
                "#444444"
              };
            }
          }
        }
      }

      @media screen and ${device.mobileM} {
        min-width: 290px;
      }
    }

    .category-selector-links-wrapper {
      @media screen and ${device.laptop} {
        padding-right: 2px;
      }
    }

    .category-selector-links {
      @media screen and ${device.laptop} {
        overflow-y: auto;
        height: 100%;
        max-height: 496px;
      }

      @media screen and (max-height: 660px) and (max-width: 1024px) {
        max-height: 330px;
      }

      @media screen and (max-height: 490px) and (max-width: 1024px) {
        max-height: 200px;
      }

      ::-webkit-scrollbar {
        width: 8px;
        background-color: transparent;
      }
        
      ::-webkit-scrollbar-thumb {
        border-radius: 3px;
        background-color: ${props =>
          props.theme === "theme-dark" || props.theme === "theme-contrast-dark" ? "#404040" :
          "#E0E0E0"
        };
      }

      a {
        padding: 8px 32px;
        color: ${props =>
          props.theme === "theme-light" ? "rgba(0, 0, 0, 0.8)" :
          props.theme === "theme-dark" ? "rgba(255, 255, 255, 0.8)" :
          props.theme === "theme-contrast-dark" ? "#E8E8E8" : 
          "#444444"
        };

        &:hover {
          color: ${props =>
            props.theme === "theme-light" ? "rgba(0, 0, 0, 0.8)" :
            props.theme === "theme-dark" ? "rgba(255, 255, 255, 0.8)" :
            props.theme === "theme-contrast-dark" ? "#E8E8E8" : 
            "#444444"
          };
          background-color: ${props =>
            props.theme === "theme-light" ? "#E0E0E0" :
            props.theme === "theme-dark" ? "#555555" :
            props.theme === "theme-contrast-dark" ? "#424242" : 
            "#EBEBEB"
          };
        }

        &.active {
          background-color: ${props =>
            props.theme === "theme-light" ? "#CBCBCB" :
            props.theme === "theme-dark" ? "#555555" :
            props.theme === "theme-contrast-dark" ? "#424242" : 
            "#F5F5F5"
          };
        }
      }
    }
  }
`;

export default StyledCategorySelector;
