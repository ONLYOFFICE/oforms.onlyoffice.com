import styled from "styled-components";
import { device } from "@components/utils/devices";

const StyledFooter = styled.div`
  box-sizing: initial;
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 257px;
  column-gap: 32px;
  padding: 56px 32px 60px;
  margin: 0 auto;
  height: auto;
  max-width: 1120px;

  .footer-item-group {
    position: relative;
  }

  .footer-item-group-last {
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
    grid-column: span 5;
    border-top: 1px solid #e2e2e2;
    margin-top: 24px;
    padding-top: 40px;

    .footer-item-heading {
      line-height: 16px;
      padding: 0 0 16px;
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }
  }

  .footer-link-contact {
    font-size: 13px;
    line-height: 18px;
    overflow: initial;
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
  }

  .footer-copyright {
    color: #AAAAAA;
    font-size: 13px;
    line-height: 1.4em;
  }

  .footer-item-follow {
    padding-bottom: 0;
  }

  @media screen and ${device.laptop} {
    vertical-align: top;
    padding: 56px 40px 64px;
    justify-content: center;
    
    .footer-item-group-last {
      grid-template-columns: initial;

      .footer-item-heading {
        text-align: center;
      }

      .social-link-links {
        justify-content: center;
      }

      .footer-copyright-block {
        display: block;
        margin: 32px 0 0;
        text-align: center;

        span {
          &:first-child {
            margin-right: 3px;
          }
        }
      }
    }

    .social-links {
      justify-content: center;
    }
  }

  @media screen and (max-width: 969px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;

    .footer-item-group-last {
      grid-column: span 4;
    }

    .footer-item-group {
      &:nth-child(5) {
        display: grid;
        align-items: start;
        grid-template-columns: 1fr 1fr;
        grid-column: span 4;
        column-gap: 32px;
      }
    }
  }

  @media screen and (max-width: 650px) {
    .popup-qr-code.wechat-qr-code {
      left: initial;
      right: 0;
      transform: initial;
    }
  }

  @media screen and (max-width: 600px) {
    display: block;
    max-width: 100%;
    padding: 8px 16px 64px;
    margin: 0;

    &.zh {
      .footer-item-group-last .footer-copyright-block {
        span {
          display: inline-block;
        }
      }
    }

    .footer-item-group {
      &:nth-child(5) {
        display: initial;
        align-items: initial;
        grid-template-columns: initial;
        grid-column: initial;
        column-gap: initial;
      }
    }

    .footer-item-group-last {
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

      .social-link-links {
        gap: 24px;
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
  
    .footer-item-follow {
      padding: 32px 0;
      border: none;
  
      .social-link-links {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 16px;
        margin: 0 auto;
        max-width: 100%;
  
        .social-link {
          padding-right: 0;
          width: 40px;
          height: 40px;
          border: initial;
          border-radius: 50%;
  
          > div {
            border-radius: 50%;
            width: 24px;
            height: 24px;
          }
        }
      }
  
      .footer-copyright {
        padding: 10px 0 50px 0;
      }
  
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
  
    .contact-text,
    .footer-link-contact {
      font-size: 12px;
      line-height: 20px;
    }
  
    .footer-copyright-block {
      display: flex;
      justify-content: center;
      margin: 0 0 8px;
      line-height: 18px;
      color: #AAAAAA;
    }
  
    .footer-copyright {
      font-size: 13px;
      line-height: 26px;
    }
  }
  
  @media screen and (max-width: 551px) {
    .popup-qr-code.wechat-qr-code {
      left: 0;
      right: initial;
    }
  }

  @media screen and (max-width: 391px) {
    .popup-qr-code.wechat-qr-code {
      left: initial;
      right: 0;
    }
  }

  @media screen and (max-width: 327px) {
    .popup-qr-code.wechat-qr-code {
      left: 0;
      right: initial;
    }
  }
`;

export default StyledFooter;
