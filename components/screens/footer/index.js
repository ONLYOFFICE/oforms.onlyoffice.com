import StyledFooter from "./styled-footer";
import { useState } from "react";
import FooterItem from "./footer-item";
import SocialLinks from "./social-links";
import InternalLink from "@components/common/internal-link";
import Text from "@components/common/text";
import Heading from "@components/common/heading";
import MailPopup from "./mail-popup";

const date = new Date();
const currentYear = date.getFullYear();

const Footer = ({ t, locale }) => {
  const [popupActive, setPopupActive] = useState(false);
  const handlerSetModal = () => {
    setPopupActive(true);
  };

  const hrefLang = `https://onlyoffice.com${locale === "en" ? "" : `/${locale}`}`;
  const oformsHrefLang = `https://oforms.onlyoffice.com/${locale === "en" ? "" : locale}`;
  const blogHrefLang = `https://onlyoffice.com/blog${locale === "en" ? "" : locale === "zh" ? "/zh-hans" : locale === "pt" ? "/pt-br" : `/${locale}`}`;

  return (
    <StyledFooter className={locale} locale={locale}>
      <div className="footer-apps">
        <Heading className="footer-apps-title" level={6} label={t("Get free apps")} />
        <ul className="footer-apps-items">
          <li><InternalLink className="windows" href={`${hrefLang}/download-desktop.aspx`} label={t("For Windows")} /></li>
          <li><InternalLink className="linux" href={`${hrefLang}/download-desktop.aspx`} label={t("For Linux")} /></li>
          <li><InternalLink className="macos" href={`${hrefLang}/download-desktop.aspx`} label={t("For macOS")} /></li>
          <li><InternalLink className="android" href={`${hrefLang}/download-desktop.aspx#mobile`} label={t("For Android")} /></li>
          <li><InternalLink className="ios" href={`${hrefLang}/download-desktop.aspx#mobile`} label={t("For iOS")} /></li>
        </ul>
      </div>
      <div className="footer-items">
        <div className="footer-item-group">
          <FooterItem heading={t("Templates")} className="templates">
            <InternalLink className="footer-link" href={oformsHrefLang} label={t("PDF form templates")} />
            <InternalLink className="footer-link" href={oformsHrefLang} label={t("Text document templates")} />
            <InternalLink className="footer-link" href={oformsHrefLang} label={t("Spreadsheet templates")} />
            <InternalLink className="footer-link" href={oformsHrefLang} label={t("Presentation templates")} />
          </FooterItem>
          <FooterItem heading={t("Converters")} className="solutions">
            <InternalLink className="footer-link" href={`${hrefLang}/text-file-converter.aspx`} label={t("Convert text files")} />
            <InternalLink className="footer-link" href={`${hrefLang}/spreadsheet-converter.aspx`} label={t("Convert spreadsheets")} />
            <InternalLink className="footer-link" href={`${hrefLang}/presentation-converter.aspx`} label={t("Convert presentations")} />
            <InternalLink className="footer-link" href={`${hrefLang}/pdf-converter.aspx`} label={t("Convert PDFs")} />
          </FooterItem>
        </div>
        <div className="footer-item-group">
          <FooterItem heading={t("Get news")} className="get-news">
            <InternalLink className="footer-link" href={blogHrefLang} label={t("Blog")} />
          </FooterItem>
          <FooterItem heading={t("Collaborate")} className="collaborate">
            <InternalLink className="footer-link" href={`${hrefLang}/contribute.aspx`} label={t("For contributers")} />
            <InternalLink className="footer-link" href="https://helpcenter.onlyoffice.com/guides/become-translator.aspx" label={t("For translators")} />
            <InternalLink className="footer-link" href={`${hrefLang}/influencer-program.aspx`} label={t("For influencers")} />
            <InternalLink className="footer-link" href={`${hrefLang}/vacancies.aspx`} label={t("Vacancies")} />
          </FooterItem>
        </div>
        <div className="footer-item-group">
          <FooterItem heading={t("Get help")} className="get-help">
            <InternalLink className="footer-link" href="https://forum.onlyoffice.com/" label={t("Forum")} />
            <InternalLink className="footer-link" href="https://helpcenter.onlyoffice.com/index.aspx" label={t("Help Center")} />
            <InternalLink className="footer-link" href={`${hrefLang}/training-courses.aspx`} label={t("Training courses")} />
            <InternalLink className="footer-link" href={`${hrefLang}/webinars.aspx`} label={t("Webinars")} />
            <InternalLink className="footer-link" href={`${hrefLang}/whitepapers.aspx`} label={t("White papers")} />
            <InternalLink className="footer-link" href={`${hrefLang}/support-contact-form.aspx`} label={t("Support contact form")} />
            <InternalLink className="footer-link" href={`${hrefLang}/demo-order.aspx`} label={t("Order demo")} />
            <InternalLink className="footer-link" href={`${hrefLang}/legalterms.aspx`} label={t("Legal notice")} />
          </FooterItem>
        </div>
        {locale !== "zh" &&
          <div className="footer-item-group">
            <FooterItem heading={t("Comparison")} className="comparison" href={`${hrefLang}/document-editor-comparison.aspx`}>
              <InternalLink className="footer-link" href={`${hrefLang}/best-microsoft-office-alternative.aspx`} label={t("ONLYOFFICE Docs vs MS Office Online")} />
              <InternalLink className="footer-link" href={`${hrefLang}/best-google-docs-alternative.aspx`} label={t("ONLYOFFICE Docs vs Google Docs")} />
              <InternalLink className="footer-link" href={`${hrefLang}/best-zoho-docs-alternative.aspx`} label={t("ONLYOFFICE Docs vs Zoho Docs")} />
              <InternalLink className="footer-link" href={`${hrefLang}/best-libreoffice-alternative.aspx`} label={t("ONLYOFFICE Docs vs LibreOffice")} />
              <InternalLink className="footer-link" href={`${hrefLang}/best-wps-alternative.aspx`} label={t("ONLYOFFICE Docs vs WPS")} />
              <InternalLink className="footer-link" href={`${hrefLang}/best-adobe-alternative.aspx`} label={t("ONLYOFFICE Docs vs Adobe Acrobat")} />
              <InternalLink className="footer-link" href={`${hrefLang}/best-hancom-alternative.aspx`} label={t("ONLYOFFICE Docs vs Hancom")} />
            </FooterItem>
          </div>
        }
        <div className="footer-item-group">
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
      </div>
      <div className="footer-bottom">
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