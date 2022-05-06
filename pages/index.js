import { lazy, Suspense } from "react";

import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import Layout from "@components/layout";
import HeadSEO from "@components/screens/head-content";
import HeadingContent from "@components/screens/heading-content";
import InfoContent from "@components/screens/main-page/info-content";

const Accordion = lazy(() => import("@components/screens/common/accordion"), {
  loading: () => <div />,
  suspense: true,
  ssr: false,
});
const Footer = lazy(() => import("@components/screens/footer-content"), {
  loading: () => <div />,
  suspense: true,
  ssr: false,
});

const Index = () => {
  const { locale } = useRouter();
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
        <Suspense fallback={`loading`}>
          <Accordion t={t} currentLanguage={locale} />
        </Suspense>
      </Layout.SectionMain>
      <Layout.PageFooter>
        <Suspense fallback={`loading`}>
          <Footer t={t} language={locale} />
        </Suspense>
      </Layout.PageFooter>
    </Layout>
  );
};

export const getServerSideProps = async ({ locale, query }) => {
  const page = query.page || 1;
  const sort = query._sort || "ASC";
  const pageSize = query.pageSize || 9;

  return {
    props: {
      ...(await serverSideTranslations(locale, "common")),
    },
  };
};

export default Index;
