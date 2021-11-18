import styled from "styled-components";

const StyledMenu = styled.nav`
width: 95vw;
margin: 0 auto;
padding-top: 10px;

color: ${(props) => !props.template ? `#fff` : `#333`};

align-items: center;
font-size: 12px;

.navbar {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  position: sticky;
  top: 0;
  z-index: 20;
}

.group-nav-item {
    display: flex;
    gap: 40px;
}

.nav-container {
  display: flex;
  align-items: center;
  width: 100%;
  height: 55px;
  justify-content: space-between;
}

.nav-logo {
  align-items: center;
  cursor: pointer;
  text-decoration: none;
}

.nav-links {
  text-decoration: none;
  color: ${(props) => !props.template ? `#fff` : `#333`};
}

.nav-item {
  line-height: 40px;
  margin-right: 1rem;
}

@media(max-width: 1024px) {
    .group-nav-item {
        display: none;
    }
}
`;

export default StyledMenu;