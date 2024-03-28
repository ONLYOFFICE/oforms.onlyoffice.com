import { useState } from "react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import config from "@config/config.json";
import getAllTypes from "@lib/strapi/getTypes";
import getAllCategories from "@lib/strapi/getCategories";
import getAllCompilations from "@lib/strapi/getCompilations";
import Layout from "@components/layout";
import HeadSEO from "@src/screens/head-content";
import HeadingContent from "@src/screens/heading-content";
import InfoContent from "@src/screens/category-page/info-content";
import MainContent from "@src/screens/category-page/main-content";
import DesktopClientContent from "@src/screens/desktop-client-content";
import AdventAnnounce from "@src/screens/heading-content/advent-announce";
import Accordion from "@src/screens/common/accordion";
import Footer from "@src/screens/footer-content";

const Category = ({ categoryForms, categoryInfo, locale, sort, page, types, categories, compilations, isDesktopClient, theme }) => {
  const isCategoryPage = true;
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
            locale={locale}
            data={categoryForms}
            sort={sort}
            types={types}
            categories={categories}
            compilations={compilations}
            categoryName={categoryInfo.data[0].attributes.categorie}
            isDesktopClient={isDesktopClient}
            isCategoryPage={isCategoryPage}
            theme={theme}
          />
        </Layout.SectionMain>
      </Layout>
    ) : (
      <Layout>
        <Layout.PageHead>
          <HeadSEO
            title={categoryInfo.data[0].attributes.seo_title}
            metaDescription={categoryInfo.data[0].attributes.seo_description}
            metaDescriptionOg={categoryInfo.data[0].attributes.seo_description}
            metaKeywords={categoryInfo.data[0].attributes.seo_title}
          />
        </Layout.PageHead>
        <Layout.PageAnnounce>
          <AdventAnnounce t={t} currentLanguage={locale} stateMobile={stateMobile} />
        </Layout.PageAnnounce>
        <Layout.PageHeader>
          <HeadingContent t={t} currentLanguage={locale} stateMobile={stateMobile} setStateMobile={setStateMobile} />
        </Layout.PageHeader>
        <Layout.SectionMain>
          <InfoContent 
            category={categoryInfo.data[0].attributes.categorie} 
            header={categoryInfo.data[0].attributes.header_description}
          />
          <MainContent
            currentLanguage={locale}
            data={categoryForms}
            sort={sort}
            page={+page}
            category={categoryInfo.data[0].attributes.categorie}
            categoryName={categoryInfo.data[0].attributes.categorie}
            urlReqCategory={categoryInfo.data[0].attributes.urlReq}
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
  const urlReq = query.category;
  const pageSize = query.pageSize || isDesktopClient ? 0 : 9;
  const cms = config.api.cms;
  const types = await getAllTypes(locale === "pt" ? "pt-br" : locale);
  const categories = await getAllCategories(locale === "pt" ? "pt-br" : locale);
  const compilations = await getAllCompilations(locale === "pt" ? "pt-br" : locale);

  const res = await fetch(
    `${cms}/api/oforms/?filters[categories][urlReq][$eq]=${urlReq}&locale=${locale === "pt" ? "pt-br" : locale}&sort=name_form:${sort}&${pageSize ? `&pagination[pageSize]=${pageSize}` : ''}&pagination[page]=${page}&populate=file_oform&populate=card_prewiew`
  );
  const resCategory = await fetch(
    `${cms}/api/categories/?filters[urlReq][$eq]=${urlReq}&locale=${locale === "pt" ? "pt-br" : locale}`
  );

  const categoryForms = await res.json();
  const categoryInfo = await resCategory.json();

  if (categoryForms.data.length === 0) {
    return {
      notFound: true
    }
  };

  return {
    props: {
      ...(await serverSideTranslations(locale, "common")),
      notFound: true,
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
