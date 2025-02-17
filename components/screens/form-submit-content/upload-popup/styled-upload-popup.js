import styled from "styled-components";
import { device } from "@utils/devices";
import pdfIcon from "@public/icons/pdf-24.svg";
import docxIcon from "@public/icons/docx-24.svg";
import xlsxIcon from "@public/icons/xlsx-24.svg";
import pptxIcon from "@public/icons/pptx-24.svg";

const StyledUploadPopup = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  padding: 16px;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  z-index: 1000;
  overflow-y: auto;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s, visibility 0.3s;

  &.open {
    opacity: 1;
    visibility: visible;
  }

  .popup-container {
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    min-height: 100%;
  }

  .popup-wrapper {
    padding: 40px;
    width: 100%;
    max-width: 600px;
    box-shadow: 0px 20px 50px rgba(85, 85, 85, 0.15);
    border-radius: 5px;
    background-color: #FFFFFF;

    @media ${device.mobile} {
      padding: 16px;
    }
  }

  .popup-top {
    display: flex;
    align-items: center;
    margin-bottom: 32px;

    @media ${device.mobile} {
      margin-bottom: 24px;
    }
  }

  .popup-title {
    flex: 1 1 auto;
    margin-right: 10px;
    letter-spacing: -0.02em;
  }

  .popup-btn-close {
    width: 24px;
    height: 24px;
    background-image: url("https://static-oforms.onlyoffice.com/icons/close-btn.svg");
    background-repeat: no-repeat;
    background-size: 15px;
    background-position: center;
    cursor: pointer;
  }

  .upload-name {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 32px;
    padding: 14px 22px;
    min-height: 64px;
    border-radius: 5px;
    background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%23CCCCCCFF' stroke-width='1' stroke-dasharray='6' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e");
    background-color: #F9F9F9;
  }

  .upload-name-file {
    padding-left: 40px;
    font-size: 14px;
    line-height: 32px;
    word-break: break-word;
    background-repeat: no-repeat;
    background-size: 32px;
    background-position: left center;

    span {
      font-weight: 700;
    }

    &.pdf {
      background-image: url(${pdfIcon.src});
    }

    &.docx {
      background-image: url(${docxIcon.src});
    }

    &.xlsx {
      background-image: url(${xlsxIcon.src});
    }

    &.pptx {
      background-image: url(${pptxIcon.src});
    }
  }

  .upload-descr {
    display: grid;
    gap: 24px;
    margin-bottom: 32px;

    @media ${device.mobile} {
      gap: 16px;
    }
  }

  .upload-descr-item {
    padding-left: 32px;
    background-image: url("https://static-oforms.onlyoffice.com/icons/check.svg");
    background-repeat: no-repeat;
    background-size: 24px;
    background-position: left top;
  }

  .upload-descr-title {
    font-weight: 700;
    font-size: 16px;
    line-height: 26px;
  }

  .upload-text {
    font-size: 16px;
    line-height: 24px;

    @media ${device.mobile} {
      font-size: 14px;
      line-height: 21px;
    }
  }

  .popup-btn {
    width: 100%;
  }
`;

export default StyledUploadPopup;
