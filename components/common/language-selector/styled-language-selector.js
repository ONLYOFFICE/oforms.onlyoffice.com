import styled from "styled-components";
import { device } from "@utils/devices";
import flags from "@public/icons/flags.svg";

const StyledLanguageSelector = styled.div`
  position: relative;
  outline: none;
  -webkit-tap-highlight-color: transparent;
  transition: transform .2s cubic-bezier(.16,.68,.43,.99);

  &.is-open {
    .language-list {
      display: block;
    }

    .arrow-image {
      transform: translateY(0) rotate(180deg);
    }

    .chevron-down {
      transform: rotate(180deg);
    }

    &:not(.is-desktop-client) {
      .language-list {
        &:before {
          animation: 0.3s forwards ease-in-out menuLineLeft;
        }
  
        &:after {
          animation: 0.3s forwards ease-in-out menuLineRight;
        }
      }
    }
  }

  &.is-desktop-client {
    .language-button {
      min-height: initial;
    }

    .language-list {
      position: absolute;
      top: 25px;
      left: 14px;
      border: 1px solid ${props =>
        props.theme === "theme-light" ? "#E0E0E0" :
        props.theme === "theme-dark" || props.theme === "theme-contrast-dark" ? "#616161" :
        "#CBCBCB"
      };
      border-radius: 2px;
      padding: 4px 0;
      box-shadow: 1px solid ${props =>
        props.theme === "theme-dark" || props.theme === "theme-contrast-dark" ? "0px 2px 5px 0px rgba(0, 0, 0, 0.4)" : 
        "0px 4px 10px 0px rgba(0, 0, 0, 0.2)"
      };
      background-color: ${props =>
        props.theme === "theme-dark" ? "#333333" :
        props.theme === "theme-contrast-dark" ? "#1E1E1E" : 
        "#FFFFFF"
      };
    }

    .language-link {
      width: 32px;
      background-position-x: 4px;

      &:hover {
        background-color: ${props =>
          props.theme === "theme-light" ? "#EBEBEB" :
          props.theme === "theme-dark" ? "#555555" :
          props.theme === "theme-contrast-dark" ? "#424242" : 
          "#E0E0E0"
        };
      }

      &:active {
        background-color: ${props =>
          props.theme === "theme-light" ? "#F1F1F1" :
          props.theme === "theme-dark" ? "#606060" :
          props.theme === "theme-contrast-dark" ? "#666666" : 
          "#CBCBCB"
        };
      }
    }
  }

  &:not(.is-desktop-client) {
    .flag-image {
      padding-right: 5px;
    }
  }

  .chevron-down {
    path {
      fill: ${props =>
        props.theme === "theme-light" ? "#444444" :
        props.theme === "theme-dark" || props.theme === "theme-contrast-dark" ? "rgba(255, 255, 255, 0.8)" : 
        "rgba(0, 0, 0, 0.8)"
      };
    }
  }

  .language-button {
    display: flex;
    align-items: center;
    border: none;
    padding: 0;
    min-height: 72px;
    background-color: transparent;

    svg {
      cursor: pointer;
    }
  }

  .flag-image {
    box-sizing: initial;
  }

  .arrow-image,
  .flag-image {
    cursor: pointer;
    outline: none;
    -webkit-tap-highlight-color: transparent;
  }

  .flag-image,
  .language-link {
    display: block;
    width: 24px;
    height: 24px;
    text-decoration: none;
    background-image: url(${flags.src});
    background-repeat: no-repeat;
    cursor: pointer;

    &.en {
      background-position-y: -24px;
    }

    &.fr {
      background-position-y: -72px;
    }

    &.de {
      background-position-y: 0;
    }

    &.es {
      background-position-y: -48px;
    }

    &.pt {
      background-position-y: -192px;
    }

    &.it {
      background-position-y: -96px;
    }

    &.ja {
      background-position-y: -360px;
    }

    &.zh {
      background-position-y: -168px;
    }
  }

  .arrow-image {
    width: 8px;
    height 6px;
    transform: translateY(2px);
    outline: none;
    -webkit-tap-highlight-color: transparent;

    > div {
      display: flex;
      width: 8px;
      height 6px;

      svg {
        display: flex;
      }
    }
  }

  .chevron-down {
    width: 24px;
    height: 24px;

    > div {
      display: flex;
    }
  }

  .title-lng {
    display: inline-block;
    font-size: 14px;
    font-family: "Open Sans", sans-serif;
    color: #333;
    padding-left: 8px;
    vertical-align: middle;
    text-transform: uppercase;
    width: fit-content;
  }

  .language-list {
    position: absolute;
    top: 99%;
    left: 50%;
    display: ${(props) => (props.isOpen ? "block" : "none")};
    border-radius: 0 0 8px 8px;
    margin: 0;
    padding: 16px;
    max-width: 56px;
    z-index: 100;
    background-color: #ffffff;
    box-shadow: 0 20px 50px rgba(85,85,85,0.15);
    transform: translateX(-50%);
    list-style-type: none;

    &:before {
      display: block;
      position: absolute;
      width: 0;
      content: "";
      height: 1px;
      background-color: #FF642E;
      transition: width 0.2s ease-in-out;
      left: 50%;
      top: 0;
    }

    &:after {
      display: block;
      position: absolute;
      width: 0;
      content: "";
      height: 1px;
      background-color: #FF642E;
      transition: width 0.2s ease-in-out;
      left: 50%;
      top: 0;
    }
  }

  .language-item {
    outline: none;
    -webkit-tap-highlight-color: transparent;
    .language-item-image {
      margin-top: -1px;
    }
  
    .title-lng:hover {
      color: #ff865c;
      cursor: pointer;
    }
  }

  @keyframes menuLineLeft {
    0 {
      width: 0;
      left: 50%;
    }

    100% {
      width: 50%;
      left: 0;
    }
  }

  @keyframes menuLineRight {
    0 {
      width: 0;
    }

    100% {
      width: 50%;
    }
  }

  @media screen and ${device.laptop} {
    .language-button {
      min-height: 48px;
    }
  }
`;

export default StyledLanguageSelector;