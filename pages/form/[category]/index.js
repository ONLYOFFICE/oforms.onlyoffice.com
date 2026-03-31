import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import getCategories from "@lib/requests/getCategories";
import getCategoryForms from "@lib/requests/getCategoryForms";
import getCategoryInfo from "@lib/requests/getCategoryInfo";
import getPopularTemplates from "@lib/requests/getPopularTemplates";
import Layout from "@components/layout";
import MainHead from "@components/screens/head";
import Header from "@components/screens/header";
import AdventAnnounce from "@components/screens/advent-announce";
import BannerFormSection from "@components/screens/common/banner-form-section";
import CategoryContent from "@components/screens/category-content";
import AccordionSection from "@components/screens/common/accordion-section";
import Footer from "@components/screens/footer";

const Category = ({ categoryForms, categoryInfo, locale, page, sort, types, categories, compilations, popularTemplates }) => {
  const { t } = useTranslation("common");
  const seoTitle = categoryInfo.data[0]?.attributes.seo_title ? categoryInfo.data[0]?.attributes.seo_title : categoryInfo.data[0]?.attributes.categorie;
  const seoDescription = categoryInfo.data[0]?.attributes.seo_description ? categoryInfo.data[0]?.attributes.seo_description : categoryInfo.data[0]?.attributes.header_description;

  return (
    <Layout locale={locale}>
      <Layout.PageHead>
        <MainHead
          title={seoTitle}
          description={seoDescription}
        />
      </Layout.PageHead>
      <AdventAnnounce locale={locale} />
      <Layout.PageHeader>
        <Header t={t} locale={locale} />
      </Layout.PageHeader>
      <Layout.SectionMain>
        <CategoryContent
          t={t}
          locale={locale}
          title={categoryInfo.data[0]?.attributes.categorie}
          subtitle={categoryInfo.data[0]?.attributes.header_description}
          forms={categoryForms}
          sort={sort}
          page={page}
          categories={categories}
          types={types}
          compilations={compilations}
          categoryName={categoryInfo.data[0]?.attributes.categorie}
          categoryUrl={`form/${categoryInfo.data[0]?.attributes.urlReq}`}
          popularTemplates={popularTemplates}
        />
        <BannerFormSection t={t} locale={locale} />
        <AccordionSection t={t} locale={locale} />
      </Layout.SectionMain>
      <Layout.PageFooter>
        <Footer locale={locale} />
      </Layout.PageFooter>
    </Layout>
  )
};

export const getServerSideProps = async ({ locale, query }) => {
  const page = query.page || 1;
  const sort = query._sort || "asc";
  const urlReq = query.category;

  const categoryForms = await getCategoryForms(locale, sort, page, 9, urlReq, "categories");
  const categoryInfo = await getCategoryInfo(locale, urlReq, "categories", "categorie");
  const types = await getCategories(locale, "types", "type");
  const categories = await getCategories(locale, "categories", "categorie");
  const compilations = await getCategories(locale, "compilations", "compilation");
  const popularTemplates = await getPopularTemplates(locale, null, urlReq, "categories");

  if (categoryForms.data.length === 0) {
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
      types: types ? types : null,
      categories,
      compilations,
      popularTemplates
    },
  };
};

export default Category;
