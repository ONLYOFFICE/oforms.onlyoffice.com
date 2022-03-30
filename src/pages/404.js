import React from "react";
import { graphql } from "gatsby";
import { useTranslation } from "gatsby-plugin-react-i18next";

import Layout from "../../components/layout";
import Error404 from "../sub-components/404-page";

const Error404Page = () => {
  const { t } = useTranslation();

  return (
    <Layout>
      <Layout.PageHead></Layout.PageHead>
      <Layout.SectionMain>
        <Error404 t={t} />
      </Layout.SectionMain>
    </Layout>
  );
};

export default Error404Page;

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
