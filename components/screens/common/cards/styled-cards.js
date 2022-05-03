import styled from "styled-components";
// TODO: FIXME:

const StyledCards = styled.div`
  display: flex;
  gap: 32px;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;

  @media (max-width: 1200px) {
    gap: 32px 24px;
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
