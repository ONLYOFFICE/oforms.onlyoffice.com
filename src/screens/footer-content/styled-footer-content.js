import styled from "styled-components";
import { device } from "@components/utils/devices";

const StyledFooter = styled.div`
  box-sizing: initial;
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 258px;
  column-gap: 32px;
  padding: 56px 32px 60px;
  margin: 0 auto;
  height: auto;
  max-width: 1120px;
  overflow: hidden;

  .footer-item-group {
    position: relative;

    &:nth-child(4) {
      @media screen and ${device.tablet} {
        display: grid;
        align-items: start;
        grid-template-columns: 1fr 1fr;
        grid-column: span 3;
        column-gap: 32px;
      }

      @media screen and (max-width: 600px) {
        display: initial;
        align-items: initial;
        grid-template-columns: initial;
        grid-column: initial;
        column-gap: initial;
      }
    }
  }

  .footer-item-group-last {
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
    grid-column: span 4;
    border-top: 1px solid #e2e2e2;
    margin-top: 24px;
    padding-top: 40px;

    .footer-item-heading {
      line-height: 16px;
      padding: 0 0 16px;
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 0.04em;

      @media screen and ${device.laptop} {
        text-align: center;
      }
    }

    @media screen and ${device.laptop} {
      grid-template-columns: initial;
    }

    @media screen and ${device.tablet} {
      grid-column: span 3;
    }

    @media screen and (max-width: 600px) {
      display: block;
      grid-column: initial;
      gap: initial;
      padding: 0;
      margin-top: 0;
      border-top: 0;

      .footer-item-heading {
        display: none;
      }

      .footer-follow {
        padding: 56px 0 0;
      }

      .footer-copyright-block {
        margin-top: 32px;
        text-align: center;
  
        span {
          display: block;
          font-size: 12px;
          line-height: 26px;
          color: #444444;

          &:first-child {
            margin-right: 0;
          }
        }
      }
    }
  }

  .social-link-links {
    .social-link {
      @media screen and (max-width: 600px) {
        padding-right: 0;
        width: 40px;
        height: 40px;
        border: initial;
        border-radius: 50%;
      }

      > div {
        @media screen and (max-width: 600px) {
          border-radius: 50%;
          width: 24px;
          height: 24px;
        }
      }
    }

    @media screen and ${device.laptop} {
      justify-content: center;
    }

    @media screen and (max-width: 600px) {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 16px;
      margin: 0 auto;
      max-width: 100%;
    }
  }

  .social-links {
    @media screen and ${device.laptop} {
      justify-content: center;
    }
  }

  .footer-link-contact {
    font-size: 13px;
    line-height: 18px;
    overflow: initial;
    color: #FF6F3D;
    text-decoration: underline;

    &:hover {
      text-decoration: none;
    }
  }

  .contact-text {
    display: block;
    font-size: 13px;
    line-height: 18px;
    color: #444444;
  }

  .footer-copyright-block {
    display: flex;
    flex-direction: column;
    font-size: 13px;
    line-height: 26px;
    color: #444444;
    text-align: right;

    @media screen and ${device.laptop} {
      display: block;
      margin: 32px 0 0;
      text-align: center;
    }

    span {
      &:first-child {
        @media screen and ${device.laptop} {
          margin-right: 3px;
        }
      }
    }
  }

  .footer-copyright {
    color: #AAAAAA;
    font-size: 13px;
    line-height: 1.4em;
  }

  .footer-item-follow {
    padding-bottom: 0;

    @media screen and (max-width: 600px) {
      padding: 32px 0;
      border: none;
  
      .footer-items-group {
        max-height: 100% !important;
      }
  
      .footer-item-heading-arrow {
        display: none;
      }
  
      .footer-item-heading {
        display: none;
      }
    }
  }

  .popup-qr-code.line-qr-code {
    @media screen and (max-width: 900px) {
      left: initial;
      right: 0;
      transform: initial;
    }
  
    @media screen and (max-width: 791px) {
      left: 50%;
      right: initial;
      transform: translateX(-50%);
    }

    @media screen and (max-width: 551px) {
      left: initial;
      right: 0;
      transform: initial;
    }
  
    @media screen and (max-width: 455px) {
      left: 50%;
      right: initial;
      transform: translateX(-50%);
    }
  }

  .popup-qr-code.wechat-qr-code {
    @media screen and (max-width: 650px) {
      left: initial;
      right: 0;
      transform: initial;
    }

    @media screen and (max-width: 551px) {
      left: 0;
      right: initial;
    }
  
    @media screen and (max-width: 391px) {
      left: initial;
      right: 0;
    }
  
    @media screen and (max-width: 327px) {
      left: 0;
      right: initial;
    }
  }

  .contact-text,
  .footer-link-contact {
    @media screen and (max-width: 600px) {
      font-size: 12px;
      line-height: 20px;
    }
  }

  .footer-copyright-block {
    @media screen and (max-width: 600px) {
      display: flex;
      justify-content: center;
      margin: 0 0 8px;
      line-height: 18px;
      color: #AAAAAA;
    }
  }

  @media screen and ${device.laptop} {
    padding: 56px 40px 64px;
    justify-content: center;
  }

  @media screen and ${device.tablet} {
    grid-template-columns: 1fr 1fr 1fr;
  }

  @media screen and (max-width: 600px) {
    display: block;
    max-width: 100%;
    padding: 8px 16px 64px;
    margin: 0;
  }
`;

export default StyledFooter;
