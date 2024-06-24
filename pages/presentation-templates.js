import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useState } from "react";
import getPptxForms from "@lib/requests/getPptxForms";
import getCategories from "@lib/requests/getCategories";
import getTypes from "@lib/requests/getTypes";
import getCompilations from "@lib/requests/getCompilations";
import Layout from "@components/layout";
import MainHead from "@components/screens/head";
import Header from "@components/screens/header";
import AdventAnnounce from "@components/screens/header/advent-announce";
import BannerFormSection from "@components/screens/common/banner-form-section";
import CategoryContent from "@components/screens/category-content";
import AccordionSection from "@components/screens/common/accordion-section";
import Footer from "@components/screens/footer";

const PresentationTemplatesPage = ({ locale, sort, page, forms, categories, types, compilations }) => {
  const { t } = useTranslation("common");
  const [stateMobile, setStateMobile] = useState(false);

  return (
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
          categoryName={t("Presentation templates")}
          subtitle={t("Fill out the spreadsheets online in one click or download and open them them in ONLYOFFICE editors")}
          forms={forms}
          sort={sort}
          page={page}
          categories={categories}
          types={types}
          compilations={compilations}
          categoryUrl="presentation-templates"
        />
        <BannerFormSection t={t} locale={locale} />
        <AccordionSection t={t} />
      </Layout.SectionMain>
      <Layout.PageFooter>
        <Footer t={t} locale={locale} />
      </Layout.PageFooter>
    </Layout>
  )
};

export const getServerSideProps = async ({ locale, query }) => {
  const page = query.page || 1;
  const sort = query._sort || "asc";
  const pageSize = query.pageSize ? 0 : 9;
  const forms = await getPptxForms(locale === "pt" ? "pt-br" : locale, page, sort, pageSize);
  const categories = await getCategories(locale === "pt" ? "pt-br" : locale);
  const types = await getTypes(locale === "pt" ? "pt-br" : locale);
  const compilations = await getCompilations(locale === "pt" ? "pt-br" : locale);

  return {
    props: {
      ...(await serverSideTranslations(locale, "common")),
      locale,
      sort,
      page,
      forms,
      categories,
      types: types ? types : null,
      compilations
    }
  };
};

export default PresentationTemplatesPage;