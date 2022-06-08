import styled from "styled-components";
import Section from "@components/common/section";

const StyledInfoContent = styled(Section)`
  background-color: #333;
  .section-page {
    padding-top: 190px;
    .category-box {
      max-width: 736px;
      margin: 0 auto;
    }
    .category-heading {
      text-align: center;
      font-size: 32px;
      font-weight: 700;
      color: #fff;
    }
    .category-description {
      padding-top: 24px;
      text-align: center;
      font-size: 22px;
      font-weight: 400;
      line-height: 33px;
      color: #ccc;
      padding-bottom: 90px;
    }
  }

  @media (max-width: 1024px) {
    .section-page {
      padding-top: 120px;
      .category-heading {
      }
      .category-description {
        padding-bottom: 50px;
      }
    }
  }

  @media (max-width: 768px) {
    .section-page {
      padding-top: 110px;
      .category-heading {
        font-size: 30px;
      }
      .category-description {
        font-size: 20px;
      }
    }
  }

  @media (max-width: 600px) {
    .section-page {
      .category-heading {
        font-size: 28px;
      }
      .category-description {
        padding-bottom: 50px;
        font-size: 18px;
      }
    }
  }
`;

export default StyledInfoContent;
