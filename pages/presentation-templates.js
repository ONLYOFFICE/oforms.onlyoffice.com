import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import getExtForms from "@lib/requests/getExtForms";
import getCategories from "@lib/requests/getCategories";
import getPopularTemplates from "@lib/requests/getPopularTemplates";
import Layout from "@components/layout";
import MainHead from "@components/screens/head";
import Header from "@components/screens/header";
import AdventAnnounce from "@components/screens/advent-announce";
import BannerFormSection from "@components/screens/common/banner-form-section";
import CategoryContent from "@components/screens/category-content";
import AccordionSection from "@components/screens/common/accordion-section";
import Footer from "@components/screens/footer";

const PresentationTemplatesPage = ({ locale, sort, page, forms, categories, types, compilations, popularTemplates }) => {
  const { t } = useTranslation("common");

  return (
    <Layout locale={locale}>
      <Layout.PageHead>
        <MainHead
          title={`${t("Presentation templates")} | ONLYOFFICE`}
          description={t("Fill out the presentations online in one click or download and open them in ONLYOFFICE editors")}
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
          categoryName={t("Presentation templates")}
          subtitle={t("Fill out the presentations online in one click or download and open them in ONLYOFFICE editors")}
          forms={forms}
          sort={sort}
          page={page}
          categories={categories}
          types={types}
          compilations={compilations}
          categoryUrl="presentation-templates"
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

  const forms = await getExtForms(locale, page, sort, 9, "pptx");
  const categories = await getCategories(locale, "categories", "categorie");
  const types = await getCategories(locale, "types", "type");
  const compilations = await getCategories(locale, "compilations", "compilation");
  const popularTemplates = await getPopularTemplates(locale, "pptx", null, null);

  return {
    props: {
      ...(await serverSideTranslations(locale, "common")),
      locale,
      sort,
      page,
      forms,
      categories,
      types: types ? types : null,
      compilations,
      popularTemplates
    }
  };
};

export default PresentationTemplatesPage;