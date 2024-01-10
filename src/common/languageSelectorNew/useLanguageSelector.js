import { useRouter } from 'next/router';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'next-i18next';

export const useLanguageSelector = () => {
    const router = useRouter();
    const { i18n } = useTranslation();

    const isDesktopClient = router.query.desktop === 'true';

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

    const onOpen = () => {
        setIsOpen(true);
    };

    const onClose = () => {
        setIsOpen(false);
    };

    const onToggle = () => {
        setIsOpen(prevState => !prevState);
    };

    const onMouseLeave = () => {
        const id = setTimeout(() => {
            onClose();
        }, 300);
        setWebsiteLanguageSelectorTimeoutId(id);
    };

    const onMouseEnter = () => {
        clearTimeout(websiteLanguageSelectorTimeoutId);
        setWebsiteLanguageSelectorTimeoutId(null);
        onOpen();
    };

    const onClick = (event) => {
        if (desktopLanguageSelectorRef.current && !desktopLanguageSelectorRef.current.contains(event.target)) {
            onClose();
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
