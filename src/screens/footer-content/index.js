import { useEffect, useState } from "react";

import StyledFooter from "./styled-footer";
import Social from "./data/social-items";
import Items from "./data/footer-items";
import FooterItem from "./sub-components/footer-item";
import MailPopup from "./sub-components/mail-popup";
import ExternalLink from "@common/link";
import IconButton from "@common/icon-button";
import Text from "@common/text";
import {useTranslation} from "next-i18next";

const date = new Date();
const currentYear = date.getFullYear();

const Footer = ({ language }) => {
  const POSITION_ELEMENTS_ITEM = [1, 2, 3, 4];
  const { t } = useTranslation('common')

  const [modalActive, setModalActive] = useState(false);
  const handlerSetModal = (active) => {
    setModalActive(active);
  };

  const onlyoffice = `https://www.onlyoffice.com${
    language === "en" ? "" : `/${language}`
  }`;
  return (
    <StyledFooter language={language}>
      {POSITION_ELEMENTS_ITEM.map((elements_in_div, id) => (
        <div className="footer-item-group" key={id}>
          {Items.map((it, idx) => {
            return elements_in_div === it.position ? (
              <FooterItem
                dis
                heading={t(it.heading)}
                className={it.className}
                key={`${it.className}-${idx}`}
              >
                {it.link.map((item_link, idx_link) =>
                  item_link.isContact ? (
                    <Text className="contact-text" key={idx_link}>
                      {t(item_link.label)}
                      &nbsp;
                      <ExternalLink
                        className="footer-link-contact"
                        label={item_link.mail}
                        href={item_link.href}
                        alt={item_link.mail}
                      />
                    </Text>
                  ) : (
                    <ExternalLink
                      className="footer-link"
                      label={t(item_link.label)}
                      alt={item_link.label}
                      href={
                        item_link.localize
                          ? onlyoffice + item_link.href
                          : item_link.href
                      }
                      key={`${item_link.label}-${idx_link}`}
                    />
                  )
                )}
              </FooterItem>
            ) : null;
          })}
        </div>
      ))}
      <div className="footer-item-group last">
        <FooterItem heading={`${t("Follow us on")}:`} className="follow">
          <div className="footer-social-links">
            {Social.map((item) => (
              <ExternalLink
                className="footer-social"
                href={item.href}
                title={item.title}
                rel={item.rel}
                alt={item.title}
                target="_blank"
                key={item.title}
                as={item.title === "OnlyOffice" ? "div" : "a"}
                onClick={
                  item.title === "OnlyOffice"
                    ? () => handlerSetModal(true)
                    : null
                }
              >
                <IconButton
                  className={item.className}
                  iconName={item.src}
                  size={item.size}
                  grayed={item.filter}
                  key={item.title}
                />
              </ExternalLink>
            ))}
          </div>
        </FooterItem>
        <div className="footer-copyright-block">
          <span>{t("© Ascensio System SIA", {currentYear})}</span>
          <span>{t("All rights reserved")}</span>
        </div>
      </div>
      <MailPopup active={modalActive} setActive={setModalActive} />
    </StyledFooter>
  );
};

export default Footer;