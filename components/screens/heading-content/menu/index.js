import { useState, useEffect } from "react";

import Link from "@components/common/link";
import InternalLink from "@components/common/internal-link";
import LanguageSelector from "@components/common/language-selector";
import Nav from "./nav/nav";
import StyledMenu from "./styled-menu";
import { ReactSVG } from "react-svg";

const Menu = ({ t, currentLanguage, template }) => {
  const [windowCheck, setWindowCheck] = useState("undefined");
  useEffect(() => {
    if (typeof window !== windowCheck) {
      setWindowCheck(window.innerWidth <= 1050);
    }
  }, [windowCheck]);

  const [stateMobile, setStateMobile] = useState(false);

  const toggleMobile = () => {
    setStateMobile(true);
  };

  const onCloseMenu = () => {
    setStateMobile(false);
  };
  /*eslint-disable*/
  useEffect(() => {
    window.addEventListener("touchstart", handleClickOutside);
    return () => {
      window.removeEventListener("touchstart", handleClickOutside);
    };
  }, [stateMobile]);
  /*eslint-enable*/
  const handleClickOutside = (e) => {
    if (windowCheck && stateMobile && !e.target.closest(".navbar")) {
      onCloseMenu();
    }
  };

  const NavTemplateClassName = template
    ? "nav-item-links dark"
    : "nav-item-links";

  const curLang = currentLanguage === "en" ? "/" : `/${currentLanguage}/`;
  const logo = template
    ? "https://static-oforms.teamlab.info/images/logo/logo-black.react.svg"
    : "https://static-oforms.teamlab.info/images/logo/logo-white.react.svg";

  return (
    <StyledMenu
      template={template}
      className="navbar"
      onMouseLeave={onCloseMenu}
    >
      <InternalLink className="nav-item-logo" href={curLang}>
        {/*eslint-disable*/}
        <img
          src={logo}
          alt="logo"
          style={{ width: "153px", height: "28px", cursor: "pointer" }}
        />
        {/*eslint-enable*/}
      </InternalLink>
      {/*eslint-disable*/}
      <ReactSVG
        src="/icons/mob_menu.svg"
        className="nav-items-mobile"
        onClick={toggleMobile}
      />
      {/*eslint-enable*/}
      <Nav
        currentLanguage={currentLanguage}
        className={NavTemplateClassName}
        stateMobilePND={stateMobile}
        t={t}
      />
      <div className="nav-item-lng">
        <Link className="nav-item-tel" href={`tel:${t("tel37166016425")}`}>
          {t("tel37166016425")}
        </Link>
        <LanguageSelector t={t} currentLanguage={currentLanguage} />
      </div>
    </StyledMenu>
  );
};

export default Menu;
