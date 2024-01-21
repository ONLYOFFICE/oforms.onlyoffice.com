import { useEffect, useState } from 'react';

export const useFormGrid = () => {
    const [isWithoutActive, setIsWithoutActive] = useState(false);

    const handleWindowWidth = () => {
        setIsWithoutActive(window.innerWidth <= 1200);
    };

    useEffect(() => {
        window.addEventListener('resize', handleWindowWidth);

        return () => window.removeEventListener('resize', handleWindowWidth);
    }, []);

    return {
        isWithoutActive,
    }
};
