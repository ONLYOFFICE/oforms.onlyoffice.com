import React, {useEffect, useMemo, useState} from "react";
import {Selector} from "@components/selector";
import {useRouter} from "next/router";
import {isMobile} from "react-device-detect";
import MobileSelector from "./mobileSelector";
import {CategorySelectorDropdown} from "@components/common/categorySelector/styledCategorySelector";

export const CategorySelector = (props) => {
    const {
        onChangeSelectTypeSort,
        typeSortData,
        t,
        locale,
        category,
        types,
        categories,
        compilations,
        isDesktopClient,
        categoryName,
        queryDesktopClient
    } = props;
    const [isOpen, setIsOpen] = useState(false);
    const [isCategorieOpen, setIsCategorieOpen] = useState(false);
    const [isTypeOpen, setIsTypeOpen] = useState(false);
    const [isCompilationsOpen, setIsCompilationsOpen] = useState(false);

    const router = useRouter();
    const theme = router.query.theme;
    const appTheme = useMemo(() => {
        if (theme && isDesktopClient) return theme
    }, [theme, isDesktopClient])

    const [isWindowMobile, setIsWindowMobile] = useState(false);

    useEffect(() => {
        isMobile ? setIsWindowMobile(true) : setIsWindowMobile(false)
    }, []);

    const localeHREF = category ? `/${locale}` : locale;
    return (isWindowMobile ?
            <MobileSelector
                onChangeSelectTypeSort={onChangeSelectTypeSort}
                typeSortData={typeSortData}
                t={t}
                locale={locale}
                category={category}
                types={types}
                categories={categories}
                compilations={compilations}
            /> :
            <Selector
                label={t("Categories")}
                value={isDesktopClient && router.pathname === "/searchresult" ? `${t("Search results for")} '${queryDesktopClient}'` : categoryName}
            >
                <CategorySelectorDropdown>
                    Hello
                </CategorySelectorDropdown>
            </Selector>
    )
}