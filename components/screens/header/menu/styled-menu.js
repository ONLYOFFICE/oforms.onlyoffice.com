import styled, { createGlobalStyle } from "styled-components";
import { device } from "@utils/devices";

const GlobalStyles = createGlobalStyle`
  html {
    ${({ stateMobile }) => (stateMobile ? "overflow: hidden;" : "")}
  }
`;

const StyledHeading = styled.div`
  position: relative;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
  padding: 0 24px;
  height: 72px;
  background-color: transparent;

  &.main {
    .oo-hm {
      .oo-hm-item {
        .oo-hm-item-heading {
          color: #FFFFFF;

          &.active {
            color: #FF6F3D;

            @media screen and ${device.laptop} {
              color: #444444;
            }
          }

          @media screen and ${device.laptop} {
            color: #444444;
          }
        }

        &.oo-hm-item--get-onlyoffice-eu {
          .oo-hm-item-heading {
            &.active {
              color: #ffffff;

              @media screen and ${device.laptop} {
                color: #444444;
              }
            }
          }
        }
      }

      .oo-hm-item--products {
        .oo-hm-item-heading {
          color: #FF6F3D;

          @media screen and ${device.laptop} {
            color: #444444;
          }
        }
      }
    }

    .phone-btn,
    .arrow-image {
      path {
        fill: #FFFFFF;
      }
    }

    .nav-btn-mobile {
      svg {
        rect {
          @media screen and ${device.laptop} {
            fill: #ffffff;
          }
        }
      }
    }
  }

  .oo-hm {
    position: initial;

    .oo-hm-item--products {
      .oo-hm-item-heading {
        position: relative;
        color: #ff6f3d;

        &:after {
          content: "";
          position: absolute;
          left: 50%;
          bottom: 0;
          border-bottom: 1px solid #ff6f3d;
          width: calc(100% - 40px);
          transform: translateX(-50%);

          @media screen and (max-width: 1300px) {
            width: calc(100% - 20px);
          }

          @media screen and ${device.laptop} {
            content: none;
          }
        }

        @media screen and ${device.laptop} {
          color: #444444;
          background-color: #f9f9f9;
        }
      }

      .oo-hm-item-link--templates {
        color: #FF6F3D;
      }
    }

    .oo-hm-item {
      &.oo-hm-item--get-onlyoffice-eu {
        .oo-hm-item-heading  {
          padding: 8px 12px 8px 40px;
          height: ${props => (props.locale === "de" || props.locale === "fr" || props.locale === "it") && "initial"};

          @media screen and (max-width: 1130px) {
            padding: ${props => props.locale === "fr" && "11px 12px 11px 40px"};
            line-height: ${props => props.locale === "fr" && "18px"};
            max-width: ${props => props.locale === "fr" && "140px"};
          }

          @media screen and (max-width: 1080px) {
            padding: ${props => props.locale === "de" && "11px 12px 11px 40px"};
            line-height: ${props => props.locale === "de" && "18px"};
            max-width: ${props => props.locale === "de" && "140px"};
          }

          @media screen and ${device.laptop} {
            padding: 16px 48px 16px 56px;
            line-height: ${props => (props.locale === "de" || props.locale === "fr") && "24px"};
            max-width: ${props => (props.locale === "de" || props.locale === "fr") && "100%"};
          }
        }
      }

      .oo-hm-item-heading {
        padding: 14px 24px;
        height: 72px;

        @media screen and (max-width: 1520px) {
          padding: ${props => props.locale === "fr" && "14px 18px"};
        }

        @media screen and (max-width: 1460px) {
          padding: 14px 18px;
        }

        @media screen and (max-width: 1380px) {
          padding: ${props => props.locale === "fr" ? "14px 9px" : "14px 10px"};
        }

        @media screen and (max-width: 1050px) {
          padding: ${props => props.locale === "fr" && "14px 7px"};
        }

        @media screen and ${device.laptop} {
          padding: ${props => props.locale === "ar" ? "16px 24px 16px 40px" : "16px 40px 16px 24px"};
          height: initial;
        }
      }
    } 

    @media screen and ${device.laptop} {
      position: fixed;
    }
  }

  .nav-item-logo {
    display: flex;
    ${props => props.locale === "ar" ? "margin-left: 32px;" : "margin-right: 32px;"}
    width: 154px;
    height: 28px;

    img {
      @media screen and (max-width: 1300px) {
        object-position: ${props => props.locale === "ar" && "122px center"};
      }

      @media screen and ${device.laptop} {
        object-position: initial;
      }
    }

    @media screen and (max-width: 1300px) {
      overflow: hidden;
      min-width: 32px;
      width: 32px;
    }

    @media screen and ${device.laptop} {
      display: block;
      ${props => props.locale === "ar" ? "margin-left: auto;" : "margin-right: auto;"}
      width: 152px;
      height: 28px;
    }

    @media screen and (max-width: 592px) {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }
  }

  .nav-btn-mobile {
    display: none;
    border: none;
    width: 20px;
    height: 14px;
    background-color: transparent;

    svg {
      rect {
        @media screen and ${device.laptop} {
          fill: #444444;
        }
      }
    }

    @media screen and ${device.laptop} {
      box-sizing: border-box;
      display: flex;
      padding: 0;
      ${props => props.locale === "ar" ? "margin-left: 32px;" : "margin-right: 32px;"}
      cursor: pointer;
    }
  }

  .nav-selector-wrapper {
    display: flex;
    align-items: center;
    ${props => props.locale === "ar" ? "margin-left: 32px;" : "margin-right: 32px;"}

    @media screen and ${device.mobile} {
      ${props => props.locale === "ar" ? "margin-left: 0;" : "margin-right: 0;"}
    }
  }

  .phone-menu {
    ${props => props.locale === "ar" ? "margin-left: 10px;" : "margin-right: 10px;"}
  }

  .submit-form-btn {
    border-radius: 3px;
    padding: 11px 16px;
    font-size: 13px;
    font-weight: 700;
    line-height: 18px;
    letter-spacing: 0.04em;
    color: #FFFFFF;
    background-color: #FF6F3D;
    text-align: center;
    text-transform: uppercase;
    transition: background-color 0.3s;

    &:hover {
      background-color: #FF865C;
    }

    @media screen and (max-width: 1490px) {
      max-width: ${props => props.locale === "fr" ? "106px" : props.locale === "de" ? "80px" : (props.locale === "es" || props.locale === "pt") ? "96px" : ""};
    }

    @media screen and (max-width: 1080px) {
      max-width: ${props => props.locale === "it" && "70px"};
    }

    @media screen and ${device.laptop} {
      max-width: 100%;
    }

    @media screen and ${device.mobile} {
      display: none;
    }
  }

  .phone-btn {
    @media screen and (max-width: 1300px) {
      padding: 24px 10px;
    }
  }

  .phone-menu {
    @media screen and (max-width: 1300px) {
      margin-right: 5px;
    }

    @media screen and ${device.laptop} {
      display: none;
    }
  }

  &.is-open {
    .nav-btn-mobile,
    .nav-selector-wrapper,
    .submit-form-btn {
      @media screen and ${device.laptop} {
        transform: ${props => props.locale === "ar" ? "translate3d(-429px, 0, 0)" : "translate3d(429px, 0, 0)"};
        transition: transform 0.2s cubic-bezier(0.16,0.68,0.43,0.99);
      }

      @media screen and (max-width: 592px) {
        transform: ${props => props.locale === "ar" ? "translate3d(calc(-100vw + 64px), 0, 0)" : "translate3d(calc(100vw - 64px), 0, 0)"};
      }

      @media screen and (max-width: 375px) {
        transform: ${props => props.locale === "ar" ? "translate3d(calc(-100vw + 32px), 0, 0)" : "translate3d(calc(100vw - 32px), 0, 0)"};
      }
    }

    .nav-item-logo {
      @media screen and ${device.laptop} {
        transform: ${props => props.locale === "ar" ? "translate3d(-429px, 0, 0)" : "translate3d(429px, 0, 0)"};
        transition: transform 0.2s cubic-bezier(0.16,0.68,0.43,0.99);
      }

      @media screen and (max-width: 592px) {
        transform: ${props => props.locale === "ar" ? "translate3d(-380px, 0, 0) translateX(-50%)" : "translate3d(380px, 0, 0) translateX(-50%)"};
      }

      @media screen and (max-width: 430px) {
        transform: ${props => props.locale === "ar" ? "translate3d(-288px, 0, 0) translateX(-50%)" : "translate3d(288px, 0, 0) translateX(-50%)"};
      }
    }

    .overlay {
      @media screen and ${device.laptop} {
        opacity: 1;
        visibility: visible;
      }
    }
  }

  .overlay {
    @media screen and ${device.laptop} {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      visibility: hidden;
      background-color: rgba(0, 0, 0, 0.27);
      transition: opacity 0.3s, visibility 0.3s;
      z-index: 1001;
    }
  }

  @media screen and ${device.laptop} {
    height: 48px;
  }

  @media screen and (max-width: 592px) {
    padding: 0 18px 0 15px;
  }
`;

export { StyledHeading, GlobalStyles };