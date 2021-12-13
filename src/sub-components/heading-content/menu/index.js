import React, { useState, useEffect } from "react";
import { ReactSVG } from "react-svg";

import LanguageSelector from "../../../../components/language-selector";
import Link from "../../../../components/link";
import InternalLink from "../../../../components/internal-link";

import LogoWhite from "../../../../static/images/logo/logo-white.svg";
import LogoBlack from "../../../../static/images/logo/logo-black.svg";
import MobileMenu from "../../../../static/icons/mob_menu.svg";

import { StyledMenu } from "./styled-menu";
import Nav from "./nav/nav";

const Menu = ({
    t,
    currentLanguage,
    template,
    ...rest
}) => {

    // to do: reRender
    const [windowCheck, setWindowCheck] = useState("undefined");
    useEffect(() => {
        if (typeof window !== windowCheck) {
            setWindowCheck(window.innerWidth < 1050);
        }
    }, [windowCheck]);

    const [stateMobile, setStateMobile] = useState(false);
    const toggleMobile = () => {
        setStateMobile(!stateMobile)
    };

    const onCloseMenu = () => {
        setStateMobile(false);
    };

    useEffect(() => {},[stateMobile]);

    const NavTemplateClassName = template ? "nav-item-links dark" : "nav-item-links";
    return (
        <StyledMenu template={template} className="navbar" {...rest}>
            <InternalLink className="nav-item-logo" href="/">
                <ReactSVG src={template ? LogoBlack : LogoWhite} className="nav-logo" />
            </InternalLink>
            <ReactSVG src={MobileMenu} className="nav-items-mobile" onClick={toggleMobile} />
            <Nav className={NavTemplateClassName} stateMobilePND={stateMobile} t={t} onMouseLeave={onCloseMenu} />
            <div className="nav-item-lng">
                {!windowCheck &&
                    <Link className="nav-item-tel" href="tel:+371 660 164 25">+371 660 164 25</Link>
                }
                <LanguageSelector t={t} currentLanguage={currentLanguage} />
            </div>
        </StyledMenu>
    );
};

export default Menu;