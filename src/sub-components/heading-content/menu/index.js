import React, { useState, useEffect } from "react";
import { ReactSVG } from "react-svg";

import LanguageSelector from "../../../../components/language-selector";
import Link from "../../../../components/link";
import InternalLink from "../../../../components/internal-link";

import LogoWhite from "../../../../static/images/logo/logo-white.react.svg";
import LogoBlack from "../../../../static/images/logo/logo-black.react.svg";
import MobileMenu from "../../../../static/icons/mob_menu.svg";

import { StyledMenu } from "./styled-menu";
import Nav from "./nav/nav";

const Menu = ({ t, currentLanguage, template, ...rest }) => {
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

  useEffect(() => {
    window.addEventListener("touchstart", handleClickOutside);
    return () => {
      window.removeEventListener("touchstart", handleClickOutside);
    };
  }, [stateMobile]);

  const handleClickOutside = (e) => {
    if (windowCheck && stateMobile && !e.target.closest(".navbar")) {
      onCloseMenu();
    }
  };

  const NavTemplateClassName = template
    ? "nav-item-links dark"
    : "nav-item-links";

  return (
    <StyledMenu
      template={template}
      className="navbar"
      onMouseLeave={onCloseMenu}
    >
      <InternalLink className="nav-item-logo" href={`/${currentLanguage}`}>
        {template ? (
          <LogoBlack className="site-logo" />
        ) : (
          <LogoWhite className="site-logo" />
        )}
      </InternalLink>
      <ReactSVG
        src={MobileMenu}
        className="nav-items-mobile"
        onClick={toggleMobile}
      />
      <Nav
        currentLanguage={currentLanguage}
        className={NavTemplateClassName}
        stateMobilePND={stateMobile}
        t={t}
      />
      <div className="nav-item-lng">
        {!windowCheck && (
          <Link className="nav-item-tel" href={`tel:${t("tel37166016425")}`}>
            {t("tel37166016425")}
          </Link>
        )}
        <LanguageSelector t={t} currentLanguage={currentLanguage} />
      </div>
    </StyledMenu>
  );
};

export default Menu;
