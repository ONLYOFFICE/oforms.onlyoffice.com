import { createGlobalStyle } from "styled-components";
import { appWithTranslation } from "next-i18next";
// import { store } from "../redux/store";
// import { Provider } from "react-redux";

const GlobalStyle = createGlobalStyle`
 html {
  height: 100%;
  font-family: "Open Sans", sans-serif;
  overflow-x: hidden;
}

body {
  margin: 0;
  padding: 0;
  min-height: 100%;
  position: relative;
}
`;

const App = ({ Component, pageProps }) => (
  <>
    {/* // <Provider store={store}> */}
    <GlobalStyle />
    <Component {...pageProps} />
    {/* </Provider> */}
  </>
);

export default appWithTranslation(App);
