import { useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import { usePageContext } from 'src/hooks';

export const useCategorySelectorDropdown = (props) => {
    const {
        categories,
        types,
        compilations,
        categoryName,
    } = props;

    const list = [
        {
            title: 'Forms by branch',
            items: categories.data,
            itemTitleKey: 'categorie',
            itemPrefixForHref: '/form/',
        },
        {
            title: 'Forms by type',
            items: types.data,
            itemTitleKey: 'type',
            itemPrefixForHref: '/form/types/',
        },
        {
            title: 'Popular Compilations',
            items: compilations.data,
            itemTitleKey: 'compilation',
            itemPrefixForHref: '/form/compilations/',
        },
    ];

    const router = useRouter();
    const { t } = useTranslation('common');

    const { isDesktopClient } = usePageContext();

    const [selectorSubListConditions, setSelectorSubListConditions] = useState(new Array(list.length).fill(false));

    const handleSelectorSubListConditions = (index, state) => {
        setSelectorSubListConditions(() => {
            const newState = new Array(list.length).fill(false);
            newState[index] = state;

            return newState;
        });
    };

    const getLinkHref = (pathname) => {
        const query = {};
        const theme = router.query.theme;

        if (isDesktopClient) {
            query.desktop = true;

            if (theme) query.theme = theme;
        }

        return {
            pathname,
            query,
        };
    };

    const getIsActiveCategory = (name) => categoryName && name ? name.toLowerCase() === categoryName.toLowerCase() : false;

    return {
        t,
        list,
        isDesktopClient,
        selectorSubListConditions,
        handleSelectorSubListConditions,
        getLinkHref,
        getIsActiveCategory,
    };
};
