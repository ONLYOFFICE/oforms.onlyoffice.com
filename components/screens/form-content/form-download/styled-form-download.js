import styled from "styled-components";
import pdfIcon from "@public/icons/pdf-24.svg";
import docIcon from "@public/icons/doc-24.svg";
import tabIcon from "@public/icons/tab-24.svg";
import presIcon from "@public/icons/pres-24.svg";

const StyledFormDownload = styled.div`
  display: flex;
  align-items: center;
  padding: 2px 0;

  .form-download-title {
    margin-right: 8px;
    font-weight: 600;
    letter-spacing: 0.04em;
    white-space: nowrap;
    text-tranform: uppercase;
  }

  .form-download-list {
    display: flex;
    flex-wrap: wrap;
    padding: 0;
    margin: 0;
    list-style-type: none;

    li {
      &:not(:last-child) {
        margin-right: 8px;
      }
    }
  }

  .form-download-item {
    position: relative;
    display: flex;
    align-items: center;
  }

  .form-download-link {
    position: relative;
    display: flex;
    align-items: center;
    padding: 4px 5px 4px 4px;
    font-size: 14px;
    line-height: 22px;
    transition: color 0.3s;

    &:before {
      content: "";
      display: inline-flex;
      margin-right: 5px;
      width: 24px;
      height: 24px;
      background-repeat: no-repeat;
      background-position: center;
    }

    &:not(:last-child) {
      margin-right: 5px;
    }

    &.pdf {
      &:before {
        background-image: url(${pdfIcon.src});
      }
    }

    &.doc {
      &:before {
        background-image: url(${docIcon.src});
      }
    }

    &.tab {
      &:before {
        background-image: url(${tabIcon.src});
      }
    }

    &.pres {
      &:before {
        background-image: url(${presIcon.src});
      }
    }

    &:hover {
      color: #FF6F3D;
    }
  }

  .form-download-tooltip {
    display: inline-flex;

    button {
      border: none;
      padding: 0;
      background-color: transparent;
      cursor: pointer;

      div {
        display: flex;
      }

      svg {
        path {
          fill: rgba(68, 68, 68, 0.2);
          transition: fill 0.3s;
        }
      }
    }

    &:hover {
      button {
        svg {
          path {
            fill: #666666;
          }
        }
      }
    }
  }

  .react-tooltip {
    border-radius: 5px;
    margin: 0 10px;
    padding: 6px 8px;
    font-size: 13px;
    line-height: 18px;
    color: #FFFFFF;
    max-width: 180px;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 10;
  }

  .react-tooltip-arrow {
    display: none;
  }
`;

export default StyledFormDownload;