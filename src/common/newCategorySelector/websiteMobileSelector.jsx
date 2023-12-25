import React, {useState, useEffect} from "react";
import styled, {createGlobalStyle} from "styled-components";
import {useTranslation} from "next-i18next";
import {
    SelectorDefaultHeader,
    SelectorDefaultIcon,
    SelectorDefaultLabel,
} from "@components/selector/selectorDefaultElements";
import classNames from "classnames";
import MenuItem from "@common/menuItem";
import {ChevronLeft, XClose} from "@icons";
import MenuSection from "@common/menuSection/menuSection";
import Link from "next/link";

const WebsiteMobileSelectorGlobalStyles = createGlobalStyle`
  body {
    overflow-y: hidden;
  }
`

const WebsiteMobileSelectorStyled = styled.div`
  .menu-item {
    padding: 12px 24px;
    cursor: pointer;
    text-decoration: none;
    color: #444;
    font-weight: 600;
    font-size: 16px;
    line-height: 133%;
    letter-spacing: 0.04em;
    text-transform: uppercase;

    &:hover {
      background-color: #f9f9f9;
      color: ${({theme}) => theme.colors.primary}
    }
  }

  .menu-item__icon {
    color: currentColor;
  }

  .menu-section {
    position: absolute;
    background-color: #fff;
    width: 100%;
    top: 0;
    left: 0;
  }

  .menu-section {
    height: 100%;
  }

  .menu-section__header {
    padding: 12px;
  }

  .menu-section__title {
    justify-content: center;
    font-weight: 600;
    font-size: 14px;
    line-height: 133%;
    color: ${({theme}) => theme.colors.primary};
    text-transform: uppercase;
  }

  .menu-section__body {
    display: flex;
    flex-direction: column;
    padding-top: 12px;
  }

  .menu-section__prefix, .menu-section__postfix {
    cursor: pointer;
  }
`

const WebsiteMobileSelectorMenu = styled.div`
  display: block;
  position: fixed;
  z-index: 1000;
  background-color: #fff;
  width: 100%;
  height: 100%;
  bottom: 0;
  left: 0;
  overflow-y: auto;
`

const WebsiteMobileSelectorTitle = styled.div`
  font-weight: 700;
  font-size: 16px;
  line-height: 133%;
  color: #444;
  text-transform: capitalize;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 12px 16px;

  & svg {
    cursor: pointer;
  }
`

const WebsiteMenuSectionLink = styled.a`
  text-decoration: none;
  font-weight: 400;
  font-size: 16px;
  line-height: 133%;
  color: #444;
  padding: 12px 16px;
`


const WebsiteMobileSelector = (props) => {
    const {
        types,
        categories,
        compilations
    } = props
    const [isOpen, setIsOpen] = useState(false);
    const {t} = useTranslation('common')
    const [categoriesOpen, setCategoriesOpen] = useState(false)
    const [compilationsOpen, setCompilationsOpen] = useState(false)
    const [typesOpen, setTypesOpen] = useState(false)

    const onClose = () => {
        setIsOpen(false)
        setCategoriesOpen(false)
        setCompilationsOpen(false)
        setTypesOpen(false)
    }

    return (
        <WebsiteMobileSelectorStyled>
            <SelectorDefaultHeader onClick={() => setIsOpen(prevState => !prevState)}>
                <SelectorDefaultLabel>{t('Categories')}</SelectorDefaultLabel>
                <SelectorDefaultIcon className={classNames({'open': isOpen})}/>
            </SelectorDefaultHeader>
            {
                isOpen &&
                <>
                    <WebsiteMobileSelectorMenu>
                        <WebsiteMobileSelectorTitle>
                            {t('Categories')}
                            <XClose color="currentColor" size={30} onClick={onClose}/>
                        </WebsiteMobileSelectorTitle>
                        <MenuItem
                            title={t("View all templates")}
                            icon={false}
                            href="/"
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
                                prefix={<ChevronLeft size={28} onClick={() => setCategoriesOpen(false)}/>}
                                postfix={<XClose size={34} onClick={onClose}/>}
                            >
                                {
                                    categories.data.map(({attributes}) => (
                                        <Link href={`/form/${attributes.urlReq}`} passHref key={attributes.urlReq}>
                                            <WebsiteMenuSectionLink>{attributes.categorie}</WebsiteMenuSectionLink>
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
                                prefix={<ChevronLeft size={28} onClick={() => setTypesOpen(false)}/>}
                                postfix={<XClose size={34} onClick={onClose}/>}
                            >
                                {
                                    types.data.map(({attributes}) => (
                                        <Link href={`/form/types/${attributes.urlReq}`} passHref
                                              key={attributes.urlReq}>
                                            <WebsiteMenuSectionLink>{attributes.type}</WebsiteMenuSectionLink>
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
                                prefix={<ChevronLeft size={28} onClick={() => setCompilationsOpen(false)}/>}
                                postfix={<XClose size={34} onClick={onClose}/>}
                            >
                                {
                                    compilations.data.map(({attributes}) => (
                                        <Link href={`/form/compilations/${attributes.urlReq}`} passHref
                                              key={attributes.urlReq}>
                                            <WebsiteMenuSectionLink>{attributes.compilation}</WebsiteMenuSectionLink>
                                        </Link>
                                    ))
                                }
                            </MenuSection>
                        }


                    </WebsiteMobileSelectorMenu>
                    <WebsiteMobileSelectorGlobalStyles/>
                </>
            }
        </WebsiteMobileSelectorStyled>
    );
};


export default WebsiteMobileSelector;
