import { useEffect, useState } from "react";
import StyledLanguageSelector from "./styled-language-selector";
import ItemsList from "./items-list";
import {useRouter} from "next/router";

const LanguageSelector = ({ t, onClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const locale = router.locale

  useEffect(() => {
    typeof window !== "undefined" &&
      isOpen &&
      window.addEventListener("click", handleClickOutside);
    window.addEventListener("resize", resizeHandler);

    return () => {
      window.removeEventListener("click", handleClickOutside);
      window.removeEventListener("resize", resizeHandler);
    };
  });

  const handleClickOutside = (e) => {
    if (
      isOpen &&
      (!e.target.closest(".lng-selector") ||
        e.target.closest(".close-button-img"))
    ) {
      onCloseSelector();
    }
  };

  const resizeHandler = (e) => {
    if (window.innerWidth < 769) {
      setIsOpen(false);
    }
  };

  const onClickHandler = (e) => {
    e.stopPropagation();
    if (e.target.closest(".flag-image") || e.target.closest(".arrow-image")) {
      setIsOpen(!isOpen);
      onClick && onClick(e);
    }
  };

  const onCloseSelector = () => {
    setIsOpen(false);
  };

  const srcArrow = isOpen
    ? "https://static-oforms.onlyoffice.com/icons/arrow-drop-up.svg"
    : "https://static-oforms.onlyoffice.com/icons/arrow-drop-down.svg";
  const srcAlt = isOpen ? "arrow-up" : "arrow-down";

  return (
    <StyledLanguageSelector
      onClick={onClickHandler}
      className="language-selector"
    >
      <img
        className="flag-image"
        alt="flag"
        src={`https://static-oforms.onlyoffice.com/images/flags/${locale}.svg`}
        width="18px"
        height="18px"
      />
      {/*eslint-disable*/}
      <div className="arrow-image">
        <img src={srcArrow} alt={srcAlt} />
      </div>
      {/*eslint-enable*/}
      <ItemsList
        className={`languages-list lng-selector ${
          isOpen ? "language-selector-open" : "language-selector-closed"
        }`}
        t={t}
        isOpen={isOpen}
        onCloseSelector={onCloseSelector}
      />
    </StyledLanguageSelector>
  );
};

export default LanguageSelector;
