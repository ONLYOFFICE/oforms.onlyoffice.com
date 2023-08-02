import styled from "styled-components";
import { device } from "@components/utils/devices";
import crossRedIcon from "@public/icons/cross-red.svg";
import crossRedBgIcon from "@public/icons/cross-red-bg.svg";

const StyledErrorPopup = styled.div`
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

export default StyledErrorPopup;
