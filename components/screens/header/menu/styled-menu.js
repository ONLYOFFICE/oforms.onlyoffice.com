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
      }

      .oo-hm-item--products {
        .oo-hm-item-heading {
          color: #FF6F3D;

          @media screen and ${device.laptop} {
            color: #444444;
          }
        }
      }

      .oo-hm-item--download {
        .oo-hm-item-heading {
          &.active {
            color: #ffffff;
          }

          @media screen and ${device.laptop} {
            color: #ffffff;
          }
        }
      }

      .oo-hm-item--login-signup {
        .oo-hm-item-heading {
          color: #444444;
          background-color: #ffffff;

          &.active {
            color: #444444;

            @media screen and ${device.laptop} {
              color: #ffffff;
            }
          }

          span {
            background-color: #444444;

            @media screen and ${device.laptop} {
              background-color: transparent;
            }
          }

          @media screen and ${device.laptop} {
            color: #ffffff;
            background-color: #444444;
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

  .nav-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 auto;
    width: 100%;
    max-width: 1200px;
  }

  .oo-hm {
    position: initial;
    ${props => props.locale === "ar" ? "margin-left: 10px;" : "margin-right: 10px;"}

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
          width: calc(100% - 24px);
          transform: translateX(-50%);

          @media screen and (max-width: 1300px) {
            width: calc(100% - 16px);
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

    .oo-hm-item--partners {
      .oo-hm-items-wrapper {
        @media screen and (max-width: 1032px) {
          top: ${props => props.locale === "pt" && "99%"};
          left: ${props => props.locale === "pt" && "initial"};
          right: ${props => props.locale === "pt" && "0"};
        }

        @media screen and ${device.laptop} {
          top: ${props => props.locale === "pt" && "0"};
          right: ${props => props.locale === "pt" && "initial"};
        }
      }

      @media screen and (max-width: 1032px) {
        position: ${props => props.locale === "pt" && "initial"};
      }
    }

    .oo-hm-item--download {
      .oo-hm-items-wrapper {
        @media screen and (max-width: 1384px) {
          top: ${props => props.locale === "zh" && "100%"};
          left: ${props => props.locale === "zh" && "initial"};
          right: ${props => props.locale === "zh" && "0"};
        }

        @media screen and ${device.laptop} {
          top: ${props => props.locale === "zh" && "0"};
          right: ${props => props.locale === "zh" && "initial"};
        }
      }

      @media screen and (max-width: 1384px) {
        position: ${props => props.locale === "zh" && "initial"};
      }
    }

    .oo-hm-item--login-signup {
      .oo-hm-items-wrapper {
        @media screen and (max-width: 1272px) {
          top: ${props => props.locale === "zh" && "100%"};
          left: ${props => props.locale === "zh" && "initial"};
          right: ${props => props.locale === "zh" && "0"};
        }

        @media screen and ${device.laptop} {
          top: ${props => props.locale === "zh" && "0"};
          right: ${props => props.locale === "zh" && "initial"};
        }
      }

      @media screen and (max-width: 1272px) {
        position: ${props => props.locale === "zh" && "initial"};
      }
    }

    @media screen and ${device.laptop} {
      position: fixed;
      ${props => props.locale === "ar" ? "margin-left: iniital;" : "margin-right: iniital;"}
    }
  }

  .nav-item-logo {
    display: flex;
    ${props => props.locale === "ar" ? "margin-left: 20px;" : "margin-right: 20px;"}
    width: 130px;
    height: 24px;

    img {
      object-fit: contain;

      @media screen and (max-width: 1300px) {
        object-position: ${props => props.locale === "ar" && "104px center"};
      }

      @media screen and ${device.laptop} {
        object-position: initial;
      }
    }

    @media screen and (max-width: 1300px) {
      ${props => props.locale === "ar" ? "margin-left: 8px;" : "margin-right: 8px;"}
      overflow: hidden;
      min-width: 28px;
      width: 28px;
    }

    @media screen and ${device.laptop} {
      position: absolute;
      left: 50%;
      width: 130px;
      height: 24px;
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
  }

  .phone-menu {
    ${props => props.locale === "ar" ? "margin-left: 10px;" : "margin-right: 10px;"}
  }

  .phone-btn {
    @media screen and (max-width: 1300px) {
      padding: 24px 10px;
    }
  }

  .phone-menu {
    @media screen and ${device.laptop} {
      display: none;
    }
  }

  &.is-open {
    .nav-btn-mobile,
    .nav-selector-wrapper {
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