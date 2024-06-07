import StyledHeader from "./styled-header";
import Menu from "./menu";
import Search from "@components/screens/header/search";

const Header = ({ t, locale, templatePrimary, templateSecondary, templateTertiary, templateQuaternary, stateMobile, setStateMobile }) => {
  return (
    <StyledHeader
      templatePrimary={templatePrimary}
      templateSecondary={templateSecondary}
      templateTertiary={templateTertiary}
      templateQuaternary={templateQuaternary}
    >
      <Menu
        t={t}
        locale={locale}
        templatePrimary={templatePrimary}
        templateSecondary={templateSecondary}
        templateTertiary={templateTertiary}
        templateQuaternary={templateQuaternary}
        stateMobile={stateMobile}
        setStateMobile={setStateMobile}
      />
      {!templatePrimary &&
        <Search
          t={t}
          locale={locale}
          templateSecondary={templateSecondary}
          templateTertiary={templateTertiary}
          templateQuaternary={templateQuaternary}
        />
      }
    </StyledHeader>
  );
};

export default Header;
