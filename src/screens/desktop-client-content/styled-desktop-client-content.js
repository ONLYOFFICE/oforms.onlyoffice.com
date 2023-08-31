import styled from "styled-components";
import Section from "@common/section";

const StyledDesktopClientContent = styled(Section)`
  background-color: ${({theme}) => theme.colors.palette.backgroundNormal};
  padding: 0;
  
  .section-page {
    max-width: 100%;
    height: 100vh;
    margin: 0;
    width: 100%;
    
    display: flex;
    flex-direction: column;
    gap: 20px;
    position: relative;
  }
`;

export default StyledDesktopClientContent;
