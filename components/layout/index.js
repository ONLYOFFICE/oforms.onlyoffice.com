import React from "react";

import StyledLayout from "./styled-layout";
import Header from "./header";
import Main from "./main";
import Footer from "./footer";
import Head from "./head";

import "../../styles/globals.css";

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
        const { children } = this.props;
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

        return (
            <StyledLayout id="page-layout" className="layout">
                {children}
                <Head>{headContent ? headContent.props.children : null}</Head>

                <Header>{headerContent ? headerContent.props.children : null}</Header>
                <Main>{mainContent ? mainContent.props.children : null}</Main>
                <Footer
                    className="footer"
                    isHomePage={footerContent.props.isHomePage}
                >
                    {footerContent ? footerContent.props.children : null}
                </Footer>
            </StyledLayout>
        );
    }
}

Layout.propTypes = {};

Layout.defaultProps = {};

export default Layout;
