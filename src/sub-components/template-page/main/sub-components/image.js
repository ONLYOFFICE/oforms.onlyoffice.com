import React from "react";

const Image = (props) => {
  const { alt, src, ...rest } = props;

  const modifedClassName = "template-image";
  const modifedAlt = alt ? alt : null;
  const modifedSrc = src ? src : null;

  return (
    <img
      {...rest}
      className={modifedClassName}
      alt={modifedAlt}
      src={modifedSrc}
    />
  );
};

export default Image;
