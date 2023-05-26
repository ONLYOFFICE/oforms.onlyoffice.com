import styled, { css } from "styled-components";
import { device } from "../../../utils/devices";

const StyledMailPopup = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: rgba(255, 255, 255, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  pointer-events: none;
  z-index: 1001;
  transition: all ease 0.5s;

  .popupPanelText {
    color: #333;
    background-color: transparent;
    height: 20px;
    font-size: 18px;
    font-weight: 600;
    text-align: left;
  }

  ${(props) =>
    props.active &&
    css`
      opacity: 1;
      pointer-events: all;
    `}

  .popup-content {
    width: 649px;
    height: 633px;
    background: url('https://static-oforms.onlyoffice.com/images/forms/pop-up-bg.png');
    background-position: 50% 18%;
    background-repeat: no-repeat;
    box-shadow: (0, 2px, 4px, rgba(0, 0, 0, 0.5));

    .PopupPanelCaption {
      padding: 110px 140px 0;
      display: block;
    }
    .dataForm {
      padding: 40px 140px 0;
    }

    .success {
      margin: 0 auto;
      text-align: left;
      width: 367px;

      .captchaDescription {
        color: #666666;
        font-size: 14px;
        font-weight: 400;
        line-height: 150%;
        margin: 21px 0;
      }
    }

    .progressPanel {
      text-align: center;

      .button {
        padding-left: 25px;
        padding-right: 25px;
      }
    }

    @media ${device.tablet} {
      width: 85vw;
      background-size: 85vw auto;

      .PopupPanelCaption {
        padding: 110px 130px 0;
        display: block;
      }
      .dataForm {
        padding: 0 130px 0;
      }
    }

    @media ${device.mobile} {
      width: 100vw;
      background-size: 120vw auto;
      background-position: 50% 10%;

      .PopupPanelCaption {
        padding: 110px 80px 0;
      }
      .dataForm {
        padding: 0 80px 0;
      }
    }
  }
`;

const CloseButton = styled.div`
  cursor: pointer;
  position: relative;
  display: block;
  float: right;
  width: 13px;
  height: 13px;
  cursor: pointer;
  margin: 6px 0 0;

  &:before,
  &:after {
    content: "";
    background-color: #333333;
    position: absolute;
    width: 100%;
    height: 1.5px;
    transform: rotate(45deg);
    border-radius: 1px;
    top: 0;
  }

  &:after {
    transform: rotate(-45deg);
  }
`;

const StyledMailForm = styled.div`
  max-width: none;
  padding: 0;
  margin-top: -30px;
  grid-gap: 10px;

  .errorNameText,
  .errorMailText {
    position: absolute;
    padding-top: 57px;
    font-size: 11px;
    line-height: 1.6em;
    z-index: 100;
    margin-top: -19px;
    margin-bottom: 8px;
    display: block;
    color: #cb0000;
    padding-bottom: 5px;
  }

  .errorMailText {
    padding-top: 125px;
  }
  .formItemsSend {
    row-gap: 20px;
    padding-top: 25px;
    display: flex;
    flex-direction: column;
  }
  .form-button-app {
    max-width: 120px;
    margin: 0 auto;
  }

  .form-header {
    letter-spacing: none;
    text-align: left;
    color: #333;
    background-color: transparent;
    font-size: 18px;
    font-weight: 600;
    text-align: left;
  }
  input.form-text,
  input.form-email {
    height: 36px;
    padding-top: 0;
  }
  .form-button {
    display: inline-block;
    width: auto;
    margin: 0 auto;
    font-size: 12px;
    padding: 0 26px;
  }

  .input-label {
    top: 0;
    line-height: 34px;
  }

  @media ${device.mobile} {
    grid-gap: 5px;
    margin-top: -10px;
    .form-header {
      line-height: 100%;
    }
    .captchaDescription {
      line-height: 100%;
      margin-top: 15px;
    }
  }
`;

export { StyledMailForm, CloseButton, StyledMailPopup };
