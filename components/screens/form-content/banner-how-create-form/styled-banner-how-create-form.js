import styled from "styled-components";
import { device } from "@utils/devices";

const StyledBannerHowCreateForm = styled.div`
  display: flex;
  align-items: flex-end;
  border: 1px solid #CCCCCC;
  border-radius: 3px;
  padding: 32px;

  .banner-title {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    font-size: 24px;
    line-height: 32px;
    letter-spacing: -0.02em;

    &:before {
      content: "";
      display: inline-block;
      ${props => props.locale === "ar" ? "margin-left: 16px;" : "margin-right: 16px;"}
      width: 48px;
      min-width: 48px;
      height: 48px;
      background-image: url("https://static-oforms.onlyoffice.com/icons/pensil-icon.react.svg");
    }

    @media screen and ${device.laptop} {
      font-size: 22px;
      line-height: 29px;
      letter-spacing: -0.01em;
    }
  }

  .banner-body {
    flex: 1 1 auto;
    ${props => props.locale === "ar" ? "margin-left: 48px;" : "margin-right: 48px;"}

    @media screen and ${device.laptop} {
      ${props => props.locale === "ar" ? "margin-left: 0;" : "margin-right: 0;"}
    }
  }

  .banner-list {
    ${props => props.locale === "ar" ? "padding-right: 56px;" : "padding-left: 56px;"}
    margin: 0;
    list-style: none;
    counter-reset: counter;
    font-size: 16px;
    line-height: 26px;

    li {
      counter-increment: counter;

      &:before {
        content: counter(counter) ". ";
        display: inline-flex;
        justify-content: center;
        align-items: center;
        font-weight: 700;
        min-width: 36px;
        min-height: 36px;
      }
    }

    @media screen and ${device.laptop} {
      ${props => props.locale === "ar" ? "padding-right: 0;" : "padding-left: 0;"}
      margin: 0 0 16px 0;
    }
  }

  .banner-btn {
    box-sizing: border-box;
    border-radius: 3px;
    padding: 20px;
    font-size: 13px;
    line-height: 16px;
    font-weight: 700;
    letter-spacing: 0.04em;
    min-width: 164px;
    color: #FFFFFF;
    background-color: #FF6F3D;
    text-align: center;
    text-decoration: none;
    text-transform: uppercase;
    transition: background-color 0.3s;

    &:hover {
      background-color: #FF865C;
    }
  }

  @media screen and ${device.laptop} {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export default StyledBannerHowCreateForm;
