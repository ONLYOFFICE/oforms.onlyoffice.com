import React from 'react';
import cn from 'classnames';
import Link from 'next/link';

import { ChevronRight } from '@icons';
import {
    CategorySelectorDropdownFakeBlock,
    DesktopCategorySelectorListItemButton,
    DesktopCategorySelectorListItemMainLink,
} from '../common.styled'
import {
    CategorySelectorDropdownStyled,
    CategorySelectorItemIconWrapper,
    CategorySelectorItemTitle,
    CategorySelectorSubDropdown,
    DesktopCategorySelectorList,
    DesktopCategorySelectorSubItem,
    DesktopCategorySelectorSubLink,
    DesktopCategorySelectorSubList,
} from './categorySelectorDropdown.styled';

export const Desktop = (props) => {
    const {
        t,
        list,
        selectorSubListConditions,
        handleSelectorSubListConditions,
        getLinkHref,
        getIsActiveCategory,
    } = props;

    return (
        <CategorySelectorDropdownStyled>
            <CategorySelectorDropdownFakeBlock $isDesktopClient />
            <DesktopCategorySelectorList>
                <li>
                    <Link
                        href={getLinkHref('/')}
                        passHref
                    >
                        <DesktopCategorySelectorListItemMainLink>
                            {t('View all templates')}
                        </DesktopCategorySelectorListItemMainLink>
                    </Link>
                </li>
                {
                    list.map((item, idx) => (
                        <li
                            onMouseEnter={() => handleSelectorSubListConditions(idx, true)}
                            onMouseLeave={() => handleSelectorSubListConditions(idx, false)}
                            key={item.title}
                        >
                            <DesktopCategorySelectorListItemButton
                                onFocus={() => handleSelectorSubListConditions(idx, true)}
                                className={cn({ 'active': selectorSubListConditions[idx] })}
                            >
                                <CategorySelectorItemTitle>
                                    {t(item.title)}
                                </CategorySelectorItemTitle>
                                <CategorySelectorItemIconWrapper
                                    as="div"
                                    $isDesktopClient
                                >
                                    <ChevronRight size={24} />
                                </CategorySelectorItemIconWrapper>
                            </DesktopCategorySelectorListItemButton>
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
                        </li>
                    ))
                }
            </DesktopCategorySelectorList>
        </CategorySelectorDropdownStyled>
    );
}
