import React from "react";
import { graphql } from "gatsby";
import { useTranslation } from "gatsby-plugin-react-i18next";

import Layout from "../../components/layout";
import HeadSEO from "../sub-components/head-content";

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
      <Layout.PageHeader></Layout.PageHeader>
      <Layout.SectionMain>
        <div>Test render gatsby!</div>
      </Layout.SectionMain>
      <Layout.PageFooter></Layout.PageFooter>
    </Layout>
  );

};

export default IndexPage;

export const query = graphql`
  query($language: String!) {
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
