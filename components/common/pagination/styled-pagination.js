import styled from "styled-components";

const StyledPagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  .pagination-item {
    box-sizing: border-box;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #E2E2E2;
    border-radius: 3px;
    padding: 9px 2px;
    min-width: 36px;
    height: 40px;
    font-size: 16px;
    line-height: 22px;
    color: #444444;
    transition: border-color 0.3s, color 0.3s;

    &:not(:last-child) {
      ${props => props.$locale === "ar" ? "margin-left: 4px;" : "margin-right: 4px;"}
    }

    &.active {
      color: #FFFFFF;
      background-color: #333333;
      pointer-events: none;
      user-select: none;
    }

    &.disabled {
      pointer-events: none;
      user-select: none;
      opacity: 0.4;
    }

    &:not(.active) {
      &:hover {
        border-color: #FF6F3D;
        color: #FF6F3D;
      }
    }
  }

  .pagination-item-prev,
  .pagination-item-next {
    border: none;
    padding: 0;
    background-repeat: no-repeat;
    background-position: center;
    transform: ${props => props.$locale === "ar" && "rotate(180deg)"};
  }

  .pagination-item-prev {
    background-image: url("https://static-oforms.onlyoffice.com/icons/arrow-left.svg");
  }

  .pagination-item-next {
    background-image: url("https://static-oforms.onlyoffice.com/icons/arrow-right.svg");
  }
`;
export default StyledPagination;
