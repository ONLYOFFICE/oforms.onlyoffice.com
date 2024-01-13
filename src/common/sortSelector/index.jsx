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
    WebsiteSortSelectorDropdownItemLink,
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
        websiteSortSelectorRef,
        onSort,
        onMouseLeave,
        onMouseEnter,
        onToggle,
        onKeyDown,
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
        <WebsiteSortSelector
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            ref={websiteSortSelectorRef}
        >
            <WebsiteSortSelectorHeader
                tabIndex={0}
                onClick={onToggle}
                onKeyDown={onKeyDown}
            >
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
    const {
        t,
        getLinkForSort,
        sortText,
    } = props;
    return (
        <WebsiteSortSelectorDropdown>

            <WebsiteSortSelectorDropdownItem>
                <Link
                    scroll={false}
                    href={getLinkForSort('asc')}
                    passHref
                >
                    <WebsiteSortSelectorDropdownItemLink
                        className={cn({ 'active': sortText === 'NameA-Z' })}
                    >
                        {t('NameA-Z')}
                    </WebsiteSortSelectorDropdownItemLink>
                </Link>
            </WebsiteSortSelectorDropdownItem>

            <WebsiteSortSelectorDropdownItem>
                <Link
                    scroll={false}
                    href={getLinkForSort('desc')}
                    passHref
                >
                    <WebsiteSortSelectorDropdownItemLink
                        className={cn({ 'active': sortText === 'NameZ-A' })}
                    >
                        {t('NameZ-A')}
                    </WebsiteSortSelectorDropdownItemLink>
                </Link>
            </WebsiteSortSelectorDropdownItem>

        </WebsiteSortSelectorDropdown>
    );
};
