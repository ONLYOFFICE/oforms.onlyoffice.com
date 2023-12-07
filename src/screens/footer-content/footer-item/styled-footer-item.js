import styled, { css } from "styled-components";

const StyledFooterItem = styled.div`
  display: grid;
  position: relative;
  padding: 0 0 40px;
  white-space: break-spaces;

  .footer-items-group {
    display: grid;
    row-gap: 8px;
    max-height: 100%;
  }

  .footer-link {
    color: #333333;
    font-size: 13px;
    line-height: 18px;
    text-decoration: none;
    transition: color 0.2s, border 0.5s;

    &:hover {
      color: #FF6F3D;
    }

    &[href*="/call-back-form.aspx"] {
      font-weight: 700;
    }
  }

  .footer-item-heading {
    font-size: 12px;
    line-height: 12px;
    padding: 0 0 14px;
    font-weight: 700;
    color: #333333;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    overflow: initial;

    a {
      font-size: 12px;
      line-height: 12px;
      padding: 0;
      font-weight: 700;
      color: #333333;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      text-decoration: none;
      overflow: initial;
      transition: color 0.2s;
    }

    &.footer-item-heading-link {
      cursor: pointer;

      &:hover {
        a {
          color: #ff6f3d;
        }
      }
    }
  }

  .footer-item-heading-arrow {
    display: none;
  }

  @media screen and (max-width: 600px) {
    display: block;
    padding: 0;
    border-bottom: 1px solid #e5e5e5;
  
    .footer-item-heading {
      padding: 20px 0 19px;
      cursor: pointer;
      overflow: hidden;
      transition: all 0.4s linear 0s;
    }
  
    .footer-link {
      font-size: 12px;
      line-height: 20px;
    }
  
    .footer-item-heading-arrow {
      display: block;
      position: absolute;
      right: 0;
      top: 14px;
      z-index: -1;
      width: 24px;
      height: 24px;
      background-image: url("https://static-oforms.onlyoffice.com/icons/chevron-down.svg");
      background-repeat: no-repeat;
      background-size: 24px 24px;
  
      &.up {
        transform: rotate(180deg);
      }
    }
  
    .footer-items-group {
      display: grid;
      position: initial;
      margin-bottom: 0;
      overflow: hidden;
      transition: margin-top 0.5s ease;
  
      ${(props) =>
        props.isOpen
          ? css`
              display: grid;
              grid-gap: 12px;
              margin: 11px 0 12px;
              position: initial;
              height: 100%;
              max-height: 100%;
            `
          : css`
              position: initial;
              margin-bottom: 0;
              margin-top: 0;
              max-height: 0;
            `}
    }
  }
`;

export default StyledFooterItem;