import styled from "styled-components";
import { device } from "@components/utils/devices";

const StyledSocialLinks = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;

  &.zh {
    gap: 8px;

    @media screen and ${device.laptop} {
      gap: 18px;
    }

    @media screen and (max-width: 600px) {
      gap: 16px;
    }
  }

  &.ja,
  &.zh {
    @media screen and (max-width: 600px) {
      column-gap: 20px;
    }

    @media screen and (max-width: 539px) {
      column-gap: 24px;
    }
  }

  .social-link {
    list-style-type: none;
    display: flex;
    align-items: center;
    justify-content: center;
    vertical-align: middle;
    width: 40px;
    height: 40px;
    background-image: url("https://static-oforms.onlyoffice.com/icons/color_social_icons.svg");
    background-color: #F9F9F9;
    background-repeat: no-repeat;
    background-position: 0;
    border-radius: 50%;
    cursor: pointer;
    filter: grayscale(1);

    &:hover {
      filter: grayscale(0);
    }

    &.subscribe-mail {
      background-position-x: -426px;
    }

    &.facebook {
      background-position-x: 8px;
    }

    &.twitter {
      background-position-x: -32px;
    }

    &.linkedin {
      background-position-x: -72px;
    }

    &.youtube {
      background-position-x: -112px;
    }

    &.blog {
      background-position-x: -192px;
    }

    &.medium {
      background-position-x: -232px;
    }

    &.instagram {
      background-position-x: -272px;
    }

    &.github {
      background-position-x: -312px;
    }

    &.fosstodon {
      background-position-x: -389px;
    }

    &.tiktok {
      background-image: url("https://static-oforms.onlyoffice.com/images/social-icons/tiktok.react.svg");
      background-position: center;
    }

    &.telegram {
      background-image: url("https://static-oforms.onlyoffice.com/icons/telegram.svg");
      background-position: center;
    }

    &.kuaishou {
      background-position-x: -546px;
    }

    &.xiaohongshu {
      background-position-x: -586px;
    }

    &.csdn {
      background-position-x: -666px;
    }

    &.toutiao {
      background-position-x: -626px;
    }
    
    &.bilibili {
      background-position-x: -706px;
    }
  }

  .icon-item {
    position: relative;
    cursor: pointer;

    &:hover {
      .popup-qr-code {
        opacity: 1;
        visibility: visible;
      }
    }
  }

  .wdgt-wechat,
  .wdgt-line {
    display: block;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    min-width: 40px;
    background-position: center;
    background-size: 24px 24px;
    background-repeat: no-repeat;
    background-color: #F9F9F9;
    filter: grayscale(1);

    &:hover {
      filter: grayscale(0);
    }
  }

  .wdgt-wechat {
    background-image: url("https://static-oforms.onlyoffice.com/icons/social-wechat.png");
  }

  .wdgt-line {
    background-image: url("https://static-oforms.onlyoffice.com/icons/line.react.svg");
  }

  .popup-qr-code {
    background-color: #FFFFFF;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center bottom;
    color: #333;
    font-size: 13px;
    left: 50%;
    transform: translateX(-50%);
    letter-spacing: 0.02em;
    margin: 0;
    opacity: 0;
    padding: 20px;
    position: absolute;
    box-shadow: 0 0 14px rgb(0 0 0 / 20%);
    text-align: center;
    transition: .55s opacity, .55s visibility;
    visibility: hidden;
    width: 160px;
    
    p {
      margin: 0;
    }

    &.wechat-qr-code {
      top: -270px;
      height: 218px;
      background-image: url("https://static-oforms.onlyoffice.com/icons/qrcode_for_wechat.jpg");
    }

    &.line-qr-code {
      top: -218px;
      height: 160px;
      background-image: url("https://static-oforms.onlyoffice.com/icons/qr-code-line.jpg");
    }
  }
`;

export default StyledSocialLinks;