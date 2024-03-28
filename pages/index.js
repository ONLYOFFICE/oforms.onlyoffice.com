import { useState } from "react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import getAllForms from "@lib/strapi/getForms";
import getAllTypes from "@lib/strapi/getTypes";
import getAllCategories from "@lib/strapi/getCategories";
import getAllCompilations from "@lib/strapi/getCompilations";
import Layout from "@components/layout";
import HeadSEO from "@src/screens/head-content";
import HeadingContent from "@src/screens/heading-content";
import InfoContent from "@src/screens/main-page/info-content";
import MainContent from "@src/screens/main-page/main-content";
import DesktopClientContent from "@src/screens/desktop-client-content";
import AdventAnnounce from "@src/screens/heading-content/advent-announce";
import Accordion from "@src/screens/common/accordion";
import Footer from "@src/screens/footer-content";

const Index = ({ forms, page, locale, sort, types, categories, compilations, isDesktopClient, theme }) => {
  const { t } = useTranslation("common");
  const [stateMobile, setStateMobile] = useState(false);

  return (
    isDesktopClient ? (
      <Layout>
        <Layout.PageHead>
          <HeadSEO
            title={t("titleIndexPage")}
            metaSiteNameOg={t("metaSiteNameOg")}
            metaDescription={t("titleIndexPage")}
            metaDescriptionOg={t("metaDescriptionOgIndexPage")}
            metaKeywords={t("metaKeywordsIndexPage")}
            isDesktopClient={isDesktopClient}
          />
        </Layout.PageHead>
        <Layout.SectionMain>
          <DesktopClientContent
            t={t}
            locale={locale}
            data={forms}
            sort={sort}
            types={types}
            categories={categories}
            compilations={compilations}
            isDesktopClient={isDesktopClient}
            theme={theme}
          />
        </Layout.SectionMain>
      </Layout>
    ) : (
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
          <AdventAnnounce t={t} currentLanguage={locale} stateMobile={stateMobile} />
        </Layout.PageAnnounce>
        <Layout.PageHeader>
          <HeadingContent t={t} currentLanguage={locale} stateMobile={stateMobile} setStateMobile={setStateMobile} />
        </Layout.PageHeader>
        <Layout.SectionMain>
          <InfoContent t={t} currentLanguage={locale} />
          <MainContent
            t={t}
            currentLanguage={locale}
            data={forms}
            sort={sort}
            page={+page}
            types={types}
            categories={categories}
            compilations={compilations}
          />
          <Accordion currentLanguage={locale} />
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
  const pageSize = query.pageSize || isDesktopClient ? 32 : 9;
  const forms = await getAllForms(locale === "pt" ? "pt-br" : locale, page, sort, pageSize);
  const types = await getAllTypes(locale === "pt" ? "pt-br" : locale);
  const categories = await getAllCategories(locale === "pt" ? "pt-br" : locale);
  const compilations = await getAllCompilations(locale === "pt" ? "pt-br" : locale);
  
  return {
    props: {
      ...(await serverSideTranslations(locale, "common")),
      forms,
      page,
      locale,
      sort,
      types,
      categories,
      compilations,
      isDesktopClient,
      theme: isDesktopClient ? theme || "" : null
    },
  };
}

export default Index;
