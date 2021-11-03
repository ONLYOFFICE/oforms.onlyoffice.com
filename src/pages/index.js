import React from "react";
import Layout from "../../components/layout";
import HeadSEO from "../sub-components/main-page/head-content";
const IndexPage = (props) => {

  return (
    <Layout>
      <Layout.PageHead>
        <HeadSEO />
      </Layout.PageHead>
      <Layout.PageHeader></Layout.PageHeader>
      <Layout.SectionMain></Layout.SectionMain>
      <Layout.PageFooter></Layout.PageFooter>
    </Layout>
  );
};

export default IndexPage;
