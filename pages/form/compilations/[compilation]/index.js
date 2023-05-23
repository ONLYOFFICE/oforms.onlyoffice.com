import { useState, lazy, Suspense } from "react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import getAllTypes from "@lib/strapi/getTypes";
import getAllCategories from "@lib/strapi/getCategories";
import getAllCompilations from "@lib/strapi/getCompilations";

import Layout from "@components/layout";
import HeadSEO from "@components/screens/head-content";
import HeadingContent from "@components/screens/heading-content";
import InfoContent from "@components/screens/category-page/info-content";
import MainContent from "@components/screens/category-page/main-content";
import DesktopClientContent from "@components/screens/desktop-client-content";
import AdventAnnounce from "@components/screens/heading-content/advent-announce";

import config from "@config/config.json";
import {useRouter} from "next/router";

const Accordion = lazy(() => import("@components/screens/common/accordion"), {
  loading: () => <div />,
});
const Footer = lazy(() => import("@components/screens/footer-content"), {
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
  const nameCategory = dataCategoryInfo.compilation;
  const urlReqCategory = dataCategoryInfo.urlReq;
  const header = dataCategoryInfo.header_description; 
  const categoryName = categoryInfo.data[0].attributes.compilation;
  const router = useRouter()
  const [isCategoryPage, setIsCategoryPage] = useState(true);
  const isDesktopClient = router.query.desktop

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
        t={t}
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
        <AdventAnnounce t={t} currentLanguage={locale} />
      </Layout.PageAnnounce>
      <Layout.PageHeader>
        <HeadingContent t={t} currentLanguage={locale} />
      </Layout.PageHeader>
      <Layout.SectionMain>
        <InfoContent t={t} category={nameCategory} header={header}/>
        <MainContent
          t={t}
          currentLanguage={locale}
          data={categoryForms}
          sort={sort}
          page={+page}
          category={nameCategory}
          urlReqCategory= {`compilations/${urlReqCategory}`}
          types={types}
          categories={categories}
          compilations={compilations}
        />
        <Suspense>
          <Accordion t={t} currentLanguage={locale} />
        </Suspense>
      </Layout.SectionMain>
      <Layout.PageFooter>
        <Suspense>
          <Footer t={t} language={locale} />
        </Suspense>
      </Layout.PageFooter>
    </Layout>
};

export const getServerSideProps = async ({ locale, query, ...ctx }) => {
  const isDesktopClient = query.desktop === "true";
  const page = query.page || 1;
  const sort = query._sort || "asc";
  const urlReq = query.compilation;
  const pageSize = query.pageSize || isDesktopClient ? 0 : 9;
  const cms = config.api.cms
  const res = await fetch(
    `${cms}/api/oforms/?filters[compilations][urlReq][$eq]=${urlReq}&locale=${locale}&sort=name_form:${sort}&${pageSize ? `&pagination[pageSize]=${pageSize}` : ''}&pagination[page]=${page}&populate=file_oform&populate=card_prewiew`
  );
  const resCategory = await fetch(
    `${cms}/api/compilations/?filters[urlReq][$eq]=${urlReq}&locale=${locale}`
  );
  const categoryForms = await res.json();
  const categoryInfo = await resCategory.json();
  const types = await getAllTypes(locale);
  const categories = await getAllCategories(locale);
  const compilations = await getAllCompilations(locale);

  if (categoryForms.data.length === 0) {
    return {
      redirect: {
        destination: `https://oforms.teamlab.info/404`,
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
