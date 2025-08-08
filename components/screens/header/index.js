import StyledHeader from "./styled-header";
import { useRouter } from "next/router";
import { OOHeader } from "onlyoffice-react-ui-kit/header";
import "onlyoffice-react-ui-kit/header/css";
import languages from "@config/languages.json";
import Search from "@components/screens/header/search";

const Header = ({ t, locale, headerBgColor, isMainPage, isSearch }) => {
  const router = useRouter();

  return (
    <StyledHeader>
      <OOHeader
        locale={locale}
        languages={languages.map((language) => ({
          key: language.shortKey,
          shortKey: language.shortKey,
          name: language.longKey,
          href: router.pathname === "/form-submit" || router.pathname === "/searchresult" ||
            router.pathname === "/pdf-form-templates" || router.pathname === "/document-templates" ||
            router.pathname === "/spreadsheet-templates" || router.pathname === "/presentation-templates" ? router.asPath : "/"
        }))}
        base={{
          url: "https://www.onlyoffice.com",
          withAspx: true,
          localePathMap: {
            ar: "",
          }
        }}
        hasPhone={true}
        theme={isMainPage ? "white" : undefined}
        backgroundColor={headerBgColor || "#ffffff"}
        highlight={{
          buttonId: "oo-menu-item-btn-products",
          linkId: "oo-hm-item-link--templates",
        }}
      />
      {isSearch &&
        <Search t={t} locale={locale} isMainPage={isMainPage} />
      }
    </StyledHeader>
  );
};

export default Header;
