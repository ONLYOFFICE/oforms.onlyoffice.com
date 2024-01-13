import React from 'react';
import cn from 'classnames';
import Link from 'next/link';

import { useCategorySelector } from './useCategorySelector';
import {
    CategorySelectorClearIconWrapper,
    CategorySelectorDropdownIndicatorIconWrapper,
    CategorySelectorItemIconWrapper,
    CategorySelectorDropdown,
    DesktopCategorySelector,
    DesktopCategorySelectorHeader,
    DesktopCategorySelectorLabel,
    DesktopCategorySelectorValue,
    DesktopCategorySelectorList,
    DesktopCategorySelectorItem,
    CategorySelectorSubDropdown,
} from '@common/categorySelectorNew/categorySelector.styled';
import { ChevronDown, ChevronRight, XClose } from '@icons';

export const CategorySelector = (props) => {
    const {
        types,
        categories,
        compilations,
        categoryName,
    } = props;
    const {
        t,
        isDesktopClient,
        isValueVisible,
        isClearIconVisible,
        isDropdownIndicatorIconVisible,
        isOpen,
        searchQuery,
        categorySelectorRef,
        listItems,
        selectorSubListConditions,
        onToggle,
        onKeyDown,
        getLinkHref,
        handleSelectorSubListConditions,
    } = useCategorySelector({ categoryName });

    if (isDesktopClient) {
        return (
            <DesktopCategorySelector
                ref={categorySelectorRef}
                className={cn({ 'expanded': isOpen })}
            >
                <DesktopCategorySelectorHeader
                    onClick={onToggle}
                    onKeyDown={onKeyDown}
                    tabIndex={0}
                >
                    <DesktopCategorySelectorLabel>
                        {t('Categories')}
                        {categoryName !== undefined && ':'}
                    </DesktopCategorySelectorLabel>
                    {
                        isValueVisible &&
                        <DesktopCategorySelectorValue>{categoryName ?? searchQuery}</DesktopCategorySelectorValue>
                    }
                    {
                        isClearIconVisible &&
                        <CategorySelectorClearIconWrapper>
                            <XClose size={24} />
                        </CategorySelectorClearIconWrapper>
                    }
                    {
                        isDropdownIndicatorIconVisible &&
                        <CategorySelectorDropdownIndicatorIconWrapper
                            className='chevron-icon'
                            $isDesktopClient
                        >
                            <ChevronDown size={24} />
                        </CategorySelectorDropdownIndicatorIconWrapper>
                    }
                </DesktopCategorySelectorHeader>
                {
                    isOpen &&
                    <CategorySelectorDropdown>
                        <DesktopCategorySelectorList>
                            <DesktopCategorySelectorItem className="with-link">
                                <Link
                                    href={getLinkHref('/')}
                                    passHref
                                >
                                    {t('View all templates')}
                                </Link>
                            </DesktopCategorySelectorItem>
                            {
                                listItems.map((item, idx) => (
                                    <DesktopCategorySelectorItem
                                        key={item}
                                        tabIndex={0}
                                        onMouseEnter={() => handleSelectorSubListConditions(idx, true)}
                                        onMouseLeave={() => handleSelectorSubListConditions(idx, false)}
                                        onFocus={() => handleSelectorSubListConditions(idx, true)}
                                        onBlur={() => handleSelectorSubListConditions(idx, false)}
                                    >
                                        {t(item)}
                                        <CategorySelectorItemIconWrapper $isDesktopClient>
                                            <ChevronRight size={24} />
                                        </CategorySelectorItemIconWrapper>
                                        {
                                            selectorSubListConditions[idx] &&
                                            <CategorySelectorSubDropdown>
                                                Sublist {item}
                                            </CategorySelectorSubDropdown>
                                        }
                                    </DesktopCategorySelectorItem>
                                ))
                            }
                        </DesktopCategorySelectorList>
                    </CategorySelectorDropdown>
                }
            </DesktopCategorySelector>
        );
    }
};
