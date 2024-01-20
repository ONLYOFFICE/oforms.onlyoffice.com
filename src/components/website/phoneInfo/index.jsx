import React from 'react';
import cn from 'classnames';

import { usePhoneInfo } from './usePhoneInfo';
import {
    PhoneInfoDropdown,
    PhoneInfoIconWrapper,
    PhoneInfoPhoneLink,
    PhoneInfoRequestCallLink,
    PhoneInfoStyled,
    PhoneInfoTitle,
} from './phoneInfo.styled';
import { Phone } from '@icons';

export const PhoneInfo = ({ isInvert, className }) => {
    const {
        t,
        isOpen,
        languageForLink,
        phoneInfoStyledRef,
        onMouseLeave,
        onMouseEnter,
        onToggle,
    } = usePhoneInfo();

    return (
        <PhoneInfoStyled
            ref={phoneInfoStyledRef}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            className={className}
        >
            <PhoneInfoIconWrapper
                className={cn({ 'inverted': isInvert, 'open': isOpen })}
                onClick={onToggle}
            >
                <Phone size={24} />
            </PhoneInfoIconWrapper>
            {
                isOpen &&
                <PhoneInfoDropdown>
                    <PhoneInfoTitle>{t('Ascensio System SIA')}</PhoneInfoTitle>
                    <PhoneInfoPhoneLink href='tel:+37163399867'>{t('Phone')}: +371 63399867</PhoneInfoPhoneLink>
                    <PhoneInfoRequestCallLink
                        href={`https://onlyoffice.com${languageForLink}call-back-form.aspx`}>{t('Request a call')}
                    </PhoneInfoRequestCallLink>
                </PhoneInfoDropdown>
            }
        </PhoneInfoStyled>
    );
};
