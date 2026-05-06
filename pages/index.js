import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import getCategories from "@lib/requests/getCategories";
import getPopularTemplates from "@lib/requests/getPopularTemplates";
import getExtForms from "@lib/requests/getExtForms";
import getAllOforms from "@lib/requests/getAllOforms";
import Layout from "@components/layout-new";
import MainHead from "@components/screens/head";
import Header from "@components/screens/header";
import AdventAnnounce from "@components/screens/advent-announce";
import Footer from "@components/screens/footer";
import MainContent from "@components/screens/main-content-new";

const MainPage = ({ locale, categories, popularTemplates, pptxForms, docxForms, pdfForms, xlsxForms, oforms }) => {
  const { t } = useTranslation("common");

  return (
    <Layout locale={locale}>
      <Layout.PageHead>
        <MainHead
          title={t("ONLYOFFICE templates")}
          description={t("Free templates and fillable PDF forms for any business purpose")}
        />
      </Layout.PageHead>
      <AdventAnnounce locale={locale} />
      <Layout.PageHeader>
        <Header
          t={t}
          locale={locale}
        />
      </Layout.PageHeader>
      <Layout.SectionMain>
        <MainContent
          t={t}
          locale={locale}
          popularTemplates={popularTemplates}
          categories={categories}
          pptxForms={pptxForms}
          docxForms={docxForms}
          pdfForms={pdfForms}
          xlsxForms={xlsxForms}
          oforms={oforms}
        />
      </Layout.SectionMain>
      <Layout.PageFooter>
        <Footer locale={locale} />
      </Layout.PageFooter>
    </Layout>
  )
};

export const getServerSideProps = async ({ locale }) => {
  const categories = await getCategories(locale, "categories", "categorie");
  const popularTemplates = await getPopularTemplates(locale, null, null, null);
  const pptxForms = await getExtForms(locale, 1, "asc", 6, "pptx");
  const docxForms = await getExtForms(locale, 1, "asc", 6, "docx");
  const pdfForms = await getExtForms(locale, 1, "asc", 6, "pdf");
  const xlsxForms = await getExtForms(locale, 1, "asc", 6, "xlsx");
  const oforms = await getAllOforms(locale);

  return {
    props: {
      ...(await serverSideTranslations(locale, "common")),
      locale,
      categories,
      popularTemplates,
      pptxForms,
      docxForms,
      pdfForms,
      xlsxForms,
      oforms
    }
  };
}

export default MainPage;
