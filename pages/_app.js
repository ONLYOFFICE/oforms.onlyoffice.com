import { appWithTranslation } from "next-i18next";
import "@src/style/global-style.css";

const App = ({ Component, pageProps }) => <Component {...pageProps} />;

export default appWithTranslation(App);