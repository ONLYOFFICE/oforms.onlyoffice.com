import React, {useState} from "react";
import {useTranslation} from "next-i18next";
import styled from "styled-components";
import classNames from "classnames";
import {ChevronLeft, XClose} from "@icons";
import MenuItem from "@common/menuItem";
import MenuSection from "@common/menuSection/menuSection";
import Link from "next/link";
import {CategorySelectorHeader} from "@common/categorySelector/categorySelectorHeader";
import {useRouter} from "next/router";
import Selector from "@components/selector";
import {CategorySelectorDropdown} from "@common/categorySelector/styledCategorySelector";

const DesktopMobileSelectorStyled = styled.div`
  .menu-item {
    color: ${({theme}) => theme.colors.palette.textNormal};
    font-weight: 600;
    line-height: 133%;
    font-size: 14px;
    padding: 12px 24px;
  }

  a.menu-item {
    text-decoration: none;
    font-size: 16px;
  }

  .menu-section {
    position: absolute;
    top: 0;
    background-color: ${({theme}) => theme.colors.palette.backgroundNormal};
    box-shadow: ${({theme}) => theme.boxShadows.shadowMenu};
    width: 320px;
  }

  .menu-section__header {
    padding: 12px;
    background-color: ${({theme}) => theme.colors.palette.highlightButtonPressed};
  }

  .menu-section__title {
    justify-content: center;
    font-weight: 600;
    font-size: 14px;
    line-height: 133%;
    color: ${({theme}) => theme.colors.palette.textNormal};
  }

  .menu-section__body {
    padding: 16px 0;
    max-height: calc(100vh - 270px);
    overflow-y: auto;
  }

  .menu-icon {
    color: ${({theme}) => theme.colors.palette.iconNormal};
  }
`

const DesktopMobileSelectorMenu = styled.div`
  position: absolute;
  z-index: 10;
  background-color: ${({theme}) => theme.colors.palette.backgroundNormal};
  box-shadow: ${({theme}) => theme.boxShadows.shadowMenu};

  display: grid;
  grid-template-columns: 1fr;
  width: 320px;
  padding: 16px 0;
  top: -10px;
`

const DesktopMenuSectionLink = styled.a`
  font-weight: 400;
  font-size: 14px;
  line-height: 160%;
  color: ${({theme}) => theme.colors.palette.textNormal};
  display: block;
  padding: 8px 32px;
  text-decoration: none;

  &:hover {
    background-color: ${({theme}) => theme.colors.palette.highlightButtonHover};
    color: ${({theme}) => theme.colors.palette.textNormal};
  }

  &.active {
    background-color: ${({theme}) => theme.colors.palette.highlightButtonPressed};
    color: ${({theme}) => theme.colors.palette.textNormal};
  }
`

export const DesktopMobileSelector = (props) => {
    const {t} = useTranslation('common')
    const {
        types,
        categories,
        compilations,
        categoryName,
        theme,
        queryDesktopClient,
    } = props
    const router = useRouter()

    const [isOpen, setIsOpen] = useState(false)
    const [categoriesOpen, setCategoriesOpen] = useState(false)
    const [compilationsOpen, setCompilationsOpen] = useState(false)
    const [typesOpen, setTypesOpen] = useState(false)

    const onClear = () => {
        router.push(getHref('/'))
    }

    const onClose = () => {
        setIsOpen(false)
        setCategoriesOpen(false)
        setCompilationsOpen(false)
        setTypesOpen(false)
    }

    const getHref = (pathname) => {
        const result = {
            pathname,
            query: {
                desktop: true,
            }
        }

        if(theme) {
            result.query.theme = theme
        }

        return result;
    }


    return (
        <DesktopMobileSelectorStyled >
            <Selector
                label={t("Categories")}
                value={router.pathname === "/searchresult" ? `${t("Search-result-for")} '${queryDesktopClient}'` : categoryName}
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
                        <DesktopMobileSelectorMenu>
                            <MenuItem
                                title={t("View all templates")}
                                icon={false}
                                href={getHref('/')}
                                onClick={onClose}
                            />
                            <MenuItem
                                title={t("Forms by branch")}
                                onClick={() => setCategoriesOpen(true)}
                            />
                            {
                                categoriesOpen &&
                                <MenuSection
                                    title={t("Forms by branch")}
                                    prefix={
                                        <ChevronLeft
                                            className="menu-icon"
                                            size={28}
                                            onClick={() => setCategoriesOpen(false)}
                                        />
                                    }
                                    postfix={<XClose size={34} onClick={onClose} className="menu-icon"/>}
                                >
                                    {
                                        categories.data.map(({attributes}) => (
                                            <Link
                                                href={getHref(`/form/${attributes.urlReq}`)}
                                                passHref
                                                key={attributes.urlReq}
                                            >
                                                <DesktopMenuSectionLink
                                                    className={classNames({'active': categoryName === attributes.categorie})}
                                                >
                                                    {attributes.categorie}
                                                </DesktopMenuSectionLink>
                                            </Link>
                                        ))
                                    }
                                </MenuSection>
                            }


                            <MenuItem
                                title={t("Forms by type")}
                                onClick={() => setTypesOpen(true)}
                            />
                            {
                                typesOpen &&
                                <MenuSection
                                    title={t("Forms by type")}
                                    prefix={
                                        <ChevronLeft
                                            className="menu-icon"
                                            size={28}
                                            onClick={() => setTypesOpen(false)}
                                        />
                                    }
                                    postfix={<XClose size={34} onClick={onClose} className="menu-icon"/>}
                                >
                                    {
                                        types.data.map(({attributes}) => (
                                            <Link
                                                href={getHref(`/form/types/${attributes.urlReq}`)}
                                                passHref
                                                key={attributes.urlReq}
                                            >
                                                <DesktopMenuSectionLink
                                                    className={classNames({'active': categoryName === attributes.type})}
                                                >
                                                    {attributes.type}
                                                </DesktopMenuSectionLink>
                                            </Link>
                                        ))
                                    }
                                </MenuSection>
                            }


                            <MenuItem
                                title={t("Popular Compilations")}
                                onClick={() => setCompilationsOpen(true)}
                            />
                            {
                                compilationsOpen &&
                                <MenuSection
                                    title={t("Popular Compilations")}
                                    prefix={
                                        <ChevronLeft
                                            className="menu-icon"
                                            size={28}
                                            onClick={() => setCompilationsOpen(false)}
                                        />
                                    }
                                    postfix={<XClose size={34} onClick={onClose} className="menu-icon"/>}
                                >
                                    {
                                        compilations.data.map(({attributes}) => (
                                            <Link
                                                href={getHref(`/form/compilations/${attributes.urlReq}`)}
                                                passHref
                                                key={attributes.urlReq}
                                            >
                                                <DesktopMenuSectionLink
                                                    className={classNames({'active': categoryName === attributes.compilation})}
                                                >
                                                    {attributes.compilation}
                                                </DesktopMenuSectionLink>
                                            </Link>
                                        ))
                                    }
                                </MenuSection>
                            }
                        </DesktopMobileSelectorMenu>
                    }
                </CategorySelectorDropdown>
            </Selector>
        </DesktopMobileSelectorStyled>
    )
}