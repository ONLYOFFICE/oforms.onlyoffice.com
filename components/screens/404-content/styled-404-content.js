import styled from "styled-components";
import Section from "@components/common/section";

const StyledErrorContent = styled(Section)`
  box-sizing: border-box;
  padding: 117px 0 187px;

  .section-page {
    padding: 0;
  }

  .error-image {
    margin: 0 auto;
    width: 100%;
    height: 424px;
    background-image: url("https://static-oforms.onlyoffice.com/icons/bg-errors.react.svg");
    background-size: contain;
    background-position: 50% 50%;
    background-repeat: no-repeat;

    @media screen and (max-width: 540px) {
      height: 363px;
      max-width: 100%;
    }

    @media screen and (max-width: 320px) {
      height: 235px;
    }
  }

  .error-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 530px;
    margin: 0 auto;
    text-align: center;
  }

  .error-heading {
    margin: 0.67em 0;
    font-size: 40px;
    line-height: 53px;
    text-align: center;
    letter-spacing: -0.02em;
    color: #333333;

    @media screen and (max-width: 540px) {
      font-size: 24px;
      line-height: 32px;
      letter-spacing: -0.01em;
    }
  }

  .error-description {
    margin-bottom: 24px;
    font-size: 16px;
    line-height: 22px;
    text-align: center;
    color: #555555;

    @media screen and (max-width: 540px) {
      font-size: 13px;
      line-height: 21px;
    }
  }

  .error-btn {
    display: inline-block;
    padding: 20px 26px;
    font-weight: 600;
    font-size: 12px;
    line-height: 16px;
    text-align: center;
    letter-spacing: .08em;
    text-transform: uppercase;
    color: #fff;
    text-decoration: none;
    box-sizing: border-box;
    border-radius: 3px;
    background-color: #ff6f3d;
    transition: background-color 0.1s linear;

    &:hover {
      background-color: #ff865c;
    }
  }

  @media screen and (max-width: 540px) {
    padding: 107px 23px 0;
  }
`;

export default StyledErrorContent;
