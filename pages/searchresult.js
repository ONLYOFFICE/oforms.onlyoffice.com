import { useState } from "react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import getTypes from "@lib/requests/getTypes";
import getCategories from "@lib/requests/getCategories";
import getCompilations from "@lib/requests/getCompilations";
import CONFIG from "@config/config";
import Layout from "@components/layout";
import MainHead from "@components/screens/head";
import Header from "@components/screens/header";
import DesktopClient from "@components/screens/desktop-client";
import AdventAnnounce from "@components/screens/header/advent-announce";
import SearchResultContent from "@components/screens/search-result-content";
import BannerFormSection from "@components/screens/common/banner-form-section";
import AccordionSection from "@components/screens/common/accordion-section";
import Footer from "@components/screens/footer";

const SearchResultPage = ({ isDesktopClient, theme, locale, sort, page, types, categories, compilations, searchQuery, searchData }) => {
  const { t } = useTranslation("common");
  const [stateMobile, setStateMobile] = useState(false);

  return (
    isDesktopClient ? (
      <Layout locale={locale}>
        <Layout.PageHead>
          <MainHead
            title={`${searchQuery === "" ? t("Search PDF forms and templates") : searchQuery} | ONLYOFFICE`}
            description={t("Free templates and fillable PDF forms for any business purpose")}
            isDesktopClient={isDesktopClient}
            theme={theme}
          />
        </Layout.PageHead>
        <Layout.SectionMain>
          <DesktopClient
            t={t}
            locale={locale}
            data={searchData}
            sort={sort}
            types={types}
            categories={categories}
            compilations={compilations}
            queryDesktopClient={searchQuery}
            theme={theme}
          />
        </Layout.SectionMain>
      </Layout>
    ) : (
      <Layout locale={locale}>
        <Layout.PageHead>
          <MainHead
            title={`${searchQuery === "" ? t("Search PDF forms and templates") : searchQuery} | ONLYOFFICE`}
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
            templateQuaternary
          />
        </Layout.PageHeader>
        <Layout.SectionMain>
          <SearchResultContent
            t={t}
            locale={locale}
            searchQuery={searchQuery}
            searchData={searchData}
            sort={sort}
            page={page}
          />
          <BannerFormSection t={t} locale={locale} />
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
  const isDesktopClient = query.desktop === "true";
  const theme = query.theme;
  const page = query.page || 1;
  const sort = query._sort || "asc";
  const pageSize = query.pageSize || isDesktopClient ? 0 : 9;
  const searchQuery = query.query || "";

  let types = null;
  let categories = null;
  let compilations = null;

  if (isDesktopClient) {
    types = await getTypes(locale === "pt" ? "pt-br" : locale);
    categories = await getCategories(locale === "pt" ? "pt-br" : locale);
    compilations = await getCompilations(locale === "pt" ? "pt-br" : locale);
  }

  const searchName = locale === "en" || locale === "fr" || locale === "pt" ? searchQuery?.toLowerCase() === "curriculum vitae" || searchQuery?.toLowerCase() === "curriculum" || searchQuery?.toLowerCase() === "vitae" ? "cv" : searchQuery : searchQuery;
  const searchRes = await fetch(`${CONFIG.api.cms}/api/oforms/?sort=name_form:${sort}&populate[0]=categories&locale=${locale === "pt" ? "pt-br" : locale}&filters[name_form][$containsi]=${searchName}&populate=template_image&populate=file_oform&populate=categories&populate=card_prewiew${pageSize ? `&pagination[pageSize]=${pageSize}` : ""}&pagination[page]=${page}`);
  const searchData = await searchRes.json();

  return {
    props: {
      ...(await serverSideTranslations(locale, "common")),
      isDesktopClient,
      theme: isDesktopClient ? theme || "" : null,
      locale,
      sort,
      page,
      types: types ? types : null,
      categories,
      compilations,
      searchQuery,
      searchData: searchQuery === "" ? [] : searchData,
    }
  };
};

export default SearchResultPage;
