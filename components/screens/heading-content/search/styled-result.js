import styled from "styled-components";

const StyledResultSearch = styled.div`
  position: absolute;
  width: 100%;

  .result-search {
    display: flex;
    max-width: 928px;
    min-height: 55px;
    width: 100%;
    margin: 0 auto;
    flex-direction: column;
    background-color: transparent;
  }

  .item-result-search {
    color: #333333;
    text-decoration: none;
    padding: 16px;
    font-size: 16px;
    cursor: pointer;
    white-space: nowrap;
    background-color: #f5f5f5;
    width: 100%;
    margin: 0 auto;
    max-width: 895px;
  }

  .item-result-search:hover {
    color: #ff6f3d;
  }

  .text-def:hover {
    color: #333333;
    cursor: default;
  }
`;

export default StyledResultSearch;
