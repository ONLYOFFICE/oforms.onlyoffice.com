import styled, { css } from "styled-components";

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
    box-sizing: border-box;
    border: 1px solid #CBCBCB;
    border-radius: 5px;
    width: 100%;
    max-width: 889px;
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
    font-weight: 400;
    font-size: 18px;
    line-height: 20px;
    letter-spacing: 0.02em;
  }

  .popup-body {
    padding: 30px 46px 30px 31px;
    display: flex;
  }

  .file-img {
    box-sizing: border-box;
    flex: 0 0 400px;
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
    font-size: 14px;
    line-height: 22px;
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
    font-size: 18px;
    line-height: 24px;
    letter-spacing: -0.02em;
  }

  .file-info-type {
    margin-bottom: 12px;
    color: #444444;
  }

  .file-description {
    font-size: 14px;
    line-height: 22px;
    color: #333333;
    outline: none;
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
    line-height: 22px;

    &:not(:last-child) {
      margin-right: 24px;
    }
  }

  .file-info-label {
    margin-right: 8px;
    color: #AAAAAA;
  }

  .file-info-value {
    font-weight: 700;
  }

  .file-button {
    display: inline-block;
    box-sizing: border-box;
    text-align: center;
    border-radius: 3px;
    padding: 6.5px 12px;
    font-family: "Open Sans", sans-serif;
    font-weight: 600;
    font-size: 14px;
    line-height: 22px;
    height: 36px;
    min-width: 157px;
    color: #FFFFFF;
    background-color: #444444;
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
    line-height: 19px;
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
    border-radius: 2px;
    padding-top: 4px;
    min-width: 106px;
    background-color: #ffffff;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
    opacity: 0;
    visibility: hidden;
    tarnsition: opacity 0.3s, visibility 0.3s;
  }

  .file-dropdown-item {
    display: block;
    padding: 3px 11px 2px;
    color: #000000;
    transition: color 0.3s, background-color 0.3s;

    &:hover {
      background: #E0E0E0;
    }

    &.selected {
      background-color: #CCCCCC;
    }
  }
`;

const CloseButton = styled.div`
  margin-top: 1px;
  width: 19px;
  height: 19px;
  cursor: pointer;
  background-image: url('https://static-oforms.teamlab.info/icons/close-icon.svg');
  background-repeat: no-repeat;
  background-position: center center;
`;

export { CloseButton, StyledFilePopup };
