import {appWithTranslation} from "next-i18next";
import "../src/style/global-style.css";
import {useMemo} from "react";
import darkTheme from "../src/style/themes/darkTheme.json";
import contrastDarkTheme from "../src/style/themes/contrastDarkTheme.json";
import classicTheme from "../src/style/themes/classicTheme.json";
import lightTheme from '../src/style/themes/lightTheme.json'
import {useRouter} from "next/router";
import {ThemeProvider} from "styled-components";
import {Base} from "@components/themes";

const App = ({Component, pageProps}) => {
    const router = useRouter();
    const mode = router.query.theme;
    const isDesktopClient = router.query.desktop
    const theme = useMemo(() => {
        if(isDesktopClient && mode !== undefined) {
            switch (mode) {
                case 'theme-light': return lightTheme;
                case 'theme-dark': return darkTheme;
                case 'theme-contrast-dark': return contrastDarkTheme;
            }
        }

        return classicTheme;
    }, [mode, isDesktopClient])
    return (
        <ThemeProvider theme={{...Base, ...theme}}>
            <Component {...pageProps} />
        </ThemeProvider>
    )
}

export default appWithTranslation(App);
