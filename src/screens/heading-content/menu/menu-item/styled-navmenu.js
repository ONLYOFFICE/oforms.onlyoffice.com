import styled from "styled-components";
import { device } from "@components/utils/devices";

const StyledNavMenu = styled.li`
  list-style-type: none;
  padding: 0;

  .heading-nav-item {
    border: none;
    padding: 28px 20px;
    font-weight: 600;
    font-size: 12px;
    line-height: 16px;
    color: #444444;
    letter-spacing: 0.04em;
    width: 100%;
    text-transform: uppercase;
    background-color: transparent;
    cursor: pointer;
  }

  @media screen and (min-width: 1024px) {
    .heading-nav-item {
      &.active {
        color: #FF6F3D;

        + .menu-items-wrapper {
          .menu-wrapper {
            &:before {
              animation: 0.3s forwards ease-in-out menuLineLeft;
            }

            &:after {
              animation: 0.3s forwards ease-in-out menuLineRight;
            }
          }
        }
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
  }

  @media screen and (min-width: 1024px) {
    .menu-items-wrapper {
      left: 50%;
      transform: translateX(-50%);
    }
  }

  @media screen and (max-width: 1300px) {
    .heading-nav-item {
      padding: 28px 10px;
    }
  }

  @media screen and ${device.laptop} {
    .heading-nav-item {
      position: relative;
      padding: 16px 40px 16px 24px;
      font-size: 16px;
      line-height: 24px;
      font-weight: 700;
      text-align: left;

      &:before {
        display: block;
        content: "";
        width: 10px;
        height: 10px;
        background-image: url("https://static-oforms.onlyoffice.com/icons/arrow-gray.svg");
        background-position: 50% 50%;
        background-repeat: no-repeat;
        background-size: auto 100%;
        position: absolute;
        right: 24px;
        top: 50%;
        transform: translateY(-50%);
        transition: 0.1s linear;
      }

      &:hover {
        color: #444444;
        background-color: #F9F9F9;
      }
    }
  }
`;

const StyledMenuItemsWrapper = styled.div`
  width: auto;
  height: auto;
  margin: auto;
  background-color: #ffffff;
  border-radius: 0 0 9px 9px;
  z-index: 5000;
  position: absolute;
  display: flex;
  box-shadow: 0 20px 50px rgba(85, 85, 85, 0.15);
  overflow: hidden;

  @media screen and (max-width: 1024px) {
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
  }
`;

export { StyledNavMenu, StyledMenuItemsWrapper };