import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'next-i18next';

export const usePhoneInfo = () => {
    const { t, i18n: { language } } = useTranslation('common');


    const phoneInfoStyledRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);

    const languageForLink = language === 'en' ? '/' : `/${language}/`;

    const onClick = (event) => {
        if (phoneInfoStyledRef.current && !phoneInfoStyledRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    const onToggle = () => {
        setIsOpen(prevState => !prevState);
    };

    const onMouseEnter = () => {
        setIsOpen(true);
    };

    const onMouseLeave = () => {
        setIsOpen(false);
    };

    useEffect(() => {
        if (isOpen) {
            window.addEventListener('click', onClick);
        } else {
            window.removeEventListener('click', onClick);
        }

        return () => window.removeEventListener('click', onClick);
    }, [isOpen]);

    return {
        t,
        isOpen,
        languageForLink,
        phoneInfoStyledRef,
        onToggle,
        onMouseEnter,
        onMouseLeave,
    };
};
