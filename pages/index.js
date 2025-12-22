import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import getCategories from "@lib/requests/getCategories";
import getPopularTemplates from "@lib/requests/getPopularTemplates";
import getExtForms from "@lib/requests/getExtForms";
import Layout from "@components/layout";
import MainHead from "@components/screens/head";
import Header from "@components/screens/header";
import AdventAnnounce from "@components/screens/advent-announce";
import Footer from "@components/screens/footer";
import MainContent from "@components/screens/main-content";
import AccordionSection from "@components/screens/common/accordion-section";

const MainPage = ({ locale, categories, popularTemplates, pptxForms, docxForms, pdfForms, xlsxForms }) => {
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
          headerBgColor="#444444"
          isMainPage={true}
          isSearch={true}
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
        />
        <AccordionSection t={t} locale={locale} />
      </Layout.SectionMain>
      <Layout.PageFooter>
        <Footer locale={locale} />
      </Layout.PageFooter>
    </Layout>
  )
};

export const getServerSideProps = async ({ locale, query }) => {
  const theme = query.theme || null;
  const page = query.page || 1;
  const sort = query._sort || "asc";
  const pageSize = query.pageSize || 6;

  const categories = await getCategories(locale, "categories", "categorie");
  const popularTemplates = await getPopularTemplates(locale, sort);
  const pptxForms = await getExtForms(locale, page, sort, pageSize, "pptx");
  const docxForms = await getExtForms(locale, page, sort, pageSize, "docx");
  const pdfForms = await getExtForms(locale, page, sort, pageSize, "pdf");
  const xlsxForms = await getExtForms(locale, page, sort, pageSize, "xlsx");

  return {
    props: {
      ...(await serverSideTranslations(locale, "common")),
      theme,
      locale,
      categories,
      popularTemplates,
      pptxForms,
      docxForms,
      pdfForms,
      xlsxForms
    }
  };
}

export default MainPage;
