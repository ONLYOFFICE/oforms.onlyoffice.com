import React from "react";

const CarouselImage = (props) => {
  const { item, ...rest } = props;
  const { alt, imageClassName, src } = item;

  const modifiedClassName = `carousel-item-image ${
    imageClassName ? imageClassName : ""
  } `;

  return <img {...rest} src={src} alt={alt} className={modifiedClassName} />;
};

export default CarouselImage;