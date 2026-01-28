import StyledCategorySelector from "../category-selector/styled-category-selector";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import InternalLink from "@components/common/internal-link";

const EditorSelector = ({ t, locale }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    handleClose(false);
  }, [router]);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <StyledCategorySelector
      onMouseEnter={() => window.innerWidth > 1024 && setIsOpen(true)}
      onMouseLeave={() => window.innerWidth > 1024 && setIsOpen(false)}
      className={`category-selector editor ${locale} ${router.pathname === "/document-templates" ||
        router.pathname === "/pdf-form-templates" ||
        router.pathname === "/spreadsheet-templates" ||
        router.pathname === "/presentation-templates" ? "active" : ""}`}
      $locale={locale}
    >
      <div className="category-selector-heading">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`category-selector-title ${isOpen ? "open" : ""}`}
          type="button"
        >
          {t("Editor")}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M12.0025 13.5436L7.74265 9.29363C7.35168 8.90355 6.71617 8.90192 6.32319 9.28998L6.29579 9.31705C5.90282 9.70511 5.9012 10.3359 6.29217 10.726L11.2835 15.7058C11.504 15.9258 11.8023 16.0223 12.091 15.9949C12.3216 15.9768 12.5469 15.8799 12.7228 15.7044L17.7077 10.731C18.0987 10.3409 18.0971 9.71014 17.7041 9.32208L17.6767 9.29502C17.2837 8.90696 16.6482 8.90859 16.2572 9.29866L12.0025 13.5436Z" fill="#aaaaaa" />
          </svg>
        </button>
      </div>

      {isOpen &&
        <div className={`category-selector-dropdown`}>
          <div className="category-selector-header">
            <div className="category-selector-title">{t("Editor")}</div>
            <button onClick={handleClose} className="category-selector-header-btn" type="button">
              <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M5.78497 5.2945C5.39445 5.68502 5.39077 6.32186 5.78129 6.71239L11.0689 12L11.069 12.0001L5.78138 17.2877C5.39086 17.6782 5.39454 18.3151 5.78506 18.7056C6.17559 19.0961 6.81243 19.0998 7.20295 18.7093L12.4906 13.4217L17.7782 18.7093C18.1687 19.0998 18.8055 19.0961 19.1961 18.7056C19.5866 18.3151 19.5903 17.6782 19.1997 17.2877L13.9121 12.0001L13.9122 12L19.1998 6.71239C19.5903 6.32186 19.5867 5.68502 19.1961 5.2945C18.8056 4.90397 18.1688 4.90029 17.7782 5.29082L12.4906 10.5785L12.4906 10.5785L12.4905 10.5785L7.20287 5.29082C6.81234 4.90029 6.1755 4.90397 5.78497 5.2945Z" fill="#808080" />
              </svg>
            </button>
          </div>
          <div>
            <InternalLink
              className={`category-selector-item ${router.pathname === "/pdf-form-templates" ? "active" : ""}`}
              href={`/pdf-form-templates${router.query._sort ? `?_sort=${router.query._sort}` : ""}`}
              label={t("Form")}
              id="category-nav-pdf-form-link"
            />
          </div>
          <div>
            <InternalLink
              className={`category-selector-item ${router.pathname === "/document-templates" ? "active" : ""}`}
              href={`/document-templates${router.query._sort ? `?_sort=${router.query._sort}` : ""}`}
              label={t("Document")}
              id="category-nav-document-link"
            />
          </div>
          <div>
            <InternalLink
              className={`category-selector-item ${router.pathname === "/spreadsheet-templates" ? "active" : ""}`}
              href={`/spreadsheet-templates${router.query._sort ? `?_sort=${router.query._sort}` : ""}`}
              label={t("Spreadsheet")}
              id="category-nav-spreadsheet-link"
            />
          </div>
          <div>
            <InternalLink
              className={`category-selector-item ${router.pathname === "/presentation-templates" ? "active" : ""}`}
              href={`/presentation-templates${router.query._sort ? `?_sort=${router.query._sort}` : ""}`}
              label={t("Presentation")}
              id="category-nav-presentation-link"
            />
          </div>
        </div>
      }
    </StyledCategorySelector>
  );
};

export default EditorSelector;