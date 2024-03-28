import { useState } from "react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import getAllForms from "@lib/strapi/getForms";
import getAllTypes from "@lib/strapi/getTypes";
import getAllCategories from "@lib/strapi/getCategories";
import getAllCompilations from "@lib/strapi/getCompilations";
import CONFIG from "@config/config";
import Layout from "@components/layout";
import HeadSEO from "@src/screens/head-content";
import HeadingContent from "@src/screens/heading-content";
import InfoContent from "@src/screens/search-result-page/info-content";
import MainContent from "@src/screens/search-result-page/main-content";
import DesktopClientContent from "@src/screens/desktop-client-content";
import AdventAnnounce from "@src/screens/heading-content/advent-announce";
import Accordion from "@src/screens/common/accordion";
import Footer from "@src/screens/footer-content";

const SearchResult = ({ locale, sort, page, types, categories, compilations, isDesktopClient, searchQuery, searchData, theme }) => {
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
            theme={theme}
          />
        </Layout.PageHead>
        <Layout.SectionMain>
          <DesktopClientContent
            t={t}
            currentLanguage={locale}
            data={searchData}
            sort={sort}
            types={types}
            categories={categories}
            compilations={compilations}
            isDesktopClient={isDesktopClient}
            queryDesktopClient={searchQuery}
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
          <InfoContent t={t} query={searchQuery} />
          <MainContent
            t={t}
            currentLanguage={locale}
            sort={sort}
            data={searchData}
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
  const pageSize = query.pageSize || isDesktopClient ? 0 : 9;
  const forms = await getAllForms(locale === "pt" ? "pt-br" : locale, page, sort, pageSize);
  const types = await getAllTypes(locale === "pt" ? "pt-br" : locale);
  const categories = await getAllCategories(locale === "pt" ? "pt-br" : locale);
  const compilations = await getAllCompilations(locale === "pt" ? "pt-br" : locale);
  const searchQuery = query.query || "";

  const searchName = locale === "en" || locale === "fr" || locale === "pt" ? searchQuery?.toLowerCase() === "curriculum vitae" || searchQuery?.toLowerCase() === "curriculum" || searchQuery?.toLowerCase() === "vitae" ? "cv" : searchQuery : searchQuery;
  const searchRes = await fetch(
    `${CONFIG.api.cms}/api/oforms/?sort=name_form:${sort}&populate[0]=categories&locale=${locale === "pt" ? "pt-br" : locale}&filters[name_form][$containsi]=${searchName}&populate=template_image&populate=file_oform&populate=categories&populate=card_prewiew`
  );
  const searchData = await searchRes.json();

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
      searchQuery,
      searchData: searchQuery === "" ? [] : searchData,
      theme: isDesktopClient ? theme || "" : null
    },
  };
};

export default SearchResult;
