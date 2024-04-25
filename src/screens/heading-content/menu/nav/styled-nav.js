import styled from "styled-components";
import { device } from "@components/utils/devices";
import menuResellerFr from "@public/images/menu-pics/menu-reseller-fr.svg";
import menuBlog1 from "@public/images/menu-pics/menu-blog-1.png";
import menuBlog1Zh from "@public/images/menu-pics/menu-blog-1-zh.jpg";
import menuBlog2 from "@public/images/menu-pics/menu-blog-2.png";

const StyledNav = styled.nav`
  position: absolute;
  left: 50%;
  margin: 0;
  padding: 0;
  width: 100%;
  max-width: 936px;
  height: 72px;
  transform: translateX(-50%);
  z-index: 2;

  &.fr {
    .menu-block-img {
      &.reseller {
        background-image: url(${menuResellerFr.src});
      }
    }
  }

  &.zh {
    .menu-block-img {
      &.blog-1 {
        background-image: url(${menuBlog1Zh.src});
      }
    }
  }

  &.hidden {
    .nav-wrapper .nav-item:not(.active),
    .phone-mobile {
      display: none;
    }
  }

  .nav-wrapper {
    height: 100%;
  }

  .nav-items {
    display: flex;
    justify-content: center;
    margin: 0;
    padding: 0;

    @media screen and ${device.laptop} {
      flex-direction: column;
      justify-content: initial;
      min-height: calc(100% - 54px);
    }
  }

  .phone-mobile {
    display: none;

    &:before {
      @media screen and ${device.laptop} {
        content: "";
        margin-right: 13px;
        width: 24px;
        height: 24px;
        background-image: url("https://static-oforms.onlyoffice.com/icons/phone.svg");
      }
    }

    @media screen and ${device.laptop} {
      box-sizing: border-box;
      display: flex;
      padding: 15px 16px 15px 20px;
      font-size: 16px;
      font-weight: 700;
      line-height: 22px;
      width: 100%;
      color: #333333;
      background-color: #F6F6F6;
      text-decoration: none;
    }
  }

  .nav-products {
    .heading-nav-item {
      position: relative;
      color: #ff6f3d;

      &:after {
        content: "";
        position: absolute;
        left: 50%;
        bottom: 0;
        border-bottom: 1px solid #ff6f3d;
        width: calc(100% - 40px);
        transform: translateX(-50%);

        @media screen and (max-width: 1300px) {
          width: calc(100% - 20px);
        }

        @media screen and ${device.laptop} {
          content: none;
        }
      }

      @media screen and ${device.laptop} {
        color: #444444;
        background-color: #f9f9f9;
      }
    }

    .menu-items-wrapper {
      @media screen and ${device.laptop} {
        height: 100%;
      }
    }
    
    .menu-wrapper {
      display: block;

      @media screen and ${device.laptop} {
        box-sizing: border-box;
        display: flex;
        padding-bottom: 0;
        height: calc(100% - 56px);
      }
    }

    .menu-box {
      &:not(:last-child) {
        @media screen and ${device.laptop} {
          margin-bottom: 12px;
        }
      }

      &:first-child {
        width: max-content;
        min-width: 312px;
        max-width: 320px;

        @media screen and ${device.laptop} {
          width: 100%;
          min-width: initial;
          max-width: initial;
        }
      }

      &:nth-child(2),
      &:nth-child(3) {
        .menu-link {
          font-size: 13px;
          font-weight: 600;

          &:not(:last-child) {
            margin-bottom: 6px;

            @media screen and ${device.laptop} {
              margin-bottom: 12px;
            }
          }

          @media screen and ${device.laptop} {
            font-size: 14px;
            line-height: 24px;
          }
        }
      }

      &:nth-child(2) {
        .menu-label {
          margin: 0 32px 12px 0;

          @media screen and ${device.laptop} {
            margin: 0 24px 12px;
          }
        }

        .menu-link {
          padding: 0 32px 0 36px;

          &:before {
            left: 0;

            @media screen and ${device.laptop} {
              top: 0;
              left: 24px;
            }
          }

          &.feature-overview {
            margin-bottom: 16px;
          }

          @media screen and ${device.laptop} {
            padding: 0 24px 0 60px;
          }
        }

        .menu-submenu-text {
          margin: 0 32px 16px 0;

          @media screen and ${device.laptop} {
            margin: 0 24px 16px;
          }
        }

        @media screen and ${device.laptop} {
          margin-bottom: 0;
        }
      }

      &:nth-child(3) {
        .menu-box-inner {
          @media screen and ${device.laptop} {
            .menu-link {
              padding: 0 24px 0 60px;

              &:before {
                top: 0;
              }
            }
          }
        }

        .menu-link {
          &.online-services {
            margin-bottom: 8px;

            &:after {
              @media screen and ${device.laptop} {
                content: "";
                display: inline-flex;
                margin-left: 4px;
                width: 24px;
                min-width: 24px;
                height: 24px;
                background-image: url("https://static-oforms.onlyoffice.com/icons/arrow-gray.svg");
                background-repeat: no-repeat;
                background-position: center;
              }
            }
      
            &:hover {
              &:after {
                @media screen and ${device.laptop} {
                  background-image: url("https://static-oforms.onlyoffice.com/icons/arrow-red.svg");
                }
              }
      
              @media screen and ${device.laptop} {
                color: #FF6F3D;
              }
            }
      
            @media screen and ${device.laptop} {
              justify-content: space-between;
              margin-bottom: 0;
              padding: 4px 16px 4px 60px;
              font-size: 16px;
              line-height: 24px;
              font-weight: 700;
              color: #FF6F3D;
            }
          }
        }
      }
    }

    .menu-box.bg-gray {
      @media screen and ${device.laptop} {
        padding: 0;
        margin-top: 0;
        background-color: transparent;
      }
    }

    &.tab-active {
      .menu-items-wrapper {
        @media screen and ${device.laptop} {
          height: 100%;
        }

        > .mobile-heading-nav-item {
          @media screen and ${device.laptop} {
            display: none;
          }
        }
      }

      .menu-wrapper {
        @media screen and ${device.laptop} {
          padding: 0;
          height: 100%;
        } 
      }

      .menu-wrapper-box {
        .menu-box {
          &:first-child,
          &:last-child {
            @media screen and ${device.laptop} {
              display: none;
            }
          }
        }

        .menu-submenu {
          @media screen and ${device.laptop} {
            display: block;
          }
        }
      }
    }

    &.online-services-tab-active {
      .menu-items-wrapper {
        @media screen and ${device.laptop} {
          height: 100%;
        }

        > .mobile-heading-nav-item {
          @media screen and ${device.laptop} {
            display: none;
          }
        }
      }

      .menu-wrapper {
        @media screen and ${device.laptop} {
          padding: 0;
          height: 100%;
        } 
      }

      .menu-wrapper-box {
        .menu-box {
          &:first-child,
          &:nth-child(2) {
            @media screen and ${device.laptop} {
              display: none;
            }
          }

          .menu-link.online-services {
            @media screen and ${device.laptop} {
              display: none;
            }
          }
        }

        .menu-submenu {
          @media screen and ${device.laptop} {
            display: block;
          }
        }
      }
    }
  }

  .nav-enterprise {
    position: relative;

    @media screen and ${device.laptop} {
      position: initial;
    }
  }

  .nav-pricing,
  .nav-partners {
    .menu-items-wrapper {
      @media screen and (min-width: 1024px) {
        left: calc(50% + 160px);
      }
    }
  }

  .nav-enterprise {
    .menu-box {
      @media screen and (min-width: 1024px) {
        width: max-content;
        min-width: 312px;
        max-width: 410px;
      }
    }
  }

  .nav-developers,
  .nav-get-onlyoffice,
  .nav-pricing,
  .nav-partners,
  .nav-resources {
    .menu-box {
      &:first-child {
        @media screen and (min-width: 1024px) {
          width: max-content;
          min-width: 312px;
          max-width: 520px;
        }
      }
    }
  }

  .nav-developers,
  .nav-pricing,
  .nav-partners,
  .nav-resources {
    .menu-items-wrapper {
      @media screen and ${device.laptop} {
        display: flex;
        flex-direction: column;
        height: 100%;
      }
    }

    .menu-wrapper {
      @media screen and ${device.laptop} {
        padding: 24px 0 0 0;
      }
    }
  }

  .mobile-heading-nav-item {
    box-sizing: border-box;
    position: sticky;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    border-bottom: 1px solid #f2f2f2;
    font-size: 16px;
    font-weight: 700;
    letter-spacing: 0.04em;
    line-height: 24px;
    padding: 4px 32px;
    width: 100%;
    height: 56px;
    min-height: 56px;
    color: #ff6f3d;
    background-color: #ffffff;
    text-transform: uppercase;
    text-align: center;
    cursor: pointer;
    z-index: 10;

    &:before {
      background-image: url("https://static-oforms.onlyoffice.com/icons/arrow-red.svg");
      background-position: 50% 50%;
      background-repeat: no-repeat;
      background-size: auto 100%;
      display: block;
      content: "";
      width: 10px;
      height: 10px;
      left: 14px;
      position: absolute;
      top: 50%;
      transform: translateY(-50%) rotate(180deg);
      transition: 0.1s linear;
    }
  }

  .menu-wrapper {
    display: flex;

    @media screen and (min-width: 1024px) {
      &:before {
        display: block;
        position: absolute;
        width: 0;
        content: "";
        height: 1px;
        background-color: #FF6F3D;
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
        background-color: #FF6F3D;
        transition: width 0.2s ease-in-out;
        left: 50%;
        top: 0;
      }
    }

    @media screen and ${device.laptop} {
      flex-direction: column;
      padding: 24px 0;
      height: 100%;
      text-align: left;
    }
  }

  .menu-wrapper-box {
    display: flex;

    @media screen and ${device.laptop} {
      flex-direction: column;
      flex: 1 1 auto;
    }
  }

  .menu-box-btn {
    position: relative;
    display: flex;
    justify-content: space-between;
    border: none;
    padding: 0;
    margin: 0;
    width: 100%;
    background-color: transparent;
    text-align: initial;
    cursor: pointer;

    &:after {
      content: "";
      display: inline-flex;
      margin-left: 4px;
      width: 24px;
      min-width: 24px;
      height: 24px;
      background-image: url("https://static-oforms.onlyoffice.com/icons/arrow-gray.svg");
      background-repeat: no-repeat;
      background-position: center;
    }

    &.menu-link {
      &:not(:last-child) {
        margin-bottom: 16px;
  
        @media screen and ${device.laptop} {
          margin-bottom: 12px;
        }
      }

      @media screen and ${device.laptop} {
        padding: 4px 16px 4px 60px;
      }
    }

    &:hover,
    &.active {
      color: #FF6F3D;

      &:after {
        background-image: url("https://static-oforms.onlyoffice.com/icons/arrow-red.svg");
      }
    }

    @media screen and ${device.laptop} {
      padding: 0 48px 0 0;
    }
  }

  .menu-submenu {
    display: flex;
    flex-direction: column;
  }

  .menu-submenu-text {
    display: block;
    margin: 0 32px 16px;
    font-size: 13px;
    line-height: 20px;
    color: #666666;

    @media screen and ${device.laptop} {
      margin: 0 24px 16px;
      color: #808080;
    }
  }

  .menu-submenu-text-pc {
    @media screen and ${device.laptop} {
      display: none;
    }
  }

  .menu-submenu-text-mobile {
    display: none;

    @media screen and ${device.laptop} {
      display: block;
    }
  }

  .menu-submenu {
    .mobile-heading-nav-item {
      display: none;

      @media screen and ${device.laptop} {
        display: block;
        margin-bottom: 24px;
      }
    }

    @media screen and ${device.laptop} {
      display: none;
    }
  }

  .menu-submenu-wrapper {
    &:not(:last-child) {
      margin-bottom: 16px;
    }
  }

  .menu-box-bottom {
    display: flex;
    justify-content: space-between;
    border-top: 1px solid #E2E2E2;
    padding: 12px 24px;

    @media screen and ${device.laptop} {
      justify-content: initial;
      flex-direction: column;
      margin-top: 24px;
      padding: 0 0 24px;
    }
  }

  .menu-apps {
    display: flex;
    align-items: center;
    
    .menu-label {
      padding: 4px 4px 0 0;
      margin: 0 32px 0 0;

      @media screen and ${device.laptop} {
        margin: 0 0 16px 0;
      }
    }

    @media screen and ${device.laptop} {
      align-items: initial;
      flex-direction: column;
      padding: 24px 24px 0 24px;
    }
  }

  .menu-apps-list {
    display: flex;
    align-items: center;
    margin: 0;
    padding: 0;
    list-style-type: none;

    li {
      display: inline-flex;

      &:not(:last-child) {
        margin-right: 16px;
      }
    }
  }

  .menu-app-link {
    display: inline-flex;
    width: 32px;
    min-width: 32px;
    height: 32px;
    background-image: url("https://static-oforms.onlyoffice.com/icons/platforms.svg");

    &.macos {
      background-position-x: -52px;
    }

    &.linux {
      background-position-x: -104px;
    }

    &.android {
      background-position-x: -154px;
    }

    &.ios {
      background-position-x: -206px;
    }

    &:hover {
      background-position-y: -52px;
    }
  }

  .menu-box-bottom-links {
    display: flex;
    align-items: center;

    .menu-link {
      padding: 0 0 0 32px;
      font-size: 13px;
      font-weight: 400;
      line-height: 24px;

      &:before {
        left: 0;

        @media screen and ${device.laptop} {
          top: 0;
          left: 24px;
        }
      }

      &:not(:last-child) {
        margin: 0 16px 0 0;

        @media screen and ${device.laptop} {
          margin: 0 0 12px 0;
        }
      }

      @media screen and ${device.laptop} {
        padding: 0 24px 0 56px;
        font-size: 16px;
        line-height: 24px;
      }
    }

    @media screen and ${device.laptop} {
      align-items: initial;
      flex-direction: column;
      padding-top: 24px;
      order: -1;
    }
  }

  .menu-box {
    position: relative;
    padding: 32px 0;
    width: 312px;

    &.bg-gray {
      background-color: #F8F9F9;

      @media screen and ${device.laptop} {
        display: flex;
        flex-direction: column;
        padding: 32px 0;
        margin-top: auto;
      }
    }

    &.with-border {
      &:after {
        content: "";
        position: absolute;
        top: 50%;
        right: 0;
        border-right: 1px solid #ebebeb;
        max-width: 1px;
        height: calc(100% - 64px);
        transform: translateY(-50%);

        @media screen and ${device.laptop} {
          content: none;
        }
      }
    }

    &:not(:last-child) {
      @media screen and ${device.laptop} {
        margin-bottom: 24px;
      }
    }

    @media screen and ${device.laptop} {
      padding: 0;
      width: 100%;
    }
  }

  .menu-box-wrapper {
    &:not(:last-child) {
      margin-bottom: 24px;
    }
  }

  .menu-box-inner {
    &:not(:last-child) {
      margin-bottom: 16px;
    }
  }

  .menu-box-link {
    display: flex;
    padding: 0 32px 0 68px;
    font-size: 13px;
    line-height: 20px;
    font-weight: 600;
    color: #444444;
    text-decoration: none;

    &.left {
      padding: 0 8px 0 68px;

      @media screen and ${device.laptop} {
        padding: 0 8px 0 60px;
      }
    }

    &.right {
      padding: 0 32px 0 8px;

      @media screen and ${device.laptop} {
        padding: 0 24px 0 8px;
      }

      @media screen and (max-width: 399px) {
        flex: 1 1 100%;
        margin-top: 4px;
        padding: 0 8px 0 60px;
      }
    }

    &.sign-in {
      margin-bottom: 4px;

      @media screen and ${device.laptop} {
        margin-bottom: 8px;
      }
    }

    &:hover {
      color: #FF6F3D;
    }

    @media screen and ${device.laptop} {
      padding: 0 24px 0 60px;
      font-size: 14px;
      line-height: 21px;
    }
  }

  .menu-box-links {
    display: flex;
    align-items: center;
    margin-bottom: 4px;
    font-size: 13px;
    line-height: 20px;

    @media screen and ${device.laptop} {
      margin-bottom: 8px;
      font-size: 16px;
      line-height: 24px;
    }

    @media screen and (max-width: 399px) {
      flex-wrap: wrap;
    }
  }

  .menu-link {
    position: relative;
    display: flex;
    padding: 0 32px 0 68px;
    font-size: 16px;
    line-height: 24px;
    font-weight: 700;
    color: #444444;
    text-decoration: none;

    &:before {
      content: "";
      position: absolute;
      left: 32px;
      top: 0;
      display: block;
      width: 24px;
      height: 24px;
      background-image: url("https://static-oforms.onlyoffice.com/icons/menu-icons-2.svg");
      background-repeat: no-repeat;

      @media screen and ${device.laptop} {
        top: 4px;
        left: 24px;
      }
    }

    &:hover {
      color: #FF6F3D;
    }

    &:not(:last-child) {
      margin-bottom: 16px;

      @media screen and ${device.laptop} {
        margin-bottom: 8px;
      }
    }

    &.no-img {
      &:before {
        content: none;
      }
    }

    &.feature-overview {
      &:before {
        background-position-y: -1690px;
      }
    }

    &.document-editor {
      &:before {
        background-position-y: -1716px;
      }
    }

    &.spreadsheet-editor {
      &:before {
        background-position-y: -1040px;
      }
    }

    &.presentation-editor {
      &:before {
        background-position-y: -1742px;
      }
    }

    &.pdf-editor {
      &:before {
        background-position-y: -1820px;
      }
    }

    &.form-creator {
      &:before {
        background-position-y: -1768px;
      }
    }

    &.e-book-creator {
      &:before {
        background-position-y: -1846px;
      }
    }

    &.collaboration-features {
      &:before {
        background-position-y: -1872px;
      }
    }

    &.collaboration-rooms {
      &:before {
        background-position-y: -1898px;
      }
    }

    &.meeting-rooms {
      &:before {
        background-position-y: -1924px;
      }
    }

    &.custom-rooms {
      &:before {
        background-position-y: -1950px;
      }
    }

    &.markdown-editor {
      &:before {
        background-position-y: -1794px;
      }
    }

    &.documents {
      &:before {
        background-position-y: -2002px;
      }
    }

    &.crm {
      &:before {
        background-position-y: -2028px;
      }
    }

    &.projects {
      &:before {
        background-position-y: -2080px;
      }
    }

    &.mails {
      &:before {
        background-position-y: -2106px;
      }
    }

    &.calendar {
      &:before {
        background-position-y: -2054px;
      }
    }

    &.box {
      &:before {
        background-position-y: -2184px;
      }
    }

    &.confluence {
      &:before {
        background-position-y: -2132px;
      }
    }

    &.dropbox {
      &:before {
        background-position-y: -2210px;
      }
    }

    &.moodles {
      &:before {
        background-position-y: -2236px;
      }
    }

    &.nextcloud {
      &:before {
        background-position-y: -2262px;
      }
    }

    &.odoo {
      &:before {
        background-position-y: -2288px;
      }
    }

    &.owncloud {
      &:before {
        background-position-y: -2158px;
      }
    }

    &.zoom {
      &:before {
        background-position-y: -2314px;
      }
    }

    &.wordpress {
      &:before {
        background-position-y: -2340px;
      }
    }

    &.chatgpt {
      &:before {
        background-position-y: -2366px;
      }
    }

    &.zhipu-copilot {
      &:before {
        background-position-y: -2392px;
      }
    }

    &.apertium {
      &:before {
        background-position-y: -2418px;
      }
    }

    &.deepl {
      &:before {
        background-position-y: -2444px;
      }
    }

    &.translator {
      &:before {
        background-position-y: -2470px;
      }
    }

    &.jitsi {
      &:before {
        background-position-y: -2496px;
      }
    }

    &.telegram {
      &:before {
        background-position-y: -2522px;
      }
    }

    &.rainbow {
      &:before {
        background-position-y: -2548px;
      }
    }

    &.public-rooms {
      &:before {
        background-position-y: -1976px;
      }
    }

    &.find-pdf-form-templates {
      color: #FF6F3D;

      &:before {
        background-position-y: -1404px;
      }
    }

    &.fill-out-pdf-forms-online {
      &:before {
        background-position-y: -702px;
      }
    }

    &.convert-text-files {
      &:before {
        background-position-y: -1222px;
      }
    }

    &.convert-spreadsheets {
      &:before {
        background-position-y: -1248px;
      }
    }

    &.convert-presentations {
      &:before {
        background-position-y: -1274px;
      }
    }

    &.convert-pdfs {
      &:before {
        background-position-y: -1326px;
      }
    }

    &.ai-assistant {
      &:before {
        background-position-y: -1664px;
      }
    }

    &.accessibility {
      &:before {
        background-position-y: -1560px;
      }
    }

    &.security {
      &:before {
        background-position-y: -624px;
      }
    }

    &.marketplace {
      &:before {
        background-position-y: -1612px;
      }
    }

    &.online-services {
      &:before {
        background-position-y: -1352px;
      }

      &:not(:last-child) {
        margin-bottom: 8px;
      }

      &:hover {
        color: #444444;
      }
    }

    &.all-enterprise-solutions {
      &:before {
        background-position-y: -1378px;
      }
    }

    &.docspace-enterprise {
      &:before {
        background-position-y: -1170px;
      }
    }

    &.docs-enterprise {
      &:before {
        background-position-y: -780px;
      }
    }

    &.pricing {
      &:before {
        background-position-y: -1300px;
      }
    }

    &.get-in-now {
      &:before {
        background-position-y: -1014px;
      }
    }

    &.all-developer-solutions {
      &:before {
        background-position-y: -1534px;
      }
    }

    &.docs-developer {
      &:before {
        background-position-y: -806px;
      }
    }

    &.conversion-api {
      &:before {
        background-position-y: -1092px;
      }
    }

    &.document-builder {
      &:before {
        background-position-y: -834px;
      }
    }

    &.api-documentation {
      &:before {
        background-position-y: -885px;
      }
    }

    &.connectors {
      &:before {
        background-position-y: -1196px;
      }
    }

    &.desktop-mobile-apps {
      &:before {
        background-position-y: -156px;
      }
    }

    &.desktop-mobile-apps {
      &:before {
        background-position-y: -155px;
      }
    }

    &.docs-community {
      &:before {
        background-position-y: -1586px;
      }
    }

    &.code-on-github {
      &:before {
        background-position-y: -936px;
      }
    }

    &.docs-home-server {
      &:before {
        background-position-y: -1586px;
      }
    }

    &.docspace-family-pack {
      &:before {
        background-position-y: -1170px;
      }
    }

    &.resellers {
      &:before {
        background-position-y: -208px;
      }  
    }

    &.affiliates {
      &:before {
        background-position-y: -182px;
      }  
    }

    &.hosting-providers {
      &:before {
        background-image: url("https://static-oforms.onlyoffice.com/icons/menu-hosting-providers.svg");
      }  
    }

    &.technology-partners {
      &:before {
        background-position-y: -1144px;
      }  
    }

    &.find-partners {
      &:before {
        background-position-y: -674px;
      }  
    }

    &.submit-request {
      &:before {
        background-position-y: -260px;
      }  
    }

    &.company {
      &:before {
        background-position-y: -286px;
      }  
    }

    &.customers {
      &:before {
        background-position-y: -361px;
      }  
    }

    &.success-stories {
      &:before {
        background-position-y: -1430px;
      }  
    }

    &.awards {
      &:before {
        background-position-y: -390px;
      }  
    }

    &.certificates {
      &:before {
        background-position-y: -1636px;
      }  
    }

    &.events {
      &:before {
        background-position-y: -468px;
      }  
    }

    &.press-downloads {
      &:before {
        background-position-y: -416px;
      }  
    }

    &.gift-shop {
      &:before {
        background-position-y: -519px;
      }  
    }

    &.contacts {
      &:before {
        background-position-y: -546px;
      }  
    }

    &.for-contributers {
      &:before {
        background-position-y: -1456px;
      }  
    }

    &.for-translators {
      &:before {
        background-position-y: -1482px;
      }  
    }

    &.for-influencers {
      &:before {
        background-position-y: -1506px;
      }  
    }

    &.vacancies {
      &:before {
        background-position-y: -650px;
      }  
    }

    &.forum {
      &:before {
        background-position-y: -858px;
      }  
    }

    &.help-center {
      &:before {
        background-position-y: -598px;
      }  
    }

    &.training-courses {
      &:before {
        background-position-y: -494px;
      }  
    }

    &.webinars {
      &:before {
        background-position-y: -572px;
      }  
    }

    &.white-papers {
      &:before {
        background-position-y: -442px;
      }  
    }

    &.blog {
      padding: 0 32px;

      &:before {
        content: none;
      }
    }

    &.workspace,
    &.workspace-cloud {
      &:before {
        background-position-y: -25px;
      }
    }

    &.docspace,
    &.docspace-cloud {
      &:before {
        background-position-y: -1170px;
      }
    }

    &.docs-cloud {
      &:before {
        background-position-y: -782px;
      }
    }

    @media screen and ${device.laptop} {
      padding: 4px 24px 4px 60px;
    }
  }

  .menu-link-2 {
    &:not(:last-child) {
      margin-bottom: 8px;
    }
  }

  .menu-label {
    margin: 0 32px 12px;
    font-size: 10px;
    font-weight: 600;
    line-height: 14px;
    letter-spacing: 0.3em;
    color: #666666;
    text-transform: uppercase;

    @media screen and ${device.laptop} {
      margin: 0 24px 16px;
      padding: 4px 4px 0 0;
      font-size: 11px;
      line-height: 14px;
    }
  }

  .menu-block {
    display: flex;
    flex-direction: column;
    padding: 0 32px;
    color: #444444;
    text-decoration: none;

    &:not(:last-child) {
      margin-bottom: 16px;
    }
  }

  .menu-block-title {
    margin-bottom: 16px;
    font-size: 16px;
    line-height: 24px;
    font-weight: 700;

    &:hover {
      color: #ff6f3d;
    }
  }

  .menu-block-img {
    margin-bottom: 16px;
    width: 180px;
    height: 90px;
    background-repeat: no-repeat;
    background-size: contain;

    &.reseller {
      background-image: url("https://static-oforms.onlyoffice.com/images/menu-pics/menu_reseller.svg");
    }

    &.events {
      background-image: url("https://static-oforms.onlyoffice.com/images/menu-pics/events.svg");
    }

    &.see-it-in-action {
      background-image: url("https://static-oforms.onlyoffice.com/images/menu-pics/menu_see_it_in_act.png");
    }

    &.blog-1 {
      background-image: url(${menuBlog1.src});
    }

    &.blog-2 {
      background-image: url(${menuBlog2.src});
    }
  }

  .menu-block-text {
    font-size: 14px;
    line-height: 20px;
    color: #444444;
    cursor: pointer;

    &:hover {
      color: #ff6f3d;
    }
  }

  .menu-blog-title {
    margin-bottom: 8px;
    font-size: 13px;
    line-height: 20px;
    color: #444444;
    
    &:hover {
      color: #ff6f3d;
    }
  }

  .menu-blog-date {
    font-size: 13px;
    line-height: 21px;
    color: #808080;
  }

  @media screen and (max-width: 1300px) {
    max-width: 756px;
  }

  @media screen and ${device.laptop} {
    box-sizing: border-box;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    border-right: 1px solid #e5e5e5;
    padding-top: 8px;
    margin: 0;
    font-size: 16px;
    width: 429px;
    height: 100%;
    min-height: 100px;
    background-color: #FFFFFF;
    z-index: 1002;
    overflow: auto;
    overflow-x: hidden;
    transform: translate3d(-100%,0,0);
    transition: transform .2s cubic-bezier(.16,.68,.43,.99);
  }

  @media screen and (max-width: 592px) {
    width: calc(100vw - 64px);
  }

  @media screen and (max-width: 375px) {
    width: calc(100vw - 32px);
  }
`;

export default StyledNav;
