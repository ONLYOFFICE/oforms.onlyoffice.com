import React from "react";

import Carousel from "../../../../components/carousel";
import Box from "../../../../components/box";

import StyledCarouselContent from "./carousel-section";

import { cardCarouselSettings } from "./sub-components/carousel-settings";

const CarouselContent = ({ label, data, config, padding, tabletPadding, mobileLPadding }) => {
  const customConfig = config || cardCarouselSettings;

  return (
    <StyledCarouselContent
      padding={padding}
      tabletPadding={tabletPadding}
      mobileLPadding={mobileLPadding}
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
