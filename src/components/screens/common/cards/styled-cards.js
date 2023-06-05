import styled from "styled-components";
// TODO: FIXME:

const StyledCards = styled.div`
  display: flex;
  gap: 32px;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  min-width: 1120px;

  .no-more-result-block {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .no-more-result-image {
    margin-bottom: 32px;
    width: 100%;
    max-width: 500px;
  }

  .no-more-result-heading {
    font-weight: 700;
    font-size: 18px;
    letter-spacing: -0.02em;
    font-weight: 700;
    line-height: 133%;
  }

  @media (max-width: 1200px) {
    gap: 32px 24px;
    min-height: auto;
    min-width: auto;
  }

  @media (max-width: 1200px) {
    justify-content: center;
    margin: 0 auto;
  }

  @media (max-width: 1024px) {
    .section-page {
      .template-main-img {
        .template-image {
          .card-image {
            height: 100%;
            width: 167px;
          }
        }
      }
    }
  }

  @media (max-width: 600px) {
    gap: 16px 8px;
  }

  @media (max-width: 425px) {
    grid-template-columns: 1fr;
  }
`;

export default StyledCards;
