import styled, { css } from "styled-components";
import closeBtnIcon from "@public/icons/close-icon.react.svg";

const StyledFilePopup = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.5);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  overflow-y: auto;
  z-index: 10;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s, visibility 0.3s;

  &.open {
    opacity: 1;
    visibility: visible;
  }

  .popup-wrapper {
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 32px;
    min-height: 100%;
  }

  .popup-content {
    border: 1px solid #CBCBCB;
    border-radius: 5px;
    width: 100%;
    max-width: 809px;
    overflow: hidden;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
    background-color: #ffffff;
  }

  .popup-header {
    display: grid;
    grid-template-columns: auto 19px;
    gap: 24px;
    padding: 10px 10px 9px 30px;
    background-color: #F7F7F7;
  }

  .popup-title {
    font-family: "Open Sans", sans-serif;;
    font-weight: 400;
    font-size: 18px;
    line-height: 20px;
    letter-spacing: 0.02em;
  }

  .popup-body {
    padding: 30px 28px 38px 31px;
    display: flex;
  }

  .file-img {
    margin-right: 32px;
    mix-blend-mode: normal;
    border: 1px solid #E2E2E2;
    border-radius: 3px;

    img {
      object-fit: cover;
    }
  }

  .file-content {
    width: 100%;
    font-size: 11px;
    line-height: 16px;
    letter-spacing: 0.02em;
    color: #333333;
  }

  .file-main-description {
    margin-bottom: 24px;
    padding-bottom: 23px;
    border-bottom: 1px solid #E5E5E5;
  }

  .file-title {
    margin-bottom: 8px;
    font-weight: 700;
    font-size: 14px;
    line-height: 20px;
  }

  .file-info-type {
    margin-bottom: 12px;
    color: #444444;
  }

  .file-description {
    font-size: 11px;
    line-height: 16px;
    letter-spacing: 0.02em;
    color: #333333;
  }

  .file-info {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 24px;
  }

  .file-info-block {
    display: flex;
    align-items: center;
    flex: 1 1 auto;
    margin-right: 8px;
  }

  .file-info-item {
    display: flex;
    align-items: center;
    line-height: 14px;

    &:not(:last-child) {
      margin-right: 24px;
    }
  }

  .file-info-label {
    margin-right: 8px;
    color: #AAAAAA;
  }

  .file-button {
    display: inline-block;
    box-sizing: border-box;
    text-align: center;
    border-radius: 3px;
    padding: 6.5px 12px;
    font-family: "Open Sans";
    font-weight: 600;
    font-size: 14px;
    line-height: 22px;
    height: 36px;
    min-width: 157px;
    color: #FFFFFF;
    background-color: #4883D4;
    text-decoration: none;
    text-transform: initial;
  }

  .file-select {
    position: relative;
    cursor: pointer;
  }

  .file-select-placeholder {
    display: flex;
    align-items: center;

    &.open {
      .file-select-icon {
        transform: rotate(180deg);
      }
      ~ .file-dropdown {
        opacity: 1;
        visibility: visible;
      }
    }
  }

  .file-select-title {
    margin-right: 4px;
    min-width: 33px;
    font-weight: 700;
    font-size: 11px;
    line-height: 16px;
    letter-spacing: 0.02em;
  }

  .file-select-icon {
    display: flex;
    width: 16px;
    height: 16px;
    transition: transform 0.3s;

    svg {
      width: 16px;
      height: 16px;
    }
  }

  .file-dropdown {
    position: absolute;
    top: 100%;
    right: 0;
    border-radius: 3px;
    padding-top: 14px;
    background-color: #ffffff;
    box-shadow: rgb(85 85 85 / 15%) 0px 7px 25px;
    opacity: 0;
    visibility: hidden;
    tarnsition: opacity 0.3s, visibility 0.3s;
  }

  .file-dropdown-item {
    display: block;
    padding: 12px;
    font-size: 11px;
    line-height: 16px;
    transition: color 0.3s, background-color 0.3s;

    &.selected,
    &:hover {
      color: #ff6f3d;
      background-color: #f5f5f5;
    }
  }
`;

const CloseButton = styled.div`
  margin-top: 1px;
  width: 19px;
  height: 19px;
  cursor: pointer;
  background-image: url(${closeBtnIcon.src});
  background-repeat: no-repeat;
  background-position: center center;
`;

export { CloseButton, StyledFilePopup };