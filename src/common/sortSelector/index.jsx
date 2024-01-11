import React from 'react';
import Link from 'next/link';
import cn from 'classnames';

import {
    DesktopSortSelector,
    DesktopSortSelectorIconWrapper,
    WebsiteSortSelector,
    WebsiteSortSelectorDropdown,
    WebsiteSortSelectorDropdownItem,
    WebsiteSortSelectorHeader,
    WebsiteSortSelectorIconWrapper,
    WebsiteSortSelectorLabel,
    WebsiteSortSelectorValue,
} from './sortSelector.styled';
import { ChevronDown, SortAsc, SortDesc } from '@icons';
import { useSortSelector } from './useSortSelector';

export const SortSelector = () => {
    const {
        t,
        isDesktopClient,
        isOpen,
        sortOrder,
        sortText,
        onSort,
        onMouseLeave,
        onMouseEnter,
        onToggle,
        getLinkForSort,
    } = useSortSelector()

    if (isDesktopClient) {
        return (
            <DesktopSortSelector>
                <DesktopSortSelectorIconWrapper onClick={onSort}>
                    {sortOrder === 'asc' ? <SortAsc size={24} /> : <SortDesc size={24} />}
                </DesktopSortSelectorIconWrapper>
            </DesktopSortSelector>
        );
    }

    return (
        <WebsiteSortSelector onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            <WebsiteSortSelectorHeader onClick={onToggle}>
                <WebsiteSortSelectorLabel>{t('SortBy')}</WebsiteSortSelectorLabel>
                <WebsiteSortSelectorValue>{t(sortText)}</WebsiteSortSelectorValue>
                <WebsiteSortSelectorIconWrapper isOpen={isOpen}>
                    <ChevronDown size={24} />
                </WebsiteSortSelectorIconWrapper>
            </WebsiteSortSelectorHeader>
            {
                isOpen &&
                <WebsiteSortSelectorDropdownComponent
                    t={t}
                    getLinkForSort={getLinkForSort}
                    sortText={sortText}
                />
            }
        </WebsiteSortSelector>
    );
};

const WebsiteSortSelectorDropdownComponent = (props) => {
    const { t, getLinkForSort, sortText } = props;
    return (
        <WebsiteSortSelectorDropdown>
            <WebsiteSortSelectorDropdownItem className={cn({ 'active': sortText === 'NameA-Z' })}>
                <Link scroll={false} href={getLinkForSort('asc')}>{t('NameA-Z')}</Link>
            </WebsiteSortSelectorDropdownItem>
            <WebsiteSortSelectorDropdownItem className={cn({ 'active': sortText === 'NameZ-A' })}>
                <Link scroll={false} href={getLinkForSort('desc')}>{t('NameZ-A')}</Link>
            </WebsiteSortSelectorDropdownItem>
        </WebsiteSortSelectorDropdown>
    );
};
