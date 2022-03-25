import React from "react";

import styled from "styled-components";
import { GatsbyImage } from "gatsby-plugin-image";

const Image = styled.img`
  width: 100%;
  height: 100%;
`;

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
      height={368}
    />
  );
};

export { GbImage, Image };
