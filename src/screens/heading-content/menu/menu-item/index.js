import { StyledNavMenu, StyledMenuItemsWrapper } from "./styled-navmenu";
import { useState, useEffect } from "react";
import Heading from "@common/heading";

const MenuItem = ({ children, heading, navHidden, setNavHidden, ...rest }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);

  const handleHoverMenu = () => {
    setShowMenu(true);
  };

  const handleLeaveMenu = () => {
    setShowMenu(false);
  };

  const toggleMenu = () => {
    setShowMobileMenu(!showMobileMenu);
    setNavHidden(!navHidden);
  };

  let resizeWindow = () => {
    setWindowWidth(window.innerWidth);
    setWindowHeight(window.innerHeight);
  };

  const windowCheck = typeof window !== "undefined" && window.innerWidth <= 1024;

  useEffect(() => {
    if (window.innerWidth <= 1024) {
      setShowMenu(false);
    }
  }, []);

  useEffect(() => {
    resizeWindow();
    window.addEventListener("resize", resizeWindow);

    return () => window.removeEventListener("resize", resizeWindow);
  }, [windowWidth, windowHeight]);

  return (
    <StyledNavMenu onMouseLeave={handleLeaveMenu} {...rest} className={`nav-item ${windowCheck && showMobileMenu ? "active" : ""}`}>
      <button
        className={`heading-nav-item ${showMenu ? "active": ""}`}
        onClick={toggleMenu}
        onMouseEnter={handleHoverMenu}
      >{heading}</button>
      {(windowCheck ? showMobileMenu : showMenu) && (
        <StyledMenuItemsWrapper isOpen={showMobileMenu} className="menu-items-wrapper">
          {windowCheck &&
            <Heading onClick={toggleMenu} className="mobile-heading-nav-item" label={heading} />
          }
          {children}
        </StyledMenuItemsWrapper>
      )}
    </StyledNavMenu>
  );
};

export default MenuItem;
