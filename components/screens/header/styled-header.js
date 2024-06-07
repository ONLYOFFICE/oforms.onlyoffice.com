import styled from "styled-components";

const StyledHeader = styled.div`
  background: ${(props) => (props.templatePrimary ? "#F9F9F9" : props.templateSecondary || props.templateQuaternary ? "#FFFFFF" : props.templateTertiary ? "#F5F5F5" : "#444444")};
`;

export default StyledHeader;
