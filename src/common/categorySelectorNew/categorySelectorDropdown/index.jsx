import React from 'react';
import Link from 'next/link';
import cn from 'classnames';

import { useCategorySelectorDropdown } from './useCategorySelectorDropdown';
import { ChevronRight } from '@icons';
import {
    CategorySelectorItemIconWrapper,
    CategorySelectorSubDropdown,
    CategorySelectorItemTitle,
    DesktopCategorySelectorItem,
    DesktopCategorySelectorList,
    DesktopCategorySelectorSubList,
    DesktopCategorySelectorSubLink,
    DesktopCategorySelectorSubItem,
    CategorySelectorDropdownStyled,
    CategorySelectorFakeBlock,
    WebsiteCategorySelectorList,
    WebsiteCategorySelectorItem,
    WebsiteCategorySelectorSubList,
    WebsiteCategorySelectorSubLink,
} from './categorySelectorDropdown.styled';

export const CategorySelectorDropdown = (props) => {
    const {
        types,
        categories,
        compilations,
        categoryName,
        isTablet,
    } = props;

    const {
        t,
        list,
        selectorSubListConditions,
        handleSelectorSubListConditions,
        isDesktopClient,
        getLinkHref,
        getIsActiveCategory,
    } = useCategorySelectorDropdown({
        types,
        categories,
        compilations,
        categoryName,
    });

    if (isDesktopClient) {
        return (
            <CategorySelectorDropdownStyled>
                <CategorySelectorFakeBlock $isDesktopClient />
                <DesktopCategorySelectorList>
                    <DesktopCategorySelectorItem className='with-link'>
                        <Link
                            href={getLinkHref('/')}
                            passHref
                        >
                            {t('View all templates')}
                        </Link>
                    </DesktopCategorySelectorItem>
                    {
                        list.map((item, idx) => (
                            <DesktopCategorySelectorItem
                                key={item.title}
                                tabIndex={0}
                                onMouseEnter={() => handleSelectorSubListConditions(idx, true)}
                                onMouseLeave={() => handleSelectorSubListConditions(idx, false)}
                                onFocus={() => handleSelectorSubListConditions(idx, true)}
                                onBlur={() => handleSelectorSubListConditions(idx, false)}
                            >
                                <CategorySelectorItemTitle>
                                    {t(item.title)}
                                </CategorySelectorItemTitle>
                                <CategorySelectorItemIconWrapper $isDesktopClient>
                                    <ChevronRight size={24} />
                                </CategorySelectorItemIconWrapper>
                                {
                                    selectorSubListConditions[idx] &&
                                    <CategorySelectorSubDropdown
                                        $isDesktopClient
                                    >
                                        <DesktopCategorySelectorSubList
                                            className={cn({ 'one-column': item.items.length <= 10 })}
                                        >
                                            {
                                                item.items.map((data, idx) => (
                                                    <DesktopCategorySelectorSubItem key={data.id}>
                                                        <Link
                                                            href={getLinkHref(item.itemPrefixForHref + data.attributes.urlReq)}
                                                            passHref
                                                        >
                                                            <DesktopCategorySelectorSubLink
                                                                className={cn({ 'selected': getIsActiveCategory(data.attributes[item.itemTitleKey]) })}
                                                            >
                                                                {data.attributes[item.itemTitleKey]}
                                                            </DesktopCategorySelectorSubLink>
                                                        </Link>
                                                    </DesktopCategorySelectorSubItem>
                                                ))
                                            }
                                        </DesktopCategorySelectorSubList>
                                    </CategorySelectorSubDropdown>
                                }
                            </DesktopCategorySelectorItem>
                        ))
                    }
                </DesktopCategorySelectorList>
            </CategorySelectorDropdownStyled>
        );
    }

    return (
        <CategorySelectorDropdownStyled>
            <CategorySelectorFakeBlock />
            <WebsiteCategorySelectorList>
                <WebsiteCategorySelectorItem className='with-link'>
                    <Link
                        href={getLinkHref('/')}
                        passHref
                    >
                        {t('View all templates')}
                    </Link>
                </WebsiteCategorySelectorItem>
                {
                    list.map((item, idx) => (
                        <WebsiteCategorySelectorItem
                            key={item.title}
                            tabIndex={0}
                            onMouseEnter={() => handleSelectorSubListConditions(idx, true)}
                            onMouseLeave={() => handleSelectorSubListConditions(idx, false)}
                            onFocus={() => handleSelectorSubListConditions(idx, true)}
                            onBlur={() => handleSelectorSubListConditions(idx, false)}
                        >
                            <CategorySelectorItemTitle>
                                {t(item.title)}
                            </CategorySelectorItemTitle>
                            <CategorySelectorItemIconWrapper>
                                <ChevronRight size={24} />
                            </CategorySelectorItemIconWrapper>
                            {
                                selectorSubListConditions[idx] &&
                                <CategorySelectorSubDropdown>
                                    <WebsiteCategorySelectorSubList
                                        className={cn({ 'one-column': item.items.length <= 10 || isTablet })}
                                    >
                                        {
                                            item.items.map((data, idx) => (
                                                <li key={data.id}>
                                                    <Link
                                                        href={getLinkHref(item.itemPrefixForHref + data.attributes.urlReq)}
                                                        passHref
                                                    >
                                                        <WebsiteCategorySelectorSubLink
                                                            className={cn({ 'selected': getIsActiveCategory(data.attributes[item.itemTitleKey]) })}
                                                        >
                                                            {data.attributes[item.itemTitleKey]}
                                                        </WebsiteCategorySelectorSubLink>
                                                    </Link>
                                                </li>
                                            ))
                                        }
                                    </WebsiteCategorySelectorSubList>
                                </CategorySelectorSubDropdown>
                            }
                        </WebsiteCategorySelectorItem>
                    ))
                }
            </WebsiteCategorySelectorList>
        </CategorySelectorDropdownStyled>
    );
};
