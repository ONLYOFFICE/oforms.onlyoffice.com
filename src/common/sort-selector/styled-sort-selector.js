import styled from "styled-components";

const StyledSortSelector = styled.div`
  position: relative;

  .sort-btn {
    display: flex;
    align-items: center;
    border: none;
    padding: 0;
    background-color: transparent;
    cursor: pointer;
  }

  .sort-label {
    margin-right: 8px;
    font-size: 13px;
    font-weight: 600;
    line-height: 17px;
    letter-spacing: 0.04em;
    color: #808080;
    text-transform: uppercase;
  }

  .sort-name {
    font-size: 14px;
    font-weight: 600;
    line-height: 22px;
    color: #444444;
  }

  .sort-icon {
    > div {
      display: flex;
    }

    &.open {
      transform: rotate(180deg);
    }
  }

  .sort-dropdown {
    position: absolute;
    top: 100%;
    right: 0;
    display: flex;
    flex-direction: column;
    list-style: none;
    margin: 0px;
    padding: 4px 0px;
    border: 1px solid #d8dadc;
    background-color: #fff;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 5px;
    z-index: 99;
  }

  .sort-dropdown-btn {
    border: none;
    padding: 0;
    font-size: 14px;
    line-height: 160%;
    padding: 3px 11px;
    color: #444444;
    background-color: transparent;
    cursor: pointer;

    &:hover {
      color: #ff6f3d;
    }
  }
`;

export default StyledSortSelector;