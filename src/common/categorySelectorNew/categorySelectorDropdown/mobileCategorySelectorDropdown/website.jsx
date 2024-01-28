import React from 'react';
import cn from 'classnames';
import Link from 'next/link';

import {
    WebsiteCategorySelectorListItemMainLink,
    WebsiteCategorySelectorListItemButton,
    WebsiteCategorySelectorSubListItemLink
} from '../../common.styled'
import {
    RemoveScrollFromHTML,
    WebsiteMobileCategorySelectorDropdownContent,
    WebsiteMobileCategorySelectorDropdownHeader,
    WebsiteMobileCategorySelectorDropdownIconWrapper,
    WebsiteMobileCategorySelectorDropdownList,
    WebsiteMobileCategorySelectorDropdownStyled,
    WebsiteMobileCategorySelectorDropdownSubList,
    WebsiteMobileCategorySelectorDropdownTitle,
    WebsiteMobileCategorySelectorSubDropdown,
    WebsiteMobileCategorySelectorSubDropdownHeader,
    WebsiteMobileCategorySelectorSubDropdownHeaderTitle,
} from './mobileCategorySelectorDropdown.styled';
import { ChevronLeft, ChevronRight, XClose } from '@icons';
import {
    useMobileCategorySelectorDropdown
} from './useMobileCategorySelectorDropdown';

export const Website = (props) => {
    const {
        onClose,
        list,
        selectorSubListConditions,
        selectorActiveSubListIndex,
        handleSelectorSubListConditions,
        getLinkHref,
        getIsActiveCategory,
    } = props;

    const {
        t,
        onBack,
        firstListFocusTrapRef,
        lastListFocusTrapRef,
        firstSubListFocusTrapRef,
        lastSubListFocusTrapRef,
        onKeyDown,
    } = useMobileCategorySelectorDropdown({
        handleSelectorSubListConditions,
        selectorActiveSubListIndex
    });

    return (
        <WebsiteMobileCategorySelectorDropdownStyled>
            <div
                tabIndex={0}
                aria-hidden={true}
                ref={firstListFocusTrapRef}
                onKeyDown={onKeyDown('first-list-trap')}
            />
            <RemoveScrollFromHTML />
            <WebsiteMobileCategorySelectorDropdownContent>
                <WebsiteMobileCategorySelectorDropdownHeader>
                    <WebsiteMobileCategorySelectorDropdownTitle>
                        {t('Categories')}
                    </WebsiteMobileCategorySelectorDropdownTitle>
                    <WebsiteMobileCategorySelectorDropdownIconWrapper
                        onClick={onClose}
                    >
                        <XClose size={24} />
                    </WebsiteMobileCategorySelectorDropdownIconWrapper>
                </WebsiteMobileCategorySelectorDropdownHeader>
                <WebsiteMobileCategorySelectorDropdownList>
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
                            <li key={item.title}>
                                <WebsiteCategorySelectorListItemButton
                                    onClick={() => {
                                        handleSelectorSubListConditions(idx, true);
                                    }}
                                >
                                    {t(item.title)}
                                    <WebsiteMobileCategorySelectorDropdownIconWrapper
                                        $isItemIcon
                                        as='div'
                                    >
                                        <ChevronRight size={24} />
                                    </WebsiteMobileCategorySelectorDropdownIconWrapper>
                                </WebsiteCategorySelectorListItemButton>
                                {
                                    selectorSubListConditions[idx] &&
                                    <WebsiteMobileCategorySelectorSubDropdown>
                                        <div
                                            tabIndex={0}
                                            aria-hidden={true}
                                            ref={firstSubListFocusTrapRef}
                                            onKeyDown={onKeyDown('first-sub-list-trap')}
                                        />
                                        <WebsiteMobileCategorySelectorSubDropdownHeader>
                                            <WebsiteMobileCategorySelectorDropdownIconWrapper
                                                onClick={onBack}
                                            >
                                                <ChevronLeft size={24} />
                                            </WebsiteMobileCategorySelectorDropdownIconWrapper>
                                            <WebsiteMobileCategorySelectorSubDropdownHeaderTitle>
                                                {t(item.title)}
                                            </WebsiteMobileCategorySelectorSubDropdownHeaderTitle>
                                            <WebsiteMobileCategorySelectorDropdownIconWrapper
                                                onClick={onClose}
                                            >
                                                <XClose size={24} />
                                            </WebsiteMobileCategorySelectorDropdownIconWrapper>
                                        </WebsiteMobileCategorySelectorSubDropdownHeader>
                                        <WebsiteMobileCategorySelectorDropdownSubList>
                                            {
                                                item.items.map(data => (
                                                    <li key={data.id}>
                                                        <Link
                                                            href={getLinkHref(item.itemPrefixForHref + data.attributes.urlReq)}
                                                            passHref
                                                        >
                                                            <WebsiteCategorySelectorSubListItemLink
                                                                className={
                                                                    cn({
                                                                        'selected': getIsActiveCategory(data.attributes[item.itemTitleKey]),
                                                                    })
                                                                }
                                                            >
                                                                {data.attributes[item.itemTitleKey]}
                                                            </WebsiteCategorySelectorSubListItemLink>
                                                        </Link>
                                                    </li>
                                                ))
                                            }
                                        </WebsiteMobileCategorySelectorDropdownSubList>
                                        <div
                                            tabIndex={0}
                                            aria-hidden={true}
                                            ref={lastSubListFocusTrapRef}
                                            onKeyDown={onKeyDown('last-sub-list-trap')}
                                        />
                                    </WebsiteMobileCategorySelectorSubDropdown>
                                }
                            </li>
                        ))
                    }
                </WebsiteMobileCategorySelectorDropdownList>
            </WebsiteMobileCategorySelectorDropdownContent>
            <div
                tabIndex={0}
                aria-hidden={true}
                ref={lastListFocusTrapRef}
                onKeyDown={onKeyDown('last-list-trap')}
            />
        </WebsiteMobileCategorySelectorDropdownStyled>
    );
};
