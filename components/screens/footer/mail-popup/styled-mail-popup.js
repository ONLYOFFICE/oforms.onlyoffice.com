import styled from "styled-components";

const StyledMailPopup = styled.div`
  box-sizing: border-box;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(255 255 255 / 50%);
  z-index: 1000;
  overflow-y: auto;
  opacity: 0;
  visibility: hidden;
  
  &.show {
    opacity: 1;
    visibility: initial;
    transition: opacity 0.3s, visibility 0.3s;
  }

  .mail-popup-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1 1 auto;
    min-height: 100%;
  }

  .mail-popup-wrapper {
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    padding: 110px 0;
    width: 100%;
    max-width: 649px;
    height: 633px;
    background-image: url("https://static-oforms.onlyoffice.com/images/forms/pop-up-bg.png");
    background-repeat: no-repeat;
    background-position: 50% 0;

    @media screen and (max-width: 399px) {
      padding: 103px 0 88px;
      max-width: 390px;
      background-size: 500px 566px;
    }
  }

  .mail-popup-body {
    max-width: 370px;

    @media screen and (max-width: 399px) {
      max-width: 274px;
    }
  }

  .mail-popup-inputs {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  .mail-popup-input {
    border-color: #aaaaaa;
    margin-bottom: 26px;
    padding: 0 16px;
    height: 36px;
    color: #000000;
    background-color: #ffffff;

    &::placeholder {
      color: #808080;

      @media screen and (max-width: 592px) {
        font-size: 14px;
      }
    }

    &.error {
      border-color: #cb0000;
      background-color: #fff7f7;
    }

    &:focus,
    &.focus {
      padding: 0 16px;
    }

    &:hover:not(:focus) {
      border-color: #666666;
    }

    @media screen and (max-width: 768px) {
      width: 100%;
      font-size: 16px;
    }

    @media screen and (max-width: 592px) {
      padding: 0 12px;
      font-size: 14px;
    }

    @media screen and (max-width: 425px) {
      font-size: 14px;
    }

    @media screen and (max-width: 399px) {
      margin-bottom: 22px;
    }
  }

  .error-text {
    position: absolute;
    top: 36px;

    @media screen and (max-width: 592px) {
      line-height: 16px;
    }

    @media screen and (max-width: 399px) {
      top: 37px;
    }
  }

  .mail-popup-header {
    display: flex;
    align-items: center;
    margin-bottom: 17px;

    @media screen and (max-width: 399px) {
      margin-bottom: 10px;
    }
  }

  .mail-popup-title {
    flex: 1 1 auto;
    margin-right: 8px;
    font-size: 18px;
    line-height: 20px;
    font-weight: 600;
    color: #333;
  }

  .mail-popup-close-btn {
    display: flex;
    border: none;
    padding: 0;
    height: 20px;
    width: 20px;
    background: url("https://static-oforms.onlyoffice.com/icons/buttons.png") -18px -78px no-repeat transparent;
    cursor: pointer;
  }

  .mail-popup-text {
    display: flex;
    margin-bottom: 12px;
    font-size: 14px;
    line-height: 18px;
    color: #333;

    @media screen and (max-width: 399px) {
      font-size: 13px;
    }
  }

  .mail-popup-success-text {
    margin: 21px 0;
    font-size: 14px;
    font-weight: 400;
    line-height: 21px;
    color: #666;
  }

  .mail-popup-btn {
    padding: 0 25px;
    line-height: 12px;

    @media screen and (max-width: 592px) {
      height: 48px;
    }
  }

  .mail-popup-btn,
  .mail-popup-success {
    button {
      @media screen and (max-width: 592px) {
        font-size: 12px;
        line-height: 16px;
        padding: 16px 26px;
      }
    }
  }
`;

export default StyledMailPopup;