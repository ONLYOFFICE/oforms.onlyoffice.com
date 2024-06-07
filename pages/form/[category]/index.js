import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useState } from "react";
import config from "@config/config.json";
import getTypes from "@lib/requests/getTypes";
import getCategories from "@lib/requests/getCategories";
import getCompilations from "@lib/requests/getCompilations";
import Layout from "@components/layout";
import MainHead from "@components/screens/head";
import DesktopClient from "@components/screens/desktop-client";
import Header from "@components/screens/header";
import AdventAnnounce from "@components/screens/header/advent-announce";
import BannerFormSection from "@components/screens/common/banner-form-section";
import CategoryContent from "@components/screens/category-content";
import AccordionSection from "@components/screens/common/accordion-section";
import Footer from "@components/screens/footer";

const Category = ({ categoryForms, categoryInfo, locale, page, sort, types, categories, compilations, isDesktopClient, theme }) => {
  const isCategoryPage = true;
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
            data={categoryForms}
            sort={sort}
            types={types}
            categories={categories}
            compilations={compilations}
            categoryName={categoryInfo.data[0]?.attributes.categorie}
            isCategoryPage={isCategoryPage}
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
            templateTertiary
          />
        </Layout.PageHeader>
        <Layout.SectionMain>
          <CategoryContent 
            t={t}
            locale={locale}
            title={categoryInfo.data[0]?.attributes.categorie}
            subtitle={t("Fill out the spreadsheets online in one click or download and open them them in ONLYOFFICE editors")}
            forms={categoryForms}
            sort={sort}
            page={page}
            categories={categories}
            types={types}
            compilations={compilations}
            categoryName={categoryInfo.data[0]?.attributes.categorie}
            categoryUrl={`form/${categoryInfo.data[0]?.attributes.urlReq}`}
          />
          <BannerFormSection t={t} locale={locale} />
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
  const urlReq = query.category;
  const pageSize = query.pageSize || isDesktopClient ? 0 : 9;
  const cms = config.api.cms;
  const types = await getTypes(locale === "pt" ? "pt-br" : locale);
  const categories = await getCategories(locale === "pt" ? "pt-br" : locale);
  const compilations = await getCompilations(locale === "pt" ? "pt-br" : locale);

  const res = await fetch(
    `${cms}/api/oforms/?filters[categories][urlReq][$eq]=${urlReq}&locale=${locale === "pt" ? "pt-br" : locale}&sort=name_form:${sort}&${pageSize ? `&pagination[pageSize]=${pageSize}` : ""}&pagination[page]=${page}&populate=file_oform&populate=card_prewiew&populate=form_exts`
  );
  const resCategory = await fetch(
    `${cms}/api/categories/?filters[urlReq][$eq]=${urlReq}&locale=${locale === "pt" ? "pt-br" : locale}`
  );

  const categoryForms = await res.json();
  const categoryInfo = await resCategory.json();

  if (categoryForms.data === null) {
    return {
      notFound: true
    }
  };

  return {
    props: {
      ...(await serverSideTranslations(locale, "common")),
      categoryForms,
      categoryInfo,
      locale,
      sort,
      page,
      types,
      categories,
      compilations,
      isDesktopClient,
      theme: isDesktopClient ? theme || "" : null
    },
  };
};

export default Category;
