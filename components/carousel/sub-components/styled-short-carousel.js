import styled from "styled-components";

const StyledShortCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-items: stretch;
  max-width: 160px;
  height: 214px;
  border-radius: 3px;
  box-sizing: border-box;
  position: relative;

  .card-image {
    height: 214px;
    width: 160px;
  }
  .image-boxshadow-template{
    box-shadow: 0px 7px 15px rgba(85, 85, 85, 0.1);
    height: 214px;
  }
  
  .image-template {
    max-width: 160px;
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
    padding: 0;
    box-sizing: border-box;
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;
    position: relative;
    z-index: 1;
    border: 1px solid transparent;
  }

  .title-template {
    font-size: 14px;
    margin-top: 10px;
    padding-bottom: 19px;
    height: 57px;
    line-height: 133%;
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

  @media (max-width: 1024px) {
    .card-image {
      height: 100%;
      width: 100%;
      /* width: 290px;
      height: 420px; */
    }
  }

  @media (max-width: 768px) {
    max-width: calc(50% - 16px);

    .image-boxshadow-template {
      height: 214px;
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

    .title-template{
      margin-bottom: 8px;
      height: 57px;
      font-size: 14px;
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

export default StyledShortCard;
