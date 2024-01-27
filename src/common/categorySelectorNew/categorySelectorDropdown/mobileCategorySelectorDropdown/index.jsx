import React from 'react';

import { useMobileCategorySelectorDropdown } from './useMobileCategorySelectorDropdown';
import {
    RemoveScrollFromHTML,
    WebsiteMobileCategorySelectorDropdownStyled,
    WebsiteMobileCategorySelectorDropdownHeader,
    WebsiteMobileCategorySelectorDropdownTitle,
    WebsiteMobileCategorySelectorDropdownIconWrapper,
    WebsiteMobileCategorySelectorDropdownList,
    // WebsiteMobileCategorySelectorDropdownItem,
    // WebsiteMobileCategorySelectorDropdownContent,
    // WebsiteMobileCategorySelectorDropdownSubList,
    // WebsiteMobileCategorySelectorDropdownSubItem, WebsiteMobileCategorySelectorSubDropdown,
} from './mobileCategorySelectorDropdown.styled';
import { ChevronRight, XClose } from '@icons';


export const MobileCategorySelectorDropdown = (props) => {
    const {
        onClose,
        list,
        selectorSubListConditions,
        handleSelectorSubListConditions
    } = props;
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
            {/*<WebsiteMobileCategorySelectorDropdownContent>*/}
            {/*    <WebsiteMobileCategorySelectorDropdownHeader>*/}
            {/*        <WebsiteMobileCategorySelectorDropdownTitle>*/}
            {/*            {t('Categories')}*/}
            {/*        </WebsiteMobileCategorySelectorDropdownTitle>*/}
            {/*        <WebsiteMobileCategorySelectorDropdownIconWrapper*/}
            {/*            onClick={onClose}*/}
            {/*        >*/}
            {/*            <XClose size={24} />*/}
            {/*        </WebsiteMobileCategorySelectorDropdownIconWrapper>*/}
            {/*    </WebsiteMobileCategorySelectorDropdownHeader>*/}
            {/*    <WebsiteMobileCategorySelectorDropdownList>*/}
            {/*        {*/}
            {/*            list.map((item, idx) => (*/}
            {/*                <WebsiteMobileCategorySelectorDropdownItem*/}
            {/*                    key={item.title}*/}
            {/*                    tabIndex={0}*/}
            {/*                    onClick={() => handleSelectorSubListConditions(idx, true)}*/}
            {/*                >*/}
            {/*                    {t(item.title)}*/}
            {/*                    <WebsiteMobileCategorySelectorDropdownIconWrapper*/}
            {/*                        $isItemIcon*/}
            {/*                        as="div"*/}
            {/*                    >*/}
            {/*                        <ChevronRight size={24} />*/}
            {/*                    </WebsiteMobileCategorySelectorDropdownIconWrapper>*/}
            {/*                    {*/}
            {/*                        selectorSubListConditions[idx] &&*/}
            {/*                        <WebsiteMobileCategorySelectorSubDropdown>*/}
            {/*                            <WebsiteMobileCategorySelectorDropdownSubList>*/}
            {/*                                {*/}
            {/*                                    item.items.map(data => (*/}
            {/*                                        <WebsiteMobileCategorySelectorDropdownSubItem key={data.id}>*/}
            {/*                                            {data.attributes[item.itemTitleKey]}*/}
            {/*                                        </WebsiteMobileCategorySelectorDropdownSubItem>*/}
            {/*                                    ))*/}
            {/*                                }*/}
            {/*                            </WebsiteMobileCategorySelectorDropdownSubList>*/}
            {/*                        </WebsiteMobileCategorySelectorSubDropdown>*/}
            {/*                    }*/}
            {/*                </WebsiteMobileCategorySelectorDropdownItem>*/}
            {/*            ))*/}
            {/*        }*/}
            {/*    </WebsiteMobileCategorySelectorDropdownList>*/}
            {/*</WebsiteMobileCategorySelectorDropdownContent>*/}
        </WebsiteMobileCategorySelectorDropdownStyled>
    );
};
