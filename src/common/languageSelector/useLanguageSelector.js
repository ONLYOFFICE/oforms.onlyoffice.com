import { useRouter } from 'next/router';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { usePageContext } from 'src/hooks';

export const useLanguageSelector = () => {
    const router = useRouter();
    const { i18n: { language } } = useTranslation('common');

    const { isDesktopClient } = usePageContext();

    const [isOpen, setIsOpen] = useState(false);

    const languageSelectorRef = useRef(null);

    const linkHref = useMemo(() => {
        const theme = router.query.theme;

        const href = {
            pathname: '/',
            query: {},
        };

        if (isDesktopClient) {
            href.query.desktop = true;

            if (theme) href.query.theme = theme;
        }

        return href;
    }, [isDesktopClient, router.query]);

    const onToggle = () => {
        setIsOpen(prevState => !prevState);
    };

    const onMouseLeave = () => {
        setIsOpen(false);
    };

    const onMouseEnter = () => {
        setIsOpen(true);
    };

    const onClick = (event) => {
        if (languageSelectorRef.current && !languageSelectorRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    const onKeyDown = (event) => {
        if (event.code === 'Enter' || event.code === 'Space') {
            event.preventDefault();
            onToggle();
        }
    };

    useEffect(() => {
        if (isOpen) {
            window.addEventListener('click', onClick);
        } else {
            window.removeEventListener('click', onClick);
        }

        return () => window.removeEventListener('click', onClick);
    }, [isOpen, isDesktopClient]);

    return {
        isDesktopClient,
        isOpen,
        currentLanguage: language,
        languageSelectorRef,
        languages,
        onToggle,
        onMouseLeave,
        onMouseEnter,
        onKeyDown,
        linkHref,
    };
};

const languages = ['en', 'fr', 'de', 'es', 'pt', 'it', 'ja', 'zh'];
