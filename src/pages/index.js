import React from "react";
import { graphql } from "gatsby";
import { useTranslation } from "gatsby-plugin-react-i18next";

import Layout from "../../components/layout";
import HeadSEO from "../sub-components/head-content";
import { Accordion, AccordionItem } from "../../components/accordion";
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
        <Accordion level={4}>
          <AccordionItem heading="Are ONLYOFFICE forms free to use?">
            Lorem ipsum
          </AccordionItem>
          <AccordionItem heading="Do I need to register to fill out a form?">
            Lorem ipsum
          </AccordionItem>
          <AccordionItem heading="Can I download the forms and create documents using them locally?">
            Lorem ipsum
          </AccordionItem>
        </Accordion>
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