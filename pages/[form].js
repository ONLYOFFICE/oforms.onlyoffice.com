import { lazy, Suspense, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Trans, useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { localStorageCarousel, CAROUSEL_COOKIE } from "@utils/constants";
import { shortCarouselSettings } from "@components/screens/form-page/carousel/config/carousel-config";

import getAllTypes from "@lib/strapi/getTypes";
import getAllCategories from "@lib/strapi/getCategories";
import getAllCompilations from "@lib/strapi/getCompilations";
import Layout from "@components/layout";
import HeadSEO from "@components/screens/head-content";
import HeadingContent from "@components/screens/heading-content";
import MainInfo from "@components/screens/form-page/main";
import { getCookie, setCookie } from "@utils/helpers/cookie";
import Heading from "@components/common/heading";
import CategoryContent from "@components/screens/form-page/category-content";
import config from "@config/config.json";

const CarouselContent = dynamic(
  () => import("@components/screens/form-page/carousel"),
  { ssr: false }
);
const FormBanner = lazy(
  () => import("@components/screens/form-page/form-banner"),
  {
    loading: () => <div />,
  }
);
const Banner = lazy(() => import("@components/screens/common/banner"), {
  loading: () => <div />,
});
const Accordion = lazy(() => import("@components/screens/common/accordion"), {
  loading: () => <div />,
});
const Footer = lazy(() => import("@components/screens/footer-content"), {
  loading: () => <div />,
});

const Form = ({ form, locale, randomCarousel, types, categories,  compilations }) => {
  const { t } = useTranslation("common");
  const data = form.data[0].attributes;
  const { seo_title, seo_description, url, file_oform, name_form } = data;
  const oformFile = file_oform?.data?.filter((it) => {
    return it?.attributes.name.split(".")[1] === "oform";
  });
  const fillForm = `${oformFile[0]?.attributes?.hash}.oform`;
  const linkOformEditor = `editor/?filename=${url}&fillform=${fillForm}`;

  const dataCarousel = randomCarousel?.data;
  // Carousel client data
  const maxItemsClientCardForms = 7;
  // Retrieves the string and converts it to a JavaScript object
  const localStorageTmp = form?.data;
  const retrievedString =
    typeof window !== "undefined" && getCookie(CAROUSEL_COOKIE) !== undefined
      ? localStorage.getItem(localStorageCarousel)
      : undefined;
  retrievedString === undefined &&
    typeof window !== "undefined" &&
    localStorage.removeItem("arrayCaroselClientSideItemsOforms");
  const parsedObjectLocalStorage =
    retrievedString !== undefined ? JSON.parse(retrievedString) : [];
  const [itemsClient, setItemsClient] = useState(parsedObjectLocalStorage);
  const [stateConfig, setConfig] = useState(shortCarouselSettings);

  const clientSideCarousel = () => {
    setCookie(CAROUSEL_COOKIE, "oforms-items", 1);
    // Check data in local storage
    if (retrievedString === null || !retrievedString) {
      localStorage.setItem(
        localStorageCarousel,
        JSON.stringify([...localStorageTmp])
      );
    } else {
      // Retrieves the string and converts it to a JavaScript object
      const parsedObjectLocalStorage = JSON.parse(retrievedString);

      let tmpLocalStorage;

      if (maxItemsClientCardForms >= parsedObjectLocalStorage.length) {
        // Modifies the object, converts it to a string and replaces the existing `data items` in LocalStorage
        tmpLocalStorage = [...parsedObjectLocalStorage, ...localStorageTmp];
        const modifiedStrigifiedForStorage = JSON.stringify(tmpLocalStorage);
        localStorage.setItem(
          localStorageCarousel,
          modifiedStrigifiedForStorage
        );
      } else {
        // Modifies the object, converts it to a string and replaces the existing `data items` in LocalStorage
        parsedObjectLocalStorage.shift();
        tmpLocalStorage = [...parsedObjectLocalStorage, ...localStorageTmp];
        const modifiedStrigifiedForStorage = JSON.stringify(tmpLocalStorage);
        localStorage.setItem(
          localStorageCarousel,
          modifiedStrigifiedForStorage
        );
      }
      setItemsClient(parsedObjectLocalStorage);
      if (parsedObjectLocalStorage.length <= 6) {
        setConfig({
          ...shortCarouselSettings,
          infinite: false,
          slidesToScroll: 6,
          slidesToShow: 6,
        });
      }
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      clientSideCarousel();
    }
  }, []);

  const headingRentForms = (
    <Heading level={3} fontSize="24px">
      <Trans i18nKey="OtherLeaseRentForms">
        {" "}
        <Heading
          as="span"
          fontSize="24px"
          color="#FF6F3D"
          fontWeight="700"
          display="inline"
        ></Heading>
      </Trans>
    </Heading>
  );

  const headingRecentlyViewed = (
    <Heading level={3} fontSize="24px">
      <Trans i18nKey="RecentlyViewed">
        {" "}
        <Heading
          as="span"
          fontSize="24px"
          color="#FF6F3D"
          fontWeight="700"
          display="inline"
        ></Heading>
      </Trans>
    </Heading>
  );

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
        <HeadingContent template currentLanguage={locale} t={t} />
      </Layout.PageHeader>
      <Layout.SectionMain>
        <MainInfo
          data={data}
          currentLanguage={locale}
          t={t}
          link={linkOformEditor}
        />
        <Suspense>
          <FormBanner t={t} labelName={name_form} link={linkOformEditor} />
        </Suspense>
        <CarouselContent
          padding="112px 0 62px"
          tabletPadding="80px 0 30px"
          mobileLPadding="48px 0 0"
          data={dataCarousel}
          label={headingRentForms}
          currentLanguage={locale}
          t={t}
          description={true}
        />
        <CarouselContent
          padding="0 0 112px"
          tabletPadding="0 0 70px"
          mobileLPadding="0 0 30px"
          data={itemsClient}
          shortCard={true}
          label={headingRecentlyViewed}
          config={stateConfig}
          currentLanguage={locale}
          t={t}
        />

        <CategoryContent t={t} types={types} locale={locale} categories={categories} compilations={compilations}/>        
        
        {/* <Suspense>
          <Banner t={t} currentLanguage={locale} />
        </Suspense>
        <Suspense>
          <Accordion t={t} currentLanguage={locale} />
        </Suspense> */}
      </Layout.SectionMain>
      <Layout.PageFooter>
        {/* <Suspense>
          <Footer t={t} language={locale} />
        </Suspense> */}
      </Layout.PageFooter>
    </Layout>
  );
};

export const getServerSideProps = async ({ locale, ...context }) => {
  const cms = config.api.cms
  const res = await fetch(
    `${cms}/api/oforms?filters[url][$eq]=${context.query.form}&locale=${locale}&populate=template_image&populate=file_oform&populate=categories&populate=card_prewiew`
  );
  const form = await res.json();
  const randomCarouselItems = await fetch(
    `${cms}/api/oforms/?locale=${locale}&pagination[pageSize]=7&pagination[page]=2&populate=file_oform&populate=categories&populate=card_prewiew`

  );
  const randomCarousel = await randomCarouselItems.json();
  const types = await getAllTypes(locale);
  const categories = await getAllCategories(locale);
  const compilations = await getAllCompilations(locale);
  if (form.data.length === 0) {
    return {
      redirect: {
        destination: `https://oforms.teamlab.info/404`,
        permanent: true,
      },
    };
  }

  return {
    props: {
      notFound: true,
      ...(await serverSideTranslations(locale, "common")),
      form,
      locale,
      randomCarousel,
      types,
      categories,
      compilations
    },
  };
};

export default Form;
