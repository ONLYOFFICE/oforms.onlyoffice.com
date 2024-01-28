import React from 'react';

import { Desktop } from './desktop'
import { Website } from './website'

import { useCategorySelectorDropdown } from './useCategorySelectorDropdown';
import {
    MobileCategorySelectorDropdown,
} from './mobileCategorySelectorDropdown';

export const CategorySelectorDropdown = (props) => {
    const {
        types,
        categories,
        compilations,
        categoryName,
        isTablet,
        isMobile,
        onClose,
    } = props;

    const {
        t,
        list,
        selectorSubListConditions,
        selectorActiveSubListIndex,
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

    // for desktop client in mobile version and tablet version for website in mobile version
    if (
        (isDesktopClient && (isMobile || isTablet)) ||
        (!isDesktopClient && isMobile)
    ) {
        return (
            <MobileCategorySelectorDropdown
                onClose={onClose}
                list={list}
                selectorSubListConditions={selectorSubListConditions}
                selectorActiveSubListIndex={selectorActiveSubListIndex}
                handleSelectorSubListConditions={handleSelectorSubListConditions}
                getLinkHref={getLinkHref}
                getIsActiveCategory={getIsActiveCategory}
            />
        );
    }

    if (isDesktopClient) {
        return (
            <Desktop
                t={t}
                list={list}
                selectorSubListConditions={selectorSubListConditions}
                handleSelectorSubListConditions={handleSelectorSubListConditions}
                getLinkHref={getLinkHref}
                getIsActiveCategory={getIsActiveCategory}
            />
        );
    }

    return (
        <Website
            t={t}
            list={list}
            selectorSubListConditions={selectorSubListConditions}
            handleSelectorSubListConditions={handleSelectorSubListConditions}
            getLinkHref={getLinkHref}
            getIsActiveCategory={getIsActiveCategory}
            isTablet={isTablet}
        />
    );
};
