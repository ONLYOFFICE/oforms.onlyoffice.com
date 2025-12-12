import StyledCategorySelector from "./styled-category-selector";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import InternalLink from "@components/common/internal-link";
import Heading from "@components/common/heading";

const CategorySelector = ({ t, locale, categories, types, compilations, isCategoryPage, categoryName, hideCategorySelector, theme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isTypeOpen, setIsTypeOpen] = useState(false);
  const [isCompilationsOpen, setIsCompilationsOpen] = useState(false);
  const router = useRouter();

  const handleClose = () => {
    setIsOpen(false);
    setIsCategoryOpen(false);
    setIsTypeOpen(false);
    setIsCompilationsOpen(false);
  };

  useEffect(() => {
    handleClose(false);
  }, [router]);

  useEffect(() => {
    if (window.innerWidth <= 1024) {
      const handleClickOutside = (event) => {
        if (isOpen && !event.target.closest(".category-selector")) {
          handleClose();
        }
      };

      if (isOpen) {
        document.addEventListener("click", handleClickOutside);
      }

      return () => {
        document.removeEventListener("click", handleClickOutside);
      };
    }
  }, [isOpen]);

  const menuOnMouseEnter = (setIsOpenFunction) => {
    if (window.innerWidth >= 1024) {
      setIsOpenFunction(true);
    }
  };

  const handleClearValue = () => {
    const query = {
      desktop: router.query.desktop,
    };
    
    if (router.query.theme) {
      query.theme = router.query.theme;
    }
    
    router.push({
      pathname: "/",
      query: query
    });
  };

  return (
    <StyledCategorySelector
      onMouseLeave={() => window.innerWidth >= 1024 && setIsOpen(false)}
      $locale={locale}
      $theme={theme}
      className={`category-selector ${locale} ${hideCategorySelector ? "hide-mobile" : ""}`}
    >
      <div className="category-selector-heading">
        <Heading 
          onClick={() => setIsOpen(!isOpen)}
          className={`category-selector-title ${isOpen ? "open" : ""} ${isCategoryPage ? "desktop-category-page" : ""}`}
          level={4}
        >
          {t("Categories")}{locale === "fr" ? " :" : locale === "ja" ? "：" : locale === "zh" ? ": " : ":"}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M12.0025 13.5436L7.74265 9.29363C7.35168 8.90355 6.71617 8.90192 6.32319 9.28998L6.29579 9.31705C5.90282 9.70511 5.9012 10.3359 6.29217 10.726L11.2835 15.7058C11.504 15.9258 11.8023 16.0223 12.091 15.9949C12.3216 15.9768 12.5469 15.8799 12.7228 15.7044L17.7077 10.731C18.0987 10.3409 18.0971 9.71014 17.7041 9.32208L17.6767 9.29502C17.2837 8.90696 16.6482 8.90859 16.2572 9.29866L12.0025 13.5436Z" fill="#666666"/>
          </svg>
        </Heading>
        {isCategoryPage &&
          <>
            <div onClick={() => setIsOpen(!isOpen)} className="category-selector-name">{categoryName}</div>
            <button onClick={handleClearValue} className="category-selector-btn">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 8L15 15M15 8L8 15" stroke="black" strokeOpacity="0.8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </>
        }
      </div>

      {isOpen &&
        <div className={`category-selector-dropdown ${isCategoryOpen === true || isTypeOpen === true || isCompilationsOpen === true ? "active" : ""}`}>
          <div className="category-selector-header">
            <Heading className="category-selector-title" level={4} label={t("Categories")} />
            <button onClick={handleClose} className="category-selector-header-btn">
              <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M5.78497 5.2945C5.39445 5.68502 5.39077 6.32186 5.78129 6.71239L11.0689 12L11.069 12.0001L5.78138 17.2877C5.39086 17.6782 5.39454 18.3151 5.78506 18.7056C6.17559 19.0961 6.81243 19.0998 7.20295 18.7093L12.4906 13.4217L17.7782 18.7093C18.1687 19.0998 18.8055 19.0961 19.1961 18.7056C19.5866 18.3151 19.5903 17.6782 19.1997 17.2877L13.9121 12.0001L13.9122 12L19.1998 6.71239C19.5903 6.32186 19.5867 5.68502 19.1961 5.2945C18.8056 4.90397 18.1688 4.90029 17.7782 5.29082L12.4906 10.5785L12.4906 10.5785L12.4905 10.5785L7.20287 5.29082C6.81234 4.90029 6.1755 4.90397 5.78497 5.2945Z" fill="#808080"/>
              </svg>
            </button>
          </div>
          <div>
            <InternalLink
              className="category-selector-item"
              href={`/?desktop=true${theme ? `&theme=${theme}` : ""}`}
              label={t("View all templates")}
            />
          </div>
          {categories?.data.length > 0 &&
            <div 
              onMouseEnter={() => menuOnMouseEnter(setIsCategoryOpen)} 
              onMouseLeave={() => window.innerWidth >= 1024 && setIsCategoryOpen(false)}
            >
              <Heading
                onClick={() => window.innerWidth < 1024 && setIsCategoryOpen(true)}
                level={5}
                className={`category-selector-item ${isCategoryOpen ? "active" : ""}`}
              >
                {t("Templates by branch")}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M13.5436 11.9975L9.29363 16.2574C8.90355 16.6483 8.90192 17.2838 9.28998 17.6768L9.31705 17.7042C9.70511 18.0972 10.3359 18.0988 10.726 17.7078L15.7058 12.7165C15.9258 12.496 16.0223 12.1977 15.9949 11.909C15.9768 11.6784 15.8799 11.4531 15.7044 11.2772L10.731 6.2923C10.3409 5.90132 9.71014 5.90294 9.32208 6.29591L9.29502 6.32332C8.90696 6.71629 8.90859 7.3518 9.29866 7.74277L13.5436 11.9975Z" fill="#444444"/>
                </svg>
              </Heading>
              {isCategoryOpen &&
                <div className="category-selector-submenu">
                  <div className="category-selector-header">
                    <button
                      onMouseEnter={() => window.innerWidth >= 1024 && setIsCategoryOpen(false)}
                      onClick={(e) => window.innerWidth < 1024 && (
                        e.stopPropagation(),
                        setIsCategoryOpen(false)
                      )}
                      className="category-selector-header-btn"
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M10.4564 11.9975L14.7064 16.2574C15.0964 16.6483 15.0981 17.2838 14.71 17.6768L14.683 17.7042C14.2949 18.0972 13.6641 18.0988 13.274 17.7078L8.29417 12.7165C8.07416 12.496 7.97772 12.1977 8.00508 11.909C8.02321 11.6784 8.12008 11.4531 8.29557 11.2772L13.269 6.2923C13.6591 5.90132 14.2899 5.90294 14.6779 6.29591L14.705 6.32332C15.093 6.71629 15.0914 7.3518 14.7013 7.74277L10.4564 11.9975Z" fill="#444444"/>
                      </svg>
                    </button>
                    <Heading className="category-selector-title" level={4} label={t("Templates by branch")} />
                    <button onClick={handleClose} className="category-selector-header-btn">
                      <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M5.78497 5.2945C5.39445 5.68502 5.39077 6.32186 5.78129 6.71239L11.0689 12L11.069 12.0001L5.78138 17.2877C5.39086 17.6782 5.39454 18.3151 5.78506 18.7056C6.17559 19.0961 6.81243 19.0998 7.20295 18.7093L12.4906 13.4217L17.7782 18.7093C18.1687 19.0998 18.8055 19.0961 19.1961 18.7056C19.5866 18.3151 19.5903 17.6782 19.1997 17.2877L13.9121 12.0001L13.9122 12L19.1998 6.71239C19.5903 6.32186 19.5867 5.68502 19.1961 5.2945C18.8056 4.90397 18.1688 4.90029 17.7782 5.29082L12.4906 10.5785L12.4906 10.5785L12.4905 10.5785L7.20287 5.29082C6.81234 4.90029 6.1755 4.90397 5.78497 5.2945Z" fill="#808080"/>
                      </svg>
                    </button>
                  </div>
                  <div className="category-selector-links-wrapper">
                    <ul className={`category-selector-links ${categories?.data.length > 8 ? "category-selector-links-columns" : ""}`}>
                      {categories?.data?.map((categorie) => (
                        <li key={categorie.id}>
                          <InternalLink
                            className={categoryName === categorie.attributes.categorie ? "active" : ""}
                            href={`/form/${categorie.attributes.urlReq}/?desktop=true${theme ? `&theme=${theme}` : ""}`}
                            label={categorie.attributes.categorie}
                          />
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              }
            </div>
          }
          {types?.data.length > 0 &&
            <div 
              onMouseEnter={() => menuOnMouseEnter(setIsTypeOpen)} 
              onMouseLeave={() => window.innerWidth >= 1024 && setIsTypeOpen(false)}
            >
              <Heading 
                onClick={() => window.innerWidth < 1024 && setIsTypeOpen(true)} 
                level={5} 
                className={`category-selector-item ${isTypeOpen ? "active" : ""}`}
              >
                {t("Templates by type")}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M13.5436 11.9975L9.29363 16.2574C8.90355 16.6483 8.90192 17.2838 9.28998 17.6768L9.31705 17.7042C9.70511 18.0972 10.3359 18.0988 10.726 17.7078L15.7058 12.7165C15.9258 12.496 16.0223 12.1977 15.9949 11.909C15.9768 11.6784 15.8799 11.4531 15.7044 11.2772L10.731 6.2923C10.3409 5.90132 9.71014 5.90294 9.32208 6.29591L9.29502 6.32332C8.90696 6.71629 8.90859 7.3518 9.29866 7.74277L13.5436 11.9975Z" fill="#444444"/>
                </svg>
              </Heading>
              {isTypeOpen &&
                <div className="category-selector-submenu">
                  <div className="category-selector-header">
                    <button 
                      onMouseEnter={() => window.innerWidth >= 1024 && setIsTypeOpen(false)} 
                      onClick={(e) => window.innerWidth < 1024 && (
                        e.stopPropagation(),
                        setIsTypeOpen(false)
                      )}
                      className="category-selector-header-btn"
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M10.4564 11.9975L14.7064 16.2574C15.0964 16.6483 15.0981 17.2838 14.71 17.6768L14.683 17.7042C14.2949 18.0972 13.6641 18.0988 13.274 17.7078L8.29417 12.7165C8.07416 12.496 7.97772 12.1977 8.00508 11.909C8.02321 11.6784 8.12008 11.4531 8.29557 11.2772L13.269 6.2923C13.6591 5.90132 14.2899 5.90294 14.6779 6.29591L14.705 6.32332C15.093 6.71629 15.0914 7.3518 14.7013 7.74277L10.4564 11.9975Z" fill="#444444"/>
                      </svg>
                    </button>
                    <Heading className="category-selector-title" level={4} label={t("Templates by type")} />
                    <button onClick={handleClose} className="category-selector-header-btn">
                      <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M5.78497 5.2945C5.39445 5.68502 5.39077 6.32186 5.78129 6.71239L11.0689 12L11.069 12.0001L5.78138 17.2877C5.39086 17.6782 5.39454 18.3151 5.78506 18.7056C6.17559 19.0961 6.81243 19.0998 7.20295 18.7093L12.4906 13.4217L17.7782 18.7093C18.1687 19.0998 18.8055 19.0961 19.1961 18.7056C19.5866 18.3151 19.5903 17.6782 19.1997 17.2877L13.9121 12.0001L13.9122 12L19.1998 6.71239C19.5903 6.32186 19.5867 5.68502 19.1961 5.2945C18.8056 4.90397 18.1688 4.90029 17.7782 5.29082L12.4906 10.5785L12.4906 10.5785L12.4905 10.5785L7.20287 5.29082C6.81234 4.90029 6.1755 4.90397 5.78497 5.2945Z" fill="#808080"/>
                      </svg>
                    </button>
                  </div>
                  <div className="category-selector-links-wrapper">
                    <ul className={`category-selector-links ${types.data.length > 8 ? "category-selector-links-columns" : ""}`}>
                      {types.data?.map((type) => (
                        <li key={type.id}>
                          <InternalLink 
                            className={categoryName === type.attributes.type ? "active" : ""} 
                            href={`/form/types/${type.attributes.urlReq}/?desktop=true${theme ? `&theme=${theme}` : ""}`} 
                            label={type.attributes.type} 
                          />
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              }
            </div>
          }
          {compilations?.data.length > 0 &&
            <div 
              onMouseEnter={() => menuOnMouseEnter(setIsCompilationsOpen)} 
              onMouseLeave={() => window.innerWidth >= 1024 && setIsCompilationsOpen(false)}
            >
              <Heading
                onClick={() => window.innerWidth < 1024 && setIsCompilationsOpen(true)}
                level={5}
                className={`category-selector-item ${isCompilationsOpen ? "active" : ""}`}
              >
                {t("Popular compilations")}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M13.5436 11.9975L9.29363 16.2574C8.90355 16.6483 8.90192 17.2838 9.28998 17.6768L9.31705 17.7042C9.70511 18.0972 10.3359 18.0988 10.726 17.7078L15.7058 12.7165C15.9258 12.496 16.0223 12.1977 15.9949 11.909C15.9768 11.6784 15.8799 11.4531 15.7044 11.2772L10.731 6.2923C10.3409 5.90132 9.71014 5.90294 9.32208 6.29591L9.29502 6.32332C8.90696 6.71629 8.90859 7.3518 9.29866 7.74277L13.5436 11.9975Z" fill="#444444"/>
                </svg>
              </Heading>
              {isCompilationsOpen &&
                <div className="category-selector-submenu">
                  <div className="category-selector-header">
                    <button
                      onMouseEnter={() => window.innerWidth >= 1024 && setIsCompilationsOpen(false)}
                      onClick={(e) => window.innerWidth < 1024 && (
                        e.stopPropagation(),
                        setIsCompilationsOpen(false)
                      )}
                      className="category-selector-header-btn"
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M10.4564 11.9975L14.7064 16.2574C15.0964 16.6483 15.0981 17.2838 14.71 17.6768L14.683 17.7042C14.2949 18.0972 13.6641 18.0988 13.274 17.7078L8.29417 12.7165C8.07416 12.496 7.97772 12.1977 8.00508 11.909C8.02321 11.6784 8.12008 11.4531 8.29557 11.2772L13.269 6.2923C13.6591 5.90132 14.2899 5.90294 14.6779 6.29591L14.705 6.32332C15.093 6.71629 15.0914 7.3518 14.7013 7.74277L10.4564 11.9975Z" fill="#444444"/>
                      </svg>
                    </button>
                    <Heading className="category-selector-title" level={4} label={t("Popular compilations")} />
                    <button onClick={handleClose} className="category-selector-header-btn">
                      <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M5.78497 5.2945C5.39445 5.68502 5.39077 6.32186 5.78129 6.71239L11.0689 12L11.069 12.0001L5.78138 17.2877C5.39086 17.6782 5.39454 18.3151 5.78506 18.7056C6.17559 19.0961 6.81243 19.0998 7.20295 18.7093L12.4906 13.4217L17.7782 18.7093C18.1687 19.0998 18.8055 19.0961 19.1961 18.7056C19.5866 18.3151 19.5903 17.6782 19.1997 17.2877L13.9121 12.0001L13.9122 12L19.1998 6.71239C19.5903 6.32186 19.5867 5.68502 19.1961 5.2945C18.8056 4.90397 18.1688 4.90029 17.7782 5.29082L12.4906 10.5785L12.4906 10.5785L12.4905 10.5785L7.20287 5.29082C6.81234 4.90029 6.1755 4.90397 5.78497 5.2945Z" fill="#808080"/>
                      </svg>
                    </button>
                  </div>
                  <div className="category-selector-links-wrapper">
                  <ul className={`category-selector-links ${compilations?.data.length > 8 ? "category-selector-links-columns" : ""}`}>
                      {compilations.data?.map((compilation) => (
                        <li key={compilation.id}>
                          <InternalLink 
                            className={categoryName === compilation.attributes.compilation ? "active" : ""} 
                            href={`/form/compilations/${compilation.attributes.urlReq}/?desktop=true${theme ? `&theme=${theme}` : ""}`} 
                            label={compilation.attributes.compilation} 
                          />
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              }
            </div>
          }
        </div>
      }
    </StyledCategorySelector>
  );
};

export default CategorySelector;