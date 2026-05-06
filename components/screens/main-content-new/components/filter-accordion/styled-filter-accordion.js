import styled from "styled-components";

const StyledFilterAccordion = styled.div`
  padding-left: ${({ $level }) => ($level === 2 ? "16px" : "0")};

  ${({ $level }) =>
    $level === 1 &&
    `
    &:not(:last-of-type) {
      border-bottom: 1px solid #b9cef9;
    }

    &:first-of-type > .accordion-header {
      padding-top: 0;
    }
  `}

  > .accordion-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: ${({ $level }) => ($level === 1 ? "24px 0 12px" : "12px 0")};
    background: none;
    border: none;
    cursor: pointer;
    text-align: left;

    > .accordion-title-wrap {
      display: flex;
      align-items: center;
      gap: 12px;

      > .accordion-badge {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        min-width: 24px;
        height: 24px;
        padding: 0 7px;
        border-radius: 999px;
        background: #666980;
        font-family: "Sora", sans-serif;
        font-size: 16px;
        font-weight: 600;
        color: #fff;
      }

      > .accordion-title {
        font-family: "Sora", sans-serif;
        font-weight: ${({ $level }) => ($level === 1 ? "600" : "500")};
        font-size: ${({ $level }) => ($level === 1 ? "16px" : "14px")};
        line-height: ${({ $level }) => ($level === 1 ? "1.4em" : "1.5em")};
        color: ${({ $level }) => ($level === 1 ? "#3A3C49" : "#585A6D")};
        text-transform: ${({ $level }) => ($level === 2 ? "uppercase" : "none")};
      }
    }

    > .accordion-arrow {
      width: 16px;
      height: 16px;
      flex-shrink: 0;
      background-image: url("/icons/templates/arrow.svg");
      background-repeat: no-repeat;
      background-position: center;
      transition: transform 0.3s ease;

      &.open {
        transform: rotate(180deg);
      }
    }
  }

  > .accordion-content {
    display: grid;
    grid-template-rows: 0fr;
    overflow: hidden;
    transition: grid-template-rows 0.3s ease;

    &.open {
      grid-template-rows: 1fr;
    }

    > .accordion-body {
      min-height: 0;
    }
  }
`;

export default StyledFilterAccordion;
