import React, { useState, useEffect } from "react";
import Box from "../box";
import Text from "../text";
import StyledSelector from "./styled-selector";

import MenuItem from "@components/screens/heading-content/menu/menu-item";
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
  categoryName,
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

    <Text className="filter-header" label={isDesktopClient ? t("Categoriess") : t("Categories")} />
    <Text className="filter-header-name" label={categoryName} />

      <img className="arrow" src="https://static-oforms.teamlab.info/icons/popup-arrow.svg"></img>
      <Box
        className="filter_selector"
        value={t(typeSortData)}
        onClick={onChangeSelectTypeSort}
      >
        {isDesktopClient ?
            <a
              className="arrow-link"    
              href={`${locale === "en" ? "/?desktop=true" : `${localeHREF}?desktop=true`}`}                   
              style={{ textDecoration: "none" }}
            >
            <Text           
              className="filter_selector-items-header"            
              label={t("View all templates")}
            />
            </a>
              :
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
        }

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
           isDesktopClient ?
            <a
              key={categorie.id}  
              href={`${locale === "en" ? "" : `/${localeHREF}`}/form/${categorie.attributes.urlReq}?desktop=true`}
              className="submenu_link"
              style={{ textDecoration: "none" }}
            >
            <Text
                className="filter_selector-items"            
                label={categorie.attributes.categorie}
              />  
            </a>
            :
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
              isDesktopClient ?
              <a
              key={type.id}
              href={`${locale === "en" ? "" : `/${localeHREF}`}/form/types/${type.attributes.urlReq}?desktop=true`}              
              className="submenu_link"
              style={{ textDecoration: "none" }}
            >
            <Text
              label={type.attributes.type}
              className="filter_selector-items" >
            </Text>                   
            </a>
            :
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
              isDesktopClient ?
              <a
                key={compilation.id}
                href={`${locale === "en" ? "" : `/${localeHREF}`}/form/compilations/${compilation.attributes.urlReq}?desktop=true`}         
                className="submenu_link"
                style={{ textDecoration: "none" }}
            >
            <Text
              label={compilation.attributes.compilation} 
              className="filter_selector-items" >
            </Text>             
            </a>
            :
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

