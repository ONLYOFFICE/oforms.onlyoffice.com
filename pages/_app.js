import { createGlobalStyle } from "styled-components";
import { appWithTranslation } from "next-i18next";

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
    <GlobalStyle />
    <Component {...pageProps} />
  </>
);

export default appWithTranslation(App);
