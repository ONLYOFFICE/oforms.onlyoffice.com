import styled, { css } from "styled-components";
import Section from "../../section";

const StyledMainContent = styled(Section)`
  .heading-cards {
    padding-bottom: 50px;
    padding-top: 80px;
  }

  .tempalates-buttons-items {
    margin-top: 50px;
  }

  .box-doc-info-template {
    padding: 25px 0;
    display: grid;
    grid-auto-rows: auto;
    grid-template-columns: 1fr 3fr;

    .box-doc-info {
      display: flex;
      max-width: 832px;
      justify-content: space-between;
    }
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

  .text-control-mob {
    display: none;
  }

  .checkbox-card {
    padding: 10px;
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
      .box-doc-info-template {
        grid-column-start: 1;
        grid-column-end: 1;
      }
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
    .text-control {
      display: none;
    }

    .text-control-mob {
      display: block;
    }

    #mob-box-doc-categories {
      display: flex;
      justify-content: space-between;
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
