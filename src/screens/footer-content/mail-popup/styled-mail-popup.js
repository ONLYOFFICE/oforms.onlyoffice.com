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
  }

  .mail-popup-body {
    max-width: 370px;
  }

  .mail-popup-inputs {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;

    .group-input {
      margin-bottom: 26px;
      height: 36px;
    }

    .error-text {
      padding-top: 36px;
    }
  }

  .mail-popup-header {
    display: flex;
    align-items: center;
    margin-bottom: 17px;
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
  }

  .mail-popup-success-text {
    margin: 21px 0;
    font-size: 14px;
    font-weight: 400;
    line-height: 21px;
    color: #666;
  }

  .mail-popup-success {
    button {
      padding: 22px 26px;
    }
  }

  .mail-popup-input {
    height: 36px;
    padding: 0 16px;
  }

  .mail-popup-btn {
    font-size: 13px;
    padding: 0 25px;
    font-weight: 600;
    line-height: 12px;
    letter-spacing: 0.04em;
    transition: background-color 0.3s;
  }

  @media screen and (max-width: 592px) {
    .mail-popup-btn,
    .mail-popup-success {
      button {
        font-size: 12px;
        line-height: 16px;
        padding: 16px 26px;
      }
    }

    .mail-popup-input {
      padding: 0 12px;
      font-size: 14px;

      &:placeholder {
        font-size: 14px;
      }
    }
  }

  @media screen and (max-width: 399px) {
    .mail-popup-wrapper {
      padding: 103px 0 88px;
      max-width: 390px;
      background-size: 500px 566px;
    }

    .mail-popup-body {
      max-width: 274px;
    }

    .mail-popup-header {
      margin-bottom: 10px;
    }

    .mail-popup-text {
      font-size: 13px;
    }

    .mail-popup-inputs {
      .group-input {
        margin-bottom: 22px;
      }
    }

    .error-text {
      padding-top: 37px;
    }
  }
`;

export default StyledMailPopup;
