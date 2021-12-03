import styled, { css } from "styled-components";
import { device } from "../../../../components/utils/devices";
import Section from "../../section/";

const mobileStyledMainInfo = css`
  .template-main-info {
    padding-left: 0px;

    .main-info-heading {
      padding-top: 32px;
      padding-bottom: 16px;
    }

    .main-info-type-item {
      padding-bottom: 24px;
    }

    .main-info-box {
      padding-top: 26px;
      padding-bottom: 57px;
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
      display: grid;
      grid-template-columns: 1fr;
      grid-row-gap: 16px;
      padding-bottom: 16px;
    }

    .file-main-buttons {
      padding-top: 24px;
      flex-wrap: wrap;
      width: 100%;
    .file-main-iconbuttons {
        justify-content: flex-start;
    }

    .file-main-buttons {
        display: block;
        padding-top: 24px;

        .file-download-button {
            margin-top: 16px;

            .placeholder {
                padding: 15px 0;
            }

            .chevronContainer {
                padding: 9px 16px 8px;
            }
        }
        
    }


      button {
        height: 48px;
      }
      .external-link {
        padding: 16px 0 15px;
      }
      .chevronContainer {
        padding: 12px 11px 5px;
      }
    }

    .file-description {
      margin-bottom: 16px;
    }

    .file-main-iconbuttons {
      justify-content: flex-start;
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
`;

const tabletStyledMainInfo = css`
  display: flex;
  flex-direction: column;

  .template-main-info {
    padding-left: 0px;

    .main-info-heading {
      padding-top: 32px;
      padding-bottom: 16px;
      font-size: 32px;
    }

    .main-info-type-item {
      padding-bottom: 24px;
      color: #ff6f3d;
      font-size: 18px;
    }

    .main-info-box {
      padding-top: 24px;
      padding-bottom: 56px;
      max-width: none;
    }
  }

  .template-main-img {
    margin: 0 auto;
    max-width: 544px;

    .template-image {
      width: 100%;
      height: auto;
    }
  }

  .template-main-description {
    display: grid;
    padding-left: 0px;
    max-width: 100%;
    .file-description {
      padding: 32px 0;
      margin-bottom: 34px;
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
    }
  }
`;

const StyledMainInfo = styled(Section)`
  .section-page {
    display: grid;

    .template-main-img {
      grid-column-start: 1;
      grid-column-end: 2;
      grid-row-start: 1;
      grid-row-end: 5;
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
    @media ${device.laptop} {
      .template-main-description {
        max-width: 344px;
      }

      .template-main-info {
        max-width: 344px;
      }
    }

    @media ${device.tablet} {
      .template-main-description,
      .template-main-info {
        max-width: 100%;
      }
      ${tabletStyledMainInfo};
    }

    @media ${device.mobile} {
      ${mobileStyledMainInfo};
    }
  }

  .template-main-info {
    max-width: 544px;
    padding-left: 34px;

    .main-info-heading {
      padding-bottom: 16px;
    }

    .main-info-type-item {
      width: 100%;
      padding-bottom: 24px;
      border-bottom: 1px solid #e5e5e5;
    }

    .main-info-box {
      padding-top: 26px;
      justify-content: space-between;
      max-width: 360px;
      gap: 16px;
      align-items: flex-start;
      justify-content: flex-start;
    }
  }

  .template-main-img {
    margin: 0 auto;
    max-width: 544px;
    .template-image {
      width: 100%;
      height: auto;
      border: 1px solid #cccccc;
      box-shadow: 0px 7px 15px rgba(85, 85, 85, 0.1);
      border-radius: 3px;
    }
  }

  .template-main-description {
    max-width: 544px;
    padding-left: 34px;

    .file-description {
      padding: 24px 0;
      margin-bottom: 32px;
      border-bottom: 1px solid #e5e5e5;
    }

    .file-info {
      align-items: stretch;
      justify-content: space-between;
      max-width: 400px;
      padding-bottom: 30px;
    }

    .file-main-buttons {
      padding-bottom: 36px;
      grid-row-start: 1;
      width: 100%;
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
`;

export default StyledMainInfo;
