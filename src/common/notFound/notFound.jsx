import React, {useMemo} from "react";
import {
    NotFoundForWebsiteStyled,
    NotFoundForDesktopStyled,
    NotFoundForWebsiteIllustration,
    NotFoundForDesktopBox
} from "@common/notFound/notFound.styled";
import Text from "@common/text";
import Link from "next/link";
import {NotFound as NotFoundIllustration} from "@illustrations";
import {useTranslation} from "next-i18next";
import {useRouter} from "next/router";
import {ThemeProvider} from "styled-components";
import classic from '/src/style/themes/classicTheme.json'
import light from '/src/style/themes/lightTheme.json'
import dark from '/src/style/themes/darkTheme.json'
import contrast from '/src/style/themes/contrastDarkTheme.json'


const NotFoundForWebsite = ({t, theme}) => {
    return (
        <NotFoundForWebsiteStyled className="not-found">
            <NotFoundForWebsiteIllustration/>
            <Text as="h1" className="not-found__title">{t("404Error!")}</Text>
            <Text as="p" className="not-found__desc">
                {t("404Descdription")}
            </Text>
            <Link
                href={{
                    pathname: '/',
                    query: theme ? {theme} : undefined
                }}
                passHref
            >
                <Text as="a" className="not-found__link">
                    {t("GoToHomePage")}
                </Text>
            </Link>
        </NotFoundForWebsiteStyled>
    )
}

const NotFoundForDesktop = ({t, theme}) => {
    const isDark = theme === 'theme-dark' || theme === 'theme-contrast-dark'
    const href = {
        pathname: '/',
        query: theme ? {
            desktop: true,
            theme,
        } : {desktop: true}
    }
    return (
        <NotFoundForDesktopStyled>
            <NotFoundForDesktopBox>
                <NotFoundIllustration isDark={isDark} className="not-found__illustration"/>
                <Text as="h1" className="not-found__title">{t('Nothing-found')}</Text>
                <Link
                    href={href}
                    passHref
                >
                    <Text as="a" className="not-found__link">{t("GoToHomePage")}</Text>
                </Link>
            </NotFoundForDesktopBox>
        </NotFoundForDesktopStyled>
    )
}

export const NotFound = () => {
    const {t} = useTranslation("common");
    const router = useRouter()
    // TODO: FIXME
    const isDesktopClient = router.asPath.includes('?desktop=true') || router.asPath.includes('&desktop=true')
    const theme = useMemo(() => {
        const path = router.asPath;
        if (path.includes('?theme=theme-') || path.includes('&theme=theme-')) {
            if (path.includes('theme=theme-light')) return 'theme-light'
            else if (path.includes('theme=theme-dark')) return 'theme-dark'
            else if (path.includes('theme=theme-contrast-dark')) return 'theme-contrast-dark'
        }
    }, [router.asPath])

    const themeJson = useMemo(() => {
        switch (theme) {
            case "theme-light": return light;
            case 'theme-dark': return dark;
            case "theme-contrast-dark": return contrast;
            default: return classic;
        }
    }, [theme])

    return (
        <ThemeProvider theme={themeJson}>
            {
                isDesktopClient ? <NotFoundForDesktop theme={theme} t={t}/> : <NotFoundForWebsite t={t} theme={theme}/>
            }
        </ThemeProvider>
    )
}
