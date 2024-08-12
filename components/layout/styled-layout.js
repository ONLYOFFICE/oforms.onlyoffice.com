import styled from "styled-components";

const StyledLayout = styled.div`
  height: 100%;
  background-color: transparent;
  &.rtl {
    direction: rtl;
    unicode-bidi: embed;
  }
`;

export default StyledLayout;
