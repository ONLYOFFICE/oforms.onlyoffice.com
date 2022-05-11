import { appWithTranslation } from "next-i18next";
import "../style/global-style.css";
import { store } from "../redux/store";
import { Provider } from "react-redux";

const App = ({ Component, pageProps }) => (
  <Provider store={store}>
    <Component {...pageProps} />
  </Provider>
);

export default appWithTranslation(App);
