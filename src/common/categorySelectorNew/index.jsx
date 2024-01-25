import React from 'react';
import cn from 'classnames';

import { CategorySelectorDropdown } from './categorySelectorDropdown';
import { MobileCategorySelectorDropdown } from './mobileCategorySelectorDropdown';

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
import { ChevronDown, XClose } from '@icons';

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
        isTablet,
        isMobile,
        searchQuery,
        categorySelectorRef,
        onToggle,
        onKeyDown,
        onClear,
        onMouseLeave,
        onMouseEnter,
    } = useCategorySelector({ categoryName });

    if (isDesktopClient) {
        return (
            <CategorySelectorStyled
                ref={categorySelectorRef}
                className={cn({ 'expanded': isOpen })}
                $isDesktopClient
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
                <CombinedCategorySelectorDropdown
                    isOpen={isOpen}
                    isMobile={isMobile}

                    isTablet={isTablet}
                    isDesktopClient

                    types={types}
                    categories={categories}
                    compilations={compilations}
                    categoryName={categoryName}
                />
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
            <CombinedCategorySelectorDropdown
                isOpen={isOpen}
                isMobile={isMobile}

                isTablet={isTablet}

                types={types}
                categories={categories}
                compilations={compilations}
                categoryName={categoryName}
            />
        </CategorySelectorStyled>
    );
};

const CombinedCategorySelectorDropdown = (props) => {
    const {
        isOpen,
        isMobile,
        isDesktopClient,
        isTablet,
        ...categorySelectorDropdownProps
    } = props;

    if (!isOpen) return null;

    // for desktop client in mobile and tablet versions or for website in mobile version
    if (
        (isDesktopClient && (isMobile || isTablet)) ||
        (!isDesktopClient && isMobile)
    ) {
        return (
            <MobileCategorySelectorDropdown isTablet={isTablet} {...categorySelectorDropdownProps} />
        );
    }

    return (
        <CategorySelectorDropdown isTablet={isTablet} {...categorySelectorDropdownProps} />
    );
};
