import styled, { keyframes } from "styled-components";
import { device } from "@utils/devices";
import flags from "@public/icons/flags.svg";
import globe from "@public/icons/globe.svg";

const menuLineLeft = keyframes`
  0% {
    width: 0;
    left: 50%;
  }

  100% {
    width: 50%;
    left: 0;
  }
`;

const menuLineRight = keyframes`
  0% {
    width: 0;
  }

  100% {
    width: 50%;
  }
`;

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
      transform: translateY(0) rotate(-180deg);
    }

    .chevron-down {
      transform: rotate(180deg);
    }

    &:not(.is-desktop-client) {
      .arrow-image {
          transition-duration: 0.3s;

          path {
            fill: #FF6F3D;
          }
      }

      .flag-image {
        background-position-y: -40px;
      }

      .language-list {
        width: 153px;
        padding: 16px 0;

        @media screen and ${device.laptopL} {
          left: -100%;
        }

        .language-item {
          a {
            padding: 8px 24px;
          }
        }
          
        &:before {
          animation: ${menuLineLeft} 0.3s forwards ease-in-out;
        }
  
        &:after {
          animation: ${menuLineRight} 0.3s forwards ease-in-out;
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
      width: 32px;
      left: ${props => props.locale === "ar" ? "36px" : "14px"};
      border: 1px solid ${props =>
        props.theme === "theme-light" ? "#E0E0E0" :
        props.theme === "theme-dark" || props.theme === "theme-contrast-dark" ? "#616161" :
        "#CBCBCB"
      };
      border-radius: 2px;
      padding: 4px 0;
      box-shadow: ${props =>
        props.theme === "theme-dark" || props.theme === "theme-contrast-dark" ? "0 2px 5px 0 #00000066" : 
        "0 4px 10px 0 #00000033"
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
      width: 32px;
      height: 24px;
      background-image: url(${flags.src});

      &:hover {
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
          props.theme === "theme-dark" ? "#606060" :
          props.theme === "theme-contrast-dark" ? "#666666" : 
          "#F1F1F1"
        };
      }
    }

    .flag-image {
      width: 24px;
      height: 24px;
    }

    .flag-image, .language-link {
      background-image: url(${flags.src});

      &.en {
        background-position-y: 0;
      }

      &.fr {
        background-position-y: -48px;
      }

      &.de {
        background-position-y: -72px;
      }

      &.es {
        background-position-y: -96px;
      }

      &.pt {
        background-position-y: -120px;
      }

      &.it {
        background-position-y: -144px;
      }

      &.ja {
        background-position-y: -216px;
      }

      &.zh {
        background-position-y: -240px;
      }

      &.ar {
        background-position-y: -336px;
      }
    }
  }

  &:not(.is-desktop-client) {
    .flag-image {
      ${props => props.locale === "ar" ? "margin-left: 5px;" : "margin-right: 5px;"}
      width: 24px;
      height: 24px;
      background-image: url(${globe.src});
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
    display: flex;
    text-decoration: none;
    cursor: pointer;
    font-size: 14px;
    background-repeat: no-repeat;
    list-style-type: none;

    span {
      display: flex;
      gap: 8px;
    }

    b {
      text-transform: uppercase;
    }

    &.active {
      color: #FF6F3D;
    }
  }

  .arrow-image {
    transform: translateY(2px);
    outline: none;
    -webkit-tap-highlight-color: transparent;
    transition-duration: 0.3s;
  }

  .chevron-down {
    width: 24px;
    height: 24px;
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

    &:hover {
      background-color: #F5F5F5;
    }

    .language-item-image {
      margin-top: -1px;
    }
  
    .title-lng:hover {
      color: #ff865c;
      cursor: pointer;
    }
  }


  @media screen and ${device.laptop} {
    .language-button {
      min-height: 48px;
    }
  }
`;

export default StyledLanguageSelector;