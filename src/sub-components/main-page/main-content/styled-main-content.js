import styled, { css } from "styled-components";
import Section from "../../section";

const StyledMainContent = styled(Section)`
  padding: 10px 0 50px 0;
  .heading-cards {
    padding-bottom: 50px;
    padding-top: 80px;
  }

  .tempalates-buttons-items {
    border: 1px solid #aaaaaa;
    margin-top: 40px;
  }

  .box-doc-info-template {
    padding: 25px 0;
    display: grid;
    grid-auto-rows: auto;
    grid-template-columns: 1fr 3fr;

    .box-doc-info {
      display: flex;
      max-width: 832px;
      /* justify-content: space-between; */
      justify-content: flex-end;
    }
  }

  .reset-group-checkbox-mobile {
    display: none;
  }
  .tms-categories-svg {
    display: none;
  }
  .checkbox-group-filter-btn {
    display: none;
  }

  .box-cards-template {
    justify-content: flex-start;
    align-items: flex-start;
  }

  .idk-box-template {
    display: grid;
    grid-template-columns: ${(props) =>
      props.groupCheckboxIsOpen ? "1fr 5fr" : "auto"};
    min-height: 740px;
    .box-doc-info-template {
      grid-column-start: 1;
      grid-column-end: 5;
      grid-row-start: 1;
      grid-row-end: 2;
    }

    ${(props) =>
      props.groupCheckboxIsOpen
        ? css`
            .checkbox-card-group {
              display: block;
              width: 280px;
              grid-row-start: 2;
              grid-column-start: 1;
              grid-column-end: 2;
            }
            .tempalates-cards-items {
              grid-row-start: 2;
              max-width: 832px;
              grid-column-start: 2;
              grid-column-end: 6;
            }
          `
        : css`
            .checkbox-card-group {
              display: none;
            }
            .box-doc-info-template {
              grid-column-start: 1;
              grid-column-end: 2;
            }
            .tempalates-cards-items {
              grid-row-start: 2;
              max-width: 100%;
              grid-column-start: 1;
              grid-column-end: 2;
            }
          `}
  }

  .box-doc-categories {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: baseline;
    cursor: pointer;

    .categories-svg {
      margin-left: 7px;
    }
  }
  /** DELETE THIS */
  /* .box-doc-categories {
    display: none;
  } */
  /** */
  .text-control-mob {
    display: none;
  }

  .checkbox-card {
    padding: 10px;
  }

  .reset-group-checkbox {
    padding: 10px;
    color: #ff6f3d;
    font-size: 14px;
    text-decoration: underline;
    cursor: pointer;
  }

  @media (max-width: 1200px) {
    .checkbox-card-group {
      max-width: 235px;
    }
  }

  @media (max-width: 1024px) {

    .heading-cards {
      font-size: 32px;
    }

    .checkbox-card-group {
      max-width: 215px;
    }

    .idk-box-template {
      justify-content: center;
    }
  }

  @media (max-width: 768px) {
    .box-doc-info-template {
      max-width: 690px;
      min-width: 688px;
      margin: 0 auto;
    }

    .checkbox-card-group {
      position: absolute;
      top: 275px;
      background: white;
      left: 5px;
      padding: 25px;
    }

    .idk-box-template {
      justify-content: center;
    }

    .tempalates-cards-items {
      margin: 0 auto;
      grid-row-start: 2;
    }
    .idk-box-template {
      grid-template-columns: auto;
      .box-doc-info-template {
        grid-column-start: 1;
        grid-column-end: 1;
      }
      ${(props) =>
        props.groupCheckboxIsOpen
          ? css`
              .tempalates-cards-items {
                grid-row-start: 2;
                grid-column-start: auto;
                grid-column-end: auto;
              }
            `
          : css`
              .checkbox-card-group {
                display: none;
              }
              .tempalates-cards-items {
                grid-row-start: auto;
                max-width: 100%;
                grid-column-start: auto;
                grid-column-end: auto;
              }
            `}
    }
  }

  @media (max-width: 700px) {
    .heading-cards {
      font-size: 24px;
      padding-bottom: 40px;
      padding-top: 16px;
    }

    .idk-box-template {
      justify-content: center;
    }

    .box-doc-info-template {
      margin: 0;
      min-width: auto;
    }
  }

  @media (max-width: 600px) {
    ${(props) =>
      props.groupCheckboxIsOpen
        ? css`
            .idk-box-template {
              .checkbox-card-group {
                height: 100%;
                z-index: 1000;
                width: 100vw;
                display: block;
                left: 0;
                top: 0;
                position: fixed;
                overflow-y: scroll;
                margin: 0;
                max-width: 100%;
              }
            }
          `
        : css`
            .checkbox-card-group {
              display: none;
            }
            .tempalates-cards-items {
              grid-row-start: auto;
              max-width: 100%;
              grid-column-start: auto;
              grid-column-end: auto;
            }
          `}
    .checkbox-card-group {
      padding: 0;
    }

    .checkbox-group-filter-tems {
      padding: 20px 0;
    }

    .reset-checkbox-group-items {
      background-color: #f5f5f5;
      height: 56px;
      display: flex;
      align-content: center;
      column-gap: 25vw;
      align-items: center;
      padding: 0 15px;
    }

    .checkbox-card {
      padding-left: 25px;
    }

    .reset-group-checkbox-mobile {
      display: block;
    }
    .tms-categories-svg {
      display: block;
    }
    .checkbox-group-filter-btn {
      display: block;
    }

    .text-control {
      display: none;
    }

    .text-control-mob {
      display: block;
    }

    #mob-box-doc-categories {
      display: flex;
      justify-content: center;
      width: 100%;
      padding-bottom: 25px;
    }

    .box-doc-info {
      justify-content: center;
    }

    .box-doc-info-template {
      display: flex;
      flex-direction: column;
    }

    .tempalates-cards-items {
      grid-row-start: 2;
      grid-column-start: auto;
      grid-column-end: auto;
    }
  }

  @media (max-width: 485px) {
    .box-cards-template {
      justify-content: center;
    }

    .idk-box-template {
      /* .box-doc-info-template {
      display: flex;
      justify-content: center;
      align-items: center;
    } */
    }
  }
`;

export default StyledMainContent;
