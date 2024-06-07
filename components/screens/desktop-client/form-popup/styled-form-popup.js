import styled, { createGlobalStyle } from "styled-components";
import { device } from "@utils/devices";

export const PopupGlobalStyles = createGlobalStyle`
  body {
    overflow-y: hidden;
  }
`;

export const StyledFormPopup = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  opacity: 0;
  overflow-y: auto;
  visibility: hidden;
  transition: opacity 0.3s, visibility 0.3s;

  &.active {
    opacity: 1;
    visibility visible;
  }

  .popup-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    line-height: 21px;
    padding: 32px;
    min-height: 100%;

    @media screen and (max-width: 592px) {
      padding: 16px;
    }
  }

  .popup-content {
    box-sizing: content-box;
    border: 1px solid ${props =>
      props.theme === "theme-dark" || props.theme === "theme-contrast-dark" ? "#616161" :
      "#CBCBCB"
    };
    border-radius: 5px;
    width: 100%;
    max-width: 886px;
    box-shadow: ${props =>
      props.theme === "theme-dark" || props.theme === "theme-contrast-dark" ? "0 4px 10px 0 rgba(0, 0, 0, 0.4)" :
      "0 4px 10px 0 rgba(0, 0, 0, 0.2)"
    };
    background-color: ${props =>
      props.theme === "theme-dark" ? "#333333" :
      props.theme === "theme-contrast-dark" ? "#1E1E1E" : 
      "#ffffff"
    };

    @media screen and ${device.laptop} {
      max-width: 376px;
    }
  }

  .popup-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid ${props =>
      props.theme === "theme-dark" || props.theme === "theme-contrast-dark" ? "#616161" :
      "#CBCBCB"
    };
    border-radius: 5px 5px 0 0;
    padding: 10px 17px 10px 27px;
    background-color: ${props =>
      props.theme === "theme-light" ? "#F7F7F7" :
      props.theme === "theme-dark" ? "#404040" :
      props.theme === "theme-contrast-dark" ? "#2A2A2A" : 
      "#F1F1F1"
    };

    @media screen and ${device.laptop} {
      padding: 11px 19px 11px 26px;
    }
  }

  .popup-title {
    font-size: 18px;
    line-height: 20px;
    letter-spacing: 0.02em;
    color: ${props =>
      props.theme === "theme-light" ? "rgba(0, 0, 0, 0.8)" :
      props.theme === "theme-dark" ? "rgba(255, 255, 255, 0.8)" :
      props.theme === "theme-contrast-dark" ? "#E8E8E8" : 
      "#444444"
    };
  }

  .popup-close-btn {
    padding: 0;
    width: 19px;
    height: 19px;
    border: none;
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

  .popup-body {
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: start;
    gap: 32px;
    padding: 27px;

    @media screen and ${device.laptop} {
      grid-template-columns: initial;
      padding: 26px;
    }
  }

  .form-img {
    display: flex;
    border: 1px solid ${props =>
      props.theme === "theme-light" ? "#E0E0E0" :
      props.theme === "theme-dark" ? "#5A5A5A" :
      props.theme === "theme-contrast-dark" ? "#616161" : 
      "#D8DADC"
    };
    border-radius: 5px;
    overflow: hidden;
    
    img {
      width: 100%;
      object-fit: contain;
      ${props => (props.theme === "theme-dark" || props.theme === "theme-contrast-dark") && "opacity: 0.9;"}
    }
  }

  .form-content {
    border-bottom: 1px solid ${props =>
      props.theme === "theme-light" ? "#E0E0E0" :
      props.theme === "theme-dark" ? "#5A5A5A" :
      props.theme === "theme-contrast-dark" ? "#616161" : 
      "#D8DADC"
    };
    padding-bottom: 23px;
    margin-bottom: 24px;
  }

  .form-title {
    margin-bottom: 8px;
    font-size: 18px;
    line-height: 24px;
    letter-spacing: -0.02em;
    color: ${props =>
      props.theme === "theme-light" ? "rgba(0, 0, 0, 0.8)" :
      props.theme === "theme-dark" ? "rgba(255, 255, 255, 0.8)" :
      props.theme === "theme-contrast-dark" ? "#E8E8E8" : 
      "#444444"
    };

    @media screen and ${device.laptop} {
      font-size: 16px;
      line-height: 21px;
    }
  }

  .form-label {
    margin-bottom: 12px;
    color: ${props =>
      props.theme === "theme-light" ? "rgba(0, 0, 0, 0.8)" :
      props.theme === "theme-dark" ? "rgba(255, 255, 255, 0.8)" :
      props.theme === "theme-contrast-dark" ? "#E8E8E8" : 
      "#444444"
    };
  }

  .form-description {
    color: ${props =>
      props.theme === "theme-light" ? "rgba(0, 0, 0, 0.8)" :
      props.theme === "theme-dark" ? "rgba(255, 255, 255, 0.8)" :
      props.theme === "theme-contrast-dark" ? "#E8E8E8" : 
      "#444444"
    };

    @media screen and ${device.laptop} {
      font-size: 12px;
      line-height: 19px;
    }
  }

  .form-info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-bottom: 24px;
  }

  .form-info-block {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin-right: 24px;
  }

  .form-info-item {
    &:not(:last-child) {
      margin-right: 24px;
    }
  }

  .form-info-label {
    margin-right: 8px;
    color: ${props =>
      props.theme === "theme-light" ? "rgba(0, 0, 0, 0.6)" :
      props.theme === "theme-dark" ? "rgba(255, 255, 255, 0.6)" :
      props.theme === "theme-contrast-dark" ? "#B8B8B8" : 
      "#A5A5A5"
    };

    @media screen and ${device.laptop} {
      font-size: 13px;
      line-height: 20px;
    }
  }

  .form-info-value {
    font-weight: 700;
    color: ${props =>
      props.theme === "theme-light" ? "rgba(0, 0, 0, 0.8)" :
      props.theme === "theme-dark" ? "rgba(255, 255, 255, 0.8)" :
      props.theme === "theme-contrast-dark" ? "#E8E8E8" : 
      "#444444"
    };

    @media screen and ${device.laptop} {
      font-size: 13px;
      line-height: 17px;
    }
  }

  .form-btn {
    box-sizing: border-box;
    border-radius: 4px;
    padding: 7px 14px;
    font-size: 14px;
    line-height: 22px;
    min-width: 157px;
    height: initial;
    color: ${props =>
      props.theme === "theme-dark" ? "#333333" :
      props.theme === "theme-contrast-dark" ? "#121212" : 
      "#FFFFFF"
    };
    background-color: ${props =>
      props.theme === "theme-light" ? "#444444" :
      props.theme === "theme-dark" ? "#DDDDDD" :
      props.theme === "theme-contrast-dark" ? "#E6E6E6" : 
      "#A5A5A5"
    };

    &:hover {
      background-color: ${props =>
        props.theme === "theme-light" ? "#1C1C1C" :
        props.theme === "theme-dark" ? "#FCFCFC" :
        props.theme === "theme-contrast-dark" ? "#A6A6A6" : 
        "#C3C3C3"
      };
    }

    &:active {
      background-color: ${props =>
        props.theme === "theme-light" ? "rgba(68, 68, 68, 0.4)" :
        props.theme === "theme-dark" ? "rgba(221, 221, 221, 0.4)" :
        props.theme === "theme-contrast-dark" ? "rgba(230, 230, 230, 0.4)" : 
        "rgba(125, 133, 140, 0.4)"
      };
    }
  }
`;
