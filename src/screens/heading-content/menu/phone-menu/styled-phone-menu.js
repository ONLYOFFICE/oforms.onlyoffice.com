import styled from "styled-components";

const StyledPhoneMenu = styled.div`
  display: inline-flex;

  &.open {
    .phone-btn {
      svg {
        path {
          fill: #FF6F3D;
        }
      }
    }

    .phone-wrapper {
      display: block;

      &:before {
        animation: 0.3s forwards ease-in-out menuLineLeft;
      }

      &:after {
        animation: 0.3s forwards ease-in-out menuLineRight;
      }
    }
  }

  @keyframes menuLineLeft {
    0 {
      width: 0;
      left: 50%;
    }

    100% {
      width: 50%;
      left: 0;
    }
  }

  @keyframes menuLineRight {
    0 {
      width: 0;
    }

    100% {
      width: 50%;
    }
  }

  .phone-btn {
    display: inline-flex;
    border: none;
    padding: 24px 10px;
    margin: 0;
    background-color: transparent;
    cursor: pointer;

    div {
      display: inline-flex;
    }
  }

  .phone-wrapper {
    box-sizing: border-box;
    display: none;
    position: absolute;
    top: 100%;
    right: 0;
    border-radius: 0 0 8px 8px;
    min-width: 250px;
    max-width: 300px;
    padding: 32px;
    background-color: #FFFFFF;
    box-shadow: 0 20px 50px 0 rgba(85, 85, 85, 0.15);;
    z-index: 2;

    &:before {
      display: block;
      position: absolute;
      width: 0;
      content: "";
      height: 1px;
      background-color: #FF642E;
      transition: width 0.2s ease-in-out;
      left: 50%;
      top: 0;
    }

    &:after {
      display: block;
      position: absolute;
      width: 0;
      content: "";
      height: 1px;
      background-color: #FF642E;
      transition: width 0.2s ease-in-out;
      left: 50%;
      top: 0;
    }
  }

  .phone-label {
    margin-bottom: 16px;
    padding: 7px 12px;
    border-radius: 5px;
    color: #666666;
    font-size: 13px;
    font-weight: 600;
    line-height: 18px;
    letter-spacing: 0.52px;
    text-transform: uppercase;
    background-color: #F5F5F5;
  }

  .phone-call {
    display: block;
    margin-bottom: 16px;
    padding: 0 12px;
    color: #333333;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 0.28px;
    text-decoration: none;

    &:hover {
      color: #FF6F3D;
    }
  }

  .phone-request-call {
    display: block;
    padding: 0 12px;
    color: #444444;
    font-size: 14px;
    letter-spacing: 0.28px;
    text-decoration-line: underline;

    &:hover {
      color: #FF6F3D;
    }
  }
`;

export default StyledPhoneMenu;