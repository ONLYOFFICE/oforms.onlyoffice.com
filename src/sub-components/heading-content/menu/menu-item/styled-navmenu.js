import styled from "styled-components";
import menu_icons from "../../../../../static/images/menu-pics/menu_logo_icons.svg";
import menu_security from "../../../../../static/images/menu-pics/menu_security.svg";
import menu_reseller from "../../../../../static/images/menu-pics/menu_reseller.svg";
import menu_latest_events from "../../../../../static/images/menu-pics/onlyoffice_linux_foundation_member.jpg";
import menu_latest_news from "../../../../../static/images/menu-pics/onlyoffice_desktop_editors_6.4.jpg";
import menu_for_developers from "../../../../../static/images/menu-pics/menu_for_developers.png";
import menu_compare from "../../../../../static/images/menu-pics/menu_compare_edition.svg";
import arrow_gray from "../../../../../static/icons/arrow-gray.svg";

const StyledNavMenu = styled.div`
  .dropdown-item {
    display: block;
    border: 0;
    color: #444;
    font-size: 16px;
    font-weight: 700;
    cursor: pointer;
    line-height: 36px;
    margin: 0;
    padding: 0 32px 0 68px;
    text-decoration: none;
    white-space: nowrap;
    position: relative;
    &:before {
      content: "";
      display: block;
      width: 24px;
      height: 24px;
      position: absolute;
      left: 32px;
      top: 6px;
      background-image: url(${menu_icons});
      background-repeat: no-repeat;
    }
  }

  .heading-nav-item {
    display: block;
    font-size: 12px;
    font-weight: 600;
    line-height: 29px;
    letter-spacing: 0.04em;
    padding: 21px 0;
    margin: 0px;
    text-transform: uppercase;
  }

  .latest_news_date {
    color: #808080;
    font-size: 13px;
    line-height: 1.6em;
    margin: 0;
  }

  #navitem_features_clients_apps {
    &:before {
      background-position-y: -52px;
    }
  }

  #navitem_features_clients_mobile_ios {
    &:before {
      background-position-y: -78px;
    }
  }

  #navitem_features_clients_mobile_android {
    &:before {
      background-position-y: -104px;
    }
  }

  #navitem_features_workspace {
    &:before {
      background-position-y: -25px;
    }
  }

  #navitem_download_desktop {
    &:before {
      background-position-y: -155px;
    }
  }

  #navitem_download_products {
    &:before {
      background-position-y: -130px;
    }
  }

  #navitem_hosters {
    &:before {
      background-position-y: -182px;
    }
  }

  #navitem_resellers {
    &:before {
      background-position-y: -208px;
    }
  }

  #navitem_find_partners {
    &:before {
      background-position-y: -233px;
    }
  }

  #navitem_submit_request {
    &:before {
      background-position-y: -262px;
    }
  }

  #navitem_about_about {
    &:before {
      background-position-y: -286px;
    }
  }
  #navitem_about_blog {
    &:before {
      background-position-y: -312px;
    }
  }

  #navitem_about_contribute {
    &:before {
      background-position-y: -337px;
    }
  }

  #navitem_about_customers {
    &:before {
      background-position-y: -361px;
    }
  }

  #navitem_about_awards {
    &:before {
      background-position-y: -390px;
    }
  }

  #navitem_about_events {
    &:before {
      background-position-y: -468px;
    }
  }

  #navitem_about_pressdownloads {
    &:before {
      background-position-y: -416px;
    }
  }

  #navitem_about_whitepapers {
    &:before {
      background-position-y: -442px;
    }
  }

  #navitem_about_training_courses {
    &:before {
      background-position-y: -493px;
    }
  }

  #navitem_about_giftshop {
    &:before {
      background-position-y: -519px;
    }
  }

  #navitem_about_contacts {
    &:before {
      background-position-y: -546px;
    }
  }

  #navitem_latest_events,
  #navitem_features_latest_releases,
  #navitem_download_compare,
  #navitem_features_security,
  #navitem_integrations_jira,
  #navitem_integrations_nextcloud,
  #navitem_integrations_owncloud,
  #navitem_integrations_confluence,
  #navitem_integrations_alfresco,
  #navitem_integrations_sharepoint,
  #navitem_integrations_liferay,
  #navitem_integrations_humhub,
  #navitem_integrations_plone,
  #navitem_integrations_nuxeo,
  #navitem_integrations_chamilo,
  #navitem_integrations_redmine,
  #navitem_integrations_connectors,
  #navitem_integration_for_developers,
  #navitem_prices_reseller {
    padding: 0 32px;
    &:before {
      display: none;
    }

    @media (max-width: 1024px) {
      padding: 7px 16px;
    }
  }

  .menu_pic_div {
    cursor: pointer;
    padding: 12px 32px 0 32px;
    .menu_pic_header {
      color: #444;
      font-size: 14px;
      line-height: 1.6em;
      padding-bottom: 10px;
      &:hover {
        color: #ff6f3d;
      }
    }
    .menu_pic_img {
      background-repeat: no-repeat;
      background-size: contain;
      height: 88px;
      margin-bottom: 16px;
      width: 180px;
    }
  }

  .mobile_no_link {
    background-color: #f5f5f5;
    padding-left: 12px;
    margin: 0 32px;
    color: #666;
    font-weight: 600;
    font-size: 13px;
    text-transform: uppercase;
    width: -webkit-fill-available;
    &:before {
      display: none;
    }
    &:hover {
      color: #666;
      cursor: default;
    }
  }

  .nav_2nd_menu_link {
    display: block;
    text-transform: none;
    background: none;
    border: 0;
    color: #444;
    font-size: 14px;
    cursor: pointer;
    line-height: 1.6em;
    margin: 0;
    padding: 4px 32px 4px 72px;
    text-decoration: none;
  }

  .nav_item_nowrap_link {
    display: inline-flex;
    &:first-child {
      padding: 4px 8px 4px 72px;
    }
    &:last-child {
      padding: 4px 48px 4px 8px;
      white-space: nowrap;
    }
  }

  .outer-box {
    padding: 27px 0;
    &:first-child {
      border-bottom-left-radius: 9px;
    }
    &.integrations {
      min-width: 180px;
    }
    &:last-child {
      background-color: #f9f9f9;
      border-bottom-right-radius: 9px;
      max-width: 244px;
    }
    &.with_border {
      border-right: 1px solid #f5f5f5;
    }

    .inner-box {
      padding: 10px 0;

      .nowrap {
        flex-direction: row;

        .slash_text {
          color: #333333;
          margin: 0;
          line-height: 21px;
          padding: 4px 0;
        }
      }
    }
  }

  #compare_img {
    background-image: url(${menu_compare});
  }

  #for_developers_img {
    background-image: url(${menu_for_developers});
  }

  #security_img {
    background-image: url(${menu_security});
  }

  #reseller_img {
    background-image: url(${menu_reseller});
  }

  #latest_events_img {
    background-image: url(${menu_latest_events});
  }

  #latest_news_img {
    background-image: url(${menu_latest_news});
  }

  @media screen and (min-width: 1024px) {
    #navitem_prices_reseller {
      line-height: 1.33em;
      padding-top: 10px;
      white-space: initial;
    }
  }

  @media screen and (max-width: 1024px) {
    .dropdown-item {
      line-height: 1.5em;
      padding: 7px 16px;
      &:before {
        display: none;
      }
    }

    .mobile_no_link {
      margin: 0 16px;
    }

    .nav_2nd_menu_link {
      font-size: 16px;
      line-height: 1.6em;
      padding: 6px 32px;
    }

    .nav_item_nowrap_link {
      font-size: 16px;
      line-height: 1.6em;
      &:first-child {
        padding: 6px 8px 6px 32px;
      }

      &:last-child {
        padding: 6px 48px 6px 8px;
      }
    }

    .outer-box {
      border: none !important;
      border-radius: unset !important;
      padding: 0;
      .inner-box {
        padding: 2px 0 11px;

        .nowrap .slash_text {
          line-height: 1.6em;
          padding: 6px 0;
        }
      }

      &:last-child {
        background-color: unset;
      }

      .pricing-box {
        width: 100%;
      }
    }

    .heading-nav-item {
      cursor: pointer;
      font-size: 18px;
      font-weight: 700;
      line-height: 1.33em;
      padding: 12px 36px 12px 18px;
      margin: 0px;
      position: relative;

      &:before {
        display: block;
        content: "";
        width: 10px;
        height: 10px;
        background-image: url(${arrow_gray});
        background-position: 50% 50%;
        background-repeat: no-repeat;
        background-size: auto 100%;
        position: absolute;
        right: 14px;
        top: 15px;
        transition: 0.1s linear;
      }
    }

    #compare_div,
    #for_developers_div,
    #latest_news_div,
    #reseller_div,
    #security_div,
    #latest_events_div {
      display: none;
    }
  }
  @media (max-width: 600px) {
    .dropdown-item {
      white-space: unset;
    }
    .heading-nav-item {
      font-size: 16px;
    }
    .nav_item_nowrap_link:last-child {
      padding: 6px 8px 6px 32px;
    }
    .outer-box {
      .inner-box {
        .nowrap {
          flex-direction: column;
          .slash_text {
            display: none;
          }
        }
      }
    }
  }
`;

const StyledMenuItemsWrapper = styled.div`
  width: auto;
  height: auto;
  margin: auto;
  background-color: white;
  border-bottom-left-radius: 9px;
  border-bottom-right-radius: 9px;
  z-index: 5000;
  position: absolute;
  display: flex;
  box-shadow: 0 20px 50px rgba(85, 85, 85, 0.15);

  @media (max-width: 1024px) {
    padding: 0;
    background-color: #fff;
    max-height: calc(100% - 54px);
    height: 100vh;
    margin: 0;
    position: absolute;
    left: ${(props) => (props.isOpen ? "0" : "-120vw")};
    top: 0;
    overflow: auto;
    text-align: center;
    font-size: 16px;
    transition: right 0.5s;
    width: 100%;
    z-index: 5;
    display: block;
    padding-top: 8px;
    box-sizing: border-box;
    box-shadow: unset;
    overflow-x: hidden;
  }
`;

export { StyledNavMenu, StyledMenuItemsWrapper };
