import styled from "styled-components";
import notInstalled from "@public/icons/not-installed.svg";

const StyledDesktopPopup = styled.div`
  box-sizing: border-box;
  position: fixed;
  top: 0;
  left: 0;
  padding: 16px;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.30);
  z-index: 1000;
  overflow-y: auto;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s, visibility 0.3s;

  &.show {
    opacity: 1;
    visibility: initial;
  }

  .popup-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1 1 auto;
    min-height: 100%;
  }

  .popup-wrapper {
    box-sizing: border-box;
    position: relative;
    padding: 48px 40px;
    width: 100%;
    max-width: 600px;
    background-color: #FFFFFF;
    border-radius: 5px;
    box-shadow: 0px 20px 50px 0px rgba(85, 85, 85, 0.15);

    @media screen and (max-width: 592px) {
      padding: 24px 16px;
    }
  }

  .popup-close-btn {
    box-sizing: border-box;
    position: absolute;
    top: 16px;
    right: 16px;
    border: none;
    padding: 0;
    width: 24px;
    height: 24px;
    background-color: transparent;
    cursor: pointer;

    div {
      display: flex;
    }

    svg {
      path {
        fill: #444444;
      }
    }

    @media screen and (max-width: 592px) {
      top: 12px;
      right: 12px;
    }
  }

  .popup-body {
    display: flex;
    flex-direction: column;
    align-items: center;

    @media screen and (max-width: 592px) {
      align-items: initial;
    }
  }

  .popup-heading {
    position: relative;
    display: flex;
    justify-content: center;
    margin-bottom: 24px;
    padding-top: 86px;
    letter-spacing: -0.36px;
    text-align: center;

    &:before {
      content: "";
      position: absolute;
      top: 0;
      left: 50%;
      width: 64px;
      height: 62px;
      background-image: url(${notInstalled.src});
      background-repeat: no-repeat;
      transform: translateX(-50%);
    }
  }

  .popup-text {
    display: initial;
    margin-bottom: 24px;
    font-size: 16px;
    line-height: 24px;
    text-align: center;

    a {
      color: #ff6f3d;
    }
  }

  .popup-btn {
    padding: 19px 24px;
    border-radius: 3px;
    font-size: 13px;
    font-weight: 600;
    line-height: 18px;
    letter-spacing: 0.52px;
    color: #FFF;
    text-align: center;
    text-transform: uppercase;
    text-decoration: none;
    background-color: #FF6F3D;
    transition: background-color 0.3s;

    &:hover {
      background-color: #ff865c;
    }

    @media screen and (max-width: 592px) {
      padding: 15px 24px;
    }
  }
`;

export default StyledDesktopPopup;