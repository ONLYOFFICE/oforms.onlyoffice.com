import styled, { css } from "styled-components";

const StyledCarousel = styled.div`
  margin: 0 auto;
  padding: 0px;
  .slick-slider {
    margin: 0 auto;
    padding: 0px;
    .slide {
      display: grid !important;
      .carousel-image {
        width: 100%;
      }
    }
    ${(props) =>
      props.arrows
        ? css`
            .slick-arrow {
              background: none;
              border-color: transparent;
              border-radius: 50%;
              -moz-border-radius: 50%;
              -webkit-border-radius: 50%;
              cursor: pointer;
              font-size: 0;
              height: 56px;
              outline: none;
              position: absolute;
              top: 43%;
              -webkit-transition-duration: 0.3s;
              -o-transition-duration: 0.3s;
              transition-duration: 0.3s;
              width: 56px;
            }
            .slick-arrow:before {
              border-color: #444;
              border-style: solid;
              border-width: 1px;
              border-left: none;
              border-top: none;
              border-width: 2px;
              content: "";
              display: block;
              height: 9px;
              width: 9px;
              margin: 0 auto;
            }
            .slick-arrow:hover:before {
              border-color: #ff6f3d;
            }
            .slick-arrow:hover {
              background: #fff;
              -webkit-box-shadow: 0px 20px 50px rgb(85 85 85 / 15%);
              -moz-box-shadow: 0px 20px 50px rgba(85, 85, 85, 0.15);
              box-shadow: 0px 20px 50px rgb(85 85 85 / 15%);
            }
            .slick-prev {
              left: calc(50% - 550px);
              z-index: 1;
              margin-top: 28px;
            }
            .slick-prev::before {
              transform: rotate(135deg);
            }
            .slick-next {
              right: calc(50% - 550px);
              z-index: 1;
              transform: rotate(-45deg);
            }
          `
        : css`
            .slick-arrow {
              display: none !important;
            }
          `}
  }
  @media (max-width: 1200px) {
    .slick-slider {
      .slide-carousel {
        width: 100vw;
        height: 65vw;
      }
      .slick-arrow {
        display: none !important;
      }
    }
  }
  @media (max-width: 1024px) {
    .slick-slider {
      .slide-carousel {
        width: 100vw;
        height: 60vw;
      }
    }
  }
  @media (max-width: 576px) {
    .slick-slider {
      .slide-carousel {
        margin: 0;
      }
    }
  }
`;

export default StyledCarousel;