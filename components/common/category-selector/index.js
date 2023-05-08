import React, {useState, useEffect, useMemo} from "react";
import { useRouter } from "next/router";
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
  isDesktopClient,
  categoryName,
  queryDesktopClient
}) => {
 
  const [isOpen, setIsOpen] = useState(false);
  const [isCategorieOpen, setIsCategorieOpen] = useState(false);
  const [isTypeOpen, setIsTypeOpen] = useState(false);
  const [isCompilationsOpen, setIsCompilationsOpen] = useState(false);

  const router = useRouter();
  const theme = router.query.theme;
  const appTheme = useMemo(() => {
    if(theme && isDesktopClient) return theme
  }, [theme, isDesktopClient])

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

    <Text className="filter-header" label={isDesktopClient && categoryName ? t("Categoriess") : t("Categories")} />
    <Text className={categoryName || queryDesktopClient ? "filter-header-name" : ""} label={isDesktopClient && router.pathname === "/searchresult" ? `${t("Search results for")} '${queryDesktopClient}'` : categoryName} />

      {/*<img className="arrow" src="https://static-oforms.onlyoffice.com/icons/popup-arrow.svg"></img>*/}
      <svg className="arrow" xmlns="http://www.w3.org/2000/svg" width="22" height="23" viewBox="0 0 22 23" fill="none">
        <path fillRule="evenodd" clipRule="evenodd"
              d="M11.0022 12.915L7.10991 9.03167C6.74462 8.66721 6.15085 8.66569 5.78369 9.02826C5.41653 9.39084 5.41501 9.98021 5.78031 10.3447L10.3307 14.8846C10.5368 15.0903 10.8158 15.1804 11.0857 15.1546C11.3007 15.1375 11.511 15.047 11.6751 14.8833L16.2196 10.3493C16.5848 9.98482 16.5833 9.39545 16.2162 9.03288C15.849 8.6703 15.2552 8.67182 14.8899 9.03628L11.0022 12.915Z"
              fill="#444444"
        />
      </svg>
      <Box
        className="filter_selector"
        value={t(typeSortData)}
        onClick={onChangeSelectTypeSort}
      >
        {isDesktopClient ?
            <a
              className="arrow-link"    
              href={`${locale === "en" ? `/?desktop=true${appTheme !== undefined ? `&theme=${appTheme}` : ''}` : `${localeHREF}?desktop=true${appTheme !== undefined ? `&theme=${appTheme}` : ''}`}`}
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
              href={`${locale === "en" ? "" : `/${localeHREF}`}/form/${categorie.attributes.urlReq}?desktop=true${appTheme !== undefined ? `&theme=${appTheme}` : ''}`}
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
              href={`${locale === "en" ? "" : `/${localeHREF}`}/form/types/${type.attributes.urlReq}?desktop=true${appTheme !== undefined ? `&theme=${appTheme}` : ''}`}
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
                href={`${locale === "en" ? "" : `/${localeHREF}`}/form/compilations/${compilation.attributes.urlReq}?desktop=true${appTheme !== undefined ? `&theme=${appTheme}` : ''}`}
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

