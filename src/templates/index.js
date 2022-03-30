import React, { useState, useEffect } from "react";
import { graphql } from "gatsby";
import { useTranslation } from "gatsby-plugin-react-i18next";
import { Trans } from "gatsby-plugin-react-i18next";

import Config from "../../static/data/config.json";
import { cardCarouselSettings } from "../sub-components/template-page/carousel/sub-components/carousel-settings";
import { getCookie, setCookie } from "../helpers/index";
import { CAROUSEL_COOKIE } from "../helpers/constants";

import Layout from "../../components/layout";
import Heading from "../../components/heading";
import HeadSEO from "../sub-components/head-content";
import HeadingContent from "../sub-components/heading-content";
import MainInfo from "../sub-components/template-page/main";
import FormBanner from "../sub-components/heading-content/form-banner";
import CarouselContent from "../sub-components/template-page/carousel";
import Banner from "../sub-components/main-page/banner-cards";
import AccordionContent from "../sub-components/accordion";
import Footer from "../sub-components/footer-content";

const Template = ({ config, data, pageContext, ...rest }) => {
  const {
    t,
    i18n: { language },
  } = useTranslation();

  const nameLocalStorage = Config.localStorageCarousel;

  const { pathName } = pageContext;
  const MainData = pageContext.data;
  const { seo_title, seo_description } = MainData.attributes;

  const { allDataJson } = data;
  const allCardForms = allDataJson?.edges[1].node.data;
  const allCardFormsName = MainData.attributes.name_form;
  const allCardFormsPrice = MainData.attributes.locale;

  // Carousel client data
  const maxItemsClientCardForms = 7;
  // Retrieves the string and converts it to a JavaScript object
  const localStorageTmp = MainData;
  const retrievedString =
    typeof window !== "undefined" && getCookie(CAROUSEL_COOKIE) !== undefined
      ? localStorage.getItem(nameLocalStorage)
      : undefined;
  retrievedString === undefined &&
    typeof window !== "undefined" &&
    localStorage.removeItem("arrayCaroselClientSideItemsOforms");
  const parsedObjectLocalStorage =
    retrievedString !== undefined ? JSON.parse(retrievedString) : [];
  const [itemsClient, setItemsClient] = useState(parsedObjectLocalStorage);
  const [stateConfig, setConfig] = useState(cardCarouselSettings);

  const clientSideCarousel = () => {
    setCookie(CAROUSEL_COOKIE, "oforms-items", 1);
    // Check data in local storage
    if (retrievedString === null || !retrievedString) {
      localStorage.setItem(nameLocalStorage, JSON.stringify([localStorageTmp]));
    } else {
      // Retrieves the string and converts it to a JavaScript object
      const parsedObjectLocalStorage = JSON.parse(retrievedString);

      let tmpLocalStorage;

      if (maxItemsClientCardForms >= parsedObjectLocalStorage.length) {
        // Modifies the object, converts it to a string and replaces the existing `data items` in LocalStorage
        tmpLocalStorage = [...parsedObjectLocalStorage, localStorageTmp];
        const modifiedStrigifiedForStorage = JSON.stringify(tmpLocalStorage);
        localStorage.setItem(nameLocalStorage, modifiedStrigifiedForStorage);
      } else {
        // Modifies the object, converts it to a string and replaces the existing `data items` in LocalStorage
        parsedObjectLocalStorage.shift();
        tmpLocalStorage = [...parsedObjectLocalStorage, localStorageTmp];
        const modifiedStrigifiedForStorage = JSON.stringify(tmpLocalStorage);
        localStorage.setItem(nameLocalStorage, modifiedStrigifiedForStorage);
      }
      setItemsClient(parsedObjectLocalStorage);
      if (parsedObjectLocalStorage.length <= 4) {
        setConfig({
          ...cardCarouselSettings,
          infinite: false,
          slidesToScroll: 4,
          slidesToShow: 4,
        });
      }
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      clientSideCarousel();
    }
  }, []);

  // Carousel content data
  const _randomslice = (array, size) => {
    let newArray = [...array];
    newArray.splice(Math.floor(Math.random() * array.length), 1);
    return array.length <= size + 1 ? newArray : _randomslice(newArray, size);
  };

  const maxItemsRandomCardForms = 7;
  const lngCardForms = allCardForms?.filter(({ attributes }) => {
    let { locale } = attributes;
    if (locale.toLowerCase() === language.toLowerCase()) {
      return { ...attributes };
    }
  });
  const randomCardForms = _randomslice(lngCardForms, maxItemsRandomCardForms);

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

  const linkFillForm = allCardFormsName
    .replace(/\s/g, "-")
    .replace(/[{()}]/g, "")
    .replace("/", "-")
    .toLowerCase();

  return (
    <Layout {...rest}>
      <Layout.PageHead>
        <HeadSEO
          title={seo_title}
          metaDescription={seo_description}
          metaDescriptionOg={seo_description}
          metaKeywords={seo_title}
        />
      </Layout.PageHead>
      <Layout.PageHeader>
        <HeadingContent template currentLanguage={language} t={t} />
      </Layout.PageHeader>
      <Layout.SectionMain>
        <MainInfo
          config={config}
          data={MainData}
          pathName={pathName}
          language={language}
          t={t}
        />
        <FormBanner
          t={t}
          labelPrice={allCardFormsPrice}
          labelName={allCardFormsName}
          link={`/editor?fillform=${linkFillForm}`}
        />
        <CarouselContent
          padding="112px 0 62px"
          tabletPadding="80px 0 30px"
          mobileLPadding="48px 0 0"
          data={randomCardForms}
          label={headingRentForms}
          currentLanguage={language}
          t={t}
        />
        {itemsClient !== null && parsedObjectLocalStorage?.length >= 2 ? (
          <CarouselContent
            padding="0 0 30px"
            tabletPadding="0 0 30px"
            mobileLPadding="0 0 0"
            data={itemsClient}
            label={headingRecentlyViewed}
            config={stateConfig}
            currentLanguage={language}
            t={t}
          />
        ) : (
          <div />
        )}
        <div>
          <Banner t={t} currentLanguage={language} />
        </div>
        <AccordionContent t={t} currentLanguage={language} />
      </Layout.SectionMain>
      <Layout.PageFooter>
        <Footer language={language} t={t} />
      </Layout.PageFooter>
    </Layout>
  );
};

export default Template;

export const query = graphql`
  query ($language: String!) {
    locales: allLocale(filter: { language: { in: [$language, "en"] } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
    allDataJson {
      edges {
        node {
          data {
            id
            attributes {
              card_prewiew {
                data {
                  attributes {
                    url
                  }
                }
              }
              description_card
              file_oform {
                data {
                  attributes {
                    name
                    url
                  }
                }
              }
              locale
              name_form
              template_desc
              template_image {
                data {
                  attributes {
                    url
                    name
                  }
                }
              }
              file_last_update
              file_pages
              file_size
              seo_description
              seo_title
            }
          }
        }
      }
    }
  }
`;
