import styled from "styled-components";

const StyledSearchArea = styled.div`
  background-color: #333;
  position: relative;
  width: 100%;

  .search_container {
    margin: 0 auto;
    max-width: 958px;
    border-bottom: 1px solid #666;
  }

  .presearch_title {
    line-height: 1em;
    padding-right: 24px;
    border-right: 1px solid #aaa;
    overflow: unset;
    width: 95px;
  }

  .search_input {
    border: none;
    padding: 21px 118px 21px 15px;
    white-space: normal;
  }
`;
export default StyledSearchArea;
