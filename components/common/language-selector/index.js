import StyledLanguageSelector from "./styled-language-selector";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import languages from "@config/languages.json";
import InternalLink from "@components/common/internal-link";

const LanguageSelector = ({ theme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const isDesktopClient = router.query.desktop === "true";
  const asPath = router.pathname === "/form-submit" || router.pathname === "/searchresult" ||
    router.pathname === "/pdf-form-templates" || router.pathname === "/document-templates" ||
    router.pathname === "/spreadsheet-templates" || router.pathname === "/presentation-templates" ? router.asPath : "/";

  const onCloseSelector = () => {
    if (isOpen === true) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isDesktopClient) {
      const handleClickOutside = (event) => {
        if (isOpen && !event.target.closest(".language-selector")) {
          setIsOpen(false);
        }
      };

      if (isOpen) {
        document.addEventListener("click", handleClickOutside);
      }

      return () => {
        document.removeEventListener("click", handleClickOutside);
      };
    }
  }, [isOpen, isDesktopClient]);

  return (
    <StyledLanguageSelector
      {...(!isDesktopClient && { onMouseEnter: () => setIsOpen(true), onMouseLeave: () => onCloseSelector() })}
      onClick={() => setIsOpen(!isOpen)}
      className={`language-selector ${isOpen ? "is-open" : ""} ${isDesktopClient ? "is-desktop-client" : ""}`}
      theme={theme}
    >
      <button className="language-button">
        <span className={`flag-image ${router.locale}`}></span>
        {isDesktopClient ?
          <svg className="chevron-down" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M11.4966 12.4016L8.31194 9.22434C8.01306 8.92615 7.52725 8.9249 7.22685 9.22155C6.92644 9.51821 6.92521 10.0004 7.22408 10.2986L10.9471 14.0131C11.1147 14.1803 11.3411 14.2541 11.5606 14.2344C11.738 14.2212 11.9117 14.1471 12.047 14.0121L15.7652 10.3025C16.064 10.0043 16.0628 9.52206 15.7624 9.2254C15.462 8.92875 14.9762 8.93 14.6773 9.22819L11.4966 12.4016Z" fill="black" fillOpacity="0.8"/>
          </svg>
        :
          <svg className="arrow-image" width="8" height="5" viewBox="0 0 8 5" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 5L0.535899 0.499999L7.4641 0.5L4 5Z" fill="#444444"/>
          </svg>
        }
      </button>

      {isOpen &&
        <ul className="language-list">
          {languages.map((language) => (
            <li className="language-item" key={language.key}>
              <InternalLink
                onClick={() => setIsOpen(false)}
                className={`language-link ${language.shortKey} ${isDesktopClient ? router.locale === language.shortKey ? "active" : "" : ""}`}
                href={isDesktopClient ? `/?desktop=true${theme ? `&theme=${theme}` : ""}` : asPath}
                locale={language.shortKey}
              >
              </InternalLink>
            </li>
          ))}
        </ul>
      }
    </StyledLanguageSelector>
  );
};

LanguageSelector.propTypes = {
  theme: PropTypes.string
};

export default LanguageSelector;