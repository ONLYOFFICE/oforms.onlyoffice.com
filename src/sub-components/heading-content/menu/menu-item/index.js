import React, { useState, useEffect } from "react";

import Heading from "../../../../../components/heading";
import Link from "../../../../../components/link";
import Box from "../nav/sub-components/box";

import { StyledNavMenu, StyledMenuItemsWrapper } from "./styled-navmenu";

const MenuItem = ({ children, heading, ...rest }) => {
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

  const windowCheck =
    typeof window !== "undefined" && window.innerWidth <= 1050;

  useEffect(() => {
    if (window.innerWidth <= 1050) {
      setShowMenu(false);
    }
  }, []);

  const [windowWidth, setWindowWidth] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);
  let resizeWindow = () => {
    setWindowWidth(window.innerWidth);
    setWindowHeight(window.innerHeight);
  };

  useEffect(() => {
    resizeWindow();
    window.addEventListener("resize", resizeWindow);
    return () => window.removeEventListener("resize", resizeWindow);
  }, []);

  return (
    <StyledNavMenu
      className="nav-item"
      {...rest}
      onMouseLeave={handleLeaveMenu}
    >
      <Heading
        className="heading-nav-item"
        label={heading}
        level={2}
        onClick={toggleMenu}
        onMouseEnter={handleHoverMenu}
      />
      {(windowCheck ? showMobileMenu : showMenu) && (
        <StyledMenuItemsWrapper
          isOpen={showMobileMenu}
          className="menu-items-wrapper"
        >
          {windowCheck && (
            <Heading
              className="mobile-heading-nav-item"
              label={heading}
              onClick={toggleMenu}
            />
          )}
          {children}
        </StyledMenuItemsWrapper>
      )}
      {windowCheck && (
        <Box className="phone_wrapper">
          <Link className="nav-item-mobile-tel" href="tel:+371 660 164 25">
            +371 660 164 25
          </Link>
        </Box>
      )}
    </StyledNavMenu>
  );
};

export default MenuItem;
