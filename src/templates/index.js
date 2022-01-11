import React, { useState, useEffect } from "react";
import { graphql } from "gatsby";
import { useTranslation } from "gatsby-plugin-react-i18next";
import { Trans } from "gatsby-plugin-react-i18next";

import Config from "../../static/data/config.json";
import { cardCarouselSettings } from "../sub-components/template-page/carousel/sub-components/carousel-settings";

import Layout from "../../components/layout";
import HeadSEO from "../sub-components/head-content";
import HeadingContent from "../sub-components/heading-content";
import MainInfo from "../sub-components/template-page/main";
import FormBanner from "../sub-components/heading-content/form-banner";
import CarouselContent from "../sub-components/template-page/carousel";
import Banner from "../sub-components/main-page/banner-cards";
import AccordionContent from "../sub-components/accordion";
import Footer from "../sub-components/footer-content";
import Section from "../sub-components/section";

import Heading from "../../components/heading";

const Template = ({ config, data, pageContext, ...rest }) => {
  const {
    t,
    i18n: { language },
  } = useTranslation();

  const nameLocalStorage = Config.localStorageCarousel;

  const { pathName } = pageContext;
  const MainData = pageContext.data;
  const { seo } = pageContext.data;
  const { title, description } = seo;

  const { allDefJson } = data;
  const allCardForms = allDefJson.nodes;
  const allCardFormsName = MainData.name;
  //const allCardFormsID = MainData.id_item;
  const allCardFormsPrice = MainData.file_type_access;

  // Carousel client data
  const maxItemsClientCardForms = 7;
  // Retrieves the string and converts it to a JavaScript object
  const localStorageTmp = MainData;
  const retrievedString =
    typeof window !== "undefined"
      ? localStorage.getItem(nameLocalStorage)
      : undefined;

  const parsedObjectLocalStorage =
    retrievedString !== undefined ? JSON.parse(retrievedString) : [];
  const [itemsClient, setItemsClient] = useState(parsedObjectLocalStorage);
  const [stateConfig, setConfig] = useState(cardCarouselSettings);

  const clientSideCarousel = () => {
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
        //
        //setItemsClient(parsedObjectLocalStorage);
      } else {
        // Modifies the object, converts it to a string and replaces the existing `data items` in LocalStorage
        parsedObjectLocalStorage.shift();
        tmpLocalStorage = [...parsedObjectLocalStorage, localStorageTmp];
        const modifiedStrigifiedForStorage = JSON.stringify(tmpLocalStorage);
        localStorage.setItem(nameLocalStorage, modifiedStrigifiedForStorage);
        //setItemsClient(parsedObjectLocalStorage);
        //
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
  const randomCardForms = _randomslice(allCardForms, maxItemsRandomCardForms);

  const headingRentForms = (
    <Heading as="h3" fontSize="24px">
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
    <Heading as="h3" fontSize="24px">
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
    .toLowerCase();

  return (
    <Layout {...rest}>
      <Layout.PageHead>
        <HeadSEO
          title={title}
          metaDescription={description}
          metaDescriptionOg={description}
          metaKeywords={title}
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
          data={randomCardForms}
          label={headingRentForms}
          t={t}
        />
        {itemsClient !== null && parsedObjectLocalStorage.length >= 2 ? (
          <CarouselContent
            data={itemsClient}
            label={headingRecentlyViewed}
            config={stateConfig}
            t={t}
          />
        ) : (
          <div />
        )}
        <div>
          <Banner t={t} />
        </div>
        <AccordionContent t={t} />
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
    allDefJson {
      totalCount
      nodes {
        file_categories
        file_last_update
        file_description
        file_formats_download
        file_country_access
        file_image
        link_oform_filling_file
        name
      }
    }
  }
`;
