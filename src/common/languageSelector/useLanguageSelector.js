import { useRouter } from 'next/router';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { useIsDesktopClient } from 'src/hooks';

export const useLanguageSelector = () => {
    const router = useRouter();
    const { i18n } = useTranslation();

    const { isDesktopClient } = useIsDesktopClient();

    const [isOpen, setIsOpen] = useState(false);
    const [websiteLanguageSelectorTimeoutId, setWebsiteLanguageSelectorTimeoutId] = useState(null);

    const desktopLanguageSelectorRef = useRef(null);

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
        const id = setTimeout(() => {
            setIsOpen(false);
        }, 300);
        setWebsiteLanguageSelectorTimeoutId(id);
    };

    const onMouseEnter = () => {
        clearTimeout(websiteLanguageSelectorTimeoutId);
        setWebsiteLanguageSelectorTimeoutId(null);
        setIsOpen(true);
    };

    const onClick = (event) => {
        if (desktopLanguageSelectorRef.current && !desktopLanguageSelectorRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        if (isDesktopClient) {
            if (isOpen) {
                window.addEventListener('click', onClick);
            } else {
                window.removeEventListener('click', onClick);
            }
        } else {
            window.removeEventListener('click', onClick);
        }

        return () => window.removeEventListener('click', onClick);
    }, [isOpen, isDesktopClient]);

    return {
        isDesktopClient,
        isOpen,
        currentLanguage: i18n.language,
        desktopLanguageSelectorRef,
        languages,
        onToggle,
        onMouseLeave,
        onMouseEnter,
        linkHref,
    };
};

const languages = ['en', 'fr', 'de', 'es', 'pt', 'it', 'ja', 'zh'];
