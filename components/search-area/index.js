import React, { useEffect, useState } from "react";

import Text from "../text";
import Box from "../box";
import TextInput from "../text-input/";

import StyledSearchArea from "./styled-search-area";

import SearchIcon from "../../static/icons/search-icon.react.svg";
import CloseIcon from "../../static/icons/close-icon.react.svg";

const SearchArea = ({ t }) => {
  const [value, isValue] = useState("");

  const screenWidth = window.screen.width;

  return (
    <StyledSearchArea>
      <Box className="search_container" alignItems="center">
        <Text
          className="presearch_title"
          overflow="unset"
          textOverflow="clip"
          label="Form search"
          color="#F5F5F5"
          fontWeight={600}
        />
        <TextInput
          value={value}
          onChange={(event) => isValue(event.target.value)}
          type="text"
          className="search_input"
          backgroundColor="#333"
          color="#F5F5F5"
          placeholder={
            screenWidth < 600
              ? t("SearchMobilePlaceholder")
              : t("SearchIputPlaceholder")
          }
          fontSize="16px"
          colorHover="#CCCCCC"
          labelColor={!value ? "#808080" : "#CCCCCC"}
        />
        <div className="search_icon">
          {!value ? (
            <SearchIcon style={{ cursor: "default" }} />
          ) : (
            <CloseIcon onClick={(event) => isValue("")} />
          )}
        </div>
      </Box>
    </StyledSearchArea>
  );
};

export default SearchArea;
