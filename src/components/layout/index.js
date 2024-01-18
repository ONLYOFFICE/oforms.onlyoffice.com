import React from "react";
import PropTypes from "prop-types";

import StyledLayout from "./styled-layout";
import Header from "./header";
import Main from "./main";
import Footer from "./footer";
import Head from "./head";
import Announce from "./announce";

function PageHead() {
  return null;
}
PageHead.displayName = "PageHead";

function PageAnnounce() {
  return null;
}
PageAnnounce.displayName = "PageAnnounce";

function PageHeader() {
  return null;
}
PageHeader.displayName = "PageHeader";

function SectionMain() {
  return null;
}
SectionMain.displayName = "SectionMain";

function PageFooter() {
  return null;
}
PageFooter.displayName = "PageFooter";

class Layout extends React.Component {
  static PageHeader = PageHeader;
  static PageAnnounce = PageAnnounce;
  static SectionMain = SectionMain;
  static PageFooter = PageFooter;
  static PageHead = PageHead;

  render() {
    const { children } = this.props;
    let headerContent = null;
    let announceContent = null;
    let mainContent = null;
    let footerContent = null;
    let headContent = null;

    React.Children.forEach(children, (child) => {
      const childType =
        child && child.type && (child.type.displayName || child.type.name);

      switch (childType) {
        case PageHead.displayName:
          headContent = child;
          break;
        case PageAnnounce.displayName:
          announceContent = child;
          break;
        case PageHeader.displayName:
          headerContent = child;
          break;
        case SectionMain.displayName:
          mainContent = child;
          break;
        case PageFooter.displayName:
          footerContent = child;
          break;
        default:
          break;
      }
    });

    const handleDragOver = (e) => {
      e.dataTransfer.dropEffect = "copy";

      e.preventDefault();
      return false;
    };
    
    const handleDrop = (e) => {
      window.sdk["DropOfficeFiles"]();

      e.preventDefault();
      return false;
    };

    return (
      <StyledLayout onDragOver={handleDragOver} onDrop={handleDrop} id="page-layout" className="layout">
        {children}
        {headContent && <Head>{headContent.props.children}</Head>}
        {announceContent && <Announce>{announceContent.props.children}</Announce>}
        {headerContent && <Header>{headerContent.props.children}</Header>}
        <Main>{mainContent ? mainContent.props.children : null}</Main>
        {footerContent && (
          <Footer className="footer">{footerContent.props.children}</Footer>
        )}
      </StyledLayout>
    );
  }
}

Layout.propTypes = {
  headContent: PropTypes.bool,
  announceContent: PropTypes.bool,
  headerContent: PropTypes.bool,
  footerContent: PropTypes.bool,
};

Layout.defaultProps = {
  headContent: true,
  announceContent: true,
  headerContent: true,
  footerContent: true,
};

export default Layout;
