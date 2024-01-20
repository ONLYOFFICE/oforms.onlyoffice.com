import React from 'react';
import cn from 'classnames';
import Link from 'next/link';

import {
    LanguageSelectorFlag,
    LanguageSelectorIconWrapper,
    LanguageSelectorStyled,
    LanguageSelectorHeader,
    DesktopLanguageSelectorList,
    DesktopLanguageSelectorItemLink,
    WebsiteLanguageSelectorList,
    WebsiteLanguageSelectorItemLink,
} from './languageSelector.styled';
import { useLanguageSelector } from './useLanguageSelector';
import { ChevronDown, Triangle } from '@icons';

export const LanguageSelector = ({isInvert, className}) => {
    const {
        isDesktopClient,
        isOpen,
        currentLanguage,
        languageSelectorRef,
        languages,
        linkHref,
        onToggle,
        onMouseEnter,
        onMouseLeave,
        onKeyDown,
    } = useLanguageSelector();

    if (isDesktopClient) {
        return (
            <LanguageSelectorStyled
                ref={languageSelectorRef}
                className={cn({ 'expanded': isOpen, className })}
                $isDesktopClient
            >
                <LanguageSelectorHeader
                    tabIndex={0}
                    onClick={onToggle}
                    onKeyDown={onKeyDown}
                    $isDesktopClient
                >
                    <LanguageSelectorFlag className={currentLanguage} />
                    <LanguageSelectorIconWrapper $isDesktopClient className='chevron-icon'>
                        <ChevronDown size={24} />
                    </LanguageSelectorIconWrapper>
                </LanguageSelectorHeader>
                {
                    isOpen &&
                    <DesktopLanguageSelectorList>
                        {
                            languages.map((lang, idx) => (
                                <li key={idx}>
                                    <Link href={linkHref} locale={lang} passHref>
                                        <DesktopLanguageSelectorItemLink
                                            className={cn({ 'current': lang === currentLanguage })}
                                        >
                                            <LanguageSelectorFlag className={lang} />
                                        </DesktopLanguageSelectorItemLink>
                                    </Link>
                                </li>
                            ))
                        }
                    </DesktopLanguageSelectorList>
                }
            </LanguageSelectorStyled>
        );
    }

    return (
        <LanguageSelectorStyled
            ref={languageSelectorRef}
            onMouseLeave={onMouseLeave}
            onMouseEnter={onMouseEnter}
            className={cn({ 'expanded': isOpen })}
        >
            <LanguageSelectorHeader
                tabIndex={0}
                onClick={onToggle}
                onKeyDown={onKeyDown}
            >
                <LanguageSelectorFlag className={currentLanguage} />
                <LanguageSelectorIconWrapper className={cn('chevron-icon', {'inverted': isInvert})}>
                    <Triangle size={8} />
                </LanguageSelectorIconWrapper>
            </LanguageSelectorHeader>
            {
                isOpen &&
                <WebsiteLanguageSelectorList>
                    {
                        languages.map((lang, idx) => (
                            <li key={idx}>
                                <Link href={linkHref} passHref locale={lang}>
                                    <WebsiteLanguageSelectorItemLink
                                        className={cn({ 'current': lang === currentLanguage })}
                                    >
                                        <LanguageSelectorFlag className={lang} />
                                    </WebsiteLanguageSelectorItemLink>
                                </Link>
                            </li>
                        ))
                    }
                </WebsiteLanguageSelectorList>
            }
        </LanguageSelectorStyled>
    );
};
