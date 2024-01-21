import React from 'react';
import { useTranslation } from 'next-i18next';

import { AdventAnnounceDesc, AdventAnnounceLink } from './adventAnnounce.styled';

export const AdventAnnounce = ({isMenuOpen}) => {
    const {
        t,
        i18n: { language },
    } = useTranslation('common');

    const getHref = () => {
        switch (language) {
            case 'fr':
                return 'https://www.onlyoffice.com/blog/fr/2023/12/onlyoffice-docspace-2-0';
            case 'de':
                return 'https://www.onlyoffice.com/blog/de/2023/12/onlyoffice-docspace-2-0-veroeffentlicht';
            case 'es':
                return 'https://www.onlyoffice.com/blog/es/2023/12/disponible-onlyoffice-docspace-2-0';
            case 'pt-br':
                return 'https://www.onlyoffice.com/blog/pt-br/2023/12/onlyoffice-docspace-2-0-disponivel';
            case 'it':
                return 'https://www.onlyoffice.com/blog/it/2023/12/onlyoffice-docspace-2-0';
            default:
                return 'https://www.onlyoffice.com/blog/2023/12/onlyoffice-docspace-2-0-released';
        }
    };

    return (
        <AdventAnnounceLink href={getHref()}>
            <AdventAnnounceDesc dangerouslySetInnerHTML={{ __html: t("AdventAnnounceDesktop")}} />
        </AdventAnnounceLink>
    );
};
