import StyledDesktopClient from "./styled-desktop-client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import { ReactSVG } from "react-svg";
import CONFIG from "@config/config";
import Heading from "@components/common/heading";
import InternalLink from "@components/common/internal-link";
import Text from "@components/common/text";
import CategorySelector from "@components/screens/desktop-client/category-selector";
import LanguageSelector from "@components/common/language-selector";
import SortSelector from "./sort-selector";
import Card from "./card";
import FormPopup from "./form-popup";
import SearchInput from "./search-input";
import SkeletonCard from "./skeleton-card";

const DesktopClient = ({ t, locale, data, sort, categories, types, compilations, theme, isCategoryPage, categoryName }) => {
  const [formsData, setFormsData] = useState(data);
  const [cardData, setCardData] = useState();
  const [newFormsLength, setNewFormsLength] = useState(5);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [modalActive, setModalActive] = useState(false);
  const [showScrollToTopBtn, setShowScrollToTopBtn] = useState(false);
  const [hideCategorySelector, setHideCategorySelector] = useState(false);
  const wrapperRef = useRef(null);
  const bottomObserver = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const loadImages = async () => {
      const imageLoadPromises = formsData?.data?.map(async (form) => {
        const templateImage = new Image();
  
        templateImage.src = form.attributes.card_prewiew?.data?.attributes?.url;
        const templateImageLoaded = new Promise((resolve) => {
          templateImage.onload = () => resolve(true);
          templateImage.onerror = () => resolve(false);
        });
  
        return templateImageLoaded;
      });
  
      await Promise.all(imageLoadPromises);

      setIsLoading(false);
    };

    if (formsData.length === 0) {
      setIsLoading(false);
    } else {
      loadImages();
    }

    const handleScroll = () => {
      if (wrapperRef.current) {
        const isScrolled = wrapperRef.current.scrollTop > 310;
        setShowScrollToTopBtn(isScrolled);
      }
    };

    if (wrapperRef.current) {
      wrapperRef.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (wrapperRef.current) {
        wrapperRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  useEffect(() => {
    if (data.data.length > 0) {
      const handleObserver = (entries) => {
        if (entries[0].isIntersecting) {
          handleLoadMoreForms();
        }
      };
  
      const observer = new IntersectionObserver(handleObserver, { threshold: 0.5 });
  
      if (bottomObserver.current) {
        observer.observe(bottomObserver.current);
      }
  
      return () => {
        if (bottomObserver.current) {
          observer.unobserve(bottomObserver.current);
        }
      };
    }
  }, [formsData]);

  useEffect(() => {
    setFormsData(data);
  }, [sort, data]);

  const handleCardData = (data) => {
    setCardData(data);
    setModalActive(true);
  };

  const handleLoadMoreForms = async () => {
    try {
      if (formsData.meta.pagination.page === formsData.meta.pagination.pageCount) {
        return;
      }

      setIsLoadingMore(true);

      const formsRes = await fetch(`${CONFIG.api.cms}/api/oforms/?sort=name_form:${sort}&pagination[pageSize]=32&pagination[page]=${formsData.meta.pagination.page + 1}&populate=template_image&populate=file_oform&populate=card_prewiew&populate=categories&locale=${locale === "pt" ? "pt-br" : locale}`);
      const newForms = await formsRes.json();
      const result = {
        data: [...formsData.data, ...newForms.data],
        meta: newForms.meta
      };

      setNewFormsLength(newForms.data.length);

      const imageLoadPromises = newForms.data.map(async (form) => {
        const templateImage = new Image();
  
        templateImage.src = form.attributes.card_prewiew?.data?.attributes?.url;
        const templateImageLoaded = new Promise((resolve) => {
          templateImage.onload = () => resolve(true);
          templateImage.onerror = () => resolve(false);
        });
  
        return templateImageLoaded;
      });
  
      await Promise.all(imageLoadPromises);

      setFormsData(result);
      setIsLoadingMore(false);
    } catch {
      setIsLoadingMore(true);
    }
  };

  const scrollToTop = () => {
    wrapperRef.current.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <StyledDesktopClient theme={theme}>
      <div className="header">
        <Heading className="header-title" level={1} label={t("Templates")} />

        <div className="header-wrapper">
          <CategorySelector
            t={t}
            locale={locale}
            categories={categories}
            types={types}
            compilations={compilations}
            isCategoryPage={isCategoryPage}
            categoryName={categoryName}
            hideCategorySelector={hideCategorySelector}
            theme={theme}
          />
          <SearchInput t={t} setHideCategorySelector={setHideCategorySelector} theme={theme} />
          <SortSelector sort={sort} theme={theme} />
          <LanguageSelector theme={theme} />
        </div>
      </div>

      <div ref={wrapperRef} className="wrapper">
        {formsData.length === 0 || formsData.data.length === 0 ?
          <div className="error-desktop-content">
            <div className="error-desktop-image"></div>
            <div>
              <Heading className="error-desktop-title" level={4} label={t("Nothing found")} />
              <Text className="error-desktop-text" label={t("No results matching your query could be found")} />
              <InternalLink className="error-desktop-link" href={`/?desktop=true${theme ? `&theme=${theme}` : ""}`} label={t("Clear filter")} />
            </div>
          </div>
        :
        <ul className="cards">
          {isLoading ?
            [...new Array(formsData?.data?.length)].map((_, index) => <SkeletonCard key={index} theme={theme} />)
          :
            formsData?.data?.map((data) => (
              <li className="card-item" key={data.id}>
                <Card data={data} handleCardData={handleCardData} theme={theme} />
              </li>
            ))
          }
          {isLoadingMore && router.pathname !== "/searchresult" &&
            [...new Array(newFormsLength)].map((_, index) => <SkeletonCard key={index} theme={theme} />)
          }
        </ul>
        }
        <div ref={bottomObserver} />
        {showScrollToTopBtn &&
          <button onClick={scrollToTop} className="scroll-to-top-btn">
            <ReactSVG src="/icons/chevron-up.svg" />
          </button>
        }
      </div>

      <FormPopup
        t={t}
        locale={locale}
        data={cardData}
        modalActive={modalActive}
        setModalActive={setModalActive}
        theme={theme}
      />
    </StyledDesktopClient>
  );
};

export default DesktopClient;
