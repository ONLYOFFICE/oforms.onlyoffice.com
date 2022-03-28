import React from "react";
import { GatsbyImage } from "gatsby-plugin-image";

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
// constrained
const GbImage = ({ className, urlForm, idForm }) => {
  return (
    <GatsbyImage
      image={urlForm}
      src={urlForm}
      alt="image"
      className={className}
      layout="constrained"
      objectFit="contain"
      quality={100}
      height={756}
      width={544}
    />
  );
};

export { GbImage, Image };
