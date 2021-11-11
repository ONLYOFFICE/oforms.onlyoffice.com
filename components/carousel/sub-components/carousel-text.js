import React from "react";
import Text from "../../text";

const CarouselText = (props) => {
  const { item } = props;
  const {
    descriptionText,
    fontSize,
    lineHeight,
    textAlign,
    textClassName,
  } = item;

  const modifiedClassName = `carousel-item-text ${
    textClassName ? textClassName : ""
  } `;

  return (
    <Text
      fontSize={fontSize}
      lineHeight={lineHeight}
      textAlign={textAlign}
      className={modifiedClassName}
    >
      {descriptionText}
    </Text>
  );
};

export default CarouselText;