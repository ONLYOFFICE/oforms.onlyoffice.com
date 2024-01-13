import { useTranslation } from 'next-i18next';

import { useIsDesktopClient } from 'src/hooks';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

const listItems = ['Forms by branch', 'Forms by type', 'Popular Compilations'];


export const useCategorySelector = ({ categoryName }) => {
    const { t } = useTranslation('common');
    const router = useRouter();

    const { isDesktopClient } = useIsDesktopClient();

    const [isOpen, setIsOpen] = useState(false);
    const [timeoutId, setTimeoutId] = useState(null);
    const [selectorSubListConditions, setSelectorSubListConditions] = useState(new Array(listItems.length).fill(false));

    const categorySelectorRef = useRef(null);

    const searchQuery = router.query.query;
    const isValueVisible = (categoryName !== undefined && router.pathname !== '/searchresult') ||
        (router.pathname === '/searchresult' && searchQuery !== undefined);
    const isClearIconVisible =
        (router.pathname === '/searchresult' && router.query.query !== undefined) || categoryName !== undefined;
    const isDropdownIndicatorIconVisible = !isClearIconVisible;

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

    const handleSelectorSubListConditions = (index, state) => {
        setSelectorSubListConditions(() => {
            const newState = new Array(listItems.length).fill(false);
            newState[index] = state;

            return newState;
        });
    };

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
        listItems,
        selectorSubListConditions,
        onMouseEnter,
        onMouseLeave,
        onToggle,
        onKeyDown,
        getLinkHref,
        handleSelectorSubListConditions,
    };
};
