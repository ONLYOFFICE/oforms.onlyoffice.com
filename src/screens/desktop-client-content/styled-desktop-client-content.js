import styled from "styled-components";
import Section from "@common/section";

const StyledDesktopClientContent = styled.section`
    background-color: ${({ theme }) => theme.colors.palette.backgroundNormal};
    padding: 40px;
    height: 100dvh;
    
    max-width: 100%;
    margin: 0;
    width: 100%;

    display: flex;
    flex-direction: column;
    gap: 20px;
    position: relative;
`;

export default StyledDesktopClientContent;
