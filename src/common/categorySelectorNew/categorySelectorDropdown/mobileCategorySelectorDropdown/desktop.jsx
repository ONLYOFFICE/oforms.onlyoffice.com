import React from 'react';
import Link from 'next/link';
import cn from 'classnames';

import { useMobileCategorySelectorDropdown } from './useMobileCategorySelectorDropdown';
import {
    CategorySelectorDropdownFakeBlock,
    CategorySelectorIconWrapper,
    DesktopCategorySelectorListItemButton,
    DesktopCategorySelectorListItemMainLink,
    DesktopCategorySelectorSubListItemLink,
} from '../../common.styled';
import {
    DesktopMobileSelectorDropdownHeader,
    DesktopMobileSelectorDropdownHeaderTitle,
    DesktopMobileSelectorDropdownList,
    DesktopMobileSelectorDropdownStyled,
    DesktopMobileSelectorDropdownSubDropdown,
    DesktopMobileSelectorDropdownSubList,
} from './mobileCategorySelectorDropdown.styled';
import { ChevronLeft, ChevronRight, XClose } from '@icons';

export const Desktop = (props) => {
    const {
        handleSelectorSubListConditions,
        getLinkHref,
        getIsActiveCategory,
        selectorSubListConditions,
        selectorActiveSubListIndex,
        onClose,
        list,
    } = props;
    const {
        t,
        onBack,
    } = useMobileCategorySelectorDropdown({
        handleSelectorSubListConditions,
    });

    return (
        <DesktopMobileSelectorDropdownStyled>
            <CategorySelectorDropdownFakeBlock $isDesktopClient />
            <DesktopMobileSelectorDropdownList
                className={cn({ 'sub-list-opened': selectorActiveSubListIndex !== null })}
            >
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
                            key={item.title}
                        >
                            <DesktopCategorySelectorListItemButton
                                onFocus={() => handleSelectorSubListConditions(idx, true)}
                                className={cn({ 'active': selectorSubListConditions[idx] })}
                            >
                                <span>
                                    {t(item.title)}
                                </span>
                                <CategorySelectorIconWrapper
                                    as='div'
                                    $isDesktopClient
                                >
                                    <ChevronRight size={24} />
                                </CategorySelectorIconWrapper>
                            </DesktopCategorySelectorListItemButton>
                            {
                                selectorSubListConditions[idx] &&
                                <DesktopMobileSelectorDropdownSubDropdown
                                    $isDesktopClient
                                >
                                    <DesktopMobileSelectorDropdownHeader>
                                        <CategorySelectorIconWrapper
                                            $isDesktopClient
                                            onClick={onBack}
                                        >
                                            <ChevronLeft size={24} />
                                        </CategorySelectorIconWrapper>
                                        <DesktopMobileSelectorDropdownHeaderTitle>
                                            {t(item.title)}
                                        </DesktopMobileSelectorDropdownHeaderTitle>
                                        <CategorySelectorIconWrapper
                                            $isDesktopClient
                                            onClick={onClose}
                                        >
                                            <XClose size={24} />
                                        </CategorySelectorIconWrapper>
                                    </DesktopMobileSelectorDropdownHeader>
                                    <DesktopMobileSelectorDropdownSubList
                                        className={cn({ 'one-column': item.items.length <= 10 })}
                                    >
                                        {
                                            item.items.map((data, idx) => (
                                                <li key={data.id}>
                                                    <Link
                                                        href={getLinkHref(item.itemPrefixForHref + data.attributes.urlReq)}
                                                        passHref
                                                    >
                                                        <DesktopCategorySelectorSubListItemLink
                                                            className={cn({ 'selected': getIsActiveCategory(data.attributes[item.itemTitleKey]) })}
                                                        >
                                                            {data.attributes[item.itemTitleKey]}
                                                        </DesktopCategorySelectorSubListItemLink>
                                                    </Link>
                                                </li>
                                            ))
                                        }
                                    </DesktopMobileSelectorDropdownSubList>
                                </DesktopMobileSelectorDropdownSubDropdown>
                            }
                        </li>
                    ))
                }
            </DesktopMobileSelectorDropdownList>
        </DesktopMobileSelectorDropdownStyled>
    );
};
