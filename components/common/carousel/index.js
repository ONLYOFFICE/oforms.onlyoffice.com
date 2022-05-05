import React from "react";
import PropTypes from "prop-types";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import StyledCarousel from "./carousel-styled";
import Card from "../card";

const Carousel = ({
  t,
  settingsCarousel,
  isArrows,
  items,
  refCarousel,
  asNavForCarousel,
  currentLanguage,
  ...rest
}) => {
  const settings = settingsCarousel || {
    fade: false,
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  const sliders = items.map((item, idx) => (
    <Card
      key={`item-${idx}`}
      arrayItems={item}
      className={"carousel-cards"}
      currentLanguage={currentLanguage}
      t={t}
    />
  ));

  return (
    <StyledCarousel arrows={isArrows} {...rest}>
      <Slider {...settings}>{sliders}</Slider>
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
