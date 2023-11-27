import StyledLanguageSelector from "./languageSelector.styled";
import { useState } from "react";
import { useRouter } from "next/router";
import { ReactSVG } from "react-svg";
import languages from "@config/languages.json";
import InternalLink from "@common/internal-link";
import { ChevronDown } from "@icons";

const LanguageSelector = ({ locale }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const isDesktopClient = router.query.desktop === "true";

  const onCloseSelector = () => {
    if (isOpen === true) {
      setIsOpen(false);
    }
  };

  return (
    <StyledLanguageSelector
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => onCloseSelector()}
      onClick={() => setIsOpen(!isOpen)}
      className={`language-selector ${isOpen ? "is-open" : ""}`}
    >
      <button className="language-button">
        <span className={`flag-image ${locale}`}></span>
        {isDesktopClient ?
          <ChevronDown size={24} />
          :
          <ReactSVG className="arrow-image" src="/icons/arrow-down.svg" />
        }
      </button>

      {isOpen &&
        <ul className="language-list">
          {languages.map((language) => (
            <li className="language-item" key={language.key}>
              <InternalLink onClick={() => setIsOpen(false)} className={`language-link ${language.shortKey}`} href="/" locale={router.asPath === "/form-submit" ? `${language.shortKey === "en" ? "" : `${language.shortKey}/`}form-submit` : language.shortKey}></InternalLink>
            </li>
          ))}
        </ul>
      }
    </StyledLanguageSelector>
  );
};

export default LanguageSelector;