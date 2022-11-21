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
  categories,
  compilations,
  isCategoryPage,
  header
}) => {
 
  const [isOpen, setIsOpen] = useState(false);
  const [isCategorieOpen, setIsCategorieOpen] = useState(false);
  const [isTypeOpen, setIsTypeOpen] = useState(false);
  const [isCompilationsOpen, setIsCompilationsOpen] = useState(false);

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
      onMouseLeave={onCloseSelector}
      onMouseEnter={onClickHandler}    >
      {isCategoryPage ? (
        <>
          <Text className="filter-header" label={t("Categories") + ":"} />
          <Text className="filter-title" label={header} />
        </>
      ) :(
        <Text className="filter-header" label={t("Categories")} />
      )}

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
            className="filter_selector-items-header"            
            label={t("View all templates")}
          />
        </a>
        <a
          onMouseEnter={() => setIsCategorieOpen(true)}
          onMouseLeave={() => setIsCategorieOpen(false)}
          className="arrow-link"
          style={{ textDecoration: "none" }}
        >
          <Text
            className="filter_selector-items"            
            label={t("Forms by branch")}
          />
          <Box className="item_arrow"></Box>
          
        </a>
        {isCategorieOpen && categories.data?.length > 0 && (
          <Box 
          className="types_list"
          onMouseEnter={() => setIsCategorieOpen(true)}
          onMouseLeave={() => setIsCategorieOpen(false)}
          >
            {categories.data?.map((categorie) => ( 
              <a
                key={categorie.id}
                href={`${locale === "en" ? "" : localeHREF}/form/${categorie.attributes.urlReq}`}              
                className="submenu_link"
                style={{ textDecoration: "none" }}
              >
              <Text
               
                className="filter_selector-items"            
                label={categorie.attributes.categorie}
              />                   
            </a>
             
            ))}
          </Box>
        )}
        <a
          onMouseEnter={() => setIsTypeOpen(true)}
          onMouseLeave={() => setIsTypeOpen(false)}
          className="arrow-link"
          style={{ textDecoration: "none" }}
        >
          <Text
           
            className="filter_selector-items"            
            label={t("Forms by type")}
          />
          <Box className="item_arrow"></Box>          
        </a>
        {isTypeOpen && types.data?.length > 0 && (
          <Box 
          className="types_list"
          onMouseEnter={() => setIsTypeOpen(true)}
          onMouseLeave={() => setIsTypeOpen(false)}
          >
            {types.data?.map((type) => ( 
              <a
              key={type.id}
              href={`${locale === "en" ? "" : localeHREF}/form/types/${type.attributes.urlReq}`}              
              className="submenu_link"
              style={{ textDecoration: "none" }}
            >
              <Text
               
                className="filter_selector-items"            
                label={type.attributes.type}
              />                   
            </a>
             
            ))}
          </Box>
        )}
        
        <a
         onMouseEnter={() => setIsCompilationsOpen(true)}
         onMouseLeave={() => setIsCompilationsOpen(false)}
          className="arrow-link"
          style={{ textDecoration: "none" }}
        >
          <Text
           
            className="filter_selector-items"            
            label={t("Popular Compilations")}
          />
          <Box className="item_arrow"></Box>
          
        </a>
        {isCompilationsOpen && compilations.data?.length > 0 && (
          <Box 
          className="types_list"
          onMouseEnter={() => setIsCompilationsOpen(true)}
          onMouseLeave={() => setIsCompilationsOpen(false)}
          >
            {compilations.data?.map((compilation) => ( 
              <a
              key={compilation.id}
              href={`${locale === "en" ? "" : localeHREF}/form/compilations/${compilation.attributes.urlReq}`}              
              className="submenu_link"
              style={{ textDecoration: "none" }}
            >
              <Text
               
                className="filter_selector-items"            
                label={compilation.attributes.compilation}
              />                   
            </a>
             
            ))}
          </Box>
        )}
      </Box>
    
    </StyledSelector>
  );
};



export default CategorySelector;


