import { StyledHeading, GlobalStyles } from "./styled-menu";
import { useEffect } from "react";
import { HeaderMenu } from "onlyoffice-react-ui-kit/header-menu";
import "onlyoffice-react-ui-kit/header-menu/css";
import PhoneMenu from "./phone-menu";
import LanguageSelector from "@components/common/language-selector";
import InternalLink from "@components/common/internal-link";

const Menu = ({ t, locale, templatePrimary, templateSecondary, templateTertiary, templateQuaternary, stateMobile, setStateMobile }) => {
  const logo = templatePrimary || templateSecondary || templateTertiary || templateQuaternary
    ? "https://static-oforms.onlyoffice.com/images/logo/logo-black.react.svg"
    : "https://static-oforms.onlyoffice.com/images/logo/logo-white.react.svg";
  const curLang = `https://www.onlyoffice.com${locale === "en" || "ar" ? "" : `/${locale}`}`;

  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth <= 1024 && stateMobile) {
      const handleClickOutside = (e) => {
        if (!e.target.closest(".oo-hm")) {
          setStateMobile(false);
        };
      };

      window.addEventListener("touchstart", handleClickOutside);

      return () => {
        window.removeEventListener("touchstart", handleClickOutside);
      };
    }
  }, [stateMobile]);

  return (
    <StyledHeading locale={locale} className={`navbar ${stateMobile ? "is-open" : ""} ${!templatePrimary && !templateSecondary && !templateTertiary && !templateQuaternary ? "main": ""}`}>
      <GlobalStyles stateMobile={stateMobile} />
      <button onClick={() => setStateMobile(true)} className="nav-btn-mobile">
        <svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="20" height="2" fill="white"/>
          <rect y="6" width="20" height="2" fill="white"/>
          <rect y="12" width="20" height="2" fill="white"/>
        </svg>
      </button>
      <InternalLink className="nav-item-logo" href={curLang}>
        <img src={logo} alt="logo" />
      </InternalLink>
      <div className="overlay"></div>
      <HeaderMenu locale={locale} isOpen={stateMobile} />
      <div className="nav-selector-wrapper">
        <PhoneMenu t={t} locale={locale} />
        <LanguageSelector t={t} locale={locale} />
      </div>
      <InternalLink id="submit-form-btn" className="submit-form-btn" label={t("Submit form")} href="/form-submit" />
    </StyledHeading>
  );
};

export default Menu;