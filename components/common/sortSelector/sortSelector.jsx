import React, {useEffect, useMemo, useState} from "react";
import {Selector, SelectorDefaultDropdown, SelectorDefaultDropdownItem} from "@components/selector";
import {useRouter} from "next/router";

export const SortSelector = (props) => {
    const {
        onChangeSelectTypeSort,
        typeSortData,
        t,
        locale,
        category,
        isDesktopClient,
    } = props;
    const [selectorValue, setSelectorValue] = useState()
    const router = useRouter();
    const theme = router.query.theme
    const catHREF = category ? `form/${category}/` : "";
    const localeHREF = category ? `/${locale}` : locale;
    const resultHREF = router.pathname === "/searchresult" ? `searchresult/?query=${router.query.query?.replace("?_sort=asc", "").replace("?_sort=desc", "")}` : '';
    const resultDesktopHREF = router.pathname === "/searchresult" ? `searchresult/?desktop=${router.query.desktop?.replace("?_sort=asc", "").replace("?_sort=desc", "")}` : '';

    const appTheme = useMemo(() => {
        if (theme && isDesktopClient) return theme
    }, [theme, isDesktopClient])

    useEffect(() => {
        if (typeSortData) {
            setSelectorValue(typeSortData)
        }
    }, [typeSortData])

    return (
        <>
            <Selector
                label={t("SortBy")}
                value={t(selectorValue)}
            >
                <SelectorDefaultDropdown
                    onClick={onChangeSelectTypeSort}
                    as="div"
                >
                    {isDesktopClient ?
                        <SelectorDefaultDropdownItem
                            as="a"
                            href={`${router.pathname === "/searchresult" ? `${locale === "en" ? "" : localeHREF}/${resultDesktopHREF}?_sort=asc${appTheme !== undefined ? `&theme=${theme}` : ''}` : `${locale === "en" ? "" : localeHREF}/${catHREF}?_sort=asc&desktop=true${appTheme !== undefined ? `&theme=${theme}` : ''}`}`}
                            isActive={typeSortData === t("NameA-Z")}
                            isDesktopClient
                        >
                            {t("NameA-Z")}
                        </SelectorDefaultDropdownItem>
                        :
                        <SelectorDefaultDropdownItem
                            as="a"
                            href={`${router.pathname === "/searchresult" ? `${locale === "en" ? "" : localeHREF}/${resultHREF}?_sort=asc` : `${locale === "en" ? "" : localeHREF}/${catHREF}?_sort=asc`}`}
                        >
                            {t("NameA-Z")}
                        </SelectorDefaultDropdownItem>
                    }
                    {isDesktopClient ?
                        <SelectorDefaultDropdownItem
                            as="a"
                            href={`${router.pathname === "/searchresult" ? `${locale === "en" ? "" : localeHREF}/${resultDesktopHREF}?_sort=desc${appTheme !== undefined ? `&theme=${theme}` : ''}` : `${locale === "en" ? "" : localeHREF}/${catHREF}?_sort=desc&desktop=true${appTheme !== undefined ? `&theme=${theme}` : ''}`}`}
                            isActive={typeSortData === t("NameZ-A")}
                            isDesktopClient
                        >
                            {t("NameZ-A")}
                        </SelectorDefaultDropdownItem>
                        :
                        <SelectorDefaultDropdownItem
                            as="a"
                            href={`${router.pathname === "/searchresult" ? `${locale === "en" ? "" : localeHREF}/${resultHREF}?_sort=desc` : `${locale === "en" ? "" : localeHREF}/${catHREF}?_sort=desc`}`}
                        >
                            {t("NameZ-A")}
                        </SelectorDefaultDropdownItem>
                    }
                </SelectorDefaultDropdown>
            </Selector>
        </>
    )
}