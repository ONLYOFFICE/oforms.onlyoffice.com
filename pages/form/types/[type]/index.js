import { useState, lazy, Suspense } from "react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import getAllTypes from "@lib/strapi/getTypes";
import getAllCategories from "@lib/strapi/getCategories";
import getAllCompilations from "@lib/strapi/getCompilations";

import Layout from "@components/layout";
import HeadSEO from "../../../../src/screens/head-content";
import HeadingContent from "../../../../src/screens/heading-content";
import InfoContent from "../../../../src/screens/category-page/info-content";
import MainContent from "../../../../src/screens/category-page/main-content";
import DesktopClientContent from "../../../../src/screens/desktop-client-content";
import AdventAnnounce from "../../../../src/screens/heading-content/advent-announce";

import config from "@config/config.json";

const Accordion = lazy(() => import("../../../../src/screens/common/accordion"), {
  loading: () => <div />,
});
const Footer = lazy(() => import("../../../../src/screens/footer-content"), {
  loading: () => <div />,
});

const Category = ({
  categoryForms,
  categoryInfo,
  locale,
  sort,
  page,
  types, 
  categories, 
  compilations,
}) => {
  const { t } = useTranslation("common");
  const dataCategoryInfo = categoryInfo.data[0].attributes;
  const { seo_title, seo_description } = dataCategoryInfo;
  const nameCategory = dataCategoryInfo.type;
  const urlReqCategory = dataCategoryInfo.urlReq;
  const header = dataCategoryInfo.header_description;
  const categoryName = categoryInfo.data[0].attributes.type;
  
  const [isCategoryPage, setIsCategoryPage] = useState(true);
  const [stateMobile, setStateMobile] = useState(false);
  const router = useRouter()
  const isDesktopClient = router.query.desktop;

  return isDesktopClient ?
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
      <DesktopClientContent
        currentLanguage={locale}
        data={categoryForms}
        sort={sort}
        page={+page}
        isCategoryPage={isCategoryPage}
        header={header}
        types={types}
        categories={categories}
        compilations={compilations}
        categoryName={categoryName}
      />
    </Layout>
  :
    <Layout>
      <Layout.PageHead>
        <HeadSEO
          title={seo_title}
          metaDescription={seo_description}
          metaDescriptionOg={seo_description}
          metaKeywords={seo_title}
        />
      </Layout.PageHead>
      <Layout.PageAnnounce>
        <AdventAnnounce t={t} currentLanguage={locale} stateMobile={stateMobile} />
      </Layout.PageAnnounce>
      <Layout.PageHeader>
        <HeadingContent t={t} currentLanguage={locale} stateMobile={stateMobile} setStateMobile={setStateMobile} />
      </Layout.PageHeader>
      <Layout.SectionMain>
        <InfoContent category={nameCategory} header={header}/>
        <MainContent
          currentLanguage={locale}
          data={categoryForms}
          sort={sort}
          page={+page}
          category={nameCategory}
          urlReqCategory= {`types/${urlReqCategory}`}
          types={types}
          categories={categories}
          compilations={compilations}
        />
        <Suspense>
          <Accordion currentLanguage={locale} />
        </Suspense>
      </Layout.SectionMain>
      <Layout.PageFooter>
        <Suspense>
          <Footer t={t} locale={locale}/>
        </Suspense>
      </Layout.PageFooter>
    </Layout>
};

export const getServerSideProps = async ({ locale, query, ...ctx }) => {
  const isDesktopClient = query.desktop === "true";
  const page = query.page || 1;
  const sort = query._sort || "asc";
  const urlReq = query.type;
  const pageSize = query.pageSize || isDesktopClient ? 0 : 9;
  const cms = config.api.cms
  const res = await fetch(
    `${cms}/api/oforms/?filters[types][urlReq][$eq]=${urlReq}&locale=${locale}&sort=name_form:${sort}&${pageSize ? `&pagination[pageSize]=${pageSize}` : ''}&pagination[page]=${page}&populate=file_oform&populate=card_prewiew`
  );
  const resCategory = await fetch(
    `${cms}/api/types/?filters[urlReq][$eq]=${urlReq}&locale=${locale}`
  );
  const categoryForms = await res.json();
  const categoryInfo = await resCategory.json();
  const types = await getAllTypes(locale);
  const categories = await getAllCategories(locale);
  const compilations = await getAllCompilations(locale);

  const getRedirect = () => {
    const result = {
      destination: '/404',
      query: {}
    }

    if(isDesktopClient) {
      result.query.desktop = true
    }

    if(theme) {
      result.query.theme = theme
    }

    return result;
  }

  if (categoryForms.data.length === 0) {
    return {
      redirect: {
        ...getRedirect(),
        permanent: true,
      },
    };
  }
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
    },
  };
};

export default Category;
