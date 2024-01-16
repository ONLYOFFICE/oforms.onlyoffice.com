import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useState } from 'react';

export const useSearchArea = () => {
    const { t } = useTranslation('common');
    const router = useRouter();

    const isSearchPage = router.pathname === '/searchresult' && !!router.query.query;

    const [isFocused, setIsFocused] = useState(isSearchPage || 'initial');
    const [isWithoutAnimation, setIsWithoutAnimation] = useState(isSearchPage);
    const [inputValue, setInputValue] = useState(isSearchPage ? router.query.query : '');

    const onFocus = () => {
        setIsFocused(true);

        setIsWithoutAnimation(false);
    };

    const onBlur = () => {
        if (inputValue === '') setIsFocused(false);

        setIsWithoutAnimation(false);
    };

    const onChange = (event) => {
        setInputValue(event.target.value);
    };

    const onSubmit = (event) => {
        event.preventDefault();

        const trimmedValue = inputValue.trim();

        if (trimmedValue.length >= 3) {
            router.push(`/searchresult?query=${trimmedValue}`, undefined, { shallow: true });
        } else if (trimmedValue === '' && isSearchPage) {
            router.push('/');
        }
    };

    return {
        t,
        isFocused,
        isWithoutAnimation,
        inputValue,
        onFocus,
        onBlur,
        onSubmit,
        onChange,
    };
};
