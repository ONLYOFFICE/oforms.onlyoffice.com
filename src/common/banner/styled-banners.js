import styled from "styled-components";

const StyledBanners = styled.div`
  display: flex;
  box-sizing: border-box;
  max-width: 1120px;
  border: 1px solid #008078;
  justify-content: space-between;
  border-radius: 3px;
  padding: 32px;
  margin: 0 auto;

  .box-banner {
    padding-right: 48px;

    .box-banner-sec {
      padding-bottom: 16px;

      .banner_heading {
        padding-left: 12px;
        line-height: 1.33em;
        font-size: 24px;
        color: #fff;
      }
    }

    .text-banner {
      line-height: 160%;
      display: block;
      font-size: 16px;
      color: #fff;
    }
  }

  .buttons {
    margin: 0 6px;
    letter-spacing: 0.04em;
  }

  #btn-type {
    color: white;
    border-color: white;
  }

  @media (max-width: 1200px) {
    max-width: calc(100% - 80px);
  }

  @media (max-width: 768px) {
    flex-direction: column;

    .box-banner {
      align-items: center;
      padding-right: 0px;
      .box-banner-sec {
        flex-direction: column;
      }

      .banner_heading {
        padding: 0px;
        text-align: center;
      }

      .text-banner {
        text-align: center;
      }
    }

    .buttons {
      margin-top: 24px;
    }
  }

  @media (max-width: 600px) {
    max-width: calc(100% - 32px);
    padding: 24px;

    .box-banner-sec {
      padding-bottom: 8px;
      .banner_heading {
        font-size: 18px;
        padding: 0px;
      }
      .text-banner {
        font-size: 14px;
      }
    }

    .banner_buttons {
      flex-direction: column;
      .link {
        width: 100%;
      }
      .buttons {
        margin: 16px 0 0;
        width: 100%;
      }
    }
  }
`;

export default StyledBanners;
