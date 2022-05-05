import React from "react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import Layout from "@components/layout";
import Error404 from "@components/screens/404-page";

const Error404Page = () => {
  const { t } = useTranslation("common");

  return (
    <Layout footerContent={false} headContent={false} headerContent={false}>
      <Layout.SectionMain>
        <Error404 t={t} />
      </Layout.SectionMain>
    </Layout>
  );
};

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, "common")),
  },
});

export default Error404Page;
