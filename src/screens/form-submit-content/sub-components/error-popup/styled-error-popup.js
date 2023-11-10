import styled from "styled-components";
import { device } from "@components/utils/devices";
import crossRedIcon from "@public/icons/cross-red.svg";

const StyledErrorPopup = styled.div`
  position: absolute;
  top: 208px;
  left: 50%;
  padding: 40px;
  width: 100%;
  max-width: 454px;
  border: 1px solid #CB0000;
  border-radius: 5px;
  box-shadow: 0px 20px 50px 0px rgba(85, 85, 85, 0.15);
  background-color: #ffffff;
  transform: translateX(-50%);

  @media ${device.tablet} {
    max-width: 314px;
  }

  @media ${device.mobile} {
    top: 75px;
    padding: 16px;
    max-width: 100%;
  }

  .popup-top {
    display: flex;
    align-items: start;
    margin-bottom: 32px;

    @media ${device.mobile} {
      margin-bottom: 24px;
    }
  }

  .popup-title {
    margin-right: 10px;
    flex: 1 1 auto;
    letter-spacing: -0.36px;
    color: #CB0000;
  }

  .popup-close-btn {
    min-width: 24px;
    height: 24px;
    background-image: url(${crossRedIcon.src});
    background-repeat: no-repeat;
    background-size: contain;
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
    background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%23EA9494FF' stroke-width='1' stroke-dasharray='6' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e");
  
    @media ${device.mobile} {
      margin-bottom: 24px;
    }
  }

  .upload-name-file {
    padding-left: 40px;
    font-size: 14px;
    line-height: 32px;
    word-break: break-word;
    background-image: url("https://static-oforms.onlyoffice.com/icons/oform.svg");
    background-repeat: no-repeat;
    background-size: 32px;
    background-position: left center;

    span {
      font-weight: 700;
    }
  }

  .popup-text {
    font-size: 16px;
    line-height: 24px;

    @media ${device.mobile} {
      font-size: 14px;
      line-height: 21px;
    }
  }
`;

export default StyledErrorPopup;
