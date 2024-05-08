import StyledNav from "./styled-nav";
import { useEffect, useState } from "react";
import MenuItem from "../menu-item";
import InternalLink from "@common/internal-link";
import Text from "@common/text";
import Heading from "@common/heading";

const Nav = ({ t, locale, ...rest }) => {
  const [navHidden, setNavHidden] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const hrefLang = `https://onlyoffice.com${locale === "en" ? "" : `/${locale}`}`;
  const appDirectoryHrefLang = `https://onlyoffice.com/app-directory${locale === "en" || locale === "pt" || locale === "it" ? "" : `/${locale}`}`
  const windowCheck = typeof window !== "undefined" && window.innerWidth <= 1024;

  useEffect(() => {
    if (window.innerWidth <= 1024) {
      setActiveTab(null);
    }
  }, []);

  return (
    <StyledNav className={`nav ${locale} ${windowCheck && navHidden ? "hidden" : ""}`} {...rest}>
      <div className="nav-wrapper">
        <ul className="nav-items">
          <MenuItem
            onMouseEnter={() => window.innerWidth > 1024 && activeTab === null && setActiveTab(0)}
            className={`nav-products ${activeTab !== null ? activeTab === 5 ? "online-services-tab-active" : "tab-active" : ""}`}
            heading={t("Products")}
            navHidden={navHidden}
            setNavHidden={setNavHidden}
          >
            <div className="menu-wrapper">
              <div className="menu-wrapper-box">
                <div className="menu-box">
                  <button onClick={() => setActiveTab(0)} className={`menu-box-btn menu-link docs ${activeTab === 0 ? "active" : ""}`}>{t("Docs")}</button>
                  <button onClick={() => setActiveTab(1)} className={`menu-box-btn menu-link docspace ${activeTab === 1 ? "active" : ""}`}>{t("DocSpace")}</button>
                  <button onClick={() => setActiveTab(2)} className={`menu-box-btn menu-link workspace ${activeTab === 2 ? "active" : ""}`}>{t("Workspace")}</button>
                  <button onClick={() => setActiveTab(3)} className={`menu-box-btn menu-link connectors ${activeTab === 3 ? "active" : ""}`}>{t("Connectors")}</button>
                  <button onClick={() => setActiveTab(4)} className={`menu-box-btn menu-link marketplace ${activeTab === 4 ? "active" : ""}`}>{t("Marketplace")}</button>
                </div>
                <div className="menu-box">
                  {activeTab === 0 &&
                    <div className="menu-submenu">
                      <button onClick={() => setActiveTab(null)} className="mobile-heading-nav-item">{t("Docs")}</button>
                      <Text className="menu-submenu-text" label={t("Doc editors to integrate into your business platform")} />
                      <InternalLink className="menu-link feature-overview" href={`${hrefLang}/office-suite.aspx`} label={t("Feature overview")} />
                      <div className="menu-label">{t("Editors")}</div>
                      <InternalLink className="menu-link document-editor" href={`${hrefLang}/document-editor.aspx?docs-download`} label={t("Document editor")} />
                      <InternalLink className="menu-link spreadsheet-editor" href={`${hrefLang}/spreadsheet-editor.aspx?docs-download`} label={t("Spreadsheet editor")} />
                      <InternalLink className="menu-link presentation-editor" href={`${hrefLang}/presentation-editor.aspx?docs-download`} label={t("Presentation editor")} />
                      <InternalLink className="menu-link pdf-editor" href={`${hrefLang}/pdf-editor.aspx?docs-download`} label={t("PDF editor")} />
                      <InternalLink className="menu-link form-creator" href={`${hrefLang}/form-creator.aspx?docs-download`} label={t("Form creator")} />
                      <InternalLink className="menu-link e-book-creator" href={`${hrefLang}/e-book.aspx?docs-download`} label={t("E-book creator")} />
                      <InternalLink className="menu-link collaboration-features" href={`${hrefLang}/seamless-collaboration.aspx?docs-download`} label={t("Collaboration features")} />
                    </div>
                  }
                  {activeTab === 1 &&
                    <div className="menu-submenu">
                      <button onClick={() => setActiveTab(null)} className="mobile-heading-nav-item">{t("DocSpace")}</button>
                      <Text className="menu-submenu-text" label={t("Customizable rooms for document collaboration")} />
                      <div className="menu-submenu-wrapper">
                        <InternalLink className="menu-link feature-overview" href={`${hrefLang}/docspace.aspx`} label={t("Feature overview")} />
                        <div className="menu-label">{t("Rooms")}</div>
                        <InternalLink className="menu-link collaboration-rooms" href={`${hrefLang}/collaboration-rooms.aspx`} label={t("Collaboration rooms")} />
                        <InternalLink className="menu-link meeting-rooms" href={`${hrefLang}/office-for-zoom.aspx`} label={t("Meeting rooms")} />
                        <InternalLink className="menu-link public-rooms" href={`${hrefLang}/public-rooms.aspx`} label={t("Public rooms")} />
                        <InternalLink className="menu-link custom-rooms" href={`${hrefLang}/custom-rooms.aspx`} label={t("Custom rooms")} />
                      </div>
                      <div className="menu-submenu-wrapper">
                        <div className="menu-label">{t("Editors")}</div>
                        <InternalLink className="menu-link document-editor" href={`${hrefLang}/document-editor.aspx`} label={t("Document editor")} />
                        <InternalLink className="menu-link spreadsheet-editor" href={`${hrefLang}/spreadsheet-editor.aspx`} label={t("Spreadsheet editor")} />
                        <InternalLink className="menu-link presentation-editor" href={`${hrefLang}/presentation-editor.aspx`} label={t("Presentation editor")} />
                        <InternalLink className="menu-link pdf-editor" href={`${hrefLang}/pdf-editor.aspx`} label={t("PDF editor")} />
                        <InternalLink className="menu-link form-creator" href={`${hrefLang}/form-creator.aspx`} label={t("Form creator")} />
                        <InternalLink className="menu-link e-book-creator" href={`${hrefLang}/e-book.aspx`} label={t("E-book creator")} />
                        <InternalLink className="menu-link markdown-editor" href={`${appDirectoryHrefLang}/markdown`} label={t("Markdown editor")} />
                        <InternalLink className="menu-link collaboration-features" href={`${hrefLang}/seamless-collaboration.aspx`} label={t("Collaboration features")} />
                      </div>
                    </div>
                  }
                  {activeTab === 2 &&
                    <div className="menu-submenu">
                      <button onClick={() => setActiveTab(null)} className="mobile-heading-nav-item">{t("Workspace")}</button>
                      <Text className="menu-submenu-text" label={t("Business platform to manage your team activities")} />
                      <InternalLink className="menu-link feature-overview" href={`${hrefLang}/workspace.aspx`} label={t("Feature overview")} />
                      <div className="menu-label">{t("Modules")}</div>
                      <InternalLink className="menu-link documents" href={`${hrefLang}/document-management.aspx`} label={t("Documents")} />
                      <InternalLink className="menu-link crm" href={`${hrefLang}/crm.aspx`} label={t("CRM")} />
                      <InternalLink className="menu-link projects" href={`${hrefLang}/projects.aspx`} label={t("Projects")} />
                      <InternalLink className="menu-link mails" href={`${hrefLang}/mail.aspx`} label={t("Mails")} />
                      <InternalLink className="menu-link calendar" href={`${hrefLang}/calendar.aspx`} label={t("Calendar")} />
                    </div>
                  }
                  {activeTab === 3 &&
                    <div className="menu-submenu">
                      <button onClick={() => setActiveTab(null)} className="mobile-heading-nav-item">{t("Connectors")}</button>
                      <Text className="menu-submenu-text" label={t("Ready-to-use apps to connect Docs or DocSpace to your business platform")} />
                      <div className="menu-submenu-wrapper">
                        <div className="menu-label">{t("For Docs")}</div>
                        <InternalLink className="menu-link box" href={`${hrefLang}/office-for-box.aspx`} label={t("Box")} />
                        <InternalLink className="menu-link confluence" href={`${hrefLang}/office-for-confluence.aspx`} label={t("Confluence")} />
                        <InternalLink className="menu-link dropbox" href={`${hrefLang}/office-for-dropbox.aspx`} label={t("Dropbox")} />
                        <InternalLink className="menu-link moodles" href={`${hrefLang}/office-for-moodle.aspx`} label={t("Moodle")} />
                        <InternalLink className="menu-link nextcloud" href={`${hrefLang}/office-for-nextcloud.aspx`} label={t("Nextcloud")} />
                        <InternalLink className="menu-link odoo" href={`${hrefLang}/office-for-odoo.aspx`} label={t("Odoo")} />
                        <InternalLink className="menu-link owncloud" href={`${hrefLang}/office-for-owncloud.aspx`} label={t("ownCloud")} />
                      </div>
                      <div className="menu-submenu-wrapper">
                        <div className="menu-label">{t("For DocSpace")}</div>
                        <InternalLink className="menu-link zoom" href={`${hrefLang}/office-for-zoom.aspx`} label={t("Zoom")} />
                        <InternalLink className="menu-link wordpress" href={`${hrefLang}/office-for-wordpress.aspx`} label={t("WordPress")} />
                        <InternalLink className="menu-link no-img" href={`${hrefLang}/all-connectors.aspx`} label={t("See all connectors")} />
                      </div>
                    </div>
                  }
                  {activeTab === 4 &&
                    <div className="menu-submenu">
                      <button onClick={() => setActiveTab(null)} className="mobile-heading-nav-item">{t("Marketplace")}</button>
                      <Text className="menu-submenu-text" label={t("Collection of plugins to extend Docs or DocSpace funtionality")} />
                      <div className="menu-submenu-wrapper">
                        <div className="menu-label">{t("AI assistants")}</div>
                        <InternalLink className="menu-link chatgpt" href={`${appDirectoryHrefLang}/openai`} label={t("ChatGPT")} />
                        <InternalLink className="menu-link zhipu-copilot" href={`${appDirectoryHrefLang}/zhipu`} label={t("ZhiPu Copilot")} />
                      </div>
                      <div className="menu-submenu-wrapper">
                        <div className="menu-label">{t("Translators")}</div>
                        <InternalLink className="menu-link apertium" href={`${appDirectoryHrefLang}/apertium`} label={t("Apertium")} />
                        <InternalLink className="menu-link deepl" href={`${appDirectoryHrefLang}/deepl`} label={t("DeepL")} />
                        <InternalLink className="menu-link translator" href={`${appDirectoryHrefLang}/translator`} label={t("Google")} />
                      </div>
                      <div className="menu-submenu-wrapper">
                        <div className="menu-label">{t("Communication")}</div>
                        <InternalLink className="menu-link jitsi" href={`${appDirectoryHrefLang}/jitsi`} label={t("Jitsi")} />
                        <InternalLink className="menu-link telegram" href={`${appDirectoryHrefLang}/telegram`} label={t("Telegram")} />
                        <InternalLink className="menu-link rainbow" href={`${appDirectoryHrefLang}/rainbow`} label={t("Rainbow")} />
                        <InternalLink className="menu-link no-img" href={appDirectoryHrefLang} label={t("See all plugins")} />
                      </div>
                    </div>
                  }
                </div>
                <div className="menu-box bg-gray">
                  <Heading  onClick={() => windowCheck && setActiveTab(5)} className="menu-link online-services" level={4} label={t("Online services")} />
                  <Text className="menu-submenu-text menu-submenu-text-pc" label={t("Perform tasks without registration")} />
                  <div className="menu-submenu">
                    <button onClick={() => setActiveTab(null)} className="mobile-heading-nav-item">{t("Online services")}</button>
                    <Text className="menu-submenu-text menu-submenu-text-mobile" label={t("Perform tasks without registration")} />
                    <div className="menu-box-inner">
                      <div className="menu-label">{t("Templates")}</div>
                      <InternalLink className="menu-link find-pdf-form-templates" href={`https://oforms.onlyoffice.com/${locale === "en" ? "" : locale}`} label={t("Find PDF form templates")} />
                      <InternalLink className="menu-link fill-out-pdf-forms-online" href={`https://oforms.onlyoffice.com/${locale === "en" ? "" : locale}`} label={t("Fill out PDF forms online")} />
                    </div>
                    <div className="menu-box-inner">
                      <div className="menu-label">{t("Convert")}</div>
                      <InternalLink className="menu-link convert-text-files" href={`${hrefLang}/text-file-converter.aspx`} label={t("Convert text files")} />
                      <InternalLink className="menu-link convert-spreadsheets" href={`${hrefLang}/spreadsheet-converter.aspx`} label={t("Convert spreadsheets")} />
                      <InternalLink className="menu-link convert-presentations" href={`${hrefLang}/presentation-converter.aspx`} label={t("Convert presentations")} />
                      <InternalLink className="menu-link convert-pdfs" href={`${hrefLang}/pdf-converter.aspx`} label={t("Convert PDFs")} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="menu-box-bottom">
                <div className="menu-apps">
                  <span className="menu-label">{t("Apps")}</span>
                  <ul className="menu-apps-list">
                    <li><InternalLink className="menu-app-link windows" href={`${hrefLang}/desktop.aspx`} /></li>
                    <li><InternalLink className="menu-app-link macos" href={`${hrefLang}/desktop.aspx`} /></li>
                    <li><InternalLink className="menu-app-link linux" href={`${hrefLang}/desktop.aspx`} /></li>
                    <li><InternalLink className="menu-app-link android" href={`${hrefLang}/office-for-android.aspx`} /></li>
                    <li><InternalLink className="menu-app-link ios" href={`${hrefLang}/office-for-ios.aspx`} /></li>
                  </ul>
                </div>
                <div className="menu-box-bottom-links">
                  <InternalLink className="menu-link ai-assistant" href={`${appDirectoryHrefLang}/openai`} label={t("AI assistant")} /> 
                  <InternalLink className="menu-link accessibility" href={`${hrefLang}/accessibility.aspx`} label={t("Accessibility")} />
                  <InternalLink className="menu-link security" href={`${hrefLang}/security.aspx`} label={t("Security")} />
                </div>
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
                <InternalLink className="menu-link blog" href={`https://onlyoffice.com/blog${locale === "en" ? "" : locale === "zh" ? "/zh-hans" : locale === "pt" ? "/pt-br" : `/${locale}`}`} label={t("Blog")} />
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