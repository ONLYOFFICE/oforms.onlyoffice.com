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
  .description {
    white-space: normal;
    color: #fff;
  }

  .banner_heading {
    padding-left: 12px;
  }

  .text-banner {
    line-height: 160%;
  }

  #btn-type {
    color: white;
    border-color: white;
  }

  .box-banner-sec {
    padding-bottom: 16px;
  }

  .box-banner {
    padding-right: 48px;
  }

  .buttons {
    margin: 0 5px;
  }
  @media (max-width: 1200px) {
    max-width: calc(100% - 80px);
  }
  @media (max-width: 768px) {
    flex-direction: column;
    .box-banner {
      align-items: center;
    }
    .banner_heading {
      padding: 0px;
    }

    .box-banner-sec {
      flex-direction: column;
    }
    .text-banner {
      text-align: center;
    }
    .box-banner {
      padding-right: 0px;
    }
    .buttons {
      margin-top: 24px;
    }
  }

  @media (max-width: 600px) {
    max-width: calc(100% - 32px);
    padding: 24px;

    .banner_heading {
      font-size: 18px;
      padding: 0px;
    }

    .link {
      width: 100%;
    }

    .banner_buttons {
      flex-direction: column;
    }

    .box-banner-sec {
      padding-bottom: 8px;
    }

    .buttons {
      margin: 16px 0 0;
      width: 100%;
    }
    .text-banner {
      font-size: 14px;
    }
  }
`;

export default StyledBanners;
