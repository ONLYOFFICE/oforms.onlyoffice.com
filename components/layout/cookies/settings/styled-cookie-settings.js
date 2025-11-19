import styled from "styled-components";
import { device } from "@utils/devices";

const StyledCookieSettingsHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledCross = styled.div`
  cursor: pointer;
  content: "";
  width: 24px;
  height: 24px;
  background-image: url("/icons/close-btn.svg");
  background-position: center;
  background-repeat: no-repeat;
`;

const StyledCookieSettings = styled.div`
  background-color: #ffffff;
  border: 1px solid #cccccc;
  border-radius: 5px;
  box-shadow: 0px 7px 15px 0px #5555551a;
  display: inline-block;
  padding: 32px;
  max-width: 468px;
  left: 0;
  margin: 0 auto;
  right: 0;
  top: calc(50% - 260px);
  position: fixed;
  width: 100%;
  text-align: center;
  z-index: 10002;

  @media ${device.mobile} {
    max-width: calc(100% - 64px);
    padding: 16px;

    > button {
      height: 48px;
      padding: 16px 24px;
      width: 100%;
    }
  }
`;

const StyledCheckboxes = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding: 32px 0;

  @media ${device.mobile} {
    gap: 16px;
    padding: 16px 0;
  }
`;

const StyledCheckText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 8px;
  text-align: left;
  > h4 {
    font-size: 16px;
    color: #333333;
  }
`;

export {
  StyledCookieSettingsHeader,
  StyledCookieSettings,
  StyledCross,
  StyledCheckboxes,
  StyledCheckText,
};