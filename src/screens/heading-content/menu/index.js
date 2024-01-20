import {
    HeadingSubmitLink,
    StyledHeading,
    HeadingSelectorsWrapper,
    HeadingSelectorsBox
} from './styled-menu';
import { useState, useEffect } from 'react';
import Nav from './nav/nav';
import { LanguageSelector } from 'src/common/languageSelector';
import ExternalLink from '@common/link';
import { ReactSVG } from 'react-svg';
import { PhoneInfo } from '@components/website/phoneInfo';
import Link from 'next/link';

const Menu = ({ t, locale, template, stateMobile, setStateMobile, isInvert }) => {
    const [windowCheck, setWindowCheck] = useState('undefined');

    const logo = template
        ? 'https://static-oforms.onlyoffice.com/images/logo/logo-black.react.svg'
        : 'https://static-oforms.onlyoffice.com/images/logo/logo-white.react.svg';
    const curLang = `https://www.onlyoffice.com${locale === 'en' ? '' : `/${locale}`}`;

    useEffect(() => {
        if (typeof window !== windowCheck) {
            setWindowCheck(window.innerWidth <= 1050);
        }
        ;
    }, [windowCheck]);

    useEffect(() => {
        window.addEventListener('touchstart', handleClickOutside);

        return () => {
            window.removeEventListener('touchstart', handleClickOutside);
        };
    }, [stateMobile]);

    const toggleMobile = () => {
        setStateMobile(true);
    };

    const onCloseMenu = () => {
        setStateMobile(false);
    };

    const handleClickOutside = (e) => {
        if (windowCheck && stateMobile && !e.target.closest('.nav-item-links')) {
            onCloseMenu();
        }
        ;
    };

    return (
        <StyledHeading className={`navbar ${stateMobile ? 'is-open' : ''} ${!template ? 'main' : ''}`}
                       onMouseLeave={onCloseMenu}>
            <button onClick={toggleMobile} className='nav-btn-mobile'>
                <ReactSVG src='/icons/mob-menu.svg' />
            </button>
            <ExternalLink className='nav-item-logo' href={curLang}>
                <img src={logo} alt='logo' />
            </ExternalLink>
            <div className='overlay'></div>
            <Nav locale={locale} t={t} />
            <HeadingSelectorsWrapper className="nav-selector-wrapper">
                <HeadingSelectorsBox>
                    <PhoneInfo className="phone-menu" isInvert={isInvert} />
                    <LanguageSelector isInvert={isInvert} />
                </HeadingSelectorsBox>
                <Link href="/form-submit" passHref>
                    <HeadingSubmitLink
                        className={isInvert ? 'inverted' : undefined}
                        href={``}
                    >
                        {t('Submit form')}
                    </HeadingSubmitLink>
                </Link>
            </HeadingSelectorsWrapper>
        </StyledHeading>
    );
};

export default Menu;
