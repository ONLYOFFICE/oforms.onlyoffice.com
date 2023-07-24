import styled from "styled-components";
import { device } from "@components/utils/devices";
import Section from "@common/section";

const StyledLoadingForm = styled(Section)`
  background-color: #F5F5F5;
  padding: 56px 0 102px;

  .wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 32px;

    @media ${device.laptop} {
      display: block;
      max-width: 544px;
      margin: 0 auto;
    }
  }

  .upload-wrapper {
    @media ${device.laptop} {
      margin-bottom: 32px;
    }
  }

  .content {
    padding-bottom: 20px;

    @media ${device.laptop} {
      padding-bottom: 0;
    }
  }

  .title {
    margin-bottom: 24px;

    @media ${device.mobile} {
      font-size: 20px;
      line-height: 27px;
    }
  }

  .subtitle {
    margin-bottom: 24px;
    font-size: 16px;
    line-height: 24px;
    color: #666666;

    @media ${device.mobile} {
      font-size: 14px;
      line-height: 21px;
    }
  }

  .wrapper-content {
    border-bottom: 1px solid #E5E5E5;
    padding-bottom: 39px;
    margin-bottom: 40px;

    @media ${device.mobile} {
      padding-bottom: 31px;
    }
  }

  .file-info {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin-bottom: 40px;
  }

  .file-info-item {
    display: flex;

    &:not(:last-child) {
      margin-right: 32px;
    }
  }

  .file-info-label {
    margin-right: 8px;
    color: #AAAAAA;
    font-size: 13px;
    line-height: 24px;
    font-weight: 600;

    &.file-type {
      padding-right: 32px;
      background-image: url("https://static-oforms.onlyoffice.com/icons/oform.svg");
      background-repeat: no-repeat;
      background-size: contain;
      background-position: right center;
    }
  }

  .file-info-text {
    color: #333333;
    font-size: 13px;
    line-height: 24px;
    font-weight: 600;
  }

  .send-button {
    position: relative;
    width: 100%;
    font-size: 13px;
    line-height: 17px;
    transition: background-color 0.3s, opacity 0.3s;

    &.loading {
      font-size: 0;

      &:after {
        content: "";
        position: absolute;
        left: 50%;
        top: 50%;
        width: 18px;
        height: 18px;
        margin: 0 auto;
        border: 2px solid #ffffff;
        border-radius: 75%;
        border-right-color: transparent;
        transform: translate(-50%, -50%);
        animation: cssload-spin 1025ms infinite linear;
      }
      
      @keyframes cssload-spin {
        100%{ transform: translate(-50%, -50%) rotate(360deg); }
      }
    }
  }

  @media ${device.mobile} {
    padding: 40px 0 56px;
  }
`;

export default StyledLoadingForm;
