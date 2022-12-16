import React, { useState } from "react";
import { ReactSVG } from "react-svg";

import Box from "../box";
import Text from "../text";
import StyledSelector from "./syled-selector";

const Selector = ({
  onChangeSelectTypeSort,
  typeSortData,
  t,
  locale,
  category,
  isDesktopClient,
}) => {
  const [isOpen, setIsOpen] = useState(false);

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
      onMouseLeave={onCloseSelector}
    >
      <Text className="text-sort-set" label={t("SortBy")} />
      <Text className="filter-header" label={t(typeSortData)} />
      <ReactSVG className="arrow" src="https://static-oforms.teamlab.info/icons/popup-arrow.react.svg" />
      <Box
        className="filter_selector"
        value={t(typeSortData)}
        onClick={onChangeSelectTypeSort}
      >
        <a
          href={`${locale === "en" ? "" : localeHREF}/${catHREF}?_sort=asc`}
          style={{ textDecoration: "none" }}
        >
          <Text
            as="option"
            className={isDesktopClient ? `filter_selector-items ${typeSortData === t("NameA-Z") ? "active" : ""}` : "filter_selector-items"}
            value={t("NameA-Z")}
            label={t("NameA-Z")}
          />
        </a>
        <a
          href={`${locale === "en" ? "" : localeHREF}/${catHREF}?_sort=desc`}
          style={{ textDecoration: "none" }}
        >
          <Text
            as="option"
            className={isDesktopClient ? `filter_selector-items ${typeSortData === t("NameZ-A") ? "active" : ""}` : "filter_selector-items"}
            value={t("NameZ-A")}
            label={t("NameZ-A")}
          />
        </a>
      </Box>
    </StyledSelector>
  );
};

export default Selector;
