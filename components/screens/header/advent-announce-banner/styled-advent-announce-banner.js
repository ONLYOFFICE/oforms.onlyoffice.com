import styled from "styled-components";
import { device } from "@utils/devices";

const StyledAdventAnnounceBanner = styled.div`
  .advent-announce-banner-wrapper {
    &.is-open {
      @media screen and ${device.laptop} {
        transform: translate3d(429px, 0, 0);
        transition: transform .2s cubic-bezier(.16,.68,.43,.99);
      }

      @media (max-width: 592px) {
        transform: translate3d(calc(100vw - 64px), 0, 0);
      }

      @media (max-width: 375px) {
        transform: translate3d(calc(100vw - 32px), 0, 0);
      }
    }
  }

  &.active {
    ~ header {
      @media screen and ${device.laptop} {
        overflow-x: hidden;
      }
    }
  }

  @media screen and ${device.laptop} {
    overflow-x: hidden;
  }
`;

export default StyledAdventAnnounceBanner;