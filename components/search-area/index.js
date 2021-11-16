import React from "react";
import PropTypes from "prop-types";
import StyledSearchArea from "./styled-search-area";
import Text from "../text";
import Box from "../box";
import TextInput from "../text-input/";
import IconButton from "../icon-button";
import SVG_Search from "../../static/icons/search-icon.react.svg"


const SearchArea = () =>{

    const [value, isValue] = React.useState("");


    

    console.log("11");

    return(
        <StyledSearchArea>
            <Box
                className="search_container "
                alignItems="center"
            >
                <Text 
                    className="presearch_title"
                    overflow="unset"
                    textOverflow="clip"
                    label="Form search"
                    color="#F5F5F5"
                />
                <TextInput
                    value={value} 
                    onChange={(event) => isValue(event.target.value)}
                    type="text"
                    className="search_input"                    
                    backgroundColor="#333"
                    color="#808080"
                    placeholder="Search name form, type, industry"
                    fontSize="16px"
                    colorHover="808080"

                >
                </TextInput>
                <SVG_Search 
                    
                />
                
            </Box>
            
        </StyledSearchArea>

    );
};

export default SearchArea;