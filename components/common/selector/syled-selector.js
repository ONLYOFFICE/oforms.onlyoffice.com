import styled from "styled-components";

const StyledSelector = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: end;
  align-items: baseline;
  position: relative;

  .filter-header {
    color: #333333;
    font-size: 14px;
    font-weight: 600;
    margin: 0 0 0 8px;
    cursor: pointer;
  }

  .text-sort-set {
    color: #808080;
    font-size: 13px;
    font-weight: 600;
    text-transform: uppercase;
  }

  .arrow {
    margin-left: 14px;
    cursor: pointer;
  }

  .filter-selector {
    display: ${(props) => (props.isOpen ? "block" : "none")};
    position: absolute;
    min-width: 100px;
    z-index: 99;
    right: -6px;
    top: 30px;
    padding-top: 14px;
    background-color: #fff;
    border-radius: 3px;
    padding-top: 14px;
    box-shadow: 0px 7px 25px rgb(85 85 85 / 15%);
  }

  .filter-selector-items {
    padding: 16px;
    font-size: 16px;
    cursor: pointer;
    white-space: nowrap;
    display: block;
  }

  .filter-selector-items:hover {
    color: #ff6f3d;
    background-color: #f5f5f5;
  }
`;

export default StyledSelector;
