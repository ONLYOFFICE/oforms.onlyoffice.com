import styled from "styled-components";

const StyledLayout = styled.div`
  direction: ${props => props.$locale === "ar" && "rtl"};
  unicode-bidi: ${props => props.$locale === "ar" && "embed"};
  height: 100%;
  background-color: transparent;
`;

export default StyledLayout;
