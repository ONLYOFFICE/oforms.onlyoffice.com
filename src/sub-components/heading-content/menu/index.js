import React from "react";
import { ReactSVG } from "react-svg";

import LogoWhite from "../../../../static/images/logo/logo-white.svg";
import LogoBlack from "../../../../static/images/logo/logo-black.svg";

import StyledMenu from "./styled-menu";

const Menu = ({
    template,
    ...rest
}) => {

    return (
        <StyledMenu template={template}>
            <nav className="navbar">
                <div className="nav-container">
                <a href="/"><ReactSVG src={template ? LogoBlack : LogoWhite} className="nav-logo" /></a>
                    <div className="group-nav-item">
                        <div className="nav-item">
                            <a href="#" className="nav-links">
                                INTEGRATIONS
                            </a>
                        </div>
                        <div className="nav-item">
                            <a href="#" className="nav-links">
                                PRICING
                            </a>
                        </div>
                        <div className="nav-item">
                            <a href="#" className="nav-links">
                                GET ONLYOFFICE
                            </a>
                        </div>
                        <div className="nav-item">
                            <a href="#" className="nav-links">
                                PARTNERS
                            </a>
                        </div>
                        <div className="nav-item">
                            <a href="#" className="nav-links">
                                ABOUT
                            </a>
                        </div>
                    </div>
                    <div  className="nav-item-telephone">
                        +371 660 164 25
                    </div>
                </div>
            </nav>
        </StyledMenu>
    );
};

export default Menu;