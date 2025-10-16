import { useState } from "react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import getForms from "@lib/requests/getForms";
import getCategories from "@lib/requests/getCategories";
import getPopularTemplates from "@lib/requests/getPopularTemplates";
import getExtForms from "@lib/requests/getExtForms";
import Layout from "@components/layout";
import MainHead from "@components/screens/head";
import Header from "@components/screens/header";
import DesktopClient from "@components/screens/desktop-client";
import AdventAnnounceBanner from "@components/screens/header/advent-announce-banner";
import Footer from "@components/screens/footer";
import MainContent from "@components/screens/main-content";
import AccordionSection from "@components/screens/common/accordion-section";

const MainPage = ({ locale, sort, forms, types, categories, compilations, popularTemplates, pptxForms, docxForms, pdfForms, xlsxForms }) => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const [stateMobile, setStateMobile] = useState(false);

  return (
    router.query.desktop === "true" ? (
      <Layout locale={locale}>
        <Layout.PageHead>
          <MainHead
            title={t("ONLYOFFICE templates")}
            description={t("Free templates and fillable PDF forms for any business purpose")}
            isDesktopClient={true}
          />
        </Layout.PageHead>
        <Layout.SectionMain>
          <DesktopClient
            t={t}
            locale={locale}
            data={forms}
            sort={sort}
            types={types}
            categories={categories}
            compilations={compilations}
            theme={router.query.theme}
          />
        </Layout.SectionMain>
      </Layout>
    ) : (
      <Layout locale={locale}>
        <Layout.PageHead>
          <MainHead
            title={t("ONLYOFFICE templates")}
            description={t("Free templates and fillable PDF forms for any business purpose")}
          />
        </Layout.PageHead>
        <AdventAnnounceBanner locale={locale} stateMobile={stateMobile} />
        <Layout.PageHeader>
          <Header
            t={t}
            locale={locale}
            headerBgColor="#444444"
            isMainPage={true}
            isSearch={true}
            stateMobile={stateMobile}
            setStateMobile={setStateMobile}
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
  )
};

export const getServerSideProps = async ({ locale, query }) => {
  const isDesktopClient = query.desktop === "true";
  const theme = query.theme || null;
  const page = query.page || 1;
  const sort = query._sort || "asc";
  const pageSize = query.pageSize || (isDesktopClient ? 32 : 6);

  const categories = await getCategories(locale, "categories", "categorie");
  const forms = isDesktopClient ? await getForms(locale, page, sort, pageSize, isDesktopClient) : null;
  const types = isDesktopClient ? await getCategories(locale, "types", "type") : null;
  const compilations = isDesktopClient ? await getCategories(locale, "compilations", "compilation") : null;
  const popularTemplates = !isDesktopClient ? await getPopularTemplates(locale, sort) : null;
  const pptxForms = !isDesktopClient ? await getExtForms(locale, page, sort, pageSize, "pptx") : null;
  const docxForms = !isDesktopClient ? await getExtForms(locale, page, sort, pageSize, "docx") : null;
  const pdfForms = !isDesktopClient ? await getExtForms(locale, page, sort, pageSize, "pdf") : null;
  const xlsxForms = !isDesktopClient ? await getExtForms(locale, page, sort, pageSize, "xlsx") : null;

  return {
    props: {
      ...(await serverSideTranslations(locale, "common")),
      isDesktopClient,
      theme,
      locale,
      sort,
      forms,
      types,
      categories,
      compilations,
      popularTemplates,
      pptxForms,
      docxForms,
      pdfForms,
      xlsxForms
    }
  };
}

export default MainPage;
