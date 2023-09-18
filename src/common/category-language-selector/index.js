import { LanguageSelectorDropdown, LanguageSelectorHeader, LanguageSelectorLink, LanguageSelectorStyled } from "./styled-category-language-selector";
import { useEffect, useState } from "react";
import axios from "axios";
import { Flag } from "@icons/flags";
import { ChevronDown } from "@icons";
import languages from "@config/languages.json";
import classNames from "classnames";

export const CategoryLanguageSelector = ({ setCategoriesData, setTypesData, setCompilationsData, categorieKey, setCategorieKey, setCategoriesMenuName, fetchFormsData }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleLangClick = (locale) => {
    setCategorieKey(locale);
    fetchFormsData(locale);
    fetchCategoriesData(locale);
  };

  const fetchCategoriesData = async (locale) => {
    try {
      const response = await axios.post("/api/categories-menu", {
        "locale": locale
      });

      setCategoriesData(response.data.categories);
      setTypesData(response.data.types);
      setCompilationsData(response.data.compilations);
      setCategoriesMenuName({
        formsBranch: response.data.menu.data[0]?.attributes.name,
        formsType: response.data.menu.data[1]?.attributes.name,
        formsCompilations: response.data.menu.data[2]?.attributes.name,
      });
    } catch (error) {
      console.error(error);
    };
  };

  const handleClick = (e) => {
    if (!e.target.closest('.lang-selector__header')) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener('click', handleClick);

    return () => window.removeEventListener('click', handleClick);
  }, []);

  return (
    <LanguageSelectorStyled
      onClick={handleClick}
      className={classNames('lang-selector', { 'open': isOpen })}
      isOpen={isOpen}
    >
      <LanguageSelectorHeader onClick={() => setIsOpen(prev => !prev)} className="lang-selector__header">
        <Flag locale={categorieKey} size={24} className="lang-selector__flag" />
        <ChevronDown size={24} className="lang-selector__icon" />
      </LanguageSelectorHeader>
      <LanguageSelectorDropdown className="lang-selector__dropdown">
        {
          languages.map(lang => (
            <LanguageSelectorLink
              onClick={() => handleLangClick(lang.shortKey)}
              key={lang.key}
              className={classNames('lang-selector__link', { 'active': lang.shortKey === categorieKey })}
            >
              <Flag locale={lang.shortKey} size={24} />
            </LanguageSelectorLink>
          ))
        }
      </LanguageSelectorDropdown>
    </LanguageSelectorStyled>
  );
};

export default CategoryLanguageSelector;