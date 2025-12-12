import React from "react";
import PropTypes from "prop-types";

import StyledLayout from "./styled-layout";
import Header from "./header";
import Main from "./main";
import Footer from "./footer";
import Head from "./head";
import CookieBanner from "./cookies/banner";

function PageHead() {
  return null;
}
PageHead.displayName = "PageHead";

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
  static SectionMain = SectionMain;
  static PageFooter = PageFooter;
  static PageHead = PageHead;

  render() {
    const { children, locale } = this.props;
    let headerContent = null;
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
      window.AscDesktopEditor["DropOfficeFiles"]();

      e.preventDefault();
      return false;
    };

    return (
      <StyledLayout
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        $locale={locale}
        id="page-layout"
        className="layout"
      >
        {children}
        {headContent && <Head>{headContent.props.children}</Head>}
        {headerContent && <Header>{headerContent.props.children}</Header>}
        <Main>{mainContent ? mainContent.props.children : null}</Main>
        {footerContent && (
          <Footer className="footer">{footerContent.props.children}</Footer>
        )}
        <CookieBanner />
      </StyledLayout>
    );
  }
}

Layout.propTypes = {
  headContent: PropTypes.bool,
  headerContent: PropTypes.bool,
  footerContent: PropTypes.bool,
};

export default Layout;
