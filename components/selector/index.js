import React, { useEffect, useState } from "react";
import { ReactSVG } from "react-svg";

import Box from "../box"
import Text from "../text";

import StyledSelector from "./syled-selector"

const Selector = ({
  onChangeSelectTypeSort,
  typeSortData,
  t,
  ...rest
}) => {

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
    if (
      isOpen &&
      (!e.target.closest(".filter_selector-items"))) {
      onCloseSelector();
    };
  };

  const onClickHandler = () => {
    setIsOpen(!isOpen)
  };

  const onCloseSelector = () => {
    setIsOpen(false);
  };

  return (
    <StyledSelector
      isOpen={isOpen}
      onClick={onClickHandler}
      {...rest}
    >
      <Text className="text-sort-set" label={t("Sort by: ")} />
      <Text className="filter-header" label={typeSortData} />
      <ReactSVG className="arrow" src="/icons/popup-arrow.react.svg" />
      <Box className="filter_selector" value={typeSortData} onClick={onChangeSelectTypeSort}>
        <Text as="option" className="filter_selector-items" value="Newest - Oldest" label={t("Newest - Oldest")} />
        <Text as="option" className="filter_selector-items" value="Oldest - Newest" label={t("Oldest - Newes")} />
      </Box>
    </StyledSelector>
  );
};

export default Selector;