import React, {useEffect, useMemo, useState} from "react";
import {Selector} from "@components/selector";
import {useRouter} from "next/router";
import {isMobile} from "react-device-detect";
import MobileSelector from "./mobileSelector";
import {
    CategorySelectorDropdown, CategorySelectorDropdownItem,
    CategorySelectorDropdownLink, CategorySelectorDropdownSubmenu, CategorySelectorDropdownSubmenuLink
} from "@components/common/categorySelector/styledCategorySelector";
import Text from "@components/common/text";
import MenuItem from "@components/screens/heading-content/menu/menu-item";
import Box from "@components/common/box";
import {ChevronRight} from "../../../icons";

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
                <CategorySelectorDropdown className="category-selector__dropdown">
                    {isDesktopClient ?
                        <CategorySelectorDropdownLink
                            className="category-selector__link"
                            isDesktopClient
                            href={`${locale === "en" ? `/?desktop=true${appTheme !== undefined ? `&theme=${appTheme}` : ''}` : `${localeHREF}?desktop=true${appTheme !== undefined ? `&theme=${appTheme}` : ''}`}`}
                        >
                            {t("View all templates")}
                        </CategorySelectorDropdownLink>
                        :
                        <CategorySelectorDropdownLink
                            className="category-selector__link"
                            href={`${locale === "en" ? "" : localeHREF}/`}
                        >
                            {t("View all templates")}
                        </CategorySelectorDropdownLink>
                    }
                    <CategorySelectorDropdownItem
                        className="category-selector__item"
                        onMouseEnter={() => setIsCategorieOpen(true)}
                        onMouseLeave={() => setIsCategorieOpen(false)}
                        isDesktopClient={isDesktopClient}
                    >
                        {t("Forms by branch")}
                        <ChevronRight className="arrow-right" />
                    </CategorySelectorDropdownItem>
                    {isCategorieOpen && categories.data?.length > 0 && (
                        <CategorySelectorDropdownSubmenu
                            className="category-selector__submenu"
                            onMouseEnter={() => setIsCategorieOpen(true)}
                            onMouseLeave={() => setIsCategorieOpen(false)}
                        >
                            {categories.data?.map((categorie) => (
                                isDesktopClient ?
                                    <CategorySelectorDropdownSubmenuLink
                                        key={categorie.id}
                                        href={`${locale === "en" ? "" : `/${localeHREF}`}/form/${categorie.attributes.urlReq}?desktop=true${appTheme !== undefined ? `&theme=${appTheme}` : ''}`}
                                        className="category-selector__submenu-link"
                                        isDesktopClient
                                    >
                                        {categorie.attributes.categorie}
                                    </CategorySelectorDropdownSubmenuLink>
                                    :
                                    <CategorySelectorDropdownSubmenuLink
                                        key={categorie.id}
                                        href={`${locale === "en" ? "" : `/${localeHREF}`}/form/${categorie.attributes.urlReq}`}
                                        className="category-selector__submenu-link"
                                    >
                                        {categorie.attributes.categorie}
                                    </CategorySelectorDropdownSubmenuLink>

                            ))}
                        </CategorySelectorDropdownSubmenu>
                    )}
                    <CategorySelectorDropdownItem
                        className="category-selector__item"
                        onMouseEnter={() => setIsTypeOpen(true)}
                        onMouseLeave={() => setIsTypeOpen(false)}
                        isDesktopClient={isDesktopClient}
                    >
                        {t("Forms by type")}
                        <ChevronRight className="arrow-right" />
                    </CategorySelectorDropdownItem>
                    {isTypeOpen && types.data?.length > 0 && (
                        <CategorySelectorDropdownSubmenu
                            className="category-selector__submenu"
                            onMouseEnter={() => setIsTypeOpen(true)}
                            onMouseLeave={() => setIsTypeOpen(false)}
                        >
                            {types.data?.map((type) => (
                                isDesktopClient ?
                                    <CategorySelectorDropdownSubmenuLink
                                        key={type.id}
                                        href={`${locale === "en" ? "" : `/${localeHREF}`}/form/types/${type.attributes.urlReq}?desktop=true${appTheme !== undefined ? `&theme=${appTheme}` : ''}`}
                                        className="category-selector__submenu-link"
                                        isDesktopClient
                                    >
                                        {type.attributes.type}
                                    </CategorySelectorDropdownSubmenuLink>
                                    :
                                    <CategorySelectorDropdownSubmenuLink
                                        key={type.id}
                                        href={`${locale === "en" ? "" : `/${localeHREF}`}/form/types/${type.attributes.urlReq}`}
                                        className="category-selector__submenu-link"
                                    >
                                        {type.attributes.type}
                                    </CategorySelectorDropdownSubmenuLink>

                            ))}
                        </CategorySelectorDropdownSubmenu>
                    )}
                    <CategorySelectorDropdownItem
                        className="category-selector__item"
                        onMouseEnter={() => setIsCompilationsOpen(true)}
                        onMouseLeave={() => setIsCompilationsOpen(false)}
                        isDesktopClient={isDesktopClient}
                    >
                        {t("Popular Compilations")}
                        <ChevronRight className="arrow-right" />
                    </CategorySelectorDropdownItem>
                    {isCompilationsOpen && compilations.data?.length > 0 && (
                        <CategorySelectorDropdownSubmenu
                            className="category-selector__submenu"
                            onMouseEnter={() => setIsCompilationsOpen(true)}
                            onMouseLeave={() => setIsCompilationsOpen(false)}
                        >
                            {compilations.data?.map((compilation) => (
                                isDesktopClient ?
                                    <CategorySelectorDropdownSubmenuLink
                                        key={compilation.id}
                                        href={`${locale === "en" ? "" : `/${localeHREF}`}/form/compilations/${compilation.attributes.urlReq}?desktop=true${appTheme !== undefined ? `&theme=${appTheme}` : ''}`}
                                        className="category-selector__submenu-link"
                                        isDesktopClient
                                    >
                                        {compilation.attributes.compilation}
                                    </CategorySelectorDropdownSubmenuLink>
                                    :
                                    <CategorySelectorDropdownSubmenuLink
                                        key={compilation.id}
                                        href={`${locale === "en" ? "" : `/${localeHREF}`}/form/compilations/${compilation.attributes.urlReq}`}
                                        className="category-selector__submenu-link"
                                    >
                                        {compilation.attributes.compilation}
                                    </CategorySelectorDropdownSubmenuLink>

                            ))}
                        </CategorySelectorDropdownSubmenu>
                    )}
                </CategorySelectorDropdown>
            </Selector>
    )
}