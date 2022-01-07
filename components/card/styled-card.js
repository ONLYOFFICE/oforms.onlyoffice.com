import styled from "styled-components";

const StyledCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-items: stretch;
  max-width: 256px;
  max-height: 576px;
  background-color: #f9f9f9;

  .image-template {
    max-width: 254px;
    border: 1px solid #e2e2e2;
    border-bottom: none;
  }

  .card-template {
    background-color: #f9f9f9;
    border: 1px solid #e2e2e2;
    padding: 22px 24px 0px 24px;
    max-height: 239px;
  }

  .title-template {
    margin-bottom: 16px;
    height: 42px;
  }

  .subtitle-template {
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
  }

  .redactor-btn-template {
    margin-bottom: 0px;
  }

  .download-btn-template {
    background-color: transparent;
  }

  @media (max-width: 1200px) {
    max-width: 214px;
    max-height: 552px;
    .image-template {
      max-width: 212px;
    }
  }

  @media (max-width: 500px) {
    max-width: 168px;
    .card-template {
      padding: 12px 12px 10px 12px;
    }
  }

  @media (max-width: 425px) {
    max-width: 288px;
    max-height: 584px;
    .image-template {
      max-width: 286px;
    }
  }
`;

export default StyledCard;
