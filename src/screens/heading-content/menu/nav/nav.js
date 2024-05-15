import StyledNav from "./styled-nav";
import { useState } from "react";
import MenuItem from "../menu-item";
import InternalLink from "@common/internal-link";
import Text from "@common/text";

const Nav = ({ t, locale }) => {
  const [navHidden, setNavHidden] = useState(false);
  const hrefLang = `https://onlyoffice.com${locale === "en" ? "" : `/${locale}`}`;
  const appDirectoryHrefLang = `https://onlyoffice.com/app-directory${locale === "en" || locale === "pt" || locale === "it" ? "" : `/${locale}`}`;
  const oformsHrefLang = `https://oforms.onlyoffice.com/${locale === "en" ? "" : locale}`;
  const blogHrefLang = `https://onlyoffice.com/blog${locale === "en" ? "" : locale === "zh" ? "/zh-hans" : locale === "pt" ? "/pt-br" : `/${locale}`}`;
  const windowCheck = typeof window !== "undefined" && window.innerWidth <= 1024;

  return (
    <StyledNav className={`nav ${locale} ${windowCheck && navHidden ? "hidden" : ""}`}>
      <div className="nav-wrapper">
        <ul className="nav-items">
          <MenuItem className="nav-products" heading={t("Products")} navHidden={navHidden} setNavHidden={setNavHidden}>
            <div className="menu-wrapper">
              <div className="menu-box with-border">
                <div className="menu-box-item">
                  <InternalLink className="menu-link docs" href={`${hrefLang}/office-suite.aspx`} label={t("Docs")} />
                  <Text className="menu-box-text" label={t("Doc editors to integrate into your business platform")} />
                </div>
                <div className="menu-box-item">
                  <InternalLink className="menu-link docspace" href={`${hrefLang}/docspace.aspx`} label={t("DocSpace")} />
                  <Text className="menu-box-text" label={t("Customizable rooms for document collaboration")} />
                </div>
                <div className="menu-box-item">
                  <InternalLink className="menu-link workspace" href={`${hrefLang}/workspace.aspx`} label={t("Workspace")} />
                  <Text className="menu-box-text" label={t("Business platform to manage your team activities")} />
                </div>
                <div className="menu-box-item">
                  <InternalLink className="menu-link connectors" href={`${hrefLang}/all-connectors.aspx`} label={t("Connectors")} />
                  <Text className="menu-box-text" label={t("Ready-to-use apps to connect Docs or DocSpace to your business platform")} />
                </div>
                <div className="menu-box-item">
                  <InternalLink className="menu-link marketplace" href={appDirectoryHrefLang} label={t("Marketplace")} />
                  <Text className="menu-box-text" label={t("Collection of plugins to extend Docs or DocSpace funtionality")} />
                </div>
              </div>

              <div className="menu-box with-border">
                <div className="menu-label">{t("Desktop & mobile apps")}</div>
                <InternalLink className="menu-link for-desktop" href={`${hrefLang}/desktop.aspx`} label={t("For desktop")} />
                <InternalLink className="menu-link for-ios" href={`${hrefLang}/office-for-ios.aspx`} label={t("For iOS")} />
                <InternalLink className="menu-link for-android" href={`${hrefLang}/office-for-android.aspx`} label={t("For Android")} />
              </div>
              <div className="menu-box">
                <div className="menu-label">{t("Perform your tasks online")}</div>
                <InternalLink className="menu-link find-form-templates" href={oformsHrefLang} label={t("Find form templates")} />
                <InternalLink className="menu-link fill-out-forms-online" href={oformsHrefLang} label={t("Fill out forms online")} />
                <InternalLink className="menu-link convert-text-files" href={`${hrefLang}/text-file-converter.aspx`} label={t("Convert text files")} />
                <InternalLink className="menu-link convert-spreadsheets" href={`${hrefLang}/spreadsheet-converter.aspx`} label={t("Convert spreadsheets")} />
                <InternalLink className="menu-link convert-presentations" href={`${hrefLang}/presentation-converter.aspx`} label={t("Convert presentations")} />
                <InternalLink className="menu-link convert-pdfs" href={`${hrefLang}/pdf-converter.aspx`} label={t("Convert PDFs")} />
              </div>
            </div>
          </MenuItem>

          <MenuItem className="nav-enterprise" heading={t("Enterprise")} navHidden={navHidden} setNavHidden={setNavHidden}>
            <div className="menu-wrapper">
              <div className="menu-box">
                <InternalLink className="menu-link all-enterprise-solutions" href={`${hrefLang}/for-enterprises.aspx`} label={t("All Enterprise solutions")} />
                <InternalLink className="menu-link docspace-enterprise" href={`${hrefLang}/docspace-enterprise.aspx`} label={t("DocSpace Enterprise")} />
                <InternalLink className="menu-link docs-enterprise" href={`${hrefLang}/docs-enterprise.aspx`} label={t("Docs Enterprise")} />
                <InternalLink className="menu-link pricing" href={`${hrefLang}/docs-enterprise-prices.aspx`} label={t("Pricing")} />
                <InternalLink className="menu-link get-in-now" href={`${hrefLang}/download-docs.aspx`} label={t("Get it now")} />
              </div>
            </div>
          </MenuItem>

          <MenuItem className="nav-developers" heading={t("Developers")} navHidden={navHidden} setNavHidden={setNavHidden}>
            <div className="menu-wrapper">
              <div className="menu-box">
                <InternalLink className="menu-link all-developer-solutions" href={`${hrefLang}/for-developers.aspx`} label={t("All Developer solutions")} />
                <InternalLink className="menu-link docs-developer" href={`${hrefLang}/developer-edition.aspx`} label={t("Docs Developer")} />
                <InternalLink className="menu-link conversion-api" href={`${hrefLang}/conversion-api.aspx`} label={t("Conversion API")} />
                <InternalLink className="menu-link document-builder" href={`${hrefLang}/document-builder.aspx`} label={t("Document Builder")} />
                <InternalLink className="menu-link api-documentation" href="https://api.onlyoffice.com/" label={t("API Documentation")} />
                <InternalLink className="menu-link pricing" href={`${hrefLang}/developer-edition-prices.aspx`} label={t("Pricing")} />
                <InternalLink className="menu-link get-in-now" href={`${hrefLang}/download-docs.aspx?from=downloadintegrationmenu#docs-developer`} label={t("Get it now")} />
              </div>
              <div className="menu-box bg-gray">
                <InternalLink className="menu-block" href={`${hrefLang}/see-it-in-action.aspx`}>
                  <div className="menu-block-title">{t("See it in action!")}</div>
                  <div className="menu-block-img see-it-in-action"></div>
                  <Text className="menu-block-text" as="p" label={t("Curious to know what the interface looks like and try the main functionality without registration?")} />
                </InternalLink>
              </div>
            </div>
          </MenuItem>

          <MenuItem className="nav-get-onlyoffice" heading={t("Get ONLYOFFICE")} navHidden={navHidden} setNavHidden={setNavHidden}>
            <div className="menu-wrapper">
              <div className="menu-box with-border">
                <div className="menu-label">{t("For business")}</div>
                <div className="menu-link menu-link-2 docspace">{t("DocSpace")}</div>
                <div className="menu-box-inner">
                  <div className="menu-box-links">
                    <InternalLink className="menu-box-link left" href={`${hrefLang}/docspace-signin.aspx`} label={t("Sign in")} />
                    /
                    <InternalLink className="menu-box-link right" href={`${hrefLang}/docspace-registration.aspx`} label={t("Sign up for cloud")} />
                  </div>
                  <InternalLink className="menu-box-link" href={`${hrefLang}/download-docspace.aspx?from=downloadintegrationmenu#docspace-enterprise`} label={t("Install on-premises")} />
                </div>
                <div className="menu-link menu-link-2 docs-enterprise">{t("Docs Enterprise")}</div>
                <div className="menu-box-inner">
                  <div className="menu-box-links">
                    <InternalLink className="menu-box-link left" href={`${hrefLang}/docs-cloud-signin.aspx`} label={t("Sign in")} />
                    /
                    <InternalLink className="menu-box-link right" href={`${hrefLang}/docs-registration.aspx`} label={t("Sign up for cloud")} />
                  </div>
                  <InternalLink className="menu-box-link" href={`${hrefLang}/download-docs.aspx?from=downloadintegrationmenu#docs-enterprise`} label={t("Install on-premises")} />
                </div>
                <div className="menu-link menu-link-2 workspace">{t("Workspace")}</div>
                <div className="menu-box-inner">
                  <InternalLink className="menu-box-link sign-in" href={`${hrefLang}/signin.aspx`} label={t("Sign in")} />
                  <InternalLink className="menu-box-link" href={`${hrefLang}/download-workspace.aspx`} label={t("Install on-premises")} />
                </div>
                <InternalLink className="menu-link connectors" href={`${hrefLang}/all-connectors.aspx`} label={t("Connectors")} />
                <InternalLink className="menu-link desktop-mobile-apps" href={`${hrefLang}/download-desktop.aspx`} label={t("Desktop & mobile apps")} />
              </div>
              <div className="menu-box">
                <div className="menu-box-wrapper">
                  <div className="menu-label">{t("For developers")}</div>
                  <div className="menu-link menu-link-2 docs-developer">{t("Docs Developer")}</div>
                  <div className="menu-box-inner">
                    <InternalLink className="menu-box-link" href={`${hrefLang}/download-docs.aspx?from=downloadintegrationmenu#docs-developer`} label={t("Install on-premises")} />
                  </div>
                  <InternalLink className="menu-link document-builder" href={`${hrefLang}/download-builder.aspx`} label={t("Document Builder")} />
                </div>
                <div className="menu-box-wrapper">
                  <div className="menu-label">{t("For community")}</div>
                  <InternalLink className="menu-link docs-community" href={`${hrefLang}/download-docs.aspx#docs-community`} label={t("Docs Community")} />
                  <InternalLink className="menu-link code-on-github" href="https://github.com/ONLYOFFICE/" label={t("Code on GitHub")} />
                </div>
              </div>
            </div>
          </MenuItem>

          <MenuItem className="nav-pricing" heading={t("Pricing")} navHidden={navHidden} setNavHidden={setNavHidden}>
            <div className="menu-wrapper">
              <div className="menu-box">
                <div className="menu-box-wrapper">
                  <div className="menu-label">{t("For business")}</div>
                  <InternalLink className="menu-link docspace" href={`${hrefLang}/docspace-prices.aspx`} label={t("DocSpace")} />
                  <InternalLink className="menu-link docs-enterprise" href={`${hrefLang}/docs-enterprise-prices.aspx`} label={t("Docs Enterprise")} />
                  <InternalLink className="menu-link workspace" href={`${hrefLang}/workspace-prices.aspx`} label={t("Workspace")} />
                </div>
                <div className="menu-box-wrapper">
                  <div className="menu-label">{t("For developers")}</div>
                  <InternalLink className="menu-link docs-developer" href={`${hrefLang}/developer-edition-prices.aspx`} label={t("Docs Developer")} />
                </div>
                <div className="menu-box-wrapper">
                  <div className="menu-label">{t("For home use")}</div>
                  <InternalLink className="menu-link docs-home-server" href={`${hrefLang}/docs-home-server.aspx`} label={t("Docs Home Server")} />
                  <InternalLink className="menu-link docspace-family-pack" href={`${hrefLang}/docspace-family-pack.aspx`} label={t("DocSpace Family Pack")} />
                </div>
              </div>
              <div className="menu-box bg-gray">
                <InternalLink className="menu-block" href={`${hrefLang}/find-partners.aspx`}>
                  <div className="menu-block-title">{t("Buy from an ONLYOFFICE reseller")}</div>
                  <div className="menu-block-img reseller"></div>
                  <Text className="menu-block-text" as="p" label={t("Find out the list of all the authorized ONLYOFFICE resellers in your area")} />
                </InternalLink>
              </div>
            </div>
          </MenuItem>

          <MenuItem className="nav-partners" heading={t("Partners")} navHidden={navHidden} setNavHidden={setNavHidden}>
            <div className="menu-wrapper">
              <div className="menu-box">
                <InternalLink className="menu-link resellers" href={`${hrefLang}/resellers.aspx`} label={t("Resellers")} />
                <InternalLink className="menu-link affiliates" href={`${hrefLang}/affiliates.aspx`} label={t("Affiliates")} />
                <InternalLink className="menu-link hosting-providers" href={`${hrefLang}/hosting-providers.aspx`} label={t("Hosting providers")} />
                <InternalLink className="menu-link technology-partners" href={`${hrefLang}/technology-partners.aspx`} label={t("Technology partners")} />
                <InternalLink className="menu-link find-partners" href={`${hrefLang}/find-partners.aspx`} label={t("Find partners")} />
                <InternalLink className="menu-link submit-request" href={`${hrefLang}/partnership-request.aspx`} label={t("Submit request")} />
              </div>
              <div className="menu-box bg-gray">
                <InternalLink className="menu-block" href={`${hrefLang}/events.aspx`}>
                  <div className="menu-block-title">{t("Events")}</div>
                  <div className="menu-block-img events"></div>
                  <Text className="menu-block-text" as="p" label={t("Meet the ONLYOFFICE team")} />
                </InternalLink>
              </div>
            </div>
          </MenuItem>

          <MenuItem className="nav-resources" heading={t("Resources")} navHidden={navHidden} setNavHidden={setNavHidden}>
            <div className="menu-wrapper">
              <div className="menu-box with-border">
                <div className="menu-label">{t("About us")}</div>
                <InternalLink className="menu-link company" href={`${hrefLang}/about.aspx`} label={t("Company")} />
                <InternalLink className="menu-link customers" href={`${hrefLang}/customers.aspx`} label={t("Customers")} />
                <InternalLink className="menu-link success-stories" href={`${hrefLang}/customers.aspx#stories`} label={t("Success stories")} />
                <InternalLink className="menu-link awards" href={`${hrefLang}/awards.aspx`} label={t("Awards")} />
                <InternalLink className="menu-link certificates" href={`${hrefLang}/certificates.aspx`} label={t("Certificates")} />
                <InternalLink className="menu-link events" href={`${hrefLang}/events.aspx`} label={t("Events")} />
                <InternalLink className="menu-link press-downloads" href={`${hrefLang}/press-downloads.aspx`} label={t("Press downloads")} />
                <InternalLink className="menu-link gift-shop" href="https://shop.spreadshirt.com/onlyoffice" label={t("Gift shop")} />
                <InternalLink className="menu-link contacts" href={`${hrefLang}/contacts.aspx`} label={t("Contacts")} />
              </div>
              <div className="menu-box">
                <div className="menu-box-wrapper">
                  <div className="menu-label">{t("Collaborate")}</div>
                  <InternalLink className="menu-link for-contributers" href={`${hrefLang}/contribute.aspx`} label={t("For contributers")} />
                  <InternalLink className="menu-link for-translators" href="https://helpcenter.onlyoffice.com/guides/become-translator.aspx" label={t("For translators")} />
                  <InternalLink className="menu-link for-influencers" href={`${hrefLang}/influencer-program.aspx`} label={t("For influencers")} />
                  <InternalLink className="menu-link vacancies" href={`${hrefLang}/vacancies.aspx`} label={t("Vacancies")} />
                </div>
                <div className="menu-box-wrapper">
                  <div className="menu-label">{t("Get help")}</div>
                  <InternalLink className="menu-link forum" href="https://forum.onlyoffice.com/" label={t("Forum")} />
                  <InternalLink className="menu-link help-center" href="https://helpcenter.onlyoffice.com/index.aspx" label={t("Help Center")} />
                  <InternalLink className="menu-link training-courses" href={`${hrefLang}/training-courses.aspx`} label={t("Training courses")} />
                  <InternalLink className="menu-link webinars" href={`${hrefLang}/webinars.aspx`} label={t("Webinars")} />
                  <InternalLink className="menu-link white-papers" href={`${hrefLang}/whitepapers.aspx`} label={t("White papers")} />
                </div>
              </div>
              <div className="menu-box bg-gray">
                <InternalLink className="menu-link blog" href={blogHrefLang} label={t("Blog")} />
                <InternalLink className="menu-block" href={t("blogLink1")}>
                  <div className="menu-block-img blog-1"></div>
                  <div className="menu-blog-title">{t("ONLYOFFICE DocSpace 2.5 released: Public rooms improvements, user groups, storage management, embedding presets, and more")}</div>
                  <div className="menu-blog-date">{t("22 April 2024")}</div>
                </InternalLink>
                <InternalLink className="menu-block" href={t("blogLink2")}>
                  <div className="menu-block-img blog-2"></div>
                  <div className="menu-blog-title">{t("Collaborate on documents within Zoom meetings: ONLYOFFICE DocSpace app for Zoom available")}</div>
                  <div className="menu-blog-date">{t("27 February 2024")}</div>
                </InternalLink>
              </div>
            </div>
          </MenuItem>
        </ul>

        <a className="phone-mobile" href="tel:+37163399867">
          +371 633 998 67
        </a>
      </div>
    </StyledNav>
  );
};

export default Nav;