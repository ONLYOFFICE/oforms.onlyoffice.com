import styled from "styled-components";
import { device } from "@utils/devices";

const StyledCategorySelector = styled.div`
  position: relative;
  transition: width 0.3s, opacity 0.3s, visibility 0.3s;

  &.fr {
    .category-selector-links a {
      @media screen and (max-width: 1270px) {
        max-width: calc(280px + (400 - 280) * ((100vw - 1024px) / (1270 - 1024)));
      }

      @media screen and (max-width: 1024px) {
        max-width: 100%;
      }
    }
  }

  &.de,
  &.it {
    .category-selector-links a {
      @media screen and (max-width: 1090px) {
        max-width: calc(320px + (400 - 320) * ((100vw - 1024px) / (1090 - 1024)));
      }

      @media screen and (max-width: 1024px) {
        max-width: 100%;
      }
    }
  }

  &.es,
  &.pt {
    .category-selector-links a {
      @media screen and (max-width: 1180px) {
        max-width: calc(320px + (400 - 320) * ((100vw - 1024px) / (1180 - 1024)));
      }

      @media screen and (max-width: 1024px) {
        max-width: 100%;
      }
    }
  }

  &.hide-mobile {
    @media screen and (max-width: 592px) {
      width: 0;
      opacity: 0;
      visibility: hidden;
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
    font-size: 14px;
    font-weight: 400;
    line-height: 21px;
    color: ${props =>
      props.theme === "theme-dark" ? "rgba(255, 255, 255, 0.6)" :
      props.theme === "theme-contrast-dark" ? "#B8B8B8" : 
      "#A5A5A5"
    };
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
    border: 1px solid ${props =>
      props.theme === "theme-light" ? "#C0C0C0" :
      props.theme === "theme-dark" ? "#5A5A5A" :
      props.theme === "theme-contrast-dark" ? "#616161" : 
      "#D8DADC"
    };
    padding: 24px 0;
    background-color: ${props =>
      props.theme === "theme-dark" ? "#333333" :
      props.theme === "theme-contrast-dark" ? "#1E1E1E" : 
      "#FFFFFF"
    };
    box-shadow: ${props =>
      props.theme === "theme-dark" || props.theme === "theme-contrast-dark" ? "0 4px 10px 0 rgba(0, 0, 0, 0.4)" :
      "0 4px 10px 0 rgba(0, 0, 0, 0.2)"
    };
    z-index: 10;

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
    padding: 8px 32px;
    font-size: 16px;
    font-weight: 600;
    line-height: 24px;
    min-height: 40px;
    color: ${props =>
      props.theme === "theme-light" ? "rgba(0, 0, 0, 0.8)" :
      props.theme === "theme-dark" ? "rgba(255, 255, 255, 0.8)" :
      props.theme === "theme-contrast-dark" ? "#E8E8E8" : 
      "#444444"
    };
    white-space: nowrap;
    cursor: pointer;

    &:not([href]) {
      font-weight: 600;
      letter-spacing: 0.04em;

      @media screen and (max-width: 896px) {
        font-size: 14px;
        line-height: 19px;
      }
    }

    svg {
      display: flex;
      margin-left: 32px;

      path {
        fill: ${props =>
          props.theme === "theme-light" ? "rgba(0, 0, 0, 0.8)" :
          props.theme === "theme-dark" ? "rgba(255, 255, 255, 0.8)" :
          props.theme === "theme-contrast-dark" ? "#E8E8E8" : 
          "#444444"
        };
      }

      @media screen and ${device.mobileL} {
        margin-left: 8px;
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

    &.active {
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

    @media screen and (max-width: 896px) {
      min-height: 48px;
      white-space: initial;
    }
  }

  .category-selector-submenu {
    position: absolute;
    top: 0;
    left: 100%;
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
    z-index: 10;
    box-shadow: ${props =>
      props.theme === "theme-dark" || props.theme === "theme-contrast-dark" ? "0 4px 10px 0 rgba(0, 0, 0, 0.4)" :
      "0 4px 10px 0 rgba(0, 0, 0, 0.2)"
    };

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

      @media screen and ${device.laptop} {
        color: ${props =>
          props.theme === "theme-dark" ? "rgba(255, 255, 255, 0.8)" :
          props.theme === "theme-contrast-dark" ? "#E8E8E8" : 
          "#444444"
        };
      }
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
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    list-style-type: none;

    a {
      box-sizing: border-box;
      display: block;
      padding: 8px 32px;
      font-size: 16px;
      line-height: 24px;
      color: ${props =>
        props.theme === "theme-light" ? "rgba(0, 0, 0, 0.8)" :
        props.theme === "theme-dark" ? "rgba(255, 255, 255, 0.8)" :
        props.theme === "theme-contrast-dark" ? "#E8E8E8" : 
        "#444444"
      };
      width: 100%;
      max-width: 400px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;

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

      @media screen and ${device.laptop} {
        white-space: initial;
        text-overflow: initial;
        overflow: initial;
        width: 100%;
        min-width: 100%;
        max-width: 100%;
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
      overflow-x: hidden;
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

    @media screen and (max-width: 896px) {
      padding: 16px 0;
    }
  }

  @media screen and ${device.laptop} {
    position: initial;
  }
`;

export default StyledCategorySelector;