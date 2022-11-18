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
      font-size: 15px;
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
        top: 0px;
        left: -501px;
        display: block;
        width: 475px;
        height: 56px;
        z-index: -1;
        background-image: url(../images/banners/banner_meet_docs_saas_left.svg),url(../images/banners/banner_meet_docs_saas_cloud.svg);
        background-position-x: left,right;
        background-position-y: 12px, 15px;
        background-repeat: no-repeat;

        @media (max-width: 1150px) {
          left: -441px;
          width: 428px;
          height: 48px;
          background-position-y: 10px;
        }
      }

      &:after {
        content: "";
        position: absolute;
        top: 0px;
        right: -560px;
        display: block;
        width: 552px;
        height: 56px;
        z-index: -1;
        background-repeat: no-repeat;
        background-image: url(../images/banners/banner_meet_docs_saas_arrow.svg),url(../images/banners/banner_meet_docs_saas_right.svg);
        background-position-x: 15px,126px;
        background-position-y: 19px,12px;

        @media (max-width: 1150px) {
          right: -560px;
          height: 48px;
          background-position-x: 0,45px;
          background-position-y: 14px,8px;
        }

        @media (max-width: 500px) {
          right: -560px;
          height: 48px;
          background-image: url(../images/banners/banner_meet_docs_saas_right.svg);
          background-position-x: 45px;
          background-position-y: 8px;
        }
      }

      @media (max-width: 1150px) {
        background-color: transparent;
        display: inline-block;
        font-size: 12px;
        height: auto;
        line-height: 16px;
        padding: 16px 0px;
        white-space: normal;
        width: auto !important;
      }

      @media (max-width: 500px) {
        margin-left: 30px;
      }
    }
  }

  .advent-desktop-hide {
    display: none;

    @media (max-width: 1150px) {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 48px;
    }
  }

  .advent-mobile-hide {
    @media (max-width: 1150px) {
      display: none;
    }
  }
`;

export default StyledAdventAnnounce;