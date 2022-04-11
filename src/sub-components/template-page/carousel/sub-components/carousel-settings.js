const cardCarouselSettings = {
  fade: false,
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        arrows: false,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 576,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        variableWidth: true,
      },
    },
  ],
};

const shortCarouselSettings = {
  fade: false,
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 6,
  slidesToScroll: 6,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        arrows: false,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 5
      },
    },
    {
      breakpoint: 768,
      settings: {
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 5,
        variableWidth: true,
      },
    },
    {
      breakpoint: 576,
      settings: {
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        variableWidth: true,
      },
    },
  ],
};

export { cardCarouselSettings, shortCarouselSettings };
