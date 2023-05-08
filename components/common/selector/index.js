import React, {useMemo, useState} from "react";
import {useRouter} from "next/router";

import Box from "../box";
import Text from "../text";
import StyledSelector from "./syled-selector";
import Link from "next/link";

const Selector = (props) => {
    const {
        onChangeSelectTypeSort,
        typeSortData,
        t,
        locale,
        category,
        isDesktopClient,
    } = props;
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
    const theme = router.query.theme

    const appTheme = useMemo(() => {
        if(theme && isDesktopClient) return theme
    }, [theme, isDesktopClient])
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
            <Text className="text-sort-set" label={t("SortBy")}/>
            <Text className="filter-header" label={t(typeSortData)}/>
            {/*<img className="arrow" src="https://static-oforms.onlyoffice.com/icons/popup-arrow.svg" />*/}
            <svg className="arrow" xmlns="http://www.w3.org/2000/svg" width="22" height="23" viewBox="0 0 22 23"
                 fill="none">
                <path fillRule="evenodd" clipRule="evenodd"
                      d="M11.0022 12.915L7.10991 9.03167C6.74462 8.66721 6.15085 8.66569 5.78369 9.02826C5.41653 9.39084 5.41501 9.98021 5.78031 10.3447L10.3307 14.8846C10.5368 15.0903 10.8158 15.1804 11.0857 15.1546C11.3007 15.1375 11.511 15.047 11.6751 14.8833L16.2196 10.3493C16.5848 9.98482 16.5833 9.39545 16.2162 9.03288C15.849 8.6703 15.2552 8.67182 14.8899 9.03628L11.0022 12.915Z"
                      fill="#444444"
                />
            </svg>
            <Box
                className="filter_selector"
                value={t(typeSortData)}
                onClick={onChangeSelectTypeSort}
            >
                {isDesktopClient ?
                    <a
                        href={`${router.pathname === "/searchresult" ? `${locale === "en" ? "" : localeHREF}/${resultDesktopHREF}?_sort=asc${appTheme !== undefined ? `&theme=${theme}` : ''}` : `${locale === "en" ? "" : localeHREF}/${catHREF}?_sort=asc&desktop=true${appTheme !== undefined ? `&theme=${theme}` : ''}`}`}
                        style={{textDecoration: "none"}}
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
                        style={{textDecoration: "none"}}
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
                        href={`${router.pathname === "/searchresult" ? `${locale === "en" ? "" : localeHREF}/${resultDesktopHREF}?_sort=desc${appTheme !== undefined ? `&theme=${theme}` : ''}` : `${locale === "en" ? "" : localeHREF}/${catHREF}?_sort=desc&desktop=true${appTheme !== undefined ? `&theme=${theme}` : ''}`}`}
                        style={{textDecoration: "none"}}
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
                        style={{textDecoration: "none"}}
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
