import StyledNav from "./styled-nav";
import MenuItem from "../menu-item";
import Link from "@common/link";
import Text from "@common/text";

const Nav = ({ t, locale, ...rest }) => {
  const hrefLang = `https://onlyoffice.com${locale === "en" ? "" : `/${locale}`}`;

  return (
    <StyledNav className={`nav-item-links ${locale}`} {...rest}>
      <ul>
        <MenuItem heading={t("Products")} id="navitem-products">
          <div className="menu-wrapper">
            <div className="outer-box with-border">
              <div className="dropdown-item-group">
                <Link id="navitem-products-docs" className="dropdown-item" href={`${hrefLang}/office-suite.aspx`} label={t("Docs")} />
                <Text className="dropdown-item-text">{t("Doc editors to integrate into your business platform")}</Text>
              </div>
              <div className="dropdown-item-group">
                <Link id="navitem-products-docspace" className="dropdown-item" href={`${hrefLang}/docspace.aspx`} label={t("DocSpace")} />
                <Text className="dropdown-item-text">{t("Customizable rooms for document collaboration")}</Text>
              </div>
              <div className="dropdown-item-group">
                <Link id="navitem-products-workspace" className="dropdown-item" href={`${hrefLang}/workspace.aspx`} label={t("Workspace")} />
                <Text className="dropdown-item-text">{t("Business platform to manage your team activities")}</Text>
              </div>
              <div className="dropdown-item-group">
                <Link id="navitem-products-connectors" className="dropdown-item" href={`${hrefLang}/all-connectors.aspx`} label={t("Connectors")} />
                <Text className="dropdown-item-text">{t("Ready-to-use apps to integrate Docs with your platform")}</Text>
              </div>
            </div>
            <div className="outer-box with-border">
              <div id="navitem-products-mob-desktop-apps" className="dropdown-item-label">{t("Desktop & mobile apps")}</div>
              <Link id="navitem-products-for-desktop" className="dropdown-item" href={`${hrefLang}/desktop.aspx`} label={t("For desktop")} />
              <Link id="navitem-products-for-ios" className="dropdown-item" href={`${hrefLang}/office-for-ios.aspx`} label={t("For iOS")} />
              <Link id="navitem-products-for-android" className="dropdown-item" href={`${hrefLang}/office-for-android.aspx`} label={t("For Android")} />
            </div>
            <div className="outer-box">
              <div className="dropdown-item-label">{t("Perform your tasks online")}</div>
              <Link id="navitem-products-find-templates" className="dropdown-item" href={`https://oforms.onlyoffice.com/${locale === "en" ? "" : locale}`} label={t("Find form templates")} />
              <Link id="navitem-products-oforms" className="dropdown-item" href={`https://oforms.onlyoffice.com/${locale === "en" ? "" : locale}`} label={t("Fill out oforms")} />
              <Link id="navitem-products-convert-text" className="dropdown-item" href={`${hrefLang}/text-file-converter.aspx`} label={t("Convert text files")} />
              <Link id="navitem-products-convert-spreadsheets" className="dropdown-item" href={`${hrefLang}/spreadsheet-converter.aspx`} label={t("Convert spreadsheets")} />
              <Link id="navitem-products-convert-presentations" className="dropdown-item" href={`${hrefLang}/presentation-converter.aspx`} label={t("Convert presentations")} />
              <Link id="navitem-products-convert-pdfs" className="dropdown-item" href={`${hrefLang}/pdf-converter.aspx`} label={t("Convert PDFs")} />
            </div>
          </div>
        </MenuItem>

        <MenuItem heading={t("Enterprise")} id="navitem-enterprise">
          <div className="menu-wrapper">
            <div className="outer-box">
              <Link id="navitem-enterprise-overview" className="dropdown-item" href={`${hrefLang}/for-enterprises.aspx`} label={t("All Enterprise solutions")} />
              <Link id="navitem-enterprise-docspace-enterprise" className="dropdown-item" href={`${hrefLang}/docspace-enterprise.aspx`} label={t("DocSpace Enterprise")} />
              <Link id="navitem-enterprise-docs-enterprise" className="dropdown-item" href={`${hrefLang}/docs-enterprise.aspx`} label={t("Docs Enterprise")} />
              <Link id="navitem-enterprise-pricing" className="dropdown-item" href={`${hrefLang}/docs-enterprise-prices.aspx`} label={t("Pricing")} />
              <Link id="navitem-enterprise-get" className="dropdown-item" href={`${hrefLang}/download-docs.aspx`} label={t("Get it now")} />
            </div>
          </div>
        </MenuItem>

        <MenuItem heading={t("Developers")} id="navitem-developers">
          <div className="menu-wrapper">
            <div className="outer-box">
              <Link id="navitem-developers-all-dev-solutions" className="dropdown-item" href={`${hrefLang}/for-developers.aspx`} label={t("All Developer solutions")} />
              <Link id="navitem-developers-docs-dev" className="dropdown-item" href={`${hrefLang}/developer-edition.aspx`} label={t("Docs Developer")} />
              <Link id="navitem-developers-conversion-api" className="dropdown-item" href={`${hrefLang}/conversion-api.aspx`} label={t("Conversion API")} />
              <Link id="navitem-developers-doc-builder" className="dropdown-item" href={`${hrefLang}/document-builder.aspx`} label={t("Document Builder")} />
              <Link id="navitem-developers-api-doc" className="dropdown-item" href="https://api.onlyoffice.com/" label={t("API Documentation")} />
              <Link id="navitem-developers-pricing" className="dropdown-item" href={`${hrefLang}/developer-edition-prices.aspx`} label={t("Pricing")} />
              <Link id="navitem-developers-get" className="dropdown-item" href={`${hrefLang}/download-docs.aspx?from=downloadintegrationmenu#docs-developer`} label={t("Get it now")} />
            </div>
            <div className="outer-box bg-gray">
              <Link className="dropdown-item-box" href={`${hrefLang}/see-it-in-action.aspx`}>
                <div id="navitem-developers-see-it" className="dropdown-item-title">{t("See it in action!")}</div>
                <div id="see-it-div" className="menu-pic-div">
                  <div id="see-it-img" className="menu-pic-img"></div>
                  <p id="see-it-header" className="menu-pic-header">{t("Curious to know what the interface looks like and try the main functionality without registration?")}</p>
                </div>
              </Link>
            </div>
          </div>
        </MenuItem>

        <MenuItem heading={t("Get ONLYOFFICE")} id="navitem-download">
          <div className="menu-wrapper">
            <div className="outer-box with-border">
              <div id="navitem-download-for-business" className="dropdown-item-label">{t("For business")}</div>
              <div id="navitem-download-docspace" className="dropdown-item">{t("DocSpace")}</div>
              <div className="inner-box">
                <div className="inner-box-links">
                  <Link id="navitem-download-docspace-signin" className="nav-2nd-menu-link" href={`${hrefLang}/docspace-signin.aspx`} label={t("Sign in")} />
                  /
                  <Link id="navitem-download-docspace-signup" className="nav-2nd-menu-link" href={`${hrefLang}/docspace-registration.aspx`} label={t("Sign up for cloud")} />
                </div>
                <Link id="navitem-download-docspace-onpremises" className="nav-2nd-menu-link" href={`${hrefLang}/download-docspace.aspx?from=downloadintegrationmenu#docspace-enterprise`} label={t("Install on-premises")} />
              </div>
              <div id="navitem-download-docs-enterprise" className="dropdown-item">{t("Docs Enterprise")}</div>
              <div className="inner-box">
                <div className="inner-box-links">
                  <Link id="navitem-download-docs-enterprise-signin" className="nav-2nd-menu-link" href={`${hrefLang}/docs-cloud-signin.aspx`} label={t("Sign in")} />
                  /
                  <Link id="navitem-download-docs-enterprise-signup" className="nav-2nd-menu-link" href={`${hrefLang}/docs-registration.aspx`} label={t("Sign up for cloud")} />
                </div>
                <Link id="navitem-download-docs-enterprise-onpremises" className="nav-2nd-menu-link" href={`${hrefLang}/download-docs.aspx?from=downloadintegrationmenu#docs-enterprise`} label={t("Install on-premises")} />
              </div>
              <div id="navitem-download-workspace" className="dropdown-item">{t("Workspace")}</div>
              <div className="inner-box">
                <Link id="navitem-download-signin" className="nav-2nd-menu-link" href={`${hrefLang}/signin.aspx`} label={t("Sign in")} />
                <Link id="navitem-download-onpremises" className="nav-2nd-menu-link" href={`${hrefLang}/download-workspace.aspx`} label={t("Install on-premises")} />
              </div>
              <Link id="navitem-download-connectors" className="dropdown-item" href={`${hrefLang}/download-connectors.aspx`} label={t("Connectors")} />
              <Link id="navitem-download-desktop-mob" className="dropdown-item" href={`${hrefLang}/download-desktop.aspx`} label={t("Desktop & mobile apps")} />
            </div>
            <div className="outer-box">
              <div id="navitem-download-for-dev" className="dropdown-item-label">{t("For developers")}</div>
              <div id="navitem-download-docs-dev" className="dropdown-item">{t("Docs Developer")}</div>
              <div className="inner-box">
                <Link id="navitem-download-enterprise-onpremises" className="nav-2nd-menu-link" href={`${hrefLang}/download-docs.aspx?from=downloadintegrationmenu#docs-developer`} label={t("Install on-premises")} />
              </div>
              <Link id="navitem-download-docs-builder" className="dropdown-item" href={`${hrefLang}/download-builder.aspx`} label={t("Document Builder")} />
              <div className="outer-box-line"></div>
              <div id="navitem-download-for-community" className="dropdown-item-label">{t("For community")}</div>
              <Link id="navitem-download-docs-community" className="dropdown-item" href={`${hrefLang}/download-docs.aspx#docs-community`} label={t("Docs Community")} />
              <Link id="navitem-download-code-git" className="dropdown-item" href="https://github.com/ONLYOFFICE/" label={t("Code on GitHub")} />
            </div>
          </div>
        </MenuItem>

        <MenuItem heading={t("Pricing")} id="navitem-pricing">
          <div className="menu-wrapper">
            <div className="outer-box">
              <div id="navitem-pricing-for-business" className="dropdown-item-label">{t("For business")}</div>
              <Link id="navitem-pricing-docs-docspace" className="dropdown-item" href={`${hrefLang}/docspace-prices.aspx`} label={t("DocSpace")} />
              <Link id="navitem-pricing-docs-enterprice" className="dropdown-item" href={`${hrefLang}/docs-enterprise-prices.aspx`} label={t("Docs Enterprise")} />
              <Link id="navitem-prices-workspace" className="dropdown-item" href={`${hrefLang}/workspace-prices.aspx`} label={t("Workspace")} />
              <div className="outer-box-line"></div>
              <div id="navitem-pricing-for-dev" className="dropdown-item-label">{t("For developers")}</div>
              <Link id="navitem-pricing-docs-dev" className="dropdown-item" href={`${hrefLang}/developer-edition-prices.aspx`} label={t("Docs Developer")} />
            </div>
            <div className="outer-box bg-gray">
              <Link className="dropdown-item-box" href={`${hrefLang}/find-partners.aspx`}>
                <div id="navitem-pricing-partner" className="dropdown-item-title">{t("Buy from an ONLYOFFICE reseller")}</div>
                <div id="reseller-div" className="menu-pic-div">
                  <div id="reseller-img" className="menu-pic-img"></div>
                  <p id="reseller-header" className="menu-pic-header">{t("Find out the list of all the authorized ONLYOFFICE resellers in your area")}</p>
                </div>
              </Link>
            </div>
          </div>
        </MenuItem>

        <MenuItem heading={t("Partners")} id="navitem-partners">
          <div className="menu-wrapper">
            <div className="outer-box">
              <Link id="navitem-partners-resellers" className="dropdown-item" href={`${hrefLang}/resellers.aspx`} label={t("Resellers")} />
              <Link id="navitem-partners-affiliates" className="dropdown-item" href={`${hrefLang}/affiliates.aspx`} label={t("Affiliates")} />
              <Link id="navitem-partners-hosting-providers" className="dropdown-item" href={`${hrefLang}/hosting-providers.aspx`} label={t("Hosting providers")} />
              <Link id="navitem-partners-technology-partners" className="dropdown-item" href={`${hrefLang}/technology-partners.aspx`} label={t("Technology partners")} />
              <Link id="navitem-partners-find-partners" className="dropdown-item" href={`${hrefLang}/find-partners.aspx`} label={t("Find partners")} />
              <Link id="navitem-partners-submit-request" className="dropdown-item" href={`${hrefLang}/partnership-request.aspx`} label={t("Submit request")} />
            </div>
            <div className="outer-box bg-gray">
              <Link className="dropdown-item-box" href={`${hrefLang}/events.aspx`}>
                <div id="navitem-latest-events" className="dropdown-item-title">{t("Events")}</div>
                <div id="latest-events-div" className="menu-pic-div">
                  <div id="latest-events-img" className="menu-pic-img"></div>
                  <p id="latest-events-header" className="menu-pic-header">{t("Meet the ONLYOFFICE team")}</p>
                </div>
              </Link>
            </div>
          </div>
        </MenuItem>

        <MenuItem heading={t("Resources")} id="navitem-resources">
          <div className="menu-wrapper">
            <div className="outer-box with-border">
              <div id="navitem-resources-abous-us" className="dropdown-item-label">{t("About us")}</div>
              <Link id="navitem-resources-about" className="dropdown-item" href={`${hrefLang}/about.aspx`} label={t("Company")} />
              <Link id="navitem-resources-customers" className="dropdown-item" href={`${hrefLang}/customers.aspx`} label={t("Customers")} />
              <Link id="navitem-resources-success-stories" className="dropdown-item" href={`${hrefLang}/customers.aspx#stories`} label={t("Success stories")} />
              <Link id="navitem-resources-awards" className="dropdown-item" href={`${hrefLang}/awards.aspx`} label={t("Awards")} />
              <Link id="navitem-resources-events" className="dropdown-item" href={`${hrefLang}/events.aspx`} label={t("Events")} />
              <Link id="navitem-resources-pressdownloads" className="dropdown-item" href={`${hrefLang}/press-downloads.aspx`} label={t("Press downloads")} />
              <Link id="navitem-resources-giftshop" className="dropdown-item" href="https://shop.spreadshirt.com/onlyoffice" label={t("Gift shop")} />
              <Link id="navitem-resources-contacts" className="dropdown-item" href={`${hrefLang}/contacts.aspx`} label={t("Contacts")} />
            </div>
            <div className="outer-box">
              <div id="navitem-resources-collaborate" className="dropdown-item-label">{t("Collaborate")}</div>
              <Link id="navitem-resources-for-contribute" className="dropdown-item" href={`${hrefLang}/contribute.aspx`} label={t("For contributers")} />
              <Link id="navitem-resources-for-translators" className="dropdown-item" href="https://helpcenter.onlyoffice.com/guides/become-translator.aspx" label={t("For translators")} />
              <Link id="navitem-resources-for-influencers" className="dropdown-item" href={`${hrefLang}/influencer-program.aspx`} label={t("For influencers")} />
              <Link id="navitem-resources-vacancies" className="dropdown-item" href={`${hrefLang}/vacancies.aspx`} label={t("Vacancies")} />
              <div className="outer-box-line"></div>
              <div id="navitem-resources-get-help" className="dropdown-item-label">{t("Get help")}</div>
              <Link id="navitem-resources-forum" className="dropdown-item" href="https://forum.onlyoffice.com/" label={t("Forum")} />
              <Link id="navitem-resources-help" className="dropdown-item" href="https://helpcenter.onlyoffice.com/index.aspx" label={t("Help Center")} />
              <Link id="navitem-resources-training-courses" className="dropdown-item" href={`${hrefLang}/training-courses.aspx`} label={t("Training courses")} />
              <Link id="navitem-resources-webinars" className="dropdown-item" href={`${hrefLang}/webinars.aspx`} label={t("Webinars")} />
              <Link id="navitem-resources-whitepapers" className="dropdown-item" href={`${hrefLang}/whitepapers.aspx`} label={t("White papers")} />
            </div>
            <div className="outer-box bg-gray">
              <Link id="navitem-resources-blog" className="dropdown-item" href={`https://onlyoffice.com/blog${locale === "en" ? "" : locale === "zh" ? "/zh-hans" : `/${locale}`}`} label={t("Blog")} />
              <div id="blog-box">
                <Link id="blog-box-1" className="dropdown-item-box" href={t("blogLink1")}>
                  <div className="menu-blog-img"></div>
                  <div className="menu-blog-header">{t("ONLYOFFICE Docs 7.5 released: PDF Editor, automatic hyphenation, Page Breaks and tracer arrows in sheets, Screen Readers, and more")}</div>
                  <div className="menu-blog-date">{t("18 October 2023")}</div>
                </Link>
                <Link id="blog-box-2" className="dropdown-item-box" href={t("blogLink2")}>
                  <div className="menu-blog-img"></div>
                  <div className="menu-blog-header">{t("New integration available: ONLYOFFICE & Box")}</div>
                  <div className="menu-blog-date">{t("27 September 2023")}</div>
                </Link>
              </div>
            </div>
          </div>
        </MenuItem>
      </ul>

      <a className="phone-mobile" href="tel:+37163399867">
        +371 633 998 67
      </a>
    </StyledNav>
  );
};

export default Nav;