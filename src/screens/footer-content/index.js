import StyledFooter from "./styled-footer-content";
import { useState } from "react";
import FooterItem from "./footer-item";
import SocialLinks from "./social-links";
import InternalLink from "@common/internal-link";
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
  const appDirectoryHrefLang = `https://onlyoffice.com/app-directory${locale === "en" || locale === "pt" || locale === "it" ? "" : `/${locale}`}`;
  const blogHrefLang = `https://onlyoffice.com/blog${locale === "en" ? "" : locale === "zh" ? "/zh-hans" : locale === "pt" ? "/pt-br" : `/${locale}`}`;

  return (
    <StyledFooter className={locale} locale={locale}>
      <div className="footer-item-group">
        <FooterItem heading={t("Solutions")} className="solutions" href={`${hrefLang}/solutions.aspx`}>
          <InternalLink className="footer-link" href={`${hrefLang}/for-small-business.aspx`} label={t("SMBs")} />
          <InternalLink className="footer-link" href={`${hrefLang}/for-enterprises.aspx`} label={t("Enterprises")} />
          <InternalLink className="footer-link" href={`${hrefLang}/home-use.aspx`} label={t("Home use")} />
          <InternalLink className="footer-link" href={`${hrefLang}/for-developers.aspx`} label={t("Developers")} />
          <InternalLink className="footer-link" href={`${hrefLang}/for-government.aspx`} label={t("Government")} />
          <InternalLink className="footer-link" href={`${hrefLang}/healthcare.aspx`} label={t("Healthcare")} />
          <InternalLink className="footer-link" href={`${hrefLang}/for-research.aspx`} label={t("Research")} />
          <InternalLink className="footer-link" href={`${hrefLang}/education.aspx`} label={t("Education")} />
          <InternalLink className="footer-link" href={`${hrefLang}/nonprofit-organizations.aspx`} label={t("Nonprofits")} />
        </FooterItem>
      </div>
      <div className="footer-item-group">
        <FooterItem heading={t("Features")} className="features">
          <InternalLink className="footer-link" href={`${hrefLang}/document-editor.aspx`} label={t("Document editor")} />
          <InternalLink className="footer-link" href={`${hrefLang}/spreadsheet-editor.aspx`} label={t("Spreadsheet editor")} />
          <InternalLink className="footer-link" href={`${hrefLang}/presentation-editor.aspx`} label={t("Presentation editor")} />
          <InternalLink className="footer-link" href={`${hrefLang}/form-creator.aspx`} label={t("Form creator")} />
          <InternalLink className="footer-link" href={`${hrefLang}/pdf-reader.aspx`} label={t("PDF editor")} />
          <InternalLink className="footer-link" href={`${hrefLang}/security.aspx`} label={t("Security")} />
          <InternalLink className="footer-link" href={`${hrefLang}/accessibility.aspx`} label={t("Accessibility")} />
          <InternalLink className="footer-link" href={`${appDirectoryHrefLang}/openai`} label={t("AI helper")} />
          <InternalLink className="footer-link" href={appDirectoryHrefLang} label={t("App Directory")} />
        </FooterItem>
        <FooterItem heading={t("Connectors")} className="connectors">
          <InternalLink className="footer-link" href={`${hrefLang}/office-for-nextcloud.aspx`} label={t("Nextcloud")} />
          <InternalLink className="footer-link" href={`${hrefLang}/office-for-moodle.aspx`} label={t("Moodle")} />
          <InternalLink className="footer-link" href={`${hrefLang}/office-for-odoo.aspx`} label={t("Odoo")} />
          <InternalLink className="footer-link" href={`${hrefLang}/office-for-wordpress.aspx`} label={t("WordPress")} />
          <InternalLink className="footer-link" href={`${hrefLang}/all-connectors.aspx`} label={t("Others")} />
        </FooterItem>
      </div>
      <div className="footer-item-group">
        <FooterItem heading={t("About us")} className="about-us">
          <InternalLink className="footer-link" href={`${hrefLang}/about.aspx`} label={t("Company")} />
          <InternalLink className="footer-link" href={`${hrefLang}/customers.aspx`} label={t("Customers")} />
          <InternalLink className="footer-link" href={`${hrefLang}/customers.aspx#stories`} label={t("Success stories")} />
          <InternalLink className="footer-link" href={`${hrefLang}/awards.aspx`} label={t("Awards")} />
          <InternalLink className="footer-link" href={`${hrefLang}/events.aspx`} label={t("Events")} />
          <InternalLink className="footer-link" href={`${hrefLang}/press-downloads.aspx`} label={t("Press downloads")} />
          <InternalLink className="footer-link" href="https://shop.spreadshirt.com/onlyoffice" label={t("Gift shop")} />
          <InternalLink className="footer-link" href={`${hrefLang}/contacts.aspx`} label={t("Contacts")} />
          <InternalLink className="footer-link" href={`${hrefLang}/legalterms.aspx`} label={t("Legal notice")} />
        </FooterItem>
        <FooterItem heading={t("Collaborate")} className="collaborate">
          <InternalLink className="footer-link" href={`${hrefLang}/contribute.aspx`} label={t("For contributers")} />
          <InternalLink className="footer-link" href="https://helpcenter.onlyoffice.com/guides/become-translator.aspx" label={t("For translators")} />
          <InternalLink className="footer-link" href={`${hrefLang}/influencer-program.aspx`} label={t("For influencers")} />
          <InternalLink className="footer-link" href={`${hrefLang}/vacancies.aspx`} label={t("Vacancies")} />
        </FooterItem>
      </div>
      <div className="footer-item-group">
        <FooterItem heading={t("Get news")} className="get-news">
          <InternalLink className="footer-link" href={blogHrefLang} label={t("Blog")} />
        </FooterItem>
        <FooterItem heading={t("Get help")} className="get-help">
          <InternalLink className="footer-link" href="https://forum.onlyoffice.com/" label={t("Forum")} />
          <InternalLink className="footer-link" href="https://helpcenter.onlyoffice.com/index.aspx" label={t("Help Center")} />
          <InternalLink className="footer-link" href={`${hrefLang}/training-courses.aspx`} label={t("Training courses")} />
          <InternalLink className="footer-link" href={`${hrefLang}/webinars.aspx`} label={t("Webinars")} />
          <InternalLink className="footer-link" href={`${hrefLang}/whitepapers.aspx`} label={t("White papers")} />
          <InternalLink className="footer-link" href={`${hrefLang}/support-contact-form.aspx`} label={t("Support contact form")} />
          <InternalLink className="footer-link" href={`${hrefLang}/demo-order.aspx`} label={t("Order demo")} />
        </FooterItem>
      </div>
      <div className="footer-item-group">
        {
          locale !== "zh" &&
          <FooterItem heading={t("Comparison")} className="comparison" href={`${hrefLang}/document-editor-comparison.aspx`}>
            <InternalLink className="footer-link" href={`${hrefLang}/best-microsoft-office-alternative.aspx`} label={t("ONLYOFFICE Docs vs MS Office Online")} />
            <InternalLink className="footer-link" href={`${hrefLang}/best-google-docs-alternative.aspx`} label={t("ONLYOFFICE Docs vs Google Docs")} />
            <InternalLink className="footer-link" href={`${hrefLang}/best-zoho-docs-alternative.aspx`} label={t("ONLYOFFICE Docs vs Zoho Docs")} />
            <InternalLink className="footer-link" href={`${hrefLang}/best-libreoffice-alternative.aspx`} label={t("ONLYOFFICE Docs vs LibreOffice")} />
            <InternalLink className="footer-link" href={`${hrefLang}/best-wps-alternative.aspx`} label={t("ONLYOFFICE Docs vs WPS")} />
            <InternalLink className="footer-link" href={`${hrefLang}/best-adobe-alternative.aspx`} label={t("ONLYOFFICE Docs vs Adobe Acrobat")} />
            <InternalLink className="footer-link" href={`${hrefLang}/best-hancom-alternative.aspx`} label={t("ONLYOFFICE Docs vs Hancom")} />
          </FooterItem>
        }
        <FooterItem heading={t("Contact us")} className="contacts">
          <Text className="contact-text">
            {t("Sales questions")}{locale === "zh" || locale === "ja" ? "" : " "}<InternalLink className="footer-link-contact" label={t("sales@onlyoffice.com")} href="mailto:sales@onlyoffice.com" />
          </Text>
          <Text className="contact-text">
            {t("Partner inquiries")}{locale === "zh" || locale === "ja" ? "" : " "}<InternalLink className="footer-link-contact" label={t("partners@onlyoffice.com")} href="mailto:partners@onlyoffice.com" />
          </Text>
          <Text className="contact-text">
            {t("Press inquiries")}{locale === "zh" || locale === "ja" ? "" : " "}<InternalLink className="footer-link-contact" label={t("press@onlyoffice.com")} href="mailto:press@onlyoffice.com" />
          </Text>
          <InternalLink href={`${hrefLang}/call-back-form.aspx`} className="footer-link" label={t("Request a call")} />
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