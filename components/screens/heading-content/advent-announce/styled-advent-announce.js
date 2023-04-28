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
    background: #55B5DC;
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
      font-size: ${(props) => (props.currentLanguage == "ja" ? "14px" : "15px")};
      font-weight: 400;
      line-height: 20px;
      letter-spacing: 0.01em;
      height: 55px;
      color: #fff;
      text-decoration: none;
      z-index: 0;
      max-width: 605px;
      padding: ${(props) => (props.currentLanguage =='zh' || props.currentLanguage == 'ja' ? "17px 0" : "7px 0 8px")};
      &:before {
        content: "";
        position: absolute;
        background-repeat: no-repeat;
        top: 0px;
        display: block;
        height: 55px;
        z-index: -1;
        background-image: url("https://static-oforms.onlyoffice.com/icons/docspace-left.svg");
        background-position-y: -3px;
        left: -485px;
        width: 573px;
        @media (max-width: 1024px) {
          background-image: url("https://static-oforms.onlyoffice.com/icons/docspace-left.svg");
          background-position: right -8px;
          background-size: auto 65px;
          height: 48px;
          left: -65px;
          top: 0px;
          width: 48px;
          
          
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
        background-image: url(https://static-oforms.onlyoffice.com/images/banners/workspace-12-5-right.svg);
        background-position-y: -2px;
        right: -366px;
        width: 356px;
        @media (max-width: 1024px) {
          height: 48px;
          background-image: url(https://static-oforms.onlyoffice.com/images/banners/workspace-12-5-right.svg);
          background-position-y: -6px;
          right: -366px;
          width: 356px;
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