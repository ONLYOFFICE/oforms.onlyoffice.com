import StyledLanguageSelector from "./styled-language-selector";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import { ReactSVG } from "react-svg";
import languages from "@config/languages.json";
import InternalLink from "@common/internal-link";

const LanguageSelector = ({ theme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const selectorRef = useRef(null);
  const isDesktopClient = router.query.desktop === "true";

  const onCloseSelector = () => {
    if (isOpen === true) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isDesktopClient) {
      const handleClickOutside = (event) => {
        if (selectorRef.current && !selectorRef.current.contains(event.target)) {
          setIsOpen(false);
        }
      };

      document.addEventListener("click", handleClickOutside);

      return () => {
        document.removeEventListener("click", handleClickOutside);
      };
    }
  }, []);

  return (
    <StyledLanguageSelector
      {...(!isDesktopClient && { onMouseEnter: () => setIsOpen(true), onMouseLeave: () => onCloseSelector() })}
      onClick={() => setIsOpen(!isOpen)}
      ref={selectorRef}
      className={`language-selector ${isOpen ? "is-open" : ""} ${isDesktopClient ? "is-desktop-client" : ""}`}
      theme={theme}
    >
      <button className="language-button">
        <span className={`flag-image ${router.locale}`}></span>
        {isDesktopClient ?
          <ReactSVG className="chevron-down" src="/icons/chevron-down.svg" />
        :
          <ReactSVG className="arrow-image" src="/icons/arrow-down.svg" />
        }
      </button>

      {isOpen &&
        <ul className="language-list">
          {languages.map((language) => (
            <li className="language-item" key={language.key}>
              <InternalLink
                onClick={() => setIsOpen(false)}
                className={`language-link ${language.shortKey}`}
                href={isDesktopClient ? `/?desktop=true${theme ? `&theme=${theme}` : ""}` : "/"}
                locale={router.asPath === "/form-submit" ? `${language.shortKey === "en" ? "" : `${language.shortKey}/`}form-submit` : language.shortKey}
              >
              </InternalLink>
            </li>
          ))}
        </ul>
      }
    </StyledLanguageSelector>
  );
};

export default LanguageSelector;