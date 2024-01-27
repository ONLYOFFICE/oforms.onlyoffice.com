import { usePageContext } from '../../../../hooks';
import { useTranslation } from 'next-i18next';

export const useMobileCategorySelectorDropdown = () => {
    const { t } = useTranslation('common');

    const { isDesktopClient } = usePageContext();

    return {
        t,
        isDesktopClient,
    };
};
