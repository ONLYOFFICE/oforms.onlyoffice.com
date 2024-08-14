import StyledPhoneMenu from "./styled-phone-menu";
import { useState } from "react";
import { ReactSVG } from "react-svg";
import ExternalLink from "@components/common/external-link";

const PhoneMenu = ({ t, locale }) => {
  const [isOpen, setIsOpen] = useState(false);

  const onCloseSelector = () => {
    if (isOpen === true) {
      setIsOpen(false);
    }
  };

  return (
    <StyledPhoneMenu onMouseLeave={() => onCloseSelector()} onClick={() => setIsOpen(!isOpen)} className={`phone-menu ${isOpen ? "open": ""}`}>
      <button onMouseEnter={() => setIsOpen(true)} className={`phone-btn ${locale === "ar" && "ar"}`}>
        <ReactSVG className="phone-icon" src="/icons/phone.svg" />
      </button>

      <div className="phone-wrapper">
        <div className="phone-label">{t("Ascensio System SIA")}</div>
        <a className="phone-call" href="tel:+37163399867">{t("Phone")}: +371 63399867</a>
        <ExternalLink className="phone-request-call" href={`https://onlyoffice.com${locale === "en" ? "" : `/${locale}`}${"/call-back-form.aspx"}`} label={t("Request a call")} />
      </div>
    </StyledPhoneMenu>
  );
};

export default PhoneMenu;