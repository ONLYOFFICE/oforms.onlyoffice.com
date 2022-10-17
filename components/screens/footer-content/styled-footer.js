import styled, { css } from "styled-components";
import { device } from "../../utils/devices";

const StyledFooterTablet = css`
  padding: 8px 0 40px;
  margin: 0px;

  grid-template-columns: 1fr;
  -ms-grid-columns: 1fr;

  .footer-item-group.last {
    display: block;
    grid-column: initial;
    padding-top: 8px;
    gap: initial;
  }

  .footer-item-follow {
    padding: 32px 0;
    border: none;

    .footer-social-links {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 24px 26px;
      margin: 0 auto;
      max-width: 300px;

      .footer-social {
        padding-right: 0px;
        width: 24px;
        border: initial;
        border-radius: initial;

        > div {
          border-radius: initial;
          width: 24px;
          height: 24px;
        }
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
      display: none;
    }
  }

  .contact-text,
  .footer-link-contact {
    font-size: 12px;
    line-height: 20px;
  }

  .footer-copyright-block {
    display: flex;
    justify-content: center;
    padding: 16px 0;
    line-height: 16px;
    color: #AAAAAA;
  }

  .footer-copyright {
    font-size: 12px;
  }
`;

const StyledFooter = styled.div`
  width: calc(100% - 10vw);
  margin: 0 auto;
  position: relative;
  max-width: 1120px;
  min-width: 769px;
  padding-top: 56px;
  padding-bottom: 80px;
  height: auto;
  display: grid;
  display: -ms-inline-grid;
  grid-template-columns: 256px 256px 1fr;
  -ms-grid-columns: 256px 256px 1fr;
  grid-column-gap: 32px;

  .footer-item-group {
    position: relative;
    &.last {
      display: grid;
      grid-template-columns: 1fr 220px;
      align-items: center;
      grid-column: 1 / span 3;
      padding-top: 24px;
      gap: 24px;
    }
  }

  .footer-link-contact {
    font-size: 13px;
    line-height: 18px;
  }

  .contact-text {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    font-size: 13px;
    line-height: 18px;
    color: #444444;
  }

  .footer-social-links {
    display: grid;
    grid-template-columns: repeat(auto-fit, 40px);
    gap: 21px;

    .footer-social {
      list-style-type: none;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0;
      vertical-align: middle;
      border: 1px solid #E2E2E2;
      border-radius: 50%;
      cursor: pointer;

      > div {
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        width: 40px;
        height: 40px;
      }
    }
  }

  .footer-copyright-block {
    display: flex;
    flex-direction: column;
    font-size: 12px;
    line-height: 26px;
    color: #444444;
    text-align: right;
  }

  .footer-copyright {
    color: #aaaaaa;
    font-size: 13px;
    line-height: 1.4em;
  }

  .footer-item-follow {
    padding-bottom: 0;
  }

  @media ${device.laptop} {
    width: auto;
    max-width: 928px;
    vertical-align: top;
    min-width: unset;
    padding: 70px 32px 40px;
    justify-content: center;
    grid-template-columns: 208px 208px 258px;
    
    .footer-item-group.last {
      grid-template-columns: initial;

      .footer-item-follow {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }

      .footer-items-group {
        width: 100%;
      }

      .footer-social-links {
        justify-content: center;
      }

      .footer-copyright-block {
        display: block;
        text-align: center;

        span {
          &:first-child {
            margin-right: 3px;
          }
        }
      }
    }
  }

  @media ${device.tablet} {
    ${StyledFooterTablet};
  }
`;

export default StyledFooter;
