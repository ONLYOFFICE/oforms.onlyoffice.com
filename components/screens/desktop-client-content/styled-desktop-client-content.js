import styled, { css } from "styled-components";
import Section from "@components/common/section";

const StyledDesktopClientContent = styled(Section)`
  padding: 32px 0;
  font-family: "Arial", sans-serif;

  .section-page {
    box-sizing: border-box;
    max-width: 1164px;
    padding: 0 44px;
  }

  .box-heading {
    position: relative;
    display: grid;
    grid-template-columns: auto 48px;
    gap: 24px;
    border-bottom: 1px solid #E2E2E2;
  }

  .search_area {
    background-color: transparent;
  }

  .search_container {
    border-bottom: none;
  }

  .group-input {
    height: 36px;
  }

  .search_input {
    padding: 11.5px 16px;
    font-size: 11px;
    line-height: 13px;
    font-weight: 400;
    color: #808080;
    height: 36px;
    background-color: transparent;

    &:hover:not(:focus) {
      border-color: transparent;
      background-color: transparent;
    }

    &:focus + label,
    &.has_value + label {
      top: 0px;
      left: 2px;
      font-size: 8px;
      color: #CCCCCC;
    }
  }

  .input-label {
    width: calc(100% - 32px);
    font-size: 11px;
    line-height: 13px;
    color: #808080;
  }

  .presearch_title {
    font-weight: 700;
    font-size: 11px;
    line-height: 16px;
    letter-spacing: 0.02em;
    color: #333333;
  }

  .search_icon {
    display: flex;
    padding: 10px;
    cursor: pointer;

    img {
      width: 16px;
      height: 16px;
    }
  }

  .search_img {
    display: none;
  }

  .result-search-wrapper {
    top: 40px;
    z-index: 10;
  }

  .box-doc-info-template {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 0;
  }

  .box-doc-info {
    display: flex;
    align-items: center;

    > div {
      align-items: center;
    }
  }

  .box-doc-categories {
    margin-right: 32px;
    font-weight: 400;
    font-size: 11px;
    line-height: 16px;
    color: #808080;

    > div {
      align-items: center;
    }

    .filter-header {
      margin: 0;
    }
  }

  .text-sort-set {
    margin: 0;
    font-weight: 400;
    font-size: 11px;
    line-height: 16px;
    letter-spacing: 0.02em;
    color: #808080;
    text-transform: initial;
  }

  .box-doc-categories {
    .filter-header {
      font-weight: 400;
      color: #808080;
    }
  }

  .filter-header,
  .filter-title {
    font-size: 11px;
    line-height: 16px;
    letter-spacing: 0.02em;
  }

  .filter-title {
    padding-left: 8px;
    font-weight: 700;
    color: #333333;
    cursor: pointer;
  }

  .filter_selector {
    right: 0px;
    top: 16px;
  }

  .arrow {
    margin: 0;
    padding-left: 8px;
    width: 16px;
    height: 16px;
  }

  .arrow > div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 16px;
    height: 16px;
  }

  .arrow svg {
    width: 8px;
    height: 4.66px;
  }

  .tempalates-cards-items .cards {
    min-width: initial;

    .card {
      width: 100%;
      max-width: 186px;
      height: initial;
      cursor: pointer;

      &:hover {
        .image-boxshadow-template {
          box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
        }

        .card-template {
          box-shadow: initial;
          background-color: initial;
        }
      }
    }

    .image-boxshadow-template {
      position: relative;
      box-shadow: initial;
      height: initial;
      padding: 0 0 138.71%;
      border: 1px solid #E2E2E2;
      border-radius: 2px;
      transition: box-shadow 0.3s;
    }

    .card-image {
      position: absolute;
      top: 0;
      left: 0;
      object-fit: contain;
    }

    .card-template {
      position: relative;
      top: initial;
      left: initial;
      padding: initial;
      height: initial;
      border: none;
    }

    .title-template {
      margin-bottom: 0;
      padding: 12px;
      text-align: center;
      font-weight: 400;
      font-size: 11px;
      line-height: 16px;
      letter-spacing: 0.02em;
      cursor: pointer;

      &:hover {
        color: #444444;
      }
    }

    .title-overflow-templapte {
      display: block;
      word-wrap: initial;
      white-space: nowrap;
    }

    .subtitle-template,
    .btn-container {
      display: none;
    }
  }
`;

export default StyledDesktopClientContent;
