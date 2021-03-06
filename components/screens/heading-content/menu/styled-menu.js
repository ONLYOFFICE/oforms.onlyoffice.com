import styled, { css } from "styled-components";

const StyledMenuTablet = css`
  grid-template-columns: auto 152px auto;
  justify-content: space-between;
  height: 48px;
  .nav-items-mobile {
    display: block;
    grid-column-start: 1;
    grid-column-end: 2;
    grid-row-start: 1;
    grid-row-end: 1;
    div {
      svg {
        rect {
          fill: ${(props) => (props.template ? "black" : "white")};
        }
      }
    }
    cursor: pointer;
  }

  .nav-item-links {
    border-right: 1px solid #e5e5e5;
  }

  .nav-item-logo {
    display: block;
    grid-column-start: 2;
    grid-column-end: 3;
    grid-row-start: 1;
    grid-row-end: 1;
    text-align: center;
    margin: 0 auto;
    width: 152px;
  }

  .nav-item-lng {
    display: block;
    grid-column-start: 3;
    grid-column-end: 4;
    grid-row-start: 1;
    grid-row-end: 1;

    .nav-item-tel {
      display: none;
    }
  }
`;

const StyledMenu = styled.div`
  align-items: center;
  border-bottom: 1px solid transparent;
  display: -ms-grid;
  display: grid;
  -ms-grid-columns: auto 1fr auto;
  grid-template-columns: auto 1fr auto;
  -ms-grid-rows: 1fr;
  grid-template-rows: 1fr;
  max-width: 1640px;
  margin: 0 auto;
  padding: 0 18px;
  box-sizing: border-box;
  height: auto;

  font-size: 12px;
  color: ${(props) => (!props.template ? `#fff` : `#333`)};

  .nav-item-logo {
    grid-column-start: 1;
    grid-column-end: 2;
  }

  .nav-item-links {
    grid-column-start: 2;
    grid-column-end: 3;
    .nav-item .heading-nav-item {
      color: #fff;
      &:hover {
        color: #ff6f3d;
      }
      @media (max-width: 1050px) {
        color: #333;
      }
    }
    &.dark {
      .nav-item .heading-nav-item {
        color: #333;
        &:hover {
          color: #ff6f3d;
        }
      }
    }
  }

  .nav-item-lng {
    grid-column-start: 3;
    grid-column-end: 4;
    display: flex;
    column-gap: 22px;
    align-items: center;

    .nav-item-tel {
      color: ${(props) => (!props.template ? `#fff` : `#333`)};
      font-weight: 600;
      text-decoration: none;
      display: block;
    }
  }

  .nav-items-mobile {
    display: none;
  }

  @media (max-width: 1050px) {
    ${StyledMenuTablet};
  }
`;

export default StyledMenu;
