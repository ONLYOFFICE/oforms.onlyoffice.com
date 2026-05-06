import styled from "styled-components";

const StyledFilterSidebar = styled.div`
  .countries-hint {
    font-family: "Sora", sans-serif;
    font-size: 13px;
    line-height: 1.4em;
    font-weight: 400;
    color: #9092a6;
    margin: 0 0 12px;
  }

  .clear-btn {
    display: block;
    width: 100%;
    margin-top: 16px;
    padding: 12px;
    border: 1px solid #d0d3e0;
    border-radius: 8px;
    background: #fff;
    font-family: "Sora", sans-serif;
    font-size: 14px;
    font-weight: 500;
    color: #9395a5;
    cursor: not-allowed;
    transition:
      border-color 0.2s,
      color 0.2s;

    &.active {
      border-color: #231990;
      color: #231990;
      cursor: pointer;

      &:hover {
        background: #eef0fb;
      }
    }
  }
`;

export default StyledFilterSidebar;
