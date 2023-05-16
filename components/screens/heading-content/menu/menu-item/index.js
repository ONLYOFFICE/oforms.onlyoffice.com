import { useState, useEffect } from "react";

import Heading from "@components/common/heading";
import Link from "@components/common/link";
import Box from "../nav/sub-components/box";
import { StyledNavMenu, StyledMenuItemsWrapper } from "./styled-navmenu";

const MenuItem = ({ children, heading, href, currentLang, ...rest }) => {
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
  }, [windowWidth, windowHeight]);


  if(href !== undefined) {
    return (
        <StyledNavMenu
            className="nav-item"
            {...rest}
            onMouseLeave={handleLeaveMenu}
        >
          <Link href={href} className="heading-nav-item">{heading}</Link>
        </StyledNavMenu>
    )
  }

  return (
    <StyledNavMenu
      className="nav-item"
      {...rest}
      onMouseLeave={handleLeaveMenu}
      currentLang={currentLang}
    >
      <Heading
        className="heading-nav-item"
        label={heading}
        as="span"
        level={2}
        onClick={toggleMenu}
        onMouseEnter={handleHoverMenu}
      />
      {(windowCheck ? showMobileMenu : showMenu) && (
        <>
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
        </>
      )}
    </StyledNavMenu>
  );
};

export default MenuItem;
