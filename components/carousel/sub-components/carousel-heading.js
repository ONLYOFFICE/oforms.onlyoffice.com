import React from "react";
import Heading from "../../heading";

const CarouselHeading = (props) => {
  const { item } = props;
  const {
    headingText,
    level,
    fontSize,
    lineHeight,
    textAlign,
    headingClassName,
  } = item;

  const modifiedClassName = `carousel-item-heading ${
    headingClassName ? headingClassName : ""
  } `;

  return (
    <Heading
      level={level}
      fontSize={fontSize}
      lineHeight={lineHeight}
      textAlign={textAlign}
      className={modifiedClassName}
    >
      {headingText}
    </Heading>
  );
};

export default CarouselHeading;