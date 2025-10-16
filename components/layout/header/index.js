import StyledHeader from "./styled-header";

const Header = (props) => {
  return <StyledHeader>{props.children} </StyledHeader>;
};

Header.displayName = "PageHeader";

export default Header;
