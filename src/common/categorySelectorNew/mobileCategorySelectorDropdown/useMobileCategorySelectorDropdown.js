import { usePageContext } from 'src/hooks';
import { useTranslation } from 'next-i18next';

export const useMobileCategorySelectorDropdown = () => {
    const { t } = useTranslation('common');

    const { isDesktopClient } = usePageContext();

    return {
        t,
        isDesktopClient,
    };
};
