import React from "react";
import { graphql } from "gatsby";
import { useTranslation } from "gatsby-plugin-react-i18next";

import Layout from "../../components/layout";
import HeadSEO from "../sub-components/head-content";
import Footer from "../sub-components/footer-content";
import MainInfo from "../sub-components/template-page/main";

const Template = ({ pageContext, ...rest }) => {

  const {
    t,
    i18n: { language },
  } = useTranslation();

  const { data, pathName } = pageContext;
  const { seo } = data;
  const { title, description } = seo;

  return (
    <Layout {...rest}>
      <Layout.PageHead>
        <HeadSEO
          title={title}
          metaDescription={description}
          metaKeywords={title}
        />
      </Layout.PageHead>
      <Layout.PageHeader>
      </Layout.PageHeader>
      <Layout.SectionMain>
        <MainInfo data={data} pathName={pathName} language={language} t={t} />
      </Layout.SectionMain>
      <Layout.PageFooter>
        <Footer language={language} t={t} />
      </Layout.PageFooter>
    </Layout>

  );
};

export default Template;

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