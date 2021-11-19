const cardCarouselSettings = {
    fade: false,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    centerPadding: '32',
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
      ],
  };
  
  export { cardCarouselSettings };