import StyledHeader from "./styled-header";
import Menu from "./menu";
import Search from "@components/screens/header/search";

const Header = ({ t, locale, headerBgColor, isMainPage, isSearch, stateMobile, setStateMobile }) => {
  return (
    <StyledHeader headerBgColor={headerBgColor}>
      <Menu
        t={t}
        locale={locale}
        isMainPage={isMainPage}
        stateMobile={stateMobile}
        setStateMobile={setStateMobile}
      />
      {isSearch &&
        <Search t={t} locale={locale} isMainPage={isMainPage} />
      }
    </StyledHeader>
  );
};

export default Header;
