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
    .oo-hm .oo-hm-item .oo-hm-item-heading {
      color: #FFFFFF;

      &.active {
        color: #FF6F3D;

        @media screen and ${device.laptop} {
          color: #444444;
        }
      }

      @media screen and ${device.laptop} {
        color: #333333;
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

    .oo-hm-item .oo-hm-item-heading {
      padding: 14px 24px;
      height: 72px;
      color: #ffffff;

      @media screen and (max-width: 1460px) {
        padding: 14px 18px;
      }

      @media screen and (max-width: 1380px) {
        padding: 14px 10px;
      }

      @media screen and (max-width: 1024px) {
        padding: 16px 40px 16px 24px;
        height: initial;
      }
    }

    @media screen and (max-width: 1024px) {
      position: fixed;
    }
  }

  .nav-item-logo {
    display: flex;
    margin-right: 32px;
    width: 154px;
    height: 28px;

    @media screen and (max-width: 1300px) {
      overflow: hidden;
      min-width: 32px;
      width: 32px;
    }

    @media screen and ${device.laptop} {
      display: block;
      margin-right: auto;
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
      margin-right: 32px;
      cursor: pointer;
    }
  }

  .nav-selector-wrapper {
    display: flex;
    align-items: center;
    margin-right: 32px;

    @media screen and ${device.mobile} {
      margin-right: 0;
    }
  }

  .phone-menu {
    margin-right: 10px;
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
      max-width: 110px;
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
      padding: 24px 5px;
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
        transform: translate3d(429px, 0, 0);
        transition: transform 0.2s cubic-bezier(0.16,0.68,0.43,0.99);
      }

      @media screen and (max-width: 592px) {
        transform: translate3d(calc(100vw - 64px), 0, 0);
      }

      @media screen and (max-width: 375px) {
        transform: translate3d(calc(100vw - 32px), 0, 0);
      }
    }

    .nav-item-logo {
      @media screen and ${device.laptop} {
        transform: translate3d(505px, 0, 0) translateX(-50%);
        transition: transform 0.2s cubic-bezier(0.16,0.68,0.43,0.99);
      }

      @media screen and (max-width: 592px) {
        transform: translate3d(380px, 0, 0) translateX(-50%);
      }

      @media screen and (max-width: 430px) {
        transform: translate3d(288px, 0, 0) translateX(-50%);
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