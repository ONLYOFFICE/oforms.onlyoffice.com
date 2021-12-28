import React from "react";
import { graphql } from "gatsby";

import Layout from "../../components/layout";
import HeadSEO from "../sub-components/head-content";
import CustomQueryStringComponent from "../api/customQuery";
export default () => {
  return (
    <Layout>
      <Layout.PageHead>
        <HeadSEO />
      </Layout.PageHead>
      <CustomQueryStringComponent />
    </Layout>
  );
};

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
