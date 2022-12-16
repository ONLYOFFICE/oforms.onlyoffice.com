import React, { useState, useEffect } from "react";
import { ReactSVG } from "react-svg";
import Box from "../box";
import Text from "../text";

import MenuItem from "@components/screens/heading-content/menu/menu-item";
import Link from "next/link";
import { isMobile } from '../../utils/devices'
import styled from "styled-components";

const StyledSelectorMobile = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: end;
  align-items: baseline;
  position: relative;

  .filter-header {
    color: #333333;
    font-size: 18px;
    font-weight: 700;
    margin: 0 0 0 8px;
    cursor: pointer;
  }

  .filter-header-popup {
    color: #333333;
    font-size: 16px;
    font-weight: 700;
    padding-bottom: 10px;
    margin: -7px 0px 0 16px;
  }

  .arrow {
    margin-left: 14px;
    cursor: pointer;
  }

  .heading-nav-item {
    padding: 0;
    font-size: 13px;
    cursor: pointer;
    white-space: nowrap;
    display: block;
    text-transform: uppercase;
    font-weight: 600;
    letter-spacing: 0.04em;
    color: #444;
  }

  .filter_selector_mobile {
    display: block;
    position: absolute;
    min-width: 291px;
    z-index: 99;
    left: -26px;
    top: 10px;
    padding-top: 14px;
    background-color: #fff;
    border-radius: 0px;
    padding: 24px 0;
    box-shadow: 0px 7px 25px rgb(85 85 85 / 15%);
  }

  .filter_selector-items {
    font-size: 13px;
    cursor: pointer;
    white-space: nowrap;
    display: block;
    text-transform: uppercase;
    font-weight: 600;
    letter-spacing: 0.04em;
    color: #444;
  }

  .filter_selector-items-header {
    font-size: 16px;
    font-weight: 600;
    text-transform: capitalize;
  }

  .arrow-link{
    display:flex;
    align-items: center;
    justify-content: space-between;
    background-color: #fff;
    padding: 15px 32px;
      .item_arrow{
        background-image: url('https://static-oforms.teamlab.info/icons/arrow-right.react.svg');
        width: 24px;
        height: 24px
      }
      &:hover{
        background-color: #f5f5f5;
        color: #ff6f3d;

        &:first-child {
          background-color: #fff;
        } 

        & span{
          color: #ff6f3d;
        }
        & .item_arrow{
          background-image: url('https://static-oforms.teamlab.info/icons/arrow-right-red.react.svg');
        }
      }   
  }

  .filter_selector-items:hover {
    color: #ff6f3d;
  }

  .item_selector{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px 40px;       
  }

  .item_selector_text{
    color: #000;
    text-decoration: none;
    cursor: pointer;
  }

  .types_list_mobile {
    display: grid;
    min-width: 400px;
    grid-template-columns: 1fr 1fr;
    gap: 0px;
    position: absolute; 
    z-index: 99;
    left: 290px;
    top: 0px;
    padding: 75px 0 15px;
    background-color: #fff;
    border-radius: 0px;    
    box-shadow: 0px 7px 25px rgb(85 85 85 / 15%);
  }

  .submenu_link{
    display:flex;
    align-items: center;
    justify-content: space-between;
    background-color: #fff;
    padding: 15px 32px;

    span {
      text-transform: capitalize;
      font-size: 16px;
      font-weight: 400;
    }

      .item_arrow {
        background-image: url('https://static-oforms.teamlab.info/icons/arrow-right.react.svg');
        width: 24px;
        height: 24px;
      }

      &:hover {
        color: #ff6f3d;

        & span {
          color: #ff6f3d;
        }        
      } 
    }

