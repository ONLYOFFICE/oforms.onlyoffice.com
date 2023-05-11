import {appWithTranslation} from "next-i18next";
import "../style/global-style.css";
import {useMemo} from "react";
import darkTheme from "../style/themes/darkTheme.json";
import contrastDarkTheme from "../style/themes/contrastDarkTheme.json";
import classicTheme from "../style/themes/classicTheme.json";
import {useRouter} from "next/router";
import {ThemeProvider} from "styled-components";
import {Base} from "@components/themes";
// import { store } from "../redux/store";
// import { Provider } from "react-redux";

const App = ({Component, pageProps}) => {
    const query = useRouter();
    const mode = query.query.theme;
    const theme = useMemo(() => {
        if (mode === 'dark_theme') return darkTheme
        else if (mode === 'contrast_dark_theme') return contrastDarkTheme

        return classicTheme
    }, [mode])
    return (
        <ThemeProvider theme={{...Base, ...theme}}>
            <Component {...pageProps} />
        </ThemeProvider>
    )
}

export default appWithTranslation(App);
