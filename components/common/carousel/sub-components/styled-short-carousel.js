import styled from "styled-components";

const StyledShortCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-items: stretch;
  max-width: ${(props) => (props.shortCard ? "160px" : "352px")};
  height: ${(props) => (props.shortCard ? "214px" : "666px")};
  border-radius: 3px;
  box-sizing: border-box;
  position: relative;

  .card-image {
    height: ${(props) => (props.shortCard ? "214px" : "458px")};
    width: ${(props) => (props.shortCard ? "160px" : "324px")};
  }
  .image-boxshadow-template {
    box-shadow: 0px 7px 15px rgba(85, 85, 85, 0.1);
    height: ${(props) => (props.shortCard ? "214px" : "458px")};
    padding: ${(props) => (props.shortCard ? "0" : "13px")};
    background-color: #fff;
    border: 1px solid #E2E2E2;
  }

  .image-template {
    max-width: ${(props) => (props.shortCard ? "160" : "254px")};
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
    padding: ${(props) => (props.shortCard ? "0" : "22px 24px 0px 24px")};
    box-sizing: border-box;
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;
    position: ${(props) => (props.shortCard ? "relative" : "absolute")};
    top: ${(props) => (props.shortCard ? "auto" : "486px")};
    z-index: 1;
    border: 1px solid transparent;
  }

  .title-template {
    font-size: ${(props) => (props.shortCard ? "14px" : "16px")};
    margin-top: ${(props) => (props.shortCard ? "10px" : "0")};
    margin-bottom: ${(props) => (props.shortCard ? "0" : "8px")};
    line-height: 133%;
  }

  .subtitle-template {
    height: 68px;
    margin-bottom: ${(props) => (props.shortCard ? "16px" : "0")};
    font-size: 13px;
  }

  .title-overflow-templapte {
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

  @media (max-width: 1200px) {
    height: ${(props) => (!props.shortCard && "633px")};
    max-width: ${(props) => (props.shortCard ? "160px" : "328px")};
    margin-right: ${(props) => (props.shortCard ? "16px" : "24px")};;
    .card-image {
      height: ${(props) => (!props.shortCard && "100%")};
      width: ${(props) => (!props.shortCard && "100%")};
    }
    .image-boxshadow-template {
      height: ${(props) => (!props.shortCard && "425px")};
    }
    .image-template {
      max-width: ${(props) => (!props.shortCard && "212px")};
    }
    .card-template {
      position: relative;
      top: auto;
      left: auto;
    }
  }

  @media (max-width: 1024px) {
    max-width: ${(props) => (props.shortCard ? "160px" : "328px")};
    .card-image {
      height: 100%;
      width: 100%;
    }
  }

  @media (max-width: 768px) {
    height: ${(props) => (!props.shortCard && "338px")};
    max-width: ${(props) => (props.shortCard ? "160px" : "247px")};
    .image-boxshadow-template {
      height: ${(props) => (props.shortCard ? "173px" : "310px")};
      max-height: ${(props) => (props.shortCard ? "173px" : "338px")};
    }
    .title-template {
      font-size: ${(props) => (props.shortCard ? "14px" : "16px")};
    }

    .card-template{
      padding: ${(props) => (props.shortCard ? "0" : "16px 16px 0px 16px")};
    }
  }

  @media (max-width: 500px) {
    /* max-width: 168px; */
    max-width: ${(props) => (props.shortCard ? "130px" : "247px")};
    .card-image {
      /* height: 410px; */
      /* width: 290px;
      height: 420px; */
    }
    .image-template {
      box-sizing: border-box;
    }
  }

  @media (max-width: 425px) {
    max-width: 100%;
    .image-template {
      box-sizing: content-box;
      max-width: unset;
    }
  }
`;

export default StyledShortCard;
