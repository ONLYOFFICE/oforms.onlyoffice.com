import { useTranslation } from 'next-i18next';

import { usePageContext } from 'src/hooks';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

export const TABLET_BREAKPOINT = 1000;
export const MOBILE_BREAKPOINT = 700;

const getIsValueVisible = (isDesktopClient, categoryName, pathname, searchQuery) => {
    const isSearchResultRoute = pathname === '/searchresult';

    const isCategoryVisible = categoryName !== undefined && !isSearchResultRoute;

    const isSearchQueryVisible = isSearchResultRoute && searchQuery !== undefined;

    return isCategoryVisible || isSearchQueryVisible;
};

export const useCategorySelector = ({ categoryName }) => {
    const { t } = useTranslation('common');
    const router = useRouter();

    const { isDesktopClient } = usePageContext();

    const [isMobile, setIsMobile] = useState(false);
    const [isTablet, setIsTablet] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [timeoutId, setTimeoutId] = useState(null);

    const categorySelectorRef = useRef(null);

    const searchQuery = router.query.query;
    const isValueVisible = getIsValueVisible(isDesktopClient, categoryName, router.pathname, searchQuery);
    const isClearIconVisible = isValueVisible;
    const isDropdownIndicatorIconVisible = !isValueVisible;

    const onToggle = () => {
        setIsOpen(prevState => !prevState);
    };

    const onMouseEnter = () => {
        if (isMobile) return;

        clearTimeout(timeoutId);
        setTimeoutId(null);
        setIsOpen(true);
    };

    const onMouseLeave = () => {
        if (isMobile) return;

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
        console.log('click');
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

    const handleWindowWidth = () => {
        setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
        setIsTablet(window.innerWidth > MOBILE_BREAKPOINT && window.innerWidth <= TABLET_BREAKPOINT);
    };

    useEffect(() => {
        handleWindowWidth();
        window.addEventListener('resize', handleWindowWidth);

        // for desktop client or for website not in mobile version
        if (
            isDesktopClient ||
            (!isDesktopClient && !isMobile)
        ) {
            if (isOpen) {
                window.addEventListener('click', onClick);
            } else {
                window.removeEventListener('click', onClick);
            }
        }
        //  for website in mobile version
        else if (!isDesktopClient && isMobile) {
            window.removeEventListener('click', onClick);
        }


        return () => {
            window.removeEventListener('resize', handleWindowWidth);
            window.removeEventListener('click', onClick);
        };
    }, [isOpen, isMobile, isDesktopClient]);

    return {
        t,
        isDesktopClient,
        isValueVisible,
        isClearIconVisible,
        isDropdownIndicatorIconVisible,
        isOpen,
        isMobile,
        isTablet,
        searchQuery,
        categorySelectorRef,
        TABLET_BREAKPOINT,
        MOBILE_BREAKPOINT,
        onMouseEnter,
        onMouseLeave,
        onToggle,
        onKeyDown,
        onClear,
    };
};
