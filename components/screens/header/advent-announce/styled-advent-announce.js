import styled from "styled-components";
import { device } from "@utils/devices";
import bannerLeftIcon from "@public/images/banners/banner-left-icon.svg";
import bannerArrowRight from "@public/images/banners/arrow-right.svg";

const StyledAdventAnnounce = styled.div`
  .advent-announce {
    position: relative;
    display: block;
    width: 100%;
    height: 56px;
    overflow: hidden;
    text-align: center;
    text-decoration: none;
    background: linear-gradient(90deg, #2183A6 -20.49%, #1D4350 54.81%);

    .advent-announce-text {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto;
      padding: 0 32px 0 90px;
      font-size: 14px;
      line-height: 19px;
      letter-spacing: 0.01em;
      text-align: center;
      width: max-content;
      max-width: 560px;
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
        left: 0;
        min-width: 85px;
        height: 57px;
        background-image: url(${bannerLeftIcon.src});

        @media screen and ${device.laptop} {
          content: none;
        }
      }

      &:after {
        right: 0;
        min-width: 24px;
        height: 24px;
        background-image: url(${bannerArrowRight.src});

        @media screen and ${device.laptop} {
          position: relative;
          right: initial;
          margin-left: 10px;
        }
      }

      span {
        color: #07D9CA;
      }

      @media screen and ${device.laptop} {
        padding: 0;
      }
    }

    @media screen and ${device.laptop} {
      background: linear-gradient(90deg, #2183A6 -20.49%, #1D4350 54.81%);

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

  &.fr,
  &.es {
    .advent-announce-text {
      max-width: 524px;
    }
  }

  &.pt {
    .advent-announce-text {
      max-width: 572px;
    }
  }

  &.it {
    .advent-announce-text {
      max-width: 534px;
    }
  }

  &.zh {
    .advent-announce-text {
      max-width: 590px;
    }
  }

  &.de,
  &.pt,
  &.ja {
    .advent-announce-text {
      @media screen and (max-width: 375px) {
        max-width: 222px;
      }
    }
  }

  .advent-desktop-hide {
    display: none;

    @media screen and ${device.laptop} {
      display: block;
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