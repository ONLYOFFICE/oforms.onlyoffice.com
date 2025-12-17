import styled from "styled-components";
import { device } from "@utils/devices";
import pdfIcon from "@public/icons/pdf-48.svg";

const StyledBannerForm = styled.div`
  display: flex;
  border: 1px solid #666666;
  border-radius: 3px;
  padding: 32px;
  color: #ffffff;

  .banner-form-info {
    flex: 0 1 588px;
    ${props => props.$locale === "ar" ? "margin-left: 48px;" : "margin-right: 48px;"}

    @media screen and ${device.laptop} {
      flex: initial;
      ${props => props.$locale === "ar" ? "margin-left: 0;" : "margin-right: 0;"}
      margin-bottom: 24px;
    }

    @media screen and ${device.mobile} {
      margin-bottom: 16px;
    }
  }

  .banner-form-title {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    letter-spacing: -0.02em;
    
    &:before {
      content: "";
      display: inline-block;
      ${props => props.$locale === "ar" ? "margin-left: 16px;" : "margin-right: 16px;"}
      width: 48px;
      min-width: 48px;
      height: 48px;
      background-image: url(${pdfIcon.src});
      background-repeat: no-repeat;

      @media screen and ${device.laptop} {
        ${props => props.$locale === "ar" ? "margin-left: 0;" : "margin-right: 0;"}
        margin-bottom: 4px;
      }
    }

    @media screen and ${device.laptop} {
      flex-direction: column;
      margin-bottom: 8px;
      font-size: 18px;
      line-height: 24px;
      text-align: center;
    }
  }

  .banner-form-text {
    display: block;
    font-size: 16px;
    line-height: 24px;

    @media screen and ${device.laptop} {
      text-align: center;
    }

    @media screen and ${device.mobile} {
      font-size: 14px;
      line-height: 21px;
    }

    a {
      color: #FF6F3D;
      text-decoration: underline;

      &:hover {
        text-decoration: none;
      }
    }
  }

  .banner-form-btns {
    flex: 1 1 auto;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    @media screen and ${device.laptop} {
      flex: initial;
      justify-content: center;
    }

    @media screen and ${device.mobile} {
      flex-direction: column;
    }
  }

  .btn-primary,
  .btn-transparent {
    box-sizing: border-box;
    display: inline-flex;
    border-radius: 3px;
    padding: 19px 24px;
    font-size: 13px;
    font-weight: 600;
    line-height: 18px;
    letter-spacing: 0.04em;
    color: #FFFFFF;
    text-decoration: none;
    text-transform: uppercase;
    text-align: center;
    white-space: nowrap;

    @media screen and ${device.laptop} {
      white-space: initial;
    }

    @media screen and ${device.mobile} {
      justify-content: center;
      width: 100%;
    }

    @media screen and ${device.mobile} {
      padding: 15px 24px
    }
  }

  .btn-primary {
    ${props => props.$locale === "ar" ? "margin-left: 12px;" : "margin-right: 12px;"}
    background-color: #FF6F3D;
    transition: background-color 0.3s;

    &:hover {
      background-color: #FF865C;
    }

    @media screen and ${device.mobile} {
      ${props => props.$locale === "ar" ? "margin-left: 0;" : "margin-right: 0;"}
      margin-bottom: 16px;
    }
  }

  .btn-transparent {
    border: 1px solid #AAAAAA;
    transition: border-color 0.3s, color 0.3s;

    &:hover {
      border-color: #FF6F3D;
      color: #FF6F3D;
    }
  }

  @media screen and ${device.laptop} {
    flex-direction: column;
  }
`;

export default StyledBannerForm;
