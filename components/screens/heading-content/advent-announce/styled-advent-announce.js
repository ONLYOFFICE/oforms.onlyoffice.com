import styled from "styled-components";

const StyledAdventAnnounce = styled.div`
  .advent-announce {
    position: relative;
    top: 0;
    left: 0;
    padding: 0;
    width: 100%;
    height: 56px;
    overflow-x: hidden;
    text-align: center;
    background: linear-gradient(270deg, #FF8D5C 19.21%, #FFB979 95.78%);
    box-shadow: 0px 1px 1px rgba(140, 57, 15, 0.7);

    a {
      position: absolute;
      display: block;
      width: 100%;
      text-decoration: none;
    }

    .advent-announce-text {
      position: relative;
      display: inline-block;
      align-items: center;
      justify-content: center;
      text-align: center;
      margin: 0 auto;
      font-size: 14px;
      font-weight: 400;
      line-height: 20px;
      letter-spacing: 0.01em;
      height: 56px;
      line-height: 56px;
      color: #fff;
      text-decoration: none;
      z-index: 0;

      &:before {
        content: "";
        position: absolute;
        background-repeat: no-repeat;
        top: 0px;
        display: block;
        height: 56px;
        z-index: -1;
        background-image: url(../images/banners/banner_meet_docs_saas_left.svg),url(../images/banners/banner_meet_docs_saas_cloud.svg);
        background-position-x: 0,100%;
        background-position-y: 11px,15px;
        left: -472px;
        width: 462px;

        @media (max-width: 1024px) {
          left: -441px;
          width: 428px;
          height: 48px;
          background-image: url(../images/banners/banner_meet_docs_saas_left.svg),url(../images/banners/banner_meet_docs_saas_cloud.svg);
          background-position-y: 10px;
          background-position-x: 31px, right;
        }
      }

      &:after {
        content: "";
        position: absolute;
        top: 0px;
        background-repeat: no-repeat;
        display: block;
        height: 56px;
        z-index: -1;
        background-repeat: no-repeat;
        background-image: url(../images/banners/banner_meet_docs_saas_arrow.svg),url(../images/banners/banner_meet_docs_saas_right.svg);
        background-position-y: 18px, 9px;
        background-position-x: 0px, 72px;
        right: -441px;
        width: 431px;

        @media (max-width: 1024px) {
          height: 48px;
          background-image: url(../images/banners/banner_meet_docs_saas_right.svg);
          background-position-x: 10px;
          background-position-y: 8px;
        }
      }

      @media (max-width: 1024px) {
        display: inline-block;
        font-size: 12px;
        height: auto;
        line-height: 16px;
        padding: 16px 0px;
        white-space: normal;
        width: auto !important;
        margin-left: 30px;
      }
    }
  }

  .advent-desktop-hide {
    display: none;

    @media (max-width: 1024px) {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 48px;
    }
  }

  .advent-mobile-hide {
    @media (max-width: 1024px) {
      display: none;
    }
  }
`;

export default StyledAdventAnnounce;