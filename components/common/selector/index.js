import React, { useEffect, useState } from "react";
import { ReactSVG } from "react-svg";

import StyledSelector from "./syled-selector";
import Box from "../box";
import Text from "../text";

const Selector = ({ onChangeSelectTypeSort, typeSortData, t, ...rest }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    typeof window !== "undefined" &&
      isOpen &&
      window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  });

  const handleClickOutside = (e) => {
    if (isOpen && !e.target.closest(".filter-selector-items")) {
      onCloseSelector();
    }
  };

  const onClickHandler = () => {
    setIsOpen(!isOpen);
  };

  const onCloseSelector = () => {
    setIsOpen(false);
  };

  return (
    <StyledSelector isOpen={isOpen} onClick={onClickHandler} {...rest}>
      <Text className="text-sort-set" label={t("SortBy")} />
      <Text className="filter-header" label={t(typeSortData)} />
      <ReactSVG className="arrow" src="/icons/popup-arrow.react.svg" />
      <Box
        className="filter-selector"
        value={t(typeSortData)}
        onClick={onChangeSelectTypeSort}
      >
        <Text
          as="option"
          className="filter-selector-items"
          value={t("NameA-Z")}
          label={t("NameA-Z")}
        />
        <Text
          as="option"
          className="filter-selector-items"
          value={t("NameZ-A")}
          label={t("NameZ-A")}
        />
      </Box>
    </StyledSelector>
  );
};

export default Selector;
