import { useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useIsDesktopClient } from 'src/hooks';

export const useSortSelector = () => {
    const router = useRouter();
    const { t } = useTranslation('common');

    const { isDesktopClient } = useIsDesktopClient();

    const theme = router.query.theme;
    const sortOrder = router.query._sort || 'asc';
    const sortText = sortOrder === 'asc' ? 'NameA-Z' : 'NameZ-A';

    const [closeTimeoutId, setCloseTimeoutId] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    const appTheme = useMemo(() => {
        if (theme && isDesktopClient) return theme;

        return null;
    }, [isDesktopClient, theme]);

    const getLinkForSort = (sortOrder) => {
        // initialize variable and add _sort query
        const result = {
            pathname: '/',
            query: {
                _sort: sortOrder,
            },
        };

        // check if this is a search page, if so, add search(query) query and change pathname
        if (router.pathname === '/searchresult') {
            result.pathname = '/searchresult';
            result.query.query = router.query.query;
        }

        // check if this is a category or compilations or types page, if so, change pathname
        if (router.query.hasOwnProperty('compilation')) {
            result.pathname = `/form/compilations/${router.query.compilation}`;
        } else if (router.query.hasOwnProperty('type')) {
            result.pathname = `/form/types/${router.query.type}`;
        } else if (router.query.hasOwnProperty('category')) {
            result.pathname = `/form/${router.query.category}`;
        }

        // check if this is the desktop page, if so, add desktop query
        if (isDesktopClient) {
            result.query.desktop = true;
        }

        // check if the page have a theme, if so, add this theme to the query
        if (appTheme) {
            result.query.theme = appTheme;
        }

        return result;
    };

    const onSort = () => {
        router.replace(getLinkForSort(sortOrder === 'asc' ? 'desc' : 'asc'));
    };

    const onMouseEnter = () => {
        setIsOpen(true);
        clearTimeout(closeTimeoutId);
        setCloseTimeoutId(null);
    };

    const onMouseLeave = () => {
        const id = setTimeout(() => {
            setIsOpen(false);
        }, 200);
        setCloseTimeoutId(id);
    };

    const onToggle = () => {
        setIsOpen((prev) => !prev);
    };

    return {
        t,
        getLinkForSort,
        onSort,
        onMouseEnter,
        onMouseLeave,
        onToggle,
        isOpen,
        isDesktopClient,
        sortOrder,
        sortText,
    }
};
