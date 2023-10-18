import styled, { css } from "styled-components";
import { device } from "@components/utils/devices";

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
    margin: 0 0 8px;
    line-height: 18px;
    color: #AAAAAA;
  }

  .footer-copyright {
    font-size: 13px;
    line-height: 26px;
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
  grid-template-columns: 206px 254px 256px 1fr;
  -ms-grid-columns: 206px 254px 256px 1fr;;
  grid-column-gap: 32px;
  grid-row-gap: 0px;

  .footer-item-group {
    position: relative;
    &.last {
      display: grid;
      grid-template-columns: 1fr 220px;
      align-items: center;
      grid-column: 1 / span 4;
      padding-top: 40px;
      gap: 24px;
      border-top: 1px solid #e2e2e2;

      .footer-items-group {
        overflow: initial;
      }
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

  .footer-copyright-block {
    display: flex;
    flex-direction: column;
    font-size: 13px;
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

  @media (max-width: 1200px) {
    grid-template-columns: 0.65fr 0.79fr 0.79fr 1fr;
  }

  @media ${device.laptop} {
    width: auto;
    max-width: 928px;
    vertical-align: top;
    min-width: unset;
    padding: 70px 32px 40px;
    justify-content: center;
    grid-template-columns: 1fr 1fr 1fr;
    
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
    .footer-item-group.last {
      border-top: 0px;
  }
  }
`;

export default StyledFooter;
