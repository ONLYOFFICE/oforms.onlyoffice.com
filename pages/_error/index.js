import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import Layout from "@components/layout";
import HeadSEO from "@components/screens/head-content";
import Error404 from "@components/screens/404-page";

const ErrorPage = () => {
  const { t } = useTranslation("common");

  return (
    <Layout footerContent={false} headerContent={false}>
      <Layout.PageHead>
        <HeadSEO title={t("Error Page")} metaDescription={t("Error Page")} />
      </Layout.PageHead>
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

export default ErrorPage;
