import styled from "styled-components";
import { device } from "@utils/devices";

const StyledCardSlider = styled.div`
  position: relative;
  margin: 0 -56px;
  padding: 0 56px;

  .card-slider-title {
    margin-bottom: 24px;
    letter-spacing: -0.02em;

    span {
      color: #FF6F3D;
    }
  }

  .card-slider-list {
    max-width: 1120px;
    
    .swiper-wrapper {
      padding: 0 16px;
      margin: 0 -16px;

      .card-preview {
        box-shadow: rgba(85, 85, 85, 0.1) 0px 7px 15px;
      }
    }

    @media screen and ${device.laptop} {
      display: flex;
      margin: 0 -40px;
      padding: 0 40px;
      overflow-x: auto;

      .card {
        min-width: 288px;
        max-width: 288px;

        &:not(:last-child) {
          margin-right: 32px;
        }
      }
    }

    @media screen and ${device.mobile} {
      margin: 0 -16px;
      padding: 0 16px;

      .card {
        min-width: 328px;
        max-width: 328px;
      }
    }
  }

  .card-slider-navigation {
    position: absolute;
    top: 50%;
    left: 50%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    transform: translate(-50%, -50%);
    z-index: 2;
    pointer-events: none;
  }

  .swiper-button-prev,
  .swiper-button-next {
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    border-radius: 50%;
    width: 48px;
    height: 48px;
    background-color: transparent;
    pointer-events: initial;
    cursor: pointer;

    div {
      display: flex;
    }

    &:hover {
      box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 40px;

      svg {
        path {
          fill: #FF6F3D;
        }
      }
    }

    &:disabled {
      opacity: 0.4;
      pointer-events: none;
    }
  }

  @media screen and (max-width: 1250px) {
    margin: 0 -40px;
    padding: 0 40px;
    overflow: hidden;
  }

  @media screen and ${device.laptop} {
    margin: 0;
    padding: 0;
    overflow: initial;
  }
`;

export default StyledCardSlider;
