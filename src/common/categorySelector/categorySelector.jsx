import React, {useEffect, useMemo, useState} from "react";
import Selector from "@components/selector";
import {useRouter} from "next/router";
import {isMobile} from "react-device-detect";
import MobileSelector from "./mobileSelector";
import {
    CategorySelectorDropdown,
    CategorySelectorDropdownItem,
    CategorySelectorDropdownLink,
    CategorySelectorDropdownSubmenu,
    CategorySelectorDropdownSubmenuLink
} from "./styledCategorySelector";
import {ChevronRight} from "@icons";
import Link from "next/link";
import {CategorySelectorHeader} from "./categorySelectorHeader";
import {useTranslation} from "next-i18next";

const desktopClientController = (desktopClientComponent, nonDesktopClientComponent, isDesktopClient) => {
    if (isDesktopClient) {
        return desktopClientComponent
    }

    return nonDesktopClientComponent
}

export const CategorySelector = (props) => {
    const {
        typeSortData,
        locale,
        category,
        types,
        categories,
        compilations,
        isDesktopClient,
        categoryName,
        queryDesktopClient
    } = props;
    const { t } = useTranslation('common')
    const [isCategoryOpen, setIsCategoryOpen] = useState(false);
    const [isTypeOpen, setIsTypeOpen] = useState(false);
    const [isCompilationsOpen, setIsCompilationsOpen] = useState(false);
    const router = useRouter();
    const [isWindowMobile, setIsWindowMobile] = useState(false);
    const [isOpen, setIsOpen] = useState(false)
    const theme = router.query.theme;

    const appTheme = useMemo(() => {
        if (theme && isDesktopClient) return theme
    }, [theme, isDesktopClient])

    const checkedCategory = useMemo(() => {
        if(isDesktopClient && router.query.hasOwnProperty('type') || router.query.hasOwnProperty('category') || router.query.hasOwnProperty('compilation')) {
            return router.query.type ?? router.query.category ?? router.query.compilation
        }
    }, [router, isDesktopClient])

    const onClear = () => {
        router.push(`/?desktop=true${appTheme !== undefined ? `&theme=${appTheme}` : ''}`)
    }

    useEffect(() => {
        isMobile ? setIsWindowMobile(true) : setIsWindowMobile(false)
    }, []);
    return (isWindowMobile ?
            <MobileSelector
                typeSortData={typeSortData}
                locale={locale}
                category={category}
                types={types}
                categories={categories}
                compilations={compilations}
            /> :
            <Selector
                label={isDesktopClient ? `${t("Categories")}:` : t("Categories")}
                value={isDesktopClient && router.pathname === "/searchresult" ? `${t("Search-result-for")} '${queryDesktopClient}'` : categoryName}
                isOpen={isOpen}
                onVisibilityChange={(state) => setIsOpen(state)}
                headerRender={(label, value) => (
                    <CategorySelectorHeader
                        label={label}
                        value={value}
                        setIsOpen={setIsOpen}
                        isOpen={isOpen}
                        onClear={onClear}
                    />
                )}
            >
                <CategorySelectorDropdown className="category-selector__dropdown">
                    {
                        desktopClientController(
                            <Link
                                href={`/?desktop=true${appTheme !== undefined ? `&theme=${appTheme}` : ''}`}
                                passHref
                            >
                                <CategorySelectorDropdownLink
                                    className="category-selector__link"
                                    isDesktopClient
                                >
                                    {t("View all templates")}
                                </CategorySelectorDropdownLink>
                            </Link>,
                            <Link
                                href={`/`}
                                passHref
                            >
                                <CategorySelectorDropdownLink
                                    className="category-selector__link"
                                >
                                    {t("View all templates")}
                                </CategorySelectorDropdownLink>
                            </Link>,
                            isDesktopClient
                        )
                    }
                    <CategorySelectorDropdownItem
                        className="category-selector__item"
                        onMouseEnter={() => setIsCategoryOpen(true)}
                        onMouseLeave={() => setIsCategoryOpen(false)}
                        isDesktopClient={isDesktopClient}
                        isOpen={isCategoryOpen}
                    >
                        {t("Forms by branch")}
                        <ChevronRight className="arrow-right"/>
                    </CategorySelectorDropdownItem>
                    {isCategoryOpen && categories.data?.length > 0 && (
                        <CategorySelectorDropdownSubmenu
                            className="category-selector__submenu"
                            onMouseEnter={() => setIsCategoryOpen(true)}
                            onMouseLeave={() => setIsCategoryOpen(false)}
                            inOneColumn={categories.data.length <= 8}
                        >
                            {categories.data?.map((categorie) => desktopClientController(
                                <Link
                                    href={`/form/${categorie.attributes.urlReq}?desktop=true${appTheme !== undefined ? `&theme=${appTheme}` : ''}`}
                                    passHref
                                >
                                    <CategorySelectorDropdownSubmenuLink
                                        key={categorie.id}
                                        className="category-selector__submenu-link"
                                        isDesktopClient
                                        isActive={checkedCategory === categorie.attributes.urlReq}
                                    >
                                        {categorie.attributes.categorie}
                                    </CategorySelectorDropdownSubmenuLink>
                                </Link>,
                                <Link
                                    href={`/form/${categorie.attributes.urlReq}`}
                                    passHref
                                >
                                    <CategorySelectorDropdownSubmenuLink
                                        key={categorie.id}
                                        className="category-selector__submenu-link"
                                    >
                                        {categorie.attributes.categorie}
                                    </CategorySelectorDropdownSubmenuLink>
                                </Link>,
                                isDesktopClient
                            ))}
                        </CategorySelectorDropdownSubmenu>
                    )}
                    <CategorySelectorDropdownItem
                        className="category-selector__item"
                        onMouseEnter={() => setIsTypeOpen(true)}
                        onMouseLeave={() => setIsTypeOpen(false)}
                        isDesktopClient={isDesktopClient}
                        isOpen={isTypeOpen}
                    >
                        {t("Forms by type")}
                        <ChevronRight className="arrow-right"/>
                    </CategorySelectorDropdownItem>
                    {isTypeOpen && types.data?.length > 0 && (
                        <CategorySelectorDropdownSubmenu
                            className="category-selector__submenu"
                            onMouseEnter={() => setIsTypeOpen(true)}
                            onMouseLeave={() => setIsTypeOpen(false)}
                            inOneColumn={types.data.length <= 8}
                        >
                            {types.data?.map((type) => desktopClientController(
                                    <Link
                                        href={`/form/types/${type.attributes.urlReq}?desktop=true${appTheme !== undefined ? `&theme=${appTheme}` : ''}`}
                                        passHref
                                    >
                                        <CategorySelectorDropdownSubmenuLink
                                            key={type.id}
                                            className="category-selector__submenu-link"
                                            isDesktopClient
                                            isActive={checkedCategory === type.attributes.urlReq}
                                        >
                                            {type.attributes.type}
                                        </CategorySelectorDropdownSubmenuLink>
                                    </Link>,
                                    <Link
                                        href={`/form/types/${type.attributes.urlReq}`}
                                        passHref
                                    >
                                        <CategorySelectorDropdownSubmenuLink
                                            key={type.id}
                                            className="category-selector__submenu-link"
                                        >
                                            {type.attributes.type}
                                        </CategorySelectorDropdownSubmenuLink>
                                    </Link>,
                                    isDesktopClient
                                )
                            )}
                        </CategorySelectorDropdownSubmenu>
                    )}
                    <CategorySelectorDropdownItem
                        className="category-selector__item"
                        onMouseEnter={() => setIsCompilationsOpen(true)}
                        onMouseLeave={() => setIsCompilationsOpen(false)}
                        isDesktopClient={isDesktopClient}
                        isOpen={isCompilationsOpen}
                    >
                        {t("Popular Compilations")}
                        <ChevronRight className="arrow-right"/>
                    </CategorySelectorDropdownItem>
                    {isCompilationsOpen && compilations.data?.length > 0 && (
                        <CategorySelectorDropdownSubmenu
                            className="category-selector__submenu"
                            onMouseEnter={() => setIsCompilationsOpen(true)}
                            onMouseLeave={() => setIsCompilationsOpen(false)}
                            inOneColumn={compilations.data.length <= 8}
                        >
                            {compilations.data?.map((compilation) => desktopClientController(
                                    <Link
                                        href={`/form/compilations/${compilation.attributes.urlReq}?desktop=true${appTheme !== undefined ? `&theme=${appTheme}` : ''}`}
                                        passHref
                                    >
                                        <CategorySelectorDropdownSubmenuLink
                                            key={compilation.id}
                                            className="category-selector__submenu-link"
                                            isDesktopClient
                                            isActive={checkedCategory === compilation.attributes.urlReq}
                                        >
                                            {compilation.attributes.compilation}
                                        </CategorySelectorDropdownSubmenuLink>
                                    </Link>,
                                    <Link
                                        href={`/form/compilations/${compilation.attributes.urlReq}`}
                                        passHref
                                    >
                                        <CategorySelectorDropdownSubmenuLink
                                            key={compilation.id}
                                            className="category-selector__submenu-link"
                                        >
                                            {compilation.attributes.compilation}
                                        </CategorySelectorDropdownSubmenuLink>
                                    </Link>,
                                    isDesktopClient
                                )
                            )}
                        </CategorySelectorDropdownSubmenu>
                    )}
                </CategorySelectorDropdown>
            </Selector>
    )
}