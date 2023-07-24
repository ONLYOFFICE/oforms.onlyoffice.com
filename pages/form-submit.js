import { lazy, Suspense } from "react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import getAllCategories from "@lib/strapi/getCategories";
import Layout from "@components/layout";
import HeadSEO from "../src/screens/head-content";
import HeadingContent from "../src/screens/heading-content";
import AdventAnnounce from "../src/screens/heading-content/advent-announce";
import FormSubmitContent from "../src/screens/form-submit-content";

const Footer = lazy(() => import("../src/screens/footer-content"), {
  loading: () => <div />,
});

const FormSubmit = ({ locale, categories }) => {
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
      <Layout.PageAnnounce>
        <AdventAnnounce currentLanguage={locale} />
      </Layout.PageAnnounce>
      <Layout.PageHeader>
        <HeadingContent currentLanguage={locale} template isInvert templateForm />
      </Layout.PageHeader>
      <Layout.SectionMain>
        <FormSubmitContent t={t} locale={locale} categories={categories} />
      </Layout.SectionMain>
      <Layout.PageFooter>
        <Suspense>
          <Footer language={locale} />
        </Suspense>
      </Layout.PageFooter>
    </Layout>
  )
};

export const getServerSideProps = async ({ locale }) => {
  const categories = await getAllCategories(locale);

  return {
    props: {
      ...(await serverSideTranslations(locale, "common")),
      locale,
      categories
    },
  };
}


export default FormSubmit;
