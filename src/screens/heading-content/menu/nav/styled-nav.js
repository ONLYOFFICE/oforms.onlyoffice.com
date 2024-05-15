import styled from "styled-components";
import { device } from "@components/utils/devices";
import menuResselerFr from "@public/images/menu-pics/menu-reseller-fr.svg";

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
        background-image: url(${menuResselerFr.src});
      }
    }
  }

  &.zh {
    .menu-block-img {
      &.blog-1 {
        background-image: url("https://static-oforms.onlyoffice.com/images/menu-pics/menu-blog-1-1-zh.jpg");
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
    .menu-box {
      &:nth-child(2) {
        width: max-content;
        min-width: 312px;
        max-width: 330px;

        @media screen and ${device.laptop} {
          width: 100%;
          min-width: 100%;
          max-width: 100%;
        }
      }

      &:last-child {
        width: max-content;
        min-width: 312px;
        max-width: 520px;

        @media screen and (max-width: 1300px) {
          max-width: 312px;
        }

        @media screen and ${device.laptop} {
          width: 100%;
          min-width: 100%;
          max-width: 100%;
        }
      }
    }

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
  }

  .nav-enterprise {
    position: relative;

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

  .nav-developers,
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
        padding: 16px 0 0 0;
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

  .nav-get-onlyoffice {
    .menu-link:not([href]) {
      @media screen and ${device.laptop} {
        margin-bottom: 0;
      }
    }
  }

  .nav-resources {
    .menu-box {
      &:nth-child(2) {
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
        z-index: 1;
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
      }
    }

    @media screen and ${device.laptop} {
      flex-direction: column;
      padding: 16px 0;
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

  .menu-submenu-wrapper {
    &:not(:last-child) {
      margin-bottom: 16px;
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
          top: initial;
          left: 50%;
          bottom: 0;
          width: calc(100% - 48px);
          max-width: initial;
          max-height: 1px;
          border-right: none;
          border-bottom: 1px solid #ebebeb;
          transform: translateX(-50%);
        }
      }
    }

    &:not(:last-child) {
      @media screen and ${device.laptop} {
        margin-bottom: 32px;
      }
    }

    &:last-child:not(.bg-gray) {
      @media screen and ${device.laptop} {
        padding: 0;
      }
    }

    @media screen and ${device.laptop} {
      padding: 0 0 32px;
      width: 100%;
    }
  }

  .menu-box-item {
    .menu-link {
      &:not(:last-child) {
        margin-bottom: 8px;

        @media screen and ${device.laptop} {
          margin-bottom: 0;
        }
      }
    }

    &:not(:last-child) {
      margin-bottom: 16px;

      @media screen and ${device.laptop} {
        margin-bottom: 8px;
      }
    }
  }

  .menu-box-text {
    display: block;
    padding: 0 32px;
    font-size: 14px;
    line-height: 21px;
    color: #666666;

    @media screen and ${device.laptop} {
      padding: 0 24px 8px;
      line-height: 22px;
    }
  }

  .menu-box-line {
    border-bottom: 1px solid #EBEBEB;
    margin: 32px;
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
    padding: 0 32px 0 72px;
    font-size: 14px;
    line-height: 23px;
    color: #444444;
    text-decoration: none;

    &.left {
      padding: 0px 8px 0px 72px;

      @media screen and ${device.laptop} {
        padding: 9px 8px 9px 56px;
      }
    }

    &.right {
      padding: 0px 48px 0px 8px;

      @media screen and ${device.laptop} {
        padding: 9px 24px 9px 8px;
      }

      @media screen and (max-width: 399px) {
        padding: 9px 16px 9px 56px;
        width: 100%;
      }
    }

    &.sign-in {
      margin-bottom: 6px;

      @media screen and ${device.laptop} {
        margin-bottom: 0;
      }
    }

    &:hover {
      color: #FF6F3D;
    }

    @media screen and ${device.laptop} {
      padding: 9px 24px 9px 56px;
      font-size: 14px;
      line-height: 22px;
    }
  }

  .menu-box-links {
    display: flex;
    align-items: center;
    margin-bottom: 6px;
    font-size: 14px;
    line-height: 23px;

    @media screen and ${device.laptop} {
      margin-bottom: 0;
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
      background-image: url("https://static-oforms.onlyoffice.com/icons/menu-icons.svg");
      background-repeat: no-repeat;

      @media screen and ${device.laptop} {
        top: 8px;
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

    &.marketplace {
      &:before {
        background-position-y: -1560px;
      }
    }

    &.for-desktop {
      &:before {
        background-position-y: -52px;
      }
    }

    &.for-ios {
      &:before {
        background-position-y: -78px;
      }
    }

    &.for-android {
      &:before {
        background-position-y: -104px;
      }
    }

    &.find-form-templates {
      color: #FF6F3D;

      &:before {
        background-position-y: -1378px;
      }
    }

    &.fill-out-forms-online {
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

    &.documents {
      &:before {
        background-position-y: -2002px;
      }
    }

    &.all-enterprise-solutions {
      &:before {
        background-position-y: -1352px;
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
        background-position-y: -1508px;
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
        background-position-y: -1534px;
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
        background-position-y: -364px;
      }  
    }

    &.success-stories {
      &:before {
        background-position-y: -1404px;
      }  
    }

    &.awards {
      &:before {
        background-position-y: -390px;
      }  
    }

    &.certificates {
      &:before {
        background-position-y: -1586px;
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
        background-position-y: -1430px;
      }  
    }

    &.for-translators {
      &:before {
        background-position-y: -1456px;
      }  
    }

    &.for-influencers {
      &:before {
        background-position-y: -1482px;
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
      padding: 8px 24px 8px 58px;
    }
  }

  .menu-link-2 {
    &:not(:last-child) {
      margin-bottom: 8px;
    }
  }

  .menu-label {
    margin-bottom: 16px;
    border-radius: 5px;
    padding: 4px 32px;
    font-size: 13px;
    font-weight: 600;
    line-height: 16px;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: #808080;

    @media screen and ${device.laptop} {
      margin-bottom: 8px;
      padding: 8px 24px;
      font-size: 12px;
      line-height: 24px;
      letter-spacing: 0.05em;
    }
  }

  .menu-block {
    display: flex;
    flex-direction: column;
    padding: 0 32px;
    color: #444444;
    text-decoration: none;

    &:not(:last-child) {
      margin-bottom: 32px;
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
      background-image: url("https://static-oforms.onlyoffice.com/images/menu-pics/menu-blog-1-1.png");
    }

    &.blog-2 {
      background-image: url("https://static-oforms.onlyoffice.com/images/menu-pics/menu-blog-2-1.png");
    }
  }

  .menu-block-text {
    font-size: 14px;
    line-height: 21px;
    color: #444444;
    cursor: pointer;

    &:hover {
      color: #ff6f3d;
    }
  }

  .menu-blog-title {
    margin-bottom: 8px;
    font-size: 14px;
    line-height: 1.6em;
    color: #444444;
    
    &:hover {
      color: #ff6f3d;
    }
  }

  .menu-blog-date {
    font-size: 13px;
    line-height: 1.6em;
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
