import React from 'react';

import { Website } from './website'
import { Desktop } from './desktop'
import { usePageContext } from 'src/hooks';


export const MobileCategorySelectorDropdown = (props) => {
    const {
        onClose,
        list,
        selectorSubListConditions,
        selectorActiveSubListIndex,
        handleSelectorSubListConditions,
        getLinkHref,
        getIsActiveCategory,
    } = props;
    const { isDesktopClient } = usePageContext();

    if (isDesktopClient) {
        return (
            <Desktop
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

    return (
        <Website
            onClose={onClose}
            list={list}
            selectorSubListConditions={selectorSubListConditions}
            handleSelectorSubListConditions={handleSelectorSubListConditions}
            getLinkHref={getLinkHref}
            getIsActiveCategory={getIsActiveCategory}
            selectorActiveSubListIndex={selectorActiveSubListIndex}
        />
    );
};
