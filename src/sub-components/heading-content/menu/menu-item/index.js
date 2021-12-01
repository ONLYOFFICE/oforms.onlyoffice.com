import React, { useState } from "react";

import Heading from "../../../../../components/heading";
import Link from "../../../../../components/link";
import Box from "../nav/box";

import { StyledNavMenu, StyledMenuItemsWrapper } from "./styled-navmenu";

const MenuItem = ({
    children,
    heading,
    ...rest
}) => {

    const [showMenu, setShowMenu] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);

    const handleHoverMenu = () => {
        setShowMenu(true);
    };

    const handleLeaveMenu = () => {
        setShowMenu(false);
    };

    const toggleMenu = () => {
        setShowMobileMenu(!showMobileMenu);
    };

    // useEffect(() => {
    //     if (window.innerWidth < 1050) {
    //         setShowMenu(false);
    //         toggleMenu();
    //     } 
    // }, []);

    //onMouseLeave={handleLeaveMenu}   41

    const windowCheck = typeof window !== 'undefined' && window.innerWidth < 1050;

    return (
        <StyledNavMenu className="nav-item" {...rest} onMouseLeave={handleLeaveMenu}>
            <Heading
                className="heading-nav-item"
                label={heading}
                onMouseEnter={handleHoverMenu}
                onClick={toggleMenu}
            />
            {(windowCheck ? showMobileMenu : showMenu) &&
                <StyledMenuItemsWrapper isOpen={showMobileMenu} className="menu-items-wrapper">
                    {windowCheck &&
                        <Heading
                            className="mobile-heading-nav-item"
                            label={heading}
                            onClick={toggleMenu}
                        />
                    }
                        {children}
                </StyledMenuItemsWrapper>
                }
                {windowCheck &&
                    <Box className="phone_wrapper">
                        <Link className="nav-item-mobile-tel" href="tel:+371 660 164 25">+371 660 164 25</Link>
                    </Box>
                }
        </StyledNavMenu>
    );
};

export default MenuItem;