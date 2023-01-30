import styled from "styled-components";

const StyledAdventAnnounce = styled.div`
  .advent-announce {
    position: relative;
    top: 0;
    left: 0;
    padding: 0;
    width: 100%;
    height: 56px;
    overflow: hidden;
    text-align: center;
    background: #27ABA3;
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
      height: 55px;
      color: #fff;
      text-decoration: none;
      z-index: 0;
      max-width: 605px;
      padding: 7px 0px 8px;
      &:before {
        content: "";
        position: absolute;
        background-repeat: no-repeat;
        top: 0px;
        display: block;
        height: 55px;
        z-index: -1;
        background-image: url(../images/banners/docs-release-left.svg),url(../images/banners/docs-release-icon.svg);
        background-position-x: 40%, 100%;
        background-position-y: 11px, -7px;
        left: -472px;
        width: 462px;
        @media (max-width: 1024px) {
          height: 48px;
          background-image: url(../images/banners/docs-release-icon.svg);
          background-position-y: -11px;
          left: -70px;
          width: 50px;
        }
      }
      &:after {
        content: "";
        position: absolute;
        top: 0px;
        background-repeat: no-repeat;
        display: block;
        height: 55px;
        z-index: -1;
        background-repeat: no-repeat;
        background-image: url(../images/banners/docs-7-3-right.svg);
        background-position-x: 0;
        background-position-y: 7px;
        right: -438px;
        width: 431px;
        @media (max-width: 1024px) {
          height: 48px;
          background-image: url(../images/banners/docs-release-union.svg),url(../images/banners/docs-release-mobile.svg);
          background-position-y: center, 23px;
          background-position-x: 0%, 30px;
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