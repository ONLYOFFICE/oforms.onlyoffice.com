import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Text from "../text";
import StyledSelector from "./syled-selector"
import Box from "../box"
import SVG from "../../static/icons/popup-arrow.react.svg"


const Selector = (props) => {  
  const [isOpen, setIsOpen] = useState(false);
  const [isNew, setIsNew] = useState('Newest - Oldest');

  useEffect(() => {
    typeof window !== "undefined" &&
      !isOpen &&
      window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);      
    };
  });

  const handleClickOutside = (e) => {
    if (
      !isOpen &&
      (!e.target.closest(".filter_selector") )
    ) {
      onCloseSelector();
    }
  };

  const onClickHandler = (e) => {
    e.stopPropagation();
    if (e.target.closest(".filter-header") || e.target.closest(".arrow")) {      
      onCloseSelector();      
    } 
    if (e.target.closest(".oldest")) {
      setIsNew("Oldest - Newes");  
      onCloseSelector();        
    }
    if (e.target.closest(".newest")) {
      setIsNew("Newest - Oldest"); 
      onCloseSelector();        
    }
  };
  

  const onCloseSelector = () => {
    setIsOpen(!isOpen);
  };
 

  return (
    <StyledSelector
    isOpen={isOpen}    
    {...props}    
    onClick={onClickHandler}
    >        
      <Text label={"Sort by: "} color={"#808080"} fontSize={"13px"}  fontWeight={"600"} textTransform={"uppercase"} />     
      <Text label={isNew} color={"#333333"} fontSize={"14px"}  fontWeight={"600"}  margin={"0px 0px 0px 8px"} cursor={"pointer"} className={"filter-header"} />
      <Box className={"arrow "}>
        <SVG />
      </Box>  
      <Box className={"filter_selector "}>
        <Box className={"newest "} >Newest - Oldest</Box>
        <Box className={"oldest "}>Oldest - Newes</Box>          
      </Box>         
                        
    </StyledSelector>
  );
};

  export default Selector;