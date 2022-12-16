import React, { useState, useEffect } from "react";
import { ReactSVG } from "react-svg";
import Box from "../box";
import Text from "../text";
import StyledSelector from "./styled-selector";

import MenuItem from "@components/screens/heading-content/menu/menu-item";
import Link from "next/link";
import MobileSelector from './mobileSelector';
import { isMobile } from 'react-device-detect';

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
  header,
  isDesktopClient,
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

  const [isWindowMobile, setIsWindowMobile] = useState(false);

  useEffect(() => {
    isMobile ? setIsWindowMobile(true) : setIsWindowMobile(false)
  }, []);

  const catHREF = category ? `form/${category}/` : "";
  const localeHREF = category ? `/${locale}` : locale;

  return isWindowMobile ?
    <MobileSelector 
      onChangeSelectTypeSort={onChangeSelectTypeSort}
      typeSortData={typeSortData}
      t={t}
      locale={locale}
      category={category}
      types={types}
      categories={categories}
      compilations={compilations}
    />
  :
    <StyledSelector
      isOpen={isOpen}
      onClick={onClickHandler}
      onMouseLeave={onCloseSelector}
      onMouseEnter={onClickHandler}>

      <Text className="filter-header" label={t("Categories")} />
      <ReactSVG className="arrow" src="https://static-oforms.teamlab.info/icons/popup-arrow.svg" />
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
        <MenuItem 
            heading={t("Forms by branch")} 
            className="filter_selector-items" 
            id="navitem_features"></MenuItem>
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
                href={`${locale === "en" ? "" : `/${localeHREF}`}/form/${categorie.attributes.urlReq}`}              
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
          <MenuItem 
            heading={t("Forms by type")} 
            className="filter_selector-items" 
            id="navitem_features">
          </MenuItem>
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
              href={`${locale === "en" ? "" : `/${localeHREF}`}/form/types/${type.attributes.urlReq}`}              
              className="submenu_link"
              style={{ textDecoration: "none" }}
            >
            <Text
              label={type.attributes.type}
              className="filter_selector-items" >
            </Text>                   
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
            <MenuItem 
              heading={t("Popular Compilations")} 
              className="filter_selector-items" 
              id="navitem_features">
            </MenuItem>  
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
              href={`${locale === "en" ? "" : `/${localeHREF}`}/form/compilations/${compilation.attributes.urlReq}`}              
              className="submenu_link"
              style={{ textDecoration: "none" }}
            >
            <Text
              label={compilation.attributes.compilation} 
              className="filter_selector-items" >
            </Text>             
            </a>
            
            ))}
          </Box>
        )}
      </Box>
    
    </StyledSelector>
};



export default CategorySelector;

