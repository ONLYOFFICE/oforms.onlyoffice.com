import { StyledHeading, GlobalStyles } from "./styled-menu";
import { useEffect } from "react";
import Nav from "./nav/nav";
import PhoneMenu from "./phone-menu";
import LanguageSelector from "@src/common/language-selector";
import InternalLink from "@common/internal-link";
import { ReactSVG } from "react-svg";

const Menu = ({ t, locale, template, stateMobile, setStateMobile }) => {
  const logo = template ? "https://static-oforms.onlyoffice.com/images/logo/logo-black.react.svg" : "https://static-oforms.onlyoffice.com/images/logo/logo-white.react.svg";
  const curLang = `https://www.onlyoffice.com${locale === "en" ? "" : `/${locale}`}`;

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
    <StyledHeading onMouseLeave={() => setStateMobile(false)} className={`navbar ${stateMobile ? "is-open" : ""} ${!template ? "main" : ""}`}>
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
    </StyledHeading>
  );
};

export default Menu;
