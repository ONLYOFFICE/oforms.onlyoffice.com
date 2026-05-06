import styled from "styled-components";
import { device } from "@utils/devices";

const StyledToolbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding-bottom: 56px;
  min-width: 0;

  .toolbar-left {
    display: flex;
    align-items: center;
    gap: 24px;
    min-width: 0;
    flex-shrink: 1;
  }

  .sort {
    position: relative;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .sort-label {
    font-family: "Sora", sans-serif;
    font-size: 13px;
    line-height: 1.33em;
    font-weight: 600;
    text-transform: uppercase;
    color: #9092a6;
  }

  .sort-trigger {
    display: inline-flex;
    align-items: center;
    gap: 14px;
    border: none;
    background: none;
    padding: 0;
    font-family: "Sora", sans-serif;
    font-size: 13px;
    font-weight: 600;
    color: #666980;
    cursor: pointer;

    .chevron {
      width: 17px;
      height: 7px;
      flex-shrink: 0;
      transition: transform 0.2s;
    }

    &.open .chevron {
      transform: rotate(180deg);
    }
  }

  .sort-menu {
    position: absolute;
    top: calc(100% + 8px);
    left: 0;
    min-width: 220px;
    padding: 8px 0;
    background: #fff;
    border: 1px solid #e2e2e2;
    border-radius: 8px;
    box-shadow: 0 8px 24px rgba(31, 31, 68, 0.1);
    z-index: 10;
  }

  .sort-option {
    display: block;
    width: 100%;
    padding: 10px 16px;
    border: none;
    background: none;
    text-align: left;
    font-family: "Sora", sans-serif;
    font-size: 14px;
    font-weight: 600;
    color: #666980;
    cursor: pointer;
    transition:
      background 0.15s,
      color 0.15s;

    &:hover {
      background: #f3f4f8;
      color: #231990;
    }

    &.active {
      font-weight: 600;
      color: #231990;
      background: #f3f4f8;
    }
  }

  .total-count {
    font-family: "Sora", sans-serif;
    font-size: 14px;
    font-weight: 600;
    color: #9092a6;
  }

  .search {
    position: relative;
    flex: 0 1 424px;
    min-width: 200px;
  }

  .visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  .search-input {
    box-sizing: border-box;
    width: 100%;
    padding: 14px 44px 14px 50px;
    border: 1px solid #666980;
    border-radius: 8px;
    background: #fff;
    font-family: "Sora", sans-serif;
    font-size: 14px;
    color: #494b5b;
    transition: border-color 0.2s;

    &::placeholder {
      color: #666980;
    }

    &:focus {
      outline: none;
      border-color: #231990;
    }

    &::-webkit-search-cancel-button,
    &::-webkit-search-decoration {
      -webkit-appearance: none;
      appearance: none;
    }
  }

  .search-icon {
    position: absolute;
    top: 50%;
    left: 14px;
    width: 24px;
    height: 24px;
    transform: translateY(-50%);
    pointer-events: none;
  }

  .search-clear {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    padding: 0;
    border: none;
    background: transparent;
    border-radius: 50%;
    color: #9092a6;
    font-size: 20px;
    line-height: 1;
    cursor: pointer;
    transition: background 0.15s, color 0.15s;

    &:hover {
      background: #f3f4f8;
      color: #494b5b;
    }
  }

  @media screen and (${device.tablet}) {
    flex-direction: column;
    align-items: stretch;
    gap: 16px;

    .toolbar-left {
      flex-wrap: wrap;
    }

    .search {
      width: 100%;
    }
  }
`;

export default StyledToolbar;
