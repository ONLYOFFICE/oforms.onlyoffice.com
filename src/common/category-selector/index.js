import StyledCategorySelector from "./styled-category-selector";
import { useState, useEffect } from "react";
import { ReactSVG } from "react-svg";
import InternalLink from "@common/internal-link";
import Heading from "@common/heading";
import { useRouter } from "next/router";

const CategorySelector = ({ t, locale, categories, types, compilations, isDesktopClient, isCategoryPage, categoryName, hideCategorySelector, theme }) => {
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
    if (isDesktopClient && window.innerWidth <= 1024) {
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
    if (isDesktopClient) {
      if (window.innerWidth >= 1024) {
        setIsOpenFunction(true);
      }
    } else {
      setIsOpenFunction(true);
    }
  };

  return (
    <StyledCategorySelector
      {...(!isDesktopClient && {onMouseEnter: () => setIsOpen(true)})}
      onMouseLeave={() => isDesktopClient && window.innerWidth >= 1024 && setIsOpen(false)}
      theme={theme}
      className={`category-selector ${isDesktopClient ? `desktop-client ${hideCategorySelector ? "hide-mobile" : ""}` : ""}`}
    >
      <div className="category-selector-heading">
        <Heading 
          onClick={() => setIsOpen(!isOpen)}
          className={`category-selector-title ${isOpen ? "open" : ""} ${isCategoryPage ? "desktop-category-page" : ""}`}
          level={4}
        >
          {t("Categories")}{isDesktopClient ? locale === "fr" ? " :" : locale === "ja" ? "：" : locale === "zh" ? ": " : ":" : ""}
          <ReactSVG src="/icons/chevron-down.react.svg" />
        </Heading>
        {isCategoryPage &&
          <>
            <div onClick={() => setIsOpen(!isOpen)} className="category-selector-name">{categoryName}</div>
            <button onClick={() => router.push("/?desktop=true")} className="category-selector-btn">
              <ReactSVG src="/icons/cross-small.svg" />
            </button>
          </>
        }
      </div>

      {isOpen &&
        <div className={`category-selector-dropdown ${isCategoryOpen === true || isTypeOpen === true || isCompilationsOpen === true ? "active" : ""}`}>
          <div className="category-selector-header">
            <Heading className="category-selector-title" level={4} label={t("Categories")} />
            <button onClick={handleClose} className="category-selector-header-btn">
              <ReactSVG src="/icons/cross.svg" />
            </button>
          </div>
          <div>
            <InternalLink
              onClick={() => setIsOpen(false)}
              className="category-selector-item"
              href={isDesktopClient ? `/?desktop=true${theme ? `&theme=${theme}` : ""}` : "/"}
              label={t("View all templates")}
            />
          </div>
          {categories.data.length > 0 &&
            <div onMouseEnter={() => menuOnMouseEnter(setIsCategoryOpen)} onMouseLeave={() => isDesktopClient && window.innerWidth >= 1024 && setIsCategoryOpen(false)}>
              <Heading
                onClick={() => (isDesktopClient && window.innerWidth < 1024) && setIsCategoryOpen(true)}
                level={5}
                className="category-selector-item"
              >
                {t("Forms by branch")}
                <ReactSVG src="/icons/arrow-right.svg" />
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
                      <ReactSVG src="/icons/arrow-left.react.svg" />
                    </button>
                    <Heading className="category-selector-title" level={4} label={t("Forms by branch")} />
                    <button onClick={handleClose} className="category-selector-header-btn">
                      <ReactSVG src="/icons/cross.svg" />
                    </button>
                  </div>
                  <div className="category-selector-links-wrapper">
                    <ul className="category-selector-links">
                      {categories.data?.map((categorie) => (
                        <li key={categorie.id}>
                          <InternalLink
                            className={categoryName === categorie.attributes.categorie ? "active" : ""}
                            href={isDesktopClient ? `/form/${categorie.attributes.urlReq}/?desktop=true${theme ? `&theme=${theme}` : ""}` : `/form/${categorie.attributes.urlReq}`}
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
          {types.data.length > 0 &&
            <div onMouseEnter={() => menuOnMouseEnter(setIsTypeOpen)} onMouseLeave={() => isDesktopClient && window.innerWidth >= 1024 && setIsTypeOpen(false)}>
              <Heading 
                onClick={() => (isDesktopClient && window.innerWidth < 1024) && setIsTypeOpen(true)} 
                level={5} 
                className="category-selector-item"
              >
                {t("Forms by type")}
                <ReactSVG src="/icons/arrow-right.svg" />
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
                      <ReactSVG src="/icons/arrow-left.react.svg" />
                    </button>
                    <Heading className="category-selector-title" level={4} label={t("Forms by type")} />
                    <button onClick={handleClose} className="category-selector-header-btn">
                      <ReactSVG src="/icons/cross.svg" />
                    </button>
                  </div>
                  <div className="category-selector-links-wrapper">
                    <ul className="category-selector-links">
                      {types.data?.map((type) => (
                        <li key={type.id}>
                          <InternalLink 
                            className={categoryName === type.attributes.type ? "active" : ""} 
                            href={isDesktopClient ? `/form/types/${type.attributes.urlReq}/?desktop=true${theme ? `&theme=${theme}` : ""}` : `/form/types/${type.attributes.urlReq}`} 
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
          {compilations.data.length > 0 &&
            <div onMouseEnter={() => menuOnMouseEnter(setIsCompilationsOpen)} onMouseLeave={() => isDesktopClient && window.innerWidth >= 1024 && setIsCompilationsOpen(false)}>
              <Heading
                onClick={() => (isDesktopClient && window.innerWidth < 1024) && setIsCompilationsOpen(true)}
                level={5}
                className="category-selector-item"
              >
                {t("Popular Compilations")}
                <ReactSVG src="/icons/arrow-right.svg" />
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
                      <ReactSVG src="/icons/arrow-left.react.svg" />
                    </button>
                    <Heading className="category-selector-title" level={4} label={t("Popular Compilations")} />
                    <button onClick={handleClose} className="category-selector-header-btn">
                      <ReactSVG src="/icons/cross.svg" />
                    </button>
                  </div>
                  <div className="category-selector-links-wrapper">
                    <ul className="category-selector-links">
                      {compilations.data?.map((compilation) => (
                        <li key={compilation.id}>
                          <InternalLink 
                            className={categoryName === compilation.attributes.compilation ? "active" : ""} 
                            href={isDesktopClient ? `/form/compilations/${compilation.attributes.urlReq}/?desktop=true${theme ? `&theme=${theme}` : ""}` : `/form/compilations/${compilation.attributes.urlReq}`} 
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