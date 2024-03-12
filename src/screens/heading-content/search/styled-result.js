import styled from "styled-components";

const StyledSearchResult = styled.div`
  position: absolute;
  width: 100%;

  .search-result {
    display: flex;
    flex-direction: column;
    max-width: 928px;
    min-height: 55px;
    max-height: 300px;
    overflow-x: hidden;
    width: 100%;
    margin: 0 auto;
    background-color: transparent;
  }

  .item-search-result {
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

  .item-search-result:hover {
    color: #ff6f3d;
  }

  .text-def:hover {
    color: #333333;
    cursor: default;
  }
`;

export default StyledSearchResult;
