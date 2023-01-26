import styled from "styled-components";

const StyledNavMenu = styled.div`
  .dropdown-item {
    display: block;
    border: 0;
    color: #444;
    font-size: 16px;
    font-weight: 700;
    cursor: pointer;
    line-height: 24px;
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
      top: 0px;
      background-image: url('https://static-oforms.onlyoffice.com/images/menu-pics/menu_icons.svg');
      background-repeat: no-repeat;
    }

    &:not(:last-child) {
      margin-bottom: 24px;
    }
  }

  .no-bold {
    font-weight: 400 !important;
    margin: 0 0 12px !important;
  }

  #navitem_features_workspace {
    margin-bottom: 0px;
  }

  #navitem_features_education {
    white-space: initial;
  }

  .heading-nav-item {
    display: block;
    font-size: 12px;
    font-weight: 600;
    line-height: 29px;
    letter-spacing: 0.08em;
    padding: 21px 20px 22px;
    cursor: pointer;
    margin: 0px;
    text-transform: uppercase;
  }

  .download-last-area {
    .download-inner-list {
        display: flex;

        > li {
            min-width: 312px;
            padding: 0 0 28px;

            &:last-child {
                position: relative;

                &:before {
                    background-color: #ebebeb;
                    content: "";
                    display: block;
                    height: 179px;
                    left: 0px;
                    position: absolute;
                    top: 0px;
                    width: 1px;
                }
            }
        }
    }

    .download-third-level {
        background-color: #F9F9F9;
        background-image: url(../images/menu_hosting.png);
        background-size: 180px 90px;
        background-repeat: no-repeat;
        background-position: 32px 32px;
        height: 168px;

        .menu_pic_div {
            margin: 0;
            padding: 0 32px 0 228px;
        }
    }
}

  @media (max-width: 1255px) {
    .heading-nav-item {
      padding: 20px 10px;
    }
  }

  .latest_news_date {
    color: #808080;
    font-size: 13px;
    line-height: 1.6em;
    margin: 0;
  }

  #navitem_features_docs_overview:before {
    background-position-y: -936px;
  }

  #navitem_fb_docs_cloud:before, #navitem_download_docs_cloud:before {
    background-position-y: -1092px;
  }

  #navitem_fd_conversion_api:before {
    background-position-y: -1118px;
  }

  #navitem_fd_get:before {
    background-position-y: -1040px;
  }

  #navitem_technology_partners:before {
    background-position-y: -1171px;
  }

  #navitem_download_docs_de:before, #navitem_prices_docs_dev:before, #navitem_fd_docs_dev:before {
    background-position-y: -832px;
  }

  #navitem_download_docs_builder:before, #navitem_fd_doc_builder:before {
    background-position-y: -858px;
  }

  #navitem_download_docs_ce:before {
    background-position-y: -988px;
  }

  #navitem_download_download_bundles:before {
    background-position-y: -1144px;
  }

  #navitem_download_code_git:before {
    background-position-y: -962px;
  }

  #navitem_features_spreadsheet_editor,
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

  #navitem_features_personal {
    &:before {
      background-position-y: -234px;
    }
  }

  #navitem_features_security {
    &:before {
      background-position-y: -650px;
    }
  }

  #navitem_features_presentation_editor {
    &:before {
      background-position-y: -934px;
    }
  }

  #navitem_features_form_creator {
    &:before {
      background-position-y: -728px;
    }
  }

  #navitem_features_pdf_reader {
    &:before {
      background-position-y: -756px;
    }
  }

  #navitem_fb_docs_ee {
    &:before {
      background-position-y: -806px;
    }
  }

  #navitem_fb_workspace {
    &:before {
      background-position-y: -25px;
    }
  }

  #navitem_fd_api_doc {
    &:before {
      background-position-y: -908px;
    }
  }

  #navitem_fd_doc_builder {
    &:before {
      background-position-y: -25px;
    }
  }

  #navitem_fd_docs_dev {
    &:before {
      background-position-y: -832px;
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

  #navitem_download_personal {
    &:before {
      background-position-y: -570px;
    }
  }

  #navitem_download_docs_ee {
    &:before {
      background-position-y: -806px;
    }
  }

  #navitem_download_workspace {
    &:before {
      background-position-y: -25px;
    }
  }

  #navitem_download_connectors {
    &:before {
      background-position-y: -572px;
    }
  }

  #navitem_download_desktop_mob {
    &: before {
      background-position-y: -155px;
    }
  }

  #navitem_download_docs_de {
    &:before {
      background-position-y: -832px;
    }
  }

  #navitem_download_docs_builder {
    &:before {
      background-position-y: -858px;
    }
  }

  #navitem_prices_docs_enterprice {
    &:before {
      background-position-y: -806px;
    }
  }

  #navitem_prices_workspace {
    &:before {
      background-position-y: -25px;
    }
  }

  #navitem_prices_docs_dev {
    &:before {
      background-position-y: -832px;
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
      background-position-y: -701px;
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

  #navitem_about_vacancies {
    &:before {
      background-position-y: -676px;
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

  #navitem_about_forum {
    &:before {
      background-position-y: -884px;
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

  #navitem_about_help {
    &:before {
      background-position-y: -625px;
    }
  }

  #navitem_about_webinars {
    &:before {
      background-position-y: -595px;
    }
  }

  #navitem_about_compare {
    &:before {
      background-position-y: -780px;
    }
  }

  #navitem_latest_events,
  #navitem_features_latest_releases,
  #navitem_download_compare,
  #navitem_features_oforms,
  #navitem_features_education,
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
  #navitem_integrations_moodle,
  #navitem_integrations_connectors,
  #navitem_integration_for_developers,
  #navitem_prices_reseller,
  #navitem_features_see_it,
  #navitem_fd_code,
  #navitem_download_hosting,
  #navitem_integrations_others {
    padding: 0 32px;

    &:before {
      display: none;
    }

    @media (max-width: 1150px) {
      padding: 7px 36px;
    }
  }

  .menu_pic_div {
    cursor: pointer;
    padding: 0 32px 32px;
    .menu_pic_header {
      color: #444;
      font-size: 14px;
      line-height: 1.6em;
      margin: 0;
      &:hover {
        color: #ff6f3d;
      }
    }
    .menu_pic_img {
      background-repeat: no-repeat;
      background-size: contain;
      height: 90px;
      width: 180px;

      &:not(:last-child) {
        margin-bottom: 16px;
      }

      &:last-child {
        margin-bottom: 8px;
      }
    }

    &:last-child {
      padding: 0 32px;
    }
  }

  .mobile_no_link {
    border-radius: 5px;
    background-color: #f5f5f5;
    margin: 0 32px 24px;
    color: #666;
    font-weight: 600;
    font-size: 13px;
    line-height: 24px;
    padding: 4px 12px;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    width: -webkit-fill-available;
    &:before {
      display: none;
    }
    &:hover {
      color: #666;
      cursor: default;
    }

    &.external-link {
      &:hover {
        color: #666;
        cursor: default;
      }
    }
  }

  #navitem_about_resources {
    margin: 0 32px 24px;
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
    padding: 0 32px 0 72px;
    text-decoration: none;
    font-feature-settings: 'tnum' on, 'lnum' on;

    &:not(:last-child) {
      margin-bottom: 12px;

      @media (max-width: 1150px) {
        margin-bottom: 0;
      }
    }
  }

  .nav_item_nowrap_link {
    display: inline-flex;
    &:first-child {
      padding: 0 8px 0 72px;
    }
    &:last-child {
      padding: 0 32px 0 8px;
      white-space: nowrap;
    }
  }

  .no-color-box {
    background-color: #ffffff !important;
  }

  .outer-box {
    align-items: initial;
    padding: 32px 0;
    &:first-child {
      border-bottom-left-radius: 9px;
    }
    &:last-child {
      background-color: #f9f9f9;
      border-bottom-right-radius: 9px;

      @media (min-width: 1150px) {
        width: min-content;
        max-width: 330px;
      }
    }

    @media (min-width: 1150px) {
      min-width: 312px;
      max-width: 385px;

      &.with_border {
        position: relative;

        &:after {
          content: "";
          position: absolute;
          top: 50%;
          right: 0;
          width: 1px;
          height: calc(100% - 64px);
          background-color: #cccccc;
          transform: translateY(-50%);
          opacity 0.4;
        }
      }
    }
    .inner-box {
      align-items: initial;

      &:not(:last-child) {
        margin-bottom: 24px;

        @media (max-width: 1150px) {
          margin-bottom: 0;
          padding: 2px 0 11px;
        }
      }

      .nowrap {
        flex-direction: row;

        &:not(:last-child) {
          margin-bottom: 12px;

          @media (max-width: 1150px) {
            margin-bottom: 0;
          }
        }

        .slash_text {
          color: #333333;
          margin: 0;
          line-height: 21px;
        }
      }
    }
  }

  #compare_img {
    background-image: url('https://static-oforms.onlyoffice.com/images/menu-pics/menu_compare_edition.svg');
  }

  #for_developers_img {
    background-image: url('https://static-oforms.onlyoffice.com/images/menu-pics/menu_for_developers.png');
  }

  #oforms_img {
    background-image: url('https://static-oforms.onlyoffice.com/images/menu-pics/menu_oforms.svg');
  }

  #see_it_img {
    background-image: url('https://static-oforms.onlyoffice.com/images/menu-pics/menu_see_it_in_act.png');
  }

  #git_code_img {
    background-image: url('https://static-oforms.onlyoffice.com/images/menu-pics/menu_code_git.png');
  }

  #hosting_img {
    background-image: url('https://static-oforms.onlyoffice.com/images/menu-pics/menu_hosting.png');
  }

  #reseller_img {
    background-image: url('https://static-oforms.onlyoffice.com/images/menu-pics/menu_reseller.svg');
  }

  #latest_events_img {
    background-image: url('https://static-oforms.onlyoffice.com/images/menu-pics/events.svg');
  }

  #latest_news_img {
    background-image: url('https://static-oforms.onlyoffice.com/images/menu-pics/blog_moodle_plugin.jpg');
  }

  #education_img {
    background-image: url('https://static-oforms.onlyoffice.com/images/menu-pics/menu_for_developers.png');
  }

  @media (min-width: 1150px) {
    #navitem_fd_docs_dev, 
    #navitem_fd_doc_builder, 
    #navitem_fd_api_doc {
      &:not(:last-child) {
        margin-bottom: 24px;
      }
    }

    #navitem_prices_reseller {
      line-height: 1.33em;
      white-space: initial;
    }

    #navitem_integrations_nextcloud,
    #navitem_integrations_owncloud,
    #navitem_integrations_confluence,
    #navitem_integrations_alfresco,
    #navitem_integrations_moodle,
    #navitem_integrations_others {
      padding: 0 32px 0 64px;
      font-size: 16px;
      font-weight: 700;
      line-height: 1.625em;
    }
  }

  @media (max-width: 1150px) {
    .dropdown-item {
      line-height: 1.5em;
      margin: 0 0 16px;
      padding: 7px 36px;
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
      padding: 6px 48px;
    }

    .nav_item_nowrap_link {
      font-size: 16px;
      line-height: 1.6em;
      &:first-child {
        padding: 6px 8px 6px 48px;
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
      letter-spacing: 0.03em;
      margin: 0px;
      position: relative;

      &:before {
        display: block;
        content: "";
        width: 10px;
        height: 10px;
        background-image: url('https://static-oforms.onlyoffice.com/icons/arrow-gray.svg');
        background-position: 50% 50%;
        background-repeat: no-repeat;
        background-size: auto 100%;
        position: absolute;
        right: 14px;
        top: 15px;
        transition: 0.1s linear;
      }
    }

    #see_it_div,
    #oforms_div,
    #education_div,
    #reseller_div,
    #latest_events_div,
    #fd_git_code_div,
    #hosting_div {
      display: none;
    }

    #navitem_features_desktop_mob_apps,
    #navitem_fb_other_integrations,
    #navitem_download_docs,
    #navitem_download_for_dev,
    #navitem_prices_for_business,
    #navitem_prices_for_dev {
      font-size: 13px;
      line-height: 32px;
      padding: 7px 36px 7px 8px;
      margin: 0 16px;
    }

    #navitem_download_docs,
    #navitem_download_workspace,
    #navitem_prices_workspace {
      margin-bottom: 0;
    }
  }
  @media (max-width: 600px) {
    .dropdown-item {
      white-space: unset;
    }
    .heading-nav-item {
      font-size: 16px;
      padding: 9px 36px 9px 18px;
    }
    .nav_item_nowrap_link:last-child {
      padding: 4px 16px 4px 48px;
    }
    .outer-box {
      .inner-box {
        .nowrap {
          display: flex;
          flex-wrap: wrap;
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

  @media (max-width: 1150px) {
    padding: 0;
    max-height: calc(100% - 54px);
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
