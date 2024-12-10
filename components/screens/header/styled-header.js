import styled from "styled-components";

const StyledHeader = styled.div`
  background: ${(props) => (props.headerBgColor ? props.headerBgColor : "#FFFFFF")};
`;

export default StyledHeader;
