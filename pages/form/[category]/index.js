import { lazy, Suspense } from "react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import Layout from "@components/layout";
import HeadSEO from "@components/screens/head-content";
import HeadingContent from "@components/screens/heading-content";
import InfoContent from "@components/screens/category-page/info-content";
import MainContent from "@components/screens/category-page/main-content";

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
}) => {
  const { t } = useTranslation("common");
  const dataCategoryInfo = categoryInfo.data[0].attributes;
  const { seo_title, seo_description } = dataCategoryInfo;
  const nameCategory = dataCategoryInfo.categorie;
  const urlReqCategory = dataCategoryInfo.urlReq;

  return (
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
        <InfoContent t={t} category={nameCategory} />
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
  );
};

export const getServerSideProps = async ({ locale, ...ctx }) => {
  const page = ctx.query.page || 1;
  const sort = ctx.query._sort || "ASC";
  const urlReq = ctx.query.category;
  const pageSize = ctx.query.pageSize || 9;
  const res = await fetch(
    `https://oforms.teamlab.info/dashboard/api/oforms/?filters[categories][urlReq][$eq]=${urlReq}&locale=${locale}&sort=name_form:${sort}&pagination[pageSize]=${pageSize}&pagination[page]=${page}&populate=file_oform&populate=card_prewiew`
  );
  const resCategory = await fetch(
    `https://oforms.teamlab.info/dashboard/api/categories/?filters[urlReq][$eq]=${urlReq}&locale=${locale}`
  );

  const categoryForms = await res.json();
  const categoryInfo = await resCategory.json();

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
    },
  };
};

export default Category;
