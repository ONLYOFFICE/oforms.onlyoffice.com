import React, { useState } from "react";
import { ReactSVG } from "react-svg";
import Box from "../box";
import Text from "../text";
import StyledSelector from "./syled-selector";

const CategorySelector = ({
  onChangeSelectTypeSort,
  typeSortData,
  t,
  locale,
  category,
  types,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  console.log(types.data[0].attributes.type);
  console.log(locale);

  const onClickHandler = () => {
    setIsOpen(true);
  };

  const onCloseSelector = () => {
    setIsOpen(false);
  };

  const catHREF = category ? `form/${category}/` : "";
  const localeHREF = category ? `/${locale}` : locale;
  return (
    <StyledSelector
      isOpen={isOpen}
      onClick={onClickHandler}
      onMouseLeave={onCloseSelector}    >
      
      <Text className="filter-header" label={t("Categories")} />
      <ReactSVG className="arrow" src="/icons/popup-arrow.react.svg" />
      <Box
        className="filter_selector"
        value={t(typeSortData)}
        onClick={onChangeSelectTypeSort}
      >        
        <Text            
            className="filter_selector-items"            
            label={t("View all templates")}
        />    

        <Box>
          <Text            
              className="filter_selector-items"            
              label={t("Forms by branch")}
          />
          <ReactSVG className="arrow" src="/icons/popup-arrow.react.svg" />
        </Box>
        
        <Text            
            className="filter_selector-items"            
            label={t("Forms by type")}
        />
        
        <Text            
            className="filter_selector-items"            
            label={t("Popular Compilations")}
        />
        {/* <a
          href={`${locale === "en" ? "" : localeHREF}/${catHREF}?_sort=asc`}
          style={{ textDecoration: "none" }}
        >
          <Text            
            className="filter_selector-items"            
            label={t("NameA-Z")}
          />
        </a>
        <a
          href={`${locale === "en" ? "" : localeHREF}/${catHREF}?_sort=desc`}
          style={{ textDecoration: "none" }}
        >
          <Text
            as="option"
            className="filter_selector-items"
            value={t("NameZ-A")}
            label={t("NameZ-A")}
          />
        </a> */}
      </Box>
    </StyledSelector>
  );
};



export default CategorySelector;
