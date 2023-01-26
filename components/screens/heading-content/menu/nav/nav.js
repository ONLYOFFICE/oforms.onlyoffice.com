import Link from "@components/common/link";
import Box from "./sub-components/box";
import MenuItem from "../menu-item";
import StyledNav from "./styled-nav";

const Nav = ({ onClick, t, stateMobilePND, currentLanguage, ...rest }) => {
  const hrefLang = `https://onlyoffice.com${
    currentLanguage === "en" ? "" : `/${currentLanguage}`
  }`;
  return (
    <StyledNav stateMobile={stateMobilePND} {...rest}>
      <MenuItem heading={t("Features")} id="navitem_features">
        <Box className="menu_wrapper">
          <Box className="outer-box with_border">
          <Link
              id="navitem_features_docs_overview"
              href={`${hrefLang}/office-suite.aspx`}
              className="dropdown-item"
            >
              {t("Docs Overview")}
            </Link>
            <Link
              id="navitem_features_document_editor"
              href={`${hrefLang}/document-editor.aspx`}
              className="dropdown-item"
            >
              {t("Document Editor")}
            </Link>
            <Link
              id="navitem_features_spreadsheet_editor"
              href={`${hrefLang}/spreadsheet-editor.aspx`}
              className="dropdown-item"
            >
              {t("Spreadsheet Editor")}
            </Link>
            <Link
              id="navitem_features_presentation_editor"
              href={`${hrefLang}/presentation-editor.aspx`}
              className="dropdown-item"
            >
              {t("Presentation Editor")}
            </Link>
            <Link
              id="navitem_features_form_creator"
              href={`${hrefLang}/form-creator.aspx`}
              className="dropdown-item"
            >
              {t("Form creator")}
            </Link>
            <Link
              id="navitem_features_pdf_reader"
              href={`${hrefLang}/pdf-reader.aspx`}
              className="dropdown-item"
            >
              {t("PDF reader & converter")}
            </Link>
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
              id="navitem_features_desktop_mob_apps"
              className="dropdown-item mobile_no_link"
            >
              {t("Desktop&mobile apps")}
            </Link>
            <Link
              id="navitem_features_clients_apps"
              href={`${hrefLang}/desktop.aspx`}
              className="dropdown-item"
            >
              {t("For desktop")}
            </Link>
            <Link
              id="navitem_features_clients_mobile_ios"
              href={`${hrefLang}/office-for-ios.aspx`}
              className="dropdown-item"
            >
              {t("For iOS")}
            </Link>
            <Link
              id="navitem_features_clients_mobile_android"
              href={`${hrefLang}/office-for-android.aspx`}
              className="dropdown-item"
            >
              {t("For Android")}
            </Link>
          </Box>
          <Box className="outer-box">
            <Link
              id="navitem_features_see_it"
              href={`${hrefLang}/see-it-in-action.aspx`}
              className="dropdown-item"
            >
              {t("See it in action!")}
            </Link>
            <Box id="see_it_div" className="menu_pic_div">
              <div id="see_it_img" className="menu_pic_img"></div>
              <p id="see_it_header" className="menu_pic_header">
                {t("Curious to know what the interface looks like and try the main functionality?")}
              </p>
            </Box>
            <Link
              id="navitem_features_oforms"
              href={`${hrefLang}`}
              className="dropdown-item"
            >
              {t("OFORMs")}
            </Link>
            <Box id="oforms_div" className="menu_pic_div">
              <div id="oforms_img" className="menu_pic_img"></div>
              <p id="oforms_header" className="menu_pic_header">
                {t(
                  "Free ready-to-fill out online document forms"
                )}
              </p>
            </Box>
          </Box>
        </Box>
      </MenuItem>

      <MenuItem heading={t("For business")} id="navitem_forbusiness">
        <Box className="menu_wrapper">
          <Box className="outer-box">
            <Link
              id="navitem_fb_docs_ee"
              href={`${hrefLang}/docs-enterprise.aspx`}
              className="dropdown-item"
            >
              {t("Docs Enterprise")}
            </Link>
            <Link
              id="navitem_fb_docs_cloud"
              href={`${hrefLang}/docs-cloud.aspx`}
              className="dropdown-item"
            >
              {t("Docs Cloud")}
            </Link>
            <Link
              id="navitem_fb_workspace"
              href={`${hrefLang}/workspace.aspx`}
              className="dropdown-item"
            >
              {t("Workspace")}
            </Link>
            <Link
              id="navitem_fb_other_integrations"
              className="dropdown-item mobile_no_link"
            >
              {t("Other Integrations")}
            </Link>
            <Box className="inner-box">
              <Link
                id="navitem_integrations_nextcloud"
                href={`${hrefLang}/office-for-nextcloud.aspx`}
                className="dropdown-item no-bold"
              >
                {t("Nextcloud")}
              </Link>
              <Link
                id="navitem_integrations_owncloud"
                href={`${hrefLang}/office-for-owncloud.aspx`}
                className="dropdown-item no-bold"
              >
                {t("ownCloud")}
              </Link>
              <Link
                id="navitem_integrations_confluence"
                href={`${hrefLang}/office-for-confluence.aspx`}
                className="dropdown-item no-bold"
              >
                {t("Confluence")}
              </Link>
              <Link
                id="navitem_integrations_alfresco"
                href={`${hrefLang}/office-for-alfresco.aspx`}
                className="dropdown-item no-bold"
              >
                {t("Alfresco")}
              </Link>
              <Link
                id="navitem_integrations_moodle"
                href={`${hrefLang}/office-for-moodle.aspx`}
                className="dropdown-item no-bold"
              >
                {t("Moodle")}
              </Link>
              <Link
                id="navitem_integrations_others"
                href={`${hrefLang}/all-connectors.aspx`}
                className="dropdown-item no-bold"
              >
                {t("All")}
              </Link>
            </Box>
          </Box>
          <Box className="outer-box">
            <Link
              id="navitem_features_education"
              className="dropdown-item"
              href={`${hrefLang}/education.aspx`}
            >
              {t("ONLYOFFICE for education")}
            </Link>
            <Box id="education_div" className="menu_pic_div">
              <div id="education_img" className="menu_pic_img"></div>
              <p id="education_header" className="menu_pic_header">
                {t(
                  "Edit and collaborate on docs within your eLearning platform"
                )}
              </p>
            </Box>
          </Box>
        </Box>
      </MenuItem>

      <MenuItem heading={t("For Developers")} id="navitem_fordevelopers">
        <Box className="menu_wrapper">
          <Box className="outer-box">
            <Link
              id="navitem_fd_docs_dev"
              href={`${hrefLang}/developer-edition.aspx`}
              className="dropdown-item"
            >
              {t("Docs Developer")}
            </Link>
            <Link
              id="navitem_fd_conversion_api"
              href={`${hrefLang}/conversion-api.aspx`}
              className="dropdown-item"
            >
              {t("Conversion API")}
            </Link>
            <Link
              id="navitem_fd_doc_builder"
              href={`${hrefLang}/document-builder.aspx`}
              className="dropdown-item"
            >
              {t("Document Builder")}
            </Link>
            <Link
              id="navitem_fd_api_doc"
              href={`https://api.onlyoffice.com/`}
              className="dropdown-item"
            >
              {t("API Documentation")}
            </Link>
            <Link
              id="navitem_fd_get"
              href={`${hrefLang}/download-docs.aspx?from=downloadintegrationmenu#docs-developer`}
              className="dropdown-item"
            >
              {t("Get It Now")}
            </Link>
          </Box>
        </Box>
      </MenuItem>

      <MenuItem heading={t("Get ONLYOFFICE")} id="navitem_download">
        <Box className="menu_wrapper">
          <Box className="outer-box with_border">
            <Link
              className="dropdown-item mobile_no_link"
              id="navitem_download_docs"
            >
              {t("For business")}
            </Link>
            <Link
              id="navitem_download_docs_ee"
              className="dropdown-item"
              href={`${hrefLang}/download-docs.aspx?from=downloadintegrationmenu#docs-enterprise`}
            >
              {t("Docs Enterprise")}
            </Link>
            <Link
              id="navitem_download_docs_cloud"
              className="dropdown-item"
              href={`${hrefLang}/docs-registration.aspx`}
            >
              {t("Docs Cloud")}
            </Link>
            <Link
              id="navitem_download_workspace"
              href={`${hrefLang}/workspace.aspx`}
              className="dropdown-item"
            >
              {t("Workspace")}
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
              id="navitem_download_connectors"
              href={`${hrefLang}/download-connectors.aspx`}
            >
              {t("Connectors")}
            </Link>
            <Link
              className="dropdown-item"
              id="navitem_download_desktop_mob"
              href={`${hrefLang}/download-desktop.aspx`}
            >
              {t("Desktop&mobile apps")}
            </Link>
          </Box>
          <div className="download-last-area">
          <div className="download-inner-list">
          <Box className="outer-box with_border">
            <Link
              className="dropdown-item mobile_no_link"
              id="navitem_download_for_dev"
            >
              {t("For developers")}
            </Link>
            <Link
              id="navitem_download_docs_de"
              className="dropdown-item"
              href={`${hrefLang}/download-docs.aspx?from=downloadintegrationmenu#docs-developer`}
            >
              {t("Developer Edition")}
            </Link>
            <Link
              id="navitem_download_docs_builder"
              className="dropdown-item"
              href={`${hrefLang}/download-builder.aspx`}
            >
              {t("Document Builder")}
            </Link>
          </Box>
          <Box className="outer-box no-color-box">
          <Link
              className="dropdown-item mobile_no_link"
              id="navitem_download_for_dev"
            >
              {t("For community")}
            </Link>
            <Link
              id="navitem_download_docs_ce"
              className="dropdown-item"
              href={`${hrefLang}/download-docs.aspx#docs-community`}
            >
              {t("Docs Community")}
            </Link>
            <Link
              id="navitem_download_download_bundles"
              className="dropdown-item"
              href={`${hrefLang}/download.aspx#bundles`}
            >
              {t("Bundles")}
            </Link>
            <Link
              id="navitem_download_code_git"
              className="dropdown-item"
              href={`https://github.com/ONLYOFFICE/`}
            >
              {t("Code on GitHub")}
            </Link>
          </Box>
          </div>
          <Box class="download-third-level">
          <Box className="outer-box">
            <Link
              id="navitem_download_hosting"
              className="dropdown-item"
              href={`${hrefLang}/hosting-providers.aspx`}
            >
              {t("Web hosting")}
            </Link>
            <Box id="hosting_div" className="menu_pic_div">
              <div id="hosting_img" className="menu_pic_img"></div>
              <p id="hosting_header" className="menu_pic_header">
                {t("Get web hosting from some of the best providers")}
              </p>
            </Box>
          </Box>
          </Box>
          </div>
        </Box>
      </MenuItem>

      <MenuItem heading={t("Pricing")} id="navitem_prices">
        <Box className="menu_wrapper">
          <Box className="outer-box">
            <Link
              className="dropdown-item mobile_no_link"
              id="navitem_prices_for_business"
            >
              {t("For business")}
            </Link>
            <Link
              id="navitem_prices_docs_enterprice"
              href={`${hrefLang}/docs-enterprise-prices.aspx`}
              className="dropdown-item"
            >
              {t("Docs Enterprise")}
            </Link>
            <Link
              id="navitem_prices_workspace"
              href={`${hrefLang}/workspace.aspx`}
              className="dropdown-item"
            >
              {t("Workspace")}
            </Link>
          
            <Link
              className="dropdown-item mobile_no_link"
              id="navitem_prices_for_dev"
            >
              {t("For developers")}
            </Link>
            <Link
              id="navitem_prices_docs_dev"
              href={`${hrefLang}/developer-edition-prices.aspx`}
              className="dropdown-item"
            >
              {t("Docs Developer")}
            </Link>
          </Box>
          <Box className="outer-box">
            <Link
              id="navitem_prices_reseller"
              href={`${hrefLang}/events.aspx`}
              className="dropdown-item"
            >
              {t("Buy from an ONLYOFFICE partner")}
            </Link>
            <Box id="reseller_div" className="menu_pic_div">
              <div id="reseller_img" className="menu_pic_img"></div>
              <p id="reseller_header" className="menu_pic_header">
                {t("Find out the list of all the authorized ONLYOFFICE resellers in your area")}
              </p>
            </Box>
          </Box>
        </Box>
      </MenuItem>

      <MenuItem heading={t("Partners")} id="navitem_partners">
        <Box className="menu_wrapper">
          <Box className="outer-box">
            <Link
              id="navitem_resellers"
              href={`${hrefLang}/resellers.aspx`}
              className="dropdown-item"
            >
              {t("Resellers")}
            </Link>
            <Link
              id="navitem_hosters"
              href={`${hrefLang}/affiliates.aspx`}
              className="dropdown-item"
            >
              {t("Affiliates")}
            </Link>
            <Link
              id="navitem_technology_partners"
              href={`${hrefLang}/technology-partners.aspx`}
              className="dropdown-item"
            >
              {t("Technology Partners")}
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
              href="https://www.onlyoffice.com/blog/"
              className="dropdown-item"
            >
              {t("Events")}
            </Link>
            <Box id="latest_events_div" className="menu_pic_div">
              <div id="latest_events_img" className="menu_pic_img"></div>
              <p id="latest_events_header" className="menu_pic_header">
                {t("Meet the ONLYOFFICE team")}
              </p>
            </Box>
          </Box>
        </Box>
      </MenuItem>

      <MenuItem heading={t("Resources")} id="navitem_about">
        <Box className="menu_wrapper">
          <Box className="outer-box">
            <Link
              id="navitem_about_about"
              href={`${hrefLang}/about.aspx`}
              className="dropdown-item"
            >
              {t("About ONLYOFFICE")}
            </Link>
            <Link
              id="navitem_about_customers"
              href={`${hrefLang}/customers.aspx`}
              className="dropdown-item"
            >
              {t("Customers")}
            </Link>
            <Link
              id="navitem_about_contribute"
              href={`${hrefLang}/contribute.aspx`}
              className="dropdown-item"
            >
              {t("Contribute")}
            </Link>
            <Link
              id="navitem_about_vacancies"
              href={`${hrefLang}/vacancies.aspx`}
              className="dropdown-item"
            >
              {t("Jobs")}
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
              id="navitem_about_blog"
              href="https://www.onlyoffice.com/blog/"
              className="dropdown-item"
            >
              {t("Blog")}
            </Link>
            <Link
              id="navitem_about_forum"
              href="https://forum.onlyoffice.com/"
              className="dropdown-item"
            >
              {t("Forum")}
            </Link>
            <Link
              id="navitem_about_pressdownloads"
              href={`${hrefLang}/press-downloads.aspx`}
              className="dropdown-item"
            >
              {t("Press downloads")}
            </Link>
            <Link
              id="navitem_about_help"
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
              id="navitem_about_training_courses"
              href={`${hrefLang}/training-courses.aspx`}
              className="dropdown-item"
            >
              {t("Training courses")}
            </Link>
            <Link
              id="navitem_about_compare"
              href={`${hrefLang}/training-courses.aspx`}
              className="dropdown-item"
            >
              {t("Compare to other suites")}
            </Link>
          </Box>
        </Box>
      </MenuItem>
    </StyledNav>
  );
};

export default Nav;
