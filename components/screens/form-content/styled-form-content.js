import styled from "styled-components";
import Section from "@components/common/section";
import { device } from "@utils/devices";

const StyledMain = styled(Section)`
  padding: 56px 0 124px;

  .breadcrumbs {
    margin-bottom: 24px;

    @media screen and ${device.laptop} {
      justify-content: center;
      margin-bottom: 32px;
    }

    @media screen and ${device.mobile} {
      margin-bottom: 16px;
    }
  }

  .form-preview {
    display: grid;
    align-items: start;
    margin-bottom: 56px;

    @media screen and ${device.laptop} {
      margin-bottom: 112px;
    }

    @media screen and ${device.mobile} {
      margin-bottom: 0;
    }
  }

  .form-img {
    grid-area: 1 / 1 / 5 / 2;
    box-sizing: border-box;
    border-radius: 3px;
    margin-right: 56px;
    padding: 16px;
    max-width: 544px;
    min-width: 544px;
    border: 1px solid #CCCCCC;
    box-shadow: 0 7px 15px 0 rgba(85, 85, 85, 0.1);
    overflow: hidden;

    img {
      max-width: 100%;
    }

    @media screen and (max-width: 1200px) {
      min-width: 444px;
    }

    @media screen and ${device.laptop} {
      grid-area: initial;
      justify-self: center;
      margin: 0 0 56px;
      max-width: 544px;
      min-width: initial;
    }

    @media screen and ${device.mobile} {
      margin: 0 0 32px;
    }
  }

  .form-info {
    grid-area: 1 / 2 / 2 / 3;
    margin-bottom: 24px;
    max-width: 520px;
    min-width: 520px;

    @media screen and (max-width: 1200px) {
      min-width: initial;
    }

    @media screen and ${device.laptop} {
      grid-area: initial;
      margin-bottom: 56px;
      max-width: 100%;
    }

    @media screen and ${device.mobile} {
      margin-bottom: 32px;
    }
  }

  .form-description {
    grid-area: 2 / 2 / 3 / 3;
    max-width: 520px;
    min-width: 520px;

    @media screen and (max-width: 1200px) {
      min-width: initial;
    }

    @media screen and ${device.laptop} {
      display: flex;
      flex-direction: column;
      grid-area: initial;
      max-width: 100%;
    }
  }

  .form-title {
    margin-bottom: 16px;
    letter-spacing: -0.02em;

    @media screen and ${device.laptop} {
      text-align: center;
    }

    @media screen and ${device.mobile} {
      font-size: 20px;
      line-height: 27px;
    }
  }

  .form-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;

    .tag {
      border-radius: 3px;
      padding: 5px 8px;
      font-size: 14px;
      font-weight: 600;
      line-height: 19px;
    }

    @media screen and ${device.laptop} {
      justify-content: center;
      border-bottom: 1px solid #E5E5E5;
      margin-bottom: 23px;
      padding-bottom: 24px;
    }

    @media screen and ${device.mobile} {
      margin-bottom: 15px;
      padding-bottom: 16px;
    }
  }

  .form-tag {
    border: 1px solid #75C9C4;
    color: #317773;
    background-color: #E6FAF9;
  }

  .template-tag {
    border: 1px solid rgba(68, 105, 149, 0.5);
    color: #446995;
    background-color: #EDF5FF;
  }

  .form-text {
    margin-bottom: 24px;

    p {
      display: block;
      font-size: 16px;
      line-height: 24px;

      &:not(:last-child) {
        margin-bottom: 8px;
      }
    }

    @media screen and ${device.laptop} {
      border-bottom: 1px solid #E5E5E5;
      padding-bottom: 31px;
      margin-bottom: 32px;
    }
  }

  .form-row {
    display: flex;
    margin-bottom: 24px;
    font-size: 13px;
    line-height: 21px;

    @media screen and ${device.laptop} {
      justify-content: center;
      margin-bottom: 0;
    }

    @media screen and ${device.mobile} {
      flex-direction: column;
    }
  }

  .form-row-info {
    border-bottom: 1px solid #E5E5E5;
    padding-bottom: 39px;
    margin-bottom: 40px;

    @media screen and ${device.laptop} {
      border-bottom: 0;
      padding-bottom: 0;
      margin-bottom: 32px;
    }

    @media screen and ${device.mobile} {
      margin-bottom: 16px;
    }
  }

  .form-row-mobile {
    display: none;
    
    @media screen and ${device.laptop} {
      display: flex;  
    }

    @media screen and ${device.mobile} {
      text-align: center;
    }
  }

  .form-row-laptop {
    display: flex;
    
    @media screen and ${device.laptop} {
      display: none;  
    }
  }

  .form-item {
    display: flex;

    &.last-updated {
      &:not(:last-child) {
        margin-right: 16px;

        @media screen and ${device.mobile} {
          justify-content: center;
          margin-right: 0;
          margin-bottom: 16px;
        }
      }
    }

    &:not(:last-child) {
      margin-right: 32px;

      @media screen and ${device.mobile} {
        margin-right: 0;
        margin-bottom: 16px;
      }
    }
  }

  .form-item-label {
    margin-right: 8px;
    color: #AAAAAA;
  }

  .form-item-info {
    font-weight: 600;
  }

  .suggest-changes-link {
    font-size: 13px;
    color: #FF6F3D;
    text-decoration: underline;

    &:hover {
      text-decoration: none;
    }
  }

  .form-download {
    margin-bottom: 40px;

    @media screen and ${device.laptop} {
      margin-bottom: 32px;
    }

    @media screen and ${device.mobile} {
      margin-bottom: 16px;
    }
  }

  .form-btns {
    margin-bottom: 40px;

    @media screen and ${device.laptop} {
      margin-bottom: 32px;
      text-align: center;
      order: -1;
    }
  }

  .share-buttons {
    @media screen and ${device.laptop} {
      justify-content: center;
    }

    @media screen and ${device.mobile} {
      justify-content: initial;
    }
  }

  .btn-primary,
  .btn-secondary {
    box-sizing: border-box;
    display: inline-flex;
    border-radius: 3px;
    padding: 19px 24px;
    font-size: 13px;
    font-weight: 700;
    line-height: 18px;
    letter-spacing: 0.04em;
    color: #FFFFFF;
    text-decoration: none;
    text-transform: uppercase;
    white-space: nowrap;

    @media screen and ${device.mobile} {
      padding: 15px 24px;
      height: 48px;
    }

    @media screen and ${device.mobile} {
      width: 100%;
      justify-content: center;
    }
  }

  .btn-primary {
    margin-right: 16px;
    background-color: #FF6F3D;
    transition: background-color 0.3s;

    &:hover {
      background-color: #FF865C;
    }

    @media screen and ${device.mobile} {
      margin-right: 0;
      margin-bottom: 16px;
    }
  }

  .btn-secondary {
    background-color: #444444;
    transition: background-color 0.3s;

    &:hover {
      background-color: #555555;
    }
  }

  .banner-how-create-form {
    @media screen and ${device.mobile} {
      display: none;
    }
  }

  @media screen and ${device.laptop} {
    padding: 80px 0;
  }

  @media screen and ${device.mobile} {
    padding: 48px 0 72px;
  }
`;

const StyledForms = styled(Section)`
  padding: 112px 0;
  background-color: #F5F5F5;

  .card-slider {
    margin-bottom: 32px;

    @media screen and ${device.mobile} {
      margin-bottom: 24px;
    }

    @media screen and ${device.mobile} {
      margin-bottom: 16px;
    }
  }

  .explore-other-template {
    margin-top: 56px;

    @media screen and ${device.laptop} {
      margin-top: 40px;
    }

    @media screen and ${device.mobile} {
      margin-top: 24px;
    }
  }

  @media screen and ${device.laptop} {
    padding: 80px 0;
  }

  @media screen and ${device.mobile} {
    padding: 48px 0;
  }
`;

export { StyledMain, StyledForms };
