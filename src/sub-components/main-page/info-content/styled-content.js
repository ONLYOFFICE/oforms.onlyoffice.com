import styled from "styled-components";
import Section from "../../section";

const StyledInfoContent = styled(Section)`
  .heading-info-content {
    font-size: 40px;
    text-align: center;
    line-height: 54px;
    font-weight: 700;
    color: #fff;
    padding-top: 48px;
  }

  .description-info-content {
    box-sizing: border-box;
    font-size: 22px;
    line-height: 33px;
    text-align: center;
    color: #ccc;
    padding-top: 32px;
    width: 100%;
    max-width: 756px;
    margin: 0 auto;
    display: block;
  }

  .subheading-info-content {
    font-weight: 700;
    font-size: 18px;
    line-height: 24px;
    color: #fff;
    padding-bottom: 48px;
    text-align: center;
    padding-top: 56px;
  }

  .scroll-body {
    overflow: hidden;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    column-gap: 32px;
    padding: 0;
  }

  @media (max-width: 1200px) {
    .section-page {
      max-width: 100vw;
    }
    .scroll-body {
      padding: 0 40px;
    }
    .heading-info-content,
    .description-info-content,
    .subheading-info-content {
      max-width: 928px;
      margin: 0 auto;
      padding-left: 40px;
      padding-right: 40px;
    }
  }

  @media (max-width: 1024px) {
    .section-page {
      width: 100vw;
    }
  }

  @media (max-width: 768px) {
    .heading-info-content {
      font-size: 36px;
      line-height: 48px;
      padding-top: 48px;
    }

    .description-info-content {
      font-size: 20px;
      line-height: 30px;
      padding-top: 24px;
    }

    .subheading-info-content {
      font-size: 18px;
      line-height: 24px;
      padding-bottom: 50px;
      padding-top: 56px;
    }

    .box-info-content {
      overflow: overlay;
      column-gap: 32px;
    }

    .scroll-body {
      overflow: scroll;
    }
  }

  @media (max-width: 600px) {
    .heading-info-content {
      font-size: 24px;
      line-height: 31px;
      padding-top: 55px;
    }

    .description-info-content {
      font-size: 16px;
      line-height: 26px;
      padding-top: 16px;
    }

    .subheading-info-content {
      font-size: 18px;
      line-height: 24px;
      padding-bottom: 32px;
      padding-top: 48px;
    }
    .scroll-body {
      column-gap: 8px;
      padding: 0 24px;
    }

    .heading-info-content,
    .description-info-content,
    .subheading-info-content {
      padding-left: 16px;
      padding-right: 16px;
    }
    
  }
`;

export default StyledInfoContent;
