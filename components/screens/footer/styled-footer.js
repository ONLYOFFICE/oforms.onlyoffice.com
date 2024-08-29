import styled from "styled-components";
import { device } from "@utils/devices";
import windows from "@public/icons/windows.svg";
import linux from "@public/icons/linux.svg";
import macos from "@public/icons/macos.svg";
import android from "@public/icons/android.svg";
import ios from "@public/icons/ios.svg";

const StyledFooter = styled.div`
  box-sizing: initial;
  padding: 56px 32px 60px;
  margin: 0 auto;
  max-width: 1120px;
  overflow: hidden;

  &.zh {
    .footer-items {
      grid-template-columns: repeat(4, 1fr);

      @media screen and (max-width: 969px) {
        grid-template-columns: repeat(6, 1fr);
      }
    }

    @media screen and (max-width: 600px) {
      .footer-bottom .footer-copyright-block {
        span {
          display: inline-block;
        }
      }
    }
  }

  &.ar {
    .footer-apps-items {
      li:not(:last-child) {
        margin-right: 0;
        margin-left: 16px;
      }

      a::before {
        margin-right: 0;
        margin-left: 8px;
      }
    }
  }

  .footer-apps {
    margin-bottom: 40px;

    @media screen and (max-width: 600px) {
      margin-bottom: 0;
    }
  }

  .footer-apps-title {
    display: inline-flex;
    margin-bottom: 16px;
    font-size: 13px;
    font-weight: 600;
    line-height: 18px;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }

  .footer-apps-items {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    padding: 0;
    margin: 0;
    list-style-type: none;

    li {
      margin-bottom: 16px;

      &:not(:last-child) {
        margin-right: 16px;
      }
    }

    a {
      position: relative;
      display: flex;
      align-items: center;
      border-radius: 3px;
      padding: 12px 16px;
      font-size: 13px;
      line-height: 20px;
      color: #444444;
      background-color: #F9F9F9;
      transition: background-color 0.3s;

      &:before {
        content: "";
        display: flex;
        margin-right: 8px;
        width: 40px;
        height: 40px;
        background-repeat: no-repeat;

        @media screen and (max-width: 969px) {
          margin-right: 0;
          margin-bottom: 8px;
        }

        @media screen and (max-width: 600px) {
          margin: 0;
        }
      }

      &.windows {
        &:before {
          background-image: url(${windows.src});
        }
      }

      &.linux {
        &:before {
          background-image: url(${linux.src});
        }
      }

      &.macos {
        &:before {
          width: 42px;
          background-image: url(${macos.src});
        }
      }

      &.android {
        &:before {
          width: 42px;
          background-image: url(${android.src});
        }
      }

      &.ios {
        &:before {
          width: 41px;
          background-image: url(${ios.src});
        }
      }

      &:hover {
        background-color: #F5F5F5;
      }

      @media screen and (max-width: 969px) {
        flex-direction: column;
      }

      @media screen and (max-width: 600px) {
        border-radius: initial;
        padding: 0;
        font-size: 0;
        line-height: 0;
        background-color: initial;
      }
    }
  }

  .footer-items {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 240px 1fr;
    column-gap: 32px;

    @media screen and (max-width: 969px) {
      grid-template-columns: repeat(6, 1fr);
    }

    @media screen and (max-width: 600px) {
      display: block;
    }
  }

  .footer-item-group {
    position: relative;

    @media screen and (max-width: 969px) {
      grid-column: span 2;

      &:nth-child(4),
      &:nth-child(5) {
        grid-column: span 3;
      }
    }
  }

  .footer-bottom {
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

      @media screen and ${device.laptop} {
        text-align: center;
      }

      @media screen and (max-width: 600px) {
        display: none;
      }
    }

    .footer-follow {
      @media screen and (max-width: 600px) {
        padding: 56px 0 0;
      }
    }

    @media screen and ${device.laptop} {
      grid-template-columns: initial;
    }

    @media screen and (max-width: 969px) {
      grid-column: span 4;
    }

    @media screen and (max-width: 600px) {
      display: block;
      grid-column: initial;
      gap: initial;
      padding: 0;
      margin-top: 0;
      border-top: 0;
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

    @media screen and (max-width: 600px) {
      font-size: 12px;
      line-height: 20px;
    }
  }

  .contact-text {
    display: block;
    font-size: 13px;
    line-height: 18px;
    color: #444444;

    @media screen and (max-width: 600px) {
      font-size: 12px;
      line-height: 20px;
    }
  }

  .footer-copyright-block {
    display: flex;
    flex-direction: column;
    font-size: 13px;
    line-height: 26px;
    color: #444444;
    text-align: right;

    span {
      &:first-child {
        @media screen and ${device.laptop} {
          margin-right: 3px;
        }

        @media screen and (max-width: 600px) {
          margin-right: 0;
        }
      }

      @media screen and (max-width: 600px) {
        display: block;
        font-size: 12px;
        line-height: 26px;
        color: #444444;
      }
    }

    @media screen and ${device.laptop} {
      display: block;
      margin: 32px 0 0;
      text-align: center;
    }

    @media screen and (max-width: 600px) {
      display: flex;
      justify-content: center;
      margin: 32px 0 8px;
      line-height: 18px;
      color: #AAAAAA;
      text-align: center;
    }
  }

  .footer-copyright {
    color: #AAAAAA;
    font-size: 13px;
    line-height: 1.4em;

    @media screen and (max-width: 600px) {
      padding: 10px 0 50px 0;
      font-size: 13px;
      line-height: 26px;
    }
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

  .social-links {
    @media screen and ${device.laptop} {
      justify-content: center;
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

  @media screen and ${device.laptop} {
    padding: 56px 40px 64px;
  }

  @media screen and (max-width: 600px) {
    padding: 16px 16px 64px;
  }
`;

export default StyledFooter;
