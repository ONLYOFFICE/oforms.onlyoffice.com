import styled from "styled-components";
import { device } from "@utils/devices";

const StyledInput = styled.div`
  &:not(:last-child) {
    margin-bottom: 24px;
  }

  .label {
    display: block;
    margin-bottom: 8px;
    line-height: 24px;

    @media ${device.mobile} {
      font-size: 13px;
    }
  }

  .input-wrapper {
    position: relative;
  }

  input,
  textarea {
    box-sizing: border-box;
    border: 1px solid #AAAAAA;
    border-radius: 3px;
    font-family: "Open Sans", sans-serif;
    font-size: 14px;
    line-height: 21px;
    width: 100%;
    outline: none;
    background-color: #F9F9F9;

    &::placeholder {
      font-size: 14px;
      line-height: 21px;
      color: #AAAAAA;

      @media ${device.mobile} {
        font-size: 13px;
        line-height: 20px;
      }
    }

    &:focus {
      background-color: #FFFFFF;
    }

    &.valid {
      border-color: #8BB825;
      background-color: #F9FEEF;
    }

    &.error {
      border-color: #CB0000;
      color: #EA9494;
      background-color: #FFF7F7;

      &::placeholder {
        color: #EA9494;
      }
    }

    @media ${device.mobile} {
      font-size: 13px;
      line-height: 20px;
    }
  }

  input {
    padding: 15px;
    height: 56px;

    @media ${device.mobile} {
      padding: 12px;
      height: 48px;
    }
  }

  textarea {
    padding: 13px 15px;
    height: 70px;
    resize: none;

    @media ${device.mobile} {
      padding: 12px 14px;
      height: 88px;
    }
  }

  .error-text {
    margin-top: 8px;
    font-size: 13px;
    line-height: 20px;
    color: #CB0000;
  }
`;

export default StyledInput;
