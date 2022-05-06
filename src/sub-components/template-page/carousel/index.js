import React from "react";

import Carousel from "../../../../components/carousel";
import Box from "../../../../components/box";

import StyledCarouselContent from "./carousel-section";

import { cardCarouselSettings } from "./sub-components/carousel-settings";

const CarouselContent = ({
  currentLanguage,
  label,
  data,
  config,
  padding,
  tabletPadding,
  mobileLPadding,
  shortCard,
  t,
}) => {
  const customConfig = config || cardCarouselSettings;

  return (
    <StyledCarouselContent
      padding={padding}
      tabletPadding={tabletPadding}
      mobileLPadding={mobileLPadding}
      maxWidth="100%"
      maxWidthLaptop="100%"
      shortCard={shortCard}
    >
      <Box justifyContent="center">{label}</Box>
      <Carousel
        t={t}
        items={data}
        className="card-carousel"
        settingsCarousel={customConfig}
        currentLanguage={currentLanguage}
        shortCard={shortCard}
      />
    </StyledCarouselContent>
  );
};

export default CarouselContent;
