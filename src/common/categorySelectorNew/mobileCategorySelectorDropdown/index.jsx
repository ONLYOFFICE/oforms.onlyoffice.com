import React from 'react';

import { useMobileCategorySelectorDropdown } from './useMobileCategorySelectorDropdown';
import {
    RemoveScrollFromHTML,
    WebsiteMobileCategorySelectorDropdownStyled,
    WebsiteMobileCategorySelectorDropdownHeader,
    WebsiteMobileCategorySelectorDropdownTitle,
    WebsiteMobileCategorySelectorDropdownIconWrapper,
} from './mobileCategorySelectorDropdown.styled';
import { XClose } from '@icons';


export const MobileCategorySelectorDropdown = (props) => {
    const {
        t,
        isDesktopClient,
    } = useMobileCategorySelectorDropdown();

    if (isDesktopClient) {
        return null;
    }

    return (
        <WebsiteMobileCategorySelectorDropdownStyled>
            <RemoveScrollFromHTML />
            <WebsiteMobileCategorySelectorDropdownHeader>
                <WebsiteMobileCategorySelectorDropdownTitle>
                    {t('Categories')}
                </WebsiteMobileCategorySelectorDropdownTitle>
                <WebsiteMobileCategorySelectorDropdownIconWrapper>
                    <XClose size={24} />
                </WebsiteMobileCategorySelectorDropdownIconWrapper>
            </WebsiteMobileCategorySelectorDropdownHeader>
        </WebsiteMobileCategorySelectorDropdownStyled>
    );
};
