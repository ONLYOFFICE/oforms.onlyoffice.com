import React from "react";
import Image from "next/image";
import PropTypes from "prop-types";

const NImage = ({ src, alt, className, width, height, layout }) => {
  const imgAlt = alt ? alt : `image`;
  const imgSrc = src ? src : ``;
  const imgClassName = className ? className : `image`;
  const imgWidth = width ? width : `100`;
  const imgHeight = height ? height : `100`;
  const imgLayout = layout ? layout : `responsive`;

  return (
    <Image
      src={imgSrc}
      alt={imgAlt}
      className={imgClassName}
      width={imgWidth}
      height={imgHeight}
      layout={imgLayout}
      {...rest}
    />
  );
};

NImage.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  className: PropTypes.string,
};

export default NImage;
