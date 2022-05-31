import styled from "styled-components";

const StyledCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-items: stretch;
  max-width: 352px;
  height: 666px;
  border-radius: 3px;
  box-sizing: border-box;
  position: relative;

  .card-image {
    height: 458px;
    width: 324px;
  }
  .image-boxshadow-template {
    box-shadow: 0px 7px 15px rgba(85, 85, 85, 0.1);
    height: 458px;
    padding: 13px;
    background-color: #fff;
    border: 1px solid #E2E2E2;
  }

  .image-template {
    max-width: 254px;
    border: 1px solid #e2e2e2;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
    border-bottom: none;
    border-top-right-radius: 3px;
    border-top-left-radius: 3px;
  }

  .card-template {
    background-color: transparent;
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;
    padding: 22px 24px 0px 24px;
    box-sizing: border-box;
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;
    position: absolute;
    width: 100%;
    left: 0;
    top: 486px;
    z-index: 1;
    border: 1px solid transparent;
    height: 226px;
  }

  .btn-container {
    display: none;
  }

  &:hover,
  &:active {
    .card-template {
      background-color: #f9f9f9;
      padding-bottom: 32px;
      box-shadow: 0px 20px 50px rgba(85, 85, 85, 0.15);
      border: 1px solid #CCCCCC;
      border-top: 1px solid transparent;
    }
    .btn-container {
      display: flex;
      position: absolute;
      width: 100%;
      bottom: 24px;
      left: 0;
      padding: 0 24px;
      box-sizing: border-box;
    }
    .image-boxshadow-template {
      box-shadow: 0px 20px 50px rgba(85, 85, 85, 0.15);
      border: 1px solid #CCCCCC;
      border-bottom: 1px solid transparent;
    }
  }

  .title-template {
    font-size: 16px;
    margin-bottom: 8px;
    line-height: 133%;
  }

  .subtitle-template {
    font-size: 13px;
    margin-bottom: 16px;
    line-height: 160%;
  }
  .title-overflow-templapte{
    -ms-text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
    text-overflow: ellipsis;
    overflow: hidden;
    -ms-line-clamp: 2;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    display: -webkit-box;
    display: box;
    word-wrap: break-word;
    -webkit-box-orient: vertical;
    box-orient: vertical;
  }
  .text-overflow-templapte {
    -ms-text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
    text-overflow: ellipsis;
    overflow: hidden;
    -ms-line-clamp: 3;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    display: -webkit-box;
    display: box;
    word-wrap: break-word;
    -webkit-box-orient: vertical;
    box-orient: vertical;
  }

  .redactor-btn-template {
    height: 48px;
    margin-bottom: 0px;
  }

  .download-btn-template {
    letter-spacing: 0.04em;
    height: 48px;
    background-color: transparent;
    margin: 0 auto;
    opacity: 1;
  }

  .btn-container-link {
    width: calc(50% - 8px);
  }

  @media (max-width: 1200px) {
    height: 729px;
    max-width: 328px;
    .card-image {
      height: 425px;
      width: 328px;
    }
    .image-boxshadow-template {
      height: 425px;
      box-shadow: 0px 7px 15px rgba(85, 85, 85, 0.1);
    }
    .image-template {
      max-width: 212px;
    }
    .card-template {
      position: relative;
      top: auto;
      box-shadow: none;
      height: 232px;
    }
    .btn-container {
      display: flex;
      position: absolute;
      width: 100%;
      bottom: 24px;
      left: 0;
      padding: 0 24px;
      box-sizing: border-box;
    }
    .subtitle-template {
      margin-bottom: 24px;
    }
    &:hover,
    &:active {
      box-shadow: none;
      .card-template {
        background-color: unset;
        border: 1px solid transparent;
        box-shadow: none;
      }
      .image-boxshadow-template {
        box-shadow: 0px 7px 15px rgba(85, 85, 85, 0.1);
        border: 1px solid #E2E2E2;
      }
    }
  }

  @media (max-width: 1024px) {
    .card-image {
      height: 100%;
      width: 100%;
      /* width: 290px;
      height: 420px; */
    }
  }

  @media (max-width: 768px) {
    height: auto;
    max-width: calc(50% - 16px);

    .image-boxshadow-template {
      height: auto;
      padding: 7px;
    }
  }

  @media (max-width: 700px) {
    .btn-container {
      display: block;
    }
    .card-template {
      position: relative;
      top: auto;
      box-shadow: none;
      height: 292px;
    }
    .subtitle-template {
      margin-bottom: 16px;
    }
    .btn-container-link {
      width: 100%;
    }
    &:hover,
    &:active {
      .btn-container {
        display: initial;
      }
    }
    .download-btn-template {
      margin: 10px auto 0;
    }
  }

  @media (max-width: 500px) {
    /* max-width: 168px; */
    max-width: calc(50% - 8px);
    .card-image {
      /* height: 410px; */
      /* width: 290px;
      height: 420px; */
    }
    .image-template {
      box-sizing: border-box;
    }
    .btn-container {
      padding: 0 16px;
    }
    &:hover,
    &:active {
      .btn-container {
        padding: 0 16px;
      }
    }
    .card-template {
      height: 282px;
      padding: 16px 16px 8px 16px;
    }
    &:hover,
    &:active {
      .card-template {
        padding: 16px 16px 8px 16px;
      }
    }
    .title-template {
      font-size: 14px;
    }
    .subtitle-template {
      height: auto;
      font-size: 13px;
    }
  }

  @media (max-width: 425px) {
    max-width: 100%;
    .card-template {
      height: auto;
    }
    .btn-container {
      position: relative;
      padding: 0;
      left: auto;
      bottom: auto;
    }
    &:hover,
    &:active {
      .btn-container {
        position: relative;
        padding: 0;
        left: auto;
        bottom: auto;
      }
    }
    .image-template {
      box-sizing: content-box;
      max-width: unset;
    }
    .image-boxshadow-template {
      padding: 14px;
    }
  }
`;

export default StyledCard;
