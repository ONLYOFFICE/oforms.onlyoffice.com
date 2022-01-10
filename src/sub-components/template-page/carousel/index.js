import React from "react";

import Carousel from "../../../../components/carousel";
import Box from "../../../../components/box";

import StyledCarouselContent from "./carousel-section";

import { cardCarouselSettings } from "./sub-components/carousel-settings";

const CarouselContent = ({ label, data, config }) => {
  const customConfig = config || cardCarouselSettings;

  return (
    <StyledCarouselContent
      padding="112px 0 40px"
      tabletPadding="80px 0 8px"
      mobileLPadding="48px 0 0"
      maxWidth="100%"
      maxWidthLaptop="100%"
    >
      <Box justifyContent="center">{label}</Box>
      <Carousel
        items={data}
        className="card-carousel"
        settingsCarousel={customConfig}
      />
    </StyledCarouselContent>
  );
};

export default CarouselContent;
