import styled from "styled-components";
import { device } from "@components/utils/devices";
import arrowInCircle from "@public/images/banners/arrow-in-circle.svg";
import docsLeft from "@public/images/banners/docs-8-0-left.svg";
import docsRight from "@public/images/banners/docs-8-0-right.svg";
import docsLeftMob from "@public/images/banners/docs-8-0-left-mob.svg";
import docsRightMob from "@public/images/banners/docs-8-0-right-mob.svg";

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
    background: linear-gradient(270deg, #FF8D5C 19.21%, #FFB979 95.78%), var(--Links-Color_Link_Hover, #FF6F3D);

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
      text-align: center;
      margin: 0 auto;
      font-size: 14px;
      font-weight: 700;
      line-height: normal;
      letter-spacing: 0.14px;
      width: 100%;
      height: 100%;
      max-width: 855px;
      color: #fff;
      text-decoration: none;
      z-index: 10;

      span {
        display: flex;
        align-items: center;

        &:after {
          content: "";
          display: inline-flex;
          margin-left: 6px;
          min-width: 24px;
          height: 24px;
          background-image: url(${arrowInCircle.src});
          background-repeat: no-repeat;
          background-position: center;

          @media screen and ${device.laptop} {
            content: none;
          }
        }
      }

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
        left: -294px;
        width: 243px;
        background-image: url(${docsLeft.src});

        @media screen and ${device.laptop} {
          left: -50px;
          width: 56px;
          background-image: url(${docsLeftMob.src});
        }
      }

      &:after {
        right: -292px;
        width: 238px;
        background-image: url(${docsRight.src});

        @media screen and ${device.laptop} {
          top: 4px;
          right: -48px;
          width: 45px;
          height: 44px;
          background-image: url(${docsRightMob.src});
        }
      }

      @media screen and ${device.laptop} {
        letter-spacing: initial;
        width: max-content;
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

  &.fr {
    .advent-announce {
      .advent-announce-text {
        max-width: 884px;
      }
    }
  }

  &.de {
    .advent-announce {
      .advent-announce-text {
        max-width: 774px;
      }
    }
  }

  &.es {
    .advent-announce {
      .advent-announce-text {
        max-width: 816px;
      }
    }
  }

  &.pt {
    .advent-announce {
      .advent-announce-text {
        max-width: 888px;
      }
    }
  }

  &.ja {
    .advent-announce {
      .advent-announce-text {
        max-width: 870px;
      }
    }
  }

  &.zh {
    .advent-announce {
      .advent-announce-text {
        max-width: 680px;
      }
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