import styled from "styled-components";
import { device } from "@components/utils/devices";
import fileIcon from "@public/icons/file.svg";
import uploadIcon from "@public/icons/upload.svg";
import changeIcon from "@public/icons/change.svg";
import deleteIcon from "@public/icons/delete.svg";
import crossRedIcon from "@public/icons/cross-red.svg";
import crossRedBgIcon from "@public/icons/cross-red-bg.svg";

const StyledUploadFile = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;

  label {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  input[type="file"] {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
  }

  .upload-file {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 768px;
    padding: 16px;
    border-radius: 3px;
    background-color: #F9F9F9;
    background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%23AAAAAAFF' stroke-width='1' stroke-dasharray='6' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e");
    cursor: pointer;

    &:hover,
    &.drag {
      background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%23666666FF' stroke-width='1' stroke-dasharray='6' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e");
    }

    &.load {
      pointer-events: none;
    }

    &.filled {
      pointer-events: none;
      height: 736px;

      @media ${device.laptopM} {
        height: 624px;
      }
  
      @media ${device.laptop} {
        height: 100%;
      }
    }

    @media ${device.laptopM} {
      height: 692px;
    }

    @media ${device.laptop} {
      height: 360px;
    }
  
    @media ${device.mobile} {
      height: 300px;
    }
  }

  .upload-img {
    position: relative;
    height: 100%;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  .upload-img-loading {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 24px;
    height: 24px;
    transform: translate(-50%, -50%);

    &:after {
      content: "";
      position: absolute;
      left: 50%;
      top: 50%;
      width: 24px;
      height: 24px;
      margin: 0 auto;
      border: 2px solid #333333;
      border-radius: 75%;
      border-right-color: transparent;
      transform: translate(-50%, -50%);
      animation: cssload-spin 1025ms infinite linear;
    }
    
    @keyframes cssload-spin {
      100%{ transform: translate(-50%, -50%) rotate(360deg); }
    }
  }

  .upload-title {
    line-height: 32px;

    span {
      position: relative;
      display: flex;
      align-items: center;
      padding-left: 38px;
      margin-bottom: 16px;
      letter-spacing: -0.02em;
      cursor: pointer;

      &:before {
        content: "";
        position: absolute;
        left: 0;
        display: inline-flex;
        width: 32px;
        height: 32px;
        background-image: url(${fileIcon.src});
        background-size: contain;
        background-position: center;
        background-repeat: no-repeat;
      }
    }

    @media ${device.mobile} {
      font-size: 16px;
    }
  }

  .upload-icon {
    margin-bottom: 16px;
    display: inline-flex;
    width: 72px;
    height: 72px;
    background-image: url(${uploadIcon.src});
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
  }

  .upload-subtitle {
    margin-bottom: 16px;
    font-size: 16px;
    line-height: 26px;
    cursor: pointer;

    @media ${device.mobile} {
      font-size: 14px;
      line-height: 22px;
    }
  }

  .upload-size {
    line-height: 22px;
    color: #666666;
    cursor: pointer;

    @media ${device.mobile} {
      font-size: 12px;
      line-height: 19px;
    }
  }

  .upload-btns {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 16px auto 0;
  }

  .upload-change-btn,
  .upload-delete-btn {
    position: relative;
    display: flex;
    border: 1px solid #F9F9F9;
    border-radius: 50%;
    width: 56px;
    height: 56px;
    background-size: 24px;
    background-position: center;
    background-repeat: no-repeat;
    background-color: #F9F9F9;
    cursor: pointer;

    &:after {
      content: attr(data-title);
      position: absolute;
      border-radius: 5px;
      padding: 6px;
      font-size: 12px;
      line-height: 16px;
      color: #FFFFFF;
      background-color: rgba(0, 0, 0, 0.6);
      opacity: 0;
      pointer-events: none;
    }

    &:hover {
      border-color: #666666;

      &:after {
        opacity: 1;
        transition-delay: 0.75s;
      }
    }
  }

  .upload-change-btn {
    margin-right: 10px;
    background-image: url(${changeIcon.src});

    &:after {
      top: calc(100% - 8px);
      right: calc(100% - 3px);
    }
  }

  .upload-delete-btn {
    background-image: url(${deleteIcon.src});

    &:after {
      top: calc(100% - 8px);
      left: calc(100% - 3px);
    }
  }

  .error-text {
    margin-top: 8px;
    font-size: 13px;
    line-height: 20px;
    color: #CB0000;
    text-align: center;
  }

  .error-popup {
    position: absolute;
    right: -141px;
    bottom: 108px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid #CB0000;
    border-radius: 6px;
    padding: 32px 16px;
    font-size: 16px;
    width: 100%;
    max-width: 312px;
    box-shadow: 0px 20px 50px rgba(85, 85, 85, 0.15);
    background-color: #FFF7F7;
    z-index: 100;

    @media ${device.laptop} {
      left: 50%;
      right: initial;
      bottom: -81px;
      transform: translateX(-50%);
    }

    @media ${device.mobile} {
      bottom: initial;
      top: 75px;
    }
  }

  .error-popup-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 230px;
  }

  .error-popup-close-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 24px;
    height: 24px;
    background-image: url(${crossRedIcon.src});
    cursor: pointer;
  }

  .error-popup-title {
    position: relative;
    padding-left: 32px;
    margin-bottom: 8px;
    font-weight: 700;
    line-height: 26px;
    text-align: center;

    &:before {
      content: "";
      position: absolute;
      top: 50%;
      left: 0;
      width: 25px;
      height: 25px;
      background-image: url(${crossRedBgIcon.src});
      background-size: 25px;
      background-position: left center;
      background-repeat: no-repeat;
      background-size: contain;
      transform: translateY(-50%);

      @media ${device.mobile} {
        width: 20px;
        height: 20px;
      }
    }

    @media ${device.mobile} {
      padding-left: 28px;
      line-height: 22px;
    }
  }

  .error-popup-text {
    line-height: 24px;
    text-align: center;

    @media ${device.mobile} {
      line-height: 21px;
    }
  }
`;

export default StyledUploadFile;
