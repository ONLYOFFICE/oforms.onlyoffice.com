import React, {useEffect, useMemo, useState} from "react";
import {
    LanguageSelectorDropdown,
    LanguageSelectorHeader,
    LanguageSelectorLink,
    LanguageSelectorStyled
} from "./languageSelector.styled";
import {Flag} from "@icons/flags";
import {useRouter} from "next/router";
import {ChevronDown, Triangle} from "@icons";
import Link from "next/link";
import languages from "@config/languages.json";
import classNames from "classnames";

export const LanguageSelector = (props) => {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false)
    const isDesktopClient = router.query.desktop === 'true'
    const theme = router.query.theme

    const linkHref = useMemo(() => {
        const result = {
            pathname: '/',
            query: {}
        }

        if (isDesktopClient) {
            result.query.desktop = true
        }

        if (theme !== undefined) {
            result.query.theme = theme
        }

        return result
    }, [theme, isDesktopClient])

    const handleClick = (e) => {
        if(!e.target.closest('.lang-selector__header')) {
            setIsOpen(false)
        }
    }

    useEffect(() => {
        window.addEventListener('click', handleClick)

        return () => window.removeEventListener('click', handleClick)
    }, [])

    return (
        <LanguageSelectorStyled
            onClick={handleClick}
            className={classNames('lang-selector', {'open': isOpen})}
            isOpen={isOpen}
            isDesktopClient={isDesktopClient}
        >
            <LanguageSelectorHeader
                onClick={() => setIsOpen(prev => !prev)}
                className="lang-selector__header"
            >
                <Flag
                    locale={router.locale}
                    size={24}
                    className="lang-selector__flag"
                />
                {
                    isDesktopClient ?
                        <ChevronDown
                            size={24}
                            className="lang-selector__icon"
                        />
                        :
                        <Triangle
                            size={12}
                            className="lang-selector__icon"
                        />
                }
            </LanguageSelectorHeader>
            <LanguageSelectorDropdown className="lang-selector__dropdown">
                {
                    languages.map(lang => (
                        <Link
                            key={lang.key}
                            href={linkHref}
                            locale={lang.shortKey}
                            passHref
                        >
                            <LanguageSelectorLink
                                className={classNames('lang-selector__link', { 'active': lang.shortKey === router.locale })}
                            >
                                <Flag locale={lang.shortKey} size={24}/>
                            </LanguageSelectorLink>
                        </Link>
                    ))
                }
            </LanguageSelectorDropdown>
        </LanguageSelectorStyled>
    )
}