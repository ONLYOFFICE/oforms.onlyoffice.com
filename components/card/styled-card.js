import styled from "styled-components";

const StyledCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-items: stretch;
  max-width: 352px;
  height:  ${(props) =>
    props.shortCard ? '268px' : '666px'};
  border-radius: 3px;
  box-sizing: border-box;
  position: relative;

  .card-image {
    height: ${(props) =>
    props.shortCard ? '214px' : '486px'};
    width: ${(props) =>
    props.shortCard ? '160px' : '352px'};
  }
  .image-boxshadow-template{
    box-shadow: 0px 7px 15px rgba(85, 85, 85, 0.1);
    height: ${(props) =>
    props.shortCard ? '214px' : '486px'};
  }
  
  .image-template {
    max-width: ${(props) =>
    props.shortCard ? '160' : '254px'};
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
    position: ${(props) =>
    props.shortCard ? 'relative' : 'absolute'};
    left: 0;
    top: ${(props) =>
    props.shortCard ? 'auto' : '486px'};
    z-index: 1;
    border: 1px solid transparent;
  }

  .btn-container{
    margin-top: 16px;
    display: none;
  }

  &:hover,
  &:active {
    .card-template {
      background-color: #f9f9f9;
      border: 1px solid #e2e2e2;
      padding-bottom: 32px;
      box-shadow: 0px 20px 50px rgba(85, 85, 85, 0.15);
    }
    .btn-container{
      display: flex;
    }
    .image-boxshadow-template{
      box-shadow: 0px 20px 50px rgba(85, 85, 85, 0.15);
    }
  }

  .title-template {
    font-size: 18px;
    margin-bottom: 16px;
    height: 48px;
    line-height: 133%;
  }

  .subtitle-template {
    font-size: 14px;
    margin-bottom: 16px;
    height: 68px;
    line-height: 160%;
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

  .btn-container-link{
    width: calc(50% - 8px);
  }

  @media (max-width: 1200px) {
    height: 729px;
    max-width: 328px;
    .card-image,
    .image-boxshadow-template {
      height: 453px;
      box-shadow: 0px 7px 15px rgba(85, 85, 85, 0.1);
    }
    .card-image{
      width: 328px;
    }
    .image-template {
      max-width: 212px;
    }
    .card-template {
      position: relative;
      top: auto;
      left: auto;
      box-shadow: none;
      padding-bottom: 32px;
    }
    .btn-container{
      margin-top: 16px;
      display: flex;
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
        padding-bottom: 32px;
        box-shadow: none;
      }
      .image-boxshadow-template{
        box-shadow: 0px 7px 15px rgba(85, 85, 85, 0.1);
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
    }
  }

  @media (max-width: 700px) {
    .btn-container{
      margin-top: 8px;
      display: block;
    }
    .btn-container-link{
      width: 100%;
    }
    &:hover,
    &:active {
      .btn-container{
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

    .title-template,
    .subtitle-template{
      margin-bottom: 8px;
    }
    .btn-container{
      margin-top: 8px;
    }
    .card-template {
      padding: 24px 16px 8px 16px;
    }
    &:hover,
    &:active{
      .card-template{
        padding: 24px 16px 8px 16px;
      }
    }
    .title-template {
      height: 57px;
      font-size: 14px;
    }
    .subtitle-template {
      height: auto;
      font-size: 13px;
    }
  }

  @media (max-width: 425px) {
    max-width: 100%;
    .image-template {
      box-sizing: content-box;
      max-width: unset;
    }
    .title-template {
      height: 38px;
    }
  }
`;

export default StyledCard;
