import React, { useState } from "react";
import { useRouter } from "next/router";

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
  const router = useRouter();

  const onClickHandler = () => {
    setIsOpen(true);
  };

  const onCloseSelector = () => {
    setIsOpen(false);
  };

  const catHREF = category ? `form/${category}/` : "";
  const localeHREF = category ? `/${locale}` : locale;
  const resultHREF = router.pathname === "/searchresult" ? `searchresult/?query=${router.query.query?.replace("?_sort=asc", "").replace("?_sort=desc", "")}` : '';
  const resultDesktopHREF = router.pathname === "/searchresult" ? `searchresult/?desktop=${router.query.desktop?.replace("?_sort=asc", "").replace("?_sort=desc", "")}` : '';

  return (
    <StyledSelector
      isOpen={isOpen}
      onClick={onClickHandler}
      onMouseLeave={onCloseSelector}
    >
      <Text className="text-sort-set" label={t("SortBy")} />
      <Text className="filter-header" label={t(typeSortData)} />
      <img className="arrow" src="https://static-oforms.onlyoffice.com/icons/popup-arrow.svg" />
      <Box
        className="filter_selector"
        value={t(typeSortData)}
        onClick={onChangeSelectTypeSort}
      >
        {isDesktopClient ?
        <a
          href={`${router.pathname === "/searchresult" ? `${locale === "en" ? "" : localeHREF}/${resultDesktopHREF}?_sort=asc` : `${locale === "en" ? "" : localeHREF}/${catHREF}?_sort=asc&desktop=true`}`}
          style={{ textDecoration: "none" }}
        >
          <Text
            as="option"
            className={isDesktopClient ? `filter_selector-items ${typeSortData === t("NameA-Z") ? "active" : ""}` : "filter_selector-items"}
            value={t("NameA-Z")}
            label={t("NameA-Z")}
          />
        </a>
        :
        <a
        href={`${router.pathname === "/searchresult" ? `${locale === "en" ? "" : localeHREF}/${resultHREF}?_sort=asc` : `${locale === "en" ? "" : localeHREF}/${catHREF}?_sort=asc`}`}
        style={{ textDecoration: "none" }}
        >
        <Text
          as="option"
          className={isDesktopClient ? `filter_selector-items ${typeSortData === t("NameA-Z") ? "active" : ""}` : "filter_selector-items"}
          value={t("NameA-Z")}
          label={t("NameA-Z")}
        />
        </a>
        }
        {isDesktopClient ?
        <a
        href={`${router.pathname === "/searchresult" ? `${locale === "en" ? "" : localeHREF}/${resultDesktopHREF}?_sort=desc` : `${locale === "en" ? "" : localeHREF}/${catHREF}?_sort=desc&desktop=true`}`}
          style={{ textDecoration: "none" }}
        >
          <Text
            as="option"
            className={isDesktopClient ? `filter_selector-items ${typeSortData === t("NameZ-A") ? "active" : ""}` : "filter_selector-items"}
            value={t("NameZ-A")}
            label={t("NameZ-A")}
          />
        </a>
        :
        <a
        href={`${router.pathname === "/searchresult" ? `${locale === "en" ? "" : localeHREF}/${resultHREF}?_sort=desc` : `${locale === "en" ? "" : localeHREF}/${catHREF}?_sort=desc`}`}
        style={{ textDecoration: "none" }}
      >
        <Text
          as="option"
          className={isDesktopClient ? `filter_selector-items ${typeSortData === t("NameZ-A") ? "active" : ""}` : "filter_selector-items"}
          value={t("NameZ-A")}
          label={t("NameZ-A")}
        />
      </a>
        }
      </Box>
    </StyledSelector>
  );
};

export default Selector;
