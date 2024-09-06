import styled from "styled-components";

const StyledLayout = styled.div`
  height: 100%;
  background-color: transparent;
  direction: ${props => props.locale === "ar" && "rtl"};
  unicode-bidi: ${props => props.locale === "ar" && "embed"};
`;

export default StyledLayout;
