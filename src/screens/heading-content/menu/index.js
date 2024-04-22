import StyledHeading from "./styled-menu";
import { useState, useEffect } from "react";
import Nav from "./nav/nav";
import PhoneMenu from "./phone-menu";
import LanguageSelector from "@src/common/language-selector";
import InternalLink from "@common/internal-link";
import { ReactSVG } from "react-svg";

const Menu = ({ t, locale, template, stateMobile, setStateMobile }) => {
  const [windowCheck, setWindowCheck] = useState("undefined");

  const logo = template
    ? "https://static-oforms.onlyoffice.com/images/logo/logo-black.react.svg"
    : "https://static-oforms.onlyoffice.com/images/logo/logo-white.react.svg";
  const curLang = `https://www.onlyoffice.com${locale === "en" ? "" : `/${locale}`}`;

  useEffect(() => {
    if (typeof window !== windowCheck) {
      setWindowCheck(window.innerWidth <= 1050);
    };
  }, [windowCheck]);

  useEffect(() => {
    window.addEventListener("touchstart", handleClickOutside);

    return () => {
      window.removeEventListener("touchstart", handleClickOutside);
    };
  }, [stateMobile]);

  const toggleMobile = () => {
    setStateMobile(true);
  };

  const onCloseMenu = () => {
    setStateMobile(false);
  };

  const handleClickOutside = (e) => {
    if (windowCheck && stateMobile && !e.target.closest(".nav")) {
      onCloseMenu();
    };
  };

  return (
    <StyledHeading className={`navbar ${stateMobile ? "is-open" : ""} ${!template ? "main": ""}`} onMouseLeave={onCloseMenu}>
      <button onClick={toggleMobile} className="nav-btn-mobile">
        <ReactSVG src="/icons/mob-menu.svg" />
      </button>
      <InternalLink className="nav-item-logo" href={curLang}>
        <img src={logo} alt="logo"/>
      </InternalLink>
      <div className="overlay"></div>
      <Nav locale={locale} t={t} />
      <div className="nav-selector-wrapper">
        <PhoneMenu t={t} locale={locale} />
        <LanguageSelector t={t} />
      </div>
    </StyledHeading>
  );
};

export default Menu;
