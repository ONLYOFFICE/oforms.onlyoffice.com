import React, { useEffect } from "react";

import Carousel from "../../../../components/carousel";
import Heading from "../../../../components/heading";

import StyledCarouselContent from "./carousel-section";

const CarouselContent = ({ label, data, config }) => {
  return (
    <StyledCarouselContent
      padding="112px 0 40px"
      tabletPadding="80px 0 8px"
      mobileLPadding="48px 0 0"
      maxWidth="100%"
      maxWidthLaptop="100%"
    >
      <Heading as="h3" fontSize="24px" textAlign="center" label={label} />
      <Carousel
        items={data}
        className="card-carousel"
        settingsCarousel={config}
      />
    </StyledCarouselContent>
  );
};

export default CarouselContent;
