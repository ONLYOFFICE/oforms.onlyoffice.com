import React from "react";
import PropTypes from "prop-types";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Card from "../card";

import StyledCarousel from "./carousel-styled";

const Carousel = ({
  settingsCarousel,
  isArrows,
  items,
  refCarousel,
  asNavForCarousel,
  ...rest
}) => {
  const settings = settingsCarousel || {
    fade: false,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const sliders = items.map((item, idx) => 
    <Card arrayItems={item} />
  );

  return (
    <StyledCarousel arrows={isArrows} {...rest}>
      <Slider asNavFor={asNavForCarousel} ref={refCarousel} {...settings}>
        {sliders}
      </Slider>
    </StyledCarousel>
  );
};

Carousel.propTypes = {
  /** Carousel settings*/
  settingsCarousel: PropTypes.object,
  /** Carousel array item*/
  items: PropTypes.arrayOf(PropTypes.object),
  /** Carousel arrows*/
  isArrows: PropTypes.bool,
  /** Carousel tab index */
  tabIndex: PropTypes.number,
  /** Accepts class */
  className: PropTypes.string,
  /** Accepts id */
  id: PropTypes.string,
};

Carousel.defaultProps = {
  settingsCarousel: {},
  items: [{}],
  isArrows: true,
  tabIndex: -1,
};

export default Carousel;