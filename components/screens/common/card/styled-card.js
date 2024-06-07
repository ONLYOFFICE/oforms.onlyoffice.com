import styled from "styled-components";
import { device } from "@utils/devices";
import searchIcon from "@public/icons/search-white.svg";
import pdfIcon from "@public/icons/pdf-16.svg";
import docIcon from "@public/icons/doc-16.svg";
import tabIcon from "@public/icons/tab-16.svg";
import presIcon from "@public/icons/pres-16.svg";

const StyledCard = styled.div`
  max-width: 352px;

  &:hover {
    .card-preview {
      &:before {
        opacity: 1;
        visibility: visible;
      }
    }

    .card-title {
      color: #FF6F3D;
    }
  }

  .card-preview {
    position: relative;
    display: block;
    padding: 14px;
    background-color: #FFFFFF;
    box-shadow: 0px 20px 50px 0px rgba(85, 85, 85, 0.15);

    &:before {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      border-radius: 50%;
      width: 72px;
      height: 72px;
      background-color: rgba(51, 51, 51, 0.7);
      background-image: url(${searchIcon.src});
      background-repeat: no-repeat;
      background-position: center;
      transform: translate(-50%, -50%);
      pointer-events: none;
      z-index: 1;
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.3s, visibility 0.3s;
    }
  }

  .card-template-format {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin-top: 10px;
    height: 16px;
  }

  .card-template-format-item {
    width: 16px;
    height: 16px;

    &:not(:last-child) {
      margin-right: 8px;
    }

    &.pdf {
      background-image: url(${pdfIcon.src});
    }

    &.doc {
      background-image: url(${docIcon.src});
    }

    &.tab {
      background-image: url(${tabIcon.src});
    }

    &.pres {
      background-image: url(${presIcon.src});
    }
  }

  .card-img {
    position: relative;
    padding-bottom: 62.966%;

    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: top;
    }

    @media screen and ${device.laptop} {
      padding-bottom: 62.67%;
    }

    @media screen and ${device.mobile} {
      padding-bottom: 62.697%;
    }
  }

  .card-body {
    padding: 24px;
  }

  .card-title {
    display: block;
    margin-bottom: 10px;
    font-size: 16px;
    font-weight: 700;
    line-height: 21px;
    letter-spacing: -0.02em;
    color: #444444;
    transition: color 0.3s;
  }

  .card-text {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    font-size: 13px;
    line-height: 19px;
    color: #808080;
    overflow: hidden;
  }

  @media screen and ${device.laptop} {
    max-width: 100%;
  }
`;

export default StyledCard;
