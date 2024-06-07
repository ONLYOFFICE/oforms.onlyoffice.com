import styled from "styled-components";
import Section from "@components/common/section";
import { device } from "@utils/devices";

const StyledHeading = styled(Section)`
  padding: 56px 0 140px;
  background-color: #333333;

  @media screen and ${device.laptop} {
    padding: 56px 0 112px;
  }

  @media screen and ${device.mobile} {
    padding: 48px 0;
  }

  .info-wrapper {
    color: #ffffff;
    text-align: center;
  }

  .info-top {
    margin: 0 auto;
    max-width: 928px;
  }

  .info-title {
    margin-bottom: 32px;
    letter-spacing: -0.02em;

    span {
      color: #FF6F3D;
    }

    @media screen and ${device.mobile} {
      margin-bottom: 16px;
    }
  }

  .info-text {
    margin-bottom: 56px;
    font-size: 22px;
    line-height: 33px;
    color: #CCCCCC;

    @media screen and ${device.mobile} {
      margin-bottom: 48px;
      font-size: 16px;
      line-height: 24px;
    }
  }

  .info-subtitle {
    margin-bottom: 32px;
    letter-spacing: -0.02em;
  }

  .info-editors {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    column-gap: 32px;
    margin: 0 -40px 84px;
    padding: 0 40px;
    overflow-x: auto;

    @media screen and ${device.laptop} {
      margin-bottom: 56px;
    }

    @media screen and ${device.mobile} {
      column-gap: 16px;
      margin: 0 -16px 48px;
      padding: 0 16px;
    }
  }
`;

const StyledMain = styled(Section)`
  padding: 72px 0 112px;
  background-color: #F5F5F5;
  overflow: hidden;

  @media screen and ${device.laptop} {
    padding: 56px 0 88px;
  }

  .card-slider,
  .popular-categories {
    &:not(:last-child) {
     margin-bottom: 56px;

      @media screen and ${device.laptop} {
        margin-bottom: 40px;
      }

      @media screen and ${device.mobile} {
        margin-bottom: 24px;
      }
    }
  }

  .cards-block {
    &:not(:last-child) {
      margin-bottom: 56px;

      @media screen and ${device.laptop} {
        margin-bottom: 40px;
      }

      @media screen and ${device.mobile} {
        margin-bottom: 24px;
      }
    }
  }

  .pdf-fillable-form {
    padding-top: 24px;
  }
`;

export { StyledHeading, StyledMain };
