import styled from "styled-components";
import { device } from "@components/utils/devices";

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
    .heading-nav-item {
      color: #FFFFFF;
    }

    .phone-btn,
    .arrow-image {
      svg {
        path {
          fill: #FFFFFF;
        }
      } 
    }
  }

  .nav-item-logo {
    display: flex;
    width: 154px;
    height: 28px;
  }

  .nav-btn-mobile {
    display: none;
    border: none;
    width: 20px;
    height: 14px;
    background-color: transparent;
  }

  .nav-selector-wrapper {
    display: flex;
    align-items: center;
  }

  .phone-menu {
    margin-right: 10px;
  }

  @media screen and (max-width: 1300px) {
    .nav-item-logo {
      overflow: hidden;
      min-width: 32px;
      width: 32px;
    }

    .phone-btn {
      padding: 24px 5px;
    }

    .phone-menu {
      margin-right: 5px;
    }
  }

  @media screen and ${device.laptop} {
    grid-template-columns: auto 152px auto;
    justify-content: space-between;
    height: 48px;
  
    &.is-open {
      .advent-announce,
      .nav-btn-mobile,
      .nav-selector-wrapper {
        transform: translate3d(429px, 0, 0);
        transition: transform 0.2s cubic-bezier(0.16,0.68,0.43,0.99);
      }
  
      .nav-item-logo {
        transform: translate3d(429px, 0, 0) translateX(-50%);
        transition: transform 0.2s cubic-bezier(0.16,0.68,0.43,0.99);
      }
  
      .search_icon {
        transform: translate3d(429px, 0, 0) translateY(-50%);
      }
  
      .overlay {
        opacity: 1;
        visibility: visible;
      }
  
      .nav-item-links {
        transform: translate3d(0, 0, 0);
      }
    }

    &.main {
      .heading-nav-item {
        color: #333333;
      }

      .nav-btn-mobile {
        svg {
          rect {
            fill: #ffffff;
          }
        }
      }
    }

    .phone-menu {
      display: none;
    }
  
    .nav-btn-mobile {
      box-sizing: border-box;
      display: flex;
      padding: 0;
      cursor: pointer;

      div {
        display: flex;

        svg {
          rect {
            fill: #444444;
          }
        }
      }
    }
  
    .overlay {
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
  
    .nav-item-logo {
      position: absolute;
      left: 50%;
      display: block;
      grid-column-start: 2;
      grid-column-end: 3;
      grid-row-start: 1;
      grid-row-end: 1;
      text-align: center;
      margin: 0 auto;
      width: 152px;
      height: 28px;
      transform: translateX(-50%);
    }
  }

  @media screen and (max-width: 592px) {
    padding: 0 18px 0 15px;

    &.is-open {
      .advent-announce,
      .nav-btn-mobile,
      .nav-selector-wrapper {
        transform: translate3d(380px, 0, 0);
      }
  
      .nav-item-logo {
        transform: translate3d(380px, 0, 0) translateX(-50%);
      }
  
      .search_icon {
        transform: translate3d(380px, 0, 0) translateY(-50%);
      }
  
      .overlay {
        opacity: 1;
        visibility: visible;
      }
  
      .nav-item-links {
        transform: translate3d(0, 0, 0);
      }
    }

    .nav-item-logo {
      width: 30px;
      height: 28px;
      overflow: hidden;
    }
  }

  @media screen and (max-width: 430px) {
    &.is-open {
      .advent-announce,
      .nav-btn-mobile,
      .nav-selector-wrapper {
        transform: translate3d(288px, 0, 0);
      }
  
      .nav-item-logo {
        transform: translate3d(288px, 0, 0) translateX(-50%);
      }
  
      .search_icon {
        transform: translate3d(288px, 0, 0) translateY(-50%);
      }
  
      .overlay {
        opacity: 1;
        visibility: visible;
      }
  
      .nav-item-links {
        transform: translate3d(0, 0, 0);
      }
    }
  }
`;

export default StyledHeading;
