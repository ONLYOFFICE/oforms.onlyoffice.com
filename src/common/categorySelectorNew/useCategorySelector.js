import { useTranslation } from 'next-i18next';

import { useIsDesktopClient } from 'src/hooks';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

const getIsValueVisible = (isDesktopClient, categoryName, pathname, searchQuery) => {
    const isSearchResultRoute = pathname === '/searchresult';

    const isCategoryVisible = categoryName !== undefined && !isSearchResultRoute;

    const isSearchQueryVisible = isSearchResultRoute && searchQuery !== undefined;

    return isCategoryVisible || isSearchQueryVisible;
}

export const useCategorySelector = ({ categoryName }) => {
    const { t } = useTranslation('common');
    const router = useRouter();

    const { isDesktopClient } = useIsDesktopClient();

    const [isOpen, setIsOpen] = useState(false);
    const [timeoutId, setTimeoutId] = useState(null);

    const categorySelectorRef = useRef(null);

    const searchQuery = router.query.query;
    const isValueVisible = getIsValueVisible(isDesktopClient, categoryName, router.pathname, searchQuery)
    const isClearIconVisible = isValueVisible;
    const isDropdownIndicatorIconVisible = !isValueVisible;

    const onToggle = () => {
        setIsOpen(prevState => !prevState);
    };

    const onMouseEnter = () => {
        clearTimeout(timeoutId);
        setTimeoutId(null);
        setIsOpen(true);
    };

    const onMouseLeave = () => {
        const id = setTimeout(() => {
            setIsOpen(false);
        }, 300);
        setTimeoutId(id);
    };

    const onKeyDown = (event) => {
        if (event.code === 'Enter' || event.code === 'Space') {
            event.preventDefault();
            onToggle();
        }
    };

    const onClick = (event) => {
        if (categorySelectorRef.current && !categorySelectorRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    const onClear = (event) => {
        event.stopPropagation();

        const theme = router.query.theme;
        const query = {};

        if (isDesktopClient) {
            query.desktop = true;

            if (theme) {
                query.theme = theme;
            }
        }

        router.push({ pathname: '/', query });
    };

    useEffect(() => {
        if (isOpen) {
            window.addEventListener('click', onClick);
        } else {
            window.removeEventListener('click', onClick);
        }

        return () => {
            window.removeEventListener('click', onClick);
        };
    }, [isOpen]);

    return {
        t,
        isDesktopClient,
        isValueVisible,
        isClearIconVisible,
        isDropdownIndicatorIconVisible,
        isOpen,
        searchQuery,
        categorySelectorRef,
        onMouseEnter,
        onMouseLeave,
        onToggle,
        onKeyDown,
        onClear,
    };
};
