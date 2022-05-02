import React from "react";
import Image from "next/image";
import PropTypes from "prop-types";

const NImage = ({ src, alt, className, layout, ...rest }) => {
  const imgAlt = alt ? alt : `image`;
  const imgSrc = src ? src : ``;
  const imgClassName = className ? className : `image`;
  const imgLayout = layout ? layout : `responsive`;

  return (
    <Image
      src={imgSrc}
      alt={imgAlt}
      className={imgClassName}
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
