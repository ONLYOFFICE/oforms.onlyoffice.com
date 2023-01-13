import styled, { css } from "styled-components";
import Section from "@components/common/section";

const StyledDesktopClientContent = styled(Section)`
  padding: 32px 0;

  .section-page {
    box-sizing: border-box;
    max-width: 100vw;
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
    max-width: 100vw;
  }

  .group-input {
    height: 36px;
  }

  .search_input {
    padding: 6.5px 16px;
    font-size: 14px;
    line-height: 22px;
    font-weight: 400;
    font-family: "Open Sans", sans-serif;
    color: #808080;
    height: 36px;
    background-color: transparent;

    &:hover:not(:focus) {
      border-color: transparent;
      background-color: transparent;
    }

    &:focus + label,
    &.has_value + label {
      top: -6px;
      left: 2px;
      font-size: 8px;
      color: #CCCCCC;
    }
  }

  .input-label {
    top: 6.5px;
    width: calc(100% - 32px);
    font-size: 14px;
    line-height: 22px;
    color: #808080;
  }

  .presearch_title {
    font-size: 14px;
    line-height: 19px;
    font-weight: 700;
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

    .result-search {
      max-width: calc(100% - 200px);
    }
  
    .item-result-search {
      max-width: 100%;
    }
  }

  .language-selector {
    width: 55px;
    grid-template-columns: 27px 24px;
  }

  .lng-selector {
    left: 0;
  }

  .box-doc-info-template {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 24px 0 16px;
  }

  .box-doc-info {
    display: flex;
    align-items: center;

    > div {
      align-items: center;
    }

    .filter_selector {
      right: 0px;
      top: 20px;
      padding-top: 4px;
      min-width: 106px;
      box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
      border-radius: 2px;
    }
  
    .filter_selector-items {
      padding: 3px 11px 2px;
      font-size: 14px;
      line-height: 22px;
      color: #000000;
      transition: background-color 0.3s;
  
      &:hover {
        color: #000000;
        background-color: #E0E0E0;
      }

      &.active {
        background-color: #CCCCCC;
      }
    }
  }

  .box-doc-categories {
    margin-right: 32px;
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
    color: #808080;

    > div {
      align-items: center;
    }

    .filter-header {
      margin: 0;
    }

    .filter_selector {
      top: 21px;
      left: 0;
      box-shadow: 0px 20px 50px rgba(85, 85, 85, 0.15);
      border-radius: 0px 0px 6px 6px;

      .arrow-link {
        &:first-child {
          padding: 14.5px 32px;
        }
      }
    }

    .filter_selector-items-header {
      font-size: 14px;
      line-height: 17px;
      font-weight: 600;
      letter-spacing: 0.04em;
      text-transform: none !important;

        &:hover{
          color: #ff6f3d;
      }
    }

    .filter_selector-items {
      font-size: 14px;
      line-height: 17px;
      text-transform: initial;
    }
  }

  .heading-nav-item {
    padding: 0;
    line-height: 17px;
    font-size: 14px;
    cursor: pointer;
    white-space: nowrap;
    display: block;
    text-transform: none !important;
    font-weight: 600;
    letter-spacing: 0.04em;
    color: #444;
  }

  .filter_selector-items {
    font-size: 14px;
    cursor: pointer;
    white-space: nowrap;
    display: block;
    text-transform: none !important;
    font-weight: 600;
    letter-spacing: 0.04em;
    color: #444;
  }

  .text-sort-set {
    margin: 0;
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
    color: #808080;
    text-transform: initial;
  }

  .box-doc-categories {
    .filter-header {
      font-weight: 400;
      color: #808080;
    }
  }

  .filter-header {
    font-size: 14px;
  }

  .filter-header-name {
    color: #000;
    font-size: 14px;
    font-weight: 700;
    margin: 0 8px 0 8px;
    cursor: pointer;
  }

  .filter-title {
    padding-left: 8px;
    line-height: 21px;
    font-weight: 700;
    color: #333333;
    cursor: pointer;
  }

  .arrow {
    margin: 0;
    padding-left: 8px;
    width: 10px;
  }

  .arrow > div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 10px;
  }

  .arrow svg {
    width: 9px;
    height: 5.24px;
  }

  .arrow-link {
    padding: 12px 32px;
    transition: background-color 0.3s;
    cursor: pointer;

    &:hover {
      background-color: #CCCCCC;

      span {
        color: #444444;
        outline: none;
      }

      .item_arrow {
        background-image: url('https://static-oforms.teamlab.info/icons/arrow-right.svg');
      }
    }

    &.active {
      background-color: #CCCCCC;
    }
  }

  .submenu_link {
    transition: background-color 0.3s;
    
    .filter_selector-items {
      line-height: 24px;
    }

    &:nth-child(odd) {
      padding: 8px 32px 8px 32px;
      border-right: 1px solid #EFEFEF;
    }

    &:nth-child(even) {
      padding: 8px 32px 8px 32px;
    }

    &:hover {
      background-color: #E0E0E0;

      span {
        color: #444444;
      }
    }

    &.active {
      background-color: #CCCCCC;
    }
  }

  .types_list {
    padding: 16px 0;
  }

  .tempalates-cards-items .cards {
    min-width: initial;

    .card {
      width: 100%;
      max-width: 188px;
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
      font-size: 14px;
      line-height: 22px;
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

  .presearch_title,
  .filter-header,
  .filter-title,
  .filter_selector-items-header,
  .filter_selector-items,
  .title-overflow-templapte,
  .box-doc-categories,
  .text-sort-set {
    outline: none;
  }

  @media (max-width: 1200px) {  

    .tempalates-cards-items .cards {
      justify-content: left;
      }
  }
`;

export default StyledDesktopClientContent;
