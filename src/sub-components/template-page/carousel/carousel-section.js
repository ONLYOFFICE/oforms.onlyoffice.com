import styled from "styled-components";
import Section from "../../section";

const StyledCarouselContent = styled(Section)`
background: #f5f5f5;

.section-page {
  max-width: 1232px;
  margin: 0 auto;
}
  .card-carousel {
    display: grid;
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
        margin: 0 auto;
        text-align: center;
        width: 100%;
        .carousel-cards {
            max-height: 100%;
        }
      }
    }
  }

  @media (max-width: 1024px) {
    .card-carousel {
      .slick-slider {
        .slick-list {
          max-width: 90vw;
        }
      }
    }
  }

  @media (max-width: 860px) {
    .card-carousel {
      .slick-slider {
        .slick-list {
          max-width: 100vw;
        }
      }
    }
  }
  @media (max-width: 768px) {
    .card-carousel {
      .slick-slider {
        .slick-list {
          max-width: 800px;

          .carousel-cards {
            max-width: 256px;
            .image-template {
                max-width: 254px;
            }
          }
        }
      }
    }
  }
  
  @media (max-width: 576px) {
    h3 {
      font-size: 18px;
      line-height: 1.33em;
    }
  }
`;

export default StyledCarouselContent;