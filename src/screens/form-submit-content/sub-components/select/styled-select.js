import styled from "styled-components";
import { device } from "@components/utils/devices";
import arrowDownIcon from "@public/icons/arrow-gray-down.svg";
import crossIcon from "@public/icons/close-btn.svg";
import checkGrayIcon from "@public/icons/check-gray.svg";

const StyledSelect = styled.div`
  &:not(:last-child) {
    margin-bottom: 24px;
  }

  &.error {
    .placeholder {
      color: #EA9494;
    }

    .select {
      border-color: #CB0000;
      background-color: #FFF7F7;
    }
  }

  .label {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin-bottom: 8px;
    line-height: 24px;

    @media ${device.mobile} {
      font-size: 13px;
    }
  }

  .label-more {
    color: #808080;

    @media ${device.mobile} {
      font-size: 13px;
    }
  }

  .placeholder {
    font-size: 14px;
    line-height: 24px;
    color: #AAAAAA;
    white-space: initial;
    pointer-events: none;

    @media ${device.mobile} {
      font-size: 13px;
    }
  }

  .select-wrapper {
    position: relative;
    max-width: 544px;
  }

  .select-input {
    padding: 0;
    margin: 0;
    width: 100%;
    grid-area: 1 / 2 / auto / auto;
    font-size: 16px;
    line-height: 26px;
    max-width: 2px;
    background-color: transparent;
    outline: none;
    border: none;

    &.active {
      max-width: 100%;
    }

    @media ${device.mobile} {
      font-size: 13px;
    }
  }

  .select-value {
    margin-right: 6px;
    font-size: 16px;
    line-height: 24px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    @media ${device.mobile} {
      font-size: 13px;
    }
  }

  .select {
    position: relative;
    display: flex;
    align-items: center;
    padding: 15px 50px 15px 15px;
    width: 100%;
    border: 1px solid #AAAAAA;
    border-radius: 3px;
    height: 56px;
    background-color: #F9F9F9;
    cursor: pointer;

    &.open {
      border-color: #444444;
      background-color: #FFFFFF;

      &:after {
        transform: translateY(-50%) rotate(180deg);
      }
    }

    &.valid {
      border-color: #8BB825;
      background-color: #F9FEEF;
    }

    &.category-select {
      padding: 15px 96px 15px 15px;
    }

    &:after {
      content: "";
      position: absolute;
      top: 50%;
      right: 24px;
      width: 24px;
      height: 24px;
      background-image: url(${arrowDownIcon.src});
      background-repeat: no-repeat;
      transform: translateY(-50%);
    }

    @media ${device.mobile} {
      padding: 11px 47px 11px 11px;
      height: 48px;
    }
  }

  .select-length {
    position: absolute;
    right: 60px;
    font-size: 16px;
    line-height: 26px;
    cursor: pointer;

    @media ${device.mobile} {
      font-size: 13px;
      line-height: 26px;
      bottom: 12px;
    }
  }

  .select-options {
    position: absolute;
    top: calc(100% + 8px);
    left: 0;
    width: 100%;
    max-height: 339px;
    padding: 8px 0;
    border: 1px solid #666666;
    border-radius: 3px;
    background-color: #FFFFFF;
    overflow-y: auto;
    z-index: 50;
  }

  .select-option {
    padding: 8px 16px 8px 48px;
    font-size: 16px;
    line-height: 26px;

    &.reset {
      background-image: url(${crossIcon.src});
      background-repeat: no-repeat;
      background-position: 20px center;
    }

    &.selected {
      color: #FF6F3D;
      background-color: transparent;
      background-image: url(${checkGrayIcon.src});
      background-repeat: no-repeat;
      background-position: 16px center;
    }

    &.hidden {
      display: none;
    }

    &.no-options {
      text-align: center;
      padding: 8px 16px;
    }

    &:not(.no-options) {
      cursor: pointer;

      &:hover {
        background-color: #F5F5F5;
      }
    }

    @media ${device.mobile} {
      font-size: 13px;
    }
  }

  .error-text {
    margin-top: 8px;
    font-size: 13px;
    line-height: 20px;
    color: #CB0000;
  }
`;

export default StyledSelect;