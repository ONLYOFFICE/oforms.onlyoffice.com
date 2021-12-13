import React, { useState } from "react";

import ExternalLink from "../../../components/link";
import IconButton from "../../../components/icon-button";
import Text from "../../../components/text";

import StyledFooter from "./styled-footer";

import Social from "./sub-components/social-items";
import FooterItem from "./sub-components/footer-item";
import Items from "./sub-components/footer-items";
import MailPopup from "./sub-components/mail-popup";

const date = new Date();
const currentYear = date.getFullYear();

const Footer = ({
    t,
    language,
    ...rest
}) => {

    const POSITION_ELEMENTS_ITEM = [1, 2, 3];

    const [modalActive, setModalActive] = useState(false);
    const handlerSetModal = (active) => {
        setModalActive(active);
    };

    return (
        <StyledFooter {...rest}>
            {
                POSITION_ELEMENTS_ITEM.map((elements_in_div, id) =>
                    <div className="footer-item-group" key={id}>
                        {
                            Items.map((it, idx) => {
                                return (elements_in_div === it.position) ?
                                    (
                                        <FooterItem
                                            dis
                                            heading={t(it.heading)}
                                            className={it.className}
                                            key={`${it.className}-${idx}`}
                                        >
                                            {
                                                (it.link).map((item_link, idx_link) =>
                                                    <ExternalLink
                                                        className="footer-link"
                                                        label={t(item_link.label)}
                                                        href={item_link.href}
                                                        key={`${item_link.label}-${idx_link}`}
                                                    />
                                                )
                                            }
                                        </FooterItem>
                                    ) : null;
                            })
                        }
                    </div>
                )
            }
            <div className="footer-item-group">
                <FooterItem
                    dis
                    className="contact"
                    heading={t("Contact us")}>
                    <Text className="contact-text">{t("Sales Questions")}
                        &nbsp;
                        <ExternalLink className="footer-link-contact"
                            label="sales@onlyoffice.com"
                            herf="mailto:sales@onlyoffice.com"
                        />
                    </Text>
                    <Text className="contact-text">{t("Sales Questions")}
                        &nbsp;
                        <ExternalLink className="footer-link-contact"
                            label="partners@onlyoffice.com"
                            herf="mailto:partners@onlyoffice.com"
                        />
                    </Text>
                    <Text className="contact-text">{t("Press Inquiries")}
                        &nbsp;
                        <ExternalLink className="footer-link-contact"
                            label="press@onlyoffice.com"
                            herf="mailto:press@onlyoffice.com"
                        />
                    </Text>
                    <Text className="contact-text" label={t("Request a Call")} />
                </FooterItem>
                <FooterItem heading={t("Follow us")} className="follow">
                    <div className="footer-social-links">
                        {Social.map((item) => (
                            <ExternalLink
                                className="footer-social"
                                href={item.href}
                                title={item.title}
                                rel={item.rel}
                                target="_blank"
                                key={item.title}
                                onClick={(item.title == "OnlyOffice" ? () => handlerSetModal(true) : null)}
                            >
                                <IconButton
                                    className={item.className}
                                    iconName={item.src}
                                    size={item.size}
                                    grayed={item.filter}
                                />
                            </ExternalLink>
                        ))}
                    </div>
                </FooterItem>
                <div className="footer-copyright-block">
                    <Text className="footer-copyright">{t("Ascensio System SIA")} {currentYear} {t("All rights reserved")}</Text>
                </div>
            </div>
            <MailPopup active={modalActive} setActive={setModalActive} />
        </StyledFooter>
    );
}

export default Footer;