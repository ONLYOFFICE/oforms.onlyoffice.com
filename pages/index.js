import { useState } from "react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import getForms from "@lib/requests/getForms";
import getTypes from "@lib/requests/getTypes";
import getCategories from "@lib/requests/getCategories";
import getCompilations from "@lib/requests/getCompilations";
import getPopularTemplates from "@lib/requests/getPopularTemplates";
import getPptxForms from "@lib/requests/getPptxForms";
import getDocxForms from "@lib/requests/getDocxForms";
import getPdfForms from "@lib/requests/getPdfForms";
import getXlsxForms from "@lib/requests/getXlsxForms";
import Layout from "@components/layout";
import MainHead from "@components/screens/head";
import Header from "@components/screens/header";
import DesktopClient from "@components/screens/desktop-client";
import AdventAnnounce from "@components/screens/header/advent-announce";
import Footer from "@components/screens/footer";
import MainContent from "@components/screens/main-content";
import AccordionSection from "@components/screens/common/accordion-section";

const MainPage = ({ isDesktopClient, theme, locale, sort, forms, types, categories, compilations, popularTemplates, pptxForms, docxForms, pdfForms, xlsxForms }) => {
  const { t } = useTranslation("common");
  const [stateMobile, setStateMobile] = useState(false);

  return (
    isDesktopClient ? (
      <Layout>
        <Layout.PageHead>
          <MainHead
            title={t("OFORMS – fill out forms online for free")}
            metaSiteNameOg={t("OFORM Library")}
            metaDescription={t("OFORMS – fill out forms online for free")}
            metaDescriptionOg={t("Try powerful ready-to-fill out free online forms. Create documens with forms online or just download templates in the desirable format: DOCXF, OFORM, or PDF.")}
            metaKeywords={t("OFORMS – fill out forms online for free")}
            isDesktopClient={isDesktopClient}
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
            theme={theme}
          />
        </Layout.SectionMain>
      </Layout>
    ) : (
      <Layout>
        <Layout.PageHead>
          <MainHead
            title={t("OFORMS – fill out forms online for free")}
            metaSiteNameOg={t("OFORM Library")}
            metaDescription={t("OFORMS – fill out forms online for free")}
            metaDescriptionOg={t("Try powerful ready-to-fill out free online forms. Create documens with forms online or just download templates in the desirable format: DOCXF, OFORM, or PDF.")}
            metaKeywords={t("OFORMS – fill out forms online for free")}
          />
        </Layout.PageHead>
        <AdventAnnounce t={t} locale={locale} stateMobile={stateMobile} />
        <Layout.PageHeader>
          <Header
            t={t}
            locale={locale}
            stateMobile={stateMobile}
            setStateMobile={setStateMobile}
          />
        </Layout.PageHeader>
        <Layout.SectionMain>
          <MainContent
            t={t}
            popularTemplates={popularTemplates}
            categories={categories}
            pptxForms={pptxForms}
            docxForms={docxForms}
            pdfForms={pdfForms}
            xlsxForms={xlsxForms}
          />
          <AccordionSection t={t} />
        </Layout.SectionMain>
        <Layout.PageFooter>
          <Footer t={t} locale={locale} />
        </Layout.PageFooter>
      </Layout>
    )
  )
};

export const getServerSideProps = async ({ locale, query }) => {
  const isDesktopClient = query.desktop === "true";
  const theme = query.theme;
  const page = query.page || 1;
  const sort = query._sort || "asc";
  const pageSize = query.pageSize || isDesktopClient ? 32 : 6;

  let forms = null;
  let types = null;
  let compilations = null;

  if (isDesktopClient) {
    forms = await getForms(locale === "pt" ? "pt-br" : locale, page, sort, pageSize);
    types = await getTypes(locale === "pt" ? "pt-br" : locale);
    compilations = await getCompilations(locale === "pt" ? "pt-br" : locale);
  }

  const categories = await getCategories(locale === "pt" ? "pt-br" : locale);
  const popularTemplates = await getPopularTemplates(locale === "pt" ? "pt-br" : locale, sort);
  const pptxForms = await getPptxForms(locale === "pt" ? "pt-br" : locale, page, sort, pageSize);
  const docxForms = await getDocxForms(locale === "pt" ? "pt-br" : locale, page, sort, pageSize);
  const pdfForms = await getPdfForms(locale === "pt" ? "pt-br" : locale, page, sort, pageSize);
  const xlsxForms = await getXlsxForms(locale === "pt" ? "pt-br" : locale, page, sort, pageSize);
  
  return {
    props: {
      ...(await serverSideTranslations(locale, "common")),
      isDesktopClient,
      theme: isDesktopClient ? theme || "" : null,
      locale,
      sort,
      forms,
      types,
      categories,
      compilations,
      popularTemplates,
      pptxForms: pptxForms ? pptxForms : null,
      docxForms: docxForms ? docxForms : null,
      pdfForms: pdfForms ? pdfForms : null,
      xlsxForms: xlsxForms ? xlsxForms : null
    }
  };
}

export default MainPage;
