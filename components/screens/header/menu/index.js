import { StyledHeading, GlobalStyles } from "./styled-menu";
import { useEffect } from "react";
import Nav from "./nav/nav";
import PhoneMenu from "./phone-menu";
import LanguageSelector from "@components/common/language-selector";
import InternalLink from "@components/common/internal-link";
import { ReactSVG } from "react-svg";

const Menu = ({ t, locale, templatePrimary, templateSecondary, templateTertiary, templateQuaternary, stateMobile, setStateMobile }) => {
  const logo = templatePrimary || templateSecondary || templateTertiary || templateQuaternary
    ? "https://static-oforms.onlyoffice.com/images/logo/logo-black.react.svg"
    : "https://static-oforms.onlyoffice.com/images/logo/logo-white.react.svg";
  const curLang = `https://www.onlyoffice.com${locale === "en" || "ar" ? "" : `/${locale}`}`;

  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth <= 1024 && stateMobile) {
      const handleClickOutside = (e) => {
        if (!e.target.closest(".nav")) {
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
    <StyledHeading className={`navbar ${stateMobile ? "is-open" : ""} ${!templatePrimary && !templateSecondary && !templateTertiary && !templateQuaternary ? "main": ""}`}>
      <GlobalStyles stateMobile={stateMobile} />
      <button onClick={() => setStateMobile(true)} className="nav-btn-mobile">
        <ReactSVG src="/icons/mob-menu.svg" />
      </button>
      <InternalLink className="nav-item-logo" href={curLang}>
        <img src={logo} alt="logo" />
      </InternalLink>
      <div className="overlay"></div>
      <Nav locale={locale} t={t} />
      <div className="nav-selector-wrapper">
        <PhoneMenu t={t} locale={locale} />
        <LanguageSelector t={t} />
      </div>
      <InternalLink className="submit-form-btn" label={t("Submit form")} href="/form-submit" />
    </StyledHeading>
  );
};

export default Menu;