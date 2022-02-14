import React from "react";

import StyledNav from "./styled-nav";
import MenuItem from "../menu-item";
import Box from "./sub-components/box";
import Link from "../../../../../components/link";

const Nav = ({ onClick, t, stateMobilePND, currentLanguage, ...rest }) => {
  const hrefLang = `https://onlyoffice.com${
    currentLanguage === "en" ? "" : `/${currentLanguage}`
  }`;
  return (
    <StyledNav stateMobile={stateMobilePND} {...rest}>
      <MenuItem heading="Products & Features" id="navitem_features">
        <Box className="menu_wrapper">
          <Box className="outer-box with_border">
            <Link
              id="navitem_features_editors"
              href={`${hrefLang}/office-suite.aspx`}
              className="dropdown-item"
            >
              {t("ONLYOFFICE Docs")}
            </Link>
            <Box className="inner-box">
              <Link
                href={`${hrefLang}/document-editor.aspx`}
                className="nav_2nd_menu_link"
              >
                {t("Document Editor")}
              </Link>
              <Link
                href={`${hrefLang}/spreadsheet-editor.aspx`}
                className="nav_2nd_menu_link"
              >
                {t("Spreadsheet Editor")}
              </Link>
              <Link
                href={`${hrefLang}/presentation-editor.aspx`}
                className="nav_2nd_menu_link"
              >
                {t("Presentation Editor")}
              </Link>
            </Box>
            <Link
              id="navitem_features_docs_editions"
              className="dropdown-item mobile_no_link"
            >
              {t("Docs Editions")}
            </Link>
            <Box className="inner-box">
              <Link
                href={`${hrefLang}/docs-cloud.aspx`}
                className="nav_2nd_menu_link"
              >
                {t("Cloud Edition")}
              </Link>
              <Link
                href={`${hrefLang}/docs-enterprise.aspx`}
                className="nav_2nd_menu_link"
              >
                {t("Enterprise Edition")}
              </Link>
              <Link
                href={`${hrefLang}/developer-edition.aspx`}
                className="nav_2nd_menu_link"
              >
                {t("Developer Edition")}
              </Link>
            </Box>
            <Link
              id="navitem_features_clients_apps"
              href={`${hrefLang}/desktop.aspx`}
              className="dropdown-item"
            >
              {t("ONLYOFFICE for desktop")}
            </Link>
            <Link
              id="navitem_features_clients_mobile_ios"
              href={`${hrefLang}/office-for-ios.aspx`}
              className="dropdown-item"
            >
              {t("ONLYOFFICE for iOS")}
            </Link>
            <Link
              id="navitem_features_clients_mobile_android"
              href={`${hrefLang}/office-for-android.aspx`}
              className="dropdown-item"
            >
              {t("ONLYOFFICE for Android")}
            </Link>
          </Box>
          <Box className="outer-box">
            <Link
              id="navitem_features_workspace"
              href={`${hrefLang}/workspace.aspx`}
              className="dropdown-item"
            >
              {t("ONLYOFFICE Workspace")}
            </Link>
            <Box className="inner-box">
              <Link
                href={`${hrefLang}/document-management.aspx`}
                className="nav_2nd_menu_link"
              >
                {t("Documents")}
              </Link>
              <Link
                href={`${hrefLang}/mail.aspx`}
                className="nav_2nd_menu_link"
              >
                {t("Mail")}
              </Link>
              <Link href={`${hrefLang}/crm.aspx`} className="nav_2nd_menu_link">
                {t("CRM")}
              </Link>
              <Link
                href={`${hrefLang}/projects.aspx`}
                className="nav_2nd_menu_link"
              >
                {t("Projects")}
              </Link>
              <Link
                href={`${hrefLang}/calendar.aspx`}
                className="nav_2nd_menu_link"
              >
                {t("Calendar")}
              </Link>
            </Box>
            <Link
              id="navitem_features_workspace_editions"
              className="dropdown-item mobile_no_link"
            >
              {t("Workspace Editions")}
            </Link>
            <Box className="inner-box">
              <Link
                href={`${hrefLang}/cloud-office.aspx`}
                className="nav_2nd_menu_link"
              >
                {t("Cloud Edition")}
              </Link>
              <Link
                href={`${hrefLang}/workspace-enterprise.aspx`}
                className="nav_2nd_menu_link"
              >
                {t("Enterprise Edition")}
              </Link>
            </Box>
            <Link
              id="navitem_features_security"
              href={`${hrefLang}/security.aspx`}
              className="dropdown-item"
            >
              {t("Security")}
            </Link>
          </Box>
          <Box className="outer-box">
            <Link
              id="navitem_features_oforms"
              href={`${hrefLang}`}
              className="dropdown-item"
            >
              {t("OFORMS")}
            </Link>
            <Box id="oforms_div" className="menu_pic_div">
              <div id="oforms_img" className="menu_pic_img"></div>
              <p id="oforms_header" className="menu_pic_header">
                {t("Free ready-to-fill out online document forms")}
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
              href={`${hrefLang}/office-for-nextcloud.aspx`}
              className="dropdown-item"
            >
              {t("Nextcloud")}
            </Link>
            <Link
              id="navitem_integrations_owncloud"
              href={`${hrefLang}/office-for-owncloud.aspx`}
              className="dropdown-item"
            >
              {t("ownCloud")}
            </Link>
            <Link
              id="navitem_integrations_confluence"
              href={`${hrefLang}/office-for-confluence.aspx`}
              className="dropdown-item"
            >
              {t("Confluence")}
            </Link>
            <Link
              id="navitem_integrations_alfresco"
              href={`${hrefLang}/office-for-alfresco.aspx`}
              className="dropdown-item"
            >
              {t("Alfresco")}
            </Link>
            <Link
              id="navitem_integrations_sharepoint"
              href={`${hrefLang}/office-for-sharepoint.aspx`}
              className="dropdown-item"
            >
              {t("SharePoint")}
            </Link>
            <Link
              id="navitem_integrations_liferay"
              href={`${hrefLang}/office-for-liferay.aspx`}
              className="dropdown-item"
            >
              {t("Liferay")}
            </Link>
            <Link
              id="navitem_integrations_humhub"
              href={`${hrefLang}/office-for-humhub.aspx`}
              className="dropdown-item"
            >
              {t("HumHub")}
            </Link>
          </Box>
          <Box className="outer-box integrations">
            <Link
              id="navitem_integrations_plone"
              href={`${hrefLang}/office-for-plone.aspx`}
              className="dropdown-item"
            >
              {t("Plone")}
            </Link>
            <Link
              id="navitem_integrations_nuxeo"
              href={`${hrefLang}/office-for-nuxeo.aspx`}
              className="dropdown-item"
            >
              {t("Nuxeo")}
            </Link>
            <Link
              id="navitem_integrations_chamilo"
              href={`${hrefLang}/office-for-chamilo.aspx`}
              className="dropdown-item"
            >
              {t("Chamilo")}
            </Link>
            <Link
              id="navitem_integrations_redmine"
              href={`${hrefLang}/office-for-redmine.aspx`}
              className="dropdown-item"
            >
              {t("Redmine")}
            </Link>
            <Link
              id="navitem_integrations_jira"
              href={`${hrefLang}/office-for-jira.aspx`}
              className="dropdown-item"
            >
              {t("Jira")}
            </Link>
            <Link
              id="navitem_integrations_connectors"
              href={`${hrefLang}/all-connectors.aspx`}
              className="dropdown-item"
            >
              {t("Others")}
            </Link>
          </Box>
          <Box className="outer-box">
            <Link
              id="navitem_integration_for_developers"
              className="dropdown-item"
              href={`${hrefLang}/developer-edition.aspx`}
            >
              {t("For developers")}
            </Link>
            <Box id="for_developers_div" className="menu_pic_div">
              <div id="for_developers_img" className="menu_pic_img"></div>
              <p id="for_developers_header" className="menu_pic_header">
                {t(
                  "Integrate ONLYOFFICE Docs to bring document editing to your app users"
                )}
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
                {t("ONLYOFFICE Docs")}
              </Link>
              <Box className="inner-box">
                <Link
                  href={`${hrefLang}/docs-enterprise-prices.aspx`}
                  className="nav_2nd_menu_link"
                >
                  {t("Enterprise Edition")}
                </Link>
                <Link
                  href={`${hrefLang}/developer-edition-prices.aspx`}
                  className="nav_2nd_menu_link"
                >
                  {t("Developer Edition")}
                </Link>
              </Box>
              <Link
                id="navitem_prices_workspace"
                className="dropdown-item mobile_no_link"
              >
                {t("ONLYOFFICE Workspace")}
              </Link>
              <Box className="inner-box">
                <Link
                  href={`${hrefLang}/saas.aspx`}
                  className="nav_2nd_menu_link"
                >
                  {t("Cloud Service")}
                </Link>
                <Link
                  href={`${hrefLang}/workspace-enterprise-prices.aspx`}
                  className="nav_2nd_menu_link"
                >
                  {t("Server Enterprise")}
                </Link>
              </Box>
            </Box>
          </Box>
          <Box className="outer-box">
            <Link
              id="navitem_prices_reseller"
              href={`${hrefLang}/find-partners.aspx`}
              className="dropdown-item"
            >
              {t("Buy from an ONLYOFFICE reseller")}
            </Link>
            <Box id="reseller_div" className="menu_pic_div">
              <div id="reseller_img" className="menu_pic_img"></div>
              <p id="reseller_header" className="menu_pic_header">
                {t(
                  "Find out the list of all the authorized ONLYOFFICE resellers in your area"
                )}
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
              {t("ONLYOFFICE Docs")}
            </Link>
            <Box className="inner-box">
              <Link
                className="nav_2nd_menu_link"
                id="navitem_download_signup_docs"
                href={`${hrefLang}/docs-registration.aspx`}
              >
                {t("Sign up for cloud")}
              </Link>
              <Link
                id="navitem_download_onpremises_docs"
                href={`${hrefLang}/download-docs.aspx?from=downloadintegrationmenu`}
                className="nav_2nd_menu_link"
              >
                {t("Install on-premises")}
              </Link>
            </Box>
            <Link
              className="dropdown-item mobile_no_link"
              id="navitem_download_workspace"
            >
              {t("ONLYOFFICE Workspace")}
            </Link>
            <Box className="inner-box">
              <Box className="nowrap">
                <Link
                  className="nav_item_nowrap_link"
                  id="navitem_download_signin"
                  href={`${hrefLang}/signin.aspx`}
                >
                  {t("Sign in")}
                </Link>
                <p className="slash_text">/</p>
                <Link
                  className="nav_item_nowrap_link second"
                  id="navitem_download_signup"
                  href={`${hrefLang}/registration.aspx`}
                >
                  {t("Sign up for cloud")}
                </Link>
              </Box>
              <Link
                id="navitem_download_onpremises"
                href={`${hrefLang}/download-workspace.aspx`}
                className="nav_2nd_menu_link"
              >
                {t("Install on-premises")}
              </Link>
            </Box>
            <Link
              className="dropdown-item"
              id="navitem_download_personal"
              href={`https://personal.onlyoffice.com/${currentLanguage}`}
            >
              {t("ONLYOFFICE Personal")}
            </Link>
            <Link
              className="dropdown-item"
              id="navitem_download_desktop"
              href={`${hrefLang}/download-desktop.aspx`}
            >
              {t("ONLYOFFICE desktop and mobile apps")}
            </Link>
            <Link
              id="navitem_download_products"
              className="dropdown-item"
              href={`${hrefLang}/download.aspx`}
            >
              {t("Other products")}
            </Link>
          </Box>
          <Box className="outer-box">
            <Link
              id="navitem_download_compare"
              className="dropdown-item"
              href={`${hrefLang}/compare-editions.aspx`}
            >
              {t("Compare editions")}
            </Link>
            <Box id="compare_div" className="menu_pic_div">
              <div id="compare_img" className="menu_pic_img"></div>
              <p id="compare_header" className="menu_pic_header">
                {t("Choose the ONLYOFFICE edition that suits you best")}
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
              href={`${hrefLang}/affiliates.aspx`}
              className="dropdown-item"
            >
              {t("Affiliates")}
            </Link>
            <Link
              id="navitem_resellers"
              href={`${hrefLang}/resellers.aspx`}
              className="dropdown-item"
            >
              {t("Resellers")}
            </Link>
            <Link
              id="navitem_find_partners"
              href={`${hrefLang}/find-partners.aspx`}
              className="dropdown-item"
            >
              {t("Find partners")}
            </Link>
            <Link
              id="navitem_submit_request"
              href={`${hrefLang}/partnership-request.aspx`}
              className="dropdown-item"
            >
              {t("Submit request")}
            </Link>
          </Box>
          <Box className="outer-box">
            <Link
              id="navitem_latest_events"
              href="https://www.onlyoffice.com/blog/2021/03/onlyoffice-joins-the-linux-foundation-as-a-silver-member/"
              className="dropdown-item"
            >
              {t("Latest events")}
            </Link>
            <Box id="latest_events_div" className="menu_pic_div">
              <div id="latest_events_img" className="menu_pic_img"></div>
              <p id="latest_events_header" className="menu_pic_header">
                {t("ONLYOFFICE joins the Linux Foundation as a silver member")}
              </p>
            </Box>
          </Box>
        </Box>
      </MenuItem>

      <MenuItem heading="About" id="navitem_about">
        <Box className="menu_wrapper">
          <Box className="outer-box with_border">
            <Link
              id="navitem_about_about"
              href={`${hrefLang}/about.aspx`}
              className="dropdown-item"
            >
              {t("About ONLYOFFICE")}
            </Link>
            <Link
              id="navitem_about_contribute"
              href={`${hrefLang}/contribute.aspx`}
              className="dropdown-item"
            >
              {t("Contribute")}
            </Link>
            <Link
              id="navitem_about_customers"
              href={`${hrefLang}/customers.aspx`}
              className="dropdown-item"
            >
              {t("Customers")}
            </Link>
            <Link
              id="navitem_about_awards"
              href={`${hrefLang}/awards.aspx`}
              className="dropdown-item"
            >
              {t("Awards")}
            </Link>
            <Link
              id="navitem_about_events"
              href={`${hrefLang}/events.aspx`}
              className="dropdown-item"
            >
              {t("Events")}
            </Link>
            <Link
              id="navitem_about_giftshop"
              href="https://shop.spreadshirt.com/onlyoffice"
              className="dropdown-item"
            >
              {t("Gift shop")}
            </Link>
            <Link
              id="navitem_about_contacts"
              href={`${hrefLang}/contacts.aspx`}
              className="dropdown-item"
            >
              {t("Contacts")}
            </Link>
          </Box>
          <Box className="outer-box">
            <Link
              id="navitem_about_resources"
              className="dropdown-item mobile_no_link"
            >
              {t("Resources")}
            </Link>
            <Link
              id="navitem_about_blog"
              href="https://www.onlyoffice.com/blog/"
              className="dropdown-item"
            >
              {t("Blog")}
            </Link>
            <Link
              id="navitem_about_pressdownloads"
              href={`${hrefLang}/press-downloads.aspx`}
              className="dropdown-item"
            >
              {t("Press downloads")}
            </Link>
            <Link
              id="navitem_about_helpcenter"
              href="https://helpcenter.onlyoffice.com/index.aspx"
              className="dropdown-item"
            >
              {t("Help Center")}
            </Link>
            <Link
              id="navitem_about_whitepapers"
              href={`${hrefLang}/whitepapers.aspx`}
              className="dropdown-item"
            >
              {t("White papers")}
            </Link>
            <Link
              id="navitem_about_webinars"
              href={`${hrefLang}/webinars.aspx`}
              className="dropdown-item"
            >
              {t("Webinars")}
            </Link>
            <Link
              id="navitem_about_trainingcourses"
              href={`${hrefLang}/training-courses.aspx`}
              className="dropdown-item"
            >
              {t("Training courses")}
            </Link>
          </Box>
          <Box className="outer-box">
            <Link
              id="navitem_features_latest_releases"
              href="https://www.onlyoffice.com/blog/"
              className="dropdown-item"
            >
              {t("Latest news")}
            </Link>
            <Box id="latest_news_div" className="menu_pic_div">
              <div id="latest_news_img" className="menu_pic_img"></div>
              <p className="latest_news_date">18 January 2022</p>
              <p id="latest_news_header" className="menu_pic_header">
                {t(
                  "ONLYOFFICE Docs 70 online forms, password protection in sheets, collaboration improvements and much more"
                )}
              </p>
            </Box>
          </Box>
        </Box>
      </MenuItem>
    </StyledNav>
  );
};

export default Nav;
