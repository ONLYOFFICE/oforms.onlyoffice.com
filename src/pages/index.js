import React from "react";
import { graphql } from "gatsby";
import { useTranslation } from "gatsby-plugin-react-i18next";

import Layout from "../../components/layout";
import HeadSEO from "../sub-components/head-content";
import HeadingContent from "../sub-components/heading-content";
import InfoContent from "../sub-components/main-page/info-content";
import MainContent from "../sub-components/main-page/main-content";
import Banner from "../sub-components/main-page/banner-cards";
import Accordion from "../sub-components/accordion";
import Footer from "../sub-components/footer-content";

const IndexPage = () => {
  const {
    t,
    i18n: { language },
  } = useTranslation();

  return (
    <Layout>
      <Layout.PageHead>
        <HeadSEO />
      </Layout.PageHead>
      <Layout.PageHeader>
        <HeadingContent t={t} language={language} />
      </Layout.PageHeader>
      <Layout.SectionMain>
        <InfoContent t={t} />
        <MainContent t={t} />
        <Banner t={t} />
        <Accordion t={t} />
      </Layout.SectionMain>
      <Layout.PageFooter>
        <Footer t={t} language={language} />
      </Layout.PageFooter>
    </Layout>
  );
};

export default IndexPage;

export const query = graphql`
  query ($language: String!) {
    locales: allLocale(filter: { language: { in: [$language, "en"] } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
  }
`;
