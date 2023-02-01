import { useState, useEffect } from "react";
import { lazy, Suspense } from "react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import getAllForms from "@lib/strapi/getForms";
import getAllTypes from "@lib/strapi/getTypes";
import getAllCategories from "@lib/strapi/getCategories";
import getAllCompilations from "@lib/strapi/getCompilations";
import Layout from "@components/layout";
import HeadSEO from "@components/screens/head-content";
import HeadingContent from "@components/screens/heading-content";
import InfoContent from "@components/screens/main-page/info-content";
import MainContent from "@components/screens/main-page/main-content";
import DesktopClientContent from "@components/screens/desktop-client-content";
import AdventAnnounce from "@components/screens/heading-content/advent-announce";
import InfiniteScroll from "react-infinite-scroll-component";
import CONFIG from "@config/config";

import Text from "@components/common/text";

const Accordion = lazy(() => import("@components/screens/common/accordion"), {
  suspense: true,
  ssr: false,
});
const Footer = lazy(() => import("@components/screens/footer-content"), {
  suspense: true,
  ssr: false,
});

const Index = ({ forms, page, locale, sort, types, categories, compilations }) => {
  const { t } = useTranslation("common");
  const CMSConfigAPI = CONFIG.api.cms || "http://localhost:1337";

  const query = useRouter();
  const isDesktop = query.query.desktop === "true";
  const [isDesktopClient, setIsDesktopClient] = useState(isDesktop);
  const [newForms, setNewForms] = useState(forms);
  const [hasMore, setHasMore] = useState(true);

  let nonStateObjectData = Object.assign({}, forms);

  useEffect(() => {
    window.addEventListener('scroll', handleOnScroll);
    return () => window.removeEventListener('scroll', handleOnScroll);
  }, []);

  useEffect(() => {
    console.log(newForms)
  }, [newForms])

  const getMoreForms = async () => {
    const nextPage = nonStateObjectData?.meta.pagination.page + 1 || 1;
    if(nextPage > nonStateObjectData?.meta.pagination.pageCount) return;
    const res = await fetch(
      `${CMSConfigAPI}/api/oforms/?sort=name_form:asc&pagination[pageSize]=32&pagination[page]=${nextPage}&populate=template_image&populate=file_oform&populate=card_prewiew&populate=categories&locale=en`
    );
    const newFormsRequest = await res.json();

    const newData = [...nonStateObjectData.data, ...newFormsRequest.data ]
    const newObjectData = {
      data: newData,
      meta: newFormsRequest.meta
    }
    setNewForms(newObjectData);
    nonStateObjectData = Object.assign({}, newObjectData)
  };

  const handleOnScroll = () => {
    var scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
    var scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight;
    var clientHeight = document.documentElement.clientHeight || window.innerHeight;
    var scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;
  
    if (scrolledToBottom) {
       console.log("At bottom");
       getMoreForms();
    }
  }

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
        data={newForms}
        sort={sort}
        page={+page}
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
          title={t("titleIndexPage")}
          metaSiteNameOg={t("metaSiteNameOg")}
          metaDescription={t("titleIndexPage")}
          metaDescriptionOg={t("metaDescriptionOgIndexPage")}
          metaKeywords={t("metaKeywordsIndexPage")}
        />
      </Layout.PageHead>
      <AdventAnnounce t={t} currentLanguage={locale} />
      <Layout.PageHeader>       
          <HeadingContent t={t} currentLanguage={locale} />            
      </Layout.PageHeader>
      <Layout.SectionMain>
        <InfoContent t={t} currentLanguage={locale} />
        <MainContent
          t={t}
          currentLanguage={locale}
          data={forms}
          sort={sort}
          page={+page}
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

export const getServerSideProps = async ({ locale, query }) => {
  const isDesktop = query.desktop === "true";
  const page = query.page || 1;
  const sort = query._sort || "ASC";
  const pageSize = query.pageSize || isDesktop ? 32 : 9;
  const forms = await getAllForms(locale, page, sort, pageSize);
  const types = await getAllTypes(locale);
  const categories = await getAllCategories(locale);
  const compilations = await getAllCompilations(locale);

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

export default Index;
