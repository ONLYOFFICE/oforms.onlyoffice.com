import { useState, useEffect, lazy, Suspense } from "react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import getAllTypes from "@lib/strapi/getTypes";
import getAllCategories from "@lib/strapi/getCategories";
import getAllCompilations from "@lib/strapi/getCompilations";

import Layout from "@components/layout";
import HeadSEO from "@components/screens/head-content";
import HeadingContent from "@components/screens/heading-content";
import InfoContent from "@components/screens/category-page/info-content";
import MainContent from "@components/screens/category-page/main-content";
import DesktopClientContent from "@components/screens/desktop-client-content";

const Accordion = lazy(() => import("@components/screens/common/accordion"), {
  loading: () => <div />,
});
const Footer = lazy(() => import("@components/screens/footer-content"), {
  loading: () => <div />,
});

const Category = ({
  categoryForms,
  categoryInfo,
  urlReq,
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

  console.log(categoryForms);
  
  const [isCategoryPage, setIsCategoryPage] = useState(true);
  const query = useRouter();
  const [isDesktopClient, setIsDesktopClient] = useState(query.name === "desktop");

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
        urlReqCategory={urlReqCategory}
        types={types}
        categories={categories}
        compilations={compilations}
        isDesktopClient={isDesktopClient}
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
          urlReqCategory={urlReqCategory}
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

export const getServerSideProps = async ({ locale, ...ctx }) => {
  const page = ctx.query.page || 1;
  const sort = ctx.query._sort || "ASC";
  const urlReq = ctx.query.compilation;
  const pageSize = ctx.query.pageSize || 9;
  const res = await fetch(
    `https://oforms.teamlab.info/dashboard/api/oforms/?filters[compilations][urlReq][$eq]=${urlReq}&locale=${locale}&sort=name_form:${sort}&pagination[pageSize]=${pageSize}&pagination[page]=${page}&populate=file_oform&populate=card_prewiew`
  );
  const resCategory = await fetch(
    `https://oforms.teamlab.info/dashboard/api/compilations/?filters[urlReq][$eq]=${urlReq}&locale=${locale}`
  );
  const categoryForms = await res.json();
  const categoryInfo = await resCategory.json();
  const types = await getAllTypes(locale);
  const categories = await getAllCategories(locale);
  const compilations = await getAllCompilations(locale);

  if (categoryForms.data.length === 0) {
    console.log(categoryForms.data.length);
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
      urlReq,
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
