import React, {useCallback, useEffect, useMemo, useState} from "react";
import Dropdown from "@components/dropdown";
import RcMenu, {Item as RcMenuItem, SubMenu as RcSubMenu} from 'rc-menu'
import {useTranslation} from "next-i18next";
import {useRouter} from "next/router";
import MenuItem from "@common/menuItem";
import {CategorySelectorGlobalStyles, SubMenuBox} from "./categorySelector.styled";
import {CategorySelectorHeader} from "./categorySelectorHeader";
import {DesktopMobileSelector} from "./desktopMobileSelector";
import WebsiteMobileSelector from "./websiteMobileSelector";

const desktopClientController = (desktopClientComponent, nonDesktopClientComponent, isDesktopClient) => {
    if (isDesktopClient) {
        return desktopClientComponent
    }

    return nonDesktopClientComponent
}

const CategorySelector = (props) => {
    const {
        typeSortData,
        locale,
        category,
        types,
        categories,
        compilations,
        isDesktopClient,
        categoryName,
        queryDesktopClient,
    } = props;

    const {t} = useTranslation('common')
    const [isCategoryOpen, setIsCategoryOpen] = useState(false);
    const [isTypeOpen, setIsTypeOpen] = useState(false);
    const [isCompilationsOpen, setIsCompilationsOpen] = useState(false);
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false)
    const theme = router.query.theme;
    const [isMobile, setIsMobile] = useState(false)

    const appTheme = useMemo(() => {
        if (theme && isDesktopClient) return theme
    }, [theme, isDesktopClient])

    const onResize = useCallback(() => {
        setIsMobile(getIsMobile(window))
    }, [])

    const onClear = () => {
        const query = isDesktopClient ? {desktop: true, theme: appTheme ?? 'classic-theme'} : {theme: appTheme}
        router.push({
            pathname: '/',
            query,
        })
    }

    const getIsMobile = (window) => window.innerWidth <= 850

    useEffect(() => {
        window.addEventListener('resize', onResize)
        setIsMobile(getIsMobile(window))
        return () => window.removeEventListener('resize', onResize)
    }, [onResize])

    const onVisibleChange = (open) => {
        if(isDesktopClient) {
            !open && setIsOpen(false)
        } else {
            setIsOpen(open)
        }
    }

    if (isMobile) {
        return isDesktopClient ?
            <DesktopMobileSelector
                typeSortData={typeSortData}
                locale={locale}
                category={category}
                types={types}
                categories={categories}
                compilations={compilations}
                categoryName={categoryName}
                theme={appTheme}
                queryDesktopClient={queryDesktopClient}
            /> :
            <WebsiteMobileSelector
                typeSortData={typeSortData}
                locale={locale}
                category={category}
                types={types}
                categories={categories}
                compilations={compilations}
            />
    }

    const label = isDesktopClient ? `${t("Categories")}:` : t("Categories")
    const value = isDesktopClient && router.pathname === "/searchresult" ? `${t("Search-result-for")} '${queryDesktopClient}'` : categoryName


    return (
        <>
            <Dropdown
                overlay={
                    <RcMenu
                        mode="vertical"
                    >
                        <RcMenuItem key="all-templates">
                            {
                                desktopClientController(
                                    <MenuItem
                                        onClick={() => setIsOpen(false)}
                                        href={{
                                            pathname: '/',
                                            query: appTheme ? {
                                                desktop: true,
                                                theme: appTheme,
                                            } : {desktop: true}
                                        }}
                                        title={t("View all templates")}
                                        icon={false}
                                    />,
                                    <MenuItem
                                        href="/"
                                        title={t("View all templates")}
                                        icon={false}
                                    />,
                                    isDesktopClient
                                )
                            }
                        </RcMenuItem>
                        <RcSubMenu
                            onMouseEnter={() => setIsCategoryOpen(true)}
                            onMouseLeave={() => setIsCategoryOpen(false)}
                            title={
                                desktopClientController(
                                    <MenuItem
                                        active={isCategoryOpen}
                                        title={t("Forms by branch")}
                                    />,
                                    <MenuItem
                                        active={isCategoryOpen}
                                        title={t("Forms by branch")}
                                    />,
                                    isDesktopClient
                                )
                            }
                        >
                            <SubMenuBox inOneColumn={categories.data.length <= 8} isDesktopClient={isDesktopClient}>
                                {categories.data?.map((categorie) =>
                                    <RcMenuItem key={categorie.attributes.urlReqd}>
                                        {
                                            desktopClientController(
                                                <MenuItem
                                                    active={categorie.attributes.categorie === categoryName}
                                                    onClick={() => setIsOpen(false)}
                                                    href={{
                                                        pathname: `/form/${categorie.attributes.urlReq}`,
                                                        query: appTheme ? {
                                                            desktop: true,
                                                            theme: appTheme,
                                                        } : {desktop: true}
                                                    }}
                                                    title={categorie.attributes.categorie}
                                                    icon={false}
                                                />
                                                ,
                                                <MenuItem
                                                    onClick={() => setIsOpen(false)}
                                                    href={`/form/${categorie.attributes.urlReq}`}
                                                    title={categorie.attributes.categorie}
                                                    icon={false}
                                                />,
                                                isDesktopClient
                                            )
                                        }
                                    </RcMenuItem>
                                )}
                            </SubMenuBox>
                        </RcSubMenu>
                        <RcSubMenu
                            onMouseEnter={() => setIsTypeOpen(true)}
                            onMouseLeave={() => setIsTypeOpen(false)}
                            title={
                                desktopClientController(
                                    <MenuItem
                                        active={isTypeOpen}
                                        title={t("Forms by type")}
                                    />,
                                    <MenuItem
                                        active={isTypeOpen}
                                        title={t("Forms by type")}
                                    />,
                                    isDesktopClient
                                )
                            }
                        >
                            <SubMenuBox inOneColumn={types.data.length <= 8} isDesktopClient={isDesktopClient}>
                                {types.data?.map((type) =>
                                    <RcMenuItem key={type.attributes.urlReq}>
                                        {
                                            desktopClientController(
                                                <MenuItem
                                                    active={type.attributes.type === categoryName}
                                                    onClick={() => setIsOpen(false)}
                                                    href={{
                                                        pathname: `/form/types/${type.attributes.urlReq}`,
                                                        query: appTheme ? {
                                                            desktop: true,
                                                            theme: appTheme,
                                                        } : {desktop: true}
                                                    }}
                                                    title={type.attributes.type}
                                                    icon={false}
                                                />
                                                ,
                                                <MenuItem
                                                    onClick={() => setIsOpen(false)}
                                                    href={`/form/types/${type.attributes.urlReq}`}
                                                    title={type.attributes.type}
                                                    icon={false}
                                                />,
                                                isDesktopClient
                                            )
                                        }
                                    </RcMenuItem>
                                )}
                            </SubMenuBox>
                        </RcSubMenu>
                        <RcSubMenu
                            onMouseEnter={() => setIsCompilationsOpen(true)}
                            onMouseLeave={() => setIsCompilationsOpen(false)}
                            title={
                                desktopClientController(
                                    <MenuItem
                                        active={isCompilationsOpen}
                                        title={t("Popular Compilations")}
                                    />,
                                    <MenuItem
                                        active={isCompilationsOpen}
                                        title={t("Popular Compilations")}
                                    />,
                                    isDesktopClient
                                )
                            }
                        >
                            <SubMenuBox inOneColumn={compilations.data.length <= 8} isDesktopClient={isDesktopClient}>
                                {compilations.data?.map((compilation) =>
                                    <RcMenuItem key={compilation.attributes.urlReq}>
                                        {
                                            desktopClientController(
                                                <MenuItem
                                                    active={compilation.attributes.compilation === categoryName}
                                                    onClick={() => setIsOpen(false)}
                                                    href={{
                                                        pathname: `/form/${compilation.attributes.urlReq}`,
                                                        query: appTheme ? {
                                                            desktop: true,
                                                            theme: appTheme,
                                                        } : {desktop: true}
                                                    }}
                                                    title={compilation.attributes.compilation}
                                                    icon={false}
                                                />
                                                ,
                                                <MenuItem
                                                    onClick={() => setIsOpen(false)}
                                                    href={`/form/${compilation.attributes.urlReq}`}
                                                    title={compilation.attributes.compilation}
                                                    icon={false}
                                                />,
                                                isDesktopClient
                                            )
                                        }
                                    </RcMenuItem>
                                )}
                            </SubMenuBox>
                        </RcSubMenu>
                    </RcMenu>
                }
                trigger={isDesktopClient ? 'click' : 'hover'}
                visible={isOpen}
                onVisibleChange={onVisibleChange}
            >
                <div>
                    <CategorySelectorHeader
                        label={label}
                        value={value}
                        isOpen={isOpen}
                        onClear={onClear}
                        onClick={() => isDesktopClient && setIsOpen(true)}
                    />
                </div>
            </Dropdown>
            <CategorySelectorGlobalStyles isDesktopClient={isDesktopClient}/>
        </>
    )
}

export default CategorySelector
