import React, { useState } from "react";
import { ReactSVG } from "react-svg";
import Box from "../box";
import Text from "../text";
import StyledSelector from "./syled-selector";

import MenuItem from "@components/screens/heading-content/menu/menu-item";
import Link from "next/link";

const CategorySelector = ({
  onChangeSelectTypeSort,
  typeSortData,
  t,
  locale,
  category,
  types,
}) => {
  const [isOpen, setIsOpen] = useState(false);

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
        <a
          className="arrow-link"
          href={`${locale === "en" ? "" : localeHREF}/`}
          style={{ textDecoration: "none" }}
        >
          <Text
            as="option"
            className="filter_selector-items"            
            label={t("View all templates")}
          />
        </a>
        <a
          className="arrow-link"
          style={{ textDecoration: "none" }}
        >
          <Text
           
            className="filter_selector-items"            
            label={t("Forms by branch")}
          />
          <Box className="item_arrow"></Box>
          
        </a>
        <a
          className="arrow-link"
          style={{ textDecoration: "none" }}
        >
          <Text
           
            className="filter_selector-items"            
            label={t("Forms by type")}
          />
          <Box className="item_arrow"></Box>
          
        </a>
        <a
          className="arrow-link"
          style={{ textDecoration: "none" }}
        >
          <Text
           
            className="filter_selector-items"            
            label={t("Popular Compilations")}
          />
          <Box className="item_arrow"></Box>
          
        </a>
      </Box>
        
          
        
              {/* {types.data?.map((type) => ( 
                <Link
                  key={type.id}                  
                  href={`${locale}/form/types/${type.attributes.urlReq}`}
                  className="filter_selector-items"
                >
                  {type.attributes.type}
                </Link>
              ))}
            <   */}
        
      
    </StyledSelector>
  );
};



export default CategorySelector;
