import styled from "styled-components";
import { device } from "@utils/devices";
import bannerLeft from "@public/images/banners/banner-left.png";
import bannerLeftIcon from "@public/images/banners/banner-left-icon.svg";
import bannerRight from "@public/images/banners/banner-right.png";
import bannerRightIcon from "@public/images/banners/banner-right-icon.svg";
import arrowRight from "@public/images/banners/arrow-right.svg";

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
    background: #1C1A39;

    a {
      position: absolute;
      display: block;
      width: 100%;
      height: 100%;
      text-decoration: none;
      background-image: url(${bannerLeft.src}), url(${bannerRight.src});
      background-repeat: no-repeat;
      background-position: top left, top right;
      background-size: 344px 64px, 344px 64px;

      @media screen and ${device.laptop} {
        height: 48px;
        background-image: url(${bannerLeft.src});
        background-position: -80px 0;
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
      font-weight: 700;
      text-align: center;
      width: max-content;
      max-width: 817px;
      height: 100%;
      color: #FFFFFF;
      text-decoration: none;
      z-index: 10;

      &:after,
      &:before {
        content: "";
        position: absolute;
        background-repeat: no-repeat;

        @media screen and ${device.laptop} {
          height: 48px;
        }
      }

      &:before {
        top: 10px;
        left: -175px;
        min-width: 128px;
        height: 65px;
        background-image: url(${bannerLeftIcon.src});

        @media screen and ${device.laptop} {
          content: none;
        }
      }

      &:after {
        top: 28px;
        right: -59px;
        width: 56px;
        height: 42px;
        background-image: url(${bannerRightIcon.src});

        @media screen and ${device.laptop} {
          content: none;
        }
      }

      > div {
        position: relative;
        padding-right: 28px;

        &:after {
          content: "";
          position: absolute;
          right: 0;
          top: 50%;
          display: inline-flex;
          width: 24px;
          min-width: 24px;
          height: 24px;
          transform: translateY(-50%);
          background-image: url(${arrowRight.src});
        }
      }

      span {
        color: #00FFDD;
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

  &.de, 
  &.es {
    .advent-announce-text {
      max-width: 766px;
    }
  }

  &.pt,
  &.ja {
    .advent-announce-text {
      max-width: 814px;
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