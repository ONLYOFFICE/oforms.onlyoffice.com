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
    language,
    template,
    ...rest
}) => {

    // to do: reRender
    const [windowCheck, setWindowCheck] = useState("undefined");
    useEffect(() => {
        if (typeof window !== windowCheck) {
            setWindowCheck(window.innerWidth < 1050);
        }
    }, []);

    const [stateMobile, setStateMobile] = useState(false);
    const toggleMobile = () => {
        setStateMobile(!stateMobile)
    };

    /////////
    // const useComponentVisible = (initialIsVisible) => {
    //     const [isComponentVisible, setIsComponentVisible] = useState(
    //         initialIsVisible
    //     );
    //     const ref = useRef(null);

    //     const handleHideDropdown = (event) => {
    //         if (event.key === "Escape") {
    //             setIsComponentVisible(false);
    //         }
    //     };

    //     const handleClickOutside = event => {
    //         if (ref.current && !ref.current.contains(event.target)) {
    //             setIsComponentVisible(false);
    //         }
    //     };

    //     useEffect(() => {
    //         document.addEventListener("keydown", handleHideDropdown, true);
    //         document.addEventListener("click", handleClickOutside, true);
    //         return () => {
    //             document.removeEventListener("keydown", handleHideDropdown, true);
    //             document.removeEventListener("click", handleClickOutside, true);
    //         };
    //     });

    //     return { ref, isComponentVisible, setIsComponentVisible };
    // }

    // const {
    //     ref,
    //     isComponentVisible,
    //     setIsComponentVisible
    // } = useComponentVisible(true);

    // const onClickMobileMenu = () => {
    //     setIsComponentVisible(true);
    //     toggleMobile();
    // };

    const onCloseMenu = () => {
        setStateMobile(false)
    }


    ///////////////////
    return (
        <StyledMenu template={template} className="navbar" {...rest}>
            <InternalLink className="nav-item-logo" href="/">
                <ReactSVG src={template ? LogoBlack : LogoWhite} className="nav-logo" />
            </InternalLink>
            <ReactSVG src={MobileMenu} className="nav-items-mobile" onClick={toggleMobile}/>         
            <Nav className={template ? "nav-item-links dark" : "nav-item-links"} stateMobile={stateMobile} t={t} onMouseLeave={onCloseMenu} />        
            <div className="nav-item-lng">
                {!windowCheck &&
                    <Link className="nav-item-tel" href="tel:+371 660 164 25">+371 660 164 25</Link>
                }
                <LanguageSelector t={t} currentLanguage={language} />
            </div>
        </StyledMenu>
    );
};

export default Menu;