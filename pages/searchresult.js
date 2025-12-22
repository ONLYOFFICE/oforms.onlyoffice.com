import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import getSearchResult from "@lib/requests/getSearchResult";
import Layout from "@components/layout";
import MainHead from "@components/screens/head";
import Header from "@components/screens/header";
import AdventAnnounce from "@components/screens/advent-announce";
import SearchResultContent from "@components/screens/search-result-content";
import BannerFormSection from "@components/screens/common/banner-form-section";
import AccordionSection from "@components/screens/common/accordion-section";
import Footer from "@components/screens/footer";

const SearchResultPage = ({ locale, sort, page, searchQuery, searchData }) => {
  const { t } = useTranslation("common");

  return (
    <Layout locale={locale}>
      <Layout.PageHead>
        <MainHead
          title={`${searchQuery === "" ? t("Search PDF forms and templates") : searchQuery} | ONLYOFFICE`}
          description={t("Free templates and fillable PDF forms for any business purpose")}
        />
      </Layout.PageHead>
      <AdventAnnounce locale={locale} />
      <Layout.PageHeader>
        <Header t={t} locale={locale} />
      </Layout.PageHeader>
      <Layout.SectionMain>
        <SearchResultContent
          t={t}
          locale={locale}
          searchQuery={searchQuery}
          searchData={searchData}
          sort={sort}
          page={page}
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
  const pageSize = query.pageSize || 9;
  const searchQuery = query.query || "";

  const searchData = await getSearchResult(locale, page, sort, pageSize, searchQuery);

  return {
    props: {
      ...(await serverSideTranslations(locale, "common")),
      locale,
      sort,
      page,
      searchQuery,
      searchData: searchQuery === "" ? [] : searchData,
    }
  };
};

export default SearchResultPage;
