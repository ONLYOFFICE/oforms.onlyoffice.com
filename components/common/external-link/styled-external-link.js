import styled from "styled-components";

const StyledExternalLink = styled.a`
  color: ${props => props.$color ? props.$color : "inherit"};
  text-decoration: ${props => props.$textDecoration ? props.$textDecoration : "none"};
`;

export default StyledExternalLink;