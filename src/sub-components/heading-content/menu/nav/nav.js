import React from "react";

import StyledNav from "./styled-nav";
import MenuItem from "../menu-item";
import Box from "./sub-components/box";
import Link from "../../../../../components/link";

const Nav = ({ onClick, t, stateMobilePND, ...rest }) => {
  return (
    <StyledNav stateMobile={stateMobilePND} {...rest}>
      <MenuItem heading="Products & Features" id="navitem_features">
        <Box className="menu_wrapper">
          <Box className="outer-box with_border">
            <Link
              id="navitem_features_editors"
              href="https://onlyoffice.com/office-suite.aspx"
              className="dropdown-item"
            >
              ONLYOFFICE Docs
            </Link>
            <Box className="inner-box">
              <Link href="https://onlyoffice.com/document-editor.aspx" className="nav_2nd_menu_link">
                Document Editor
              </Link>
              <Link
                href="https://onlyoffice.com/spreadsheet-editor.aspx"
                className="nav_2nd_menu_link"
              >
                Spreadsheet Editor
              </Link>
              <Link
                href="https://onlyoffice.com/presentation-editor.aspx"
                className="nav_2nd_menu_link"
              >
                Presentation Editor
              </Link>
            </Box>
            <Link
              id="navitem_features_docs_editions"
              className="dropdown-item mobile_no_link"
            >
              Docs Editions
            </Link>
            <Box className="inner-box">
              <Link href="https://onlyoffice.com/docs-cloud.aspx" className="nav_2nd_menu_link">
                Cloud Edition
              </Link>
              <Link href="https://onlyoffice.com/docs-enterprise.aspx" className="nav_2nd_menu_link">
                Enterprise Edition
              </Link>
              <Link
                href="https://onlyoffice.com/developer-edition.aspx"
                className="nav_2nd_menu_link"
              >
                Developer Edition
              </Link>
            </Box>
            <Link
              id="navitem_features_clients_apps"
              href="https://onlyoffice.com/desktop.aspx"
              className="dropdown-item"
            >
              ONLYOFFICE for desktop
            </Link>
            <Link
              id="navitem_features_clients_mobile_ios"
              href="https://onlyoffice.com/office-for-ios.aspx"
              className="dropdown-item"
            >
              ONLYOFFICE for iOS
            </Link>
            <Link
              id="navitem_features_clients_mobile_android"
              href="https://onlyoffice.com/office-for-android.aspx"
              className="dropdown-item"
            >
              ONLYOFFICE for Android
            </Link>
          </Box>
          <Box className="outer-box">
            <Link
              id="navitem_features_workspace"
              href="https://onlyoffice.com/workspace.aspx"
              className="dropdown-item"
            >
              ONLYOFFICE Workspace
            </Link>
            <Box className="inner-box">
              <Link
                href="https://onlyoffice.com/document-management.aspx"
                className="nav_2nd_menu_link"
              >
                Documents
              </Link>
              <Link href="https://onlyoffice.com/mail.aspx" className="nav_2nd_menu_link">
                Mail
              </Link>
              <Link href="https://onlyoffice.com/crm.aspx" className="nav_2nd_menu_link">
                CRM
              </Link>
              <Link href="https://onlyoffice.com/projects.aspx" className="nav_2nd_menu_link">
                Projects
              </Link>
              <Link href="https://onlyoffice.com//calendar.aspx" className="nav_2nd_menu_link">
                Calendar
              </Link>
            </Box>
            <Link
              id="navitem_features_workspace_editions"
              className="dropdown-item mobile_no_link"
            >
              Workspace Editions
            </Link>
            <Box className="inner-box">
              <Link href="https://onlyoffice.com/cloud-office.aspx" className="nav_2nd_menu_link">
                Cloud Edition
              </Link>
              <Link
                href="https://onlyoffice.com/workspace-enterprise.aspx"
                className="nav_2nd_menu_link"
              >
                Enterprise Edition
              </Link>
            </Box>
          </Box>
          <Box className="outer-box">
            <Link
              id="navitem_features_security"
              href="https://onlyoffice.com/security.aspx"
              className="dropdown-item"
            >
              Security
            </Link>
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
            <Link
              id="navitem_integrations_nextcloud"
              href="https://onlyoffice.com/office-for-nextcloud.aspx"
              className="dropdown-item"
            >
              Nextcloud
            </Link>
            <Link
              id="navitem_integrations_owncloud"
              href="https://onlyoffice.com/office-for-owncloud.aspx"
              className="dropdown-item"
            >
              ownCloud
            </Link>
            <Link
              id="navitem_integrations_confluence"
              href="https://onlyoffice.com/office-for-confluence.aspx"
              className="dropdown-item"
            >
              Confluence
            </Link>
            <Link
              id="navitem_integrations_alfresco"
              href="https://onlyoffice.com/office-for-alfresco.aspx"
              className="dropdown-item"
            >
              Alfresco
            </Link>
            <Link
              id="navitem_integrations_sharepoint"
              href="https://onlyoffice.com/office-for-sharepoint.aspx"
              className="dropdown-item"
            >
              SharePoint
            </Link>
            <Link
              id="navitem_integrations_liferay"
              href="https://onlyoffice.com/office-for-liferay.aspx"
              className="dropdown-item"
            >
              Liferay
            </Link>
            <Link
              id="navitem_integrations_humhub"
              href="https://onlyoffice.com/office-for-humhub.aspx"
              className="dropdown-item"
            >
              HumHub
            </Link>
          </Box>
          <Box className="outer-box integrations">
            <Link
              id="navitem_integrations_plone"
              href="https://onlyoffice.com/office-for-plone.aspx"
              className="dropdown-item"
            >
              Plone
            </Link>
            <Link
              id="navitem_integrations_nuxeo"
              href="https://onlyoffice.com/office-for-nuxeo.aspx"
              className="dropdown-item"
            >
              Nuxeo
            </Link>
            <Link
              id="navitem_integrations_chamilo"
              href="https://onlyoffice.com/office-for-chamilo.aspx"
              className="dropdown-item"
            >
              Chamilo
            </Link>
            <Link
              id="navitem_integrations_redmine"
              href="https://onlyoffice.com/office-for-redmine.aspx"
              className="dropdown-item"
            >
              Redmine
            </Link>
            <Link
              id="navitem_integrations_jira"
              href="https://onlyoffice.com/office-for-jira.aspx"
              className="dropdown-item"
            >
              Jira
            </Link>
            <Link
              id="navitem_integrations_connectors"
              href="https://onlyoffice.com/all-connectors.aspx"
              className="dropdown-item"
            >
              Others
            </Link>
          </Box>
          <Box className="outer-box">
            <Link
              id="navitem_integration_for_developers"
              className="dropdown-item"
              href="https://onlyoffice.com/developer-edition.aspx"
            >
              For developers
            </Link>
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
              <Link
                id="navitem_prices_docs"
                className="dropdown-item mobile_no_link"
              >
                ONLYOFFICE Docs
              </Link>
              <Box className="inner-box">
                <Link
                  href="https://onlyoffice.com/docs-enterprise-prices.aspx"
                  className="nav_2nd_menu_link"
                >
                  Enterprise Edition
                </Link>
                <Link
                  href="https://onlyoffice.com/developer-edition-prices.aspx"
                  className="nav_2nd_menu_link"
                >
                  Developer Edition
                </Link>
              </Box>
              <Link
                id="navitem_prices_workspace"
                className="dropdown-item mobile_no_link"
              >
                ONLYOFFICE Workspace
              </Link>
              <Box className="inner-box">
                <Link href="https://onlyoffice.com/saas.aspx" className="nav_2nd_menu_link">
                  Cloud Service
                </Link>
                <Link
                  href="https://onlyoffice.com/workspace-enterprise-prices.aspx"
                  className="nav_2nd_menu_link"
                >
                  Server Enterprise
                </Link>
              </Box>
            </Box>
          </Box>
          <Box className="outer-box">
            <Link
              id="navitem_prices_reseller"
              href="https://onlyoffice.com/find-partners.aspx"
              className="dropdown-item"
            >
              Buy from an ONLYOFFICE reseller
            </Link>
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
            <Link
              className="dropdown-item mobile_no_link"
              id="navitem_download_docs"
            >
              ONLYOFFICE Docs
            </Link>
            <Box className="inner-box">
              <Link
                className="nav_2nd_menu_link"
                id="navitem_download_signup_docs"
                href="https://onlyoffice.com/docs-registration.aspx"
              >
                Sign up for cloud
              </Link>
              <Link
                id="navitem_download_onpremises_docs"
                href="https://onlyoffice.com/download-docs.aspx?from=downloadintegrationmenu"
                className="nav_2nd_menu_link"
              >
                Install on-premises
              </Link>
            </Box>
            <Link
              className="dropdown-item mobile_no_link"
              id="navitem_download_workspace"
            >
              ONLYOFFICE Workspace
            </Link>
            <Box className="inner-box">
              <Box className="nowrap">
                <Link
                  className="nav_item_nowrap_link"
                  id="navitem_download_signin"
                  href="https://onlyoffice.com/signin.aspx"
                >
                  Sign in
                </Link>
                <p className="slash_text">/</p>
                <Link
                  className="nav_item_nowrap_link second"
                  id="navitem_download_signup"
                  href="https://onlyoffice.com/registration.aspx"
                >
                  Sign up for cloud
                </Link>
              </Box>
              <Link
                id="navitem_download_onpremises"
                href="https://onlyoffice.com/download-workspace.aspx"
                className="nav_2nd_menu_link"
              >
                Install on-premises
              </Link>
            </Box>
            <Link
              className="dropdown-item"
              id="navitem_download_desktop"
              href="download-desktop.aspx"
            >
              ONLYOFFICE desktop and mobile apps
            </Link>
            <Link
              id="navitem_download_products"
              className="dropdown-item"
              href="download.aspx"
            >
              Other products
            </Link>
          </Box>
          <Box className="outer-box">
            <Link
              id="navitem_download_compare"
              className="dropdown-item"
              href="https://onlyoffice.com/compare-editions.aspx"
            >
              Compare editions
            </Link>
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
            <Link
              id="navitem_hosters"
              href="https://onlyoffice.com/affiliates.aspx"
              className="dropdown-item"
            >
              Affiliates
            </Link>
            <Link
              id="navitem_resellers"
              href="https://onlyoffice.com/resellers.aspx"
              className="dropdown-item"
            >
              Resellers
            </Link>
            <Link
              id="navitem_find_partners"
              href="https://onlyoffice.com/find-partners.aspx"
              className="dropdown-item"
            >
              Find partners
            </Link>
            <Link
              id="navitem_submit_request"
              href="https://onlyoffice.com/partnership-request.aspx"
              className="dropdown-item"
            >
              Submit request
            </Link>
          </Box>
          <Box className="outer-box">
            <Link
              id="navitem_latest_events"
              href="https://www.onlyoffice.com/blog/2021/03/onlyoffice-joins-the-linux-foundation-as-a-silver-member/"
              className="dropdown-item"
            >
              Latest events
            </Link>
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
            <Link
              id="navitem_about_about"
              href="https://onlyoffice.com/about.aspx"
              className="dropdown-item"
            >
              About ONLYOFFICE
            </Link>
            <Link
              id="navitem_about_blog"
              href="https://www.onlyoffice.com/blog/"
              className="dropdown-item"
            >
              Blog
            </Link>
            <Link
              id="navitem_about_contribute"
              href="https://onlyoffice.com/contribute.aspx"
              className="dropdown-item"
            >
              Contribute
            </Link>
            <Link
              id="navitem_about_customers"
              href="https://onlyoffice.com/customers.aspx"
              className="dropdown-item"
            >
              Customers
            </Link>
            <Link
              id="navitem_about_awards"
              href="https://onlyoffice.com/awards.aspx"
              className="dropdown-item"
            >
              Awards
            </Link>
            <Link
              id="navitem_about_events"
              href="https://onlyoffice.com/events.aspx"
              className="dropdown-item"
            >
              Events
            </Link>
            <Link
              id="navitem_about_pressdownloads"
              href="https://onlyoffice.com/press-downloads.aspx"
              className="dropdown-item"
            >
              Press downloads
            </Link>
            <Link
              id="navitem_about_whitepapers"
              href="https://onlyoffice.com/whitepapers.aspx"
              className="dropdown-item"
            >
              White papers
            </Link>
            <Link
              id="navitem_about_trainingcourses"
              href="https://onlyoffice.com/training-courses.aspx"
              className="dropdown-item"
            >
              Training courses
            </Link>
            <Link
              id="navitem_about_giftshop"
              href="https://shop.spreadshirt.com/onlyoffice"
              className="dropdown-item"
            >
              Gift shop
            </Link>
            <Link
              id="navitem_about_contacts"
              href="https://onlyoffice.com/contacts.aspx"
              className="dropdown-item"
            >
              Contacts
            </Link>
          </Box>
          <Box className="outer-box">
            <Link
              id="navitem_features_latest_releases"
              href="https://www.onlyoffice.com/blog/"
              className="dropdown-item"
            >
              Latest news
            </Link>
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
