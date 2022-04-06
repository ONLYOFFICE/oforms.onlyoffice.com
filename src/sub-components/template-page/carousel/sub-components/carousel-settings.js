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
        slidesToShow: 3,
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

export { cardCarouselSettings };
