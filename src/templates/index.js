import React, { useState, useEffect } from "react";
import { graphql } from "gatsby";
import { useTranslation } from "gatsby-plugin-react-i18next";

import Config from "../../config.json";
import { cardCarouselSettings } from "../sub-components/template-page/carousel/sub-components/carousel-settings";

import Layout from "../../components/layout";
import HeadSEO from "../sub-components/head-content";
import HeadingContent from "../sub-components/heading-content";
import MainInfo from "../sub-components/template-page/main";
import FormBanner from "../sub-components/heading-content/form-banner";
import CarouselContent from "../sub-components/template-page/carousel";
import AccordionContent from "../sub-components/accordion";
import Footer from "../sub-components/footer-content";

const Template = ({ data, pageContext, ...rest }) => {
  const {
    t,
    i18n: { language },
  } = useTranslation();

  const nameLocalStorage = Config.localStorageCarousel;

  const { pathName } = pageContext;
  const MainData = pageContext.data;
  const { seo } = pageContext.data;
  const { title, description } = seo;

  const { allOformsJson } = data;
  const allCardForms = allOformsJson.nodes;
  const allCardFormsName = MainData.name;
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

  // Main info content

  return (
    <Layout {...rest}>
      <Layout.PageHead>
        <HeadSEO
          title={title}
          metaDescription={description}
          metaKeywords={title}
        />
      </Layout.PageHead>
      <Layout.PageHeader>
        <HeadingContent template currentLanguage={language} t={t} />
      </Layout.PageHeader>
      <Layout.SectionMain>
        <MainInfo
          data={MainData}
          pathName={pathName}
          language={language}
          t={t}
        />
        <FormBanner
          t={t}
          labelPrice={allCardFormsPrice}
          labelName={allCardFormsName}
          likn={
            "https://nct.onlyoffice.com/Products/Files/DocEditor.aspx?fileid=45424&doc=N25yVTc2R1NMdEZUa0VDc2VDTklwdnNVUE5jUml0WndQNnV3Q3pLTGRFcz0_IjQ1NDI0Ig2"
          }
        />
        <CarouselContent
          data={randomCardForms}
          label={t("OtherLeaseRentForms")}
          t={t}
        />
        {itemsClient !== null && parsedObjectLocalStorage.length >= 2 && (
          <CarouselContent
            data={itemsClient}
            label={t("RecentlyViewed")}
            config={stateConfig}
            t={t}
          />
        )}
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
    allOformsJson {
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
