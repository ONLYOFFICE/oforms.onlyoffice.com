import styled, { css } from "styled-components";
import { device } from "@components/utils/devices";
import Section from "@common/section";

const mobileStyledMainInfo = css`
  .template-main-info {
    padding-left: 0;

    .main-info-heading {
      padding-top: 16px;
      padding-bottom: 16px;
      text-align: center;
      font-size: 20px;
      line-height: 1.33em;
    }

    .main-info-type-item {
      padding-bottom: 16px;
      text-align: center;
      font-size: 16px;
    }

    .main-info-box {
      padding-top: 16px;
      padding-bottom: 24px;
      -webkit-box-orient: vertical;
      -webkit-box-direction: normal;
      flex-direction: column;
      align-items: center;
    }
  }

  .template-main-description {
    .file-info {
      display: contents;
      .template-image-file-type {
        margin-left: 8px;
      }
      .file-size-text {
        margin-left: 8px;
      }
      .file-pages-text {
        margin-left: 8px;
      }
    }

    .file-main-iconbuttons {
      justify-content: flex-start;
    }

    .file-main-buttons {
      display: block;
      padding-top: 24px;
    }
  }

  /** */
  .main-info-heading {
    font-size: 20px;
  }

  .main-info-type-item {
    font-size: 16px;
  }

  .main-info-text {
    font-size: 13px;
  }

  .main-info-description {
    font-size: 14px;
    line-height: 26px;
  }
  /** */

  .template-main-img {
    margin: 0 auto;
    ${
      "" /* width: 90vw;
    height: 100%;
    .template-image {
      width: 90vw;
      height: 100%;
    } */
    }
    width: 100%;
    height: auto;
    .template-image {
      width: 100%;
      height: 80vh;
    }
  }
`;

const tabletStyledMainInfo = css`
  display: flex;
  flex-direction: column;
  padding: 0;

  .template-main-info {
    padding-left: 0px;

    .template-breadcrumb{
      padding-top: 0;
      justify-content: center;
      border-bottom: none;
      padding-bottom: 0;
      margin-bottom: 0;
    }

    .main-info-heading {
      padding-top: 32px;
      padding-bottom: 16px;
      font-size: 32px;
      text-align: center;
    }

    .main-info-type-item {
      padding-bottom: 24px;
      color: #ff6f3d;
      font-size: 18px;
      text-align: center;
      border-bottom: 1px solid #E5E5E5;
    }

    .main-info-box {
      justify-content: center;
      padding-top: 26px;
      padding-bottom: 57px;
    }
  }

  .template-main-img {
    margin: 0 auto;
    .template-image {
      width: 100%;
      height: 100%;
    }
  }

  .template-main-description {
    display: grid;
    padding-left: 0px;
    max-width: 100%;
    .file-description {
      padding: 32px 0;
      margin-bottom: 42px;
    }

    .file-info {
      max-width: 100%;
      padding-bottom: 30px;
      justify-content: center;
      gap: 32px;
    }

    .file-main-buttons {
      grid-row-start: 1;
      width: 100%;
      padding-bottom: 0px;
      padding-top: 56px;
      gap: 16px;
    }

    .file-main-iconbuttons {
      justify-content: center;
      gap: 5px;
    }
  }
`;

