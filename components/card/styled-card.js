import styled from "styled-components";

const StyledCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-items: stretch;
  max-width: 256px;
  box-shadow: 0px 20px 50px rgba(85, 85, 85, 0.1);
  background-color: #f9f9f9;
  border-radius: 3px;
  box-sizing: border-box;

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
    background-color: #f9f9f9;
    border: 1px solid #e2e2e2;
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;
    padding: 22px 24px 0px 24px;
    max-height: 239px;
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;
  }

  .title-template {
    font-size: 16px;
    margin-bottom: 16px;
    height: 42px;
  }

  .subtitle-template {
    font-size: 13px;
    margin-bottom: 24px;
    height: 42px;
  }

  .text-overflow-templapte {
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
    font-size: 13px;
  }

  .redactor-btn-template {
    border: 1px solid #aaaaaa;
    height: 48px;
    margin-bottom: 0px;
    height: 48px;
  }

  .download-btn-template {
    letter-spacing: 0.04em;
    margin-top: 8px;
    background-color: transparent;
    margin: 4px auto;
    opacity: 1;
  }

  @media (max-width: 1200px) {
    max-width: 214px;
    .image-template {
      max-width: 212px;
    }
  }

  @media (max-width: 500px) {
    max-width: 168px;
    .image-template {
      box-sizing: border-box;
    }
    .card-template {
      padding: 12px 12px 10px 12px;
    }
  }

  @media (max-width: 425px) {
    max-width: 288px;
    .image-template {
      box-sizing: content-box;
      max-width: 286px;
    }
  }
`;

export default StyledCard;