@media (max-width: 1180px) {  

  .heading-nav-item:before {
    right: 0;
    top: 3px;
  }

  .filter_selector-items {
    width: 100%;
  }

  .item_arrow {
    display: none;
  }

  .closeSelector {
    padding-right: 25px;
    position: relative;
    z-index: 6;
    margin-top: -10px;
    filter: brightness(0.5);
    position: absolute;
    right: 0;
  }

  .mobile-heading-nav-item {
    position: relative;
    z-index: 2;
    font-size: 16px;
    font-weight: 600;
    letter-spacing: 0.04em;
    padding: 32px 16px;
    line-height: 133%;
  }

  .types_list {
    grid-template-columns: 1fr;
    max-width: 100vw;
    max-height: 100vh;
  }

  .types_list_mobile {
    grid-template-columns: 1fr;
    max-width: 100vw;
    max-height: 100vh;
  }

  .filter_selector {
    position: fixed;
    min-width: 100vw;
    z-index: 1000;
    top: 0;
    left: 0;
    min-height: 100vh;
  }

  .filter_selector_mobile {
    position: fixed;
    min-width: 100vw;
    z-index: 1000;
    top: 0;
    left: 0;
    min-height: 100vh;
  }

  .types_list_mobile {
    box-sizing: border-box;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    box-shadow: none;
    max-height: 100vh;
    overflow-y: auto;
    z-index: 1;
  }

  .submenu_link span {
    font-size: 16px;
  }

  .mobile-heading-nav-item {
    padding: 7px 0 15px;
    width: 100%;
    text-align: center;
    text-transform: uppercase;
    color: #FF6F3D;
    border-bottom: 1px solid #F2F2F2;

    &:before {
      content: "";
      background-image: url('https://static-oforms.teamlab.info/icons/arrow-right.react.svg');
      transform: rotate(180deg);
      width: 24px;
      height: 24px;
      position: absolute;
      left: 0;
      padding-left: 15px;
      background-repeat: no-repeat;
    }
  }
}

  @media (max-width: 600px) {
  .filter-header {
    font-size: 14px;
  }

  #mob-box-doc-categories {
    position: absolute;
    width: auto;
    display: block;
    left: 0;
  }

  .box-doc-info-template {
    display: block;
  }

  .box-doc-categories {
    display: block !important;
    width: 100%;
    right: 0;
    text-align: right;
    position: relative;
  }
}
`

const MobileSelector = ({
  onChangeSelectTypeSort,
  typeSortData,
  t,
  locale,
  category,
  types,
  categories,
  compilations
}) => {
 
  const [isOpen, setIsOpen] = useState(false);
  const [isCategorieOpen, setIsCategorieOpen] = useState(false);
  const [isTypeOpen, setIsTypeOpen] = useState(false);
  const [isCompilationsOpen, setIsCompilationsOpen] = useState(false);


  useEffect(() => {
    
  }, [isOpen])

  const onClickHandler = () => {
    setIsOpen(true);
    document.body.style.overflow = "hidden";
  };

  const onCloseSelector = (e) => {
    setIsOpen(false);
    document.body.style.overflow = "";
    if (isCategorieOpen) setIsCategorieOpen(false)
    if (isTypeOpen) setIsTypeOpen(false)
    if (isCompilationsOpen) setIsCompilationsOpen(false);
    e.stopPropagation();
  };

  const toggleCategories = () => {
    setIsCategorieOpen(!isCategorieOpen)
  }

  const toggleType = () => {
    setIsTypeOpen(!isTypeOpen)
  }

  const toggleCompilations = () => {
    setIsCompilationsOpen(!isCompilationsOpen)
  }


  const catHREF = category ? `form/${category}/` : "";
  const localeHREF = category ? `/${locale}` : locale;

  return (
    <StyledSelectorMobile
      onClick={onClickHandler}
    >
        <Text className="filter-header" label={t("Categories")} />
        <ReactSVG className="arrow" src="https://static-oforms.teamlab.info/icons/popup-arrow.react.svg" />
        {isOpen && 
        <Box
          className="filter_selector_mobile"
          value={t(typeSortData)}
        >
            <ReactSVG src="https://static-oforms.teamlab.info/icons/close-icon.react.svg" className="closeSelector" onClick={onCloseSelector} />
            <Text className="filter-header-popup" label={t("Categories")} />
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
                onClick={toggleCategories}
                className="arrow-link"
                style={{ textDecoration: "none" }}
            >
                <MenuItem 
                    heading={t("Forms by branch")} 
                    className="filter_selector-items" 
                    id="navitem_features" 
                />
                <Box className="item_arrow"></Box>
          </a>
          {isCategorieOpen && categories.data?.length > 0 && (
            <Box 
                className="types_list_mobile"
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
            onClick={toggleType}
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
            className="types_list_mobile"
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
                label={type.attributes.type}
                className="filter_selector-items" >
              </Text>                   
              </a>
               
              ))}
            </Box>
          )}
          
          <a
            onClick={toggleCompilations}
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
            className="types_list_mobile"
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
                label={compilation.attributes.compilation} 
                className="filter_selector-items" >
              </Text>             
              </a>
               
              ))}
            </Box>
          )}
        </Box>
    }
    
    </StyledSelectorMobile>
  );
};



export default MobileSelector;


