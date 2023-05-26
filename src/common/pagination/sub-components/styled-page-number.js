import styled from "styled-components";
import Button from "../../button";

const StyledPageNumber = styled(Button)`
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  padding: 9px 13px;
  height: 40px;
  user-select: none;

  &.previous-page,
  &.next-page {
    border: none;
  }
  &.go-to-page {
    border: 1px solid #e2e2e2;
  }
  &:hover {
    &.go-to-page:not(.active) {
      border: 1px solid #ff6f3d;
    }
    &.go-to-page.active {
      background-color: #444444;
      cursor: default;
    }
  }
`;
export default StyledPageNumber;
