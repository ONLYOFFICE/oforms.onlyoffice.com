import React from "react";
import PropTypes from "prop-types";

const Img = ({ src, alt, className, ...rest }) => {
  const imgAlt = alt ? alt : `image`;
  const imgSrc = src ? src : ``;
  const imgClassName = className ? className : `image`;

  return <img src={imgSrc} alt={imgAlt} className={imgClassName} {...rest} />;
};

Img.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  className: PropTypes.string,
};

export default Img;
