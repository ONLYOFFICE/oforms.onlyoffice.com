import styled from "styled-components";
import Section from "@components/common/section";

const StyledCarouselContent = styled(Section)`
  background: #f5f5f5;

  .section-page {
    max-width: 1232px;
    margin: 0 auto;
  }
  .card-carousel {
    margin: 0 auto;
    padding: 40px 0 0;
    .slick-slider {
      .slick-next {
        right: calc(50% - 635px);
      }
      .slick-prev {
        left: calc(50% - 636px);
      }
      .slick-list {
        max-width: 1120px;
        padding: 0 20px 0 0;
        text-align: center;
        margin: 0 auto;
        padding-bottom: ${(props) => (props.shortCard ? "0" : "50px")};
        height: ${(props) => (props.shortCard ? "288px" : " 666px")};

        .slick-slide .carousel-cards:not(.short) {
          .image-boxshadow-template {
            box-shadow: none;
            border: 1px solid #E2E2E2;
          }

          .card-template{
            background-color: unset;
            border: 1px solid transparent;
            box-shadow: none;
          }

          &:hover .image-boxshadow-template,
          &:active .image-boxshadow-template,
          &:active .card-template,
          &:hover .card-template {
            box-shadow: none;
          }
        }

        .slick-slide.slick-active .carousel-cards:not(.short) {
          .image-boxshadow-template {
            box-shadow: 0px 7px 15px rgba(85, 85, 85, 0.1);
          }

          &:hover .image-boxshadow-template,
          &:active .image-boxshadow-template{
            box-shadow: 0px 7px 20px rgba(85, 85, 85, 0.1);
          }
          &:active .card-template,
          &:hover .card-template {
            box-shadow: none;
          }
        }

        .carousel-cards:not(.short) {
          max-height: 100%;
        }
      }
    }
  }

  @media (max-width: 1200px) {
    .card-carousel
      .slick-slider
      .slick-list
      .slick-slide.slick-active
      .carousel-cards:not(.short),
    .card-carousel
      .slick-slider
      .slick-list
      .slick-slide
      .carousel-cards:not(.short) {
      .image-boxshadow-template {
        box-shadow: 0px 7px 15px rgba(85, 85, 85, 0.1);
      }

      &:hover .image-boxshadow-template,
      &:active .image-boxshadow-template {
        box-shadow: 0px 7px 15px rgba(85, 85, 85, 0.1);
      }
      &:active .card-template,
      &:hover .card-template {
        box-shadow: none;
      }
    }
    .card-carousel .slick-slider .slick-list {
      margin-left: 40px;
    }
  }

  @media (max-width: 1024px) {
    .card-carousel {
      .slick-slider {
        .slick-list {
          margin-left: 40px;

          .carousel-cards:not(.short) {

            .image-template {
              max-width: none;
              width: 99.5%;
            }
          }
        }
      }
    }
  }

  @media (max-width: 768px) {
    .card-carousel {
      .slick-slider {
        .slick-list {
          max-width: 800px;
          padding-bottom: 0;
          height: ${(props) => (props.shortCard ? "317px" : "588px")};

          .carousel-cards.short {
            max-width: ${(props) => (props.shortCard ? "130px" : "247px")};
            width: 160px;
          }
        }
      }
    }
  }

  @media (max-width: 576px) {
    h3 {
      font-size: 18px;
      line-height: 1.33em;
      & span {
        font-size: 18px;
        line-height: 1.33em;
      }
    }
    .card-carousel {
      .slick-slider {
        .slick-list {
          padding-bottom: 48px;
          height: ${(props) => (props.shortCard ? "268px" : "510px")};
          margin-left: 0;
          .slick-slide {
            margin: 0 8px;
          }
          .carousel-cards:not(.short) {
            max-width: 247px;

            .image-template {
              max-width: 100%;
            }
          }
        }
      }
    }
  }
`;

export default StyledCarouselContent;
