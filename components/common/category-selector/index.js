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



  console.log(types.data);
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
        <MenuItem heading={t("View all templates")} id="view_all_templates"></MenuItem>
        <MenuItem heading={t("Forms by branch")} id="navitem_features"></MenuItem>
        <MenuItem heading={t("Forms by type")} id="navitem_features">
          <Box className="menu_wrapper">
            <Box className="outer-box with_border">
              {types.data?.map((type) => ( 
                <Link
                  key={type.id}                  
                  href={`${locale}/form/types/${type.attributes.urlReq}`}
                  className="filter_selector-items"
                >
                  {type.attributes.type}
                </Link>
              ))}
            </Box>
          </Box>
        </MenuItem>
        <MenuItem heading={t("Popular Compilations")} id="navitem_features"></MenuItem>        
        
      </Box>
    </StyledSelector>
  );
};



export default CategorySelector;
