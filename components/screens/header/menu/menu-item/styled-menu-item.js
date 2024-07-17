import styled, { keyframes } from "styled-components";
import { device } from "@utils/devices";

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

const StyledMenuItem = styled.li`
  list-style-type: none;
  padding: 0;

  .heading-nav-item {
    border: none;
    padding: 14px 24px;
    font-weight: 600;
    font-size: 12px;
    line-height: 16px;
    color: #444444;
    letter-spacing: 0.04em;
    width: 100%;
    height: 72px;
    text-transform: uppercase;
    background-color: transparent;
    cursor: pointer;

    &.active {
      color: #FF6F3D;

      + .menu-items-wrapper {
        .menu-wrapper {
          &:before {
            animation: ${menuLineLeft} 0.3s forwards ease-in-out;
          }

          &:after {
            animation: ${menuLineRight} 0.3s forwards ease-in-out;
          }
        }
      }
    }

    &:before {
      @media screen and ${device.laptop} {
        display: block;
        content: "";
        width: 24px;
        height: 24px;
        background-image: url("https://static-oforms.onlyoffice.com/icons/arrow-gray.svg");
        background-position: 50% 50%;
        background-repeat: no-repeat;
        position: absolute;
        right: 16px;
        top: 50%;
        transform: translateY(-50%);
      }
    }

    &:hover {
      @media screen and ${device.laptop} {
        background-color: #f9f9f9;
      }
    }

    @media screen and (max-width: 1460px) {
      padding: 14px 18px;
    }

    @media screen and (max-width: 1380px) {
      padding: 14px 10px;
    }

    @media screen and ${device.laptop} {
      position: relative;
      padding: 16px 40px 16px 24px;
      font-size: 18px;
      line-height: 24px;
      font-weight: 700;
      height: 56px;
      text-align: left;
    }
  }

  .menu-items-wrapper {
    background-color: #ffffff;
    border-radius: 0 0 9px 9px;
    z-index: 10;
    position: absolute;
    display: flex;
    box-shadow: 0 20px 50px rgba(85, 85, 85, 0.15);
    overflow: hidden;
    top: 99%;
    left: 50%;
    transform: translateX(-50%);

    @media screen and ${device.laptop} {
      padding: 0;
      max-height: 100%;
      margin: 0;
      position: absolute;
      left: ${(props) => (props.isOpen ? "0" : "-120vw")};
      top: 0;
      overflow: auto;
      text-align: center;
      font-size: 16px;
      transition: right 0.5s;
      width: 100%;
      z-index: 5;
      display: block;
      box-sizing: border-box;
      box-shadow: unset;
      overflow-x: hidden;
      transform: initial;
    }
  }
`;

export default StyledMenuItem;