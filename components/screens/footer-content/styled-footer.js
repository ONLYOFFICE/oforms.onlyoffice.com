import styled, { css } from "styled-components";
import { device } from "../../utils/devices";

const StyledFooterTablet = css`
  display: contents;
  padding: 0px;
  margin: 0px;

  grid-template-columns: 1fr;
  -ms-grid-columns: 1fr;

  .footer-item-follow {
    height: 100%;
    padding: 0px 0px 10px;
    border: none;

    .footer-social-links {
      gap: 20px 24px;
      margin: 0 auto;
      max-width: 100%;
      justify-content: center;

      .footer-social {
        padding-right: 0px;
        width: 25px;
      }
    }

    .footer-copyright {
      padding: 10px 0px 50px 0px;
    }

    .footer-items-group {
      max-height: 100% !important;
    }

    .footer-item-heading-arrow {
      display: none;
    }

    .footer-item-heading {
      text-align: center;
      margin: 28px 0 28px 0;
    }
  }

  .contact-text {
    display: flex;
  }

  .footer-copyright-block {
    display: flex;
    justify-content: center;
    background-color: #f9f9f9;
    padding: 20px 0;
  }

  .footer-copyright {
    font-size: 12px;
  }
`;

const StyledFooter = styled.div`
  width: calc(100% - 10vw);
  margin: 0 auto 20px;
  position: relative;
  max-width: 1120px;
  min-width: 769px;
  padding-top: 70px;
  padding-bottom: 62px;
  margin-bottom: 25px;
  height: auto;
  display: grid;
  display: -ms-inline-grid;
  grid-template-columns: ${(props) => props.language == "ja" ? '0.6fr 0.5fr 0.65fr 1.1fr' : "0.8fr 0.8fr 0.8fr 1fr"};
  -ms-grid-columns: ${(props) => props.language == "ja" ? '0.6fr 32px 0.5fr 32px 0.65fr 32px 1.1fr' : "0.8fr 32px 0.8fr 32px 0.8fr 32px 1fr"};
  grid-column-gap: 15px;

  .footer-item-group {
    position: relative;
    &.last {
      grid-column: 1 / span 4;
    }
  }

  .footer-link-contact {
    font-size: 13px;
    line-height: 1.4em;
  }

  .contact-text {
    display: flex;
    font-size: 13px;
    margin: 0 0 7px;
    line-height: 1.4em;
    white-space: nowrap;
  }

  .footer-social-links {
    display: -ms-flexbox;
    display: flex;
    -webkit-flex-wrap: wrap;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    max-width: 100%;
    align-items: baseline;

    .footer-social {
      list-style-type: none;
      display: inline-block;
      width: 22px;
      height: 24px;
      margin: 0;
      padding-right: 32px;
      vertical-align: middle;
    }
  }
  .footer-copyright-block {
    display: flex;
    justify-content: center;
    background-color: #ffffff;
    padding: 0px 0;
    margin-top: -5px;
  }

  .footer-copyright {
    color: #aaaaaa;
    font-size: 13px;
    margin: 0 0 7px;
    line-height: 1.4em;
  }

  .footer-item-follow {
    justify-content: center;
    .footer-item-heading {
      text-align: center;
    }
  }

  @media (max-width: 1060px) {
    .contact-text {
      display: contents;
    }
  }

  @media ${device.laptop} {
    width: auto;
    max-width: 928px;
    padding: 0 48px 46px;
    vertical-align: top;
    min-width: unset;
    padding-top: 70px;
    margin-bottom: 0;
  }

  @media ${device.tablet} {
    ${StyledFooterTablet};
  }
`;

export default StyledFooter;
