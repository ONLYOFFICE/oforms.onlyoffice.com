import styled from "styled-components";
import Section from "../section";

const Styled404 = styled(Section)`
  top: 100px;

  .section-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 32px;
  }

  .page-error-404-image {
    max-height: 424px;
    margin: 0 auto;
    width: 100%;
  }

  .page-error-404-container {
    max-width: 530px;
    margin: 0 auto;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 32px;
  }

  .page-error-404-heading {
    font-weight: bold;
    font-size: 40px;
    line-height: 53px;
    text-align: center;
    letter-spacing: -0.02em;
  }

  .page-error-404-description {
    font-size: 16px;
    line-height: 22px;
    text-align: center;
    color: #555555;
  }
`;

export default Styled404;
