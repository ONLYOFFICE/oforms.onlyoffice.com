import React from 'react';
import cn from 'classnames';
import Link from 'next/link';

import { useCategorySelector } from './useCategorySelector';
import {
    CategorySelectorStyled,
    DesktopCategorySelectorClearIconWrapper,
    CategorySelectorDropdownIndicatorIconWrapper,
    CategorySelectorHeader,
    DesktopCategorySelectorLabel,
    DesktopCategorySelectorValue,
    WebsiteCategorySelectorLabel,
} from '@common/categorySelectorNew/categorySelector.styled';
import { CategorySelectorDropdown } from './categorySelectorDropdown';
import { ChevronDown, XClose } from '@icons';
import { DesktopMobileSelector } from './mobileSelectors/desktopMobileSelector';
import WebsiteMobileSelector from './mobileSelectors/websiteMobileSelector';

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
        isMobile,
        searchQuery,
        categorySelectorRef,
        theme,
        onToggle,
        onKeyDown,
        onClear,
        onMouseLeave,
        onMouseEnter,
    } = useCategorySelector({ categoryName });

    // FIXME: Rewrite mobile selectors
    if (isMobile) {
        return isDesktopClient ?
            <DesktopMobileSelector
                typeSortData={categoryName}
                types={types}
                categories={categories}
                compilations={compilations}
                categoryName={categoryName}
                theme={theme}
                queryDesktopClient={searchQuery}
            /> :
            <WebsiteMobileSelector
                typeSortData={categoryName}
                types={types}
                categories={categories}
                compilations={compilations}
            />
    }

    if(isDesktopClient) {
        return (
            <CategorySelectorStyled
                ref={categorySelectorRef}
                className={cn({ 'expanded': isOpen })}
            >
                <CategorySelectorHeader
                    onClick={onToggle}
                    onKeyDown={onKeyDown}
                    tabIndex={0}
                    $isDesktopClient
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
                        <DesktopCategorySelectorClearIconWrapper onClick={onClear}>
                            <XClose size={24} />
                        </DesktopCategorySelectorClearIconWrapper>
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
                </CategorySelectorHeader>
                {
                    isOpen &&
                    <CategorySelectorDropdown
                        types={types}
                        categories={categories}
                        compilations={compilations}
                        categoryName={categoryName}
                    />
                }
            </CategorySelectorStyled>
        );
    }

    return (
        <CategorySelectorStyled
            ref={categorySelectorRef}
            className={cn({ 'expanded': isOpen })}
            onMouseLeave={onMouseLeave}
            onMouseEnter={onMouseEnter}
        >
            <CategorySelectorHeader
                onClick={onToggle}
                onKeyDown={onKeyDown}
                tabIndex={0}
            >
                <WebsiteCategorySelectorLabel>
                    {t('Categories')}
                </WebsiteCategorySelectorLabel>
                <CategorySelectorDropdownIndicatorIconWrapper
                    className='chevron-icon'
                >
                    <ChevronDown size={24} />
                </CategorySelectorDropdownIndicatorIconWrapper>
            </CategorySelectorHeader>
            {
                isOpen &&
                <CategorySelectorDropdown
                    types={types}
                    categories={categories}
                    compilations={compilations}
                    categoryName={categoryName}
                />
            }
        </CategorySelectorStyled>
    )
};
