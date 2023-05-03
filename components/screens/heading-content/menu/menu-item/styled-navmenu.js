import styled from "styled-components";

const StyledNavMenu = styled.div`
  .heading-nav-item {
    display: block;
    font-size: 12px;
    font-weight: 600;
    line-height: 29px;
    letter-spacing: 0.08em;
    padding: 21px 20px 22px;
    cursor: pointer;
    margin: 0;
    text-transform: uppercase;
  }

  .dropdown-item {
    display: flex;
    gap: 11px;
    align-items: center;
    border: 0;
    color: #444;
    font-size: 16px;
    font-weight: 700;
    cursor: pointer;
    line-height: 24px;
    text-decoration: none;
    white-space: nowrap;
    position: relative;

    &:before {
      content: "";
      display: block;
      width: 24px;
      height: 24px;
      background-image: url('https://static-oforms.onlyoffice.com/images/menu-pics/menu_icons.svg');
      background-repeat: no-repeat;
    }

    &.without-icon {
      &:before {
        content: none;
      }
    }

    &.mobile-no-link {
      border-radius: 5px;
      color: #666;
      font-weight: 600;
      font-size: 13px;
      line-height: 24px;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      width: --webkit-fill-available;

      &:before {
        content: none;
      }

      &:hover {
        color: #666;
        cursor: default;
      }

      &.external-link {
        color: #666;

        &:hover {
          color: #666;
          cursor: default;
        }
      }
    }
  }

  .outer-box {
    display: flex;
    gap: 24px;
    padding: 32px;

    &:first-child {
      border-bottom-left-radius: 9px;
    }

    &:last-child {
      border-bottom-right-radius: 9px;
    }

    &.gray {
      background-color: #f9f9f9;
    }

    &.gap38 {
      gap: 38px;
    }

    &.with-border {
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
        opacity: 0.4;
      }
    }
    
    &.with-horizontal-border {
      position: relative;

      &:after {
        content: "";
        position: absolute;
        top: 100%;
        right: 32px;
        height: 1px;
        width: calc(100% - 64px);
        background-color: #cccccc;
        transform: translateY(-50%);
        opacity: 0.4;
      }
    }
  }

  .inner-box {
    display: flex;
    flex-direction: column;
    gap: 22px;
  }

  .outer-box-wrapper {
    display: grid;
    grid-template-columns: 1fr;
  }

  .link-wrapper {
    max-width: 248px;
    font-weight: 400;
    font-size: 14px;
    line-height: 150%;
    color: #666666;
    text-align: left;
    gap: 8px;
  }

  .link-wrapper-with-img {
    display: flex;
    flex-direction: column;
    gap: 16px;
    font-weight: 400;
    font-size: 14px;
    line-height: 150%;
    color: #444444;
    max-width: 248px;

    &:hover {
      color: #444;
    }

    .link-wrapper-with-img_link {
      font-weight: 700;
      font-size: 16px;
      line-height: 150%;
      color: #444444;
      width: inherit;

      &:hover {
        color: #ff6f3d;
      }

      &:before {
        content: none;
      }
    }

    .link-wrapper-with-img_img {
      width: 180px;
      height: 90px;
    }
  }

  .second-link-wrapper {
    display: flex;
    flex-direction: column;
    gap: 16px;
    color: #444;

    .dropdown-item:hover {
      color: #444;
      cursor: default;
    }

    .second-link-wrapper_twins {
      display: flex;
      align-items: center;
      flex-direction: row;
      justify-content: left;
      gap: 4px;

      .second-link-wrapper_link {
        padding: 0;

        &:first-child {
          padding-left: 40px;
        }
      }
    }

    .second-link-wrapper_link {
      font-weight: 400;
      font-size: 14px;
      line-height: 160%;
      color: #444444;
      padding-left: 40px;

      &:hover {
        color: #ff6f3d;
      }
    }
  }


  @media (max-width: 1150px) {
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

    .menu-items-wrapper {
      height: 100%;
      display: grid;
      grid-template-rows: max-content 1fr;
      grid-template-columns: 1fr;
    }
    
    .link-wrapper-with-img {
      max-width: 380px;
    }

    .menu-wrapper_dev, .menu-wrapper_partners {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .outer-box {
      padding: 24px;

      &:first-child {
        padding-top: 32px;
      }

      &:last-child {
        padding-bottom: 32px;
      }
      
      &.gap38 {
        gap: 50px;
      }
      
      &.with-border {
        &:after {
          top: 100%;
          right: 32px;
          height: 1px;
          width: calc(100% - 48px);
          background-color: #cccccc;
          transform: translateY(-50%);
        }
      }
      
      &.with-horizontal-border {
        &:after {
          width: calc(100% - 48px);
        }
      }
      
      &.without-border-on-mobile {
        &:after {
          content: none;
        }
      }
      
      &.without-pb-on-mobile {
        padding-bottom: 0;
      }
    }
    
    .inner-box {
      position: relative;
      width: 100%;
      &.with-border:after {
        position: absolute;
        content: "";
        top: calc(100% + 25px);
        right: 0;
        height: 1px;
        width: 100%;
        background-color: #cccccc;
        transform: translateY(-50%);
        opacity: 0.4;
      }
    }

    .link-wrapper {
      max-width: 380px;
    }
  }

  @media (max-width: 600px) {

  }


  #see_it_in_action {
    background-image: url('https://static-oforms.onlyoffice.com/images/menu-pics/menu_see_it_in_act.png');
  }

  #reseller {
    background-image: url("https://static-oforms.onlyoffice.com/images/menu-pics/menu_reseller.svg");
  }
  
  #events {
    background-image: url("https://static-oforms.onlyoffice.com/images/menu-pics/events.svg");
  }


  #navitem_products_docs:before {
    background-position-y: 0;
  }

  #navitem_products_docspace:before {
    background-image: url("https://static-oforms.onlyoffice.com/icons/docs_cloud.svg");
  }

  #navitem_products_workspace:before {
    background-position-y: -25px;
  }

  #navitem_products_connectors:before {
    background-image: url("https://static-oforms.onlyoffice.com/icons/connectors.svg");
  }

  #navitem_product_clients_apps:before {
    background-position-y: -52px;
  }

  #navitem_product_clients_mobile_ios:before {
    background-position-y: -78px;
  }

  #navitem_product_clients_mobile_android:before {
    background-position-y: -104px;
  }

  #navitem_product_find_and_fill_out_oforms:before {
    background-position-y: -730px;
  }

  #navitem_product_convert_text_files:before {
    background-image: url("https://static-oforms.onlyoffice.com/icons/conversion_doc.svg");
  }

  #navitem_product_convert_spreadsheets:before {
    background-image: url("https://static-oforms.onlyoffice.com/icons/conversion_tabs.svg");
  }

  #navitem_product_convert_presentations:before {
    background-image: url("https://static-oforms.onlyoffice.com/icons/conversion_pres.svg");
  }

  #navitem_product_convert_pdfs:before {
    background-image: url("https://static-oforms.onlyoffice.com/icons/conversion_pdf.svg");
  }


  #navitem_dev_docs_developer:before {
    background-position-y: -833px;
  }

  #navitem_dev_conversion_api:before {
    background-position-y: -1118px;
  }

  #navitem_dev_document_builder:before {
    background-position-y: -25px;
  }

  #navitem_dev_api_documentation:before {
    background-position-y: -910px;
  }

  #navitem_dev_pricing:before {
    background-image: url("https://static-oforms.onlyoffice.com/icons/pricing.svg");
  }

  #navitem_dev_get_it_now:before {
    background-position-y: -1040px;
  }


  #navitem_get_onlyoffice_docs_enterprise:before {
    background-position-y: -807px;
  }

  #navitem_get_onlyoffice_docspace:before {
    background-image: url("https://static-oforms.onlyoffice.com/icons/docs_cloud.svg");
  }

  #navitem_get_onlyoffice_workspace:before {
    background-position-y: -25px;
  }

  #navitem_get_only_office_connectors:before {
    background-position-y: -570px;
  }

  #navitem_get_only_office_download_desktop:before {
    background-position-y: -155px;
  }

  #navitem_get_onlyoffice_docs_dev:before {
    background-position-y: -833px;
  }

  #navitem_get_onlyoffice_docs_builder:before {
    background-position-y: -858px;
  }

  #navitem_get_onlyoffice_docs_community:before {
    background-position-y: -990px;
  }

  #navitem_get_onlyoffice_code_git:before {
    background-position-y: -962px;
  }


  #navitem_prices_docspace:before {
    background-image: url("https://static-oforms.onlyoffice.com/icons/docs_cloud.svg");
  }

  #navitem_prices_docs_enterprice:before {
    background-position-y: -807px;
  }

  #navitem_prices_workspace:before {
    background-position-y: -25px;
  }

  #navitem_prices_docs_dev:before {
    background-position-y: -833px;
  }
  
  
  #navitem_partners_resellers:before {
    background-position-y: -208px;
  }

  #navitem_partners_hosters:before {
    background-position-y: -182px;
  }

  #navitem_partners_providers:before {
    background-image: url("https://static-www.onlyoffice.com/v9.5.0/images/menu_hosting_providers.svg");
  }

  #navitem_partners_technology_partners:before {
    background-position-y: -1170px;
  }

  #navitem_partners_find_partners:before {
    background-position-y: -700px;
  }

  #navitem_partners_submit_request:before {
    background-position-y: -262px;
  }


  #navitem_resources_about {
    &:before {
      background-position-y: -286px;
    }
  }
  
  #navitem_resources_blog {
    &:before {
      background-position-y: -312px;
    }
  }
  
  #navitem_resources_contribute {
    &:before {
      background-position-y: -337px;
    }
  }
  
  #navitem_resources_customers {
    &:before {
      background-position-y: -361px;
    }
  }
  
  #navitem_resources_vacancies {
    &:before {
      background-position-y: -676px;
    }
  }
  
  #navitem_resources_awards {
    &:before {
      background-position-y: -390px;
    }
  }
  
  #navitem_resources_events {
    &:before {
      background-position-y: -468px;
    }
  }
  
  #navitem_resources_forum {
    &:before {
      background-position-y: -884px;
    }
  }
  
  #navitem_resources_pressdownloads {
    &:before {
      background-position-y: -416px;
    }
  }
  #navitem_resources_whitepapers {
    &:before {
      background-position-y: -442px;
    }
  }
  #navitem_resources_training_courses {
    &:before {
      background-position-y: -493px;
    }
  }
  #navitem_resources_giftshop {
    &:before {
      background-position-y: -519px;
    }
  }
  #navitem_resources_contacts {
    &:before {
      background-position-y: -546px;
    }
  }
  #navitem_resources_help {
    &:before {
      background-position-y: -625px;
    }
  }
  #navitem_resources_webinars {
    &:before {
      background-position-y: -595px;
    }
  }
  #navitem_resources_compare {
    &:before {
      background-position-y: -780px;
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
    box-sizing: border-box;
    box-shadow: unset;
    overflow-x: hidden;
  }
`;

export { StyledNavMenu, StyledMenuItemsWrapper };