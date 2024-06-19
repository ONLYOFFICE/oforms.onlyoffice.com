import styled from "styled-components";
import { device } from "@utils/devices";
import blog1 from "@public/images/menu-pics/menu-blog-1-1.png";

const StyledNav = styled.nav`
  margin: 0 auto;
  padding: 0;
  height: 72px;
  z-index: 2;

  &.fr {
    .menu-block-img {
      &.reseller {
        background-image: url("https://static-oforms.onlyoffice.com/images/menu-pics/menu-reseller-fr.svg");
      }
    }
  }

  &.fr,
  &.de {
    .nav-login {
      .mobile-heading-nav-item:after {
        width: 170px;
      }
    }
  }

  &.es {
    .nav-login {
      .mobile-heading-nav-item:after {
        width: 210px;
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
      min-height: calc(100% - 60px);
    }
  }

  .nav-login {
    display: none;

    .heading-nav-item {
      padding: 16px 48px 16px 56px;

      &:after {
        content: "";
        position: absolute;
        top: 50%;
        left: 24px;
        width: 24px;
        height: 24px;
        background-image: url("https://static-oforms.onlyoffice.com/icons/sign-in.svg");
        background-repeat: no-repeat;
        transform: translateY(-50%);
      }
    }

    .mobile-heading-nav-item {
      &:after {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        width: 120px;
        height: 24px;
        background-image: url("https://static-oforms.onlyoffice.com/icons/sign-in-orange.svg");
        background-repeat: no-repeat;
        transform: translate(-50%, -50%);
      }
    }

    .menu-items-wrapper {
      @media screen and ${device.laptop} {
        display: flex;
        flex-direction: column;
        height: 100%;
      }
    }

    @media screen and ${device.laptop} {
      display: block;
      margin-top: auto;
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
      padding: 18px 24px;
      font-size: 18px;
      font-weight: 700;
      line-height: 22px;
      width: 100%;
      color: #333333;
      background-color: #F6F6F6;
      text-decoration: none;
    }
  }

  .nav-products {
    &.tab-active {
      .menu-wrapper {
        @media screen and ${device.laptop} {
          padding: 24px 0 0 0;
        }
      }

      .menu-box {
        &:first-child {
          @media screen and ${device.laptop} {
            display: none;
          }
        }

        &:nth-child(2),
        &:last-child {
          @media screen and ${device.laptop} {
            display: block;
          }
        }
      }

      .mobile-heading-nav-item {
        @media screen and ${device.laptop} {
          display: none;
        }
      }

      .nav-products-mobile-tab {
        @media screen and ${device.laptop} {
          display: block;
        }
      }
    }

    .nav-products-mobile-tab {
      display: none;
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
        padding: 0;
        height: calc(100% - 60px);
      }
    }

    .menu-box {
      padding: 24px;

      &:nth-child(2),
      &:last-child {
        .menu-label {
          display: flex;
          align-items: center;
          position: relative;
          padding: 0;

          &:after {
            content: "";
            display: inline-flex;
            margin-left: 4px;
            width: 10px;
            min-width: 10px;
            height: 10px;
            background-image: url("https://static-oforms.onlyoffice.com/icons/chevron-right-small.svg");
            background-repeat: no-repeat;
            background-position: center;
          }

          &:hover {
            color: #FF6F3D;

            &:after {
              background-image: url("https://static-oforms.onlyoffice.com/icons/chevron-right-red-small.svg");
            }
          }
        }

        .menu-link {
          font-size: 13px;
          font-weight: 600;

          &:not(:last-child) {
            margin-bottom: 4px;
          }

          &.custom-rooms {
            &:not(:last-child) {
              margin-bottom: 12px;
            }
          }
        }

        @media screen and ${device.laptop} {
          display: none;
        }
      }

      &:nth-child(2) {
        padding: 24px 8px 24px 16px;

        @media screen and ${device.laptop} {
          padding: 0 24px;
        }
      }

      &:last-child {
        padding: 24px 16px 24px 8px;

        &:not(.bg-gray) {
          @media screen and ${device.laptop} {
            padding: 0 24px;
          }
        }

        @media screen and ${device.laptop} {
          padding: 0 24px;
          margin-bottom: 24px;
        }
      }

      @media screen and ${device.laptop} {
        padding: 0;
      }
    }
  }

  .nav-enterprise {
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
        padding: 0;
        height: calc(100% - 60px);
      }
    }

    .menu-wrapper-box {
      @media screen and ${device.laptop} {
        padding: 24px;
      }
    }

    .menu-wrapper-bottom {
      justify-content: flex-end;

      .menu-link {
        font-size: 13px;
        font-weight: 600;

        &:not(:last-child) {
          margin-bottom: 0;
          margin-right: 32px;

          @media screen and ${device.laptop} {
            margin-bottom: 12px;
            margin-right: 0;
          }
        }

        @media screen and ${device.laptop} {
          font-size: 14px;
          line-height: 21px;
        }
      }

      @media screen and ${device.laptop} {
        margin: 0;
      }
    }

    .menu-box {
      width: max-content;
      min-width: 312px;
      max-width: 410px;

      @media screen and ${device.laptop} {
        width: 100%;
        min-width: 100%;
        max-width: 100%;
      }
    }
  }

  .nav-developers {
    .menu-box {
      &:first-child {
        width: max-content;
        min-width: 312px;
        max-width: 460px;

        @media screen and ${device.laptop} {
          width: 100%;
          min-width: 100%;
          max-width: 100%;
        }
      }
    }
  }

  .nav-pricing,
  .nav-partners {
    .menu-items-wrapper {
      left: calc(50% + 156px);

      @media screen and ${device.laptop} {
        left: initial;
      }
    }
  }

  .nav-pricing {
    .menu-box {
      &:first-child {
        width: max-content;
        min-width: 312px;
        max-width: 520px;

        @media screen and ${device.laptop} {
          width: 100%;
          min-width: 100%;
          max-width: 100%;
        }
      }
    }
  }

  .nav-get-onlyoffice,
  .nav-partners {
    .menu-box {
      &:first-child {
        width: max-content;
        min-width: 312px;
        max-width: 520px;

        @media screen and ${device.laptop} {
          width: 100%;
          min-width: 100%;
          max-width: 100%;
        }
      }
    }
  }

  .nav-resources {
    .menu-box {
      &:first-child {
        width: max-content;
        min-width: 312px;
        max-width: 320px;

        @media screen and ${device.laptop} {
          width: 100%;
          min-width: 100%;
          max-width: 100%;
        }
      }

      &:nth-child(2) {
        @media screen and ${device.laptop} {
          padding: 0;
          margin-bottom: 24px;
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
        padding: 24px 24px 0 24px;
      }
    }
  }

  .nav-pricing,
  .nav-developers {
    .menu-box {
      &:not(:last-child) {
        @media screen and ${device.laptop} {
          padding: 0;
          margin-bottom: 24px;
        }
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
    height: 60px;
    min-height: 60px;
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
      z-index: 1;

      @media screen and ${device.laptop} {
        content: none;
      }
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
      z-index: 1;

      @media screen and ${device.laptop} {
        content: none;
      }
    }

    @media screen and ${device.laptop} {
      flex-direction: column;
      padding: 24px;
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

  .menu-box {
    box-sizing: border-box;
    position: relative;
    padding: 32px;
    width: 312px;

    &.bg-gray {
      background-color: #F8F9F9;

      .menu-link:not(:last-child) {
        margin-bottom: 16px;
      }

      @media screen and ${device.laptop} {
        display: flex;
        flex-direction: column;
        padding: 32px 24px;
        margin: auto -24px 0;
        width: initial;
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

    &:last-child:not(.bg-gray) {
      @media screen and ${device.laptop} {
        padding: 0;
      }
    }

    @media screen and ${device.laptop} {
      padding: 0;
      width: 100%;
    }
  }

  .menu-wrapper-bottom {
    display: flex;
    justify-content: space-between;
    border-top: 1px solid #E2E2E2;
    padding: 15px 24px 16px 24px;

    @media screen and ${device.laptop} {
      justify-content: initial;
      flex-direction: column;
      padding: 24px;
    }
  }

  .menu-apps {
    display: flex;
    align-items: center;
    margin-right: 32px;

    .menu-label {
      padding: 4px 0 0 0;
      margin: 0 16px 0 0;

      @media screen and ${device.laptop} {
        margin: 0 0 16px;
      }
    }

    @media screen and ${device.laptop} {
      align-items: initial;
      flex-direction: column;
      margin-right: 0;
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

  .menu-wrapper-bottom-links {
    display: flex;
    align-items: center;

    .menu-link {
      padding: 0 0 0 36px;
      font-size: 13px;
      font-weight: 400;
      line-height: 24px;

      &:before {
        @media screen and ${device.laptop} {
          top: 0;
        }
      }

      &:not(:last-child) {
        margin: 0 16px 0 0;

        @media screen and ${device.laptop} {
          margin: 0 0 12px 0;
        }
      }

      @media screen and ${device.laptop} {
        font-size: 14px;
        line-height: 21px;
      }
    }

    @media screen and ${device.laptop} {
      align-items: initial;
      flex-direction: column;
      margin-bottom: 24px;
      order: -1;
    }
  }

  .menu-box-item {
    position: relative;
    border: none;
    border-radius: 6px;
    padding: 12px 40px 12px 12px;
    width: 100%;
    text-align: left;
    background-color: transparent;
    cursor: pointer;

    &:after {
      content: "";
      position: absolute;
      top: 50%;
      right: 12px;
      display: inline-flex;
      width: 24px;
      min-width: 24px;
      height: 24px;
      background-image: url("https://static-oforms.onlyoffice.com/icons/arrow-gray.svg");
      background-repeat: no-repeat;
      background-position: center;
      transform: translateY(-50%);

      @media screen and ${device.laptop} {
        right: 16px;
      }
    }

    .menu-link {
      cursor: pointer;

      &:not(:last-child) {
        margin-bottom: 4px;
      }

      &:hover {
        color: #444444;
      }

      &:before {
        @media screen and ${device.laptop} {
          top: 0;
        }
      }

      @media screen and ${device.laptop} {
        padding: 0 0 0 36px;
      }
    }

    &:not(:last-child) {
      margin-bottom: 12px;

      @media screen and ${device.laptop} {
        margin-bottom: 0;
      }
    }

    &.active {
      background-color: #F5F5F5;

      .menu-link {
        color: #FF6F3D;
      }

      @media screen and ${device.laptop} {
        background-color: transparent;

        .menu-link {
          color: #444444;
        }
      }
    }

    &:hover {
      background-color: #F5F5F5;

      .menu-link {
        color: #FF6F3D;
      }
    }

    @media screen and ${device.laptop} {
      border-radius: initial;
      padding: 12px 44px 12px 24px;
    }
  }

  .menu-box-text {
    display: block;
    padding-left: 36px;
    font-size: 13px;
    line-height: 17px;
    color: #333333;
    cursor: pointer;
  }

  .menu-box-wrapper {
    &:not(:last-child) {
      margin-bottom: 24px;
    }
  }

  .menu-box-inner {
    &:not(:last-child) {
      margin-bottom: 12px;
    }
  }

  .menu-box-link {
    display: flex;
    margin-left: 36px;
    font-size: 13px;
    font-weight: 600;
    line-height: 20px;
    color: #444444;
    text-decoration: none;

    &.left {
      margin: 0 7px 0 0;
    }

    &.right {
      margin: 0 0 0 7px;

      @media screen and (max-width: 399px) {
        margin: 7px 0 0 0;
        width: 100%;
      }
    }

    &.sign-in {
      margin-bottom: 6px;

      @media screen and ${device.laptop} {
        margin-bottom: 8px;
      }
    }

    &:hover {
      color: #FF6F3D;
    }

    @media screen and ${device.laptop} {
      font-size: 14px;
      line-height: 24px;
    }
  }

  .menu-box-links {
    display: flex;
    align-items: center;
    margin-left: 36px;
    margin-bottom: 4px;
    font-size: 13px;
    line-height: 21px;

    @media screen and ${device.laptop} {
      margin-bottom: 8px;
      font-size: 14px;
      line-height: 24px;
    }

    @media screen and (max-width: 399px) {
      flex-wrap: wrap;
    }
  }

  .menu-link {
    position: relative;
    display: flex;
    padding-left: 36px;
    font-size: 16px;
    line-height: 24px;
    font-weight: 700;
    color: #444444;
    text-decoration: none;

    &:before {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      display: block;
      width: 24px;
      height: 24px;
      background-image: url("https://static-oforms.onlyoffice.com/icons/menu-icons-3.svg");
      background-repeat: no-repeat;

      @media screen and ${device.laptop} {
        top: 4px;
      }
    }

    &[href]:hover {
      color: #FF6F3D;
    }

    &:not(:last-child) {
      margin-bottom: 12px;

      @media screen and ${device.laptop} {
        margin-bottom: 8px;
      }
    }

    &.no-img {
      &:before {
        content: none;
      }
    }

    &.document-editor {
      &:before {
        background-position-y: -1768px;
      }
    }

    &.spreadsheet-editor {
      &:before {
        background-position-y: -1040px;
      }
    }

    &.presentation-editor {
      &:before {
        background-position-y: -1794px;
      }
    }

    &.pdf-editor {
      &:before {
        background-position-y: -1872px;
      }
    }

    &.form-creator {
      &:before {
        background-position-y: -1820px;
      }
    }

    &.e-book-creator {
      &:before {
        background-position-y: -1846px;
      }
    }

    &.collaboration-features {
      &:before {
        background-position-y: -1924px;
      }
    }

    &.collaboration-rooms {
      &:before {
        background-position-y: -1950px;
      }
    }

    &.meeting-rooms {
      &:before {
        background-position-y: -1976px;
      }
    }

    &.public-rooms {
      &:before {
        background-position-y: -2028px;
      }
    }

    &.custom-rooms {
      &:before {
        background-position-y: -2002px;
      }
    }

    &.e-book-creator {
      &:before {
        background-position-y: -1898px;
      }
    }

    &.markdown-editor {
      &:before {
        background-position-y: -1846px;
      }
    }

    &.box {
      &:before {
        background-position-y: -2236px;
      }
    }

    &.confluence {
      &:before {
        background-position-y: -2184px;
      }
    }

    &.dropbox {
      &:before {
        background-position-y: -2262px;
      }
    }

    &.moodle {
      &:before {
        background-position-y: -2288px;
      }
    }

    &.nextcloud {
      &:before {
        background-position-y: -2314px;
      }
    }

    &.odoo {
      &:before {
        background-position-y: -2340px;
      }
    }

    &.owncloud {
      &:before {
        background-position-y: -2210px;
      }
    }

    &.zoom {
      &:before {
        background-position-y: -2366px;
      }
    }

    &.wordpress {
      &:before {
        background-position-y: -2392px;
      }
    }

    &.drupal {
      &:before {
        background-position-y: -2626px;
      }
    }

    &.documents {
      &:before {
        background-position-y: -2054px;
      }
    }

    &.crm {
      &:before {
        background-position-y: -2080px;
      }
    }

    &.projects {
      &:before {
        background-position-y: -2132px;
      }
    }

    &.mails {
      &:before {
        background-position-y: -2158px;
      }
    }

    &.calendar {
      &:before {
        background-position-y: -2106px;
      }
    }

    &.ai-assistant {
      &:before {
        background-position-y: -1716px;
      }
    }

    &.for-desktop {
      &:before {
        background-position-y: -1612px;
      }
    }

    &.security {
      &:before {
        background-position-y: -624px;
      }
    }

    &.marketplace {
      &:before {
        background-position-y: -1664px;
      }
    }

    &.contact-sales {
      &:before {
        background-position-y: -1404px;
      }
    }

    &.request-demo {
      &:before {
        background-position-y: -1430px;
      }
    }

    &.convert-pdfs {
      &:before {
        background-position-y: -1326px;
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
        background-position-y: -1586px;
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
        background-position-y: -832px;
      }
    }

    &.api-documentation {
      &:before {
        background-position-y: -884px;
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

    &.docs-community {
      &:before {
        background-position-y: -962px;
      }
    }

    &.code-on-github {
      &:before {
        background-position-y: -936px;
      }
    }

    &.docs-home-server {
      &:before {
        background-position-y: -1638px;
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
        background-image: url("${process.env.NEXT_PUBLIC_STATIC_URL}/icons/menu-hosting-providers.svg");
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
        background-position-y: -364px;
      }  
    }

    &.success-stories {
      &:before {
        background-position-y: -1482px;
      }  
    }

    &.awards {
      &:before {
        background-position-y: -390px;
      }  
    }

    &.certificates {
      &:before {
        background-position-y: -1690px;
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
        background-position-y: -520px;
      }  
    }

    &.contacts {
      &:before {
        background-position-y: -546px;
      }  
    }

    &.for-contributers {
      &:before {
        background-position-y: -1508px;
      }  
    }

    &.for-translators {
      &:before {
        background-position-y: -1534px;
      }  
    }

    &.for-influencers {
      &:before {
        background-position-y: -1560px;
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
      padding-left: 0;

      &:before {
        content: none;
      }

      @media screen and ${device.laptop} {
        margin-bottom: 16px;
      }
    }

    &.workspace,
    &.workspace-cloud {
      &:before {
        background-position-y: -26px;
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
      padding: 4px 0 4px 36px;
    }
  }

  .menu-link-2 {
    &:not(:last-child) {
      margin-bottom: 8px;
    }
  }

  .menu-label {
    display: block;
    margin-bottom: 12px;
    padding: 4px 4px 0 0;
    font-size: 10px;
    font-weight: 600;
    line-height: 14px;
    letter-spacing: 0.3em;
    color: #666666;
    text-transform: uppercase;

    @media screen and ${device.laptop} {
      margin-bottom: 16px;
      font-size: 11px;
      line-height: 15px;
      letter-spacing: 0.3em;
    }
  }

  .menu-block {
    display: flex;
    flex-direction: column;
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
      background-image: url(${blog1.src});
    }

    &.blog-2 {
      background-image: url("https://static-oforms.onlyoffice.com/images/menu-pics/menu-blog-2-1.png");
    }
  }

  .menu-block-text {
    font-size: 13px;
    line-height: 20px;
    color: #444444;
    cursor: pointer;

    &:hover {
      color: #ff6f3d;
    }

    @media screen and ${device.laptop} {
      font-size: 14px;
      line-height: 21px;
    }
  }

  .menu-blog-title {
    margin-bottom: 4px;
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