const StyledMainInfo = styled(Section)`
  .section-page {
    display: grid;
    padding: 40px 0px;

    .template-main-img {
      grid-column-start: 1;
      grid-column-end: 2;
      grid-row-start: 1;
      grid-row-end: 5;
      .template-image {
        width: 100%;
        height: 100%;
      }
    }

    .template-main-info {
      grid-column-start: 2;
      grid-column-end: 3;
      grid-row-start: 1;
      grid-row-end: 2;
    }

    .template-main-description {
      grid-column-start: 2;
      grid-column-end: 3;
      grid-row-start: 2;
      grid-row-end: 3;
    }
    /* @media ${device.laptop} {
      .template-main-description {
        max-width: 344px;
      }

      .template-main-info {
        max-width: 344px;
      }
    } */

    @media ${device.laptop} {
      .template-main-description,
      .template-main-info {
        max-width: 100%;
      }
      ${tabletStyledMainInfo};
    }

    @media ${device.mobile} {
      ${mobileStyledMainInfo};
    }

    @media ${device.mobileL} {
      .template-main-img {
        .template-image {
          height: 60vh;
        }
      }
    }
    @media ${device.mobileM} {
      .template-main-img {
        .template-image {
          height: 50vh;
        }
      }
    }

    @media ${device.mobileS} {
      .template-main-img {
        .template-image {
          width: 100%;
          height: 400px;
        }
      }
    }
  }

  .template-main-info {
    max-width: 544px;
    padding-left: 42px;

    .main-info-heading {
      padding-bottom: 16px;
    }

    .main-info-type-item {
      width: 100%;
      padding-bottom: 24px;
    }

    .main-info-box {
      justify-content: space-between;
      gap: 16px;
      align-items: flex-start;
      justify-content: flex-start;
    }
  }

  .template-main-img {
    margin: 0 auto;
    width: 544px;
    height: 769px;
    box-shadow: 0px 7px 15px rgba(85, 85, 85, 0.1) !important;
    border: 1px solid #ccc;
    .template-image {
      border-radius: 3px;
      width: 100%;
      height: 100%;
      padding: 16px !important;
      background-color: #fff;
    }
  }

  .template-main-description {
    max-width: 544px;
    padding-left: 42px;

    .file-description {
      padding: 25px 0;
      margin-bottom: 42px;
      border-bottom: 1px solid #e5e5e5;
    }

    .file-info {
      align-items: center;
      justify-content: space-between;
      max-width: 455px;
      padding-bottom: 40px;
    }

    .file-main-buttons {
      padding-bottom: 40px;
      gap: 16px;
    }

    .file-main-iconbuttons {
      gap: 16px;
    }
  }

  /** */
  .main-info-heading {
    font-size: 32px;
  }

  .main-info-type-item {
    font-size: 18px;
    color: #ff6f3d;
  }

  .main-info-text {
    font-size: 14px;
  }

  .main-info-description {
    font-size: 16px;
    line-height: 26px;
  }
  /** */
  
  .file-download-button {
    display: grid;
    grid-template-columns: 8fr 2fr;
    align-items: stretch;

    &:hover {
      path {
        fill: ${({theme}) => theme.colors.primary};
      }
    }
    
    .indicatorContainer {
      display: grid;
      grid-template-columns: 1px 1fr;
      
      & svg {
        width: 100%;
      }
    }
  }
`;

export const OpenAsSelector = styled.div`
    position: relative;
`;

export const OpenAsSelectorHeader = styled.div`
    display: flex;
    align-items: center;
    background: #FF6F3D;
    color: #FFF;
    border-radius: 3px;
    width: 251px;
    cursor: pointer;
`;

export const OpenAsSelectorHeaderDesc = styled.p`
    margin: 0;
    text-align: center;
    font-size: 13px;
    font-style: normal;
    font-weight: 700;
    line-height: 133%; /* 17.29px */
    letter-spacing: 0.52px;
    text-transform: uppercase;
    padding: 19px 24px;
    color: inherit;
    width: 100%;
    flex-grow: 1;
    height: 100%;
    user-select: none;
`;

export const OpenAsSelectorHeaderIconWrapper = styled.div`
    padding: 16px;
    border-left: 1px solid #FFF;

    svg {
        color: inherit;
    }
`;

export const OpenAsSelectorDropdown = styled.div`
    position: absolute;
    top: calc(100% + 10px);
    z-index: 1;
    border-radius: 3px;
    border: 1px solid #666;
    background: #FFF;
    width: 100%;

    box-shadow: 0px 7px 25px 0px rgba(85, 85, 85, 0.15);
`;

export const OpenAsSelectorDropdownList = styled.ul`
    list-style: none;
    margin: 0;
    padding: 8px 0px 8px 1px;
`;

export const OpenAsSelectorDropdownItem = styled.li`
    display: flex;
    color: #444;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 160%; /* 25.6px */
    padding: 8px 16px;
    cursor: pointer;
    
    &.without-padding {
        padding: 0;
    }
    
    &:hover {
        color: #FF6F3D;
        background: #F5F5F5;
    }
`;

export const OpenAsSelectorDropdownLink = styled.a`
    flex-grow: 1;
    color: inherit;
    padding: 8px 16px;
    
    text-decoration: none;
    
    &:hover {
        text-decoration: none;
    }
`

export default StyledMainInfo;
