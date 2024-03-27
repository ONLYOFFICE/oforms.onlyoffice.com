import styled from "styled-components";
import { device } from "@components/utils/devices";
import menuIcons from "@public/icons/menu-icons.svg";
import menuResellerFr from "@public/images/menu-pics/menu-reseller-fr.svg";
import menuBlog1 from "@public/images/menu-pics/menu-blog-1.png";
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

  &.hidden {
    .nav-wrapper ul li:not(.active),
    .phone-mobile {
      display: none;
    }
  }

  ul {
    display: flex;
    justify-content: center;
    margin: 0;
    padding: 0;
  }

  .nav-wrapper {
    height: 100%;
  }

  &.fr {
    #reseller-img {
      background-image: url(${menuResellerFr.src});
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
  }

  .phone-mobile {
    display: none;
  }

  .outer-box {
    position: relative;
    box-sizing: border-box;
    padding: 32px 0;
    width: 312px;

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
        background-color: #ebebeb;
      }
    }
  }

  .dropdown-item-group {
    .dropdown-item {
      &:not(:last-child) {
        margin-bottom: 8px;
      }
    }

    &:not(:last-child) {
      margin-bottom: 16px;
    }
  }

  .dropdown-item-box {
    display: block;
    text-decoration: none;
  }

  .dropdown-item {
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
      top: 0px;
      display: block;
      width: 24px;
      height: 24px;
      background-image: url(${menuIcons.src});
      background-repeat: no-repeat;
    }

    &:not(:last-child) {
      margin-bottom: 16px;
    }

    &.no-bold {
      padding: 0 64px;
      font-weight: 400;

      &:before {
        content: none;
      }

      &:not(:last-child) {
        margin-bottom: 12px;
      }
    }

    &:hover {
      color: #FF6F3D;
    }
  }

  .dropdown-item-title {
    display: flex;
    margin-bottom: 16px;
    padding: 0 32px;
    font-size: 16px;
    line-height: 24px;
    font-weight: 700;
    color: #444444;
    text-decoration: none;
    
    &:hover {
      color: #FF6F3D;
    }
  }

  .dropdown-item-text {
    display: block;
    padding: 0 32px;
    font-size: 14px;
    line-height: 21px;
    color: #666666;
  }

  .dropdown-item-label {
    margin-bottom: 16px;
    border-radius: 5px;
    padding: 4px 32px;
    font-size: 13px;
    font-weight: 600;
    line-height: 16px;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: #808080;
  }

  .bg-gray {
    background-color: #F9F9F9;
  }

  .menu-pic-div {
    font-size: 14px;
    line-height: 21px;
    color: #444444;
  }

  .menu-pic-img {
    margin: 0 32px 16px;
    width: 180px;
    height: 90px;
    background-repeat: no-repeat;
    background-size: contain;
  }

  .menu-pic-header {
    margin: 0;
    padding: 0 32px;
    cursor: pointer;

    &:hover {
      color: #FF6F3D;
    }
  }

  .inner-box {
    &:not(:last-child) {
      margin-bottom: 16px;
    }
  }

  .inner-box-links {
    display: flex;
    align-items: center;
    margin-bottom: 6px;

    #navitem-download-docspace-signin,
    #navitem-download-docs-enterprise-signin {
      margin: 0;
      padding: 0px 8px 0px 72px;
    }

    #navitem-download-docspace-signup,
    #navitem-download-docs-enterprise-signup {
      margin: 0;
      padding: 0px 48px 0px 8px;
    }
  }

  .nav-2nd-menu-link {
    display: flex;
    padding: 0 32px 0 72px;
    font-size: 14px;
    line-height: 23px;
    font-feature-settings: "tnum" on, "lnum" on;
    color: #444444;
    text-decoration: none;

    &:not(:last-child) {
      margin-bottom: 6px;
    }

    &:hover {
      color: #FF6F3D;
    }
  }

  .outer-box-line {
    border-bottom: 1px solid #EBEBEB;
    margin: 32px;
  }

  .nowrap {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    padding: 0 32px 0 72px;
    margin-bottom: 12px;
  }

  .nav-item-nowrap-link {
    font-size: 14px;
    line-height: 22px;
    color: #444444;
    text-decoration: none;

    &:hover {
      color: #FF6F3D;
    }
  }

  .slash-text {
    margin: 0 6px;
    font-size: 14px;
    line-height: 22px;
    color: #444444;
  }

  #see-it-img {
    background-image: url("https://static-oforms.onlyoffice.com/images/menu-pics/menu_see_it_in_act.png");
  }

  #reseller-img {
    background-image: url("https://static-oforms.onlyoffice.com/images/menu-pics/menu_reseller.svg");
  }

  #latest-events-img {
    background-image: url("https://static-oforms.onlyoffice.com/images/menu-pics/events.svg");
  }

  #education-img {
    background-image: url("https://static-oforms.onlyoffice.com/images/menu-pics/menu_for_developers.png");
  }

  #navitem-products {
    .heading-nav-item {
      position: relative;
      color: #FF6F3D;

      &:after {
        content: "";
        position: absolute;
        left: 50%;
        bottom: 0;
        border-bottom: 1px solid #FF6F3D;
        width: calc(100% - 40px);
        transform: translateX(-50%);
      }
    }
  }

  #navitem-download-docspace,
  #navitem-download-docs-enterprise,
  #navitem-download-workspace,
  #navitem-download-docs-dev {
    cursor: default;

    &:hover {
      color: #444444;
    }
  }

  #navitem-download-signin {
    display: block;
  }

  #navitem-pricing-for-business,
  #navitem-pricing-for-dev,
  #navitem-download-docs-enterprise,
  #navitem-download-workspace,
  #navitem-download-docspace,
  #navitem-download-docs-dev {
    margin-bottom: 8px;
  }

  #navitem-pricing-for-business,
  #navitem-pricing-for-dev {
    margin-bottom: 16px;
  }

  #navitem-products-docspace,
  #navitem-enterprise-docspace-enterprise,
  #navitem-pricing-docs-docspace,
  #navitem-download-docspace,
  #navitem-sign-in-docspace-mob,
  #navitem-pricing-family-pack {
    &:before {
      background-position-y: -1170px;
    }
  }

  #navitem-products-workspace,
  #navitem-download-workspace,
  #navitem-prices-workspace,
  #navitem-enterprise-workspace {
    &:before {
      background-position-y: -26px;
    }
  }

  #navitem-developers-doc-builder {
    &:before {
      background-position-y: -834px;
    }
  }

  #navitem-products-connectors {
    &:before {
      background-position-y: -1196px;
    }
  }

  #navitem-products-marketplace {
    &:before {
      background-position-y: -1560px;
    }
  }

  #navitem-products-for-desktop {
    &:before {
      background-position-y: -52px;
    }
  }

  #navitem-products-for-ios {
    &:before {
      background-position-y: -78px;
    }
  }

  #navitem-products-for-android {
    &:before {
      background-position-y: -104px;
    }
  }

  #navitem-products-find-templates {
    color: #FF6F3D;

    &:before {
      background-position-y: -1378px;
    }
  }

  #navitem-products-oforms {
    &:before {
      background-position-y: -702px;
    }
  }

  #navitem-products-convert-text {
    &:before {
      background-position-y: -1222px;
    }
  }

  #navitem-products-convert-spreadsheets {
    &:before {
      background-position-y: -1248px;
    }
  }

  #navitem-products-convert-presentations {
    &:before {
      background-position-y: -1274px;
    }
  }

  #navitem-products-convert-pdfs {
    &:before {
      background-position-y: -1326px;
    }
  }

  #navitem-enterprise-overview {
    &:before {
      background-position-y: -1352px;
    }
  }

  #navitem-developers-all-dev-solutions {
    &:before {
      background-position-y: -1508px;
    }
  }

  #navitem-developers-docs-dev,
  #navitem-pricing-docs-dev,
  #navitem-download-docs-dev {
    &:before {
      background-position-y: -806px;
    }
  }

  #navitem-pricing-home-server {
    &:before {
      background-position-y: -1534px;
    }
  }

  #navitem-developers-conversion-api {
    &:before {
      background-position-y: -1092px;
    }
  }

  #navitem-developers-api-doc {
    &:before {
      background-position-y: -885px;
    }
  }

  #navitem-enterprise-pricing,
  #navitem-developers-pricing {
    &:before {
      background-position-y: -1300px;
    }
  }

  #navitem-enterprise-get,
  #navitem-developers-get {
    &:before {
      background-position-y: -1014px;
    }
  }

  #navitem-pricing-docs-enterprice,
  #navitem-download-docs-enterprise,
  #navitem-enterprise-docs-enterprise {
    &:before {
      background-position-y: -780px;
    }
  }

  #navitem-partners-resellers {
    &:before {
      background-position-y: -208px;
    }
  }

  #navitem-partners-affiliates {
    &:before {
      background-position-y: -182px;
    }
  }

  #navitem-partners-hosting-providers {
    &:before {
      background-image: url("https://static-oforms.onlyoffice.com/icons/menu-hosting-providers.svg");
    }
  }

  #navitem-partners-technology-partners {
    &:before {
      background-position-y: -1144px;
    }
  }
  
  #navitem-partners-find-partners {
    &:before {
      background-position-y: -674px;
    }
  }

  #navitem-partners-submit-request {
    &:before {
      background-position-y: -260px;
    }
  }

  #navitem-resources-about {
    &:before {
      background-position-y: -286px;
    }
  }

  #navitem-resources-customers {
    &:before {
      background-position-y: -364px;
    }
  }

  #navitem-resources-success-stories {
    &:before {
      background-position-y: -1404px;
    }
  }

  #navitem-resources-for-contribute {
    &:before {
      background-position-y: -1430px;
    }
  }

  #navitem-resources-for-translators {
    &:before {
      background-position-y: -1456px;
    }
  }

  #navitem-resources-for-influencers {
    &:before {
      background-position-y: -1482px;
    }
  }

  #navitem-resources-vacancies {
    &:before {
      background-position-y: -650px;
    }
  }

  #navitem-resources-awards {
    &:before {
      background-position-y: -390px;
    }
  }

  #navitem-resources-certificates {
    &:before {
      background-position-y: -1586px;
    }
  }

  #navitem-resources-events {
    &:before {
      background-position-y: -468px;
    }
  }

  #navitem-resources-giftshop {
    &:before {
      background-position-y: -520px;
    }
  }

  #navitem-resources-contacts {
    &:before {
      background-position-y: -546px;
    }
  }

  #navitem-resources-blog {
    padding: 0 32px;
    margin-bottom: 16px;

    &:before {
      content: none;
    }
  }

  #navitem-resources-forum {
    &:before {
      background-position-y: -858px;
    }
  }

  #navitem-resources-pressdownloads {
    &:before {
      background-position-y: -416px;
    }
  }

  #navitem-resources-help {
    &:before {
      background-position-y: -598px;
    }
  }

  #navitem-resources-whitepapers {
    &:before {
      background-position-y: -442px;
    }
  }

  #navitem-resources-webinars {
    &:before {
      background-position-y: -572px;
    }
  }

  #navitem-resources-training-courses {
    &:before {
      background-position-y: -494px;
    }
  }

  #navitem-resources-compare {
    &:before {
      background-position-y: -754px;
    }
  }

  #navitem-download-connectors {
    &:before {
      background-position-y: -1196px;;
    }
  }

  #navitem-download-desktop-mob {
    &:before {
      background-position-y: -156px;
    }
  }

  #navitem-download-docs-builder {
    &:before {
      background-position-y: -832px;
    }
  }

  #navitem-download-docs-community {
    &:before {
      background-position-y: -962px;
    }
  }

  #navitem-download-code-git {
    &:before {
      background-position-y: -936px;
    }
  }

  #blog-box {
    padding: 0 32px;
  }

  #blog-box-1 {
    margin-bottom: 32px;

    .menu-blog-img {
      background-image: url(${menuBlog1.src});
    }
  }

  #blog-box-2 {
    .menu-blog-img {
      background-image: url(${menuBlog2.src});
    }
  }

  .menu-blog-img {
    margin-bottom: 16px;
    width: 180px;
    height: 90px;
    background-repeat: no-repeat;
    background-size: contain;
  }

  .menu-blog-header {
    margin-bottom: 8px;
    color: #444;
    font-size: 14px;
    line-height: 1.6em;

    &:hover {
      color: #FF6F3D;
    }
  }

  .menu-blog-date {
    color: #808080;
    font-size: 13px;
    line-height: 1.6em;
  }

  @media screen and (min-width: 1024px) {
    #navitem-enterprise {
      position: relative;

      .outer-box {
        width: max-content;
        min-width: 312px;
        max-width: 410px;
      }
    }

    #navitem-developers,
    #navitem-pricing {
      .outer-box {
        &:first-child {
          width: max-content;
          min-width: 312px;
          max-width: 520px;
        }
      }
    }

    #navitem-pricing,
    #navitem-partners {
      .menu-items-wrapper {
        left: calc(50% + 160px);
      }
    }

    #navitem-products {
      .outer-box {
        &:nth-child(2) {
          width: max-content;
          min-width: 312px;
          max-width: 330px;
        }

        &:last-child {
          width: max-content;
          min-width: 312px;
          max-width: 520px;
        }
      }
    }

    #navitem-download,
    #navitem-partners {
      .outer-box {
        &:first-child {
          width: max-content;
          min-width: 312px;
          max-width: 520px;
        }
      }
    }

    #navitem-resources {
      .outer-box {
        &:first-child {
          width: max-content;
          min-width: 312px;
          max-width: 320px;
        }
      }
    }
  }

  @media screen and (max-width: 1300px) {
    max-width: 756px;

    #navitem-products {
      .outer-box {
        &:last-child {
          max-width: 360px;
        }
      }

      .heading-nav-item {
        &:after {
          width: calc(100% - 20px);
        }
      }
    }
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

    #navitem-products {
      .outer-box {
        &:last-child {
          max-width: 100%;
        }
      }

      .heading-nav-item {
        color: #444444;
        background-color: #F9F9F9;

        &:after {
          content: none;
        }
      }
    }

    ul {
      display: flex;
      flex-direction: column;
      justify-content: initial;
      min-height: calc(100% - 54px);
    }

    .menu-items-wrapper {
      text-align: left;
      border-radius: 0;
    }

    .menu-wrapper {
      flex-direction: column;
      padding: 16px 0;
      height: 100%;
    }

    .mobile-heading-nav-item {
      box-sizing: border-box;
      cursor: pointer;
      display: block;
      font-size: 16px;
      letter-spacing: 0.04em;
      line-height: 24px;
      padding: 16px 32px;
      height: 56px;
      min-height: 56px;
      border-bottom: 1px solid #f2f2f2;
      color: #ff6f3d;
      position: relative;
      text-transform: uppercase;
      text-align: center;

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

    .outer-box {
      padding: 0 0 32px;
      width: 100%;

      &.with-border {
        &:after {
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

      &:not(:last-child) {
        margin-bottom: 32px;
      }

      &:last-child {
        padding: 0;
      }

      &.bg-gray {
        display: flex;
        flex-direction: column;
        padding: 32px 0;
      }
    }

    .dropdown-item {
      padding: 8px 24px 8px 58px;

      &:before {
        top: 8px;
        left: 24px;
      }

      &:not(:last-child) {
        margin-bottom: 8px;
      }

      &.no-bold {
        padding: 0 58px;
      }
    }

    .dropdown-item-title {
      line-height: 24px;
    }

    .dropdown-item-text {
      padding: 0 24px;
    }

    .dropdown-item-label {
      margin-bottom: 8px;
      padding: 8px 24px;
      font-weight: 600;
      font-size: 12px;
      line-height: 24px;
      letter-spacing: 0.05em;
    }

    .dropdown-item-text {
      line-height: 22px;
      padding-bottom: 8px;
    }

    .dropdown-item-group {
      &:not(:last-child) {
        margin-bottom: 8px;
      }

      .dropdown-item {
        &:not(:last-child) {
          margin-bottom: 0;
        }
      }
    }

    .inner-box {
      &:not(:last-child) {
        margin-bottom: 16px;
      }
    }

    .nav-2nd-menu-link {
      padding: 9px 24px 9px 56px;

      &:not(:last-child) {
        margin: 0;
      }
    }

    .nowrap {
      padding: 9px 24px 9px 56px;
      margin: 0;
    }

    #navitem-pricing-for-business,
    #navitem-pricing-for-dev {
      margin-bottom: 8px;
    }

    #navitem-pricing-for-business,
    #navitem-pricing-for-dev,
    #navitem-download-docs-enterprise,
    #navitem-download-workspace,
    #navitem-download-docspace,
    #navitem-download-docs-dev {
      margin-bottom: 0;
    }

    .outer-box-line {
      margin: 32px 24px;
    }

    .inner-box-links {
      margin-bottom: 0;
  
      #navitem-download-docspace-signin,
      #navitem-download-docs-enterprise-signin {
        padding: 9px 8px 9px 56px;
      }
  
      #navitem-download-docspace-signup,
      #navitem-download-docs-enterprise-signup {
        padding: 9px 24px 9px 8px;
      }
    }

    #navitem-resources {
      .menu-wrapper {
        padding: 16px 0 0 0;

        .outer-box {
          padding: 0;
          margin: 0;

          &:after {
            content: none;
          }

          &:first-child {
            margin-bottom: 72px;
            overflow: initial;
        
            &:after {
              content: "";
              position: absolute;
              left: 50%;
              bottom: -40px;
              width: calc(100% - 48px);
              height: 1px;
              transform: translateX(-50%);
              background-color: #CCCCCC;
              opacity: 0.4;
            }
          }

          &:last-child {
            margin-top: 32px;
            padding: 32px 0;
            background-color: #f9f9f9;
          }
        }
      }
    }

    #navitem-enterprise,
    #navitem-developers,
    #navitem-pricing,
    #navitem-partners {
      .menu-items-wrapper {
        display: flex;
        flex-direction: column;
        text-align: left;
        height: 100%;
      }
  
      .menu-wrapper {
        flex-direction: column;
        padding: 16px 0 0;
      }

      .outer-box {
        &:not(:last-child) {
          padding: 0;
          margin-bottom: 24px;
        }

        &.bg-gray {
          margin-top: auto;
        }
      }
    }

    #navitem-enterprise {
      .menu-wrapper {
        padding: 16px 0;
        height: initial;
      }
    }

    .phone-mobile {
      box-sizing: border-box;
      display: flex;
      margin-top: auto;
      padding: 15px 16px 15px 20px;
      font-size: 16px;
      font-weight: 700;
      line-height: 22px;
      width: 100%;
      color: #333333;
      background-color: #F6F6F6;
      text-decoration: none;

      &:before {
        content: "";
        margin-right: 13px;
        width: 24px;
        height: 24px;
        background-image: url("https://static-oforms.onlyoffice.com/icons/phone.svg");
      }
    }
  }

  @media screen and (max-width: 592px) {
    width: calc(100vw - 64px);
  }

  @media screen and (max-width: 399px) {
    .inner-box-links {
      flex-wrap: wrap;

      #navitem-download-docspace-signup,
      #navitem-download-docs-enterprise-signup {
        flex: 1 1 100%;
        padding: 9px 16px 9px 56px;
      }
    }
  }

  @media screen and (max-width: 375px) {
    width: calc(100vw - 32px);
  }
`;

export default StyledNav;
