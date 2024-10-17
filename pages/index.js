import { useState } from "react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
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
          <Footer t={t} locale={locale} />
        </Layout.PageFooter>
      </Layout>
    )
  )
};

export const getServerSideProps = async ({ locale, query }) => {
  const isDesktopClient = query.desktop === "true" ? true : false;
  const page = query.page || 1;
  const sort = query._sort || "asc";
  const pageSize = query.pageSize || (isDesktopClient ? 32 : 6);

  const categories = await getCategories(locale === "pt" ? "pt-br" : locale);
  const forms = isDesktopClient ? await getForms(locale === "pt" ? "pt-br" : locale, page, sort, pageSize) : null;
  const types = isDesktopClient ? await getTypes(locale === "pt" ? "pt-br" : locale) : null;
  const compilations = isDesktopClient ? await getCompilations(locale === "pt" ? "pt-br" : locale) : null;
  const popularTemplates = !isDesktopClient ? await getPopularTemplates(locale === "pt" ? "pt-br" : locale, sort) : null;
  const pptxForms = !isDesktopClient ? await getPptxForms(locale === "pt" ? "pt-br" : locale, page, sort, pageSize) : null;
  const docxForms = !isDesktopClient ? await getDocxForms(locale === "pt" ? "pt-br" : locale, page, sort, pageSize) : null;
  const pdfForms = !isDesktopClient ? await getPdfForms(locale === "pt" ? "pt-br" : locale, page, sort, pageSize) : null;
  const xlsxForms = !isDesktopClient ? await getXlsxForms(locale === "pt" ? "pt-br" : locale, page, sort, pageSize) : null;

  return {
    props: {
      ...(await serverSideTranslations(locale, "common")),
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
