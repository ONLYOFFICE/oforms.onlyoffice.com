import styled from "styled-components";
import pdfIcon from "@public/icons/pdf-24.svg";
import docxIcon from "@public/icons/docx-24.svg";
import xlsxIcon from "@public/icons/xlsx-24.svg";
import pptxIcon from "@public/icons/pptx-24.svg";

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

    &.docx {
      &:before {
        background-image: url(${docxIcon.src});
      }
    }

    &.xlsx {
      &:before {
        background-image: url(${xlsxIcon.src});
      }
    }

    &.pptx {
      &:before {
        background-image: url(${pptxIcon.src});
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
