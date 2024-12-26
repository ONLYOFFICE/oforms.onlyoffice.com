import styled, { keyframes } from "styled-components";

const menuLineLeft = keyframes`
  0% {
    width: 0;
    left: 50%;
  }

  100% {
    width: 50%;
    left: 0;
  }
`;

const menuLineRight = keyframes`
  0% {
    width: 0;
  }

  100% {
    width: 50%;
  }
`;

const StyledPhoneMenu = styled.div`
  position: relative;
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
        animation: ${menuLineLeft} 0.3s forwards ease-in-out;
      }

      &:after {
        animation: ${menuLineRight} 0.3s forwards ease-in-out;
      }
    }
  }

  .phone-btn {
    display: inline-flex;
    border: none;
    padding: 24px 10px;
    margin: 0;
    background-color: transparent;
    cursor: pointer;
  }

  .phone-wrapper {
    box-sizing: border-box;
    display: none;
    position: absolute;
    top: 100%;
    ${props => props.locale === "ar" ? "right: 0" : "left: 0"};
    border-radius: 0 0 8px 8px;
    width: max-content;
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

    @media screen and (max-width: 1594px) {
      left: ${props => props.locale === "ru" && "initial"};
      right: ${props => props.locale === "ru" && "0"};
    }

    @media screen and (max-width: 1568px) {
      left: ${props => props.locale === "fr" && "initial"};
      right: ${props => props.locale === "fr" && "0"};
    }

    @media screen and (max-width: 1542px) {
      left: ${props => props.locale === "es" && "initial"};
      right: ${props => props.locale === "es" && "0"};
    }

    @media screen and (max-width: 1532px) {
      left: ${props => props.locale === "ja" && "initial"};
      right: ${props => props.locale === "ja" && "0"};
    }

    @media screen and (max-width: 1526px) {
      left: ${props => props.locale === "de" && "initial"};
      right: ${props => props.locale === "de" && "0"};
    }

    @media screen and (max-width: 1518px) {
      left: ${props => (props.locale === "en" || props.locale === "zh" || props.locale === "it" || props.locale === "pt") && "initial"};
      right: ${props => (props.locale === "en" || props.locale === "zh" || props.locale === "it" || props.locale === "pt") && "0"};
    }

    @media screen and (max-width: 1518px) {
      right: ${props => props.locale === "ar" && "initial"};
      left: ${props => props.locale === "ar" && "0"};
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

  @media screen and (max-width: 1594px) {
    position: ${props => props.locale === "ru" && "initial"};
  }

  @media screen and (max-width: 1568px) {
    position: ${props => props.locale === "fr" && "initial"};
  }

  @media screen and (max-width: 1542px) {
    position: ${props => props.locale === "es" && "initial"};
  }

  @media screen and (max-width: 1532px) {
    position: ${props => props.locale === "ja" && "initial"};
  }

  @media screen and (max-width: 1526px) {
    position: ${props => props.locale === "de" && "initial"};
  }

  @media screen and (max-width: 1518px) {
    position: ${props => (props.locale === "en" || props.locale === "zh" || props.locale === "it" || props.locale === "pt" || props.locale === "ar") && "initial"};
  }
`;

export default StyledPhoneMenu;