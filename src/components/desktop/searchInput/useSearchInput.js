import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

export const useSearchInput = () => {
    const { t } = useTranslation('common');
    const router = useRouter();

    const isSearchPage = router.pathname === '/searchresult' && !!router.query.query;

    const [isSearchInputExpanded, setIsSearchInputExpanded] = useState(isSearchPage);
    const [isSearchInputMounted, setIsSearchInputMounted] = useState(isSearchPage);
    const [isClearButtonVisible, setIsClearButtonVisible] = useState(isSearchPage);
    const [isWithoutAnimation, setIsWithoutAnimation] = useState(isSearchPage);

    const [inputValue, setInputValue] =
        useState(() => isSearchPage ? router.query.query : '');

    const inputRef = useRef(null);

    const goToPathname = (pathname = '/', query = {}) => {
        const theme = router.query.theme;
        const combinedQuery = {
            ...query,
            desktop: true,
        }

        if(theme) combinedQuery.theme = theme

        router.push({
            pathname,
            query: combinedQuery,
        })
    };

    const onToggle = () => {
        setIsWithoutAnimation(false);

        if (isSearchInputExpanded) {
            setIsSearchInputExpanded(false);
            setTimeout(() => {
                setIsSearchInputMounted(false);
            }, 160);
            setIsClearButtonVisible(false);
            return;
        }

        inputValue && setIsClearButtonVisible(true);
        setIsSearchInputMounted(true);
        setIsSearchInputExpanded(true);

        setTimeout(() => {
            inputRef.current && inputRef.current.focus();
        }, 100);
    };

    const onChange = (event) => {
        const value = event.target.value;
        setInputValue(value);

        if (value) {
            setIsClearButtonVisible(true);
        } else {
            setIsClearButtonVisible(false);
        }
    };

    const onClear = () => {
        setInputValue('');
        onToggle();
        setIsClearButtonVisible(false);
    };

    const onSubmit = (event) => {
        event.preventDefault();

        const trimmedInputValue = inputValue.trim();

        if (trimmedInputValue) {
            goToPathname('/searchresult', {query: trimmedInputValue})
        } else if(router.pathname === '/searchresult') {
            goToPathname()
        }
    };

    useEffect(() => {
        if (isSearchPage) {
            inputRef.current && inputRef.current.focus();
        }
    }, [isSearchPage]);


    return {
        t,
        isSearchInputExpanded,
        isSearchInputMounted,
        isClearButtonVisible,
        isWithoutAnimation,
        inputValue,
        inputRef,
        onToggle,
        onChange,
        onClear,
        onSubmit,
    };
};
