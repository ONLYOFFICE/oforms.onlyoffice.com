import React from 'react';
import cn from 'classnames';
import Link from 'next/link';

import { ChevronRight } from '@icons';
import {
    CategorySelectorDropdownFakeBlock,
    WebsiteCategorySelectorListItemMainLink,
    WebsiteCategorySelectorListItemButton,
} from '../common.styled'
import {
    CategorySelectorDropdownStyled,
    CategorySelectorItemIconWrapper,
    CategorySelectorItemTitle,
    CategorySelectorSubDropdown,
    WebsiteCategorySelectorList,
    WebsiteCategorySelectorSubLink,
    WebsiteCategorySelectorSubList,
} from './categorySelectorDropdown.styled';

export const Website = (props) => {
    const {
        t,
        list,
        selectorSubListConditions,
        handleSelectorSubListConditions,
        getLinkHref,
        getIsActiveCategory,
        isTablet,
    } = props;

    return (
        <CategorySelectorDropdownStyled>
            <CategorySelectorDropdownFakeBlock />
            <WebsiteCategorySelectorList>
                <li>
                    <Link
                        href={getLinkHref('/')}
                        passHref
                    >
                        <WebsiteCategorySelectorListItemMainLink>
                            {t('View all templates')}
                        </WebsiteCategorySelectorListItemMainLink>
                    </Link>
                </li>
                {
                    list.map((item, idx) => (
                        <li
                            key={item.title}
                            onMouseEnter={() => handleSelectorSubListConditions(idx, true)}
                            onMouseLeave={() => handleSelectorSubListConditions(idx, false)}
                        >
                            <WebsiteCategorySelectorListItemButton
                                className={cn({ 'active': selectorSubListConditions[idx] })}
                                onFocus={() => handleSelectorSubListConditions(idx, true)}
                            >
                                <CategorySelectorItemTitle>
                                    {t(item.title)}
                                </CategorySelectorItemTitle>
                                <CategorySelectorItemIconWrapper
                                    as="div"
                                    $isItemIcon
                                >
                                    <ChevronRight size={24} />
                                </CategorySelectorItemIconWrapper>
                            </WebsiteCategorySelectorListItemButton>
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
                        </li>
                    ))
                }
            </WebsiteCategorySelectorList>
        </CategorySelectorDropdownStyled>
    )
}
