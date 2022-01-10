import React from "react";

import StyledNav from "./styled-nav";
import MenuItem from "../menu-item";
import Box from "./sub-components/box";
import LinkOO from "./sub-components/link";

const Nav = ({ onClick, t, stateMobilePND, ...rest }) => {
  return (
    <StyledNav stateMobile={stateMobilePND} {...rest}>
      <MenuItem heading="Products & Features" id="navitem_features">
        <Box className="menu_wrapper">
          <Box className="outer-box with_border">
            <LinkOO
              id="navitem_features_editors"
              href="/office-suite.aspx"
              className="dropdown-item"
            >
              ONLYOFFICE Docs
            </LinkOO>
            <Box className="inner-box">
              <LinkOO href="/document-editor.aspx" className="nav_2nd_menu_link">
                Document Editor
              </LinkOO>
              <LinkOO
                href="/spreadsheet-editor.aspx"
                className="nav_2nd_menu_link"
              >
                Spreadsheet Editor
              </LinkOO>
              <LinkOO
                href="/presentation-editor.aspx"
                className="nav_2nd_menu_link"
              >
                Presentation Editor
              </LinkOO>
            </Box>
            <LinkOO
              id="navitem_features_docs_editions"
              className="dropdown-item mobile_no_link"
            >
              Docs Editions
            </LinkOO>
            <Box className="inner-box">
              <LinkOO href="/docs-cloud.aspx" className="nav_2nd_menu_link">
                Cloud Edition
              </LinkOO>
              <LinkOO href="/docs-enterprise.aspx" className="nav_2nd_menu_link">
                Enterprise Edition
              </LinkOO>
              <LinkOO
                href="/developer-edition.aspx"
                className="nav_2nd_menu_link"
              >
                Developer Edition
              </LinkOO>
            </Box>
            <LinkOO
              id="navitem_features_clients_apps"
              href="/desktop.aspx"
              className="dropdown-item"
            >
              ONLYOFFICE for desktop
            </LinkOO>
            <LinkOO
              id="navitem_features_clients_mobile_ios"
              href="/office-for-ios.aspx"
              className="dropdown-item"
            >
              ONLYOFFICE for iOS
            </LinkOO>
            <LinkOO
              id="navitem_features_clients_mobile_android"
              href="/office-for-android.aspx"
              className="dropdown-item"
            >
              ONLYOFFICE for Android
            </LinkOO>
          </Box>
          <Box className="outer-box">
            <LinkOO
              id="navitem_features_workspace"
              href="/workspace.aspx"
              className="dropdown-item"
            >
              ONLYOFFICE Workspace
            </LinkOO>
            <Box className="inner-box">
              <LinkOO
                href="/document-management.aspx"
                className="nav_2nd_menu_link"
              >
                Documents
              </LinkOO>
              <LinkOO href="/mail.aspx" className="nav_2nd_menu_link">
                Mail
              </LinkOO>
              <LinkOO href="/crm.aspx" className="nav_2nd_menu_link">
                CRM
              </LinkOO>
              <LinkOO href="/projects.aspx" className="nav_2nd_menu_link">
                Projects
              </LinkOO>
              <LinkOO href="/calendar.aspx" className="nav_2nd_menu_link">
                Calendar
              </LinkOO>
            </Box>
            <LinkOO
              id="navitem_features_workspace_editions"
              className="dropdown-item mobile_no_link"
            >
              Workspace Editions
            </LinkOO>
            <Box className="inner-box">
              <LinkOO href="/cloud-office.aspx" className="nav_2nd_menu_link">
                Cloud Edition
              </LinkOO>
              <LinkOO
                href="/workspace-enterprise.aspx"
                className="nav_2nd_menu_link"
              >
                Enterprise Edition
              </LinkOO>
            </Box>
          </Box>
          <Box className="outer-box">
            <LinkOO
              id="navitem_features_security"
              href="/security.aspx"
              className="dropdown-item"
            >
              Security
            </LinkOO>
            <Box id="security_div" className="menu_pic_div">
              <div id="security_img" className="menu_pic_img"></div>
              <p id="security_header" className="menu_pic_header">
                Meet ONLYOFFICE Private Rooms where every symbol you type is
                encrypted <span className="nowrap">end-to-end</span>
              </p>
            </Box>
          </Box>
        </Box>
      </MenuItem>

      <MenuItem heading="Integrations" id="navitem_integrations">
        <Box className="menu_wrapper">
          <Box className="outer-box integrations">
            <LinkOO
              id="navitem_integrations_nextcloud"
              href="/office-for-nextcloud.aspx"
              className="dropdown-item"
            >
              Nextcloud
            </LinkOO>
            <LinkOO
              id="navitem_integrations_owncloud"
              href="/office-for-owncloud.aspx"
              className="dropdown-item"
            >
              ownCloud
            </LinkOO>
            <LinkOO
              id="navitem_integrations_confluence"
              href="/office-for-confluence.aspx"
              className="dropdown-item"
            >
              Confluence
            </LinkOO>
            <LinkOO
              id="navitem_integrations_alfresco"
              href="/office-for-alfresco.aspx"
              className="dropdown-item"
            >
              Alfresco
            </LinkOO>
            <LinkOO
              id="navitem_integrations_sharepoint"
              href="/office-for-sharepoint.aspx"
              className="dropdown-item"
            >
              SharePoint
            </LinkOO>
            <LinkOO
              id="navitem_integrations_liferay"
              href="/office-for-liferay.aspx"
              className="dropdown-item"
            >
              Liferay
            </LinkOO>
            <LinkOO
              id="navitem_integrations_humhub"
              href="/office-for-humhub.aspx"
              className="dropdown-item"
            >
              HumHub
            </LinkOO>
          </Box>
          <Box className="outer-box integrations">
            <LinkOO
              id="navitem_integrations_plone"
              href="/office-for-plone.aspx"
              className="dropdown-item"
            >
              Plone
            </LinkOO>
            <LinkOO
              id="navitem_integrations_nuxeo"
              href="/office-for-nuxeo.aspx"
              className="dropdown-item"
            >
              Nuxeo
            </LinkOO>
            <LinkOO
              id="navitem_integrations_chamilo"
              href="/office-for-chamilo.aspx"
              className="dropdown-item"
            >
              Chamilo
            </LinkOO>
            <LinkOO
              id="navitem_integrations_redmine"
              href="/office-for-redmine.aspx"
              className="dropdown-item"
            >
              Redmine
            </LinkOO>
            <LinkOO
              id="navitem_integrations_jira"
              href="/office-for-jira.aspx"
              className="dropdown-item"
            >
              Jira
            </LinkOO>
            <LinkOO
              id="navitem_integrations_connectors"
              href="/all-connectors.aspx"
              className="dropdown-item"
            >
              Others
            </LinkOO>
          </Box>
          <Box className="outer-box">
            <LinkOO
              id="navitem_integration_for_developers"
              className="dropdown-item"
              href="/developer-edition.aspx"
            >
              For developers
            </LinkOO>
            <Box id="for_developers_div" className="menu_pic_div">
              <div id="for_developers_img" className="menu_pic_img"></div>
              <p id="for_developers_header" className="menu_pic_header">
                Integrate ONLYOFFICE Docs to bring document editing to your app
                users
              </p>
            </Box>
          </Box>
        </Box>
      </MenuItem>

      <MenuItem heading="Pricing" id="navitem_prices">
        <Box className="menu_wrapper">
          <Box className="outer-box">
            <Box className="pricing-box">
              <LinkOO
                id="navitem_prices_docs"
                className="dropdown-item mobile_no_link"
              >
                ONLYOFFICE Docs
              </LinkOO>
              <Box className="inner-box">
                <LinkOO
                  href="/docs-enterprise-prices.aspx"
                  className="nav_2nd_menu_link"
                >
                  Enterprise Edition
                </LinkOO>
                <LinkOO
                  href="/developer-edition-prices.aspx"
                  className="nav_2nd_menu_link"
                >
                  Developer Edition
                </LinkOO>
              </Box>
              <LinkOO
                id="navitem_prices_workspace"
                className="dropdown-item mobile_no_link"
              >
                ONLYOFFICE Workspace
              </LinkOO>
              <Box className="inner-box">
                <LinkOO href="/saas.aspx" className="nav_2nd_menu_link">
                  Cloud Service
                </LinkOO>
                <LinkOO
                  href="/workspace-enterprise-prices.aspx"
                  className="nav_2nd_menu_link"
                >
                  Server Enterprise
                </LinkOO>
              </Box>
            </Box>
          </Box>
          <Box className="outer-box">
            <LinkOO
              id="navitem_prices_reseller"
              href="/find-partners.aspx"
              className="dropdown-item"
            >
              Buy from an ONLYOFFICE reseller
            </LinkOO>
            <Box id="reseller_div" className="menu_pic_div">
              <div id="reseller_img" className="menu_pic_img"></div>
              <p id="reseller_header" className="menu_pic_header">
                Find out the list of all the authorized ONLYOFFICE resellers in
                your area
              </p>
            </Box>
          </Box>
        </Box>
      </MenuItem>

      <MenuItem heading="Get ONLYOFFICE" id="navitem_download">
        <Box className="menu_wrapper">
          <Box className="outer-box">
            <LinkOO
              className="dropdown-item mobile_no_link"
              id="navitem_download_docs"
            >
              ONLYOFFICE Docs
            </LinkOO>
            <Box className="inner-box">
              <LinkOO
                className="nav_2nd_menu_link"
                id="navitem_download_signup_docs"
                href="/docs-registration.aspx"
              >
                Sign up for cloud
              </LinkOO>
              <LinkOO
                id="navitem_download_onpremises_docs"
                href="/download-docs.aspx?from=downloadintegrationmenu"
                className="nav_2nd_menu_link"
              >
                Install on-premises
              </LinkOO>
            </Box>
            <LinkOO
              className="dropdown-item mobile_no_link"
              id="navitem_download_workspace"
            >
              ONLYOFFICE Workspace
            </LinkOO>
            <Box className="inner-box">
              <Box className="nowrap">
                <LinkOO
                  className="nav_item_nowrap_link"
                  id="navitem_download_signin"
                  href="/signin.aspx"
                >
                  Sign in
                </LinkOO>
                <p className="slash_text">/</p>
                <LinkOO
                  className="nav_item_nowrap_link second"
                  id="navitem_download_signup"
                  href="/registration.aspx"
                >
                  Sign up for cloud
                </LinkOO>
              </Box>
              <LinkOO
                id="navitem_download_onpremises"
                href="/download-workspace.aspx"
                className="nav_2nd_menu_link"
              >
                Install on-premises
              </LinkOO>
            </Box>
            <LinkOO
              className="dropdown-item"
              id="navitem_download_desktop"
              href="download-desktop.aspx"
            >
              ONLYOFFICE desktop and mobile apps
            </LinkOO>
            <LinkOO
              id="navitem_download_products"
              className="dropdown-item"
              href="download.aspx"
            >
              Other products
            </LinkOO>
          </Box>
          <Box className="outer-box">
            <LinkOO
              id="navitem_download_compare"
              className="dropdown-item"
              href="/compare-editions.aspx"
            >
              Compare editions
            </LinkOO>
            <Box id="compare_div" className="menu_pic_div">
              <div id="compare_img" className="menu_pic_img"></div>
              <p id="compare_header" className="menu_pic_header">
                Choose the ONLYOFFICE edition that suits you best.
              </p>
            </Box>
          </Box>
        </Box>
      </MenuItem>

      <MenuItem heading="Partners" id="navitem_partners">
        <Box className="menu_wrapper">
          <Box className="outer-box">
            <LinkOO
              id="navitem_hosters"
              href="affiliates.aspx"
              className="dropdown-item"
            >
              Affiliates
            </LinkOO>
            <LinkOO
              id="navitem_resellers"
              href="resellers.aspx"
              className="dropdown-item"
            >
              Resellers
            </LinkOO>
            <LinkOO
              id="navitem_find_partners"
              href="find-partners.aspx"
              className="dropdown-item"
            >
              Find partners
            </LinkOO>
            <LinkOO
              id="navitem_submit_request"
              href="partnership-request.aspx"
              className="dropdown-item"
            >
              Submit request
            </LinkOO>
          </Box>
          <Box className="outer-box">
            <LinkOO
              id="navitem_latest_events"
              href="https://www.onlyoffice.com/blog/2021/03/onlyoffice-joins-the-linux-foundation-as-a-silver-member/"
              className="dropdown-item"
            >
              Latest events
            </LinkOO>
            <Box id="latest_events_div" className="menu_pic_div">
              <div id="latest_events_img" className="menu_pic_img"></div>
              <p id="latest_events_header" className="menu_pic_header">
                ONLYOFFICE joins the Linux Foundation as a silver member
              </p>
            </Box>
          </Box>
        </Box>
      </MenuItem>

      <MenuItem heading="About" id="navitem_about">
        <Box className="menu_wrapper">
          <Box className="outer-box">
            <LinkOO
              id="navitem_about_about"
              href="about.aspx"
              className="dropdown-item"
            >
              About ONLYOFFICE
            </LinkOO>
            <LinkOO
              id="navitem_about_blog"
              href="https://www.onlyoffice.com/blog/"
              className="dropdown-item"
            >
              Blog
            </LinkOO>
            <LinkOO
              id="navitem_about_contribute"
              href="contribute.aspx"
              className="dropdown-item"
            >
              Contribute
            </LinkOO>
            <LinkOO
              id="navitem_about_customers"
              href="customers.aspx"
              className="dropdown-item"
            >
              Customers
            </LinkOO>
            <LinkOO
              id="navitem_about_awards"
              href="awards.aspx"
              className="dropdown-item"
            >
              Awards
            </LinkOO>
            <LinkOO
              id="navitem_about_events"
              href="events.aspx"
              className="dropdown-item"
            >
              Events
            </LinkOO>
            <LinkOO
              id="navitem_about_pressdownloads"
              href="press-downloads.aspx"
              className="dropdown-item"
            >
              Press downloads
            </LinkOO>
            <LinkOO
              id="navitem_about_whitepapers"
              href="whitepapers.aspx"
              className="dropdown-item"
            >
              White papers
            </LinkOO>
            <LinkOO
              id="navitem_about_trainingcourses"
              href="training-courses.aspx"
              className="dropdown-item"
            >
              Training courses
            </LinkOO>
            <LinkOO
              id="navitem_about_giftshop"
              href="https://shop.spreadshirt.com/onlyoffice"
              className="dropdown-item"
            >
              Gift shop
            </LinkOO>
            <LinkOO
              id="navitem_about_contacts"
              href="contacts.aspx"
              className="dropdown-item"
            >
              Contacts
            </LinkOO>
          </Box>
          <Box className="outer-box">
            <LinkOO
              id="navitem_features_latest_releases"
              href="https://www.onlyoffice.com/blog/"
              className="dropdown-item"
            >
              Latest news
            </LinkOO>
            <Box id="latest_news_div" className="menu_pic_div">
              <div id="latest_news_img" className="menu_pic_img"></div>
              <p className="latest_news_date">4 October 2021</p>
              <p id="latest_news_header" className="menu_pic_header">
                ONLYOFFICE Desktop Editors v6.4 with improved ARM support and
                conditional formatting
              </p>
            </Box>
          </Box>
        </Box>
      </MenuItem>
    </StyledNav>
  );
};

export default Nav;
