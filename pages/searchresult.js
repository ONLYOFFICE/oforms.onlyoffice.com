import { useState, useEffect, lazy, Suspense } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import getAllForms from "@lib/strapi/getForms";
import getAllTypes from "@lib/strapi/getTypes";
import getAllCategories from "@lib/strapi/getCategories";
import getAllCompilations from "@lib/strapi/getCompilations";

import CONFIG from "@config/config";
import Layout from "@components/layout";
import HeadSEO from "../src/screens/head-content";
import HeadingContent from "../src/screens/heading-content";
import InfoContent from "../src/screens/search-result-page/info-content";
import MainContent from "../src/screens/search-result-page/main-content";
import DesktopClientContent from "../src/screens/desktop-client-content";
import AdventAnnounce from "../src/screens/heading-content/advent-announce";

const Accordion = lazy(() => import("../src/screens/common/accordion"), {
  loading: () => <div />,
});
const Footer = lazy(() => import("../src/screens/footer-content"), {
  loading: () => <div />,
});

const SearchResult = ({
  locale,
  sort,
  page,
  types, 
  categories, 
  compilations,
}) => {
  const { t } = useTranslation("common");

  const [searchResults, setSearchResults] = useState([]);
  const router = useRouter();
  const query = router.query.query
  const queryDesktopClient = router.query.query

  const isDesktop = router.query.desktop?.substr(0, 4);
  const [isDesktopClient, setIsDesktopClient] = useState(isDesktop);
  const [stateMobile, setStateMobile] = useState(false);

  const CMSConfigAPI = CONFIG.api.cms || "http://localhost:1337";
  const searchReqData = () => {
    const searchURL = `${CMSConfigAPI}/api/oforms/?sort=name_form:${sort}&populate[0]=categories&locale=${locale === "pt" ? "pt-br" : locale}&filters[name_form][$containsi]=${isDesktopClient ? queryDesktopClient : query}&populate=template_image&populate=file_oform&populate=categories&populate=card_prewiew`;
    axios
      .get(searchURL)
      .then((response) => {
        setSearchResults(response.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    if (isDesktopClient ? queryDesktopClient : query?.length > 2) {
      searchReqData();
    } else {
      setSearchResults(null);
    }
  }, [router]);


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
        data={searchResults}
        sort={sort}
        page={+page}
        types={types}
        categories={categories}
        compilations={compilations}
        isDesktopClient={isDesktopClient}
        queryDesktopClient={queryDesktopClient}
      />
    </Layout>
  :
    <Layout>
      <Layout.PageHead>
        <HeadSEO
          title={t("titleIndexPage")}
          metaSiteNameOg={t("metaSiteNameOg")}
          metaDescription={t("titleIndexPage")}
          metaDescriptionOg={t("metaDescriptionOgIndexPage")}
          metaKeywords={t("metaKeywordsIndexPage")}
        />
      </Layout.PageHead>
      <Layout.PageAnnounce>
        <AdventAnnounce t={t} currentLanguage={locale} stateMobile={stateMobile} />
      </Layout.PageAnnounce>
      <Layout.PageHeader>
        <HeadingContent t={t} currentLanguage={locale} stateMobile={stateMobile} setStateMobile={setStateMobile} />
      </Layout.PageHeader>
      <Layout.SectionMain>
        <InfoContent query={query} />
        <MainContent
          currentLanguage={locale}
          sort={sort}
          data={searchResults}
          page={+page}
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

export const getServerSideProps = async ({ locale, query }) => {
  const isDesktop = query.desktop === "true";
  const page = query.page || 1;
  const sort = query._sort || 'asc'
  const pageSize = query.pageSize || isDesktop ? 0 : 9;
  const forms = await getAllForms(locale === "pt" ? "pt-br" : locale, page, sort, pageSize);
  const types = await getAllTypes(locale === "pt" ? "pt-br" : locale);
  const categories = await getAllCategories(locale === "pt" ? "pt-br" : locale);
  const compilations = await getAllCompilations(locale === "pt" ? "pt-br" : locale);
  
  return {
    props: {
      ...(await serverSideTranslations(locale, "common")),
      forms,
      page,
      locale,
      sort,
      types,
      categories,
      compilations
    },
  };
};

export default SearchResult;
