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
    background-color: #4f698e;

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
      padding: 7px 0px 9px;
      font-size: 15px;
      font-weight: 400;
      line-height: 20px;
      letter-spacing: 0.01em;
      height: 40px;
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
        background-image: url(../images/banner-discover-docs-v7-2/banner_discover_docs_v7_2_left.svg),url(../images/banner-discover-docs-v7-2/banner-discover-docs-v7-2_7-2.svg);
        background-position-x: 126px,right;
        background-position-y: 12px,-12px;
        background-repeat: no-repeat;

        @media (max-width: 1150px) {
          left: -441px;
          width: 428px;
          height: 48px;
          background-position-y: -13px;
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
        background-image: url(../images/banner-discover-docs-v7-2/arrow_right_white.svg),url(../images/banner-discover-docs-v7-2/banner_discover_docs_v7_2_right.svg);
        background-position-x: 15px,126px;
        background-position-y: 21px,12px;

        @media (max-width: 1150px) {
          right: -560px;
          height: 48px;
          background-position-x: 0,60px;
          background-position-y: 18px,8px;
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