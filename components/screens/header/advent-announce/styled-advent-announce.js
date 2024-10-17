import styled from "styled-components";
import { device } from "@utils/devices";
import bannerBg from "@public/images/banners/banner-bg.svg";
import bannerBgMobile from "@public/images/banners/banner-bg-mobile.svg";
import arrowRight from "@public/images/banners/arrow-right.svg";
import pdfIcon from "@public/images/banners/docs-8-2-pdf.svg";

const StyledAdventAnnounce = styled.div`
  .advent-announce {
    position: relative;
    display: block;
    width: 100%;
    height: 56px;
    overflow: hidden;
    text-align: center;
    text-decoration: none;
    background-image: url(${bannerBg.src});
    background-position: center;
    background-repeat: no-repeat;
    background-color: #1B181F;
    @media screen and ${device.laptop} {
      display: none;
    }


    .advent-announce-wrapper {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 4px 0 10px;
      margin: 0 auto;
      text-align: center;
      width: max-content;
      height: 100%;
      text-decoration: none;
      z-index: 10;

      /* &:after {
        @media screen and ${device.laptop} {
          content: "";
          display: block;
          margin-left: 12px;
          width: 22px;
          min-width: 22px;
          height: 22px;
          background-image: url(${arrowRight.src});
          background-repeat: no-repeat;
        }
      } */
    }

    .advent-announce-text {
      position: relative;
      font-size: 14px;
      line-height: 22px;
      font-weight: 400;
      letter-spacing: 0.01em;
      color: #FFFFFF;
      &:before{
        content: "";
        position: absolute;
        display: inline-block;
        left: -72px;
        width: 64px;
        min-width: 64px;
        height: 64px;
        background-image: url(${pdfIcon.src});
        background-repeat: no-repeat;
        background-size: contain;
        top: 50%;
        transform: translateY(-50%);
        @media screen and ${device.laptop} {
          display: none;
        }
        
      }
      &:after{
        content: "";
        position: absolute;
        display: inline-block;
        margin-left: 16px;
        width: 18px;
        min-width: 18px;
        height: 18px;
        background-image: url(${arrowRight.src});
        background-repeat: no-repeat;
        background-size: contain;
        top: 50%;
        transform: translateY(-50%);
        @media screen and ${device.laptop} {
          content: "";          
          background-image: url(${arrowRight.src});
          background-repeat: no-repeat;
        }
      }

      b {
        font-size: 16px;
        line-height: 22px;
        font-weight: 800;

        @media screen and ${device.laptop} {
          font-size: 13px;
          line-height: 18px;
          font-weight: 700;
        }
      }

      @media screen and ${device.laptop} {
        font-size: 13px;
        line-height: 18px;
      }
    }

    .advent-announce-link {
      box-sizing: border-box;
      display: inline-flex;
      border-radius: 3px;
      font-weight: 700;
      letter-spacing: 0.04em;
      min-height: 36px;
      text-decoration: none;
      text-transform: uppercase;
      white-space: nowrap;
    }

    .advent-announce-blog-link {
      border: 1px solid #AAAAAA;
      margin-left: 24px;
      padding: 9px 15px;
      font-size: 12px;
      line-height: 16px;
      color: #FFFFFF;
      transition: border-color 0.3s, color 0.3s;

      &:hover {
        border-color: #FF6F3D;
        color: #FF6F3D;
      }
    }

    .advent-announce-webinars-link {
      margin-left: 8px;
      padding: 9px 16px;
      font-size: 13px;
      line-height: 18px;
      color: #444444;
      background-color: #FFFFFF;
      opacity: 0.9;
      transition: opacity 0.3s;

      &:hover {
        opacity: 1;
      }
    }

    @media screen and ${device.laptop} {
      background-image: url(${bannerBgMobile.src});

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

  &.en,
  &.cs,
  &.el,
  &.hi,
  &.ar,
  &.sr,
  &.hy {
    .advent-announce-wrapper {
      @media screen and ${device.mobileM} {
        padding: 0;
        max-width: 210px;
      }
    }
  }

  &.fr {
    .advent-announce-wrapper {
      max-width: 888px;

      @media screen and (max-width: 592px) {
        padding: 0;
        max-width: 234px;
      }
    }
  }

  &.de {
    .advent-announce-wrapper {
      max-width: 892px;

      @media screen and (max-width: 592px) {
        padding: 0;
        max-width: 278px;
      }
    }
  }

  &.es {
    .advent-announce-wrapper {
      max-width: 820px;

      @media screen and (max-width: 592px) {
        padding: 0;
        max-width: 218px;
      }
    }
  }

  &.pt-br {
    .advent-announce-wrapper {
      max-width: 854px;

      @media screen and (max-width: 592px) {
        padding: 0;
        max-width: 232px;
      }
    }
  }

  &.it {
    .advent-announce-wrapper {
      max-width: 892px;

      @media screen and (max-width: 592px) {
        padding: 0;
        max-width: 228px;
      }
    }
  }

  &.ja {
    .advent-announce-wrapper {
      @media screen and (max-width: 592px) {
        padding: 0;
        max-width: 214px;
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