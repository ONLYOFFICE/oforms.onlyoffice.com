import { useState, useEffect, lazy, Suspense } from "react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import getAllTypes from "@lib/strapi/getTypes";
import getAllBranches from "@lib/strapi/getBranch";
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
  branches, 
  compilations,
}) => {
  const { t } = useTranslation("common");
  const dataCategoryInfo = categoryInfo.data[0].attributes;
  const { seo_title, seo_description } = dataCategoryInfo;
  const nameCategory = dataCategoryInfo.type;
  const urlReqCategory = dataCategoryInfo.urlReq;
  const header = dataCategoryInfo.header_description;
  
  const [isCategoryPage, setIsCategoryPage] = useState(true);
  const [isDesktopClient, setIsDesktopClient] = useState(true);
  useEffect(() => {
    setIsDesktopClient(window["AscDesktopEditor"] !== false);
  }, []);

  return (
    <>
      {isDesktopClient ? ( 
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
          branches={branches}
          compilations={compilations}
        />
      ) : (
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
      )}
    </>
  );
};

export const getServerSideProps = async ({ locale, ...ctx }) => {
  const page = ctx.query.page || 1;
  const sort = ctx.query._sort || "ASC";
  const urlReq = ctx.query.branch;
  const pageSize = ctx.query.pageSize || 9;
  const res = await fetch(
    `https://oforms.teamlab.info/dashboard/api/oforms/?filters[branches][urlReq][$eq]=${urlReq}&locale=${locale}&sort=name_form:${sort}&pagination[pageSize]=${pageSize}&pagination[page]=${page}&populate=file_oform&populate=card_prewiew`
  );
  const resCategory = await fetch(
    `https://oforms.teamlab.info/dashboard/api/branches/?filters[urlReq][$eq]=${urlReq}&locale=${locale}`
  );
  const categoryForms = await res.json();
  const categoryInfo = await resCategory.json();
  const types = await getAllTypes(locale);
  const branches = await getAllBranches(locale);
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
      urlReq,
      locale,
      sort,
      page,
      types,
      branches,
      compilations,
    },
  };
};

export default Category;
