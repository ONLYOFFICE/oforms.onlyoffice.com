import styled from "styled-components";
import docspaceLeft from "@public/images/banners/docspace-left.svg";
import docspaceRight from "@public/images/banners/docspace-right.svg";
import docspaceLeftDecor from "@public/images/banners/docspace-left-decor.svg";
import docspaceRightDecor from "@public/images/banners/docspace-right-decor.svg";
import docspaceLeftDecorMobile from "@public/images/banners/docspace-left-decor-mobile.svg";
import docspaceRightDecorMobile from "@public/images/banners/docspace-right-decor-mobile.svg";

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
    background-color: #5694DB;
    background-image: url(${docspaceLeft.src}), url(${docspaceRight.src});
    background-repeat: no-repeat;
    background-position: top left, center right;

    a {
      position: absolute;
      display: block;
      width: 100%;
      height: 100%;
      text-decoration: none;

      @media (max-width: 1023px) {
        height: 48px;
      }
    }

    .advent-announce-text {
      box-sizing: border-box;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      margin: 0 auto;
      font-size: 14px;
      font-weight: 400;
      line-height: normal;
      letter-spacing: 0.14px;
      height: 100%;
      color: #fff;
      text-decoration: none;
      z-index: 10;
      width: max-content;
      max-width: 670px;
      padding: 6px 0 6px 13px;

      &:before,
      &:after {
        content: "";
        display: block;
        background-repeat: no-repeat;
        background-position: center;
        z-index: -1;

        @media (max-width: 1023px) {
          height: 48px;
        }
      }

      &:before {
        content: "";
        position: absolute;
        top: 50%;
        left: -66px;
        min-width: 59px;
        height: 56px;
        background-image: url(${docspaceLeftDecor.src});
        transform: translateY(-50%);
        pointer-events: none;

        @media (max-width: 1023px) {
          left: 0;
          min-width: 57px;
          background-image: url(${docspaceLeftDecorMobile.src});
        }
      }

      &:after {
        margin-left: 8px;
        min-width: 26px;
        height: 24px;
        background-image: url(${docspaceRightDecor.src});
        pointer-events: none;
      }

      @media screen and (max-width: 1440px) {
        span {
          &:before {
            content: "";
            position: absolute;
            width: 310px;
            height: 56px;
            top: 0;
            left: -402px;
            background-image: url(${docspaceLeft.src});
            background-repeat: no-repeat;
          }
    
          &:after {
            content: "";
            position: absolute;
            width: 338px;
            height: 56px;
            top: 0;
            right: -394px;
            background-image: url(${docspaceRight.src});
            background-repeat: no-repeat;
            background-position: center;
          }
        }
      }

      @media (max-width: 1023px) {
        padding: 0;
        font-size: 14px;
        width: 100%;
        max-width: 320px;

        span {
          &:before,
          &:after {
            content: none;
          }
        }
      }
    }

    @media (max-width: 1440px) {
      background-image: none;
    }

    @media (max-width: 1023px) {
      background-image: url(${docspaceRightDecorMobile.src});
      background-position: center right;
    }
  }

  .advent-desktop-hide {
    display: none;

    @media (max-width: 1023px) {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 48px;
    }
  }

  .advent-mobile-hide {
    @media (max-width: 1023px) {
      display: none;
    }
  }

  &.es {
    .advent-announce-text {
      max-width: 724px;

      @media (max-width: 1023px) {
        max-width: 354px;
      }
    }
  }

  &.fr {
    .advent-announce-text {
      max-width: 816px;

      @media (max-width: 1023px) {
        max-width: 364px;
      }
    }
  }

  &.de {
    .advent-announce-text {
      max-width: 742px;

      @media (max-width: 1023px) {
        max-width: 380px;
      }
    }
  }

  &.pt {
    .advent-announce-text {
      max-width: 738px;

      @media (max-width: 1023px) {
        max-width: 360px;
      }
    }
  }

  &.it {
    .advent-announce-text {
      max-width: 738px;

      @media (max-width: 1023px) {
        max-width: 336px;
      }
    }
  }

  &.ja {
    .advent-announce-text {
      @media (max-width: 1023px) {
        max-width: 328px;
      }
    }
  }

  &.zh {
    .advent-announce-text {
      span {
        &:before {
          @media (max-width: 1440px) {
            left: -452px;
          }
        }
      }
    }
  }

  @media (max-width: 1023px) {
    overflow-x: hidden;

    &.active {
      ~ header {
        overflow-x: hidden;
      }
    }

    &.is-open {
      transform: translate3d(429px, 0, 0);
      transition: transform .2s cubic-bezier(.16,.68,.43,.99);
    }
  }

  @media (max-width: 592px) {
    &.is-open {
      transform: translate3d(380px, 0, 0);
    }
  }

  @media (max-width: 430px) {
    &.is-open {
      transform: translate3d(288px, 0, 0);
    }
  }
`;

export default StyledAdventAnnounce;