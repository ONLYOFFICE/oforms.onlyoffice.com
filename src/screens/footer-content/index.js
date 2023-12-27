import StyledFooter from "./styled-footer-content";
import { useState } from "react";
import FooterItem from "./footer-item";
import SocialLinks from "./social-links";
import ExternalLink from "@common/link";
import Text from "@common/text";
import Heading from "@common/heading";
import MailPopup from "./mail-popup";

const date = new Date();
const currentYear = date.getFullYear();

const Footer = ({ t, locale }) => {
  const [popupActive, setPopupActive] = useState(false);
  const handlerSetModal = () => {
    setPopupActive(true);
  };

  const hrefLang = `https://onlyoffice.com${locale === "en" ? "" : `/${locale}`}`;

  return (
    <StyledFooter className={locale} locale={locale}>
      <div className="footer-item-group">
        <FooterItem heading={t("Solutions")} className="solutions" href={`${hrefLang}/solutions.aspx`}>
          <ExternalLink className="footer-link" href={`${hrefLang}/for-small-business.aspx`} label={t("SMBs")} />
          <ExternalLink className="footer-link" href={`${hrefLang}/for-enterprises.aspx`} label={t("Enterprises")} />
          <ExternalLink className="footer-link" href={`${hrefLang}/home-use.aspx`} label={t("Home use")} />
          <ExternalLink className="footer-link" href={`${hrefLang}/for-developers.aspx`} label={t("Developers")} />
          <ExternalLink className="footer-link" href={`${hrefLang}/for-hosting-providers.aspx`} label={t("Hosting providers")} />
          <ExternalLink className="footer-link" href={`${hrefLang}/for-government.aspx`} label={t("Government")} />
          <ExternalLink className="footer-link" href={`${hrefLang}/healthcare.aspx`} label={t("Healthcare")} />
          <ExternalLink className="footer-link" href={`${hrefLang}/for-research.aspx`} label={t("Research")} />
          <ExternalLink className="footer-link" href={`${hrefLang}/education.aspx`} label={t("Education")} />
          <ExternalLink className="footer-link" href={`${hrefLang}/nonprofit-organizations.aspx`} label={t("Nonprofits")} />
        </FooterItem>
      </div>
      <div className="footer-item-group">
        <FooterItem heading={t("Features")} className="features">
          <ExternalLink className="footer-link" href={`${hrefLang}/document-editor.aspx`} label={t("Document Editor")} />
          <ExternalLink className="footer-link" href={`${hrefLang}/spreadsheet-editor.aspx`} label={t("Spreadsheet Editor")} />
          <ExternalLink className="footer-link" href={`${hrefLang}/presentation-editor.aspx`} label={t("Presentation Editor")} />
          <ExternalLink className="footer-link" href={`${hrefLang}/form-creator.aspx`} label={t("Form creator")} />
          <ExternalLink className="footer-link" href={`${hrefLang}/pdf-reader.aspx`} label={t("PDF Editor")} />
          <ExternalLink className="footer-link" href={`${hrefLang}/security.aspx`} label={t("Security")} />
          <ExternalLink className="footer-link" href={`${hrefLang}/accessibility.aspx`} label={t("Accessibility")} />
          <ExternalLink className="footer-link" href={`${hrefLang}/app-directory/chatgpt`} label={t("AI helper")} />
          <ExternalLink className="footer-link" href={`https://onlyoffice.com/app-directory${locale === "fr" || locale === "de" || locale === "es" ? `/${locale}` : ""}`} label={t("App Directory")} />
        </FooterItem>
        <FooterItem heading={t("Connectors")} className="connectors">
          <ExternalLink className="footer-link" href={`${hrefLang}/office-for-nextcloud.aspx`} label={t("Nextcloud")} />
          <ExternalLink className="footer-link" href={`${hrefLang}/office-for-moodle.aspx`} label={t("Moodle")} />
          <ExternalLink className="footer-link" href={`${hrefLang}/office-for-odoo.aspx`} label={t("Odoo")} />
          <ExternalLink className="footer-link" href={`${hrefLang}/office-for-wordpress.aspx`} label={t("WordPress")} />
          <ExternalLink className="footer-link" href={`${hrefLang}/all-connectors.aspx`} label={t("Others")} />
        </FooterItem>
      </div>
      <div className="footer-item-group">
        <FooterItem heading={t("About us")} className="about-us">
          <ExternalLink className="footer-link" href={`${hrefLang}/about.aspx`} label={t("Company")} />
          <ExternalLink className="footer-link" href={`${hrefLang}/customers.aspx`} label={t("Customers")} />
          <ExternalLink className="footer-link" href={`${hrefLang}/customers.aspx#stories`} label={t("Success stories")} />
          <ExternalLink className="footer-link" href={`${hrefLang}/awards.aspx`} label={t("Awards")} />
          <ExternalLink className="footer-link" href={`${hrefLang}/events.aspx`} label={t("Events")} />
          <ExternalLink className="footer-link" href={`${hrefLang}/press-downloads.aspx`} label={t("Press downloads")} />
          <ExternalLink className="footer-link" href="https://shop.spreadshirt.com/onlyoffice" label={t("Gift shop")} />
          <ExternalLink className="footer-link" href={`${hrefLang}/contacts.aspx`} label={t("Contacts")} />
          <ExternalLink className="footer-link" href={`${hrefLang}/legalterms.aspx`} label={t("Legal notice")} />
        </FooterItem>
        <FooterItem heading={t("Collaborate")} className="collaborate">
          <ExternalLink className="footer-link" href={`${hrefLang}/contribute.aspx`} label={t("For contributers")} />
          <ExternalLink className="footer-link" href="https://helpcenter.onlyoffice.com/guides/become-translator.aspx" label={t("For translators")} />
          <ExternalLink className="footer-link" href={`${hrefLang}/influencer-program.aspx`} label={t("For influencers")} />
          <ExternalLink className="footer-link" href={`${hrefLang}/vacancies.aspx`} label={t("Vacancies")} />
        </FooterItem>
      </div>
      <div className="footer-item-group">
        <FooterItem heading={t("Get news")} className="get-news">
          <ExternalLink className="footer-link" href={`https://onlyoffice.com/blog${locale === "en" ? "" : locale === "zh" ? "/zh-hans" : locale === "pt" ? "/pt-br" : `/${locale}`}`} label={t("Blog")} />
        </FooterItem>
        <FooterItem heading={t("Get help")} className="get-help">
          <ExternalLink className="footer-link" href="https://forum.onlyoffice.com/" label={t("Forum")} />
          <ExternalLink className="footer-link" href="https://helpcenter.onlyoffice.com/index.aspx" label={t("Help Center")} />
          <ExternalLink className="footer-link" href={`${hrefLang}/training-courses.aspx`} label={t("Training courses")} />
          <ExternalLink className="footer-link" href={`${hrefLang}/webinars.aspx`} label={t("Webinars")} />
          <ExternalLink className="footer-link" href={`${hrefLang}/whitepapers.aspx`} label={t("White papers")} />
          <ExternalLink className="footer-link" href={`${hrefLang}/support-contact-form.aspx`} label={t("Support contact form")} />
          <ExternalLink className="footer-link" href={`${hrefLang}/demo-order.aspx`} label={t("Order demo")} />
        </FooterItem>
      </div>
      <div className="footer-item-group">
        {
          locale !== "zh" &&
          <FooterItem heading={t("Comparison")} className="comparison" href={`${hrefLang}/document-editor-comparison.aspx`}>
            <ExternalLink className="footer-link" href={`${hrefLang}/best-microsoft-office-alternative.aspx`} label={t("ONLYOFFICE Docs vs MS Office Online")} />
            <ExternalLink className="footer-link" href={`${hrefLang}/best-google-docs-alternative.aspx`} label={t("ONLYOFFICE Docs vs Google Docs")} />
            <ExternalLink className="footer-link" href={`${hrefLang}/best-zoho-docs-alternative.aspx`} label={t("ONLYOFFICE Docs vs Zoho Docs")} />
            <ExternalLink className="footer-link" href={`${hrefLang}/best-libreoffice-alternative.aspx`} label={t("ONLYOFFICE Docs vs LibreOffice")} />
            <ExternalLink className="footer-link" href={`${hrefLang}/best-wps-alternative.aspx`} label={t("ONLYOFFICE Docs vs WPS")} />
            <ExternalLink className="footer-link" href={`${hrefLang}/best-adobe-alternative.aspx`} label={t("ONLYOFFICE Docs vs Adobe Acrobat")} />
            <ExternalLink className="footer-link" href={`${hrefLang}/best-hancom-alternative.aspx`} label={t("ONLYOFFICE Docs vs Hancom")} />
          </FooterItem>
        }
        <FooterItem heading={t("Contact us")} className="contacts">
          <Text className="contact-text">
            {`${t("Sales questions")}${locale === "zh" || locale === "ja" ? "" : " "}`}<ExternalLink className="footer-link-contact" label={t("sales@onlyoffice.com")} href="mailto:sales@onlyoffice.com" />
          </Text>
          <Text className="contact-text">
            {`${t("Partner inquiries")}${locale === "zh" || locale === "ja" ? "" : " "}`}
            <ExternalLink className="footer-link-contact" label={t("partners@onlyoffice.com")} href="mailto:partners@onlyoffice.com" />
          </Text>
          <Text className="contact-text">
            {`${t("Press inquiries")}${locale === "zh" || locale === "ja" ? "" : " "}`}
            <ExternalLink className="footer-link-contact" label={t("press@onlyoffice.com")} href="mailto:press@onlyoffice.com" />
          </Text>
          <ExternalLink href={`${hrefLang}/call-back-form.aspx`} className="footer-link" label={t("Request a call")} />
        </FooterItem>
      </div>

      <div className="footer-item-group-last">
        <div className="footer-follow">
          <Heading label={`${t("Follow us on")}${locale === "ja" || locale === "zh" || locale === "fr" ? "" : ":"}`} level={6} className="footer-item-heading" />
          <SocialLinks locale={locale} handlerSetModal={handlerSetModal} />
        </div>
        <div className="footer-copyright-block">
          <span>{t("© Ascensio System SIA", {currentYear})}</span>
          <span>{t("All rights reserved")}</span>
        </div>
        <MailPopup t={t} active={popupActive} setActive={setPopupActive} />
      </div>
    </StyledFooter>
  );
};

export default Footer;
