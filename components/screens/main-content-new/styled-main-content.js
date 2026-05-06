import styled from "styled-components";
import { device } from "@utils/devices";

const StyledWrapper = styled.div`
  background-color: #f9fbfe;
  font-family: "Sora", sans-serif;

  @media screen and (${device.mobile}) {
    .section-page {
      padding: 0 16px;
    }
  }
`;

const StyledContainer = styled.div`
  max-width: 1918px;
  margin: 0 auto;
  padding: 0 112px;
`;

const StyledHeading = styled.section`
  padding: 84px 0;

  .main-title {
    font-size: 48px;
    line-height: 1.5em;
    margin: 0 0 16px;
    color: #231990;
  }

  .main-subtitle {
    font-size: 24px;
    line-height: 1.33em;
    font-weight: 700;
    color: #494b5b;
  }

  @media screen and (${device.laptop}) {
    padding: 48px 0;
  }

  @media screen and (${device.mobile}) {
    padding: 28px 0 32px;
  }
`;

const StyledMain = styled.section`
  display: grid;
  grid-template-columns: 352px minmax(0, 1fr);
  gap: 56px;
  padding-bottom: 112px;

  @media screen and (${device.laptop}) {
    padding-bottom: 40px;
  }
`;

export { StyledWrapper, StyledContainer, StyledHeading, StyledMain };
