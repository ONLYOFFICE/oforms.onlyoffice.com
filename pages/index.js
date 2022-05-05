import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import getAllForms from "@lib/strapi/getForms";

import Layout from "@components/layout";
import HeadSEO from "@components/screens/head-content";
import HeadingContent from "@components/screens/heading-content";
import InfoContent from "@components/screens/main-page/info-content";

const MainContent = dynamic(
  () => import("@components/screens/main-page/main-content"),
  {
    loading: () => <div />,
    ssr: false,
  }
);
const Accordion = dynamic(
  () => import("@components/screens/common/accordion"),
  {
    loading: () => <div />,
    // suspense: true,
    ssr: false,
  }
);
const Footer = dynamic(() => import("@components/screens/footer-content"), {
  loading: () => <div />,
  // suspense: true,
  ssr: false,
});

const Index = ({ forms, page }) => {
  const { locale, ...ctx } = useRouter();
  const { t } = useTranslation("common");

  return (
    <Layout>
      <Layout.PageHead>
        <HeadSEO
          title={t("titleIndexPage")}
          metaSiteNameOg={t("metaSiteNameOg")}
          metaDescription={t("titleIndexPage")}
          metaDescriptionOg={t("metaDescriptionOgIndexPage")}
          metaKeywords={t("metaKeywordsIndexPage")}
        />
      </Layout.PageHead>
      <Layout.PageHeader>
        <HeadingContent t={t} currentLanguage={locale} />
      </Layout.PageHeader>
      <Layout.SectionMain>
        <InfoContent t={t} currentLanguage={locale} />
        <MainContent t={t} currentLanguage={locale} data={forms} sort={ctx.query._sort} page={+page} />
        <Accordion t={t} currentLanguage={locale} />
      </Layout.SectionMain>
      <Layout.PageFooter>
        <Footer t={t} language={locale} />
      </Layout.PageFooter>
    </Layout>
  );
};

export const getServerSideProps = async ({ locale, query }) => {
  const page = query.page || 1;
  const sort = query._sort || "ASC";
  const pageSize = query.pageSize || 9;


  const forms = await getAllForms(locale, page, sort, pageSize);
  return {
    props: {
      ...(await serverSideTranslations(locale, "common")),
      forms,
      page
    },
  };
};

export default Index;
