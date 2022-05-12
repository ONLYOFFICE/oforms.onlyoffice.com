import { appWithTranslation } from "next-i18next";
import "../style/global-style.css";
// import { store } from "../redux/store";
// import { Provider } from "react-redux";

const App = ({ Component, pageProps }) => <Component {...pageProps} />;

export default appWithTranslation(App);
