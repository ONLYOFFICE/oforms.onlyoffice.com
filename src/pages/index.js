import React from "react";
import { graphql } from "gatsby";
import { useTranslation } from "gatsby-plugin-react-i18next";

import Layout from "../../components/layout";
import HeadSEO from "../sub-components/head-content";
import ShortCard from "../sub-components/main-page/heading-content/short-card";

const array = [{
  title: "title",
  subtitle: "subtitle",
  linkUrl: "linkUrl",
  hrefButtom: "hrefButtom"
},
{
  title: "title1",
  subtitle: "subtitle1",
  linkUrl: "linkUrl1",
  hrefButtom: "hrefButtom1"
}
]

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
        {array.map((it) => 
          <ShortCard array={it} t={t}/>
        )}
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