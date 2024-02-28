import styled from "styled-components";
import { device } from "@components/utils/devices";
import bannerLeft from "@public/images/banners/banner-left.svg";
import bannerRight from "@public/images/banners/banner-right.svg";
import bannerLeftMobile from "@public/images/banners/banner-left-mobile.svg";
import bannerRightMobile from "@public/images/banners/banner-right-mobile.svg";

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
    background-color: #0B5CFF;

    a {
      position: absolute;
      display: block;
      width: 100%;
      height: 100%;
      text-decoration: none;

      @media screen and ${device.laptop} {
        height: 48px;
      }
    }

    .advent-announce-text {
      box-sizing: border-box;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto;
      font-size: 14px;
      line-height: 19px;
      letter-spacing: 0.01em;
      text-align: center;
      width: 100%;
      height: 100%;
      max-width: max-content;
      color: #fff;
      text-decoration: none;
      z-index: 10;

      &:after,
      &:before {
        content: "";
        display: block;
        position: absolute;
        top: 0;
        height: 56px;
        background-repeat: no-repeat;
        background-position: center;
        z-index: -1;

        @media screen and ${device.laptop} {
          height: 48px;
        }
      }

      &:before {
        right: calc(100% + 12px);
        width: 382px;
        background-image: url(${bannerLeft.src});

        @media screen and ${device.laptop} {
          right: calc(100% - 13px);
          width: 69px;
          background-image: url(${bannerLeftMobile.src});
        }
      }

      &:after {
        left: calc(100% - 7px);
        width: 396px;
        background-image: url(${bannerRight.src});

        @media screen and ${device.laptop} {
          left: calc(100% - 48px);
          width: 92px;
          background-image: url(${bannerRightMobile.src});
        }
      }
    }

    @media screen and ${device.laptop} {
      &.is-open {
        transform: translate3d(429px, 0, 0);
        transition: transform .2s cubic-bezier(.16,.68,.43,.99);
      }
    }
    
    @media (max-width: 592px) {
      &.is-open {
        transform: translate3d(calc(100vw - 64px), 0, 0);
      }
    }
  
    @media (max-width: 375px) {
      &.is-open {
        transform: translate3d(calc(100vw - 32px), 0, 0);
      }
    }
  }

  .advent-desktop-hide {
    display: none;

    @media screen and ${device.laptop} {
      display: flex;
      height: 48px;
    }
  }

  .advent-mobile-hide {
    @media screen and ${device.laptop} {
      display: none;
    }
  }

  @media screen and ${device.laptop} {
    overflow-x: hidden;

    &.active {
      ~ header {
        overflow-x: hidden;
      }
    }
  }
`;

export default StyledAdventAnnounce;