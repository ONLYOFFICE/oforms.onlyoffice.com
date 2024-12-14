import styled, { keyframes } from "styled-components";

const pulseAnimation = keyframes`
  0% {
    background-position-x: 100%;
  }
  100% {
    background-position-x: -100%;
  }
`;

const StyledSkeletonCard = styled.div`
  .skeleton-card-body {
    box-sizing: border-box;
    margin-bottom: 12px;
    border: 1px solid ${props =>
      props.theme === "theme-dark" || props.theme === "theme-contrast-dark" ? "#616161" : 
      "#CBCBCB"
    };
    width: 184px;
    height: 260px;
    background: ${props =>
      props.theme === "theme-dark" || props.theme === "theme-contrast-dark" ? "linear-gradient(0deg, rgba(255, 255, 255, 0.04), rgba(255, 255, 255, 0.04)),linear-gradient(270deg, rgba(255, 255, 255, 0) 23.13%, rgba(255, 255, 255, 0.08) 50.52%, rgba(255, 255, 255, 0) 78.12%)" :
      "linear-gradient(0deg, rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05)), linear-gradient(270deg, rgba(0, 0, 0, 0) 23.13%, rgba(0, 0, 0, 0.07) 50.52%, rgba(0, 0, 0, 0) 78.12%)"
    };
    background-size: 200% 100%;
    animation: ${pulseAnimation} 2s linear infinite;
  }

  .skeleton-card-title {
    width: 184px;
    height: 22px;
    background: ${props =>
      props.theme === "theme-dark" || props.theme === "theme-contrast-dark" ? "linear-gradient(0deg, rgba(255, 255, 255, 0.04), rgba(255, 255, 255, 0.04)),linear-gradient(270deg, rgba(255, 255, 255, 0) 23.13%, rgba(255, 255, 255, 0.08) 50.52%, rgba(255, 255, 255, 0) 78.12%)" :
      "linear-gradient(0deg, rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05)), linear-gradient(270deg, rgba(0, 0, 0, 0) 23.13%, rgba(0, 0, 0, 0.07) 50.52%, rgba(0, 0, 0, 0) 78.12%)"
    };
    background-size: 200% 100%;
    animation: ${pulseAnimation} 2s linear infinite;
  }
`
export default StyledSkeletonCard;