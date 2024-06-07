import styled from "styled-components";
import { device } from "@utils/devices";
import pdfIcon from "@public/icons/pdf-24.svg";
import docIcon from "@public/icons/doc-24.svg";
import tabIcon from "@public/icons/tab-24.svg";
import presIcon from "@public/icons/pres-24.svg";

const StyledExploreOtherTemplate = styled.div`
  .templates-editor {
    margin-bottom: 24px;
  }

  .explore-other-template-title {
    margin-bottom: 24px;
    font-weight: 600;
    letter-spacing: -0.02em;
  }

  .explore-other-template-items {
    display: flex;
    flex-wrap: wrap;
  }

  .templates-editor-btn {
    display: inline-flex;
    align-items: center;
    border-radius: 4px;
    margin-bottom: 16px;
    padding: 16px;
    font-size: 16px;
    line-height: 24px;
    background-color: #FFFFFF;
    color: #444444;
    transition: color 0.3s;

    &:before {
      content: "";
      display: inline-flex;
      margin-right: 4px;
      width: 24px;
      height: 24px;
      background-repeat: no-repeat;
      background-position: center;
    }

    &:not(:last-child) {
      margin-right: 16px;
    }

    &.pdf {
      &:before {
        background-image: url(${pdfIcon.src});
      }
    }

    &.document {
      &:before {
        background-image: url(${docIcon.src});
      }
    }

    &.spreadsheet {
      &:before {
        background-image: url(${tabIcon.src});
      }
    }

    &.presentation {
      &:before {
        background-image: url(${presIcon.src});
      }
    }

    &:hover {
      color: #FF6F3D;
    }
  }

  .btn-transparent {
    box-sizing: border-box;
    border: 1px solid #AAAAAA;
    border-radius: 4px;
    margin: 0 16px 16px 0;
    padding: 11px 18px;
    font-size: 16px;
    line-height: 24px;
    color: #444444;
    transition: border-color 0.3s, color 0.3s;

    &:hover {
      border-color: #FF6F3D;
      color: #FF6F3D;
    }
  }
`;

export default StyledExploreOtherTemplate;
