import { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';

export const useFormGrid = () => {
    const { t } = useTranslation('common')

    const [isWithoutActive, setIsWithoutActive] = useState(false);

    const handleWindowWidth = () => {
        setIsWithoutActive(window.innerWidth <= 1200);
    };

    useEffect(() => {
        window.addEventListener('resize', handleWindowWidth);

        return () => window.removeEventListener('resize', handleWindowWidth);
    }, []);

    return {
        t,
        isWithoutActive,
    }
};
