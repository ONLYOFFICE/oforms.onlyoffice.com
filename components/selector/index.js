import React from "react";
import PropTypes from "prop-types";
import Text from "../text";
import StyledSelector from "./syled-selector"




const Selector = () => {
    return (
      <StyledSelector>        
        <Text label={"Sort by: "} color={"#808080"} fontSize={"13px"}  fontWeight={"600"} textTransform={"uppercase"} />     
        <Text label={"Sort by: "} color={"#333333"} fontSize={"14px"}  fontWeight={"600"}  margin={"0px 0px 0px 8px"} cursor={"pointer"} />
            
                          
      </StyledSelector>
    );
  };

  export default Selector;