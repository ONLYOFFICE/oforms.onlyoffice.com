import styled from "styled-components";

const StyledCards = styled.div`
  display: flex;
  gap: 32px;
  flex-direction: row;
  flex-wrap: wrap;
  /* margin: 0 auto; */
  width: 100%;

  @media (max-width: 1200px) {
    /* max-width: 688px; */
    gap: 32px 24px;
  }

  @media (max-width: 1200px) {
    /* max-width: 688px; */
    justify-content: center;
    margin: 0 auto;
  }

  @media (max-width: 600px) {
    /* grid-template-columns: 1fr 1fr;
    max-width: 344px;
    gap: 8px;
    margin: 0 auto; */
    gap: 16px 8px;
  }

  @media (max-width: 425px) {
    grid-template-columns: 1fr;
    max-width: 290px;
  }
`;

export default StyledCards;
