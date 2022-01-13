import React from "react";

import Text from "../text";
import Box from "../box";
import TextInput from "../text-input/";

import StyledSearchArea from "./styled-search-area";

import SearchIcon from "../../static/icons/search-icon.react.svg";
import CloseIcon from "../../static/icons/close-icon.react.svg";

const SearchArea = ({ clearValueSearch, valueSearch, callback, t }) => {
  return (
    <StyledSearchArea>
      <Box className="search_container" alignItems="center">
        <Text
          className="presearch_title"
          overflow="unset"
          textOverflow="clip"
          label="Search forms"
          color="#F5F5F5"
          fontWeight={600}
        />
        <TextInput
          onChange={callback}
          value={valueSearch}
          type="text"
          className="search_input"
          backgroundColor="#333"
          color="#F5F5F5"
          placeholder={t("SearchIputPlaceholder")}
          fontSize="16px"
          colorHover="#CCCCCC"
          labelColor={!valueSearch ? "#808080" : "#CCCCCC"}
        />
        <div className="search_icon">
          {!valueSearch ? (
            <SearchIcon style={{ cursor: "default" }} />
          ) : (
            <CloseIcon onClick={clearValueSearch} />
          )}
        </div>
      </Box>
    </StyledSearchArea>
  );
};

export default SearchArea;
