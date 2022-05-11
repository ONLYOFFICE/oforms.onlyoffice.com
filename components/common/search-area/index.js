import React from "react";

import Box from "../box";
import Text from "../text";
import TextInput from "../text-input/";
import StyledSearchArea from "./styled-search-area";

const SearchArea = ({ clearValueSearch, valueSearch, callback, t }) => {
  /*eslint-disable*/
  const imgSearch = !valueSearch ? (
    <img
      src={"/icons/search-icon.react.svg"}
      style={{ cursor: "default" }}
      alt="search"
      width="24px"
      height="24px"
    />
  ) : (
    <img
      src={"/icons/close-icon.react.svg"}
      onClick={clearValueSearch}
      alt="close"
      width="24px"
      height="24px"
    />
  );
  /*eslint-enable*/
  return (
    <StyledSearchArea>
      <Box className="search_container" alignItems="center">
        <Text
          className="presearch_title"
          overflow="unset"
          textOverflow="clip"
          label={t("SearchForms")}
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
        <div className="search_icon">{imgSearch}</div>
      </Box>
    </StyledSearchArea>
  );
};

export default SearchArea;
